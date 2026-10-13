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
const TIMESTAMP_PREFIX = '// Generado: ';
const TIMESTAMP_LINE = new RegExp(`^${TIMESTAMP_PREFIX}.*\\r?\\n`, 'm');

/** Devuelve el contenido del bundle, sin fecha y sin escribirlo: el mismo src/ da siempre el mismo texto. */
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

/** Añade bajo el aviso de archivo generado la fecha (UTC) en que se generó. */
export function withTimestamp(code: string, date: Date): string {
  const stamp = date.toISOString().replace(/\.\d+Z$/, 'Z');
  return code.replace(`${BANNER}\n`, `${BANNER}\n${TIMESTAMP_PREFIX}${stamp}\n`);
}

/** Quita la línea de fecha para poder comparar el archivo del repo con un bundle recién hecho. */
export const withoutTimestamp = (code: string): string => code.replace(TIMESTAMP_LINE, '');

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const code = await bundle();
  const name = path.basename(OUTFILE);
  const current = fs.existsSync(OUTFILE) ? fs.readFileSync(OUTFILE, 'utf8') : '';
  // La fecha solo cambia cuando cambia el contenido: reconstruir sin cambios no ensucia el repo
  if (TIMESTAMP_LINE.test(current) && withoutTimestamp(current) === code) {
    console.log(`✔ ${name} ya estaba al día`);
  } else {
    fs.writeFileSync(OUTFILE, withTimestamp(code, new Date()), 'utf8');
    console.log(`✔ ${name} (${(code.length / 1024).toFixed(0)} kB)`);
  }
}
