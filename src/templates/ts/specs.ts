import type { Answers } from '../../answers/types.ts';
import { lines } from '../helpers.ts';

export function tsHomeSpec(a: Answers): string {
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    '',
    "test.describe('Home', () => {",
    "  test('carga la página principal', { tag: ['@smoke'] }, async ({ homePage, page }) => {",
    '    await homePage.goto();',
    '',
    '    await expect(page).toHaveTitle(/.+/);',
    '    await expect(homePage.mainHeading.first()).toBeVisible();',
    '  });',
    a.size !== 'small' && [
      '',
      "  test('muestra la navegación principal', { tag: ['@regression'] }, async ({ homePage }) => {",
      '    await homePage.goto();',
      '',
      '    await expect(homePage.header.links.first()).toBeVisible();',
      '  });',
    ],
    a.data && [
      '',
      "  test('ejemplo de datos sintéticos', { tag: ['@regression'] }, async ({ user }) => {",
      '    // El usuario se genera con la factory: nunca datos reales',
      '    expect(user.email).toMatch(/^qa\\+.+@example\\.com$/);',
      '  });',
    ],
    '});',
    '',
  );
}

export function tsAuthSetup(): string {
  return lines(
    "import fs from 'node:fs';",
    "import path from 'node:path';",
    "import { test as setup, expect } from '@playwright/test';",
    "import { env } from '../../src/config/env';",
    "import { LoginPage } from '../../src/pages/login.page';",
    "import { STORAGE_STATE } from '../../playwright.config';",
    '',
    "setup('autenticar usuario de pruebas', async ({ page }) => {",
    '  fs.mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });',
    '',
    '  // Sin credenciales: estado vacío para que el resto de proyectos pueda arrancar',
    '  if (!env.USER_EMAIL || !env.USER_PASSWORD) {',
    '    fs.writeFileSync(STORAGE_STATE, JSON.stringify({ cookies: [], origins: [] }));',
    "    const description = 'Sin TEST_USER_EMAIL/PASSWORD: storageState vacío';",
    "    setup.info().annotations.push({ type: 'warning', description });",
    '    return;',
    '  }',
    '',
    '  // Recomendado: si tu app lo permite, autentica por API (más rápido) y guarda request.storageState()',
    '  const login = new LoginPage(page);',
    '  await login.goto();',
    '  await login.signIn(env.USER_EMAIL, env.USER_PASSWORD);',
    '  await expect(page).not.toHaveURL(/login/);',
    '  await page.context().storageState({ path: STORAGE_STATE });',
    '});',
    '',
  );
}

export function tsApiSpec(): string {
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    "import { env } from '../../src/config/env';",
    '',
    "test.skip(!env.API_URL, 'Define API_URL en .env para ejecutar las pruebas de API');",
    '',
    "test.describe('API - salud del servicio', () => {",
    "  test('GET /health responde 200', { tag: ['@smoke', '@api'] }, async ({ api }) => {",
    "    const res = await api.raw().get('/health');",
    '',
    '    expect(res.status()).toBe(200);',
    '  });',
    '});',
    '',
  );
}

export function tsDbSpec(a: Answers): string {
  const body =
    a.db === 'mongodb'
      ? ['    const result = await db.ping();', '', '    expect(result.ok).toBe(1);']
      : [
          "    const rows = await db.query<{ ok: number }>('SELECT 1 AS ok');",
          '',
          '    expect(Number(rows[0]?.ok)).toBe(1);',
        ];
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    "import { env } from '../../src/config/env';",
    '',
    "test.skip(!env.DB_URL, 'Define DB_URL en .env para ejecutar las pruebas de base de datos');",
    '',
    "test.describe('Base de datos', () => {",
    "  test('la conexión responde', { tag: ['@db'] }, async ({ db }) => {",
    body,
    '  });',
    '});',
    '',
  );
}

export function tsA11ySpec(): string {
  return lines(
    "import AxeBuilder from '@axe-core/playwright';",
    "import { test, expect } from '../../src/fixtures';",
    '',
    "test.describe('Accesibilidad', () => {",
    '  // WCAG 2.0 A/AA; solo las violaciones críticas bloquean (el resto queda adjunto al reporte)',
    "  test('home sin violaciones críticas', { tag: ['@a11y'] }, async ({ homePage, page }, testInfo) => {",
    '    await homePage.goto();',
    "    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();",
    '',
    "    await testInfo.attach('axe-violations', {",
    '      body: JSON.stringify(results.violations, null, 2),',
    "      contentType: 'application/json',",
    '    });',
    "    const critical = results.violations.filter((v) => v.impact === 'critical');",
    "    expect(critical, 'Violaciones críticas de accesibilidad').toEqual([]);",
    '  });',
    '});',
    '',
  );
}

export function tsVisualSpec(): string {
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    '',
    '// Ejecutar con: npm run test:visual  (primera vez: npm run test:visual:update para crear la baseline)',
    '// Genera y compara baselines SIEMPRE dentro del contenedor oficial para evitar diferencias de fuentes.',
    "test('home - regresión visual', { tag: ['@visual'] }, async ({ homePage, page }) => {",
    '  await homePage.goto();',
    '',
    "  await expect(page).toHaveScreenshot('home.png', {",
    '    fullPage: false,',
    "    animations: 'disabled',",
    '    maxDiffPixelRatio: 0.01,',
    '  });',
    '});',
    '',
  );
}
