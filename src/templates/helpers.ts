import type { Answers, PackageManager } from '../answers/types.ts';
import { POETRY_VERSION } from '../version.ts';

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
const PACKAGE_MANAGER_LABELS: Record<PackageManager, string> = { npm: 'npm', pip: 'pip', poetry: 'Poetry' };
export const packageManagerLabel = (a: Answers): string => PACKAGE_MANAGER_LABELS[a.packageManager];
export const usesPoetry = (a: Answers): boolean => a.packageManager === 'poetry';
/** Comando de Python tal como se ejecuta en el proyecto: con Poetry va precedido de `poetry run`. */
export const pyRun = (a: Answers, command: string): string =>
  usesPoetry(a) ? `poetry run ${command}` : command;
/** Comandos de CI que instalan las dependencias de Python (Poetry con versión fija). */
export const pyInstallCommands = (a: Answers): string[] =>
  usesPoetry(a)
    ? [`pip install poetry==${POETRY_VERSION}`, 'poetry install --no-interaction']
    : ['pip install -r requirements.txt'];
/** Comandos de lint y tipos; con Poetry se valida antes el pyproject.toml. */
export const pyQualityCommands = (a: Answers): string[] => [
  ...(usesPoetry(a) ? ['poetry check'] : []),
  ...['ruff check .', 'ruff format --check .', 'mypy .'].map((command) => pyRun(a, command)),
];
export const hasBackend = (a: Answers): boolean => a.api || a.db !== 'none';
