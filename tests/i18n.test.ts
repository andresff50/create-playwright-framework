import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PAIRS } from '../src/i18n/en.ts';
import { translate } from '../src/i18n/index.ts';

test('ninguna clave tiene dos traducciones distintas', () => {
  const seen = new Map<string, string>();
  for (const [es, en] of PAIRS) {
    const previous = seen.get(es);
    assert.ok(previous === undefined || previous === en, `clave duplicada con traducciones distintas: ${es}`);
    seen.set(es, en);
  }
});

test('no hay claves vacías', () => {
  assert.deepEqual(
    PAIRS.filter(([es]) => es === ''),
    [],
  );
});

test('translate deja el texto intacto en español', () => {
  assert.equal(translate('Opción inválida', 'es'), 'Opción inválida');
});

test('translate aplica primero la clave más larga', () => {
  // "Elige al menos " y "Elige " son claves: la corta no debe romper la larga
  assert.equal(translate('Elige al menos 1', 'en'), 'Choose at least 1');
  assert.equal(translate('Elige 1-3', 'en'), 'Choose 1-3');
});
