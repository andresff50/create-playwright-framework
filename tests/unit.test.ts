import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { DEFAULTS } from '../src/answers/catalog.ts';
import { normalize } from '../src/answers/normalize.ts';
import { parseArgs } from '../src/cli/args.ts';
import { buildTree } from '../src/templates/docs/tree.ts';
import { has, installBrowsers, lines } from '../src/templates/helpers.ts';
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
