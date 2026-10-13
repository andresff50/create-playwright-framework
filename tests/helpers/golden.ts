// Referencia "golden": hash de cada archivo generado por variante y salida de terminal de los casos del CLI.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './matrix.ts';

export const GOLDEN_DIR = path.join(ROOT, 'tests', 'golden');
export const MANIFEST_PATH = path.join(GOLDEN_DIR, 'manifest.json');
export const STDOUT_DIR = path.join(GOLDEN_DIR, 'stdout');

/** ruta relativa → hash del contenido */
export type FileHashes = Record<string, string>;
/** id de variante → hashes de sus archivos */
export type Manifest = Record<string, FileHashes>;

export const hashContent = (content: string | Uint8Array): string =>
  createHash('sha256').update(content).digest('hex').slice(0, 16);

export function hashFiles(files: Iterable<[string, string]>): FileHashes {
  const entries = [...files].map(([rel, content]): [string, string] => [rel, hashContent(content)]);
  return Object.fromEntries(entries.sort(([x], [y]) => (x < y ? -1 : x > y ? 1 : 0)));
}

export const readManifest = (): Manifest => JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) as Manifest;

export function writeManifest(manifest: Manifest): void {
  fs.mkdirSync(GOLDEN_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 1) + '\n', 'utf8');
}

export const stdoutPath = (id: string): string => path.join(STDOUT_DIR, `${id}.txt`);
