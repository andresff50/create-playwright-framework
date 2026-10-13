import type { Answers } from '../answers/types.ts';
import { DB_URLS } from '../answers/catalog.ts';
import { lines, has } from './helpers.ts';

export function gitignore(): string {
  return lines(
    '# Dependencias',
    'node_modules/',
    '.venv/',
    '__pycache__/',
    '*.pyc',
    '',
    '# Resultados y reportes',
    'test-results/',
    'playwright-report/',
    'blob-report/',
    'reports/',
    'allure-results/',
    'allure-report/',
    '.pytest_cache/',
    '.mypy_cache/',
    '.ruff_cache/',
    '',
    '# Secretos (NUNCA versionar)',
    '.env',
    '.env.*',
    '!.env.example',
    '.auth/',
    '',
    '# Claude Code (personal)',
    'CLAUDE.local.md',
    '.claude/settings.local.json',
    '',
  );
}

export function envExample(a: Answers): string {
  return lines(
    '# Copia este archivo a .env (o .env.<ambiente>) y completa los valores.',
    '# NUNCA subas archivos .env al repositorio. En CI usa secrets/variables del pipeline.',
    `# Ambientes disponibles: ${a.envs.join(', ')}  →  TEST_ENV=<ambiente> carga .env.<ambiente>`,
    '',
    `TEST_ENV=${a.envs.includes('qa') ? 'qa' : (a.envs[0] ?? 'qa')}`,
    `BASE_URL=${a.baseUrl}`,
    a.api && ['', '# API', 'API_URL=', 'API_TOKEN='],
    a.auth && [
      '',
      '# Usuario de pruebas (datos sintéticos, nunca cuentas reales)',
      'TEST_USER_EMAIL=',
      'TEST_USER_PASSWORD=',
    ],
    a.db !== 'none' && [
      '',
      '# Base de datos de QA (usuario de SOLO LECTURA para verificaciones)',
      `DB_URL=${DB_URLS[a.db]}`,
    ],
    '',
  );
}

export function editorconfig(): string {
  return lines(
    'root = true',
    '',
    '[*]',
    'charset = utf-8',
    'end_of_line = lf',
    'indent_style = space',
    'indent_size = 2',
    'insert_final_newline = true',
    'trim_trailing_whitespace = true',
    '',
    '[*.py]',
    'indent_size = 4',
    '',
  );
}

export function dockerignore(): string {
  return lines(
    'node_modules',
    '.venv',
    'test-results',
    'playwright-report',
    'blob-report',
    'reports',
    'allure-results',
    'allure-report',
    '.env',
    '.env.*',
    '!.env.example',
    '.auth',
    '.git',
    '',
  );
}

export function composeFile(a: Answers): string {
  const db = {
    postgres: lines(
      '  db:',
      '    image: postgres:16',
      '    environment:',
      '      POSTGRES_USER: qa_user',
      '      POSTGRES_PASSWORD: qa_pass',
      '      POSTGRES_DB: qa_db',
      '    ports: ["5432:5432"]',
      '    healthcheck:',
      '      test: ["CMD-SHELL", "pg_isready -U qa_user -d qa_db"]',
      '      interval: 3s',
      '      retries: 20',
    ),
    mysql: lines(
      '  db:',
      '    image: mysql:8.4',
      '    environment:',
      '      MYSQL_DATABASE: qa_db',
      '      MYSQL_USER: qa_user',
      '      MYSQL_PASSWORD: qa_pass',
      '      MYSQL_ROOT_PASSWORD: root_pass',
      '    ports: ["3306:3306"]',
      '    healthcheck:',
      '      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]',
      '      interval: 3s',
      '      retries: 30',
    ),
    mssql: lines(
      '  db:',
      '    image: mcr.microsoft.com/mssql/server:2022-latest',
      '    environment:',
      '      ACCEPT_EULA: "Y"',
      '      MSSQL_SA_PASSWORD: "Qa_Passw0rd!"',
      '    ports: ["1433:1433"]',
    ),
    mongodb: lines(
      '  db:',
      '    image: mongo:7',
      '    ports: ["27017:27017"]',
      '    healthcheck:',
      '      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand(\'ping\')"]',
      '      interval: 5s',
      '      retries: 20',
    ),
  };
  const dbUrlInCompose = a.db === 'none' ? null : DB_URLS[a.db].replace('localhost', 'db');
  const dependsOn =
    a.db === 'none'
      ? null
      : a.db === 'mssql'
        ? ['    depends_on: [db]']
        : ['    depends_on:', '      db:', '        condition: service_healthy'];
  return lines(
    '# docker compose up --build --exit-code-from tests',
    'services:',
    a.db !== 'none' && db[a.db],
    '  tests:',
    '    build: .',
    '    ipc: host',
    '    env_file:',
    '      - path: .env',
    '        required: false',
    '    environment:',
    '      CI: "true"',
    `      BASE_URL: \${BASE_URL:-${a.baseUrl}}`,
    dbUrlInCompose && `      DB_URL: ${dbUrlInCompose}`,
    dependsOn,
    '    volumes:',
    a.lang === 'ts' ? '      - ./playwright-report:/e2e/playwright-report' : '      - ./reports:/e2e/reports',
    '      - ./test-results:/e2e/test-results',
    has(a, 'reporters', 'allure') && '      - ./allure-results:/e2e/allure-results',
    '',
  );
}
