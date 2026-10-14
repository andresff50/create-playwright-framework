import type { Answers } from '../answers/types.ts';
import { translate } from '../i18n/index.ts';
import { azurePipeline } from '../templates/ci/azure.ts';
import { dockerfile } from '../templates/ci/docker.ts';
import { githubWorkflow } from '../templates/ci/github.ts';
import { gitlabCi } from '../templates/ci/gitlab.ts';
import { jenkinsfile } from '../templates/ci/jenkins.ts';
import { claudeAgents } from '../templates/claude/agents.ts';
import { claudeMd } from '../templates/claude/claude-md.ts';
import { claudeHooksNode } from '../templates/claude/hooks-node.ts';
import { claudeHooksPy } from '../templates/claude/hooks-py.ts';
import { claudeSettings, mcpJson } from '../templates/claude/settings.ts';
import { claudeSkills } from '../templates/claude/skills.ts';
import { homeFeature } from '../templates/bdd.ts';
import { composeFile, dockerignore, editorconfig, envExample, gitignore } from '../templates/common.ts';
import { architectureDoc } from '../templates/docs/architecture.ts';
import { readme } from '../templates/docs/readme.ts';
import { has, lines, usesPoetry } from '../templates/helpers.ts';
import { pyApiClient, pyDb, pyFactories } from '../templates/py/api-data-db.ts';
import { pyBehaveEnvironment, pyBehaveIni, pyHomeSteps } from '../templates/py/bdd.ts';
import { poetryToml, pyEnv, pyPrecommit, pyProject } from '../templates/py/config.ts';
import { pyConftest, pyHeader, pyHomePage, pyLoginPage } from '../templates/py/conftest-pages.ts';
import { pyRequirements } from '../templates/py/deps.ts';
import { pyMetricsPlugin } from '../templates/py/metrics-plugin.ts';
import { pyTestA11y, pyTestApi, pyTestDb, pyTestHome } from '../templates/py/tests.ts';
import { tsApiClient, tsDb, tsUserFactory } from '../templates/ts/api-data-db.ts';
import { tsBddHooks, tsBddWorld, tsCucumberConfig, tsHomeSteps } from '../templates/ts/bdd.ts';
import {
  tsConfigJson,
  tsEnv,
  tsEslintConfig,
  tsPackageJson,
  tsPlaywrightConfig,
} from '../templates/ts/config.ts';
import { tsFixtures, tsHeaderComponent, tsHomePage, tsLoginPage } from '../templates/ts/fixtures-pages.ts';
import { tsMetricsReporter } from '../templates/ts/metrics-reporter.ts';
import {
  tsA11ySpec,
  tsApiSpec,
  tsAuthSetup,
  tsDbSpec,
  tsHomeSpec,
  tsVisualSpec,
} from '../templates/ts/specs.ts';
import { GENERATOR_VERSION } from '../version.ts';

/** ruta relativa (con `/`) → contenido */
export type ProjectFiles = Map<string, string>;

const json = (value: unknown): string => JSON.stringify(value, null, 2) + '\n';

function tsFiles(f: ProjectFiles, a: Answers): void {
  f.set('package.json', tsPackageJson(a));
  f.set('tsconfig.json', tsConfigJson(a));
  f.set('playwright.config.ts', tsPlaywrightConfig(a));
  f.set('src/config/env.ts', tsEnv(a));
  f.set('src/fixtures/index.ts', tsFixtures(a));
  f.set('src/pages/home.page.ts', tsHomePage(a));
  if (a.size !== 'small') f.set('src/components/header.component.ts', tsHeaderComponent());
  if (a.auth) {
    f.set('src/pages/login.page.ts', tsLoginPage());
    f.set('tests/setup/auth.setup.ts', tsAuthSetup());
  }
  if (a.api) {
    f.set('src/api/api-client.ts', tsApiClient());
    f.set('tests/api/health.api.spec.ts', tsApiSpec());
  }
  if (a.data) f.set('src/data/user.factory.ts', tsUserFactory());
  if (a.db !== 'none') {
    f.set('src/db/db.ts', tsDb(a.db));
    f.set('tests/db/connection.db.spec.ts', tsDbSpec(a));
  }
  f.set('tests/e2e/home.spec.ts', tsHomeSpec(a));
  if (has(a, 'extras', 'a11y')) f.set('tests/e2e/a11y.spec.ts', tsA11ySpec());
  if (has(a, 'extras', 'visual')) f.set('tests/visual/home.visual.spec.ts', tsVisualSpec());
  if (has(a, 'reporters', 'metrics')) f.set('reporters/metrics-reporter.ts', tsMetricsReporter());
  if (a.bdd) {
    f.set('cucumber.json', tsCucumberConfig(a));
    f.set('features/home.feature', homeFeature());
    f.set('features/support/world.ts', tsBddWorld());
    f.set('features/support/hooks.ts', tsBddHooks());
    f.set('features/steps/home.steps.ts', tsHomeSteps());
  }
  if (a.lint) {
    f.set('eslint.config.mjs', tsEslintConfig());
    f.set('.prettierrc.json', json({ singleQuote: true, printWidth: 110, trailingComma: 'all' }));
    f.set(
      '.prettierignore',
      lines(
        'playwright-report',
        'test-results',
        'blob-report',
        'reports',
        'allure-*',
        '.auth',
        '.claude',
        'package-lock.json',
        '',
      ),
    );
  }
  if (a.precommit) f.set('.husky/pre-commit', 'npx lint-staged\n');
}

