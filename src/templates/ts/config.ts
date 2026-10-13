import type { Answers } from '../../answers/types.ts';
import { lines, has, installBrowsers, uiBrowsers, hasBackend } from '../helpers.ts';
import { PW_VERSION } from '../../version.ts';

export function tsPackageJson(a: Answers): string {
  const scripts: Record<string, string> = {
    test: 'playwright test',
    'test:smoke': 'playwright test --grep @smoke',
    'test:headed': `playwright test --headed --project=${a.browsers[0]}`,
    'test:ui': 'playwright test --ui',
    'test:debug': 'playwright test --debug',
    'test:changed': 'playwright test --only-changed=origin/main',
    'test:burn-in': 'playwright test --only-changed=origin/main --repeat-each=10 --retries=0',
  };
  if (has(a, 'reporters', 'html')) scripts.report = 'playwright show-report';
  if (has(a, 'extras', 'visual')) {
    scripts['test:visual'] = 'cross-env VISUAL=1 playwright test --project=visual';
    scripts['test:visual:update'] = 'cross-env VISUAL=1 playwright test --project=visual --update-snapshots';
  }
  if (has(a, 'reporters', 'allure')) {
    scripts['allure:generate'] = 'allure generate allure-results -o allure-report --clean';
    scripts['allure:open'] = 'allure open allure-report';
  }
  if (a.bdd) scripts['test:bdd'] = 'cucumber-js';
  if (a.lint) {
    Object.assign(scripts, {
      lint: 'eslint .',
      'lint:fix': 'eslint . --fix',
      format: 'prettier --write "**/*.{ts,mjs}"',
      'format:check': 'prettier --check "**/*.{ts,mjs}"',
      typecheck: 'tsc --noEmit',
    });
  } else scripts.typecheck = 'tsc --noEmit';
  if (a.precommit) scripts.prepare = 'husky';

  const dev: Record<string, string> = {
    '@playwright/test': PW_VERSION,
    '@types/node': '^22.10.0',
    dotenv: '^16.4.7',
    typescript: '^5.6.3',
  };
  if (a.lint)
    Object.assign(dev, {
      eslint: '^9.15.0',
      '@eslint/js': '^9.15.0',
      'typescript-eslint': '^8.15.0',
      'eslint-plugin-playwright': '^2.1.0',
      prettier: '^3.4.0',
    });
  if (a.data) dev['@faker-js/faker'] = '^9.2.0';
  if (has(a, 'reporters', 'allure'))
    Object.assign(dev, { 'allure-playwright': '^3.0.6', 'allure-commandline': '^2.32.0' });
  // playwright-core fijado a la misma versión para que los tipos de axe coincidan con @playwright/test
  if (has(a, 'extras', 'a11y'))
    Object.assign(dev, { '@axe-core/playwright': '^4.10.1', 'playwright-core': PW_VERSION });
  if (has(a, 'extras', 'visual')) dev['cross-env'] = '^7.0.3';
  // tsx carga los pasos en TypeScript sin compilar
  if (a.bdd) Object.assign(dev, { '@cucumber/cucumber': '^12.9.0', tsx: '^4.20.0' });
  if (a.precommit) Object.assign(dev, { husky: '^9.1.7', 'lint-staged': '^15.2.10' });
  if (a.db === 'postgres') Object.assign(dev, { pg: '^8.13.1', '@types/pg': '^8.11.10' });
  if (a.db === 'mysql') dev.mysql2 = '^3.11.4';
  if (a.db === 'mssql') Object.assign(dev, { mssql: '^11.0.1', '@types/mssql': '^9.1.5' });
  if (a.db === 'mongodb') dev.mongodb = '^6.10.0';

  const pkg: Record<string, unknown> = {
    name: a.name,
    version: '0.1.0',
    private: true,
    description: 'Framework de automatización E2E con Playwright',
    engines: { node: '>=20' },
    scripts,
    devDependencies: Object.fromEntries(Object.entries(dev).sort(([x], [y]) => x.localeCompare(y))),
  };
  if (a.precommit) pkg['lint-staged'] = { '*.ts': ['eslint --fix', 'prettier --write'] };
  return JSON.stringify(pkg, null, 2) + '\n';
}

export function tsConfigJson(a: Answers): string {
  return (
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          lib: ['ES2023', 'DOM'],
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          resolveJsonModule: true,
          noEmit: true,
          forceConsistentCasingInFileNames: true,
          types: ['node'],
        },
        include: [
          '*.ts',
          'src/**/*.ts',
          'tests/**/*.ts',
          'reporters/**/*.ts',
          ...(a.bdd ? ['features/**/*.ts'] : []),
        ],
      },
      null,
      2,
    ) + '\n'
  );
}

