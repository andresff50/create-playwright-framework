import type { Answers } from '../../answers/types.ts';
import { has, lines, pyRun } from '../helpers.ts';

/** Dependencia de Python. Fuente única para `requirements.txt` (pip) y `pyproject.toml` (Poetry). */
export interface PyDependency {
  /** Requisito PEP 508, p. ej. `pytest>=8.3`. */
  spec: string;
  /** Comentario breve que acompaña al paquete. */
  note?: string;
  /** Herramienta de desarrollo (lint, tipos, hooks): no hace falta para ejecutar los tests. */
  dev?: boolean;
}

const when = (condition: boolean, ...deps: PyDependency[]): PyDependency[] => (condition ? deps : []);

/** Paquetes del proyecto según las respuestas. Añadir una librería nueva es añadir una línea aquí. */
export function pyDependencies(a: Answers): PyDependency[] {
  return [
    { spec: 'playwright>=1.55' },
    { spec: 'pytest>=8.3' },
    { spec: 'pytest-playwright>=0.7' },
    { spec: 'pytest-xdist>=3.6', note: 'paralelismo: pytest -n auto' },
    { spec: 'pytest-rerunfailures>=14', note: 'reintentos en CI: --reruns 2' },
    { spec: 'python-dotenv>=1.0' },
    ...when(a.shards > 1, { spec: 'pytest-split>=0.10', note: 'sharding en CI: --splits N --group i' }),
    ...when(has(a, 'reporters', 'html'), { spec: 'pytest-html>=4.1' }),
    ...when(has(a, 'reporters', 'allure'), { spec: 'allure-pytest>=2.13' }),
    ...when(a.data, { spec: 'Faker>=30.0' }, { spec: 'factory-boy>=3.3' }),
    ...when(a.db === 'postgres', { spec: 'psycopg[binary]>=3.2' }, { spec: 'psycopg-pool>=3.2' }),
    ...when(a.db === 'mysql', { spec: 'PyMySQL>=1.1' }),
    ...when(a.db === 'mssql', { spec: 'pymssql>=2.3' }),
    ...when(a.db === 'mongodb', { spec: 'pymongo>=4.8' }),
    ...when(has(a, 'extras', 'a11y'), { spec: 'axe-playwright-python>=0.1.4' }),
    ...when(a.bdd, { spec: 'behave>=1.2.6', note: `BDD: ${pyRun(a, 'python -m behave')}` }),
    ...when(a.lint, { spec: 'ruff>=0.6', dev: true }, { spec: 'mypy>=1.11', dev: true }),
    ...when(a.precommit, { spec: 'pre-commit>=3.8', dev: true }),
  ];
}

/** `requirements.txt` para pip: todos los paquetes, con los comentarios alineados. */
export function pyRequirements(a: Answers): string {
  return lines(
    '# Instalar: python -m pip install -r requirements.txt',
    pyDependencies(a).map((d) => (d.note ? `${d.spec.padEnd(24)} # ${d.note}` : d.spec)),
    '',
  );
}

const tomlArray = (name: string, deps: PyDependency[]): string[] => [
  `${name} = [`,
  ...deps.map((d) => `    "${d.spec}",${d.note ? `  # ${d.note}` : ''}`),
  ']',
];

/** Dependencias de ejecución para la tabla `[project]` de `pyproject.toml` (Poetry). */
export const pyProjectDependencies = (a: Answers): string[] =>
  tomlArray(
    'dependencies',
    pyDependencies(a).filter((d) => !d.dev),
  );

/** Grupo `dev` (PEP 735) con las herramientas de desarrollo; vacío si el proyecto no tiene ninguna. */
export function pyDevDependencyGroup(a: Answers): string[] {
  const dev = pyDependencies(a).filter((d) => d.dev);
  return dev.length > 0 ? ['', '[dependency-groups]', ...tomlArray('dev', dev)] : [];
}
