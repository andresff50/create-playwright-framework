// La salida del generador no cambia sin querer: cada archivo de cada variante coincide con la referencia.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GENERATED } from './helpers/generate.ts';
import { hashFiles, readManifest } from './helpers/golden.ts';

const manifest = readManifest();

test('la matriz y la referencia golden tienen las mismas variantes', () => {
  assert.deepEqual(GENERATED.map((g) => g.id).sort(), Object.keys(manifest).sort());
});

for (const g of GENERATED) {
  test(`golden: ${g.id}`, () => {
    assert.deepEqual(
      hashFiles(g.files),
      manifest[g.id],
      'si el cambio es intencionado: npm run test:update-golden',
    );
  });
}
