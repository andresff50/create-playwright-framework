# create-pw-framework

Generador interactivo de frameworks de automatización con **Playwright**, en **TypeScript** o **Python**,
en **español o inglés** (preguntas, código, comentarios, nombres de tests y documentación).
Hace preguntas en la terminal y crea un esqueleto listo para trabajar, escalable de un proyecto pequeño a uno empresarial.

- Un solo archivo, **sin dependencias**: solo necesitas **Node.js 18+** (también para generar proyectos Python).
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
| Capas | Pruebas de API, base de datos (PostgreSQL, MySQL, SQL Server, MongoDB), datos sintéticos, autenticación reutilizable, accesibilidad, regresión visual |
| Reportes | HTML, JUnit, Allure, reporter de métricas propio (flaky rate, duración, tests lentos) |
| Infraestructura | Docker / docker-compose (con BD efímera), CI: GitHub Actions, Jenkins, GitLab CI, Azure DevOps, número de shards |
| Calidad e IA | ESLint + Prettier o Ruff + mypy, pre-commit (husky / pre-commit), integración con Claude Code |

El **tamaño** solo propone valores por defecto; puedes cambiar cualquier respuesta.

## Qué genera

- Arquitectura por capas: specs → fixtures → page objects / components → API client → data factories → DB → config.
- Configuración centralizada por ambiente (`.env.<ambiente>`) con guard que impide ejecutar contra producción.
- Tests de ejemplo que pasan sin configuración (los de API y BD se saltan hasta definir `API_URL` / `DB_URL`).
- Pipelines de CI con sharding, artefactos y publicación de resultados JUnit.
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

## Idiomas

El español es el idioma fuente de las plantillas. En inglés, cada texto de la terminal y cada archivo generado pasa por
`tr()` con la tabla `I18N_EN` embebida en el script (reemplazo de frases, de la más larga a la más corta).

- La tabla se edita en `i18n/en_pairs.py` y se vuelve a embeber con `python3 i18n/inject.py`.
- Si añades o cambias un texto en español en una plantilla, añade su traducción en `en_pairs.py`.
- Verificación usada: generar todas las variantes en inglés y buscar caracteres y palabras en español;
  el proyecto en español es idéntico al de la versión anterior.

## Mantenimiento

- Para modificarlo con Claude Code: abre esta carpeta completa; `CLAUDE.md` explica la arquitectura y las reglas.
- Antes de entregar cambios: `bash scripts/check.sh` (genera todas las variantes ES/EN y valida la salida).

- `PW_VERSION` (al inicio del script) fija `@playwright/test` y la imagen Docker de CI: actualízalos juntos.
- Para añadir una opción nueva: agrégala al catálogo (`*_OPTIONS`), pregúntala en `collectAnswers` y úsala en `buildProject`.
