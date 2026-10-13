import type { Answers } from '../../answers/types.ts';
import { lines } from '../helpers.ts';

export function claudeMd(a: Answers): string {
  const ts = a.lang === 'ts';
  return lines(
    `# ${a.name} — Framework E2E con Playwright (${ts ? 'TypeScript' : 'Python'})`,
    '',
    '## Comandos',
    ts
      ? [
          '- Ejecutar un test: `npx playwright test <ruta> --project=' + a.browsers[0] + ' --reporter=list`',
          '- Smoke: `npm run test:smoke`',
          a.bdd && '- BDD (Cucumber): `npm run test:bdd`',
          a.lint && '- Lint y tipos: `npm run lint && npm run typecheck`',
          '- Traza de un fallo: `npx playwright show-trace <trace.zip>`',
        ]
      : [
          '- Ejecutar un test: `pytest <ruta> -x`',
          '- Smoke: `pytest -m smoke`',
          a.bdd && '- BDD (Behave): `python -m behave`',
          a.lint && '- Lint y tipos: `ruff check . && ruff format --check . && mypy .`',
          '- Traza de un fallo: `playwright show-trace <trace.zip>`',
        ],
    '',
    '## Arquitectura (obligatoria)',
    `- Specs → fixtures → page objects/components → ${a.api ? 'api clients → ' : ''}${a.data ? 'data factories → ' : ''}config. Ver README.md`,
    ts
      ? '- Configuración solo vía `src/config/env.ts`; page objects en `src/pages`, componentes en `src/components`.'
      : '- Configuración solo vía `config/env.py`; page objects en `pages/`, componentes en `components/`.',
    '- Page objects: locators en el constructor, métodos de intención, SIN aserciones de negocio.',
    '- Page objects y clientes se inyectan por fixtures; nunca se instancian dentro del test.',
    '- Locators: getByRole > getByLabel > getByTestId (`data-qa`) > texto. Prohibido XPath y CSS posicional.',
    a.bdd &&
      '- BDD: features en `features/`, pasos en `features/steps`; los pasos NO llevan selectores ni lógica: delegan en page objects.',
    '',
    '## Reglas de calidad',
    '- Prohibido `waitForTimeout`/`time.sleep`, `force: true`, `test.only`.',
    '- Web-first assertions siempre. Tests independientes con datos propios y teardown.',
    ts
      ? '- Antes de terminar: ejecuta el test afectado con `--repeat-each=3` y el lint.'
      : '- Antes de terminar: ejecuta el test afectado 3 veces (`pytest <ruta> --count=3` si tienes pytest-repeat) y el lint.',
    '',
    '## Seguridad y datos (NO negociable)',
    '- NUNCA leas, muestres ni copies archivos `.env*` (excepto `.env.example`) ni `.auth/`.',
    '- NUNCA uses datos reales. Usa la skill `synthetic-data` y las factories del proyecto.',
    '- Correos de prueba: `qa+<uuid>@example.com`. Si una URL o DSN contiene `prod`, detente y pregunta.',
    '',
    '## Al arreglar un test que falla',
    '- Clasifica primero (bug de la app, test frágil, datos, ambiente) con la skill `flaky-triage`.',
    '- Si es bug real de la app: NO cambies el test para que pase; repórtalo.',
    '',
  );
}
