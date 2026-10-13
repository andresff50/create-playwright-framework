// El create-pw-framework.mjs confirmado en el repo es el que sale de src/ y se comporta igual que siempre.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { OUTFILE, bundle } from '../scripts/build.ts';
import { CLI_CASES, runCli } from './helpers/cli-cases.ts';
import { stdoutPath } from './helpers/golden.ts';

const committed = fs.readFileSync(OUTFILE, 'utf8');

test('el bundle está al día con src/', async () => {
  assert.ok((await bundle()) === committed, 'create-pw-framework.mjs está desactualizado: npm run build');
});

test('el bundle solo importa módulos node:', () => {
  const imported = [...committed.matchAll(/^import .* from "([^"]+)";$/gm)].map((m) => m[1]);
  assert.ok(imported.length > 0);
  assert.deepEqual(
    imported.filter((name) => !name.startsWith('node:')),
    [],
  );
});

for (const cliCase of CLI_CASES) {
  test(`terminal: ${cliCase.id}`, () => {
    assert.equal(runCli(OUTFILE, cliCase), fs.readFileSync(stdoutPath(cliCase.id), 'utf8'));
  });
}