export function tsPlaywrightConfig(a: Answers): string {
  const deviceMap = {
    chromium: ["'chromium'", "devices['Desktop Chrome']"],
    firefox: ["'firefox'", "devices['Desktop Firefox']"],
    webkit: ["'webkit'", "devices['Desktop Safari']"],
    'mobile-chrome': ["'mobile-chrome'", "devices['Pixel 7']"],
    'mobile-safari': ["'mobile-safari'", "devices['iPhone 15']"],
  };
  const uiProjects = uiBrowsers(a).map((b) => {
    const [name, dev] = deviceMap[b];
    return lines(
      '    {',
      `      name: ${name},`,
      `      use: { ...${dev}${a.auth ? ', storageState: STORAGE_STATE' : ''} },`,
      a.auth && "      dependencies: ['setup'],",
      '      testIgnore: UI_IGNORE,',
      '    },',
    );
  });
  return lines(
    "import { defineConfig, devices, type ReporterDescription } from '@playwright/test';",
    "import { env } from './src/config/env';",
    '',
    'const isCI = !!process.env.CI;',
    a.auth && "export const STORAGE_STATE = '.auth/user.json';",
    '',
    '// Tests de backend (API/BD) corren en su propio proyecto, sin navegador',
    'const BACKEND_TESTS = /.*\\.(api|db)\\.spec\\.ts/;',
    'const VISUAL_TESTS = /.*\\.visual\\.spec\\.ts/;',
    'const UI_IGNORE = [BACKEND_TESTS, VISUAL_TESTS];',
    '',
    "const reporters: ReporterDescription[] = [['list']];",
    has(a, 'reporters', 'html') && "reporters.push(['html', { open: 'never' }]);",
    has(a, 'reporters', 'junit') && "reporters.push(['junit', { outputFile: 'reports/junit.xml' }]);",
    has(a, 'reporters', 'allure') &&
      "reporters.push(['allure-playwright', { resultsDir: 'allure-results' }]);",
    has(a, 'reporters', 'metrics') && "reporters.push(['./reporters/metrics-reporter.ts']);",
    has(a, 'ci', 'github') && "if (process.env.GITHUB_ACTIONS) reporters.push(['github']);",
    a.shards > 1 &&
      "if (process.env.PW_BLOB) reporters.push(['blob']); // sharding: luego `npx playwright merge-reports`",
    '',
    'export default defineConfig({',
    "  testDir: './tests',",
    '  fullyParallel: true,',
    '  forbidOnly: isCI,',
    '  retries: isCI ? 2 : 0,',
    `  workers: isCI ? '50%' : undefined,`,
    '  timeout: 30_000,',
    '  expect: { timeout: 7_000 },',
    '  reporter: reporters,',
    '  use: {',
    '    baseURL: env.BASE_URL,',
    "    testIdAttribute: 'data-qa',",
    "    trace: 'retain-on-failure',",
    "    screenshot: 'only-on-failure',",
    "    video: 'retain-on-failure',",
    "    locale: 'es-CO',",
    '  },',
    '  projects: [',
    a.auth && "    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },",
    uiProjects,
    hasBackend(a) && "    { name: 'backend', testMatch: BACKEND_TESTS },",
    has(a, 'extras', 'visual') && [
      '    // Visual: solo con VISUAL=1 (npm run test:visual) para no fallar por falta de baseline',
      "    ...(process.env.VISUAL === '1'",
      "      ? [{ name: 'visual', testMatch: VISUAL_TESTS, use: { ...devices['Desktop Chrome'] } }]",
      '      : []),',
    ],
    '  ],',
    '});',
    '',
  );
}

export function tsEnv(a: Answers): string {
  return lines(
    "import dotenv from 'dotenv';",
    '',
    '/**',
    ' * Única puerta de entrada a la configuración. El resto del código NO lee process.env.',
    ' * Carga .env.<TEST_ENV> y luego .env (las variables ya definidas en el entorno tienen prioridad).',
    ' */',
    "const TEST_ENV = process.env.TEST_ENV || 'qa';",
    "dotenv.config({ path: [`.env.${TEST_ENV}`, '.env'] });",
    '',
    'const get = (name: string, fallback = ""): string => process.env[name] || fallback;',
    '',
    'export const env = {',
    '  TEST_ENV,',
    `  BASE_URL: get('BASE_URL', '${a.baseUrl}'),`,
    "  API_URL: get('API_URL'),",
    "  API_TOKEN: get('API_TOKEN'),",
    "  USER_EMAIL: get('TEST_USER_EMAIL'),",
    "  USER_PASSWORD: get('TEST_USER_PASSWORD'),",
    "  DB_URL: get('DB_URL'),",
    a.bdd && [`  BROWSER: get('BROWSER', '${installBrowsers(a)[0]}'),`, "  HEADED: get('HEADED') === '1',"],
    '} as const;',
    '',
    '// Guard: evita ejecutar contra producción por error',
    "if (/prod/i.test(env.BASE_URL) && process.env.ALLOW_PROD !== 'true') {",
    '  throw new Error(',
    '    `BASE_URL parece de producción (${env.BASE_URL}). Define ALLOW_PROD=true si es intencional.`,',
    '  );',
    '}',
    '',
  ).replace('(name: string, fallback = ""): string', "(name: string, fallback = ''): string");
}

export function tsEslintConfig(): string {
  return lines(
    "import js from '@eslint/js';",
    "import tseslint from 'typescript-eslint';",
    "import playwright from 'eslint-plugin-playwright';",
    '',
    'export default tseslint.config(',
    '  {',
    "    ignores: ['node_modules', 'playwright-report', 'test-results', 'blob-report', 'reports', 'allure-*'],",
    '  },',
    '  js.configs.recommended,',
    '  ...tseslint.configs.recommended,',
    '  {',
    "    files: ['**/*.ts'],",
    '    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },',
    '    rules: {',
    "      '@typescript-eslint/no-floating-promises': 'error', // detecta await olvidados",
    "      '@typescript-eslint/await-thenable': 'error',",
    '    },',
    '  },',
    '  {',
    "    files: ['tests/**/*.ts'],",
    "    ...playwright.configs['flat/recommended'],",
    '    rules: {',
    "      ...playwright.configs['flat/recommended'].rules,",
    "      'playwright/no-wait-for-timeout': 'error',",
    "      'playwright/no-force-option': 'error',",
    "      'playwright/no-focused-test': 'error',",
    "      'playwright/no-skipped-test': ['warn', { allowConditional: true }],",
    "      'playwright/prefer-web-first-assertions': 'error',",
    '    },',
    '  },',
    '  {',
    "    files: ['**/*.mjs'],",
    "    languageOptions: { globals: { process: 'readonly', console: 'readonly' } },",
    '  },',
    ');',
    '',
  );
}
