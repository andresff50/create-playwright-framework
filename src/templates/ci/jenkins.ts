import type { Answers } from '../../answers/types.ts';
import { lines, has, installBrowsers, pyInstallCommands, pyQualityCommands, usesPoetry } from '../helpers.ts';
import { PW_VERSION } from '../../version.ts';

export function jenkinsfile(a: Answers): string {
  const ts = a.lang === 'ts';
  // Python: con pip se activa el entorno virtual en cada paso; con Poetry se usa `poetry run`
  const poetry = usesPoetry(a);
  const pySh = (command: string): string =>
    poetry ? `sh 'poetry run ${command}'` : `sh '. .venv/bin/activate && ${command}'`;
  const pyInstall = poetry
    ? pyInstallCommands(a).join(' && ')
    : 'python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt';
  const pyLint = poetry
    ? `sh '${pyQualityCommands(a).join(' && ')}'`
    : pySh('ruff check . && ruff format --check . && mypy .');
  const testCmd = ts
    ? `sh 'npx playwright test \${GREP:+--grep "$GREP"}'`
    : pySh('pytest -n auto --reruns 2 ${GREP:+-m "$GREP"}');
  return lines(
    '// Requiere plugins: Docker Pipeline, JUnit' + (has(a, 'reporters', 'allure') ? ', Allure Jenkins' : ''),
    'pipeline {',
    '  agent {',
    ts
      ? `    docker { image 'mcr.microsoft.com/playwright:v${PW_VERSION}-noble'; args '--ipc=host' }`
      : "    docker { image 'python:3.12'; args '--ipc=host -u root' }",
    '  }',
    '  options {',
    "    timeout(time: 60, unit: 'MINUTES')",
    "    buildDiscarder(logRotator(numToKeepStr: '30'))",
    '  }',
    '  parameters {',
    `    choice(name: 'TEST_ENV', choices: [${a.envs.map((e) => `'${e}'`).join(', ')}], description: 'Ambiente')`,
    `    string(name: 'GREP', defaultValue: '', description: '${ts ? 'Filtro de tags, ej. @smoke' : 'Marcador pytest, ej. smoke'}')`,
    '  }',
    "  triggers { cron('H 6 * * 1-5') }",
    '  environment {',
    "    CI = 'true'",
    '    TEST_ENV = "${params.TEST_ENV}"',
    '    // Define estas credenciales en Jenkins (Manage Jenkins → Credentials) y descomenta:',
    a.api && "    // API_TOKEN = credentials('qa-api-token')",
    a.auth && "    // TEST_USER_PASSWORD = credentials('qa-user-password')",
    a.db !== 'none' && "    // DB_URL = credentials('qa-db-url')",
    '  }',
    '  stages {',
    "    stage('Install') {",
    '      steps {',
    ts
      ? "        sh 'npm ci'"
      : [
          `        sh '${pyInstall}'`,
          `        ${pySh(`python -m playwright install --with-deps ${installBrowsers(a).join(' ')}`)}`,
        ],
    '      }',
    '    }',
    a.lint && [
      "    stage('Lint') {",
      '      steps {',
      ts ? "        sh 'npm run lint && npm run typecheck'" : `        ${pyLint}`,
      '      }',
      '    }',
    ],
    "    stage('Test') {",
    '      steps {',
    `        ${testCmd}`,
    '      }',
    '    }',
    a.bdd && [
      "    stage('BDD') {",
      '      steps {',
      ts ? "        sh 'npm run test:bdd'" : `        ${pySh('python -m behave')}`,
      '      }',
      '    }',
    ],
    '  }',
    '  post {',
    '    always {',
    `      junit allowEmptyResults: true, testResults: '${a.bdd ? 'reports/**/*.xml' : 'reports/junit.xml'}'`,
    ts
      ? "      archiveArtifacts artifacts: 'playwright-report/**, test-results/**, reports/**', allowEmptyArchive: true"
      : "      archiveArtifacts artifacts: 'reports/**, test-results/**', allowEmptyArchive: true",
    has(a, 'reporters', 'allure') &&
      "      allure includeProperties: false, results: [[path: 'allure-results']]",
    '    }',
    '  }',
    '}',
    '',
  );
}
