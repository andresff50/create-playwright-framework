import { lines } from './helpers.ts';

/** Feature de ejemplo en Gherkin, común a Cucumber (TypeScript) y Behave (Python). */
export function homeFeature(): string {
  return lines(
    '# language: es',
    'Característica: Página de inicio',
    '  Como visitante quiero abrir la página de inicio para empezar a usar la aplicación.',
    '',
    '  @smoke',
    '  Escenario: La página de inicio carga',
    '    Cuando abro la página de inicio',
    '    Entonces la página tiene un título',
    '    Y veo el encabezado principal',
    '',
    '  @regression',
    '  Esquema del escenario: La página de inicio se adapta a <dispositivo>',
    '    Dado una pantalla de <ancho> x <alto>',
    '    Cuando abro la página de inicio',
    '    Entonces veo el encabezado principal',
    '',
    '    Ejemplos:',
    '      | dispositivo | ancho | alto |',
    '      | escritorio  | 1440  | 900  |',
    '      | tableta     | 768   | 1024 |',
    '      | celular     | 390   | 844  |',
    '',
  );
}