function pyFiles(f: ProjectFiles, a: Answers): void {
  // Poetry declara las dependencias en pyproject.toml; pip, en requirements.txt
  if (usesPoetry(a)) f.set('poetry.toml', poetryToml());
  else f.set('requirements.txt', pyRequirements(a));
  f.set('pyproject.toml', pyProject(a));
  f.set('conftest.py', pyConftest(a));
  f.set('config/__init__.py', '');
  f.set('config/env.py', pyEnv(a));
  f.set('pages/__init__.py', '');
  f.set('pages/home_page.py', pyHomePage(a));
  if (a.size !== 'small') {
    f.set('components/__init__.py', '');
    f.set('components/header.py', pyHeader());
  }
  if (a.auth) f.set('pages/login_page.py', pyLoginPage());
  if (a.api) {
    f.set('api/__init__.py', '');
    f.set('api/client.py', pyApiClient());
    f.set('tests/api/test_health.py', pyTestApi());
  }
  if (a.data) {
    f.set('data/__init__.py', '');
    f.set('data/factories.py', pyFactories());
  }
  if (a.db !== 'none') {
    f.set('db/__init__.py', '');
    f.set('db/client.py', pyDb(a.db));
    f.set('tests/db/test_connection.py', pyTestDb(a));
  }
  f.set('tests/e2e/test_home.py', pyTestHome(a));
  if (has(a, 'extras', 'a11y')) f.set('tests/e2e/test_a11y.py', pyTestA11y());
  if (has(a, 'reporters', 'metrics')) {
    f.set('plugins/__init__.py', '');
    f.set('plugins/metrics.py', pyMetricsPlugin());
  }
  if (a.bdd) {
    f.set('behave.ini', pyBehaveIni(a));
    f.set('features/home.feature', homeFeature());
    f.set('features/environment.py', pyBehaveEnvironment());
    f.set('features/steps/home_steps.py', pyHomeSteps());
  }
  if (a.precommit) f.set('.pre-commit-config.yaml', pyPrecommit(a));
}

function infraFiles(f: ProjectFiles, a: Answers): void {
  if (a.docker !== 'none') {
    f.set('Dockerfile', dockerfile(a));
    f.set('.dockerignore', dockerignore());
    if (a.docker === 'compose') f.set('docker-compose.yml', composeFile(a));
  }
  if (has(a, 'ci', 'github')) f.set('.github/workflows/e2e.yml', githubWorkflow(a));
  if (has(a, 'ci', 'jenkins')) f.set('Jenkinsfile', jenkinsfile(a));
  if (has(a, 'ci', 'gitlab')) f.set('.gitlab-ci.yml', gitlabCi(a));
  if (has(a, 'ci', 'azure')) f.set('azure-pipelines.yml', azurePipeline(a));
}

function governanceFiles(f: ProjectFiles, a: Answers): void {
  f.set('docs/ARCHITECTURE.md', architectureDoc());
  f.set(
    '.github/CODEOWNERS',
    lines(
      '# Ajusta los equipos a tu organización',
      '*                 @mi-org/qa-platform',
      a.lang === 'ts' ? 'src/               @mi-org/qa-platform' : 'pages/ components/ @mi-org/qa-platform',
      'tests/checkout/   @mi-org/squad-checkout',
      '',
    ),
  );
}

function claudeFiles(f: ProjectFiles, a: Answers): void {
  f.set('CLAUDE.md', claudeMd(a));
  f.set('.claude/settings.json', claudeSettings(a));
  const hooks = a.lang === 'ts' ? claudeHooksNode(a) : claudeHooksPy(a);
  for (const [name, content] of Object.entries(hooks)) f.set(`.claude/hooks/${name}`, content);
  for (const [p, content] of Object.entries(claudeSkills(a))) f.set(`.claude/skills/${p}`, content);
  for (const [p, content] of Object.entries(claudeAgents(a))) f.set(`.claude/agents/${p}`, content);
  f.set('.mcp.json', mcpJson());
}

/** Respuestas con las que se generó el proyecto, reutilizables con --answers. */
function answersFile(a: Answers): string {
  const answers: Record<string, unknown> = { ...a };
  delete answers.out; // un JSON de respuestas antiguo puede traer la carpeta de salida
  return json({ generator: `create-pw-framework@${GENERATOR_VERSION}`, ...answers });
}

/** Arma todos los archivos del proyecto. No toca el disco. */
export function buildProject(a: Answers): ProjectFiles {
  const f: ProjectFiles = new Map();

  f.set('.gitignore', gitignore());
  f.set('.env.example', envExample(a));
  f.set('.editorconfig', editorconfig());

  if (a.lang === 'ts') tsFiles(f, a);
  else pyFiles(f, a);
  infraFiles(f, a);
  if (a.size === 'large') governanceFiles(f, a);
  if (a.claude) claudeFiles(f, a);

  f.set('scaffold.answers.json', answersFile(a));
  f.set('README.md', readme(a, [...f.keys(), 'README.md']));
  if (a.language === 'en') for (const [k, v] of f) f.set(k, translate(v, 'en'));
  return f;
}
