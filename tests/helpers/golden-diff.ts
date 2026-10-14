// Resume qué archivos cambian respecto a la referencia golden, agrupando las variantes con el mismo cambio.
// Uso: node tests/helpers/golden-diff.ts   (antes de npm run test:update-golden)
import { GENERATED } from './generate.ts';
import { hashFiles, readManifest } from './golden.ts';

const manifest = readManifest();
const groups = new Map<string, string[]>();

for (const g of GENERATED) {
  const before = manifest[g.id] ?? {};
  const after = hashFiles(g.files);
  const changes = [
    ...Object.keys(after)
      .filter((rel) => before[rel] !== after[rel])
      .map((rel) => `${rel in before ? '~' : '+'} ${rel}`),
    ...Object.keys(before)
      .filter((rel) => !(rel in after))
      .map((rel) => `- ${rel}`),
  ];
  const key = changes.length > 0 ? changes.join('\n  ') : '(sin cambios)';
  groups.set(key, [...(groups.get(key) ?? []), g.id]);
}

for (const [changes, ids] of groups) console.log(`${ids.join(', ')}\n  ${changes}\n`);
