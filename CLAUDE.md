# create-pw-framework — guía para Claude Code

Generador interactivo (un solo archivo, Node.js 18+, sin dependencias) que crea frameworks Playwright
en TypeScript o Python, en español o inglés.

## Archivos
- `create-pw-framework.mjs` — todo el generador.
- `i18n/en_pairs.py` — tabla de traducción es→en (FUENTE de las traducciones).
- `i18n/inject.py` — embebe la tabla en el `.mjs` (entre `/*__I18N_START__*/` y `/*__I18N_END__*/`).
- `scripts/check.sh` — genera variantes en ES y EN, valida sintaxis y busca restos de español en la salida EN.
- `ejemplos/*.json` — respuestas de ejemplo para `--answers`.

## Estructura del generador (`create-pw-framework.mjs`)
1. **i18n**: `LANG`, tabla `I18N_EN` (generada, NO editar a mano) y `tr()` (reemplazo de frases, la más larga primero).
2. **Consola**: `askText`, `askSelect`, `askMulti`, `askConfirm`; `log()` y `question()` ya aplican `tr()`.
3. **Catálogos**: `SIZES`, `DEFAULTS` (valores por tamaño), `*_OPTIONS`, `DB_URLS`.
4. **`collectAnswers()` / `normalize()`**: preguntas y normalización de respuestas.
5. **Plantillas**: una función por archivo (`ts*`, `py*`, `githubWorkflow`, `jenkinsfile`, `claude*`, `readme`...).
   Usan `lines(...)`: aplana arrays a cualquier profundidad e ignora `false/null/undefined` → patrón `cond && [...]`.
6. **`buildProject(a)`**: arma el `Map` ruta→contenido; al final, si `LANG === 'en'`, aplica `tr()` a cada archivo.
7. **`writeProject`, `install`, `main`**.

## Reglas al modificar
- Las plantillas se escriben SIEMPRE en español; el inglés sale de la tabla.
- Todo texto nuevo o cambiado en español → añade su par en `i18n/en_pairs.py` y ejecuta `python3 i18n/inject.py`.
  Las claves son el texto EXACTO tal como queda en el archivo generado (no el código JS que lo produce).
  Si la traducción cambia la longitud de una línea de código y el formateador la reescribiría, traduce el bloque completo.
- Cuidado con `${` dentro de template literals de JS: en contenido generado (GitHub Actions `${{ }}`, Jenkins, Docker)
  usa comillas simples o escápalo como `\${`.
- El código generado debe pasar sin errores: TS → `tsc --noEmit`, ESLint, `prettier --check "**/*.{ts,mjs}"`;
  Python → `ruff check`, `ruff format --check`, `mypy --strict`. Respeta los anchos de línea (110).
- Nueva opción: catálogo `*_OPTIONS` → `DEFAULTS` (3 tamaños) → pregunta en `collectAnswers` → `normalize` → uso en
  plantillas/`buildProject` → fila en `printSummary` y en la tabla de `readme()` → traducciones.
- Si cambias `PW_VERSION`, la imagen Docker de CI y `@playwright/test` se actualizan juntos.

## Verificación antes de terminar
```bash
node --check create-pw-framework.mjs
bash scripts/check.sh          # salida EN sin español + sintaxis
# Prueba completa (requiere red): generar con ejemplos/*.json, npm install / pip install y correr lint, tipos y tests
```
