import process from 'node:process';
import readline from 'node:readline/promises';
import type { Option } from '../answers/types.ts';
import { tr } from '../i18n/index.ts';
import { c, log } from './console.ts';

// Cola de líneas: funciona igual en terminal interactiva y con respuestas por pipe (CI, scripts)
let rl: readline.Interface | undefined;
const pendingLines: string[] = [];
const waiters: Array<(line: string) => void> = [];
let inputClosed = false;
const isTTY = Boolean(process.stdin.isTTY);

function ensureReader(): readline.Interface {
  if (rl) return rl;
  if (isTTY) {
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return rl;
  }
  rl = readline.createInterface({ input: process.stdin, terminal: false });
  rl.on('line', (line) => {
    const waiter = waiters.shift();
    if (waiter) waiter(line);
    else pendingLines.push(line);
  });
  rl.on('close', () => {
    inputClosed = true;
    for (const waiter of waiters.splice(0)) waiter('');
  });
  return rl;
}

export function closeReader(): void {
  rl?.close();
}

async function question(text: string): Promise<string> {
  const reader = ensureReader();
  if (isTTY) return (await reader.question(tr(text))).trim();
  process.stdout.write(tr(text));
  let answer: string;
  const pending = pendingLines.shift();
  if (pending !== undefined) answer = pending;
  else if (inputClosed) answer = '';
  else answer = await new Promise<string>((resolve) => waiters.push(resolve));
  process.stdout.write(answer + '\n'); // eco para logs no interactivos
  return answer.trim();
}

/** Devuelve true si el valor es válido o el mensaje de error que se muestra. */
type Validator = (value: string) => true | string;

export async function askText(label: string, def = '', validate: Validator = () => true): Promise<string> {
  for (;;) {
    const hint = def ? c.dim(` (${def})`) : '';
    const v = (await question(`${c.cyan('?')} ${c.bold(label)}${hint}: `)) || def;
    const ok = validate(v);
    if (ok === true) return v;
    log(c.red(`  ✖ ${ok}`));
  }
}

const optionLine = <T extends string>(mark: string, index: number, o: Option<T>): string =>
  `  ${mark} ${c.yellow(index + 1)}) ${o.label}${o.hint ? c.dim(' — ' + o.hint) : ''}`;

export async function askSelect<T extends string>(label: string, options: Option<T>[], def: T): Promise<T> {
  log(`${c.cyan('?')} ${c.bold(label)}`);
  const defIdx = Math.max(
    0,
    options.findIndex((o) => o.value === def),
  );
  options.forEach((o, i) => log(optionLine(i === defIdx ? c.green('›') : ' ', i, o)));
  for (;;) {
    const v = await question(`  ${c.dim(`Elige 1-${options.length}`)} ${c.dim(`(${defIdx + 1})`)}: `);
    if (!v) return options[defIdx].value;
    const n = Number(v);
    if (Number.isInteger(n) && n >= 1 && n <= options.length) return options[n - 1].value;
    log(c.red('  ✖ Opción inválida'));
  }
}

export async function askMulti<T extends string>(
  label: string,
  options: Option<T>[],
  defs: T[] = [],
  { min = 0 } = {},
): Promise<T[]> {
  log(
    `${c.cyan('?')} ${c.bold(label)} ${c.dim('(números separados por coma, Enter = valores marcados, 0 = ninguno)')}`,
  );
  options.forEach((o, i) => log(optionLine(defs.includes(o.value) ? c.green('◉') : '◯', i, o)));
  for (;;) {
    const v = await question('  › ');
    let picked: T[];
    if (!v) picked = defs.filter((d) => options.some((o) => o.value === d));
    else if (v === '0') picked = [];
    else {
      const nums = v
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(Number);
      if (nums.some((n) => !Number.isInteger(n) || n < 1 || n > options.length)) {
        log(c.red('  ✖ Hay números fuera de rango'));
        continue;
      }
      picked = [...new Set(nums.map((n) => options[n - 1].value))];
    }
    if (picked.length < min) {
      log(c.red(`  ✖ Elige al menos ${min}`));
      continue;
    }
    return picked;
  }
}

export async function askConfirm(label: string, def = true): Promise<boolean> {
  for (;;) {
    const v = (
      await question(`${c.cyan('?')} ${c.bold(label)} ${c.dim(def ? '(S/n)' : '(s/N)')}: `)
    ).toLowerCase();
    if (!v) return def;
    if (['s', 'si', 'sí', 'y', 'yes'].includes(v)) return true;
    if (['n', 'no'].includes(v)) return false;
    log(c.red('  ✖ Responde s o n'));
  }
}
