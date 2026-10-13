import path from 'node:path';
import process from 'node:process';
import type { Answers } from '../answers/types.ts';
import { tr } from '../i18n/index.ts';
import { bddTool, installBrowsers } from '../templates/helpers.ts';
import { c, log } from './console.ts';

export function printSummary(a: Answers): void {
  const row = (k: string, v: string): void => log(`  ${c.dim(tr(k).padEnd(22))} ${v}`);
  const yn = (b: boolean): string => (b ? (a.language === 'en' ? 'yes' : 'sí') : 'no');
  log(c.magenta('\n── Resumen ────────────────────────────────────────────────'));
  row('Proyecto', `${a.name} (${a.lang === 'ts' ? 'TypeScript' : 'Python'}, ${a.size})`);
  row('URL base / ambientes', `${a.baseUrl}  [${a.envs.join(', ')}]`);
  row('Navegadores', a.browsers.join(', '));
  row('Reportes', a.reporters.join(', ') || 'list');
  row('API / BD / Datos', `${yn(a.api)} / ${a.db} / ${yn(a.data)}`);
  row('Auth / Extras', `${yn(a.auth)} / ${a.extras.join(', ') || '—'}`);
  row('BDD', a.bdd ? bddTool(a) : 'no');
  row('Docker / CI', `${a.docker} / ${a.ci.join(', ') || '—'}${a.shards > 1 ? ` (${a.shards} shards)` : ''}`);
  row('Lint / pre-commit', `${yn(a.lint)} / ${yn(a.precommit)}`);
  row('Claude Code', yn(a.claude));
}

export function printNextSteps(a: Answers, outDir: string, installed: boolean): void {
  const rel = path.relative(process.cwd(), outDir) || '.';
  const browsers = installBrowsers(a).join(' ');
  log(c.magenta('\n── Siguientes pasos ───────────────────────────────────────'));
  log(`  cd ${rel}`);
  if (!installed) {
    if (a.lang === 'ts') log(`  npm install && npx playwright install ${browsers}`);
    else {
      log(
        `  python -m venv .venv && source .venv/bin/activate\n  pip install -r requirements.txt && python -m playwright install ${browsers}`,
      );
    }
  } else if (a.lang === 'py') log('  source .venv/bin/activate   (Windows: .venv\\Scripts\\activate)');
  log('  cp .env.example .env');
  log(a.lang === 'ts' ? '  npm test' : '  pytest');
  log(c.dim('\n  Lee README.md para la arquitectura, comandos y próximos pasos.\n'));
}

export function help(): void {
  log(`
${c.bold('create-pw-framework')} — genera un framework Playwright listo para trabajar.

  node create-pw-framework.mjs                 Modo interactivo
  node create-pw-framework.mjs --yes           Valores por defecto (TypeScript, mediano)
  node create-pw-framework.mjs --answers f.json  Usa respuestas guardadas (ver scaffold.answers.json)
  Opciones: --out <carpeta>  --lang es|en  --install | --no-install
`);
}
