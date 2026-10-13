import type { Language } from '../answers/types.ts';

export interface CliArgs {
  yes: boolean;
  answers: string | null;
  out: string | null;
  /** null = no se indicó: en modo interactivo se pregunta. */
  install: boolean | null;
  help: boolean;
  lang: Language | null;
}

export function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { yes: false, answers: null, out: null, install: null, help: false, lang: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--yes' || a === '-y') args.yes = true;
    else if (a === '--answers') args.answers = argv[++i] ?? null;
    else if (a === '--out') args.out = argv[++i] ?? null;
    else if (a === '--no-install') args.install = false;
    else if (a === '--install') args.install = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else if (a === '--lang') args.lang = argv[++i] === 'en' ? 'en' : 'es';
  }
  return args;
}
