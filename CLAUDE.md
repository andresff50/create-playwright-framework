# create-pw-framework — guía para Claude Code

Generador interactivo que crea frameworks Playwright en TypeScript o Python, en español o inglés.
El código fuente está en `src/` (TypeScript) y se empaqueta en un único `create-pw-framework.mjs`
sin dependencias (Node.js 18+), que es lo que usa quien genera un proyecto.

## Archivos

- `src/` — código fuente del generador. **Aquí se edita.**
- `create-pw-framework.mjs` — bundle GENERADO por `npm run build` y confirmado en el repo. NO editar a mano.
  Su tercera línea (`// Generado: <fecha UTC>`) solo cambia cuando cambia el contenido.
- `tests/` — tests con `node --test`; `tests/golden/` guarda la referencia de la salida.
- `scripts/build.ts` — empaquetado con esbuild.
- `ejemplos/*.json` — respuestas de ejemplo para `--answers`.

## Estructura de `src/`

| Ruta                    | Contenido                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `cli.ts`                | Punto de entrada: `main()` y sus pasos.                                                             |
| `version.ts`            | `PW_VERSION`, `GENERATOR_VERSION`.                                                                  |
| `i18n/en.ts`            | Tabla de traducción es→en (`PAIRS`). FUENTE de las traducciones.                                    |
| `i18n/index.ts`         | `translate(texto, idioma)` (pura) y `tr()` / `setLanguage()` para la terminal.                      |
| `cli/`                  | `args.ts` (`parseArgs`), `console.ts` (`c`, `log`), `prompts.ts` (`ask*`), `summary.ts`.            |
| `answers/types.ts`      | Tipos: `Answers` (normalizadas), `RawAnswers`, `Lang`, `Size`, `Db`, `Ci`...                        |
| `answers/catalog.ts`    | `SIZES`, `DEFAULTS` (valores por tamaño), `*_OPTIONS`, `DB_URLS`.                                   |
| `answers/normalize.ts`  | `normalize()`: completa y hace coherentes las respuestas. Función pura.                             |
| `answers/collect.ts`    | `collectAnswers()`: desde `--answers`, `--yes` o preguntando.                                       |
| `templates/helpers.ts`  | `lines`, `has`, `installBrowsers`, `hasBackend`.                                                    |
| `templates/**`          | Una función por archivo generado: `common.ts`, `ts/`, `py/`, `ci/`, `claude/`, `docs/`.             |
| `templates/bdd.ts`      | `.feature` de ejemplo (Gherkin), común a los dos lenguajes.                                         |
| `templates/*/bdd.ts`    | BDD: `ts/bdd.ts` → Cucumber (config, world, hooks, pasos); `py/bdd.ts` → Behave (ini, environment, pasos). |
| `project/build.ts`      | `buildProject(a)`: arma el `Map` ruta→contenido; si el idioma es inglés traduce cada archivo.       |
| `project/write.ts`      | `writeProject`.                                                                                     |
| `project/install.ts`    | `install`, `initGit`.                                                                               |

- `log()` y las preguntas (`ask*`) ya aplican `tr()`.
- Las plantillas usan `lines(...)`: aplana arrays a cualquier profundidad e ignora `false/null/undefined`
  → patrón `cond && [...]`. La condición debe ser booleana (`a.ci.length > 0 && [...]`, no `a.ci.length && [...]`).

## Reglas al modificar

- Edita `src/` y ejecuta `npm run build`; el bundle se confirma junto con el cambio (un test falla si está desactualizado).
- Las plantillas se escriben SIEMPRE en español; el inglés sale de la tabla.
- Todo texto nuevo o cambiado en español → añade su par en `src/i18n/en.ts`.
  Las claves son el texto EXACTO tal como queda en el archivo generado (no el código que lo produce).
  Si la traducción cambia la longitud de una línea de código y el formateador la reescribiría, traduce el bloque completo.
- Cuidado con `${` dentro de template literals: en contenido generado (GitHub Actions `${{ }}`, Jenkins, Docker)
  usa comillas simples o escápalo como `\${`.
- El código generado debe pasar sin errores: TS → `tsc --noEmit`, ESLint, `prettier --check "**/*.{ts,mjs}"`;
  Python → `ruff check`, `ruff format --check`, `mypy --strict`. Respeta los anchos de línea (110).
- Nueva opción: tipo en `answers/types.ts` → catálogo `*_OPTIONS` → `DEFAULTS` (3 tamaños) → pregunta en
  `collect.ts` → `normalize.ts` → uso en plantillas / `project/build.ts` → fila en `printSummary` y en la tabla de
  `readme()` → traducciones → variante en `tests/helpers/matrix.ts`.
- BDD (`bdd`): en TypeScript es Cucumber y en Python es Behave (no existe Cucumber oficial para Python); usa
  `bddTool(a)` para nombrarlo. El texto de cada paso aparece en el `.feature` y en su definición: al cambiarlo o
  traducirlo deben seguir coincidiendo en los dos idiomas (línea completa del `.feature` + frase del paso en `en.ts`).
  Comprueba que la línea `Given(...)` más larga tiene el mismo formato de Prettier en español y en inglés.
- Si cambias `PW_VERSION`, la imagen Docker de CI y `@playwright/test` se actualizan juntos.
- Si un cambio modifica la salida A PROPÓSITO: `npm run test:update-golden` y revisa el diff de `tests/golden/`.
  Un refactor no debe cambiar esa carpeta.
- `src/` solo usa sintaxis TypeScript borrable (sin `enum` ni `namespace`) e importa con extensión `.ts`:
  los tests corren con Node directamente, sin compilar.

## Verificación antes de terminar

```bash
npm run build     # regenera create-pw-framework.mjs
npm run check     # tipos, ESLint, Prettier y tests (golden, salida EN sin español, JSON/YAML, bundle al día)
# Prueba completa (requiere red): generar con ejemplos/*.json, npm install / pip install y correr lint, tipos y tests
```

Desarrollo: Node.js 22.18+ (`npm install`). El bundle generado sigue funcionando con Node.js 18+.
