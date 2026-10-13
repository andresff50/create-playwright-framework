import type { Answers } from '../answers/types.ts';

type Line = string | false | null | undefined | Line[];

/** Une líneas: aplana arrays a cualquier profundidad e ignora false/null/undefined → patrón `cond && [...]`. */
export const lines = (...xs: Line[]): string =>
  (xs as unknown[])
    .flat(Infinity)
    .filter((x) => x !== false && x !== null && x !== undefined)
    .join('\n');

type ListKey = 'envs' | 'browsers' | 'reporters' | 'extras' | 'ci';

export const has = <K extends ListKey>(a: Answers, list: K, v: Answers[K][number]): boolean =>
  (a[list] as readonly string[]).includes(v);
export const uiBrowsers = (a: Answers): Answers['browsers'] => a.browsers;
export const installBrowsers = (a: Answers): string[] => [
  ...new Set(
    a.browsers.map((b) => (b === 'mobile-chrome' ? 'chromium' : b === 'mobile-safari' ? 'webkit' : b)),
  ),
];
/** Herramienta BDD de cada lenguaje: Python no tiene Cucumber oficial, se usa Behave. */
export const bddTool = (a: Answers): string => (a.lang === 'ts' ? 'Cucumber' : 'Behave');
export const hasBackend = (a: Answers): boolean => a.api || a.db !== 'none';
