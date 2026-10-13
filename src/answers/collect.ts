import fs from 'node:fs';
import type { CliArgs } from '../cli/args.ts';
import { c, log } from '../cli/console.ts';
import { askConfirm, askMulti, askSelect, askText } from '../cli/prompts.ts';
import { getLanguage } from '../i18n/index.ts';
import {
  CI_OPTIONS,
  DB_OPTIONS,
  DEFAULTS,
  DOCKER_OPTIONS,
  SIZES,
  browserOptions,
  extraOptions,
  reporterOptions,
} from './catalog.ts';
import { normalize } from './normalize.ts';
import type { Answers, Lang, Option, RawAnswers } from './types.ts';

const LANG_OPTIONS: Option<Lang>[] = [
  { value: 'ts', label: 'TypeScript', hint: '@playwright/test (runner nativo)' },
  { value: 'py', label: 'Python', hint: 'pytest + pytest-playwright' },
];

const section = (title: string): void => log(c.magenta(`\n── ${title}`));

/** Respuestas desde --answers, desde --yes o preguntando en la terminal. */
export async function collectAnswers(args: CliArgs): Promise<Answers> {
  if (args.answers) {
    const file = JSON.parse(fs.readFileSync(args.answers, 'utf8')) as RawAnswers;
    return normalize({ ...file, ...(args.lang ? { language: args.lang } : {}) });
  }
  if (args.yes) return normalize({ size: 'medium', lang: 'ts', language: args.lang ?? 'es' });
  return normalize(await askAnswers());
}

async function askAnswers(): Promise<RawAnswers> {
  const a: RawAnswers = { language: getLanguage() };

  section('1. Proyecto ───────────────────────────────────────────');
  a.name = await askText(
    'Nombre del proyecto',
    'qa-e2e-framework',
    (v) => /^[a-z0-9][a-z0-9._-]*$/.test(v) || 'Usa minúsculas, números, puntos o guiones',
  );
  const lang = await askSelect('Lenguaje del framework', LANG_OPTIONS, 'ts');
  a.lang = lang;
  a.size = await askSelect('Tamaño / escala del proyecto (define valores sugeridos)', SIZES, 'medium');
  const d = DEFAULTS[a.size];

  section('2. Aplicación y ejecución ──────────────────────────────');
  a.baseUrl = await askText(
    'URL base de la aplicación bajo prueba',
    'https://playwright.dev',
    (v) => /^https?:\/\/\S+$/.test(v) || 'Debe empezar por http:// o https://',
  );
  a.envs = (await askText('Ambientes (separados por coma)', d.envs.join(',')))
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  a.browsers = await askMulti('Navegadores / dispositivos', browserOptions(lang), d.browsers, { min: 1 });

  section('3. Capas del framework ─────────────────────────────────');
  a.api = await askConfirm('¿Incluir pruebas de API y cliente API para setup de datos?', d.api);
  a.db = await askSelect('Conexión a base de datos', DB_OPTIONS, d.db);
  a.data = await askConfirm('¿Incluir factories de datos sintéticos (Faker)?', d.data);
  a.auth = await askConfirm('¿Incluir autenticación reutilizable (storageState / login una vez)?', d.auth);
  a.extras = await askMulti(
    'Pruebas adicionales',
    extraOptions(lang),
    d.extras.filter((e) => lang === 'ts' || e !== 'visual'),
  );
  a.bdd = await askConfirm(
    lang === 'ts' ? '¿Incluir BDD con Gherkin (Cucumber)?' : '¿Incluir BDD con Gherkin (Behave)?',
    d.bdd,
  );

  section('4. Reportes y métricas ─────────────────────────────────');
  a.reporters = await askMulti('Reportes a integrar', reporterOptions(lang), d.reporters);

  section('5. Infraestructura y CI/CD ─────────────────────────────');
  a.docker = await askSelect('Contenedores', DOCKER_OPTIONS, d.docker);
  a.ci = await askMulti('Pipelines de CI/CD', CI_OPTIONS, d.ci);
  a.shards = a.ci.length ? await askShards(d.shards) : 1;

  section('6. Calidad e IA ────────────────────────────────────────');
  a.lint = await askConfirm(
    lang === 'ts'
      ? '¿Linters y formateo (ESLint + eslint-plugin-playwright + Prettier)?'
      : '¿Linters y tipado (Ruff + mypy)?',
    d.lint,
  );
  a.precommit = a.lint
    ? await askConfirm(
        lang === 'ts' ? '¿Hooks de pre-commit (husky + lint-staged)?' : '¿Hooks de pre-commit (pre-commit)?',
        d.precommit,
      )
    : false;
  a.claude = await askConfirm(
    '¿Integrar Claude Code (CLAUDE.md, bloqueo de .env, hooks, skills, subagentes, MCP)?',
    d.claude,
  );
  a.git = await askConfirm('¿Inicializar repositorio git?', true);
  return a;
}

async function askShards(def: number): Promise<number> {
  const answer = await askText(
    'Número de shards (máquinas en paralelo) en CI',
    String(def),
    (v) => (/^\d+$/.test(v) && +v >= 1 && +v <= 16) || 'Número entre 1 y 16',
  );
  return Number(answer);
}
