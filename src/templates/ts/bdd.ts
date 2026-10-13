import type { Answers } from '../../answers/types.ts';
import { has, lines } from '../helpers.ts';

export function tsCucumberConfig(a: Answers): string {
  const format = [
    'progress',
    has(a, 'reporters', 'html') && 'html:reports/cucumber-report.html',
    has(a, 'reporters', 'junit') && 'junit:reports/cucumber-junit.xml',
  ].filter(Boolean);
  const config = {
    default: {
      paths: ['features/**/*.feature'],
      requireModule: ['tsx/cjs'],
      require: ['features/support/**/*.ts', 'features/steps/**/*.ts'],
      format,
      formatOptions: { snippetInterface: 'async-await' },
    },
  };
  return JSON.stringify(config, null, 2) + '\n';
}

export function tsBddWorld(): string {
  return lines(
    "import { World, setWorldConstructor } from '@cucumber/cucumber';",
    "import type { BrowserContext, Page } from '@playwright/test';",
    "import type { HomePage } from '../../src/pages/home.page';",
    '',
    '/** Estado de un escenario. Los hooks crean un contexto, una página y los Page Objects por escenario. */',
    'export class AppWorld extends World {',
    '  context!: BrowserContext;',
    '  page!: Page;',
    '  homePage!: HomePage;',
    '}',
    '',
    'setWorldConstructor(AppWorld);',
    '',
  );
}

export function tsBddHooks(): string {
  return lines(
    "import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber';",
    "import { chromium, firefox, selectors, webkit, type Browser, type BrowserType } from '@playwright/test';",
    "import { env } from '../../src/config/env';",
    "import { HomePage } from '../../src/pages/home.page';",
    "import type { AppWorld } from './world';",
    '',
    'const BROWSERS: Record<string, BrowserType | undefined> = { chromium, firefox, webkit };',
    '',
    'let browser: Browser | undefined;',
    '',
    'setDefaultTimeout(30_000);',
    '',
    '// Un navegador por ejecución',
    'BeforeAll(async function () {',
    '  const browserType = BROWSERS[env.BROWSER];',
    '  if (!browserType) throw new Error(`BROWSER no soportado: ${env.BROWSER}`);',
    "  selectors.setTestIdAttribute('data-qa');",
    '  browser = await browserType.launch({ headless: !env.HEADED });',
    '});',
    '',
    '// Un contexto nuevo por escenario: escenarios independientes entre sí',
    'Before(async function (this: AppWorld) {',
    "  if (!browser) throw new Error('El navegador no se inició');",
    "  this.context = await browser.newContext({ baseURL: env.BASE_URL, locale: 'es-CO' });",
    '  this.page = await this.context.newPage();',
    '  this.homePage = new HomePage(this.page);',
    '});',
    '',
    'After(async function (this: AppWorld, { result }) {',
    '  if (result?.status === Status.FAILED) {',
    "    this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');",
    '  }',
    '  await this.context.close();',
    '});',
    '',
    'AfterAll(async function () {',
    '  await browser?.close();',
    '});',
    '',
  );
}

export function tsHomeSteps(): string {
  return lines(
    "import { Given, Then, When } from '@cucumber/cucumber';",
    "import { expect } from '@playwright/test';",
    "import type { AppWorld } from '../support/world';",
    '',
    '// Los pasos describen el comportamiento y delegan en los Page Objects: sin selectores aquí.',
    '',
    "Given('una pantalla de {int} x {int}', async function (this: AppWorld, width: number, height: number) {",
    '  await this.page.setViewportSize({ width, height });',
    '});',
    '',
    "When('abro la página de inicio', async function (this: AppWorld) {",
    '  await this.homePage.goto();',
    '});',
    '',
    "Then('la página tiene un título', async function (this: AppWorld) {",
    '  await expect(this.page).toHaveTitle(/.+/);',
    '});',
    '',
    "Then('veo el encabezado principal', async function (this: AppWorld) {",
    '  await expect(this.homePage.mainHeading.first()).toBeVisible();',
    '});',
    '',
  );
}
