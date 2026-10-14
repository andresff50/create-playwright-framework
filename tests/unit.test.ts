import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { parse as parseToml } from 'smol-toml';
import { DEFAULTS } from '../src/answers/catalog.ts';
import { normalize } from '../src/answers/normalize.ts';
import type { RawAnswers } from '../src/answers/types.ts';
import { buildProject } from '../src/project/build.ts';
import { parseArgs } from '../src/cli/args.ts';
import { buildTree } from '../src/templates/docs/tree.ts';
import { has, installBrowsers, lines, pyRun } from '../src/templates/helpers.ts';
import { pyProject } from '../src/templates/py/config.ts';
import { pyRequirements } from '../src/templates/py/deps.ts';
import { GENERATOR_VERSION } from '../src/version.ts';
import { ROOT } from './helpers/matrix.ts';

test('lines aplana arrays e ignora false, null y undefined', () => {
  assert.equal(lines('a', false, ['b', [null, 'c']], undefined, ''), 'a\nb\nc\n');
});

test('normalize: sin respuestas usa el proyecto mediano en TypeScript y español', () => {
  const a = normalize({});
  assert.deepEqual(
    { size: a.size, lang: a.lang, language: a.language, name: a.name, git: a.git },
    { size: 'medium', lang: 'ts', language: 'es', name: 'qa-e2e-framework', git: true },
  );
  assert.deepEqual(a.browsers, DEFAULTS.medium.browsers);
});

test('normalize: Python no admite móviles ni regresión visual', () => {
  const a = normalize({ lang: 'py', browsers: ['mobile-chrome', 'firefox'], extras: ['a11y', 'visual'] });
  assert.deepEqual(a.browsers, ['firefox']);
  assert.deepEqual(a.extras, ['a11y']);
});

test('normalize: sin navegadores queda chromium', () => {
  assert.deepEqual(normalize({ lang: 'py', browsers: ['mobile-safari'] }).browsers, ['chromium']);
});

test('normalize: Jenkins, GitLab y Azure exigen el reporte JUnit', () => {
  assert.deepEqual(normalize({ ci: ['gitlab'], reporters: ['html'] }).reporters, ['html', 'junit']);
  assert.deepEqual(normalize({ ci: ['github'], reporters: ['html'] }).reporters, ['html']);
});

test('normalize: sin CI no hay shards y sin lint no hay pre-commit', () => {
  const a = normalize({ ci: [], shards: 8, lint: false, precommit: true });
  assert.equal(a.shards, 1);
  assert.equal(a.precommit, false);
});

test('normalize no modifica los valores por defecto', () => {
  const before = structuredClone(DEFAULTS);
  normalize({ size: 'large', lang: 'py', ci: ['azure'] });
  assert.deepEqual(DEFAULTS, before);
});

test('normalize: npm en TypeScript; en Python pip salvo que se pida Poetry', () => {
  assert.equal(normalize({ lang: 'ts', packageManager: 'poetry' }).packageManager, 'npm');
  assert.equal(normalize({ lang: 'py' }).packageManager, 'pip');
  assert.equal(normalize({ lang: 'py', packageManager: 'npm' }).packageManager, 'pip');
  assert.equal(normalize({ lang: 'py', packageManager: 'poetry' }).packageManager, 'poetry');
});

test('pyRun antepone `poetry run` solo con Poetry', () => {
  assert.equal(pyRun(normalize({ lang: 'py' }), 'pytest -m smoke'), 'pytest -m smoke');
  assert.equal(
    pyRun(normalize({ lang: 'py', packageManager: 'poetry' }), 'pytest -m smoke'),
    'poetry run pytest -m smoke',
  );
});

test('pip y Poetry declaran los mismos paquetes', () => {
  const raw: RawAnswers = { lang: 'py', size: 'large', bdd: true, ci: ['github', 'gitlab'], shards: 3 };
  const fromRequirements = pyRequirements(normalize(raw))
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(' #')[0]?.trim());

  const poetry = normalize({ ...raw, packageManager: 'poetry' });
  const pyproject = parseToml(pyProject(poetry)) as {
    project: { dependencies: string[] };
    'dependency-groups': { dev: string[] };
  };
  const fromPyproject = [...pyproject.project.dependencies, ...pyproject['dependency-groups'].dev];

  assert.deepEqual(fromPyproject, fromRequirements);
  assert.deepEqual(pyproject['dependency-groups'].dev, ['ruff>=0.6', 'mypy>=1.11', 'pre-commit>=3.8']);
  assert.equal(buildProject(poetry).has('requirements.txt'), false);
  assert.equal(buildProject(poetry).has('poetry.toml'), true);
});

test('has e installBrowsers', () => {
  const a = normalize({ browsers: ['mobile-chrome', 'chromium', 'mobile-safari'] });
  assert.equal(has(a, 'browsers', 'mobile-chrome'), true);
  assert.equal(has(a, 'browsers', 'firefox'), false);
  assert.deepEqual(installBrowsers(a), ['chromium', 'webkit']);
});

test('buildTree: carpetas antes que archivos', () => {
  assert.equal(
    buildTree(['README.md', 'src/b.ts', 'src/a/x.ts']),
    ['├── src/', '│   ├── a/', '│   │   └── x.ts', '│   └── b.ts', '└── README.md'].join('\n'),
  );
});

test('parseArgs', () => {
  assert.deepEqual(parseArgs(['-y', '--out', 'x', '--lang', 'en', '--no-install']), {
    yes: true,
    answers: null,
    out: 'x',
    install: false,
    help: false,
    lang: 'en',
  });
  assert.equal(parseArgs(['--lang', 'fr']).lang, 'es');
  assert.equal(parseArgs([]).install, null);
});

test('la versión del generador coincide con package.json', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')) as { version: string };
  assert.equal(GENERATOR_VERSION, pkg.version);
});
