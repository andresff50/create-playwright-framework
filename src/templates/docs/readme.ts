import type { Answers } from '../../answers/types.ts';
import { SIZES, DB_OPTIONS, DOCKER_OPTIONS, CI_OPTIONS } from '../../answers/catalog.ts';
import { buildTree } from './tree.ts';
import {
  bddTool,
  lines,
  has,
  installBrowsers,
  packageManagerLabel,
  pyQualityCommands,
  pyRun,
  usesPoetry,
} from '../helpers.ts';
import { POETRY_MIN_VERSION, PW_VERSION, GENERATOR_VERSION } from '../../version.ts';

export function readme(a: Answers, fileList: string[]): string {
  const ts = a.lang === 'ts';
  const yes = (b: boolean) => (b ? (a.language === 'en' ? 'Yes' : 'Sí') : 'No');
  const dbLabel = DB_OPTIONS.find((d) => d.value === a.db)?.label;
  const ciLabels = a.ci.map((x) => CI_OPTIONS.find((o) => o.value === x)?.label).join(', ') || 'Ninguno';
  const tree = buildTree(fileList);
  const poetry = usesPoetry(a);
  const browsers = installBrowsers(a).join(' ');
  // Comando de Python dentro de una celda o lista: con Poetry lleva `poetry run`
  const py = (command: string): string => pyRun(a, command);
  return lines(
    `# ${a.name}`,
    '',
    `Framework de automatización E2E con **Playwright + ${ts ? 'TypeScript' : 'Python (pytest)'}**,`,
    `generado con \`create-pw-framework\` v${GENERATOR_VERSION}.`,
    '',
    '## Configuración elegida',
    '',
    '| Opción | Valor |',
    '|---|---|',
    `| Tamaño | ${SIZES.find((s) => s.value === a.size)?.label} |`,
    `| Dependencias | ${packageManagerLabel(a)} |`,
    `| Navegadores | ${a.browsers.join(', ')} |`,
    `| Ambientes | ${a.envs.join(', ')} |`,
    `| Reportes | ${a.reporters.join(', ') || 'list'} |`,
    `| API | ${yes(a.api)} |`,
    `| Base de datos | ${dbLabel} |`,
    `| Datos sintéticos | ${yes(a.data)} |`,
    `| Autenticación reutilizable | ${yes(a.auth)} |`,
    `| Extras | ${a.extras.join(', ') || 'Ninguno'} |`,
    `| BDD (Gherkin) | ${a.bdd ? bddTool(a) : 'No'} |`,
    `| Contenedores | ${DOCKER_OPTIONS.find((d) => d.value === a.docker)?.label} |`,
    `| CI/CD | ${ciLabels}${a.shards > 1 ? ` (${a.shards} shards)` : ''} |`,
    `| Linters / pre-commit | ${yes(a.lint)} / ${yes(a.precommit)} |`,
    `| Claude Code | ${yes(a.claude)} |`,
    '',
    '## Requisitos',
    '',
    ts ? '- Node.js 20 o superior' : '- Python 3.11 o superior',
    poetry && `- Poetry ${POETRY_MIN_VERSION} o superior (https://python-poetry.org/docs/#installation)`,
    a.docker !== 'none' && '- Docker (opcional, para ejecutar en contenedor)',
    has(a, 'reporters', 'allure') && '- Java 8+ para generar el reporte Allure localmente',
    '',
    '## Primeros pasos',
    '',
    '```bash',
    ts
      ? [
          'npm install',
          `npx playwright install ${installBrowsers(a).join(' ')}`,
          'cp .env.example .env        # completa los valores (nunca subas .env)',
          'npm test',
        ]
      : poetry
        ? [
            'poetry install              # crea .venv e instala las dependencias',
            `poetry run python -m playwright install ${browsers}`,
            'cp .env.example .env        # completa los valores (nunca subas .env)',
            'poetry run pytest',
          ]
        : [
            'python -m venv .venv',
            'source .venv/bin/activate   # Windows: .venv\\Scripts\\activate',
            'pip install -r requirements.txt',
            `python -m playwright install ${browsers}`,
            'cp .env.example .env        # completa los valores (nunca subas .env)',
            'pytest',
          ],
    '```',
    '',
    poetry && [
      'La primera instalación crea `poetry.lock` con las versiones exactas: **súbelo al repositorio** para que',
      'todo el equipo y el CI usen las mismas.',
      '',
    ],
    '## Comandos útiles',
    '',
    '| Acción | Comando |',
    '|---|---|',
    ts
      ? [
          '| Toda la suite | `npm test` |',
          '| Solo smoke | `npm run test:smoke` |',
          '| Modo UI / depuración | `npm run test:ui` / `npm run test:debug` |',
          '| Tests de archivos cambiados | `npm run test:changed` |',
          '| Detección de flaky (burn-in) | `npm run test:burn-in` |',
          `| Otro ambiente | \`TEST_ENV=${a.envs[a.envs.length - 1]} npm test\` |`,
          has(a, 'reporters', 'html') && '| Ver reporte HTML | `npm run report` |',
          has(a, 'reporters', 'allure') &&
            '| Reporte Allure | `npm run allure:generate && npm run allure:open` |',
          has(a, 'extras', 'visual') &&
            '| Visual (crear/actualizar baseline) | `npm run test:visual:update` |',
          has(a, 'extras', 'visual') && '| Visual (comparar) | `npm run test:visual` |',
          a.bdd && [
            '| BDD (Cucumber) | `npm run test:bdd` |',
            '| BDD solo smoke | `npm run test:bdd -- --tags @smoke` |',
            '| BDD con navegador visible | `HEADED=1 npm run test:bdd` |',
          ],
          a.lint && '| Lint / formato / tipos | `npm run lint` · `npm run format` · `npm run typecheck` |',
        ]
      : [
          `| Toda la suite en paralelo | \`${py('pytest -n auto')}\` |`,
          `| Solo smoke | \`${py('pytest -m smoke')}\` |`,
          `| Con navegador visible | \`${py('pytest --headed --slowmo 300')}\` |`,
          `| Depurar | \`PWDEBUG=1 ${py('pytest <ruta> -s')}\` |`,
          `| Reintentos (CI) | \`${py('pytest --reruns 2')}\` |`,
          `| Otro ambiente | \`TEST_ENV=${a.envs[a.envs.length - 1]} ${py('pytest')}\` |`,
          `| Emular móvil | \`${py('pytest --device "iPhone 15"')}\` |`,
          has(a, 'reporters', 'html') && '| Reporte HTML | `reports/report.html` |',
          has(a, 'reporters', 'allure') && '| Reporte Allure | `allure serve allure-results` |',
          a.bdd && [
            `| BDD (Behave) | \`${py('python -m behave')}\` |`,
            `| BDD solo smoke | \`${py('python -m behave --tags=@smoke')}\` |`,
            `| BDD con navegador visible | \`HEADED=1 ${py('python -m behave')}\` |`,
          ],
          a.lint &&
            `| Lint / formato / tipos | \`${py('ruff check .')}\` · \`${py('ruff format .')}\` · \`${py('mypy .')}\` |`,
        ],
    has(a, 'reporters', 'metrics') && '| Métricas de la corrida | `reports/metrics.json` |',
    a.docker !== 'none' &&
      (a.docker === 'compose'
        ? '| En contenedores | `docker compose up --build --exit-code-from tests` |'
        : `| En contenedor | \`docker build -t ${a.name} . && docker run --rm --ipc=host ${a.name}\` |`),
    '',
    poetry && [
      '## Dependencias (Poetry)',
      '',
      'Las dependencias se declaran en `pyproject.toml` y sus versiones exactas quedan en `poetry.lock`.',
      'No uses `pip install` en este proyecto: el paquete no quedaría registrado.',
      '',
      '| Acción | Comando |',
      '|---|---|',
      '| Añadir una librería | `poetry add <paquete>` |',
      '| Añadir una herramienta de desarrollo | `poetry add --group dev <paquete>` |',
      '| Quitar una librería | `poetry remove <paquete>` |',
      '| Actualizar versiones (dentro de los rangos) | `poetry update` |',
      '| Ver el árbol de dependencias | `poetry show --tree` |',
      '| Ejecutar cualquier comando en el entorno | `poetry run <comando>` |',
      '| Ver dónde está el entorno virtual | `poetry env info` |',
      a.lint && `| Validar pyproject.toml y poetry.lock | \`${pyQualityCommands(a)[0]}\` |`,
      '',
      '- El entorno virtual vive en `./.venv` (ver `poetry.toml`), así el editor lo detecta solo.',
      a.lint && '- Ruff, mypy y pre-commit están en el grupo `dev`, separados de lo que necesitan los tests.',
      '',
    ],
    '## Arquitectura',
    '',
    '```text',
    'tests (specs) → fixtures → page objects / components' +
      (a.api ? ' → api client' : '') +
      (a.data ? ' → data factories' : '') +
      (a.db !== 'none' ? ' → db' : '') +
      ' → config/env',
    '```',
    '',
    '- **Specs** describen el *qué*: intención de negocio y aserciones. Sin selectores ni SQL.',
    '- **Fixtures** gestionan el ciclo de vida (setup/teardown) e inyectan dependencias.',
    '- **Page Objects / Components**: locators + métodos de intención. Sin aserciones de negocio.',
    a.api && '- **API client**: setup rápido de datos y verificaciones sin UI.',
    a.data && '- **Data factories**: datos 100 % sintéticos y únicos por test (paralelismo seguro).',
    a.db !== 'none' && '- **DB**: consultas parametrizadas, usuario de solo lectura y guard anti-producción.',
    a.bdd &&
      `- **BDD (${bddTool(a)})**: los \`.feature\` describen el comportamiento en Gherkin; los pasos delegan en los mismos page objects.`,
    a.bdd && !ts && '- Python no tiene Cucumber oficial: los `.feature` se ejecutan con **Behave**.',
    '- **Config**: única lectura de variables de entorno; guard que impide ejecutar contra producción.',
    '',
    '## Estructura',
    '',
    '```text',
    tree,
    '```',
    '',
    '## Buenas prácticas del proyecto',
    '',
    '- Locators: `getByRole` > `getByLabel` > `getByTestId` (`data-qa`) > texto. Nunca XPath ni CSS posicional.',
    '- Nada de esperas fijas (`waitForTimeout` / `time.sleep`) ni `force`.',
    '- Cada test crea y limpia sus propios datos: independiente y paralelizable.',
    '- Un retry que pasa es un test *flaky*: se mide y se corrige, no se ignora.',
    '- Secretos solo por variables de entorno / secrets del CI. `.env` y `.auth/` nunca se versionan.',
    '',
    a.ci.length > 0 && [
      '## CI/CD',
      '',
      `Pipelines generados: ${ciLabels}. Configura en tu herramienta de CI las variables \`BASE_URL\`, \`TEST_ENV\`` +
        `${a.api ? ', `API_URL`, `API_TOKEN` (secreto)' : ''}${a.auth ? ', `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` (secreto)' : ''}` +
        `${a.db !== 'none' ? ', `DB_URL` (secreto)' : ''}.`,
      a.shards > 1 &&
        `La suite se reparte en **${a.shards} shards**${ts ? ' y GitHub Actions une los reportes con `merge-reports`' : ' con pytest-split'}.`,
      ts &&
        `La imagen Docker de CI está fijada en \`v${PW_VERSION}\`: actualízala junto con \`@playwright/test\`.`,
      '',
    ],
    a.claude && [
      '## Claude Code',
      '',
      '- `CLAUDE.md`: reglas del proyecto que Claude carga en cada sesión.',
      '- `.claude/settings.json`: bloqueo de `.env`/`.auth`, hooks de secretos, PII, lint y puerta final.',
      '- `.claude/skills/`: `synthetic-data`, `page-object`, `flaky-triage` (invócalas con `/nombre`).',
      '- `.claude/agents/`: planner, generator, healer y reviewer.',
      '- `.mcp.json`: Playwright MCP (requiere Node.js/npx).',
      '- El sandbox viene configurado pero **desactivado** (`sandbox.enabled: false`). Actívalo tras validar',
      '  que los navegadores arrancan dentro de él en tu sistema (macOS, Linux o WSL2).',
      !ts && '- Los hooks usan `python3`; en Windows cámbialo por `python` en `.claude/settings.json`.',
      '',
    ],
    '## Próximos pasos',
    '',
    '1. Completa `.env` y ajusta `LoginPage` a tu aplicación.',
    '2. Reemplaza los tests de ejemplo por los flujos críticos (P1) de tu producto.',
    '3. Acuerda con desarrollo el atributo `data-qa` para elementos sin rol accesible claro.',
    '4. Configura secrets y variables en el CI y ejecuta el primer pipeline.',
    '',
  );
}
