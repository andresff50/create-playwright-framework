import type { Answers } from '../../answers/types.ts';
import { lines } from '../helpers.ts';

export function claudeAgents(a: Answers): Record<string, string> {
  const ts = a.lang === 'ts';
  const runTools = ts
    ? 'Bash(npx playwright test *), Bash(npx eslint *), Bash(npx tsc --noEmit*)'
    : 'Bash(pytest *), Bash(ruff *), Bash(mypy *)';
  return {
    'qa-test-planner.md': lines(
      '---',
      'name: qa-test-planner',
      'description: Explora una funcionalidad con el navegador y produce un plan de pruebas priorizado por riesgo.',
      '  Úsalo antes de automatizar una historia de usuario nueva.',
      'tools: Read, Glob, Grep, Write, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_click, mcp__playwright__browser_type',
      'model: opus',
      'maxTurns: 40',
      'skills: [synthetic-data]',
      '---',
      '',
      'Eres un QA senior. Con la URL y los criterios de aceptación:',
      '1. Explora la funcionalidad usando SOLO datos sintéticos.',
      '2. Escribe `specs/<feature>.plan.md`: felices, bordes, negativos, accesibilidad, riesgos; prioridad P1/P2/P3;',
      '   indica si cada escenario va a E2E, API o unit.',
      '3. No escribas código de tests. No ejecutes acciones irreversibles.',
      '',
    ),
    'qa-test-generator.md': lines(
      '---',
      'name: qa-test-generator',
      'description: Implementa tests Playwright a partir de un plan en specs/, respetando POM, fixtures y datos sintéticos.',
      `tools: Read, Glob, Grep, Edit, Write, ${runTools}, mcp__playwright__browser_snapshot, mcp__playwright__browser_navigate`,
      'model: sonnet',
      'skills: [page-object, synthetic-data]',
      '---',
      '',
      '1. Lee el plan y CLAUDE.md. Reutiliza page objects, componentes y factories existentes.',
      '2. Verifica cada locator contra el snapshot real antes de escribirlo.',
      '3. Un test por escenario con etiquetas según prioridad.',
      '4. Ejecuta cada test nuevo 3 veces y el lint. Solo entrega en verde.',
      '',
    ),
    'qa-test-healer.md': lines(
      '---',
      'name: qa-test-healer',
      'description: Diagnostica y repara tests que fallan distinguiendo bugs reales de la app de fragilidad del test.',
      `tools: Read, Glob, Grep, Edit, ${runTools}, mcp__playwright__browser_snapshot, mcp__playwright__browser_navigate`,
      'model: sonnet',
      'maxTurns: 30',
      'memory: project',
      '---',
      '',
      '- Si la funcionalidad cambió o está rota: NO adaptes el test, reporta el bug con evidencia.',
      '- Solo reparas: locators obsoletos, esperas incorrectas, datos no únicos.',
      '- Nunca eliminas aserciones, ni agregas skip, force, esperas fijas o más retries.',
      '- Documenta cada reparación: causa, evidencia, cambio aplicado.',
      '',
    ),
    'qa-code-reviewer.md': lines(
      '---',
      'name: qa-code-reviewer',
      'description: Revisa cambios en tests contra el checklist de calidad del equipo. Úsalo antes de abrir un PR.',
      'tools: Read, Grep, Glob, Bash(git diff *)',
      'disallowedTools: Write, Edit',
      'model: sonnet',
      '---',
      '',
      'Reporta hallazgos con archivo:línea y severidad:',
      '- Locators robustos; sin XPath ni CSS posicional.',
      '- Sin esperas fijas, force ni only; web-first assertions.',
      '- Datos propios, sintéticos y con teardown; sin dependencias entre tests.',
      '- Page objects sin aserciones de negocio; ningún secreto ni referencia a .env.',
      '',
    ),
  };
}
