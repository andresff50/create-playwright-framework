import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import type { Answers } from '../answers/types.ts';
import { c, log } from '../cli/console.ts';
import { installBrowsers, usesPoetry } from '../templates/helpers.ts';

const isWindows = process.platform === 'win32';

function run(cmd: string, args: string[], cwd: string): boolean {
  log(c.dim(`  $ ${cmd} ${args.join(' ')}`));
  const r = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: isWindows });
  return r.status === 0;
}

/** Indica si un comando existe en el PATH, sin mostrar su salida. */
function hasCommand(cmd: string, cwd: string): boolean {
  return spawnSync(cmd, ['--version'], { cwd, stdio: 'ignore', shell: isWindows }).status === 0;
}

/** Inicializa git en el proyecto generado si aún no es un repositorio. Devuelve true si lo creó. */
export function initGit(outDir: string): boolean {
  if (fs.existsSync(path.join(outDir, '.git'))) return false;
  return spawnSync('git', ['init', '-q'], { cwd: outDir, shell: isWindows }).status === 0;
}

/** Instala dependencias y navegadores. Devuelve false en cuanto un paso falla. */
export function install(a: Answers, outDir: string): boolean {
  if (a.lang === 'ts') {
    if (!run('npm', ['install'], outDir)) return false;
    return run('npx', ['playwright', 'install', ...installBrowsers(a)], outDir);
  }
  return usesPoetry(a) ? installWithPoetry(a, outDir) : installWithPip(a, outDir);
}

function installWithPip(a: Answers, outDir: string): boolean {
  const sysPy = isWindows ? 'python' : 'python3';
  if (!run(sysPy, ['-m', 'venv', '.venv'], outDir)) return false;
  const vpy = isWindows ? path.join('.venv', 'Scripts', 'python.exe') : path.join('.venv', 'bin', 'python');
  if (!run(vpy, ['-m', 'pip', 'install', '-q', '-r', 'requirements.txt'], outDir)) return false;
  if (!run(vpy, ['-m', 'playwright', 'install', ...installBrowsers(a)], outDir)) return false;
  if (a.precommit && a.git) run(vpy, ['-m', 'pre_commit', 'install'], outDir);
  return true;
}

function installWithPoetry(a: Answers, outDir: string): boolean {
  if (!hasCommand('poetry', outDir)) {
    log(c.yellow('  Poetry no está instalado: https://python-poetry.org/docs/#installation'));
    return false;
  }
  if (!run('poetry', ['install', '--no-interaction'], outDir)) return false;
  const poetryRun = (...args: string[]): boolean => run('poetry', ['run', ...args], outDir);
  if (!poetryRun('python', '-m', 'playwright', 'install', ...installBrowsers(a))) return false;
  if (a.precommit && a.git) poetryRun('pre-commit', 'install');
  return true;
}
