// Matriz de variantes que se generan en los tests (golden, restos de español, sintaxis).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const EXAMPLES_DIR = path.join(ROOT, 'ejemplos');

export interface Variant {
  id: string;
  raw: Record<string, unknown>;
}

const LANGS = ['ts', 'py'] as const;
const LANGUAGES = ['es', 'en'] as const;
const DBS = ['postgres', 'mysql', 'mssql', 'mongodb'] as const;

// Proyecto grande con todas las opciones activas
const FULL = {
  size: 'large',
  envs: ['dev', 'qa', 'staging'],
  browsers: ['chromium', 'firefox', 'mobile-chrome'],
  reporters: ['html', 'junit', 'allure', 'metrics'],
  api: true,
  data: true,
  auth: true,
  extras: ['a11y', 'visual'],
  bdd: true,
  docker: 'compose',
  ci: ['github', 'jenkins', 'gitlab', 'azure'],
  shards: 3,
  lint: true,
  precommit: true,
  claude: true,
  git: false,
};

function fullVariants(): Variant[] {
  const out: Variant[] = [];
  for (const lang of LANGS) {
    for (const db of DBS) {
      for (const language of LANGUAGES) {
        out.push({
          id: `${language}-${lang}-${db}`,
          raw: { name: `chk-${lang}-${db}`, lang, db, ...FULL, language },
        });
      }
    }
  }
  return out;
}

function sizeVariants(): Variant[] {
  const out: Variant[] = [];
  for (const lang of LANGS) {
    for (const size of ['small', 'medium']) {
      out.push({ id: `en-${size}-${lang}`, raw: { name: 'chk', lang, size, git: false, language: 'en' } });
    }
  }
  return out;
}

// Ramas que la matriz principal no toca: opciones apagadas, un solo CI, sin CI, móviles, sin reportes...
function edgeVariants(): Variant[] {
  const out: Variant[] = [];
  for (const lang of LANGS) {
    for (const language of LANGUAGES) {
      out.push(
        {
          id: `edge-minimal-${language}-${lang}`,
          raw: {
            name: 'edge-minimal',
            lang,
            size: 'large',
            envs: ['qa'],
            browsers: ['webkit'],
            reporters: [],
            api: false,
            db: 'none',
            data: false,
            auth: false,
            extras: [],
            docker: 'none',
            ci: [],
            shards: 4,
            lint: false,
            precommit: true,
            claude: false,
            git: false,
            language,
          },
        },
        {
          id: `edge-jenkins-${language}-${lang}`,
          raw: {
            name: 'edge-jenkins',
            lang,
            size: 'medium',
            browsers: ['mobile-safari', 'chromium'],
            reporters: ['allure'],
            api: false,
            db: 'mysql',
            bdd: true,
            docker: 'dockerfile',
            ci: ['jenkins'],
            shards: 1,
            precommit: false,
            claude: true,
            git: false,
            language,
          },
        },
        {
          id: `edge-gitlab-azure-${language}-${lang}`,
          raw: {
            name: 'edge-gitlab-azure',
            lang,
            size: 'small',
            browsers: [],
            reporters: ['metrics'],
            api: true,
            auth: true,
            extras: ['visual'],
            bdd: true,
            docker: 'compose',
            ci: ['gitlab', 'azure'],
            shards: 2,
            claude: true,
            git: false,
            language,
          },
        },
      );
    }
  }
  return out;
}

function exampleVariants(): Variant[] {
  return fs
    .readdirSync(EXAMPLES_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({
      id: `ejemplo-${path.basename(f, '.json')}`,
      raw: JSON.parse(fs.readFileSync(path.join(EXAMPLES_DIR, f), 'utf8')) as Record<string, unknown>,
    }));
}

// Equivalente a --yes
function yesVariants(): Variant[] {
  return LANGUAGES.map((language) => ({
    id: `yes-${language}`,
    raw: { size: 'medium', lang: 'ts', language },
  }));
}

export const VARIANTS: Variant[] = [
  ...fullVariants(),
  ...sizeVariants(),
  ...edgeVariants(),
  ...exampleVariants(),
  ...yesVariants(),
];
