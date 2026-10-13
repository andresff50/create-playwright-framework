// Ejecuciones del CLI cuya salida de terminal se compara con tests/golden/stdout/<id>.txt
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { EXAMPLES_DIR } from './matrix.ts';

export interface CliCase {
  id: string;
  args: string[];
  /** Respuestas por pipe, una por línea (modo interactivo sin TTY). */
  stdin?: string[];
}

const example = (name: string): string => path.join(EXAMPLES_DIR, name);

export const CLI_CASES: CliCase[] = [
  { id: 'help-es', args: ['--help'] },
  { id: 'help-en', args: ['--help', '--lang', 'en'] },
  { id: 'yes-es', args: ['--yes', '--out', './out', '--no-install'] },
  { id: 'yes-en', args: ['--yes', '--lang', 'en', '--out', './out', '--no-install'] },
  {
    id: 'answers-py-es',
    args: ['--answers', example('py-grande-postgres.json'), '--out', './out', '--no-install'],
  },
  {
    id: 'answers-ts-en',
    args: ['--answers', example('en-ts-large-postgres.json'), '--out', './out', '--no-install'],
  },
  {
    id: 'answers-lang-override',
    args: ['--answers', example('ts-pequeno.json'), '--lang', 'en', '--out', './out', '--no-install'],
  },
  {
    id: 'interactive-es',
    args: [],
    stdin: [
      '1', // idioma: Español
      'Nombre Malo', // inválido → vuelve a preguntar
      'demo-es',
      '2', // Python
      '3', // grande
      'ftp://x', // URL inválida
      'https://example.com',
      'qa, staging',
      '9', // fuera de rango
      '1,2',
      's', // API
      '2', // postgres
      'n', // datos
      's', // auth
      '1', // a11y
      's', // BDD
      '1,2', // reportes
      '3', // compose
      '1,3', // github + gitlab
      '20', // shards inválido
      '2',
      's', // lint
      'quizas', // respuesta inválida
      'n', // precommit
      's', // claude
      'n', // git
      './out',
      's', // generar
      'n', // instalar
    ],
  },
  {
    id: 'interactive-en',
    args: [],
    stdin: [
      '2',
      'demo-en',
      '',
      '1',
      '',
      '',
      '',
      'y',
      '',
      'y',
      'n',
      '0',
      'y',
      '0',
      '',
      '0',
      'y',
      'y',
      'n',
      'n',
      './out',
      'y',
      'n',
    ],
  },
  { id: 'interactive-defaults', args: ['--lang', 'en', '--out', './out', '--no-install'], stdin: [] },
  {
    id: 'interactive-cancel',
    args: ['--lang', 'es'],
    stdin: ['x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'n'],
  },
];

/** Ejecuta el generador en una carpeta temporal y devuelve stdout con la ruta temporal normalizada. */
export function runCli(generator: string, cliCase: CliCase): string {
  const cwd = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'cpf-cli-')));
  try {
    const r = spawnSync(process.execPath, [generator, ...cliCase.args], {
      cwd,
      input: (cliCase.stdin ?? []).map((l) => l + '\n').join(''),
      encoding: 'utf8',
      env: { ...process.env, NO_COLOR: '1' },
    });
    if (r.status !== 0) throw new Error(`${cliCase.id}: código ${r.status}\n${r.stderr}`);
    return r.stdout
      .split(cwd + path.sep)
      .join('<CWD>/')
      .split(cwd)
      .join('<CWD>')
      .replace(/\r\n/g, '\n');
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
}
