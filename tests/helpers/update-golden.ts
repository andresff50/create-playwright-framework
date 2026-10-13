// Regenera la referencia golden. Úsalo SOLO cuando el cambio en la salida es intencionado
// y revisa el diff de tests/golden antes de confirmar.  Uso: npm run test:update-golden
import fs from 'node:fs';
import { OUTFILE } from '../../scripts/build.ts';
import { CLI_CASES, runCli } from './cli-cases.ts';
import { GENERATED } from './generate.ts';
import { STDOUT_DIR, hashFiles, stdoutPath, writeManifest, type Manifest } from './golden.ts';

const manifest: Manifest = {};
for (const g of GENERATED) manifest[g.id] = hashFiles(g.files);
writeManifest(manifest);

fs.rmSync(STDOUT_DIR, { recursive: true, force: true });
fs.mkdirSync(STDOUT_DIR, { recursive: true });
for (const cliCase of CLI_CASES) fs.writeFileSync(stdoutPath(cliCase.id), runCli(OUTFILE, cliCase), 'utf8');

console.log(`✔ ${GENERATED.length} variantes y ${CLI_CASES.length} casos del CLI actualizados`);
