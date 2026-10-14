import { DEFAULTS } from './catalog.ts';
import type { Answers, Lang, PackageManager, RawAnswers } from './types.ts';

/** TypeScript usa siempre npm; en Python se usa pip salvo que se pida Poetry. */
function pickPackageManager(lang: Lang, asked: PackageManager | undefined): PackageManager {
  if (lang === 'ts') return 'npm';
  return asked === 'poetry' ? 'poetry' : 'pip';
}

/** Completa las respuestas con los valores del tamaño elegido y resuelve combinaciones incoherentes. */
export function normalize(a: RawAnswers): Answers {
  // Un JSON de respuestas puede traer un tamaño desconocido: se usan los valores del mediano
  const d = (a.size ? DEFAULTS[a.size] : undefined) ?? DEFAULTS.medium;
  const out = { ...d, ...a } as Answers;
  out.language = a.language === 'en' ? 'en' : 'es';
  out.size = a.size ?? 'medium';
  out.lang = a.lang === 'py' ? 'py' : 'ts';
  out.packageManager = pickPackageManager(out.lang, a.packageManager);
  out.name = a.name ?? 'qa-e2e-framework';
  out.baseUrl = a.baseUrl ?? 'https://playwright.dev';
  if (out.lang === 'py') {
    out.browsers = out.browsers.filter((b) => !b.startsWith('mobile'));
    out.extras = out.extras.filter((e) => e !== 'visual');
  }
  if (!out.browsers.length) out.browsers = ['chromium'];
  if (!out.ci.length) out.shards = 1;
  // JUnit es necesario para publicar resultados en Jenkins, GitLab y Azure DevOps
  if (out.ci.some((x) => ['jenkins', 'gitlab', 'azure'].includes(x)) && !out.reporters.includes('junit')) {
    out.reporters = [...out.reporters, 'junit'];
  }
  if (!out.lint) out.precommit = false;
  out.git = a.git ?? true;
  return out;
}
