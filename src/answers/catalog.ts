import type {
  Browser,
  Ci,
  Db,
  DbEngine,
  Docker,
  Extra,
  Lang,
  Option,
  PackageManager,
  Reporter,
  Size,
  SizeDefaults,
} from './types.ts';

export const SIZES: Option<Size>[] = [
  { value: 'small', label: 'Pequeño', hint: '1 equipo, < 100 tests, estructura simple' },
  { value: 'medium', label: 'Mediano', hint: 'varios flujos, componentes, API y datos' },
  { value: 'large', label: 'Grande / empresarial', hint: 'varios equipos, sharding, BD, métricas, gobierno' },
];

export const DEFAULTS: Record<Size, SizeDefaults> = {
  small: {
    envs: ['qa'],
    browsers: ['chromium'],
    reporters: ['html'],
    api: false,
    db: 'none',
    data: true,
    auth: false,
    extras: [],
    bdd: false,
    docker: 'none',
    ci: ['github'],
    shards: 1,
    lint: true,
    precommit: false,
    claude: false,
  },
  medium: {
    envs: ['qa', 'staging'],
    browsers: ['chromium', 'firefox'],
    reporters: ['html', 'junit'],
    api: true,
    db: 'none',
    data: true,
    auth: true,
    extras: ['a11y'],
    bdd: false,
    docker: 'dockerfile',
    ci: ['github'],
    shards: 2,
    lint: true,
    precommit: true,
    claude: true,
  },
  large: {
    envs: ['dev', 'qa', 'staging'],
    browsers: ['chromium', 'firefox', 'webkit'],
    reporters: ['html', 'junit', 'allure', 'metrics'],
    api: true,
    db: 'postgres',
    data: true,
    auth: true,
    extras: ['a11y', 'visual'],
    bdd: false,
    docker: 'compose',
    ci: ['github'],
    shards: 4,
    lint: true,
    precommit: true,
    claude: true,
  },
};

/** Gestores de dependencias que se pueden elegir en Python (TypeScript usa siempre npm). */
export const PY_PACKAGE_MANAGER_OPTIONS: Option<Exclude<PackageManager, 'npm'>>[] = [
  { value: 'pip', label: 'pip + requirements.txt', hint: 'entorno virtual manual' },
  { value: 'poetry', label: 'Poetry', hint: 'pyproject.toml + poetry.lock' },
];

const MOBILE_BROWSERS: Option<Browser>[] = [
  { value: 'mobile-chrome', label: 'Móvil Android (Pixel 7)' },
  { value: 'mobile-safari', label: 'Móvil iOS (iPhone 15)' },
];

export const browserOptions = (lang: Lang): Option<Browser>[] => [
  { value: 'chromium', label: 'Chromium (Desktop Chrome)' },
  { value: 'firefox', label: 'Firefox' },
  { value: 'webkit', label: 'WebKit (Safari)' },
  ...(lang === 'ts' ? MOBILE_BROWSERS : []),
];

export const reporterOptions = (lang: Lang): Option<Reporter>[] => [
  { value: 'html', label: lang === 'ts' ? 'HTML nativo de Playwright' : 'HTML (pytest-html)' },
  { value: 'junit', label: 'JUnit XML', hint: 'Jenkins, Azure DevOps, GitLab, Xray, TestRail' },
  { value: 'allure', label: 'Allure Report' },
  {
    value: 'metrics',
    label: 'Reporter de métricas propio (JSON)',
    hint: 'flaky rate, duración, tests lentos',
  },
];

export const DB_OPTIONS: Option<Db>[] = [
  { value: 'none', label: 'Sin base de datos' },
  { value: 'postgres', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL / MariaDB' },
  { value: 'mssql', label: 'SQL Server' },
  { value: 'mongodb', label: 'MongoDB' },
];

const VISUAL_EXTRA: Option<Extra> = { value: 'visual', label: 'Regresión visual (toHaveScreenshot)' };

export const extraOptions = (lang: Lang): Option<Extra>[] => [
  { value: 'a11y', label: 'Accesibilidad con axe-core' },
  ...(lang === 'ts' ? [VISUAL_EXTRA] : []),
];

export const DOCKER_OPTIONS: Option<Docker>[] = [
  { value: 'none', label: 'Sin contenedores' },
  { value: 'dockerfile', label: 'Dockerfile para ejecutar los tests' },
  { value: 'compose', label: 'Dockerfile + docker-compose', hint: 'tests + base de datos efímera' },
];

export const CI_OPTIONS: Option<Ci>[] = [
  { value: 'github', label: 'GitHub Actions' },
  { value: 'jenkins', label: 'Jenkins (Jenkinsfile)' },
  { value: 'gitlab', label: 'GitLab CI' },
  { value: 'azure', label: 'Azure DevOps' },
];

export const DB_URLS: Record<DbEngine, string> = {
  postgres: 'postgresql://qa_user:qa_pass@localhost:5432/qa_db',
  mysql: 'mysql://qa_user:qa_pass@localhost:3306/qa_db',
  mssql: 'mssql://sa:Qa_Passw0rd!@localhost:1433/qa_db',
  mongodb: 'mongodb://localhost:27017/qa_db',
};
