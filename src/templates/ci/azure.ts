import type { Answers } from '../../answers/types.ts';
import { bddTool, lines, installBrowsers, pyInstallCommands, pyQualityCommands, pyRun } from '../helpers.ts';

export function azurePipeline(a: Answers): string {
  const ts = a.lang === 'ts';
  const n = a.shards;
  const pytest = pyRun(a, 'pytest -n auto --reruns 2');
  const secretEnv = lines(
    a.api && '          API_TOKEN: $(API_TOKEN)',
    a.auth && '          TEST_USER_PASSWORD: $(TEST_USER_PASSWORD)',
    a.db !== 'none' && '          DB_URL: $(DB_URL)',
  );
  return lines(
    '# Variables no secretas (BASE_URL, TEST_ENV...) se exponen solas como variables de entorno.',
    '# Los secretos deben mapearse explícitamente en "env" (ver paso de pruebas).',
    'trigger:',
    '  branches:',
    '    include: [main]',
    'pr:',
    '  branches:',
    '    include: [main]',
    '',
    'pool:',
    '  vmImage: ubuntu-latest',
    '',
    'variables:',
    '  CI: "true"',
    '  TEST_ENV: qa',
    '',
    'jobs:',
    '  - job: e2e',
    '    timeoutInMinutes: 60',
    n > 1 && ['    strategy:', `      parallel: ${n}`],
    '    steps:',
    ts
      ? [
          '      - task: NodeTool@0',
          '        inputs:',
          "          versionSpec: '22.x'",
          '      - script: npm ci',
          '        displayName: Instalar dependencias',
          '      - script: npx playwright install --with-deps',
          '        displayName: Instalar navegadores',
          a.lint && [
            '      - script: npm run lint && npm run typecheck',
            '        displayName: Lint y tipos',
          ],
        ]
      : [
          '      - task: UsePythonVersion@0',
          '        inputs:',
          "          versionSpec: '3.12'",
          `      - script: ${pyInstallCommands(a).join(' && ')}`,
          '        displayName: Instalar dependencias',
          `      - script: ${pyRun(a, 'python -m playwright install')} --with-deps ${installBrowsers(a).join(' ')}`,
          '        displayName: Instalar navegadores',
          a.lint && [
            `      - script: ${pyQualityCommands(a).join(' && ')}`,
            '        displayName: Lint y tipos',
          ],
        ],
    ts
      ? n > 1
        ? '      - script: npx playwright test --shard=$(System.JobPositionInPhase)/$(System.TotalJobsInPhase)'
        : '      - script: npx playwright test'
      : n > 1
        ? `      - script: ${pytest} --splits $(System.TotalJobsInPhase) --group $(System.JobPositionInPhase)`
        : `      - script: ${pytest}`,
    '        displayName: Ejecutar pruebas',
    secretEnv && ['        env:', secretEnv],
    a.bdd && [
      ts ? '      - script: npm run test:bdd' : `      - script: ${pyRun(a, 'python -m behave')}`,
      `        displayName: Ejecutar BDD (${bddTool(a)})`,
      n > 1 && "        condition: and(succeeded(), eq(variables['System.JobPositionInPhase'], 1))",
      secretEnv && ['        env:', secretEnv],
    ],
    '      - task: PublishTestResults@2',
    '        condition: succeededOrFailed()',
    '        inputs:',
    '          testResultsFormat: JUnit',
    `          testResultsFiles: ${a.bdd ? 'reports/**/*.xml' : 'reports/junit.xml'}`,
    '          mergeTestResults: true',
    "          testRunTitle: 'E2E $(System.JobPositionInPhase)'",
    '      - task: PublishPipelineArtifact@1',
    '        condition: always()',
    '        inputs:',
    `          targetPath: ${ts ? 'playwright-report' : 'reports'}`,
    '          artifact: report-$(System.JobPositionInPhase)',
    '',
  );
}
