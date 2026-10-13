// Empaqueta src/ en un único create-pw-framework.mjs sin dependencias (solo módulos node:).
// Uso: npm run build
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const OUTFILE = path.join(ROOT, 'create-pw-framework.mjs');

const BANNER = '// ARCHIVO GENERADO por `npm run build` a partir de src/. No lo edites a mano.';

/** Devuelve el contenido del bundle sin escribirlo (lo usa el test que comprueba que está al día). */
export async function bundle(): Promise<string> {
  const result = await build({
    absWorkingDir: ROOT,
    entryPoints: ['src/cli.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    charset: 'utf8',
    legalComments: 'none',
    banner: { js: BANNER },
    write: false,
    logLevel: 'warning',
  });
  return result.outputFiles[0].text;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const code = await bundle();
  fs.writeFileSync(OUTFILE, code, 'utf8');
  console.log(`✔ ${path.basename(OUTFILE)} (${(code.length / 1024).toFixed(0)} kB)`);
}
