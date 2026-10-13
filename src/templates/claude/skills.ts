import type { Answers } from '../../answers/types.ts';
import { lines } from '../helpers.ts';

export function claudeSkills(a: Answers): Record<string, string> {
  const ts = a.lang === 'ts';
  return {
    'synthetic-data/SKILL.md': lines(
      '---',
      'name: synthetic-data',
      'description: Genera datos de prueba sintéticos (usuarios, órdenes, pagos, direcciones) para los tests',
      '  Playwright de este proyecto. Úsala SIEMPRE que un test, fixture o seed necesite datos.',
      'argument-hint: "[entidad]"',
      '---',
      '',
      '# Datos sintéticos',
      '',
      '## Reglas',
      '1. Nunca datos reales: ni de producción, ni de logs, ni de capturas.',
      '2. Correos: `qa+<uuid>@example.com`. Documentos: prefijo `9` + 9 dígitos (rango de pruebas).',
      '3. Tarjetas: SOLO los números de prueba documentados por la pasarela de pagos.',
      '4. Unicidad: UUID o índice de worker en todo identificador (permite paralelismo).',
      '5. Reproducibilidad: semilla fija de Faker solo al depurar, documentada en el test.',
      '',
      '## Dónde',
      ts
        ? '- Builders en `src/data/<entidad>.factory.ts` con `@faker-js/faker` (patrón: `src/data/user.factory.ts`).'
        : '- Factories en `data/factories.py` con factory_boy + Faker("es_CO") (patrón: `UserFactory`).',
      '- Exponer los datos con una fixture que haga teardown de lo que cree.',
      '',
      '## Pasos',
      '1. Busca si ya existe una factory para "$ARGUMENTS" y reutilízala.',
      '2. Si no existe, créala siguiendo el patrón existente.',
      '3. Crea/actualiza la fixture que la expone y ejecuta el lint del archivo.',
      '',
    ),
    'page-object/SKILL.md': lines(
      '---',
      'name: page-object',
      'description: Crea o refactoriza Page Objects y Components de Playwright con la arquitectura del proyecto.',
      '  Úsala al automatizar una pantalla nueva o al reemplazar selectores frágiles.',
      'argument-hint: "[url o pantalla]"',
      '---',
      '',
      '1. Abre la pantalla con el MCP de Playwright (browser_navigate + browser_snapshot) y usa roles y nombres reales.',
      '2. Reutiliza componentes existentes (tablas, modales, header) antes de crear nuevos.',
      '3. Locators en el constructor con prioridad getByRole > getByLabel > getByTestId.',
      '4. Métodos de intención, sin aserciones de negocio.',
      ts
        ? '5. Registra el page object en `src/fixtures/index.ts`.'
        : '5. Registra el page object como fixture en `conftest.py`.',
      '6. Ejecuta lint y un test de humo que lo use.',
      '',
    ),
    'flaky-triage/SKILL.md': lines(
      '---',
      'name: flaky-triage',
      'description: Analiza un test que falla o es intermitente y clasifica la causa (bug de la app, test frágil,',
      '  datos o ambiente) con evidencia. Úsala ante cualquier fallo local o de CI.',
      'argument-hint: "[ruta del test]"',
      'context: fork',
      'agent: qa-test-healer',
      '---',
      '',
      'Test a analizar: $ARGUMENTS',
      '',
      ts
        ? '1. Reproduce: `npx playwright test $ARGUMENTS --repeat-each=10 --retries=0 --trace=on`.'
        : '1. Reproduce: `pytest $ARGUMENTS -p no:randomly --tracing on` varias veces.',
      '2. Revisa la traza: red, consola y DOM en el paso que falla.',
      '3. Entrega una tabla: Causa | Evidencia | Acción propuesta.',
      '4. Bug de la app → no cambies el test; redacta el reporte. Test frágil → cambio mínimo.',
      '5. Nunca agregues retries, esperas fijas ni `force` como solución.',
      '',
    ),
  };
}
