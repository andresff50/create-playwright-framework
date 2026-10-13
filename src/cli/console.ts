import process from 'node:process';
import { tr } from '../i18n/index.ts';

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint =
  (code: string) =>
  (s: unknown): string =>
    useColor ? `\x1b[${code}m${s}\x1b[0m` : String(s);

export const c = {
  bold: paint('1'),
  dim: paint('2'),
  green: paint('32'),
  cyan: paint('36'),
  yellow: paint('33'),
  red: paint('31'),
  magenta: paint('35'),
};

/** console.log que traduce cada texto al idioma activo. */
export const log = (...args: unknown[]): void =>
  console.log(...args.map((x) => (typeof x === 'string' ? tr(x) : x)));
