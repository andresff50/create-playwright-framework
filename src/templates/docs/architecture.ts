import { lines } from '../helpers.ts';

export function architectureDoc(): string {
  return lines(
    '# Arquitectura y gobierno del framework',
    '',
    '## Propiedad del código',
    '- Cada carpeta de `tests/` pertenece a un squad (ver `.github/CODEOWNERS`).',
    '- Cambios en fixtures, config, CI o page objects compartidos requieren revisión del equipo de plataforma QA.',
    '',
    '## Convenciones',
    '- Un dominio de negocio por carpeta en `tests/` (p. ej. `tests/checkout`, `tests/admin`).',
    '- Etiquetas: `@smoke` (bloquea PR), `@regression` (post-merge / nightly), `@<dominio>` para filtrar.',
    '- Tests > 60 s se revisan; tests flaky se ponen en cuarentena con ticket, dueño y fecha límite.',
    '',
    '## Métricas objetivo',
    '| Métrica | Objetivo |',
    '|---|---|',
    '| Pass rate en main | > 98 % |',
    '| Flaky rate | < 2 % |',
    '| Duración del pipeline de PR | < 10 min |',
    '| MTTR de tests rotos | < 1 día |',
    '',
    '## Pipeline por etapas',
    '| Etapa | Qué corre |',
    '|---|---|',
    '| Pre-commit | Lint, formato, tipos |',
    '| Pull request | `@smoke` + tests cambiados + API |',
    '| Post-merge | Regresión completa con sharding |',
    '| Nightly | Cross-browser + visual + accesibilidad |',
    '',
  );
}
