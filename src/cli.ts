#!/usr/bin/env node
/**
 * create-pw-framework — Generador interactivo de frameworks Playwright (TypeScript o Python).
 *
 * Uso:
 *   node create-pw-framework.mjs                 # modo interactivo
 *   node create-pw-framework.mjs --yes           # todo por defecto (proyecto mediano en TS)
 *   node create-pw-framework.mjs --answers a.json [--out ./carpeta] [--no-install]
 *
 * Sin dependencias: requiere solo Node.js 18+.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { collectAnswers } from './answers/collect.ts';
import type { Answers, Language, Option } from './answers/types.ts';
import { parseArgs, type CliArgs } from './cli/args.ts';
import { c, log } from './cli/console.ts';
import { askConfirm, askSelect, askText, closeReader } from './cli/prompts.ts';
import { help, printNextSteps, printSummary } from './cli/summary.ts';
import { setLanguage } from './i18n/index.ts';
import { buildProject } from './project/build.ts';
import { initGit, install } from './project/install.ts';
import { writeProject } from './project/write.ts';
import { GENERATOR_VERSION, PW_VERSION } from './version.ts';

const LANGUAGE_OPTIONS: Option<Language>[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

function requireNode18(): void {
  const [major] = process.versions.node.split('.').map(Number);
  if (major < 18) {
    log(c.red('Se requiere Node.js 18 o superior.'));
    process.exit(1);
  }
}

async function resolveOutDir(args: CliArgs, a: Answers, interactive: boolean): Promise<string> {
  const suggested = `./${a.name}`;
  return path.resolve(args.out ?? (interactive ? await askText('Carpeta de salida', suggested) : suggested));
}

/** En modo interactivo pide confirmación para generar y para escribir en una carpeta con contenido. */
async function confirmGeneration(outDir: string, interactive: boolean): Promise<boolean> {
  if (!interactive) return true;
  if (!(await askConfirm('¿Generar el proyecto con esta configuración?', true))) return false;
  const notEmpty = fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0;
  return !notEmpty || askConfirm(`La carpeta ${outDir} no está vacía. ¿Sobrescribir archivos?`, false);
}

function runInstall(a: Answers, outDir: string): boolean {
  log(c.magenta('\n── Instalando ─────────────────────────────────────────────'));
  const installed = install(a, outDir);
  log(
    installed
      ? c.green('  ✔ Instalación completa')
      : c.yellow('  ⚠ La instalación falló; revisa los mensajes y ejecútala manualmente.'),
  );
  return installed;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.lang) setLanguage(args.lang);
  if (args.help) return help();
  requireNode18();

  log(
    c.bold(c.green('\n  ▶ create-pw-framework')) +
      c.dim(`  v${GENERATOR_VERSION} · Playwright ${PW_VERSION}`),
  );
  const interactive = !args.answers && !args.yes;
  if (!args.lang && interactive) {
    log('');
    setLanguage(
      await askSelect(
        'Idioma / Language  (preguntas, código y documentación / questions, code and docs)',
        LANGUAGE_OPTIONS,
        'es',
      ),
    );
  }
  log(c.dim('\n  Responde las preguntas; Enter acepta el valor sugerido.\n'));

  const a = await collectAnswers(args);
  setLanguage(a.language); // con --answers el idioma viene del JSON
  const outDir = await resolveOutDir(args, a, interactive);
  printSummary(a);

  log('');
  if (!(await confirmGeneration(outDir, interactive))) {
    log(c.yellow('Cancelado.'));
    closeReader();
    return;
  }

  const files = buildProject(a);
  writeProject(outDir, files);
  log(c.green(`\n  ✔ ${files.size} archivos generados en ${outDir}`));
  if (a.git && initGit(outDir)) log(c.green('  ✔ Repositorio git inicializado'));

  const doInstall =
    args.install ??
    (interactive ? await askConfirm('¿Instalar dependencias y navegadores ahora?', true) : false);
  closeReader();
  const installed = doInstall && runInstall(a, outDir);
  printNextSteps(a, outDir, installed);
}

main().catch((err: unknown) => {
  closeReader();
  console.error(c.red(`\n✖ ${err instanceof Error ? (err.stack ?? err) : err}`));
  process.exit(1);
});
