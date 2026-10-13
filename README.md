# create-pw-framework

Generador interactivo de frameworks de automatización con **Playwright**, en **TypeScript** o **Python**,
en **español o inglés** (preguntas, código, comentarios, nombres de tests y documentación).
Hace preguntas en la terminal y crea un esqueleto listo para trabajar, escalable de un proyecto pequeño a uno empresarial.

- Para usarlo basta un solo archivo, **sin dependencias**: solo necesitas **Node.js 18+** (también para generar proyectos Python).
- Funciona en Windows, macOS y Linux.

## Uso

```bash
# Modo interactivo (recomendado)
node create-pw-framework.mjs

# Todo por defecto (TypeScript, proyecto mediano)
node create-pw-framework.mjs --yes --out ./mi-framework

# Directamente en inglés
node create-pw-framework.mjs --lang en

# Reutilizar respuestas guardadas (cada proyecto generado incluye scaffold.answers.json)
node create-pw-framework.mjs --answers ejemplos/ts-grande-postgres.json --out ./mi-framework --no-install
```

| Opción | Descripción |
|---|---|
| `--lang es\|en` | Idioma de las preguntas y del proyecto generado (si se omite, es la primera pregunta) |
| `--yes`, `-y` | Usa los valores por defecto sin preguntar |
| `--answers <archivo>` | Lee las respuestas desde un JSON |
| `--out <carpeta>` | Carpeta de salida |
| `--install` / `--no-install` | Instala (o no) dependencias y navegadores al final |
| `--help` | Ayuda |

## Qué pregunta

| Bloque | Preguntas |
|---|---|
| Idioma | Español o English (primera pregunta) |
| Proyecto | Nombre, lenguaje (TypeScript / Python), tamaño (pequeño, mediano, grande) |
| Aplicación | URL base, ambientes (dev, qa, staging…), navegadores y dispositivos móviles |
| Capas | Pruebas de API, base de datos (PostgreSQL, MySQL, SQL Server, MongoDB), datos sintéticos, autenticación reutilizable, accesibilidad, regresión visual, BDD con Gherkin (Cucumber en TypeScript, Behave en Python) |
| Reportes | HTML, JUnit, Allure, reporter de métricas propio (flaky rate, duración, tests lentos) |
| Infraestructura | Docker / docker-compose (con BD efímera), CI: GitHub Actions, Jenkins, GitLab CI, Azure DevOps, número de shards |
| Calidad e IA | ESLint + Prettier o Ruff + mypy, pre-commit (husky / pre-commit), integración con Claude Code |

El **tamaño** solo propone valores por defecto; puedes cambiar cualquier respuesta.

## Qué genera

- Arquitectura por capas: specs → fixtures → page objects / components → API client → data factories → DB → config.
- Configuración centralizada por ambiente (`.env.<ambiente>`) con guard que impide ejecutar contra producción.
- Tests de ejemplo que pasan sin configuración (los de API y BD se saltan hasta definir `API_URL` / `DB_URL`).
- Pipelines de CI con sharding, artefactos y publicación de resultados JUnit.
- Opcional: BDD con Gherkin. En TypeScript se usa **Cucumber** (`@cucumber/cucumber`); en Python, que no tiene Cucumber
  oficial, **Behave**. Incluye un `.feature` con dos escenarios (uno es un esquema del escenario con ejemplos), los pasos
  sobre los mismos page objects, hooks de navegador y un job/etapa de BDD en cada pipeline de CI.
- Opcional: `CLAUDE.md`, `.claude/settings.json` con bloqueo de `.env`, hooks (secretos, PII, lint, puerta final),
  skills (`synthetic-data`, `page-object`, `flaky-triage`), subagentes (planner, generator, healer, reviewer) y `.mcp.json` con Playwright MCP.
- `README.md` del proyecto con la configuración elegida, comandos, estructura y próximos pasos.

## Validación realizada

Todas las combinaciones se probaron en **español y en inglés**.

Proyectos generados y verificados:

| Combinación | Verificación |
|---|---|
| TS grande (Postgres, Allure, métricas, a11y, visual, 4 CI, Claude) | `tsc`, ESLint, Prettier, YAML/JSON válidos, tests en verde, reportes y métricas generados, flujo visual, hooks de Claude |
| TS con MySQL, SQL Server y MongoDB | `tsc` + ESLint |
| TS pequeño | `tsc`, ESLint, Prettier |
| Python grande (mismas opciones) | Ruff, `ruff format`, `mypy --strict`, pytest con xdist, HTML/JUnit/Allure/métricas, hooks de Claude |
| Python con MySQL, SQL Server y MongoDB; Python pequeño | Ruff + mypy (+ pytest en el pequeño) |
| TS grande con BDD (Cucumber), en español y en inglés | `tsc`, ESLint, Prettier, `npm run test:bdd` en verde (4 escenarios), reportes HTML y JUnit |
| Python grande con BDD (Behave), en español y en inglés | Ruff, `ruff format`, `mypy --strict`, `python -m behave` en verde (4 escenarios), JUnit |

## Idiomas

El español es el idioma fuente de las plantillas. En inglés, cada texto de la terminal y cada archivo generado pasa por
`translate()` con la tabla de `src/i18n/en.ts` (reemplazo de frases, de la más larga a la más corta).

- Si añades o cambias un texto en español en una plantilla, añade su traducción en `src/i18n/en.ts`.
- Un test genera todas las variantes en inglés y busca caracteres y palabras en español.

## Desarrollo

`create-pw-framework.mjs` es un archivo **generado**: el código fuente está en `src/` (TypeScript, por módulos) y se
empaqueta con esbuild. Para usar el generador no hace falta nada de esto; para modificarlo, Node.js 22.18+:

```bash
npm install
npm run build     # regenera create-pw-framework.mjs a partir de src/
npm run check     # tipos, ESLint, Prettier y tests
```

| Carpeta | Contenido |
|---|---|
| `src/cli.ts`, `src/cli/` | Punto de entrada, argumentos, preguntas y mensajes de la terminal |
| `src/answers/` | Tipos de las respuestas, catálogos de opciones, valores por tamaño y normalización |
| `src/templates/` | Una función por archivo generado (`ts/`, `py/`, `ci/`, `claude/`, `docs/`) |
| `src/project/` | Ensamblado del proyecto, escritura en disco e instalación |
| `src/i18n/` | Tabla de traducción es→en |
| `tests/` | Tests; `tests/golden/` fija la salida esperada de cada variante |

- Los tests comparan cada archivo generado con una referencia (`tests/golden/`): un refactor no puede cambiar la salida
  sin que se note. Si el cambio es intencionado: `npm run test:update-golden`.
- El bundle se confirma en el repo junto con el cambio; un test falla si no está al día con `src/`.
- Para modificarlo con Claude Code: abre esta carpeta completa; `CLAUDE.md` explica la arquitectura y las reglas.
- `PW_VERSION` (`src/version.ts`) fija `@playwright/test` y la imagen Docker de CI: actualízalos juntos.
- Para añadir una opción nueva: tipo en `src/answers/types.ts`, catálogo y valores por tamaño en `catalog.ts`, pregunta en
  `collect.ts` y uso en las plantillas; el compilador señala lo que falte.
