import type { Answers } from '../../answers/types.ts';
import { lines, hasBackend } from '../helpers.ts';

export function tsFixtures(a: Answers): string {
  const testTypes = [
    '  homePage: HomePage;',
    a.auth && '  loginPage: LoginPage;',
    a.api && '  api: ApiClient;',
    a.data && '  user: User;',
  ];
  const workerTypes = a.db !== 'none' ? ['type WorkerFixtures = {', '  db: Db;', '};'] : null;
  return lines(
    "import { test as base, expect } from '@playwright/test';",
    "import { HomePage } from '../pages/home.page';",
    a.auth && "import { LoginPage } from '../pages/login.page';",
    a.api && "import { ApiClient } from '../api/api-client';",
    a.data && "import { buildUser, type User } from '../data/user.factory';",
    a.db !== 'none' && "import { Db } from '../db/db';",
    hasBackend(a) && "import { env } from '../config/env';",
    '',
    '/** Fixtures de test: se crean bajo demanda y se destruyen al terminar cada test. */',
    'type TestFixtures = {',
    testTypes,
    '};',
    workerTypes && '',
    workerTypes,
    '',
    `export const test = base.extend<TestFixtures${workerTypes ? ', WorkerFixtures' : ''}>({`,
    '  homePage: async ({ page }, use) => {',
    '    await use(new HomePage(page));',
    '  },',
    a.auth && ['  loginPage: async ({ page }, use) => {', '    await use(new LoginPage(page));', '  },'],
    a.api && [
      '  api: async ({ playwright }, use) => {',
      '    const ctx = await playwright.request.newContext({',
      '      baseURL: env.API_URL,',
      "      extraHTTPHeaders: env.API_TOKEN ? { Authorization: 'Bearer ' + env.API_TOKEN } : {},",
      '    });',
      '    await use(new ApiClient(ctx));',
      '    await ctx.dispose();',
      '  },',
    ],
    a.data && [
      '  // eslint-disable-next-line no-empty-pattern',
      '  user: async ({}, use) => {',
      '    // Usuario 100 % sintético. Si tienes API, créalo aquí vía api.post(...) y bórralo después de use().',
      '    await use(buildUser());',
      '  },',
    ],
    a.db !== 'none' && [
      '  // Una conexión (pool) por worker, cerrada al terminar el worker',
      '  db: [',
      '    // eslint-disable-next-line no-empty-pattern',
      '    async ({}, use) => {',
      '      const db = new Db(env.DB_URL);',
      '      await use(db);',
      '      await db.close();',
      '    },',
      "    { scope: 'worker' },",
      '  ],',
    ],
    '});',
    '',
    'export { expect };',
    '',
  );
}

export function tsHomePage(a: Answers): string {
  const withHeader = a.size !== 'small';
  return lines(
    "import type { Locator, Page } from '@playwright/test';",
    withHeader && "import { HeaderComponent } from '../components/header.component';",
    '',
    '/** Page Object: locators readonly + métodos de intención. Sin aserciones de negocio. */',
    'export class HomePage {',
    '  readonly mainHeading: Locator;',
    withHeader && '  readonly header: HeaderComponent;',
    '',
    '  constructor(private readonly page: Page) {',
    "    this.mainHeading = page.getByRole('heading', { level: 1 });",
    withHeader && "    this.header = new HeaderComponent(page.getByRole('navigation').first());",
    '  }',
    '',
    '  async goto(): Promise<void> {',
    "    await this.page.goto('/');",
    '  }',
    '}',
    '',
  );
}

export function tsHeaderComponent(): string {
  return lines(
    "import type { Locator } from '@playwright/test';",
    '',
    '/** Componente reutilizable: se compone dentro de los Page Objects (composición > herencia). */',
    'export class HeaderComponent {',
    '  readonly links: Locator;',
    '',
    '  constructor(readonly root: Locator) {',
    "    this.links = root.getByRole('link');",
    '  }',
    '',
    '  link(name: string | RegExp): Locator {',
    "    return this.root.getByRole('link', { name });",
    '  }',
    '',
    '  async navigateTo(name: string | RegExp): Promise<void> {',
    '    await this.link(name).click();',
    '  }',
    '}',
    '',
  );
}

export function tsLoginPage(): string {
  return lines(
    "import type { Locator, Page } from '@playwright/test';",
    '',
    '/** Ajusta la ruta y los nombres accesibles a tu aplicación. */',
    'export class LoginPage {',
    '  readonly email: Locator;',
    '  readonly password: Locator;',
    '  readonly submit: Locator;',
    '',
    '  constructor(private readonly page: Page) {',
    '    this.email = page.getByLabel(/correo|email/i);',
    '    this.password = page.getByLabel(/contraseña|password/i);',
    "    this.submit = page.getByRole('button', { name: /iniciar sesión|ingresar|sign in|log in/i });",
    '  }',
    '',
    '  async goto(): Promise<void> {',
    "    await this.page.goto('/login');",
    '  }',
    '',
    '  async signIn(email: string, password: string): Promise<void> {',
    '    await this.email.fill(email);',
    '    await this.password.fill(password);',
    '    await this.submit.click();',
    '  }',
    '}',
    '',
  );
}
