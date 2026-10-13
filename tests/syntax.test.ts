// Los JSON y YAML generados son sintácticamente válidos.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parse as parseYaml } from 'yaml';
import { GENERATED } from './helpers/generate.ts';

for (const g of GENERATED) {
  test(`JSON y YAML válidos: ${g.id}`, () => {
    let checked = 0;
    for (const [rel, content] of g.files) {
      if (rel.endsWith('.json')) JSON.parse(content);
      else if (/\.ya?ml$/.test(rel)) parseYaml(content);
      else continue;
      checked++;
    }
    assert.ok(checked > 0);
  });
}
