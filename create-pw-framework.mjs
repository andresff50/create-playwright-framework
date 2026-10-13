#!/usr/bin/env node
// ARCHIVO GENERADO por `npm run build` a partir de src/. No lo edites a mano.
// Generado: 2026-10-13T01:24:00Z

// src/cli.ts
import fs4 from "node:fs";
import path4 from "node:path";
import process5 from "node:process";

// src/answers/collect.ts
import fs from "node:fs";

// src/cli/console.ts
import process from "node:process";

// src/i18n/en.ts
var PAIRS = [
  // ─────────────── Terminal: preguntas y mensajes ───────────────
  [
    "Responde las preguntas; Enter acepta el valor sugerido.",
    "Answer the questions; Enter accepts the suggested value."
  ],
  [
    "(números separados por coma, Enter = valores marcados, 0 = ninguno)",
    "(comma-separated numbers, Enter = checked values, 0 = none)"
  ],
  ["Hay números fuera de rango", "Some numbers are out of range"],
  ["Elige al menos ", "Choose at least "],
  ["Elige ", "Choose "],
  ["Opción inválida", "Invalid option"],
  ["Responde s o n", "Answer y or n"],
  ["(S/n)", "(Y/n)"],
  ["(s/N)", "(y/N)"],
  ["1. Proyecto", "1. Project"],
  ["2. Aplicación y ejecución", "2. Application & execution"],
  ["3. Capas del framework", "3. Framework layers"],
  ["4. Reportes y métricas", "4. Reports & metrics"],
  ["5. Infraestructura y CI/CD", "5. Infrastructure & CI/CD"],
  ["6. Calidad e IA", "6. Quality & AI"],
  ["── Resumen", "── Summary"],
  ["── Instalando", "── Installing"],
  ["── Siguientes pasos", "── Next steps"],
  ["Nombre del proyecto", "Project name"],
  ["Usa minúsculas, números, puntos o guiones", "Use lowercase letters, numbers, dots or hyphens"],
  ["Lenguaje del framework", "Framework language"],
  ["@playwright/test (runner nativo)", "@playwright/test (native runner)"],
  [
    "Tamaño / escala del proyecto (define valores sugeridos)",
    "Project size / scale (sets suggested defaults)"
  ],
  ["Grande / empresarial", "Large / enterprise"],
  ["Pequeño", "Small"],
  ["Mediano", "Medium"],
  ["1 equipo, < 100 tests, estructura simple", "1 team, < 100 tests, simple structure"],
  ["varios flujos, componentes, API y datos", "several flows, components, API and data"],
  ["varios equipos, sharding, BD, métricas, gobierno", "several teams, sharding, DB, metrics, governance"],
  ["URL base de la aplicación bajo prueba", "Base URL of the application under test"],
  ["Debe empezar por http:// o https://", "Must start with http:// or https://"],
  ["Ambientes (separados por coma)", "Environments (comma-separated)"],
  ["Navegadores / dispositivos", "Browsers / devices"],
  ["Móvil Android (Pixel 7)", "Mobile Android (Pixel 7)"],
  ["Móvil iOS (iPhone 15)", "Mobile iOS (iPhone 15)"],
  [
    "¿Incluir pruebas de API y cliente API para setup de datos?",
    "Include API tests and an API client for data setup?"
  ],
  ["Conexión a base de datos", "Database connection"],
  ["Sin base de datos", "No database"],
  ["¿Incluir factories de datos sintéticos (Faker)?", "Include synthetic data factories (Faker)?"],
  [
    "¿Incluir autenticación reutilizable (storageState / login una vez)?",
    "Include reusable authentication (storageState / log in once)?"
  ],
  ["Pruebas adicionales", "Additional tests"],
  ["Accesibilidad con axe-core", "Accessibility with axe-core"],
  ["Regresión visual (toHaveScreenshot)", "Visual regression (toHaveScreenshot)"],
  ["Reportes a integrar", "Reports to integrate"],
  ["HTML nativo de Playwright", "Playwright native HTML"],
  ["Reporter de métricas propio (JSON)", "Custom metrics reporter (JSON)"],
  ["flaky rate, duración, tests lentos", "flaky rate, duration, slow tests"],
  ["Sin contenedores", "No containers"],
  ["Dockerfile para ejecutar los tests", "Dockerfile to run the tests"],
  ["tests + base de datos efímera", "tests + ephemeral database"],
  ["Pipelines de CI/CD", "CI/CD pipelines"],
  ["Número de shards (máquinas en paralelo) en CI", "Number of CI shards (parallel machines)"],
  ["Número entre 1 y 16", "A number between 1 and 16"],
  [
    "¿Linters y formateo (ESLint + eslint-plugin-playwright + Prettier)?",
    "Linters and formatting (ESLint + eslint-plugin-playwright + Prettier)?"
  ],
  ["¿Linters y tipado (Ruff + mypy)?", "Linters and type checking (Ruff + mypy)?"],
  ["¿Hooks de pre-commit (husky + lint-staged)?", "Pre-commit hooks (husky + lint-staged)?"],
  ["¿Hooks de pre-commit (pre-commit)?", "Pre-commit hooks (pre-commit)?"],
  [
    "¿Integrar Claude Code (CLAUDE.md, bloqueo de .env, hooks, skills, subagentes, MCP)?",
    "Integrate Claude Code (CLAUDE.md, .env blocking, hooks, skills, subagents, MCP)?"
  ],
  ["¿Inicializar repositorio git?", "Initialize a git repository?"],
  ["Carpeta de salida", "Output folder"],
  ["¿Generar el proyecto con esta configuración?", "Generate the project with this configuration?"],
  ["Cancelado.", "Cancelled."],
  [" no está vacía. ¿Sobrescribir archivos?", " is not empty. Overwrite files?"],
  ["La carpeta ", "The folder "],
  [" archivos generados en ", " files generated in "],
  ["Repositorio git inicializado", "Git repository initialized"],
  ["¿Instalar dependencias y navegadores ahora?", "Install dependencies and browsers now?"],
  ["Instalación completa", "Installation complete"],
  [
    "La instalación falló; revisa los mensajes y ejecútala manualmente.",
    "Installation failed; check the messages above and run it manually."
  ],
  [
    "Lee README.md para la arquitectura, comandos y próximos pasos.",
    "Read README.md for the architecture, commands and next steps."
  ],
  ["Se requiere Node.js 18 o superior.", "Node.js 18 or later is required."],
  [
    "— genera un framework Playwright listo para trabajar.",
    "— generates a ready-to-use Playwright framework."
  ],
  ["Modo interactivo", "Interactive mode"],
  ["Valores por defecto (TypeScript, mediano)", "Default values (TypeScript, medium)"],
  ["Usa respuestas guardadas (ver scaffold.answers.json)", "Use saved answers (see scaffold.answers.json)"],
  ["Opciones: --out <carpeta>", "Options: --out <dir>"],
  ["URL base / ambientes", "Base URL / envs"],
  ["API / BD / Datos", "API / DB / Data"],
  ["Proyecto", "Project"],
  ["Navegadores", "Browsers"],
  ["Reportes", "Reports"],
  ["Contenedores", "Containers"],
  // ─────────────── Archivos comunes ───────────────
  ["# Dependencias", "# Dependencies"],
  ["# Resultados y reportes", "# Results and reports"],
  ["# Secretos (NUNCA versionar)", "# Secrets (NEVER commit)"],
  [
    "# Copia este archivo a .env (o .env.<ambiente>) y completa los valores.",
    "# Copy this file to .env (or .env.<env>) and fill in the values."
  ],
  [
    "# NUNCA subas archivos .env al repositorio. En CI usa secrets/variables del pipeline.",
    "# NEVER commit .env files. In CI use the pipeline's secrets/variables."
  ],
  ["# Ambientes disponibles: ", "# Available environments: "],
  [" carga .env.<ambiente>", " loads .env.<env>"],
  ["<ambiente>", "<env>"],
  [
    "# Usuario de pruebas (datos sintéticos, nunca cuentas reales)",
    "# Test user (synthetic data, never real accounts)"
  ],
  [
    "# Base de datos de QA (usuario de SOLO LECTURA para verificaciones)",
    "# QA database (READ-ONLY user for verifications)"
  ],
  [
    "Framework de automatización E2E con Playwright + pytest",
    "E2E test automation framework with Playwright + pytest"
  ],
  ["Framework de automatización E2E con Playwright", "E2E test automation framework with Playwright"],
  // ─────────────── TypeScript ───────────────
  [
    "// Tests de backend (API/BD) corren en su propio proyecto, sin navegador",
    "// Backend tests (API/DB) run in their own project, without a browser"
  ],
  ["// sharding: luego `npx playwright merge-reports`", "// sharding: then `npx playwright merge-reports`"],
  [
    "// Visual: solo con VISUAL=1 (npm run test:visual) para no fallar por falta de baseline",
    "// Visual: only with VISUAL=1 (npm run test:visual) so missing baselines don't fail the run"
  ],
  ["locale: 'es-CO'", "locale: 'en-US'"],
  [
    " * Única puerta de entrada a la configuración. El resto del código NO lee process.env.",
    " * Single entry point for configuration. The rest of the code does NOT read process.env."
  ],
  [
    " * Carga .env.<TEST_ENV> y luego .env (las variables ya definidas en el entorno tienen prioridad).",
    " * Loads .env.<TEST_ENV> and then .env (variables already set in the environment take precedence)."
  ],
  [
    "// Guard: evita ejecutar contra producción por error",
    "// Guard: prevents running against production by mistake"
  ],
  ["BASE_URL parece de producción (", "BASE_URL looks like production ("],
  ["). Define ALLOW_PROD=true si es intencional.", "). Set ALLOW_PROD=true if this is intentional."],
  [
    "/** Fixtures de test: se crean bajo demanda y se destruyen al terminar cada test. */",
    "/** Test fixtures: created on demand and torn down after each test. */"
  ],
  [
    "// Usuario 100 % sintético. Si tienes API, créalo aquí vía api.post(...) y bórralo después de use().",
    "// 100% synthetic user. If you have an API, create it here via api.post(...) and delete it after use()."
  ],
  [
    "// Una conexión (pool) por worker, cerrada al terminar el worker",
    "// One connection (pool) per worker, closed when the worker ends"
  ],
  [
    "/** Page Object: locators readonly + métodos de intención. Sin aserciones de negocio. */",
    "/** Page Object: readonly locators + intent-revealing methods. No business assertions. */"
  ],
  [
    "/** Componente reutilizable: se compone dentro de los Page Objects (composición > herencia). */",
    "/** Reusable component: composed inside Page Objects (composition over inheritance). */"
  ],
  [
    "/** Ajusta la ruta y los nombres accesibles a tu aplicación. */",
    "/** Adjust the route and accessible names to your application. */"
  ],
  ["/correo|email/i", "/email/i"],
  ["/contraseña|password/i", "/password/i"],
  ["/iniciar sesión|ingresar|sign in|log in/i", "/sign in|log in/i"],
  [
    "/** Cliente API delgado: setup rápido de datos y verificaciones sin UI. */",
    "/** Thin API client: fast data setup and verifications without the UI. */"
  ],
  [
    " * Builder de datos 100 % sintéticos. El test solo sobreescribe lo relevante.",
    " * 100% synthetic data builder. The test only overrides what matters."
  ],
  [
    " * Para reproducir un fallo: faker.seed(<número>) al inicio del test.",
    " * To reproduce a failure: faker.seed(<number>) at the start of the test."
  ],
  ["// rango reservado para pruebas", "// range reserved for testing"],
  ["# rango reservado para pruebas", "# range reserved for testing"],
  ["'Medellín', 'Bogotá', 'Cali', 'Barranquilla'", "'New York', 'Chicago', 'Austin', 'Seattle'"],
  ['"Medellín", "Bogotá", "Cali", "Barranquilla"', '"New York", "Chicago", "Austin", "Seattle"'],
  ["DB_URL no está definida. Revisa .env.example", "DB_URL is not set. Check .env.example"],
  [
    "Guard: DB_URL parece apuntar a producción. Abortando.",
    "Guard: DB_URL seems to point to production. Aborting."
  ],
  [
    "/** Pool PostgreSQL por worker. Consultas SIEMPRE parametrizadas ($1, $2...). */",
    "/** PostgreSQL pool per worker. Queries are ALWAYS parameterized ($1, $2...). */"
  ],
  [
    "/** Pool MySQL por worker. Consultas SIEMPRE parametrizadas (?). */",
    "/** MySQL pool per worker. Queries are ALWAYS parameterized (?). */"
  ],
  [
    '/** Pool SQL Server por worker. Parámetros con nombre: query("... WHERE id = @id", { id }). */',
    '/** SQL Server pool per worker. Named parameters: query("... WHERE id = @id", { id }). */'
  ],
  ["/** Cliente MongoDB por worker. */", "/** MongoDB client per worker. */"],
  ["'carga la página principal'", "'loads the home page'"],
  ["'muestra la navegación principal'", "'shows the main navigation'"],
  ["'ejemplo de datos sintéticos'", "'synthetic data example'"],
  [
    "El usuario se genera con la factory: nunca datos reales",
    "The user is generated by the factory: never real data"
  ],
  ["'autenticar usuario de pruebas'", "'authenticate test user'"],
  [
    "// Sin credenciales: estado vacío para que el resto de proyectos pueda arrancar",
    "// No credentials: empty state so the other projects can still start"
  ],
  ["'Sin TEST_USER_EMAIL/PASSWORD: storageState vacío'", "'No TEST_USER_EMAIL/PASSWORD: empty storageState'"],
  [
    "// Recomendado: si tu app lo permite, autentica por API (más rápido) y guarda request.storageState()",
    "// Recommended: if your app allows it, authenticate via API (faster) and save request.storageState()"
  ],
  ["'Define API_URL en .env para ejecutar las pruebas de API'", "'Set API_URL in .env to run the API tests'"],
  ["'API - salud del servicio'", "'API - service health'"],
  ["'GET /health responde 200'", "'GET /health returns 200'"],
  [
    "'Define DB_URL en .env para ejecutar las pruebas de base de datos'",
    "'Set DB_URL in .env to run the database tests'"
  ],
  ["'Base de datos'", "'Database'"],
  ["'la conexión responde'", "'the connection responds'"],
  ["'Accesibilidad'", "'Accessibility'"],
  [
    "// WCAG 2.0 A/AA; solo las violaciones críticas bloquean (el resto queda adjunto al reporte)",
    "// WCAG 2.0 A/AA; only critical violations fail the test (the rest are attached to the report)"
  ],
  ["'home sin violaciones críticas'", "'home has no critical violations'"],
  ["'Violaciones críticas de accesibilidad'", "'Critical accessibility violations'"],
  [
    "// Ejecutar con: npm run test:visual  (primera vez: npm run test:visual:update para crear la baseline)",
    "// Run with: npm run test:visual  (first time: npm run test:visual:update to create the baseline)"
  ],
  [
    "// Genera y compara baselines SIEMPRE dentro del contenedor oficial para evitar diferencias de fuentes.",
    "// ALWAYS create and compare baselines inside the official container to avoid font differences."
  ],
  ["'home - regresión visual'", "'home - visual regression'"],
  [
    "/** Exporta métricas de la corrida a reports/metrics.json (envíalas a Grafana, BigQuery, etc.). */",
    "/** Exports run metrics to reports/metrics.json (ship them to Grafana, BigQuery, etc.). */"
  ],
  [
    "// Último intento de cada test (los anteriores fueron reintentos)",
    "// Last attempt of each test (earlier ones were retries)"
  ],
  ["// detecta await olvidados", "// catches forgotten awaits"],
  ["playwright-core fijado a la misma versión", "playwright-core pinned to the same version"],
  // ─────────────── Python ───────────────
  [
    "# Instalar: python -m pip install -r requirements.txt",
    "# Install: python -m pip install -r requirements.txt"
  ],
  ["# paralelismo: pytest -n auto", "# parallelism: pytest -n auto"],
  ["# reintentos en CI: --reruns 2", "# retries in CI: --reruns 2"],
  ["# sharding en CI: --splits N --group i", "# sharding in CI: --splits N --group i"],
  ['"smoke: pruebas críticas y rápidas"', '"smoke: critical, fast tests"'],
  ['"regression: suite completa"', '"regression: full suite"'],
  ['"api: pruebas de API"', '"api: API tests"'],
  ['"db: pruebas de base de datos"', '"db: database tests"'],
  ['"a11y: accesibilidad"', '"a11y: accessibility"'],
  [
    "# PT = estilo pytest, B = bugbear, SIM = simplificaciones, UP = sintaxis moderna, I = imports",
    "# PT = pytest style, B = bugbear, SIM = simplifications, UP = modern syntax, I = imports"
  ],
  ["  # permite tildes y eñes en textos", "  # allows accented characters in strings"],
  [
    "# factory_boy no está tipado por completo: se trata como Any",
    "# factory_boy is not fully typed: treat it as Any"
  ],
  [
    '"""Única puerta de entrada a la configuración. El resto del código NO lee os.environ."""',
    '"""Single entry point for configuration. The rest of the code does NOT read os.environ."""'
  ],
  [
    '"""Fixtures globales del framework (pytest-playwright)."""',
    '"""Global framework fixtures (pytest-playwright)."""'
  ],
  [
    '"""Sobrescribe pytest-base-url: la URL sale de config/env.py."""',
    '"""Overrides pytest-base-url: the URL comes from config/env.py."""'
  ],
  [
    '"""Login UNA vez por sesión/worker y reutiliza el storage_state en todos los tests."""',
    '"""Log in ONCE per session/worker and reuse the storage_state in every test."""'
  ],
  ['"locale": "es-CO"', '"locale": "en-US"'],
  [
    '"""Una conexión/pool por worker de xdist (scope session = por proceso)."""',
    '"""One connection/pool per xdist worker (session scope = per process)."""'
  ],
  [
    '"""Usuario 100 % sintético. Con API: créalo aquí y bórralo después de un yield."""',
    '"""100% synthetic user. With an API: create it here and delete it after a yield."""'
  ],
  [
    '"""Page Object: locators en el constructor + métodos de intención. Sin aserciones de negocio."""',
    '"""Page Object: locators in the constructor + intent-revealing methods. No business assertions."""'
  ],
  [
    '"""Componente reutilizable (composición > herencia)."""',
    '"""Reusable component (composition over inheritance)."""'
  ],
  [
    '"""Ajusta la ruta y los nombres accesibles a tu aplicación."""',
    '"""Adjust the route and accessible names to your application."""'
  ],
  ['r"correo|email"', 'r"email"'],
  ['r"contraseña|password"', 'r"password"'],
  [
    '        self.submit = page.get_by_role(\n            "button", name=re.compile(r"iniciar sesión|ingresar|sign in|log in", re.I)\n        )',
    '        self.submit = page.get_by_role("button", name=re.compile(r"sign in|log in", re.I))'
  ],
  ['r"iniciar sesión|ingresar|sign in|log in"', 'r"sign in|log in"'],
  [
    '"""Cliente API delgado para setup de datos y verificaciones sin UI."""',
    '"""Thin API client for data setup and verifications without the UI."""'
  ],
  [
    '"""Factories de datos 100 % sintéticos (factory_boy + Faker).',
    '"""100% synthetic data factories (factory_boy + Faker).'
  ],
  [
    "Para reproducir un fallo: factory.random.reseed_random(<número>) al inicio del test.",
    "To reproduce a failure: factory.random.reseed_random(<number>) at the start of the test."
  ],
  ['locale="es_CO"', 'locale="en_US"'],
  [
    '"""Acceso a la base de datos de QA. Consultas SIEMPRE parametrizadas."""',
    '"""QA database access. Queries are ALWAYS parameterized."""'
  ],
  ["test_carga_la_pagina_principal", "test_loads_the_home_page"],
  ["test_muestra_la_navegacion_principal", "test_shows_the_main_navigation"],
  ["test_ejemplo_datos_sinteticos", "test_synthetic_data_example"],
  ["test_health_responde_200", "test_health_returns_200"],
  ["test_la_conexion_responde", "test_the_connection_responds"],
  ["test_home_sin_violaciones_criticas", "test_home_has_no_critical_violations"],
  ['"Define API_URL en .env para las pruebas de API"', '"Set API_URL in .env to run the API tests"'],
  ['"Define DB_URL en .env para las pruebas de BD"', '"Set DB_URL in .env to run the DB tests"'],
  [
    '"""Plugin pytest: exporta métricas de la corrida a reports/metrics.json."""',
    '"""pytest plugin: exports run metrics to reports/metrics.json."""'
  ],
  ["# en xdist solo escribe el proceso controlador", "# with xdist only the controller process writes"],
  ["# pre-commit install  →  se ejecuta en cada commit", "# pre-commit install  →  runs on every commit"],
  // ─────────────── Docker / CI ───────────────
  [
    "# La versión de la imagen DEBE coincidir con @playwright/test en package.json",
    "# The image version MUST match @playwright/test in package.json"
  ],
  ["# 06:00 hora Colombia, regresión diaria", "# 11:00 UTC, daily regression"],
  ["// Requiere plugins: ", "// Requires plugins: "],
  ["description: 'Ambiente'", "description: 'Environment'"],
  ["'Filtro de tags, ej. @smoke'", "'Tag filter, e.g. @smoke'"],
  ["'Marcador pytest, ej. smoke'", "'pytest marker, e.g. smoke'"],
  [
    "// Define estas credenciales en Jenkins (Manage Jenkins → Credentials) y descomenta:",
    "// Define these credentials in Jenkins (Manage Jenkins → Credentials) and uncomment:"
  ],
  [
    "# BASE_URL, API_TOKEN, DB_URL...: defínelas en Settings → CI/CD → Variables (masked)",
    "# BASE_URL, API_TOKEN, DB_URL...: define them in Settings → CI/CD → Variables (masked)"
  ],
  [
    "# Variables no secretas (BASE_URL, TEST_ENV...) se exponen solas como variables de entorno.",
    "# Non-secret variables (BASE_URL, TEST_ENV...) are exposed as environment variables automatically."
  ],
  [
    '# Los secretos deben mapearse explícitamente en "env" (ver paso de pruebas).',
    '# Secrets must be mapped explicitly under "env" (see the test step).'
  ],
  ["displayName: Instalar dependencias", "displayName: Install dependencies"],
  ["displayName: Instalar navegadores", "displayName: Install browsers"],
  ["displayName: Lint y tipos", "displayName: Lint and types"],
  ["displayName: Ejecutar pruebas", "displayName: Run tests"],
  // ─────────────── Claude Code ───────────────
  [" — Framework E2E con Playwright (", " — E2E framework with Playwright ("],
  ["## Comandos útiles", "## Useful commands"],
  ["## Comandos", "## Commands"],
  ["- Ejecutar un test: ", "- Run a test: "],
  ["- Lint y tipos: ", "- Lint and types: "],
  ["- Traza de un fallo: ", "- Trace of a failure: "],
  ["<ruta>", "<path>"],
  ["## Arquitectura (obligatoria)", "## Architecture (mandatory)"],
  ["config. Ver README.md", "config. See README.md"],
  [
    "- Configuración solo vía `src/config/env.ts`; page objects en `src/pages`, componentes en `src/components`.",
    "- Configuration only via `src/config/env.ts`; page objects in `src/pages`, components in `src/components`."
  ],
  [
    "- Configuración solo vía `config/env.py`; page objects en `pages/`, componentes en `components/`.",
    "- Configuration only via `config/env.py`; page objects in `pages/`, components in `components/`."
  ],
  [
    "- Page objects: locators en el constructor, métodos de intención, SIN aserciones de negocio.",
    "- Page objects: locators in the constructor, intent-revealing methods, NO business assertions."
  ],
  [
    "- Page objects y clientes se inyectan por fixtures; nunca se instancian dentro del test.",
    "- Page objects and clients are injected through fixtures; never instantiated inside the test."
  ],
  [
    "- Locators: getByRole > getByLabel > getByTestId (`data-qa`) > texto. Prohibido XPath y CSS posicional.",
    "- Locators: getByRole > getByLabel > getByTestId (`data-qa`) > text. XPath and positional CSS are forbidden."
  ],
  ["## Reglas de calidad", "## Quality rules"],
  [
    "- Prohibido `waitForTimeout`/`time.sleep`, `force: true`, `test.only`.",
    "- Forbidden: `waitForTimeout`/`time.sleep`, `force: true`, `test.only`."
  ],
  [
    "- Web-first assertions siempre. Tests independientes con datos propios y teardown.",
    "- Always use web-first assertions. Independent tests with their own data and teardown."
  ],
  [
    "- Antes de terminar: ejecuta el test afectado con `--repeat-each=3` y el lint.",
    "- Before finishing: run the affected test with `--repeat-each=3` and the linter."
  ],
  [
    "- Antes de terminar: ejecuta el test afectado 3 veces (`pytest <ruta> --count=3` si tienes pytest-repeat) y el lint.",
    "- Before finishing: run the affected test 3 times (`pytest <path> --count=3` if you have pytest-repeat) and the linter."
  ],
  ["## Seguridad y datos (NO negociable)", "## Security and data (NON-negotiable)"],
  [
    "- NUNCA leas, muestres ni copies archivos `.env*` (excepto `.env.example`) ni `.auth/`.",
    "- NEVER read, print or copy `.env*` files (except `.env.example`) or `.auth/`."
  ],
  [
    "- NUNCA uses datos reales. Usa la skill `synthetic-data` y las factories del proyecto.",
    "- NEVER use real data. Use the `synthetic-data` skill and the project's factories."
  ],
  [
    "- Correos de prueba: `qa+<uuid>@example.com`. Si una URL o DSN contiene `prod`, detente y pregunta.",
    "- Test emails: `qa+<uuid>@example.com`. If a URL or DSN contains `prod`, stop and ask."
  ],
  ["## Al arreglar un test que falla", "## When fixing a failing test"],
  [
    "- Clasifica primero (bug de la app, test frágil, datos, ambiente) con la skill `flaky-triage`.",
    "- Classify first (app bug, brittle test, data, environment) with the `flaky-triage` skill."
  ],
  [
    "- Si es bug real de la app: NO cambies el test para que pase; repórtalo.",
    "- If it is a real app bug: do NOT change the test to make it pass; report it."
  ],
  // hooks
  [
    "// PreToolUse: bloquea acceso a .env, .auth y llaves. exit 2 = bloquear (stderr llega a Claude).",
    "// PreToolUse: blocks access to .env, .auth and keys. exit 2 = block (stderr is shown to Claude)."
  ],
  [
    '"""PreToolUse: bloquea acceso a .env, .auth y llaves. exit 2 = bloquear (stderr llega a Claude)."""',
    '"""PreToolUse: blocks access to .env, .auth and keys. exit 2 = block (stderr is shown to Claude)."""'
  ],
  ["'Bloqueado por política de QA: '", "'Blocked by QA policy: '"],
  [
    "' intentó acceder a secretos (.env, .auth, llaves). '",
    "' tried to access secrets (.env, .auth, keys). '"
  ],
  [
    "'Consulta .env.example o src/config/env.ts para conocer los nombres de las variables.'",
    "'See .env.example or src/config/env.ts for the variable names.'"
  ],
  ["intentó acceder a secretos. ", "tried to access secrets. "],
  ["Bloqueado por política de QA: ", "Blocked by QA policy: "],
  ['"Consulta .env.example o config/env.py."', '"See .env.example or config/env.py."'],
  [
    "// PreToolUse (Write|Edit): impide escribir datos personales reales en el código de pruebas.",
    "// PreToolUse (Write|Edit): prevents writing real personal data into test code."
  ],
  [
    '"""PreToolUse (Write|Edit): impide escribir datos personales reales en el código de pruebas."""',
    '"""PreToolUse (Write|Edit): prevents writing real personal data into test code."""'
  ],
  ["correo no sintético", "non-synthetic email"],
  ["documento de identidad", "national ID number"],
  ["número de tarjeta", "card number"],
  ["teléfono móvil", "phone number"],
  ["(cc|c[eé]dula|documento|dni)", "(ssn|social security|passport|national id)"],
  ["3\\d{2}[ -]?\\d{3}[ -]?\\d{4}", "\\(?\\d{3}\\)?[ .-]\\d{3}[ .-]\\d{4}"],
  [
    "'Posible ' + hit[0] + ' en ' + file + '. Usa la skill synthetic-data y correos qa+<uuid>@example.com.'",
    "'Possible ' + hit[0] + ' in ' + file + '. Use the synthetic-data skill and qa+<uuid>@example.com emails.'"
  ],
  [
    'f"Posible {name} en {path}. Usa la skill synthetic-data y correos qa+<uuid>@example.com."',
    'f"Possible {name} in {path}. Use the synthetic-data skill and qa+<uuid>@example.com emails."'
  ],
  [
    "// PostToolUse (Edit|Write): ejecuta ESLint sobre el archivo editado y devuelve errores a Claude.",
    "// PostToolUse (Edit|Write): runs ESLint on the edited file and returns errors to Claude."
  ],
  [
    '"""PostToolUse (Edit|Write): Ruff + mypy sobre el archivo editado; los errores vuelven a Claude."""',
    '"""PostToolUse (Edit|Write): Ruff + mypy on the edited file; errors go back to Claude."""'
  ],
  [
    "// Stop: no permite terminar la tarea si quedan test.only o esperas fijas.",
    "// Stop: does not allow finishing the task while test.only or hard waits remain."
  ],
  [
    "'Quedan test.only / waitForTimeout en: ' + offenders.join(', ') + '. Elimínalos antes de terminar.'",
    "'test.only / waitForTimeout still present in: ' + offenders.join(', ') + '. Remove them before finishing.'"
  ],
  [
    '"""Stop: no permite terminar la tarea si quedan esperas fijas o tests enfocados."""',
    '"""Stop: does not allow finishing the task while hard waits or focused tests remain."""'
  ],
  [
    '"Quedan esperas fijas en: " + ", ".join(offenders) + ". Elimínalas antes de terminar."',
    '"Hard waits still present in: " + ", ".join(offenders) + ". Remove them before finishing."'
  ],
  // skills
  [
    "description: Genera datos de prueba sintéticos (usuarios, órdenes, pagos, direcciones) para los tests",
    "description: Generates synthetic test data (users, orders, payments, addresses) for this project's"
  ],
  [
    "  Playwright de este proyecto. Úsala SIEMPRE que un test, fixture o seed necesite datos.",
    "  Playwright tests. Use it ALWAYS when a test, fixture or seed needs data."
  ],
  ['argument-hint: "[entidad]"', 'argument-hint: "[entity]"'],
  ["# Datos sintéticos", "# Synthetic data"],
  ["## Reglas", "## Rules"],
  [
    "1. Nunca datos reales: ni de producción, ni de logs, ni de capturas.",
    "1. Never real data: not from production, logs or screenshots."
  ],
  [
    "2. Correos: `qa+<uuid>@example.com`. Documentos: prefijo `9` + 9 dígitos (rango de pruebas).",
    "2. Emails: `qa+<uuid>@example.com`. IDs: prefix `9` + 9 digits (test range)."
  ],
  [
    "3. Tarjetas: SOLO los números de prueba documentados por la pasarela de pagos.",
    "3. Cards: ONLY the test numbers documented by the payment gateway."
  ],
  [
    "4. Unicidad: UUID o índice de worker en todo identificador (permite paralelismo).",
    "4. Uniqueness: UUID or worker index in every identifier (enables parallelism)."
  ],
  [
    "5. Reproducibilidad: semilla fija de Faker solo al depurar, documentada en el test.",
    "5. Reproducibility: fixed Faker seed only while debugging, documented in the test."
  ],
  ["## Dónde", "## Where"],
  [
    "- Builders en `src/data/<entidad>.factory.ts` con `@faker-js/faker` (patrón: `src/data/user.factory.ts`).",
    "- Builders in `src/data/<entity>.factory.ts` with `@faker-js/faker` (pattern: `src/data/user.factory.ts`)."
  ],
  [
    '- Factories en `data/factories.py` con factory_boy + Faker("es_CO") (patrón: `UserFactory`).',
    '- Factories in `data/factories.py` with factory_boy + Faker("en_US") (pattern: `UserFactory`).'
  ],
  [
    "- Exponer los datos con una fixture que haga teardown de lo que cree.",
    "- Expose the data through a fixture that tears down whatever it creates."
  ],
  ["## Pasos", "## Steps"],
  [
    '1. Busca si ya existe una factory para "$ARGUMENTS" y reutilízala.',
    '1. Check whether a factory for "$ARGUMENTS" already exists and reuse it.'
  ],
  [
    "2. Si no existe, créala siguiendo el patrón existente.",
    "2. If it does not exist, create it following the existing pattern."
  ],
  [
    "3. Crea/actualiza la fixture que la expone y ejecuta el lint del archivo.",
    "3. Create/update the fixture that exposes it and lint the file."
  ],
  [
    "description: Crea o refactoriza Page Objects y Components de Playwright con la arquitectura del proyecto.",
    "description: Creates or refactors Playwright Page Objects and Components following the project architecture."
  ],
  [
    "  Úsala al automatizar una pantalla nueva o al reemplazar selectores frágiles.",
    "  Use it when automating a new screen or replacing brittle selectors."
  ],
  ['argument-hint: "[url o pantalla]"', 'argument-hint: "[url or screen]"'],
  [
    "1. Abre la pantalla con el MCP de Playwright (browser_navigate + browser_snapshot) y usa roles y nombres reales.",
    "1. Open the screen with the Playwright MCP (browser_navigate + browser_snapshot) and use real roles and names."
  ],
  [
    "2. Reutiliza componentes existentes (tablas, modales, header) antes de crear nuevos.",
    "2. Reuse existing components (tables, modals, header) before creating new ones."
  ],
  [
    "3. Locators en el constructor con prioridad getByRole > getByLabel > getByTestId.",
    "3. Locators in the constructor with priority getByRole > getByLabel > getByTestId."
  ],
  [
    "4. Métodos de intención, sin aserciones de negocio.",
    "4. Intent-revealing methods, no business assertions."
  ],
  [
    "5. Registra el page object en `src/fixtures/index.ts`.",
    "5. Register the page object in `src/fixtures/index.ts`."
  ],
  [
    "5. Registra el page object como fixture en `conftest.py`.",
    "5. Register the page object as a fixture in `conftest.py`."
  ],
  ["6. Ejecuta lint y un test de humo que lo use.", "6. Run the linter and a smoke test that uses it."],
  [
    "description: Analiza un test que falla o es intermitente y clasifica la causa (bug de la app, test frágil,",
    "description: Analyzes a failing or flaky test and classifies the cause (app bug, brittle test,"
  ],
  [
    "  datos o ambiente) con evidencia. Úsala ante cualquier fallo local o de CI.",
    "  data or environment) with evidence. Use it for any local or CI failure."
  ],
  ['argument-hint: "[ruta del test]"', 'argument-hint: "[test path]"'],
  ["Test a analizar: $ARGUMENTS", "Test to analyze: $ARGUMENTS"],
  ["1. Reproduce: ", "1. Reproduce: "],
  [" varias veces.", " several times."],
  [
    "2. Revisa la traza: red, consola y DOM en el paso que falla.",
    "2. Inspect the trace: network, console and DOM at the failing step."
  ],
  [
    "3. Entrega una tabla: Causa | Evidencia | Acción propuesta.",
    "3. Deliver a table: Cause | Evidence | Proposed action."
  ],
  [
    "4. Bug de la app → no cambies el test; redacta el reporte. Test frágil → cambio mínimo.",
    "4. App bug → do not change the test; write the bug report. Brittle test → minimal change."
  ],
  [
    "5. Nunca agregues retries, esperas fijas ni `force` como solución.",
    "5. Never add retries, hard waits or `force` as a fix."
  ],
  // agents
  [
    "description: Explora una funcionalidad con el navegador y produce un plan de pruebas priorizado por riesgo.",
    "description: Explores a feature in the browser and produces a risk-prioritized test plan."
  ],
  [
    "  Úsalo antes de automatizar una historia de usuario nueva.",
    "  Use it before automating a new user story."
  ],
  [
    "Eres un QA senior. Con la URL y los criterios de aceptación:",
    "You are a senior QA engineer. Given the URL and the acceptance criteria:"
  ],
  [
    "1. Explora la funcionalidad usando SOLO datos sintéticos.",
    "1. Explore the feature using ONLY synthetic data."
  ],
  [
    "2. Escribe `specs/<feature>.plan.md`: felices, bordes, negativos, accesibilidad, riesgos; prioridad P1/P2/P3;",
    "2. Write `specs/<feature>.plan.md`: happy paths, edge cases, negative cases, accessibility, risks; priority P1/P2/P3;"
  ],
  [
    "   indica si cada escenario va a E2E, API o unit.",
    "   state whether each scenario belongs in E2E, API or unit tests."
  ],
  [
    "3. No escribas código de tests. No ejecutes acciones irreversibles.",
    "3. Do not write test code. Do not perform irreversible actions."
  ],
  [
    "description: Implementa tests Playwright a partir de un plan en specs/, respetando POM, fixtures y datos sintéticos.",
    "description: Implements Playwright tests from a plan in specs/, following POM, fixtures and synthetic data."
  ],
  [
    "1. Lee el plan y CLAUDE.md. Reutiliza page objects, componentes y factories existentes.",
    "1. Read the plan and CLAUDE.md. Reuse existing page objects, components and factories."
  ],
  [
    "2. Verifica cada locator contra el snapshot real antes de escribirlo.",
    "2. Verify each locator against the real snapshot before writing it."
  ],
  [
    "3. Un test por escenario con etiquetas según prioridad.",
    "3. One test per scenario, tagged by priority."
  ],
  [
    "4. Ejecuta cada test nuevo 3 veces y el lint. Solo entrega en verde.",
    "4. Run each new test 3 times plus the linter. Only deliver when green."
  ],
  [
    "description: Diagnostica y repara tests que fallan distinguiendo bugs reales de la app de fragilidad del test.",
    "description: Diagnoses and repairs failing tests, distinguishing real app bugs from test brittleness."
  ],
  [
    "- Si la funcionalidad cambió o está rota: NO adaptes el test, reporta el bug con evidencia.",
    "- If the feature changed or is broken: do NOT adapt the test; report the bug with evidence."
  ],
  [
    "- Solo reparas: locators obsoletos, esperas incorrectas, datos no únicos.",
    "- You only fix: stale locators, wrong waits, non-unique data."
  ],
  [
    "- Nunca eliminas aserciones, ni agregas skip, force, esperas fijas o más retries.",
    "- Never remove assertions or add skip, force, hard waits or more retries."
  ],
  [
    "- Documenta cada reparación: causa, evidencia, cambio aplicado.",
    "- Document each repair: cause, evidence, applied change."
  ],
  [
    "description: Revisa cambios en tests contra el checklist de calidad del equipo. Úsalo antes de abrir un PR.",
    "description: Reviews test changes against the team's quality checklist. Use it before opening a PR."
  ],
  ["Reporta hallazgos con archivo:línea y severidad:", "Report findings with file:line and severity:"],
  ["- Locators robustos; sin XPath ni CSS posicional.", "- Robust locators; no XPath or positional CSS."],
  [
    "- Sin esperas fijas, force ni only; web-first assertions.",
    "- No hard waits, force or only; web-first assertions."
  ],
  [
    "- Datos propios, sintéticos y con teardown; sin dependencias entre tests.",
    "- Own, synthetic data with teardown; no dependencies between tests."
  ],
  [
    "- Page objects sin aserciones de negocio; ningún secreto ni referencia a .env.",
    "- Page objects without business assertions; no secrets or references to .env."
  ],
  // ─────────────── README / docs ───────────────
  [
    "Framework de automatización E2E con **Playwright + ",
    "E2E test automation framework with **Playwright + "
  ],
  ["generado con `create-pw-framework` v", "generated with `create-pw-framework` v"],
  ["## Configuración elegida", "## Selected configuration"],
  ["| Opción | Valor |", "| Option | Value |"],
  ["| Tamaño |", "| Size |"],
  ["| Navegadores |", "| Browsers |"],
  ["| Ambientes |", "| Environments |"],
  ["| Reportes |", "| Reports |"],
  ["| Base de datos |", "| Database |"],
  ["| Datos sintéticos |", "| Synthetic data |"],
  ["| Autenticación reutilizable |", "| Reusable authentication |"],
  ["| Contenedores |", "| Containers |"],
  ["Ninguno", "None"],
  ["## Requisitos", "## Requirements"],
  ["- Node.js 20 o superior", "- Node.js 20 or later"],
  ["- Python 3.11 o superior", "- Python 3.11 or later"],
  ["- Docker (opcional, para ejecutar en contenedor)", "- Docker (optional, to run in a container)"],
  ["- Java 8+ para generar el reporte Allure localmente", "- Java 8+ to generate the Allure report locally"],
  ["## Primeros pasos", "## Getting started"],
  ["# completa los valores (nunca subas .env)", "# fill in the values (never commit .env)"],
  ["| Acción | Comando |", "| Action | Command |"],
  ["| Toda la suite en paralelo |", "| Full suite in parallel |"],
  ["| Toda la suite |", "| Full suite |"],
  ["| Solo smoke |", "| Smoke only |"],
  ["| Modo UI / depuración |", "| UI mode / debugging |"],
  ["| Tests de archivos cambiados |", "| Tests for changed files |"],
  ["| Detección de flaky (burn-in) |", "| Flaky detection (burn-in) |"],
  ["| Otro ambiente |", "| Another environment |"],
  ["| Ver reporte HTML |", "| Open HTML report |"],
  ["| Reporte Allure |", "| Allure report |"],
  ["| Visual (crear/actualizar baseline) |", "| Visual (create/update baseline) |"],
  ["| Visual (comparar) |", "| Visual (compare) |"],
  ["| Lint / formato / tipos |", "| Lint / format / types |"],
  ["| Con navegador visible |", "| Headed browser |"],
  ["| Depurar |", "| Debug |"],
  ["| Reintentos (CI) |", "| Retries (CI) |"],
  ["| Emular móvil |", "| Emulate mobile |"],
  ["| Reporte HTML |", "| HTML report |"],
  ["| Métricas de la corrida |", "| Run metrics |"],
  ["| En contenedores |", "| In containers |"],
  ["| En contenedor |", "| In a container |"],
  ["## Arquitectura y gobierno del framework", "## Framework architecture and governance"],
  ["# Arquitectura y gobierno del framework", "# Framework architecture and governance"],
  ["## Arquitectura", "## Architecture"],
  [
    "- **Specs** describen el *qué*: intención de negocio y aserciones. Sin selectores ni SQL.",
    "- **Specs** describe the *what*: business intent and assertions. No selectors or SQL."
  ],
  [
    "- **Fixtures** gestionan el ciclo de vida (setup/teardown) e inyectan dependencias.",
    "- **Fixtures** manage the lifecycle (setup/teardown) and inject dependencies."
  ],
  [
    "- **Page Objects / Components**: locators + métodos de intención. Sin aserciones de negocio.",
    "- **Page Objects / Components**: locators + intent-revealing methods. No business assertions."
  ],
  [
    "- **API client**: setup rápido de datos y verificaciones sin UI.",
    "- **API client**: fast data setup and verifications without the UI."
  ],
  [
    "- **Data factories**: datos 100 % sintéticos y únicos por test (paralelismo seguro).",
    "- **Data factories**: 100% synthetic, per-test unique data (safe parallelism)."
  ],
  [
    "- **DB**: consultas parametrizadas, usuario de solo lectura y guard anti-producción.",
    "- **DB**: parameterized queries, read-only user and an anti-production guard."
  ],
  [
    "- **Config**: única lectura de variables de entorno; guard que impide ejecutar contra producción.",
    "- **Config**: single place that reads environment variables; guard that prevents running against production."
  ],
  ["## Estructura", "## Structure"],
  ["## Buenas prácticas del proyecto", "## Project best practices"],
  [
    "- Locators: `getByRole` > `getByLabel` > `getByTestId` (`data-qa`) > texto. Nunca XPath ni CSS posicional.",
    "- Locators: `getByRole` > `getByLabel` > `getByTestId` (`data-qa`) > text. Never XPath or positional CSS."
  ],
  [
    "- Nada de esperas fijas (`waitForTimeout` / `time.sleep`) ni `force`.",
    "- No hard waits (`waitForTimeout` / `time.sleep`) and no `force`."
  ],
  [
    "- Cada test crea y limpia sus propios datos: independiente y paralelizable.",
    "- Each test creates and cleans up its own data: independent and parallelizable."
  ],
  [
    "- Un retry que pasa es un test *flaky*: se mide y se corrige, no se ignora.",
    "- A retry that passes is a *flaky* test: measure it and fix it, don't ignore it."
  ],
  [
    "- Secretos solo por variables de entorno / secrets del CI. `.env` y `.auth/` nunca se versionan.",
    "- Secrets only via environment variables / CI secrets. `.env` and `.auth/` are never committed."
  ],
  ["Pipelines generados: ", "Generated pipelines: "],
  [". Configura en tu herramienta de CI las variables ", ". Configure these variables in your CI tool: "],
  [" (secreto)", " (secret)"],
  ["La suite se reparte en **", "The suite is split into **"],
  [
    " y GitHub Actions une los reportes con `merge-reports`",
    " and GitHub Actions merges the reports with `merge-reports`"
  ],
  [" con pytest-split", " with pytest-split"],
  ["La imagen Docker de CI está fijada en ", "The CI Docker image is pinned to "],
  [": actualízala junto con ", ": update it together with "],
  [
    "- `CLAUDE.md`: reglas del proyecto que Claude carga en cada sesión.",
    "- `CLAUDE.md`: project rules Claude loads in every session."
  ],
  [
    "- `.claude/settings.json`: bloqueo de `.env`/`.auth`, hooks de secretos, PII, lint y puerta final.",
    "- `.claude/settings.json`: `.env`/`.auth` blocking, hooks for secrets, PII, lint and a final gate."
  ],
  ["(invócalas con `/nombre`)", "(invoke them with `/name`)"],
  [
    "- `.claude/agents/`: planner, generator, healer y reviewer.",
    "- `.claude/agents/`: planner, generator, healer and reviewer."
  ],
  [
    "- `.mcp.json`: Playwright MCP (requiere Node.js/npx).",
    "- `.mcp.json`: Playwright MCP (requires Node.js/npx)."
  ],
  [
    "- El sandbox viene configurado pero **desactivado** (`sandbox.enabled: false`). Actívalo tras validar",
    "- The sandbox is configured but **disabled** (`sandbox.enabled: false`). Enable it after verifying"
  ],
  [
    "  que los navegadores arrancan dentro de él en tu sistema (macOS, Linux o WSL2).",
    "  that browsers start inside it on your system (macOS, Linux or WSL2)."
  ],
  [
    "- Los hooks usan `python3`; en Windows cámbialo por `python` en `.claude/settings.json`.",
    "- Hooks use `python3`; on Windows change it to `python` in `.claude/settings.json`."
  ],
  ["## Próximos pasos", "## Next steps"],
  [
    "1. Completa `.env` y ajusta `LoginPage` a tu aplicación.",
    "1. Fill in `.env` and adapt `LoginPage` to your application."
  ],
  [
    "2. Reemplaza los tests de ejemplo por los flujos críticos (P1) de tu producto.",
    "2. Replace the sample tests with your product's critical (P1) flows."
  ],
  [
    "3. Acuerda con desarrollo el atributo `data-qa` para elementos sin rol accesible claro.",
    "3. Agree with development on the `data-qa` attribute for elements without a clear accessible role."
  ],
  [
    "4. Configura secrets y variables en el CI y ejecuta el primer pipeline.",
    "4. Configure secrets and variables in CI and run the first pipeline."
  ],
  ["## Propiedad del código", "## Code ownership"],
  [
    "- Cada carpeta de `tests/` pertenece a un squad (ver `.github/CODEOWNERS`).",
    "- Each `tests/` folder belongs to a squad (see `.github/CODEOWNERS`)."
  ],
  [
    "- Cambios en fixtures, config, CI o page objects compartidos requieren revisión del equipo de plataforma QA.",
    "- Changes to shared fixtures, config, CI or page objects require review by the QA platform team."
  ],
  ["## Convenciones", "## Conventions"],
  [
    "- Un dominio de negocio por carpeta en `tests/` (p. ej. `tests/checkout`, `tests/admin`).",
    "- One business domain per folder in `tests/` (e.g. `tests/checkout`, `tests/admin`)."
  ],
  [
    "- Etiquetas: `@smoke` (bloquea PR), `@regression` (post-merge / nightly), `@<dominio>` para filtrar.",
    "- Tags: `@smoke` (blocks PRs), `@regression` (post-merge / nightly), `@<domain>` for filtering."
  ],
  [
    "- Tests > 60 s se revisan; tests flaky se ponen en cuarentena con ticket, dueño y fecha límite.",
    "- Tests > 60 s get reviewed; flaky tests are quarantined with a ticket, owner and deadline."
  ],
  ["## Métricas objetivo", "## Target metrics"],
  ["| Métrica | Objetivo |", "| Metric | Target |"],
  ["| Pass rate en main |", "| Pass rate on main |"],
  ["| Duración del pipeline de PR |", "| PR pipeline duration |"],
  ["| MTTR de tests rotos | < 1 día |", "| MTTR for broken tests | < 1 day |"],
  ["## Pipeline por etapas", "## Staged pipeline"],
  ["| Etapa | Qué corre |", "| Stage | What runs |"],
  ["| Lint, formato, tipos |", "| Lint, format, types |"],
  ["| `@smoke` + tests cambiados + API |", "| `@smoke` + changed tests + API |"],
  ["| Regresión completa con sharding |", "| Full regression with sharding |"],
  ["| Cross-browser + visual + accesibilidad |", "| Cross-browser + visual + accessibility |"],
  ["# Ajusta los equipos a tu organización", "# Adjust the teams to your organization"],
  ["@mi-org/", "@my-org/"],
  // ─────────────── BDD (Cucumber / Behave) ───────────────
  ["¿Incluir BDD con Gherkin (Cucumber)?", "Include BDD with Gherkin (Cucumber)?"],
  ["¿Incluir BDD con Gherkin (Behave)?", "Include BDD with Gherkin (Behave)?"],
  ["# language: es", "# language: en"],
  ["Característica: Página de inicio", "Feature: Home page"],
  [
    "  Como visitante quiero abrir la página de inicio para empezar a usar la aplicación.",
    "  As a visitor I want to open the home page so I can start using the application."
  ],
  ["  Escenario: La página de inicio carga", "  Scenario: The home page loads"],
  ["    Cuando abro la página de inicio", "    When I open the home page"],
  ["    Entonces la página tiene un título", "    Then the page has a title"],
  ["    Y veo el encabezado principal", "    And I see the main heading"],
  [
    "  Esquema del escenario: La página de inicio se adapta a <dispositivo>",
    "  Scenario Outline: The home page adapts to <device>"
  ],
  ["    Dado una pantalla de <ancho> x <alto>", "    Given a <width> x <height> screen"],
  ["    Entonces veo el encabezado principal", "    Then I see the main heading"],
  ["    Ejemplos:", "    Examples:"],
  ["      | dispositivo | ancho | alto |", "      | device  | width | height |"],
  ["      | escritorio  | 1440  | 900  |", "      | desktop | 1440  | 900    |"],
  ["      | tableta     | 768   | 1024 |", "      | tablet  | 768   | 1024   |"],
  ["      | celular     | 390   | 844  |", "      | mobile  | 390   | 844    |"],
  ["una pantalla de {int} x {int}", "a {int} x {int} screen"],
  ["una pantalla de {width:d} x {height:d}", "a {width:d} x {height:d} screen"],
  ["abro la página de inicio", "I open the home page"],
  ["la página tiene un título", "the page has a title"],
  ["veo el encabezado principal", "I see the main heading"],
  [
    "/** Estado de un escenario. Los hooks crean un contexto, una página y los Page Objects por escenario. */",
    "/** Scenario state. The hooks create a context, a page and the Page Objects for each scenario. */"
  ],
  ["// Un navegador por ejecución", "// One browser per run"],
  [
    "Un contexto nuevo por escenario: escenarios independientes entre sí",
    "A new context per scenario: scenarios stay independent"
  ],
  ["BROWSER no soportado", "Unsupported BROWSER"],
  ["El navegador no se inició", "The browser did not start"],
  [
    "# Si before_all falló puede no haber nada que cerrar",
    "# If before_all failed there may be nothing to close"
  ],
  [
    "// Los pasos describen el comportamiento y delegan en los Page Objects: sin selectores aquí.",
    "// Steps describe behaviour and delegate to the Page Objects: no selectors here."
  ],
  [
    "// tsx carga los pasos en TypeScript sin compilar",
    "// tsx loads the TypeScript steps without compiling"
  ],
  [
    '"""Hooks de Behave: un navegador por ejecución y un contexto nuevo por escenario."""',
    '"""Behave hooks: one browser per run and a new context per scenario."""'
  ],
  [
    '"""Pasos de la página de inicio: describen el comportamiento y delegan en los Page Objects."""',
    '"""Home page steps: they describe behaviour and delegate to the Page Objects."""'
  ],
  [
    "# Behave no publica tipos: sus decoradores no están tipados",
    "# Behave ships no types: its decorators are untyped"
  ],
  ['locale="es-CO"', 'locale="en-US"'],
  [
    "# Python no tiene Cucumber oficial: los .feature (Gherkin) se ejecutan con Behave → python -m behave",
    "# Python has no official Cucumber: .feature files (Gherkin) run with Behave → python -m behave"
  ],
  ["navegador y modo visible (HEADED=1)", "browser and headed mode (HEADED=1)"],
  ["displayName: Ejecutar BDD", "displayName: Run BDD"],
  ["| BDD solo smoke |", "| BDD smoke only |"],
  ["| BDD con navegador visible |", "| BDD headed browser |"],
  [
    "los `.feature` describen el comportamiento en Gherkin; los pasos delegan en los mismos page objects.",
    "`.feature` files describe behaviour in Gherkin; steps delegate to the same page objects."
  ],
  [
    "- Python no tiene Cucumber oficial: los `.feature` se ejecutan con **Behave**.",
    "- Python has no official Cucumber: `.feature` files run with **Behave**."
  ],
  [
    "- BDD: features en `features/`, pasos en `features/steps`; los pasos NO llevan selectores ni lógica: delegan en page objects.",
    "- BDD: features in `features/`, steps in `features/steps`; steps carry NO selectors or logic: they delegate to page objects."
  ]
];

// src/i18n/index.ts
var EN = new Map(PAIRS.filter(([es, en]) => es !== en));
var EN_LONGEST_FIRST = [...EN].sort(([x], [y]) => y.length - x.length);
function translate(text, language) {
  if (language !== "en") return text;
  let out = text;
  for (const [es, en] of EN_LONGEST_FIRST) if (out.includes(es)) out = out.split(es).join(en);
  return out;
}
var current = "es";
var setLanguage = (language) => {
  current = language;
};
var getLanguage = () => current;
var tr = (text) => translate(text, current);

// src/cli/console.ts
var useColor = process.stdout.isTTY && !process.env.NO_COLOR;
var paint = (code) => (s) => useColor ? `\x1B[${code}m${s}\x1B[0m` : String(s);
var c = {
  bold: paint("1"),
  dim: paint("2"),
  green: paint("32"),
  cyan: paint("36"),
  yellow: paint("33"),
  red: paint("31"),
  magenta: paint("35")
};
var log = (...args) => console.log(...args.map((x) => typeof x === "string" ? tr(x) : x));

// src/cli/prompts.ts
import process2 from "node:process";
import readline from "node:readline/promises";
var rl;
var pendingLines = [];
var waiters = [];
var inputClosed = false;
var isTTY = Boolean(process2.stdin.isTTY);
function ensureReader() {
  if (rl) return rl;
  if (isTTY) {
    rl = readline.createInterface({ input: process2.stdin, output: process2.stdout });
    return rl;
  }
  rl = readline.createInterface({ input: process2.stdin, terminal: false });
  rl.on("line", (line) => {
    const waiter = waiters.shift();
    if (waiter) waiter(line);
    else pendingLines.push(line);
  });
  rl.on("close", () => {
    inputClosed = true;
    for (const waiter of waiters.splice(0)) waiter("");
  });
  return rl;
}
function closeReader() {
  rl?.close();
}
async function question(text) {
  const reader = ensureReader();
  if (isTTY) return (await reader.question(tr(text))).trim();
  process2.stdout.write(tr(text));
  let answer;
  const pending = pendingLines.shift();
  if (pending !== void 0) answer = pending;
  else if (inputClosed) answer = "";
  else answer = await new Promise((resolve) => waiters.push(resolve));
  process2.stdout.write(answer + "\n");
  return answer.trim();
}
async function askText(label, def = "", validate = () => true) {
  for (; ; ) {
    const hint = def ? c.dim(` (${def})`) : "";
    const v = await question(`${c.cyan("?")} ${c.bold(label)}${hint}: `) || def;
    const ok = validate(v);
    if (ok === true) return v;
    log(c.red(`  ✖ ${ok}`));
  }
}
var optionLine = (mark, index, o) => `  ${mark} ${c.yellow(index + 1)}) ${o.label}${o.hint ? c.dim(" — " + o.hint) : ""}`;
async function askSelect(label, options, def) {
  log(`${c.cyan("?")} ${c.bold(label)}`);
  const defIdx = Math.max(
    0,
    options.findIndex((o) => o.value === def)
  );
  options.forEach((o, i) => log(optionLine(i === defIdx ? c.green("›") : " ", i, o)));
  for (; ; ) {
    const v = await question(`  ${c.dim(`Elige 1-${options.length}`)} ${c.dim(`(${defIdx + 1})`)}: `);
    if (!v) return options[defIdx].value;
    const n = Number(v);
    if (Number.isInteger(n) && n >= 1 && n <= options.length) return options[n - 1].value;
    log(c.red("  ✖ Opción inválida"));
  }
}
async function askMulti(label, options, defs = [], { min = 0 } = {}) {
  log(
    `${c.cyan("?")} ${c.bold(label)} ${c.dim("(números separados por coma, Enter = valores marcados, 0 = ninguno)")}`
  );
  options.forEach((o, i) => log(optionLine(defs.includes(o.value) ? c.green("◉") : "◯", i, o)));
  for (; ; ) {
    const v = await question("  › ");
    let picked;
    if (!v) picked = defs.filter((d) => options.some((o) => o.value === d));
    else if (v === "0") picked = [];
    else {
      const nums = v.split(/[\s,]+/).filter(Boolean).map(Number);
      if (nums.some((n) => !Number.isInteger(n) || n < 1 || n > options.length)) {
        log(c.red("  ✖ Hay números fuera de rango"));
        continue;
      }
      picked = [...new Set(nums.map((n) => options[n - 1].value))];
    }
    if (picked.length < min) {
      log(c.red(`  ✖ Elige al menos ${min}`));
      continue;
    }
    return picked;
  }
}
async function askConfirm(label, def = true) {
  for (; ; ) {
    const v = (await question(`${c.cyan("?")} ${c.bold(label)} ${c.dim(def ? "(S/n)" : "(s/N)")}: `)).toLowerCase();
    if (!v) return def;
    if (["s", "si", "sí", "y", "yes"].includes(v)) return true;
    if (["n", "no"].includes(v)) return false;
    log(c.red("  ✖ Responde s o n"));
  }
}

// src/answers/catalog.ts
var SIZES = [
  { value: "small", label: "Pequeño", hint: "1 equipo, < 100 tests, estructura simple" },
  { value: "medium", label: "Mediano", hint: "varios flujos, componentes, API y datos" },
  { value: "large", label: "Grande / empresarial", hint: "varios equipos, sharding, BD, métricas, gobierno" }
];
var DEFAULTS = {
  small: {
    envs: ["qa"],
    browsers: ["chromium"],
    reporters: ["html"],
    api: false,
    db: "none",
    data: true,
    auth: false,
    extras: [],
    bdd: false,
    docker: "none",
    ci: ["github"],
    shards: 1,
    lint: true,
    precommit: false,
    claude: false
  },
  medium: {
    envs: ["qa", "staging"],
    browsers: ["chromium", "firefox"],
    reporters: ["html", "junit"],
    api: true,
    db: "none",
    data: true,
    auth: true,
    extras: ["a11y"],
    bdd: false,
    docker: "dockerfile",
    ci: ["github"],
    shards: 2,
    lint: true,
    precommit: true,
    claude: true
  },
  large: {
    envs: ["dev", "qa", "staging"],
    browsers: ["chromium", "firefox", "webkit"],
    reporters: ["html", "junit", "allure", "metrics"],
    api: true,
    db: "postgres",
    data: true,
    auth: true,
    extras: ["a11y", "visual"],
    bdd: false,
    docker: "compose",
    ci: ["github"],
    shards: 4,
    lint: true,
    precommit: true,
    claude: true
  }
};
var MOBILE_BROWSERS = [
  { value: "mobile-chrome", label: "Móvil Android (Pixel 7)" },
  { value: "mobile-safari", label: "Móvil iOS (iPhone 15)" }
];
var browserOptions = (lang) => [
  { value: "chromium", label: "Chromium (Desktop Chrome)" },
  { value: "firefox", label: "Firefox" },
  { value: "webkit", label: "WebKit (Safari)" },
  ...lang === "ts" ? MOBILE_BROWSERS : []
];
var reporterOptions = (lang) => [
  { value: "html", label: lang === "ts" ? "HTML nativo de Playwright" : "HTML (pytest-html)" },
  { value: "junit", label: "JUnit XML", hint: "Jenkins, Azure DevOps, GitLab, Xray, TestRail" },
  { value: "allure", label: "Allure Report" },
  {
    value: "metrics",
    label: "Reporter de métricas propio (JSON)",
    hint: "flaky rate, duración, tests lentos"
  }
];
var DB_OPTIONS = [
  { value: "none", label: "Sin base de datos" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL / MariaDB" },
  { value: "mssql", label: "SQL Server" },
  { value: "mongodb", label: "MongoDB" }
];
var VISUAL_EXTRA = { value: "visual", label: "Regresión visual (toHaveScreenshot)" };
var extraOptions = (lang) => [
  { value: "a11y", label: "Accesibilidad con axe-core" },
  ...lang === "ts" ? [VISUAL_EXTRA] : []
];
var DOCKER_OPTIONS = [
  { value: "none", label: "Sin contenedores" },
  { value: "dockerfile", label: "Dockerfile para ejecutar los tests" },
  { value: "compose", label: "Dockerfile + docker-compose", hint: "tests + base de datos efímera" }
];
var CI_OPTIONS = [
  { value: "github", label: "GitHub Actions" },
  { value: "jenkins", label: "Jenkins (Jenkinsfile)" },
  { value: "gitlab", label: "GitLab CI" },
  { value: "azure", label: "Azure DevOps" }
];
var DB_URLS = {
  postgres: "postgresql://qa_user:qa_pass@localhost:5432/qa_db",
  mysql: "mysql://qa_user:qa_pass@localhost:3306/qa_db",
  mssql: "mssql://sa:Qa_Passw0rd!@localhost:1433/qa_db",
  mongodb: "mongodb://localhost:27017/qa_db"
};

// src/answers/normalize.ts
function normalize(a) {
  const d = (a.size ? DEFAULTS[a.size] : void 0) ?? DEFAULTS.medium;
  const out = { ...d, ...a };
  out.language = a.language === "en" ? "en" : "es";
  out.size = a.size ?? "medium";
  out.lang = a.lang === "py" ? "py" : "ts";
  out.name = a.name ?? "qa-e2e-framework";
  out.baseUrl = a.baseUrl ?? "https://playwright.dev";
  if (out.lang === "py") {
    out.browsers = out.browsers.filter((b) => !b.startsWith("mobile"));
    out.extras = out.extras.filter((e) => e !== "visual");
  }
  if (!out.browsers.length) out.browsers = ["chromium"];
  if (!out.ci.length) out.shards = 1;
  if (out.ci.some((x) => ["jenkins", "gitlab", "azure"].includes(x)) && !out.reporters.includes("junit")) {
    out.reporters = [...out.reporters, "junit"];
  }
  if (!out.lint) out.precommit = false;
  out.git = a.git ?? true;
  return out;
}

// src/answers/collect.ts
var LANG_OPTIONS = [
  { value: "ts", label: "TypeScript", hint: "@playwright/test (runner nativo)" },
  { value: "py", label: "Python", hint: "pytest + pytest-playwright" }
];
var section = (title) => log(c.magenta(`
── ${title}`));
async function collectAnswers(args) {
  if (args.answers) {
    const file = JSON.parse(fs.readFileSync(args.answers, "utf8"));
    return normalize({ ...file, ...args.lang ? { language: args.lang } : {} });
  }
  if (args.yes) return normalize({ size: "medium", lang: "ts", language: args.lang ?? "es" });
  return normalize(await askAnswers());
}
async function askAnswers() {
  const a = { language: getLanguage() };
  section("1. Proyecto ───────────────────────────────────────────");
  a.name = await askText(
    "Nombre del proyecto",
    "qa-e2e-framework",
    (v) => /^[a-z0-9][a-z0-9._-]*$/.test(v) || "Usa minúsculas, números, puntos o guiones"
  );
  const lang = await askSelect("Lenguaje del framework", LANG_OPTIONS, "ts");
  a.lang = lang;
  a.size = await askSelect("Tamaño / escala del proyecto (define valores sugeridos)", SIZES, "medium");
  const d = DEFAULTS[a.size];
  section("2. Aplicación y ejecución ──────────────────────────────");
  a.baseUrl = await askText(
    "URL base de la aplicación bajo prueba",
    "https://playwright.dev",
    (v) => /^https?:\/\/\S+$/.test(v) || "Debe empezar por http:// o https://"
  );
  a.envs = (await askText("Ambientes (separados por coma)", d.envs.join(","))).split(",").map((s) => s.trim()).filter(Boolean);
  a.browsers = await askMulti("Navegadores / dispositivos", browserOptions(lang), d.browsers, { min: 1 });
  section("3. Capas del framework ─────────────────────────────────");
  a.api = await askConfirm("¿Incluir pruebas de API y cliente API para setup de datos?", d.api);
  a.db = await askSelect("Conexión a base de datos", DB_OPTIONS, d.db);
  a.data = await askConfirm("¿Incluir factories de datos sintéticos (Faker)?", d.data);
  a.auth = await askConfirm("¿Incluir autenticación reutilizable (storageState / login una vez)?", d.auth);
  a.extras = await askMulti(
    "Pruebas adicionales",
    extraOptions(lang),
    d.extras.filter((e) => lang === "ts" || e !== "visual")
  );
  a.bdd = await askConfirm(
    lang === "ts" ? "¿Incluir BDD con Gherkin (Cucumber)?" : "¿Incluir BDD con Gherkin (Behave)?",
    d.bdd
  );
  section("4. Reportes y métricas ─────────────────────────────────");
  a.reporters = await askMulti("Reportes a integrar", reporterOptions(lang), d.reporters);
  section("5. Infraestructura y CI/CD ─────────────────────────────");
  a.docker = await askSelect("Contenedores", DOCKER_OPTIONS, d.docker);
  a.ci = await askMulti("Pipelines de CI/CD", CI_OPTIONS, d.ci);
  a.shards = a.ci.length ? await askShards(d.shards) : 1;
  section("6. Calidad e IA ────────────────────────────────────────");
  a.lint = await askConfirm(
    lang === "ts" ? "¿Linters y formateo (ESLint + eslint-plugin-playwright + Prettier)?" : "¿Linters y tipado (Ruff + mypy)?",
    d.lint
  );
  a.precommit = a.lint ? await askConfirm(
    lang === "ts" ? "¿Hooks de pre-commit (husky + lint-staged)?" : "¿Hooks de pre-commit (pre-commit)?",
    d.precommit
  ) : false;
  a.claude = await askConfirm(
    "¿Integrar Claude Code (CLAUDE.md, bloqueo de .env, hooks, skills, subagentes, MCP)?",
    d.claude
  );
  a.git = await askConfirm("¿Inicializar repositorio git?", true);
  return a;
}
async function askShards(def) {
  const answer = await askText(
    "Número de shards (máquinas en paralelo) en CI",
    String(def),
    (v) => /^\d+$/.test(v) && +v >= 1 && +v <= 16 || "Número entre 1 y 16"
  );
  return Number(answer);
}

// src/cli/args.ts
function parseArgs(argv) {
  const args = { yes: false, answers: null, out: null, install: null, help: false, lang: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--yes" || a === "-y") args.yes = true;
    else if (a === "--answers") args.answers = argv[++i] ?? null;
    else if (a === "--out") args.out = argv[++i] ?? null;
    else if (a === "--no-install") args.install = false;
    else if (a === "--install") args.install = true;
    else if (a === "--help" || a === "-h") args.help = true;
    else if (a === "--lang") args.lang = argv[++i] === "en" ? "en" : "es";
  }
  return args;
}

// src/cli/summary.ts
import path from "node:path";
import process3 from "node:process";

// src/templates/helpers.ts
var lines = (...xs) => xs.flat(Infinity).filter((x) => x !== false && x !== null && x !== void 0).join("\n");
var has = (a, list, v) => a[list].includes(v);
var uiBrowsers = (a) => a.browsers;
var installBrowsers = (a) => [
  ...new Set(
    a.browsers.map((b) => b === "mobile-chrome" ? "chromium" : b === "mobile-safari" ? "webkit" : b)
  )
];
var bddTool = (a) => a.lang === "ts" ? "Cucumber" : "Behave";
var hasBackend = (a) => a.api || a.db !== "none";

// src/cli/summary.ts
function printSummary(a) {
  const row = (k, v) => log(`  ${c.dim(tr(k).padEnd(22))} ${v}`);
  const yn = (b) => b ? a.language === "en" ? "yes" : "sí" : "no";
  log(c.magenta("\n── Resumen ────────────────────────────────────────────────"));
  row("Proyecto", `${a.name} (${a.lang === "ts" ? "TypeScript" : "Python"}, ${a.size})`);
  row("URL base / ambientes", `${a.baseUrl}  [${a.envs.join(", ")}]`);
  row("Navegadores", a.browsers.join(", "));
  row("Reportes", a.reporters.join(", ") || "list");
  row("API / BD / Datos", `${yn(a.api)} / ${a.db} / ${yn(a.data)}`);
  row("Auth / Extras", `${yn(a.auth)} / ${a.extras.join(", ") || "—"}`);
  row("BDD", a.bdd ? bddTool(a) : "no");
  row("Docker / CI", `${a.docker} / ${a.ci.join(", ") || "—"}${a.shards > 1 ? ` (${a.shards} shards)` : ""}`);
  row("Lint / pre-commit", `${yn(a.lint)} / ${yn(a.precommit)}`);
  row("Claude Code", yn(a.claude));
}
function printNextSteps(a, outDir, installed) {
  const rel = path.relative(process3.cwd(), outDir) || ".";
  const browsers = installBrowsers(a).join(" ");
  log(c.magenta("\n── Siguientes pasos ───────────────────────────────────────"));
  log(`  cd ${rel}`);
  if (!installed) {
    if (a.lang === "ts") log(`  npm install && npx playwright install ${browsers}`);
    else {
      log(
        `  python -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt && python -m playwright install ${browsers}`
      );
    }
  } else if (a.lang === "py") log("  source .venv/bin/activate   (Windows: .venv\\Scripts\\activate)");
  log("  cp .env.example .env");
  log(a.lang === "ts" ? "  npm test" : "  pytest");
  log(c.dim("\n  Lee README.md para la arquitectura, comandos y próximos pasos.\n"));
}
function help() {
  log(`
${c.bold("create-pw-framework")} — genera un framework Playwright listo para trabajar.

  node create-pw-framework.mjs                 Modo interactivo
  node create-pw-framework.mjs --yes           Valores por defecto (TypeScript, mediano)
  node create-pw-framework.mjs --answers f.json  Usa respuestas guardadas (ver scaffold.answers.json)
  Opciones: --out <carpeta>  --lang es|en  --install | --no-install
`);
}

// src/templates/ci/azure.ts
function azurePipeline(a) {
  const ts = a.lang === "ts";
  const n = a.shards;
  const secretEnv = lines(
    a.api && "          API_TOKEN: $(API_TOKEN)",
    a.auth && "          TEST_USER_PASSWORD: $(TEST_USER_PASSWORD)",
    a.db !== "none" && "          DB_URL: $(DB_URL)"
  );
  return lines(
    "# Variables no secretas (BASE_URL, TEST_ENV...) se exponen solas como variables de entorno.",
    '# Los secretos deben mapearse explícitamente en "env" (ver paso de pruebas).',
    "trigger:",
    "  branches:",
    "    include: [main]",
    "pr:",
    "  branches:",
    "    include: [main]",
    "",
    "pool:",
    "  vmImage: ubuntu-latest",
    "",
    "variables:",
    '  CI: "true"',
    "  TEST_ENV: qa",
    "",
    "jobs:",
    "  - job: e2e",
    "    timeoutInMinutes: 60",
    n > 1 && ["    strategy:", `      parallel: ${n}`],
    "    steps:",
    ts ? [
      "      - task: NodeTool@0",
      "        inputs:",
      "          versionSpec: '22.x'",
      "      - script: npm ci",
      "        displayName: Instalar dependencias",
      "      - script: npx playwright install --with-deps",
      "        displayName: Instalar navegadores",
      a.lint && [
        "      - script: npm run lint && npm run typecheck",
        "        displayName: Lint y tipos"
      ]
    ] : [
      "      - task: UsePythonVersion@0",
      "        inputs:",
      "          versionSpec: '3.12'",
      "      - script: pip install -r requirements.txt",
      "        displayName: Instalar dependencias",
      `      - script: python -m playwright install --with-deps ${installBrowsers(a).join(" ")}`,
      "        displayName: Instalar navegadores",
      a.lint && [
        "      - script: ruff check . && ruff format --check . && mypy .",
        "        displayName: Lint y tipos"
      ]
    ],
    ts ? n > 1 ? "      - script: npx playwright test --shard=$(System.JobPositionInPhase)/$(System.TotalJobsInPhase)" : "      - script: npx playwright test" : n > 1 ? "      - script: pytest -n auto --reruns 2 --splits $(System.TotalJobsInPhase) --group $(System.JobPositionInPhase)" : "      - script: pytest -n auto --reruns 2",
    "        displayName: Ejecutar pruebas",
    secretEnv && ["        env:", secretEnv],
    a.bdd && [
      ts ? "      - script: npm run test:bdd" : "      - script: python -m behave",
      `        displayName: Ejecutar BDD (${bddTool(a)})`,
      n > 1 && "        condition: and(succeeded(), eq(variables['System.JobPositionInPhase'], 1))",
      secretEnv && ["        env:", secretEnv]
    ],
    "      - task: PublishTestResults@2",
    "        condition: succeededOrFailed()",
    "        inputs:",
    "          testResultsFormat: JUnit",
    `          testResultsFiles: ${a.bdd ? "reports/**/*.xml" : "reports/junit.xml"}`,
    "          mergeTestResults: true",
    "          testRunTitle: 'E2E $(System.JobPositionInPhase)'",
    "      - task: PublishPipelineArtifact@1",
    "        condition: always()",
    "        inputs:",
    `          targetPath: ${ts ? "playwright-report" : "reports"}`,
    "          artifact: report-$(System.JobPositionInPhase)",
    ""
  );
}

// src/version.ts
var PW_VERSION = "1.62.1";
var GENERATOR_VERSION = "1.1.0";

// src/templates/ci/docker.ts
function dockerfile(a) {
  if (a.lang === "ts") {
    return lines(
      "# La versión de la imagen DEBE coincidir con @playwright/test en package.json",
      `ARG PW_VERSION=${PW_VERSION}`,
      "FROM mcr.microsoft.com/playwright:v${PW_VERSION}-noble",
      "WORKDIR /e2e",
      "ENV CI=true",
      "COPY package*.json ./",
      "RUN npm ci",
      "COPY . .",
      'CMD ["npx", "playwright", "test"]',
      ""
    );
  }
  return lines(
    "FROM python:3.12-slim",
    "WORKDIR /e2e",
    "ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 CI=true",
    "COPY requirements.txt .",
    `RUN pip install --no-cache-dir -r requirements.txt && python -m playwright install --with-deps ${installBrowsers(a).join(" ")}`,
    "COPY . .",
    'CMD ["pytest", "-n", "auto"]',
    ""
  );
}

// src/templates/ci/github.ts
var envSecretsGh = (a) => lines(
  "      TEST_ENV: ${{ vars.TEST_ENV || 'qa' }}",
  "      BASE_URL: ${{ vars.BASE_URL }}",
  a.api && ["      API_URL: ${{ vars.API_URL }}", "      API_TOKEN: ${{ secrets.API_TOKEN }}"],
  a.auth && [
    "      TEST_USER_EMAIL: ${{ vars.TEST_USER_EMAIL }}",
    "      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}"
  ],
  a.db !== "none" && "      DB_URL: ${{ secrets.DB_URL }}"
);
var bddJobTs = (a) => a.bdd && [
  "",
  "  bdd:",
  a.lint && "    needs: [quality]",
  "    runs-on: ubuntu-latest",
  "    timeout-minutes: 30",
  "    container:",
  `      image: mcr.microsoft.com/playwright:v${PW_VERSION}-noble`,
  "      options: --ipc=host",
  "    env:",
  "      CI: true",
  "      HOME: /root",
  envSecretsGh(a),
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - run: npm ci",
  "      - run: npm run test:bdd",
  "      - uses: actions/upload-artifact@v4",
  "        if: ${{ !cancelled() }}",
  "        with: { name: bdd-results, path: reports/, retention-days: 14 }"
];
var bddJobPy = (a) => a.bdd && [
  "",
  "  bdd:",
  a.lint && "    needs: [quality]",
  "    runs-on: ubuntu-latest",
  "    timeout-minutes: 30",
  "    env:",
  "      CI: true",
  envSecretsGh(a),
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: actions/setup-python@v5",
  "        with: { python-version: '3.12', cache: pip }",
  "      - run: pip install -r requirements.txt",
  `      - run: python -m playwright install --with-deps ${installBrowsers(a)[0]}`,
  "      - run: python -m behave",
  "      - uses: actions/upload-artifact@v4",
  "        if: ${{ !cancelled() }}",
  "        with: { name: bdd-results, path: reports/, retention-days: 14 }"
];
function githubWorkflow(a) {
  const n = a.shards;
  const shardMatrix = n > 1 ? [
    "    strategy:",
    "      fail-fast: false",
    "      matrix:",
    `        shard: [${Array.from({ length: n }, (_, i) => i + 1).join(", ")}]`
  ] : null;
  const head = lines(
    `name: e2e`,
    "on:",
    "  push:",
    "    branches: [main]",
    "  pull_request:",
    "  workflow_dispatch:",
    "  schedule:",
    "    - cron: '0 11 * * 1-5' # 06:00 hora Colombia, regresión diaria",
    "concurrency:",
    "  group: e2e-${{ github.ref }}",
    "  cancel-in-progress: true",
    "jobs:"
  );
  if (a.lang === "ts") {
    return lines(
      head,
      a.lint && [
        "  quality:",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: actions/setup-node@v4",
        "        with: { node-version: 22, cache: npm }",
        "      - run: npm ci",
        "      - run: npm run lint",
        "      - run: npm run typecheck",
        "      - run: npm run format:check",
        ""
      ],
      "  test:",
      a.lint && "    needs: [quality]",
      "    runs-on: ubuntu-latest",
      "    timeout-minutes: 60",
      "    container:",
      `      image: mcr.microsoft.com/playwright:v${PW_VERSION}-noble`,
      "      options: --ipc=host",
      shardMatrix,
      "    env:",
      "      CI: true",
      "      HOME: /root",
      n > 1 && "      PW_BLOB: 1",
      envSecretsGh(a),
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - run: npm ci",
      n > 1 ? "      - run: npx playwright test --shard=${{ matrix.shard }}/${{ strategy.job-total }}" : "      - run: npx playwright test",
      "      - uses: actions/upload-artifact@v4",
      "        if: ${{ !cancelled() }}",
      "        with:",
      n > 1 ? "          name: results-${{ matrix.shard }}" : "          name: results",
      "          path: |",
      n > 1 ? "            blob-report/" : "            playwright-report/",
      "            reports/",
      "            test-results/",
      has(a, "reporters", "allure") && "            allure-results/",
      "          retention-days: 14",
      n > 1 && [
        "",
        "  merge-reports:",
        "    if: ${{ !cancelled() }}",
        "    needs: [test]",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: actions/setup-node@v4",
        "        with: { node-version: 22, cache: npm }",
        "      - run: npm ci",
        "      - uses: actions/download-artifact@v4",
        "        with: { pattern: results-*, path: all-results }",
        "      - run: mkdir -p all-blob && cp all-results/*/blob-report/*.zip all-blob/",
        "      - run: npx playwright merge-reports --reporter html ./all-blob",
        "      - uses: actions/upload-artifact@v4",
        "        with: { name: html-report, path: playwright-report, retention-days: 14 }"
      ],
      bddJobTs(a),
      ""
    );
  }
  return lines(
    head,
    a.lint && [
      "  quality:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - uses: actions/setup-python@v5",
      "        with: { python-version: '3.12', cache: pip }",
      "      - run: pip install -r requirements.txt",
      "      - run: ruff check .",
      "      - run: ruff format --check .",
      "      - run: mypy .",
      ""
    ],
    "  test:",
    a.lint && "    needs: [quality]",
    "    runs-on: ubuntu-latest",
    "    timeout-minutes: 60",
    n > 1 && [
      "    strategy:",
      "      fail-fast: false",
      "      matrix:",
      `        group: [${Array.from({ length: n }, (_, i) => i + 1).join(", ")}]`
    ],
    "    env:",
    "      CI: true",
    envSecretsGh(a),
    "    steps:",
    "      - uses: actions/checkout@v4",
    "      - uses: actions/setup-python@v5",
    "        with: { python-version: '3.12', cache: pip }",
    "      - run: pip install -r requirements.txt",
    `      - run: python -m playwright install --with-deps ${installBrowsers(a).join(" ")}`,
    n > 1 ? `      - run: pytest -n auto --reruns 2 --splits ${n} --group \${{ matrix.group }}` : "      - run: pytest -n auto --reruns 2",
    "      - uses: actions/upload-artifact@v4",
    "        if: ${{ !cancelled() }}",
    "        with:",
    n > 1 ? "          name: results-${{ matrix.group }}" : "          name: results",
    "          path: |",
    "            reports/",
    "            test-results/",
    has(a, "reporters", "allure") && "            allure-results/",
    "          retention-days: 14",
    bddJobPy(a),
    ""
  );
}

// src/templates/ci/gitlab.ts
function gitlabCi(a) {
  const ts = a.lang === "ts";
  const n = a.shards;
  return lines(
    ts ? `image: mcr.microsoft.com/playwright:v${PW_VERSION}-noble` : "image: python:3.12",
    "",
    "stages: [quality, test]",
    "",
    "variables:",
    '  CI: "true"',
    "  TEST_ENV: qa",
    ts ? '  npm_config_cache: "$CI_PROJECT_DIR/.npm"' : '  PIP_CACHE_DIR: "$CI_PROJECT_DIR/.pip"',
    "  # BASE_URL, API_TOKEN, DB_URL...: defínelas en Settings → CI/CD → Variables (masked)",
    "",
    "cache:",
    "  key:",
    `    files: [${ts ? "package-lock.json" : "requirements.txt"}]`,
    `  paths: [${ts ? ".npm/" : ".pip/"}]`,
    "",
    ts ? [".install: &install", "  - npm ci"] : [
      ".install: &install",
      "  - pip install -r requirements.txt",
      `  - python -m playwright install --with-deps ${installBrowsers(a).join(" ")}`
    ],
    "",
    a.lint && [
      "lint:",
      "  stage: quality",
      "  script:",
      ts ? ["    - npm ci", "    - npm run lint", "    - npm run typecheck"] : [
        "    - pip install -r requirements.txt",
        "    - ruff check .",
        "    - ruff format --check .",
        "    - mypy ."
      ],
      ""
    ],
    "e2e:",
    "  stage: test",
    n > 1 && `  parallel: ${n}`,
    "  script:",
    "    - *install",
    ts ? n > 1 ? "    - npx playwright test --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL" : "    - npx playwright test" : n > 1 ? "    - pytest -n auto --reruns 2 --splits $CI_NODE_TOTAL --group $CI_NODE_INDEX" : "    - pytest -n auto --reruns 2",
    "  artifacts:",
    "    when: always",
    "    expire_in: 2 weeks",
    "    paths:",
    ts && "      - playwright-report/",
    "      - test-results/",
    "      - reports/",
    has(a, "reporters", "allure") && "      - allure-results/",
    "    reports:",
    "      junit: reports/junit.xml",
    a.bdd && [
      "",
      "bdd:",
      "  stage: test",
      "  script:",
      "    - *install",
      ts ? "    - npm run test:bdd" : "    - python -m behave",
      "  artifacts:",
      "    when: always",
      "    expire_in: 2 weeks",
      "    paths:",
      "      - reports/",
      "    reports:",
      ts ? "      junit: reports/cucumber-junit.xml" : "      junit: reports/behave/*.xml"
    ],
    ""
  );
}

// src/templates/ci/jenkins.ts
function jenkinsfile(a) {
  const ts = a.lang === "ts";
  const testCmd = ts ? `sh 'npx playwright test \${GREP:+--grep "$GREP"}'` : `sh '. .venv/bin/activate && pytest -n auto --reruns 2 \${GREP:+-m "$GREP"}'`;
  return lines(
    "// Requiere plugins: Docker Pipeline, JUnit" + (has(a, "reporters", "allure") ? ", Allure Jenkins" : ""),
    "pipeline {",
    "  agent {",
    ts ? `    docker { image 'mcr.microsoft.com/playwright:v${PW_VERSION}-noble'; args '--ipc=host' }` : "    docker { image 'python:3.12'; args '--ipc=host -u root' }",
    "  }",
    "  options {",
    "    timeout(time: 60, unit: 'MINUTES')",
    "    buildDiscarder(logRotator(numToKeepStr: '30'))",
    "  }",
    "  parameters {",
    `    choice(name: 'TEST_ENV', choices: [${a.envs.map((e) => `'${e}'`).join(", ")}], description: 'Ambiente')`,
    `    string(name: 'GREP', defaultValue: '', description: '${ts ? "Filtro de tags, ej. @smoke" : "Marcador pytest, ej. smoke"}')`,
    "  }",
    "  triggers { cron('H 6 * * 1-5') }",
    "  environment {",
    "    CI = 'true'",
    '    TEST_ENV = "${params.TEST_ENV}"',
    "    // Define estas credenciales en Jenkins (Manage Jenkins → Credentials) y descomenta:",
    a.api && "    // API_TOKEN = credentials('qa-api-token')",
    a.auth && "    // TEST_USER_PASSWORD = credentials('qa-user-password')",
    a.db !== "none" && "    // DB_URL = credentials('qa-db-url')",
    "  }",
    "  stages {",
    "    stage('Install') {",
    "      steps {",
    ts ? "        sh 'npm ci'" : [
      "        sh 'python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt'",
      `        sh '. .venv/bin/activate && python -m playwright install --with-deps ${installBrowsers(a).join(" ")}'`
    ],
    "      }",
    "    }",
    a.lint && [
      "    stage('Lint') {",
      "      steps {",
      ts ? "        sh 'npm run lint && npm run typecheck'" : "        sh '. .venv/bin/activate && ruff check . && ruff format --check . && mypy .'",
      "      }",
      "    }"
    ],
    "    stage('Test') {",
    "      steps {",
    `        ${testCmd}`,
    "      }",
    "    }",
    a.bdd && [
      "    stage('BDD') {",
      "      steps {",
      ts ? "        sh 'npm run test:bdd'" : "        sh '. .venv/bin/activate && python -m behave'",
      "      }",
      "    }"
    ],
    "  }",
    "  post {",
    "    always {",
    `      junit allowEmptyResults: true, testResults: '${a.bdd ? "reports/**/*.xml" : "reports/junit.xml"}'`,
    ts ? "      archiveArtifacts artifacts: 'playwright-report/**, test-results/**, reports/**', allowEmptyArchive: true" : "      archiveArtifacts artifacts: 'reports/**, test-results/**', allowEmptyArchive: true",
    has(a, "reporters", "allure") && "      allure includeProperties: false, results: [[path: 'allure-results']]",
    "    }",
    "  }",
    "}",
    ""
  );
}

// src/templates/claude/agents.ts
function claudeAgents(a) {
  const ts = a.lang === "ts";
  const runTools = ts ? "Bash(npx playwright test *), Bash(npx eslint *), Bash(npx tsc --noEmit*)" : "Bash(pytest *), Bash(ruff *), Bash(mypy *)";
  return {
    "qa-test-planner.md": lines(
      "---",
      "name: qa-test-planner",
      "description: Explora una funcionalidad con el navegador y produce un plan de pruebas priorizado por riesgo.",
      "  Úsalo antes de automatizar una historia de usuario nueva.",
      "tools: Read, Glob, Grep, Write, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_click, mcp__playwright__browser_type",
      "model: opus",
      "maxTurns: 40",
      "skills: [synthetic-data]",
      "---",
      "",
      "Eres un QA senior. Con la URL y los criterios de aceptación:",
      "1. Explora la funcionalidad usando SOLO datos sintéticos.",
      "2. Escribe `specs/<feature>.plan.md`: felices, bordes, negativos, accesibilidad, riesgos; prioridad P1/P2/P3;",
      "   indica si cada escenario va a E2E, API o unit.",
      "3. No escribas código de tests. No ejecutes acciones irreversibles.",
      ""
    ),
    "qa-test-generator.md": lines(
      "---",
      "name: qa-test-generator",
      "description: Implementa tests Playwright a partir de un plan en specs/, respetando POM, fixtures y datos sintéticos.",
      `tools: Read, Glob, Grep, Edit, Write, ${runTools}, mcp__playwright__browser_snapshot, mcp__playwright__browser_navigate`,
      "model: sonnet",
      "skills: [page-object, synthetic-data]",
      "---",
      "",
      "1. Lee el plan y CLAUDE.md. Reutiliza page objects, componentes y factories existentes.",
      "2. Verifica cada locator contra el snapshot real antes de escribirlo.",
      "3. Un test por escenario con etiquetas según prioridad.",
      "4. Ejecuta cada test nuevo 3 veces y el lint. Solo entrega en verde.",
      ""
    ),
    "qa-test-healer.md": lines(
      "---",
      "name: qa-test-healer",
      "description: Diagnostica y repara tests que fallan distinguiendo bugs reales de la app de fragilidad del test.",
      `tools: Read, Glob, Grep, Edit, ${runTools}, mcp__playwright__browser_snapshot, mcp__playwright__browser_navigate`,
      "model: sonnet",
      "maxTurns: 30",
      "memory: project",
      "---",
      "",
      "- Si la funcionalidad cambió o está rota: NO adaptes el test, reporta el bug con evidencia.",
      "- Solo reparas: locators obsoletos, esperas incorrectas, datos no únicos.",
      "- Nunca eliminas aserciones, ni agregas skip, force, esperas fijas o más retries.",
      "- Documenta cada reparación: causa, evidencia, cambio aplicado.",
      ""
    ),
    "qa-code-reviewer.md": lines(
      "---",
      "name: qa-code-reviewer",
      "description: Revisa cambios en tests contra el checklist de calidad del equipo. Úsalo antes de abrir un PR.",
      "tools: Read, Grep, Glob, Bash(git diff *)",
      "disallowedTools: Write, Edit",
      "model: sonnet",
      "---",
      "",
      "Reporta hallazgos con archivo:línea y severidad:",
      "- Locators robustos; sin XPath ni CSS posicional.",
      "- Sin esperas fijas, force ni only; web-first assertions.",
      "- Datos propios, sintéticos y con teardown; sin dependencias entre tests.",
      "- Page objects sin aserciones de negocio; ningún secreto ni referencia a .env.",
      ""
    )
  };
}

// src/templates/claude/claude-md.ts
function claudeMd(a) {
  const ts = a.lang === "ts";
  return lines(
    `# ${a.name} — Framework E2E con Playwright (${ts ? "TypeScript" : "Python"})`,
    "",
    "## Comandos",
    ts ? [
      "- Ejecutar un test: `npx playwright test <ruta> --project=" + a.browsers[0] + " --reporter=list`",
      "- Smoke: `npm run test:smoke`",
      a.bdd && "- BDD (Cucumber): `npm run test:bdd`",
      a.lint && "- Lint y tipos: `npm run lint && npm run typecheck`",
      "- Traza de un fallo: `npx playwright show-trace <trace.zip>`"
    ] : [
      "- Ejecutar un test: `pytest <ruta> -x`",
      "- Smoke: `pytest -m smoke`",
      a.bdd && "- BDD (Behave): `python -m behave`",
      a.lint && "- Lint y tipos: `ruff check . && ruff format --check . && mypy .`",
      "- Traza de un fallo: `playwright show-trace <trace.zip>`"
    ],
    "",
    "## Arquitectura (obligatoria)",
    `- Specs → fixtures → page objects/components → ${a.api ? "api clients → " : ""}${a.data ? "data factories → " : ""}config. Ver README.md`,
    ts ? "- Configuración solo vía `src/config/env.ts`; page objects en `src/pages`, componentes en `src/components`." : "- Configuración solo vía `config/env.py`; page objects en `pages/`, componentes en `components/`.",
    "- Page objects: locators en el constructor, métodos de intención, SIN aserciones de negocio.",
    "- Page objects y clientes se inyectan por fixtures; nunca se instancian dentro del test.",
    "- Locators: getByRole > getByLabel > getByTestId (`data-qa`) > texto. Prohibido XPath y CSS posicional.",
    a.bdd && "- BDD: features en `features/`, pasos en `features/steps`; los pasos NO llevan selectores ni lógica: delegan en page objects.",
    "",
    "## Reglas de calidad",
    "- Prohibido `waitForTimeout`/`time.sleep`, `force: true`, `test.only`.",
    "- Web-first assertions siempre. Tests independientes con datos propios y teardown.",
    ts ? "- Antes de terminar: ejecuta el test afectado con `--repeat-each=3` y el lint." : "- Antes de terminar: ejecuta el test afectado 3 veces (`pytest <ruta> --count=3` si tienes pytest-repeat) y el lint.",
    "",
    "## Seguridad y datos (NO negociable)",
    "- NUNCA leas, muestres ni copies archivos `.env*` (excepto `.env.example`) ni `.auth/`.",
    "- NUNCA uses datos reales. Usa la skill `synthetic-data` y las factories del proyecto.",
    "- Correos de prueba: `qa+<uuid>@example.com`. Si una URL o DSN contiene `prod`, detente y pregunta.",
    "",
    "## Al arreglar un test que falla",
    "- Clasifica primero (bug de la app, test frágil, datos, ambiente) con la skill `flaky-triage`.",
    "- Si es bug real de la app: NO cambies el test para que pase; repórtalo.",
    ""
  );
}

// src/templates/claude/hooks-node.ts
function claudeHooksNode(a) {
  const secrets = lines(
    "#!/usr/bin/env node",
    "// PreToolUse: bloquea acceso a .env, .auth y llaves. exit 2 = bloquear (stderr llega a Claude).",
    "import { stdin } from 'node:process';",
    "",
    "let raw = '';",
    "for await (const chunk of stdin) raw += chunk;",
    "const { tool_name: tool, tool_input: input = {} } = JSON.parse(raw);",
    "const targets = [input.file_path, input.path, input.pattern, input.command].filter(Boolean).join(' ');",
    "",
    `const ENV_FILE = /(^|[\\s/'"=])\\.env(?!\\.example)(\\.[\\w-]+)?(\\s|$|['"])/;`,
    "const SECRETS = /(\\.auth\\/|\\.pem\\b|id_rsa|printenv|\\/proc\\/self\\/environ)/;",
    "",
    "if (ENV_FILE.test(targets) || SECRETS.test(targets)) {",
    "  console.error(",
    "    'Bloqueado por política de QA: ' + tool + ' intentó acceder a secretos (.env, .auth, llaves). ' +",
    "      'Consulta .env.example o src/config/env.ts para conocer los nombres de las variables.',",
    "  );",
    "  process.exit(2);",
    "}",
    ""
  );
  const pii = lines(
    "#!/usr/bin/env node",
    "// PreToolUse (Write|Edit): impide escribir datos personales reales en el código de pruebas.",
    "import { stdin } from 'node:process';",
    "",
    "let raw = '';",
    "for await (const chunk of stdin) raw += chunk;",
    "const { tool_input: input = {} } = JSON.parse(raw);",
    "const file = String(input.file_path ?? '').replaceAll('\\\\', '/');",
    "if (!/\\/(src|tests)\\//.test(file)) process.exit(0);",
    "",
    "const text = [input.content, input.new_string].filter(Boolean).join('\\n');",
    "const rules = [",
    "  ['correo no sintético', /[\\w.+-]+@(?!example\\.(com|org|net)\\b)[a-z0-9-]+\\.[a-z.]{2,}/i],",
    "  ['documento de identidad', /\\b(cc|c[eé]dula|documento|dni)\\W{0,3}\\d{6,10}\\b/i],",
    "  ['número de tarjeta', /\\b(?:\\d[ -]?){15,16}\\b/],",
    "  ['teléfono móvil', /\\b3\\d{2}[ -]?\\d{3}[ -]?\\d{4}\\b/],",
    "];",
    "const hit = rules.find(([, re]) => re.test(text));",
    "if (hit) {",
    "  console.error('Posible ' + hit[0] + ' en ' + file + '. Usa la skill synthetic-data y correos qa+<uuid>@example.com.');",
    "  process.exit(2);",
    "}",
    ""
  );
  const lint = lines(
    "#!/usr/bin/env node",
    "// PostToolUse (Edit|Write): ejecuta ESLint sobre el archivo editado y devuelve errores a Claude.",
    "import { stdin } from 'node:process';",
    "import { spawnSync } from 'node:child_process';",
    "",
    "let raw = '';",
    "for await (const chunk of stdin) raw += chunk;",
    "const file = JSON.parse(raw).tool_input?.file_path ?? '';",
    "if (!file.endsWith('.ts')) process.exit(0);",
    "const r = spawnSync('npx', ['eslint', '--max-warnings=0', file], { encoding: 'utf8', shell: process.platform === 'win32' });",
    "if (r.status !== 0) {",
    "  console.error((r.stdout || '') + (r.stderr || ''));",
    "  process.exit(2);",
    "}",
    ""
  );
  const gate = lines(
    "#!/usr/bin/env node",
    "// Stop: no permite terminar la tarea si quedan test.only o esperas fijas.",
    "import fs from 'node:fs';",
    "import path from 'node:path';",
    "",
    "const offenders = [];",
    "const walk = (dir) => {",
    "  if (!fs.existsSync(dir)) return;",
    "  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {",
    "    const p = path.join(dir, e.name);",
    "    if (e.isDirectory()) walk(p);",
    "    else if (p.endsWith('.ts') && /(test|describe)\\.only\\(|waitForTimeout\\(/.test(fs.readFileSync(p, 'utf8'))) offenders.push(p);",
    "  }",
    "};",
    "walk('tests');",
    "if (offenders.length) {",
    "  console.error('Quedan test.only / waitForTimeout en: ' + offenders.join(', ') + '. Elimínalos antes de terminar.');",
    "  process.exit(2);",
    "}",
    ""
  );
  return {
    "block-secrets.mjs": secrets,
    "block-pii.mjs": pii,
    ...a.lint ? { "lint-after-edit.mjs": lint } : {},
    "final-gate.mjs": gate
  };
}

// src/templates/claude/hooks-py.ts
function claudeHooksPy(a) {
  const secrets = lines(
    "#!/usr/bin/env python3",
    '"""PreToolUse: bloquea acceso a .env, .auth y llaves. exit 2 = bloquear (stderr llega a Claude)."""',
    "import json",
    "import re",
    "import sys",
    "",
    "event = json.load(sys.stdin)",
    'ti = event.get("tool_input", {})',
    'targets = " ".join(str(ti.get(k, "")) for k in ("file_path", "path", "pattern", "command"))',
    "",
    `ENV_FILE = re.compile(r"(^|[\\s/'\\"=])\\.env(?!\\.example)(\\.[\\w-]+)?(\\s|$|['\\"])")`,
    'SECRETS = re.compile(r"(\\.auth/|\\.pem\\b|id_rsa|printenv|/proc/self/environ)")',
    "",
    "if ENV_FILE.search(targets) or SECRETS.search(targets):",
    `    print(f"Bloqueado por política de QA: {event.get('tool_name')} intentó acceder a secretos. "`,
    '          "Consulta .env.example o config/env.py.", file=sys.stderr)',
    "    sys.exit(2)",
    "sys.exit(0)",
    ""
  );
  const pii = lines(
    "#!/usr/bin/env python3",
    '"""PreToolUse (Write|Edit): impide escribir datos personales reales en el código de pruebas."""',
    "import json",
    "import re",
    "import sys",
    "",
    'ti = json.load(sys.stdin).get("tool_input", {})',
    'path = str(ti.get("file_path", "")).replace("\\\\", "/")',
    'if not re.search(r"/(tests|pages|components|api|data|db)/", path):',
    "    sys.exit(0)",
    'text = "\\n".join(str(ti.get(k, "")) for k in ("content", "new_string"))',
    "RULES = [",
    '    ("correo no sintético", r"[\\w.+-]+@(?!example\\.(com|org|net)\\b)[a-z0-9-]+\\.[a-z.]{2,}"),',
    '    ("documento de identidad", r"\\b(cc|c[eé]dula|documento|dni)\\W{0,3}\\d{6,10}\\b"),',
    '    ("número de tarjeta", r"\\b(?:\\d[ -]?){15,16}\\b"),',
    '    ("teléfono móvil", r"\\b3\\d{2}[ -]?\\d{3}[ -]?\\d{4}\\b"),',
    "]",
    "for name, pattern in RULES:",
    "    if re.search(pattern, text, re.I):",
    '        print(f"Posible {name} en {path}. Usa la skill synthetic-data y correos qa+<uuid>@example.com.",',
    "              file=sys.stderr)",
    "        sys.exit(2)",
    "sys.exit(0)",
    ""
  );
  const lint = lines(
    "#!/usr/bin/env python3",
    '"""PostToolUse (Edit|Write): Ruff + mypy sobre el archivo editado; los errores vuelven a Claude."""',
    "import json",
    "import subprocess",
    "import sys",
    "",
    'path = json.load(sys.stdin).get("tool_input", {}).get("file_path", "")',
    'if not path.endswith(".py"):',
    "    sys.exit(0)",
    'for cmd in (["ruff", "check", path], ["ruff", "format", "--check", path], ["mypy", path]):',
    "    r = subprocess.run(cmd, capture_output=True, text=True)",
    "    if r.returncode != 0:",
    "        print(r.stdout + r.stderr, file=sys.stderr)",
    "        sys.exit(2)",
    "sys.exit(0)",
    ""
  );
  const gate = lines(
    "#!/usr/bin/env python3",
    '"""Stop: no permite terminar la tarea si quedan esperas fijas o tests enfocados."""',
    "import pathlib",
    "import re",
    "import sys",
    "",
    'BAD = re.compile(r"time\\.sleep\\(|wait_for_timeout\\(|pytest\\.mark\\.only")',
    'offenders = [str(p) for p in pathlib.Path("tests").rglob("*.py") if BAD.search(p.read_text(encoding="utf-8"))]',
    "if offenders:",
    '    print("Quedan esperas fijas en: " + ", ".join(offenders) + ". Elimínalas antes de terminar.", file=sys.stderr)',
    "    sys.exit(2)",
    "sys.exit(0)",
    ""
  );
  return {
    "block-secrets.py": secrets,
    "block-pii.py": pii,
    ...a.lint ? { "lint-after-edit.py": lint } : {},
    "final-gate.py": gate
  };
}

// src/templates/claude/settings.ts
function claudeSettings(a) {
  const ts = a.lang === "ts";
  const run2 = (script) => ts ? `node "\${CLAUDE_PROJECT_DIR}/.claude/hooks/${script}.mjs"` : `python3 "\${CLAUDE_PROJECT_DIR}/.claude/hooks/${script}.py"`;
  const host = (() => {
    try {
      return new URL(a.baseUrl).hostname;
    } catch {
      return "localhost";
    }
  })();
  const settings = {
    permissions: {
      deny: [
        "Read(./.env)",
        "Read(./.env.*)",
        "Read(**/.env)",
        "Read(**/.env.*)",
        "Edit(**/.env)",
        "Edit(**/.env.*)",
        "Read(**/.auth/**)",
        "Read(**/*.pem)",
        "Read(**/secrets/**)",
        "Bash(printenv*)",
        "Bash(env)",
        "Bash(curl *)",
        "Bash(wget *)"
      ],
      allow: [
        "Read(./.env.example)",
        ...ts ? [
          "Bash(npx playwright test *)",
          "Bash(npx playwright show-trace *)",
          "Bash(npm run *)",
          "Bash(npx eslint *)",
          "Bash(npx tsc --noEmit*)"
        ] : ["Bash(pytest *)", "Bash(ruff *)", "Bash(mypy *)", "Bash(playwright show-trace *)"],
        "mcp__playwright__browser_navigate",
        "mcp__playwright__browser_snapshot"
      ],
      ask: ["Bash(git push*)", "Bash(docker *)"]
    },
    sandbox: {
      enabled: false,
      filesystem: {
        denyRead: [
          "./.env",
          "./.env.local",
          ...a.envs.map((e) => `./.env.${e}`),
          "./.auth",
          "~/.ssh",
          "~/.aws"
        ]
      },
      network: {
        allowedDomains: [
          host,
          "localhost",
          ...ts ? ["registry.npmjs.org"] : ["pypi.org", "files.pythonhosted.org"]
        ]
      }
    },
    hooks: {
      PreToolUse: [
        {
          matcher: "Read|Edit|Write|Bash|Grep|Glob",
          hooks: [{ type: "command", command: run2("block-secrets"), timeout: 10 }]
        },
        { matcher: "Write|Edit", hooks: [{ type: "command", command: run2("block-pii"), timeout: 10 }] }
      ],
      ...a.lint ? {
        PostToolUse: [
          {
            matcher: "Edit|Write",
            hooks: [{ type: "command", command: run2("lint-after-edit"), timeout: 120 }]
          }
        ]
      } : {},
      Stop: [{ hooks: [{ type: "command", command: run2("final-gate"), timeout: 30 }] }]
    }
  };
  return JSON.stringify(settings, null, 2) + "\n";
}
function mcpJson() {
  return JSON.stringify(
    {
      mcpServers: {
        playwright: { command: "npx", args: ["-y", "@playwright/mcp@latest", "--headless", "--isolated"] }
      }
    },
    null,
    2
  ) + "\n";
}

// src/templates/claude/skills.ts
function claudeSkills(a) {
  const ts = a.lang === "ts";
  return {
    "synthetic-data/SKILL.md": lines(
      "---",
      "name: synthetic-data",
      "description: Genera datos de prueba sintéticos (usuarios, órdenes, pagos, direcciones) para los tests",
      "  Playwright de este proyecto. Úsala SIEMPRE que un test, fixture o seed necesite datos.",
      'argument-hint: "[entidad]"',
      "---",
      "",
      "# Datos sintéticos",
      "",
      "## Reglas",
      "1. Nunca datos reales: ni de producción, ni de logs, ni de capturas.",
      "2. Correos: `qa+<uuid>@example.com`. Documentos: prefijo `9` + 9 dígitos (rango de pruebas).",
      "3. Tarjetas: SOLO los números de prueba documentados por la pasarela de pagos.",
      "4. Unicidad: UUID o índice de worker en todo identificador (permite paralelismo).",
      "5. Reproducibilidad: semilla fija de Faker solo al depurar, documentada en el test.",
      "",
      "## Dónde",
      ts ? "- Builders en `src/data/<entidad>.factory.ts` con `@faker-js/faker` (patrón: `src/data/user.factory.ts`)." : '- Factories en `data/factories.py` con factory_boy + Faker("es_CO") (patrón: `UserFactory`).',
      "- Exponer los datos con una fixture que haga teardown de lo que cree.",
      "",
      "## Pasos",
      '1. Busca si ya existe una factory para "$ARGUMENTS" y reutilízala.',
      "2. Si no existe, créala siguiendo el patrón existente.",
      "3. Crea/actualiza la fixture que la expone y ejecuta el lint del archivo.",
      ""
    ),
    "page-object/SKILL.md": lines(
      "---",
      "name: page-object",
      "description: Crea o refactoriza Page Objects y Components de Playwright con la arquitectura del proyecto.",
      "  Úsala al automatizar una pantalla nueva o al reemplazar selectores frágiles.",
      'argument-hint: "[url o pantalla]"',
      "---",
      "",
      "1. Abre la pantalla con el MCP de Playwright (browser_navigate + browser_snapshot) y usa roles y nombres reales.",
      "2. Reutiliza componentes existentes (tablas, modales, header) antes de crear nuevos.",
      "3. Locators en el constructor con prioridad getByRole > getByLabel > getByTestId.",
      "4. Métodos de intención, sin aserciones de negocio.",
      ts ? "5. Registra el page object en `src/fixtures/index.ts`." : "5. Registra el page object como fixture en `conftest.py`.",
      "6. Ejecuta lint y un test de humo que lo use.",
      ""
    ),
    "flaky-triage/SKILL.md": lines(
      "---",
      "name: flaky-triage",
      "description: Analiza un test que falla o es intermitente y clasifica la causa (bug de la app, test frágil,",
      "  datos o ambiente) con evidencia. Úsala ante cualquier fallo local o de CI.",
      'argument-hint: "[ruta del test]"',
      "context: fork",
      "agent: qa-test-healer",
      "---",
      "",
      "Test a analizar: $ARGUMENTS",
      "",
      ts ? "1. Reproduce: `npx playwright test $ARGUMENTS --repeat-each=10 --retries=0 --trace=on`." : "1. Reproduce: `pytest $ARGUMENTS -p no:randomly --tracing on` varias veces.",
      "2. Revisa la traza: red, consola y DOM en el paso que falla.",
      "3. Entrega una tabla: Causa | Evidencia | Acción propuesta.",
      "4. Bug de la app → no cambies el test; redacta el reporte. Test frágil → cambio mínimo.",
      "5. Nunca agregues retries, esperas fijas ni `force` como solución.",
      ""
    )
  };
}

// src/templates/bdd.ts
function homeFeature() {
  return lines(
    "# language: es",
    "Característica: Página de inicio",
    "  Como visitante quiero abrir la página de inicio para empezar a usar la aplicación.",
    "",
    "  @smoke",
    "  Escenario: La página de inicio carga",
    "    Cuando abro la página de inicio",
    "    Entonces la página tiene un título",
    "    Y veo el encabezado principal",
    "",
    "  @regression",
    "  Esquema del escenario: La página de inicio se adapta a <dispositivo>",
    "    Dado una pantalla de <ancho> x <alto>",
    "    Cuando abro la página de inicio",
    "    Entonces veo el encabezado principal",
    "",
    "    Ejemplos:",
    "      | dispositivo | ancho | alto |",
    "      | escritorio  | 1440  | 900  |",
    "      | tableta     | 768   | 1024 |",
    "      | celular     | 390   | 844  |",
    ""
  );
}

// src/templates/common.ts
function gitignore() {
  return lines(
    "# Dependencias",
    "node_modules/",
    ".venv/",
    "__pycache__/",
    "*.pyc",
    "",
    "# Resultados y reportes",
    "test-results/",
    "playwright-report/",
    "blob-report/",
    "reports/",
    "allure-results/",
    "allure-report/",
    ".pytest_cache/",
    ".mypy_cache/",
    ".ruff_cache/",
    "",
    "# Secretos (NUNCA versionar)",
    ".env",
    ".env.*",
    "!.env.example",
    ".auth/",
    "",
    "# Claude Code (personal)",
    "CLAUDE.local.md",
    ".claude/settings.local.json",
    ""
  );
}
function envExample(a) {
  return lines(
    "# Copia este archivo a .env (o .env.<ambiente>) y completa los valores.",
    "# NUNCA subas archivos .env al repositorio. En CI usa secrets/variables del pipeline.",
    `# Ambientes disponibles: ${a.envs.join(", ")}  →  TEST_ENV=<ambiente> carga .env.<ambiente>`,
    "",
    `TEST_ENV=${a.envs.includes("qa") ? "qa" : a.envs[0] ?? "qa"}`,
    `BASE_URL=${a.baseUrl}`,
    a.api && ["", "# API", "API_URL=", "API_TOKEN="],
    a.auth && [
      "",
      "# Usuario de pruebas (datos sintéticos, nunca cuentas reales)",
      "TEST_USER_EMAIL=",
      "TEST_USER_PASSWORD="
    ],
    a.db !== "none" && [
      "",
      "# Base de datos de QA (usuario de SOLO LECTURA para verificaciones)",
      `DB_URL=${DB_URLS[a.db]}`
    ],
    a.bdd && [
      "",
      `# BDD (${bddTool(a)}): navegador y modo visible (HEADED=1)`,
      `BROWSER=${installBrowsers(a)[0]}`,
      "HEADED="
    ],
    ""
  );
}
function editorconfig() {
  return lines(
    "root = true",
    "",
    "[*]",
    "charset = utf-8",
    "end_of_line = lf",
    "indent_style = space",
    "indent_size = 2",
    "insert_final_newline = true",
    "trim_trailing_whitespace = true",
    "",
    "[*.py]",
    "indent_size = 4",
    ""
  );
}
function dockerignore() {
  return lines(
    "node_modules",
    ".venv",
    "test-results",
    "playwright-report",
    "blob-report",
    "reports",
    "allure-results",
    "allure-report",
    ".env",
    ".env.*",
    "!.env.example",
    ".auth",
    ".git",
    ""
  );
}
function composeFile(a) {
  const db = {
    postgres: lines(
      "  db:",
      "    image: postgres:16",
      "    environment:",
      "      POSTGRES_USER: qa_user",
      "      POSTGRES_PASSWORD: qa_pass",
      "      POSTGRES_DB: qa_db",
      '    ports: ["5432:5432"]',
      "    healthcheck:",
      '      test: ["CMD-SHELL", "pg_isready -U qa_user -d qa_db"]',
      "      interval: 3s",
      "      retries: 20"
    ),
    mysql: lines(
      "  db:",
      "    image: mysql:8.4",
      "    environment:",
      "      MYSQL_DATABASE: qa_db",
      "      MYSQL_USER: qa_user",
      "      MYSQL_PASSWORD: qa_pass",
      "      MYSQL_ROOT_PASSWORD: root_pass",
      '    ports: ["3306:3306"]',
      "    healthcheck:",
      '      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]',
      "      interval: 3s",
      "      retries: 30"
    ),
    mssql: lines(
      "  db:",
      "    image: mcr.microsoft.com/mssql/server:2022-latest",
      "    environment:",
      '      ACCEPT_EULA: "Y"',
      '      MSSQL_SA_PASSWORD: "Qa_Passw0rd!"',
      '    ports: ["1433:1433"]'
    ),
    mongodb: lines(
      "  db:",
      "    image: mongo:7",
      '    ports: ["27017:27017"]',
      "    healthcheck:",
      `      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping')"]`,
      "      interval: 5s",
      "      retries: 20"
    )
  };
  const dbUrlInCompose = a.db === "none" ? null : DB_URLS[a.db].replace("localhost", "db");
  const dependsOn = a.db === "none" ? null : a.db === "mssql" ? ["    depends_on: [db]"] : ["    depends_on:", "      db:", "        condition: service_healthy"];
  return lines(
    "# docker compose up --build --exit-code-from tests",
    "services:",
    a.db !== "none" && db[a.db],
    "  tests:",
    "    build: .",
    "    ipc: host",
    "    env_file:",
    "      - path: .env",
    "        required: false",
    "    environment:",
    '      CI: "true"',
    `      BASE_URL: \${BASE_URL:-${a.baseUrl}}`,
    dbUrlInCompose && `      DB_URL: ${dbUrlInCompose}`,
    dependsOn,
    "    volumes:",
    a.lang === "ts" ? "      - ./playwright-report:/e2e/playwright-report" : "      - ./reports:/e2e/reports",
    "      - ./test-results:/e2e/test-results",
    has(a, "reporters", "allure") && "      - ./allure-results:/e2e/allure-results",
    ""
  );
}

// src/templates/docs/architecture.ts
function architectureDoc() {
  return lines(
    "# Arquitectura y gobierno del framework",
    "",
    "## Propiedad del código",
    "- Cada carpeta de `tests/` pertenece a un squad (ver `.github/CODEOWNERS`).",
    "- Cambios en fixtures, config, CI o page objects compartidos requieren revisión del equipo de plataforma QA.",
    "",
    "## Convenciones",
    "- Un dominio de negocio por carpeta en `tests/` (p. ej. `tests/checkout`, `tests/admin`).",
    "- Etiquetas: `@smoke` (bloquea PR), `@regression` (post-merge / nightly), `@<dominio>` para filtrar.",
    "- Tests > 60 s se revisan; tests flaky se ponen en cuarentena con ticket, dueño y fecha límite.",
    "",
    "## Métricas objetivo",
    "| Métrica | Objetivo |",
    "|---|---|",
    "| Pass rate en main | > 98 % |",
    "| Flaky rate | < 2 % |",
    "| Duración del pipeline de PR | < 10 min |",
    "| MTTR de tests rotos | < 1 día |",
    "",
    "## Pipeline por etapas",
    "| Etapa | Qué corre |",
    "|---|---|",
    "| Pre-commit | Lint, formato, tipos |",
    "| Pull request | `@smoke` + tests cambiados + API |",
    "| Post-merge | Regresión completa con sharding |",
    "| Nightly | Cross-browser + visual + accesibilidad |",
    ""
  );
}

// src/templates/docs/tree.ts
var isDir = (node) => Object.keys(node).length > 0;
function buildTree(files) {
  const root = {};
  for (const f of [...files].sort()) {
    let node = root;
    for (const part of f.split("/")) node = node[part] ??= {};
  }
  const out = [];
  const walk = (node, prefix) => {
    const keys = Object.keys(node).sort((x, y) => {
      const dx = isDir(node[x]);
      const dy = isDir(node[y]);
      return dx === dy ? x.localeCompare(y) : dx ? -1 : 1;
    });
    keys.forEach((k, i) => {
      const last = i === keys.length - 1;
      const dir = isDir(node[k]);
      out.push(prefix + (last ? "└── " : "├── ") + k + (dir ? "/" : ""));
      if (dir) walk(node[k], prefix + (last ? "    " : "│   "));
    });
  };
  walk(root, "");
  return out.join("\n");
}

// src/templates/docs/readme.ts
function readme(a, fileList) {
  const ts = a.lang === "ts";
  const yes = (b) => b ? a.language === "en" ? "Yes" : "Sí" : "No";
  const dbLabel = DB_OPTIONS.find((d) => d.value === a.db)?.label;
  const ciLabels = a.ci.map((x) => CI_OPTIONS.find((o) => o.value === x)?.label).join(", ") || "Ninguno";
  const tree = buildTree(fileList);
  return lines(
    `# ${a.name}`,
    "",
    `Framework de automatización E2E con **Playwright + ${ts ? "TypeScript" : "Python (pytest)"}**,`,
    `generado con \`create-pw-framework\` v${GENERATOR_VERSION}.`,
    "",
    "## Configuración elegida",
    "",
    "| Opción | Valor |",
    "|---|---|",
    `| Tamaño | ${SIZES.find((s) => s.value === a.size)?.label} |`,
    `| Navegadores | ${a.browsers.join(", ")} |`,
    `| Ambientes | ${a.envs.join(", ")} |`,
    `| Reportes | ${a.reporters.join(", ") || "list"} |`,
    `| API | ${yes(a.api)} |`,
    `| Base de datos | ${dbLabel} |`,
    `| Datos sintéticos | ${yes(a.data)} |`,
    `| Autenticación reutilizable | ${yes(a.auth)} |`,
    `| Extras | ${a.extras.join(", ") || "Ninguno"} |`,
    `| BDD (Gherkin) | ${a.bdd ? bddTool(a) : "No"} |`,
    `| Contenedores | ${DOCKER_OPTIONS.find((d) => d.value === a.docker)?.label} |`,
    `| CI/CD | ${ciLabels}${a.shards > 1 ? ` (${a.shards} shards)` : ""} |`,
    `| Linters / pre-commit | ${yes(a.lint)} / ${yes(a.precommit)} |`,
    `| Claude Code | ${yes(a.claude)} |`,
    "",
    "## Requisitos",
    "",
    ts ? "- Node.js 20 o superior" : "- Python 3.11 o superior",
    a.docker !== "none" && "- Docker (opcional, para ejecutar en contenedor)",
    has(a, "reporters", "allure") && "- Java 8+ para generar el reporte Allure localmente",
    "",
    "## Primeros pasos",
    "",
    "```bash",
    ts ? [
      "npm install",
      `npx playwright install ${installBrowsers(a).join(" ")}`,
      "cp .env.example .env        # completa los valores (nunca subas .env)",
      "npm test"
    ] : [
      "python -m venv .venv",
      "source .venv/bin/activate   # Windows: .venv\\Scripts\\activate",
      "pip install -r requirements.txt",
      `python -m playwright install ${installBrowsers(a).join(" ")}`,
      "cp .env.example .env        # completa los valores (nunca subas .env)",
      "pytest"
    ],
    "```",
    "",
    "## Comandos útiles",
    "",
    "| Acción | Comando |",
    "|---|---|",
    ts ? [
      "| Toda la suite | `npm test` |",
      "| Solo smoke | `npm run test:smoke` |",
      "| Modo UI / depuración | `npm run test:ui` / `npm run test:debug` |",
      "| Tests de archivos cambiados | `npm run test:changed` |",
      "| Detección de flaky (burn-in) | `npm run test:burn-in` |",
      `| Otro ambiente | \`TEST_ENV=${a.envs[a.envs.length - 1]} npm test\` |`,
      has(a, "reporters", "html") && "| Ver reporte HTML | `npm run report` |",
      has(a, "reporters", "allure") && "| Reporte Allure | `npm run allure:generate && npm run allure:open` |",
      has(a, "extras", "visual") && "| Visual (crear/actualizar baseline) | `npm run test:visual:update` |",
      has(a, "extras", "visual") && "| Visual (comparar) | `npm run test:visual` |",
      a.bdd && [
        "| BDD (Cucumber) | `npm run test:bdd` |",
        "| BDD solo smoke | `npm run test:bdd -- --tags @smoke` |",
        "| BDD con navegador visible | `HEADED=1 npm run test:bdd` |"
      ],
      a.lint && "| Lint / formato / tipos | `npm run lint` · `npm run format` · `npm run typecheck` |"
    ] : [
      "| Toda la suite en paralelo | `pytest -n auto` |",
      "| Solo smoke | `pytest -m smoke` |",
      "| Con navegador visible | `pytest --headed --slowmo 300` |",
      "| Depurar | `PWDEBUG=1 pytest <ruta> -s` |",
      "| Reintentos (CI) | `pytest --reruns 2` |",
      `| Otro ambiente | \`TEST_ENV=${a.envs[a.envs.length - 1]} pytest\` |`,
      '| Emular móvil | `pytest --device "iPhone 15"` |',
      has(a, "reporters", "html") && "| Reporte HTML | `reports/report.html` |",
      has(a, "reporters", "allure") && "| Reporte Allure | `allure serve allure-results` |",
      a.bdd && [
        "| BDD (Behave) | `python -m behave` |",
        "| BDD solo smoke | `python -m behave --tags=@smoke` |",
        "| BDD con navegador visible | `HEADED=1 python -m behave` |"
      ],
      a.lint && "| Lint / formato / tipos | `ruff check .` · `ruff format .` · `mypy .` |"
    ],
    has(a, "reporters", "metrics") && "| Métricas de la corrida | `reports/metrics.json` |",
    a.docker !== "none" && (a.docker === "compose" ? "| En contenedores | `docker compose up --build --exit-code-from tests` |" : `| En contenedor | \`docker build -t ${a.name} . && docker run --rm --ipc=host ${a.name}\` |`),
    "",
    "## Arquitectura",
    "",
    "```text",
    "tests (specs) → fixtures → page objects / components" + (a.api ? " → api client" : "") + (a.data ? " → data factories" : "") + (a.db !== "none" ? " → db" : "") + " → config/env",
    "```",
    "",
    "- **Specs** describen el *qué*: intención de negocio y aserciones. Sin selectores ni SQL.",
    "- **Fixtures** gestionan el ciclo de vida (setup/teardown) e inyectan dependencias.",
    "- **Page Objects / Components**: locators + métodos de intención. Sin aserciones de negocio.",
    a.api && "- **API client**: setup rápido de datos y verificaciones sin UI.",
    a.data && "- **Data factories**: datos 100 % sintéticos y únicos por test (paralelismo seguro).",
    a.db !== "none" && "- **DB**: consultas parametrizadas, usuario de solo lectura y guard anti-producción.",
    a.bdd && `- **BDD (${bddTool(a)})**: los \`.feature\` describen el comportamiento en Gherkin; los pasos delegan en los mismos page objects.`,
    a.bdd && !ts && "- Python no tiene Cucumber oficial: los `.feature` se ejecutan con **Behave**.",
    "- **Config**: única lectura de variables de entorno; guard que impide ejecutar contra producción.",
    "",
    "## Estructura",
    "",
    "```text",
    tree,
    "```",
    "",
    "## Buenas prácticas del proyecto",
    "",
    "- Locators: `getByRole` > `getByLabel` > `getByTestId` (`data-qa`) > texto. Nunca XPath ni CSS posicional.",
    "- Nada de esperas fijas (`waitForTimeout` / `time.sleep`) ni `force`.",
    "- Cada test crea y limpia sus propios datos: independiente y paralelizable.",
    "- Un retry que pasa es un test *flaky*: se mide y se corrige, no se ignora.",
    "- Secretos solo por variables de entorno / secrets del CI. `.env` y `.auth/` nunca se versionan.",
    "",
    a.ci.length > 0 && [
      "## CI/CD",
      "",
      `Pipelines generados: ${ciLabels}. Configura en tu herramienta de CI las variables \`BASE_URL\`, \`TEST_ENV\`${a.api ? ", `API_URL`, `API_TOKEN` (secreto)" : ""}${a.auth ? ", `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` (secreto)" : ""}${a.db !== "none" ? ", `DB_URL` (secreto)" : ""}.`,
      a.shards > 1 && `La suite se reparte en **${a.shards} shards**${ts ? " y GitHub Actions une los reportes con `merge-reports`" : " con pytest-split"}.`,
      ts && `La imagen Docker de CI está fijada en \`v${PW_VERSION}\`: actualízala junto con \`@playwright/test\`.`,
      ""
    ],
    a.claude && [
      "## Claude Code",
      "",
      "- `CLAUDE.md`: reglas del proyecto que Claude carga en cada sesión.",
      "- `.claude/settings.json`: bloqueo de `.env`/`.auth`, hooks de secretos, PII, lint y puerta final.",
      "- `.claude/skills/`: `synthetic-data`, `page-object`, `flaky-triage` (invócalas con `/nombre`).",
      "- `.claude/agents/`: planner, generator, healer y reviewer.",
      "- `.mcp.json`: Playwright MCP (requiere Node.js/npx).",
      "- El sandbox viene configurado pero **desactivado** (`sandbox.enabled: false`). Actívalo tras validar",
      "  que los navegadores arrancan dentro de él en tu sistema (macOS, Linux o WSL2).",
      !ts && "- Los hooks usan `python3`; en Windows cámbialo por `python` en `.claude/settings.json`.",
      ""
    ],
    "## Próximos pasos",
    "",
    "1. Completa `.env` y ajusta `LoginPage` a tu aplicación.",
    "2. Reemplaza los tests de ejemplo por los flujos críticos (P1) de tu producto.",
    "3. Acuerda con desarrollo el atributo `data-qa` para elementos sin rol accesible claro.",
    "4. Configura secrets y variables en el CI y ejecuta el primer pipeline.",
    ""
  );
}

// src/templates/py/api-data-db.ts
function pyApiClient() {
  return lines(
    '"""Cliente API delgado para setup de datos y verificaciones sin UI."""',
    "",
    "from __future__ import annotations",
    "",
    "from typing import Any",
    "",
    "from playwright.sync_api import APIRequestContext, APIResponse",
    "",
    "",
    "class ApiClient:",
    "    def __init__(self, ctx: APIRequestContext) -> None:",
    "        self.ctx = ctx",
    "",
    "    def get(self, url: str) -> APIResponse:",
    "        return self.ctx.get(url)",
    "",
    "    def get_json(self, url: str) -> Any:",
    "        response = self.ctx.get(url)",
    '        assert response.ok, f"GET {url} -> {response.status}"',
    "        return response.json()",
    "",
    "    def post_json(self, url: str, data: dict[str, Any]) -> Any:",
    "        response = self.ctx.post(url, data=data)",
    '        assert response.ok, f"POST {url} -> {response.status}"',
    "        return response.json()",
    "",
    "    def delete(self, url: str) -> APIResponse:",
    "        return self.ctx.delete(url)",
    ""
  );
}
function pyFactories() {
  return lines(
    '"""Factories de datos 100 % sintéticos (factory_boy + Faker).',
    "",
    "Para reproducir un fallo: factory.random.reseed_random(<número>) al inicio del test.",
    '"""',
    "",
    "from __future__ import annotations",
    "",
    "import uuid",
    "from dataclasses import dataclass",
    "",
    "import factory",
    "",
    "",
    "@dataclass",
    "class User:",
    "    email: str",
    "    first_name: str",
    "    last_name: str",
    "    document: str",
    "    city: str",
    '    role: str = "buyer"',
    "",
    "",
    "class UserFactory(factory.Factory):  # type: ignore[misc]",
    "    class Meta:",
    "        model = User",
    "",
    '    email = factory.LazyFunction(lambda: f"qa+{uuid.uuid4()}@example.com")',
    '    first_name = factory.Faker("first_name", locale="es_CO")',
    '    last_name = factory.Faker("last_name", locale="es_CO")',
    '    document = factory.Faker("numerify", text="9#########")  # rango reservado para pruebas',
    '    city = factory.Iterator(["Medellín", "Bogotá", "Cali", "Barranquilla"])',
    ""
  );
}
function pyDb(db) {
  const guard = lines(
    "def _guard(url: str) -> None:",
    "    if not url:",
    '        raise RuntimeError("DB_URL no está definida. Revisa .env.example")',
    '    if "prod" in url.lower():',
    '        raise RuntimeError("Guard: DB_URL parece apuntar a producción. Abortando.")'
  );
  const header = (imports) => lines(
    '"""Acceso a la base de datos de QA. Consultas SIEMPRE parametrizadas."""',
    "",
    "from __future__ import annotations",
    "",
    imports,
    "",
    "",
    guard,
    "",
    ""
  );
  const impl = {
    postgres: lines(
      header(lines("from typing import Any, LiteralString", "", "from psycopg_pool import ConnectionPool")),
      "class Db:",
      "    def __init__(self, url: str) -> None:",
      "        _guard(url)",
      "        self.pool = ConnectionPool(url, min_size=1, max_size=4, open=True)",
      "",
      "    def query(self, sql: LiteralString, params: tuple[Any, ...] = ()) -> list[tuple[Any, ...]]:",
      "        with self.pool.connection() as conn:",
      "            return conn.execute(sql, params).fetchall()",
      "",
      "    def close(self) -> None:",
      "        self.pool.close()",
      ""
    ),
    mysql: lines(
      header(
        lines("from typing import Any", "from urllib.parse import unquote, urlparse", "", "import pymysql")
      ),
      "class Db:",
      "    def __init__(self, url: str) -> None:",
      "        _guard(url)",
      "        u = urlparse(url)",
      "        self.conn = pymysql.connect(",
      '            host=u.hostname or "localhost",',
      "            port=u.port or 3306,",
      '            user=unquote(u.username or ""),',
      '            password=unquote(u.password or ""),',
      '            database=u.path.lstrip("/"),',
      "            autocommit=True,",
      "        )",
      "",
      "    def query(self, sql: str, params: tuple[Any, ...] = ()) -> list[tuple[Any, ...]]:",
      "        with self.conn.cursor() as cur:",
      "            cur.execute(sql, params)",
      "            return list(cur.fetchall())",
      "",
      "    def close(self) -> None:",
      "        self.conn.close()",
      ""
    ),
    mssql: lines(
      header(
        lines("from typing import Any", "from urllib.parse import unquote, urlparse", "", "import pymssql")
      ),
      "class Db:",
      "    def __init__(self, url: str) -> None:",
      "        _guard(url)",
      "        u = urlparse(url)",
      "        self.conn = pymssql.connect(",
      '            server=u.hostname or "localhost",',
      "            port=str(u.port or 1433),",
      '            user=unquote(u.username or ""),',
      '            password=unquote(u.password or ""),',
      '            database=u.path.lstrip("/"),',
      "            autocommit=True,",
      "        )",
      "",
      "    def query(self, sql: str, params: tuple[Any, ...] = ()) -> list[tuple[Any, ...]]:",
      "        with self.conn.cursor() as cur:",
      "            cur.execute(sql, params)",
      "            return list(cur.fetchall())",
      "",
      "    def close(self) -> None:",
      "        self.conn.close()",
      ""
    ),
    mongodb: lines(
      header(
        lines(
          "from typing import Any",
          "",
          "from pymongo import MongoClient",
          "from pymongo.collection import Collection"
        )
      ),
      "class Db:",
      "    def __init__(self, url: str) -> None:",
      "        _guard(url)",
      "        self.client: MongoClient[dict[str, Any]] = MongoClient(url)",
      "",
      "    def ping(self) -> dict[str, Any]:",
      '        return dict(self.client.admin.command("ping"))',
      "",
      "    def collection(self, name: str) -> Collection[dict[str, Any]]:",
      "        return self.client.get_default_database()[name]",
      "",
      "    def close(self) -> None:",
      "        self.client.close()",
      ""
    )
  };
  return impl[db];
}

// src/templates/py/bdd.ts
function pyBehaveIni(a) {
  return lines(
    "# Python no tiene Cucumber oficial: los .feature (Gherkin) se ejecutan con Behave → python -m behave",
    "[behave]",
    "paths = features",
    "show_skipped = false",
    has(a, "reporters", "junit") && ["junit = true", "junit_directory = reports/behave"],
    ""
  );
}
function pyBehaveEnvironment() {
  return lines(
    '"""Hooks de Behave: un navegador por ejecución y un contexto nuevo por escenario."""',
    "",
    "from __future__ import annotations",
    "",
    "import re",
    "from pathlib import Path",
    "",
    "from behave.model import Scenario",
    "from behave.runner import Context",
    "from playwright.sync_api import sync_playwright",
    "",
    "from config.env import settings",
    "from pages.home_page import HomePage",
    "",
    'SCREENSHOTS = Path("reports/behave/screenshots")',
    "",
    "",
    "def before_all(context: Context) -> None:",
    "    context.playwright = sync_playwright().start()",
    '    context.playwright.selectors.set_test_id_attribute("data-qa")',
    "    browser_type = getattr(context.playwright, settings.browser)",
    "    context.browser = browser_type.launch(headless=not settings.headed)",
    "",
    "",
    "def before_scenario(context: Context, _scenario: Scenario) -> None:",
    "    # Un contexto nuevo por escenario: escenarios independientes entre sí",
    '    context.browser_context = context.browser.new_context(base_url=settings.base_url, locale="es-CO")',
    "    context.page = context.browser_context.new_page()",
    "    context.home_page = HomePage(context.page)",
    "",
    "",
    "def after_scenario(context: Context, scenario: Scenario) -> None:",
    '    if scenario.status == "failed":',
    "        SCREENSHOTS.mkdir(parents=True, exist_ok=True)",
    '        name = re.sub(r"\\W+", "_", scenario.name)',
    '        context.page.screenshot(path=SCREENSHOTS / f"{name}.png", full_page=True)',
    "    context.browser_context.close()",
    "",
    "",
    "def after_all(context: Context) -> None:",
    "    # Si before_all falló puede no haber nada que cerrar",
    '    if "browser" in context:',
    "        context.browser.close()",
    '    if "playwright" in context:',
    "        context.playwright.stop()",
    ""
  );
}
function pyHomeSteps() {
  return lines(
    '"""Pasos de la página de inicio: describen el comportamiento y delegan en los Page Objects."""',
    "",
    "# Behave no publica tipos: sus decoradores no están tipados",
    "# mypy: disallow-untyped-decorators=False",
    "",
    "from __future__ import annotations",
    "",
    "import re",
    "",
    "from behave import given, then, when",
    "from behave.runner import Context",
    "from playwright.sync_api import expect",
    "",
    "",
    '@given("una pantalla de {width:d} x {height:d}")',
    "def step_set_viewport(context: Context, width: int, height: int) -> None:",
    '    context.page.set_viewport_size({"width": width, "height": height})',
    "",
    "",
    '@when("abro la página de inicio")',
    "def step_open_home(context: Context) -> None:",
    "    context.home_page.goto()",
    "",
    "",
    '@then("la página tiene un título")',
    "def step_page_has_title(context: Context) -> None:",
    '    expect(context.page).to_have_title(re.compile(r".+"))',
    "",
    "",
    '@then("veo el encabezado principal")',
    "def step_see_main_heading(context: Context) -> None:",
    "    expect(context.home_page.main_heading.first).to_be_visible()",
    ""
  );
}

// src/templates/py/config.ts
function pyRequirements(a) {
  return lines(
    "# Instalar: python -m pip install -r requirements.txt",
    `playwright>=1.55`,
    "pytest>=8.3",
    "pytest-playwright>=0.7",
    "pytest-xdist>=3.6        # paralelismo: pytest -n auto",
    "pytest-rerunfailures>=14 # reintentos en CI: --reruns 2",
    "python-dotenv>=1.0",
    a.shards > 1 && "pytest-split>=0.10       # sharding en CI: --splits N --group i",
    has(a, "reporters", "html") && "pytest-html>=4.1",
    has(a, "reporters", "allure") && "allure-pytest>=2.13",
    a.data && ["Faker>=30.0", "factory-boy>=3.3"],
    a.db === "postgres" && ["psycopg[binary]>=3.2", "psycopg-pool>=3.2"],
    a.db === "mysql" && "PyMySQL>=1.1",
    a.db === "mssql" && "pymssql>=2.3",
    a.db === "mongodb" && "pymongo>=4.8",
    has(a, "extras", "a11y") && "axe-playwright-python>=0.1.4",
    a.bdd && "behave>=1.2.6            # BDD: python -m behave",
    a.lint && ["ruff>=0.6", "mypy>=1.11"],
    a.precommit && "pre-commit>=3.8",
    ""
  );
}
function pyProject(a) {
  const addopts = [
    ...installBrowsers(a).map((b) => `--browser=${b}`),
    "--tracing=retain-on-failure",
    "--screenshot=only-on-failure",
    "--video=retain-on-failure",
    has(a, "reporters", "html") && "--html=reports/report.html --self-contained-html",
    has(a, "reporters", "junit") && "--junitxml=reports/junit.xml",
    has(a, "reporters", "allure") && "--alluredir=allure-results"
  ].filter(Boolean).join(" ");
  return lines(
    "[project]",
    `name = "${a.name}"`,
    'version = "0.1.0"',
    'description = "Framework de automatización E2E con Playwright + pytest"',
    'requires-python = ">=3.11"',
    "",
    "[tool.pytest.ini_options]",
    'testpaths = ["tests"]',
    'pythonpath = ["."]',
    `addopts = "${addopts}"`,
    "markers = [",
    '    "smoke: pruebas críticas y rápidas",',
    '    "regression: suite completa",',
    a.api && '    "api: pruebas de API",',
    a.db !== "none" && '    "db: pruebas de base de datos",',
    has(a, "extras", "a11y") && '    "a11y: accesibilidad",',
    "]",
    a.lint && [
      "",
      "[tool.ruff]",
      "line-length = 110",
      'target-version = "py311"',
      'extend-exclude = [".claude"]',
      "",
      "[tool.ruff.lint]",
      "# PT = estilo pytest, B = bugbear, SIM = simplificaciones, UP = sintaxis moderna, I = imports",
      'select = ["E", "F", "I", "B", "UP", "PT", "SIM", "ARG", "RUF"]',
      'ignore = ["RUF001", "RUF002", "RUF003"]  # permite tildes y eñes en textos',
      "",
      "[tool.mypy]",
      'python_version = "3.11"',
      "strict = true",
      "ignore_missing_imports = true",
      'exclude = ["^\\\\.venv/", "^\\\\.claude/"]',
      "",
      "# factory_boy no está tipado por completo: se trata como Any",
      "[[tool.mypy.overrides]]",
      'module = ["factory", "factory.*"]',
      'follow_imports = "skip"'
    ],
    ""
  );
}
function pyEnv(a) {
  return lines(
    '"""Única puerta de entrada a la configuración. El resto del código NO lee os.environ."""',
    "",
    "from __future__ import annotations",
    "",
    "import os",
    "from dataclasses import dataclass",
    "",
    "from dotenv import load_dotenv",
    "",
    'TEST_ENV = os.getenv("TEST_ENV", "qa")',
    'load_dotenv(f".env.{TEST_ENV}", override=False)',
    'load_dotenv(".env", override=False)',
    "",
    "",
    "@dataclass(frozen=True)",
    "class Settings:",
    "    test_env: str",
    "    base_url: str",
    "    api_url: str",
    "    api_token: str",
    "    user_email: str",
    "    user_password: str",
    "    db_url: str",
    a.bdd && ["    browser: str", "    headed: bool"],
    "",
    "",
    "def _load() -> Settings:",
    `    base_url = os.getenv("BASE_URL") or "${a.baseUrl}"`,
    '    if "prod" in base_url.lower() and os.getenv("ALLOW_PROD") != "true":',
    "        raise RuntimeError(",
    '            f"BASE_URL parece de producción ({base_url}). Define ALLOW_PROD=true si es intencional."',
    "        )",
    "    return Settings(",
    "        test_env=TEST_ENV,",
    "        base_url=base_url,",
    '        api_url=os.getenv("API_URL", ""),',
    '        api_token=os.getenv("API_TOKEN", ""),',
    '        user_email=os.getenv("TEST_USER_EMAIL", ""),',
    '        user_password=os.getenv("TEST_USER_PASSWORD", ""),',
    '        db_url=os.getenv("DB_URL", ""),',
    a.bdd && [
      `        browser=os.getenv("BROWSER") or "${installBrowsers(a)[0]}",`,
      '        headed=os.getenv("HEADED") == "1",'
    ],
    "    )",
    "",
    "",
    "settings = _load()",
    ""
  );
}
function pyPrecommit() {
  return lines(
    "# pre-commit install  →  se ejecuta en cada commit",
    "repos:",
    "  - repo: https://github.com/astral-sh/ruff-pre-commit",
    "    rev: v0.6.9",
    "    hooks:",
    "      - id: ruff",
    "        args: [--fix]",
    "      - id: ruff-format",
    "  - repo: https://github.com/pre-commit/mirrors-mypy",
    "    rev: v1.11.2",
    "    hooks:",
    "      - id: mypy",
    "  - repo: https://github.com/pre-commit/pre-commit-hooks",
    "    rev: v4.6.0",
    "    hooks:",
    "      - id: detect-private-key",
    "      - id: check-added-large-files",
    ""
  );
}

// src/templates/py/conftest-pages.ts
function pyConftest(a) {
  const ctxArgs = a.auth ? "browser_context_args: dict[str, Any], base_url: str, auth_state: str | None" : "browser_context_args: dict[str, Any], base_url: str";
  return lines(
    '"""Fixtures globales del framework (pytest-playwright)."""',
    "",
    "from __future__ import annotations",
    "",
    (a.api || a.db !== "none") && "from collections.abc import Generator",
    "from typing import Any",
    "",
    "import pytest",
    `from playwright.sync_api import ${[a.auth && "Browser", "Page", "Playwright"].filter(Boolean).join(", ")}`,
    "",
    a.api && "from api.client import ApiClient",
    "from config.env import settings",
    a.data && "from data.factories import User, UserFactory",
    a.db !== "none" && "from db.client import Db",
    "from pages.home_page import HomePage",
    a.auth && "from pages.login_page import LoginPage",
    "",
    has(a, "reporters", "metrics") && ['pytest_plugins = ["plugins.metrics"]', ""],
    "",
    '@pytest.fixture(scope="session")',
    "def base_url() -> str:",
    '    """Sobrescribe pytest-base-url: la URL sale de config/env.py."""',
    "    return settings.base_url",
    "",
    "",
    '@pytest.fixture(scope="session", autouse=True)',
    "def _configure_test_id(playwright: Playwright) -> None:",
    '    playwright.selectors.set_test_id_attribute("data-qa")',
    "",
    a.auth && [
      "",
      '@pytest.fixture(scope="session")',
      "def auth_state(browser: Browser, base_url: str, tmp_path_factory: pytest.TempPathFactory) -> str | None:",
      '    """Login UNA vez por sesión/worker y reutiliza el storage_state en todos los tests."""',
      "    if not (settings.user_email and settings.user_password):",
      "        return None",
      "    context = browser.new_context(base_url=base_url)",
      "    page = context.new_page()",
      "    LoginPage(page).goto().sign_in(settings.user_email, settings.user_password)",
      '    path = str(tmp_path_factory.mktemp("auth") / "user.json")',
      "    context.storage_state(path=path)",
      "    context.close()",
      "    return path",
      ""
    ],
    "",
    '@pytest.fixture(scope="session")',
    a.auth ? ["def browser_context_args(", `    ${ctxArgs}`, ") -> dict[str, Any]:"] : `def browser_context_args(${ctxArgs}) -> dict[str, Any]:`,
    "    args: dict[str, Any] = {",
    "        **browser_context_args,",
    '        "base_url": base_url,',
    '        "locale": "es-CO",',
    '        "viewport": {"width": 1440, "height": 900},',
    "    }",
    a.auth && ["    if auth_state:", '        args["storage_state"] = auth_state'],
    "    return args",
    "",
    "",
    "@pytest.fixture",
    "def home_page(page: Page) -> HomePage:",
    "    return HomePage(page)",
    a.auth && [
      "",
      "",
      "@pytest.fixture",
      "def login_page(page: Page) -> LoginPage:",
      "    return LoginPage(page)"
    ],
    a.api && [
      "",
      "",
      '@pytest.fixture(scope="session")',
      "def api(playwright: Playwright) -> Generator[ApiClient, None, None]:",
      '    headers = {"Authorization": f"Bearer {settings.api_token}"} if settings.api_token else {}',
      "    ctx = playwright.request.new_context(base_url=settings.api_url, extra_http_headers=headers)",
      "    yield ApiClient(ctx)",
      "    ctx.dispose()"
    ],
    a.db !== "none" && [
      "",
      "",
      '@pytest.fixture(scope="session")',
      "def db() -> Generator[Db, None, None]:",
      '    """Una conexión/pool por worker de xdist (scope session = por proceso)."""',
      "    database = Db(settings.db_url)",
      "    yield database",
      "    database.close()"
    ],
    a.data && [
      "",
      "",
      "@pytest.fixture",
      "def user() -> User:",
      '    """Usuario 100 % sintético. Con API: créalo aquí y bórralo después de un yield."""',
      "    new_user: User = UserFactory()",
      "    return new_user"
    ],
    ""
  );
}
function pyHomePage(a) {
  const withHeader = a.size !== "small";
  return lines(
    '"""Page Object: locators en el constructor + métodos de intención. Sin aserciones de negocio."""',
    "",
    "from __future__ import annotations",
    "",
    "from playwright.sync_api import Locator, Page",
    withHeader && ["", "from components.header import Header"],
    "",
    "",
    "class HomePage:",
    "    def __init__(self, page: Page) -> None:",
    "        self.page = page",
    '        self.main_heading: Locator = page.get_by_role("heading", level=1)',
    withHeader && '        self.header = Header(page.get_by_role("navigation").first)',
    "",
    "    def goto(self) -> HomePage:",
    '        self.page.goto("/")',
    "        return self",
    ""
  );
}
function pyHeader() {
  return lines(
    '"""Componente reutilizable (composición > herencia)."""',
    "",
    "from __future__ import annotations",
    "",
    "import re",
    "",
    "from playwright.sync_api import Locator",
    "",
    "",
    "class Header:",
    "    def __init__(self, root: Locator) -> None:",
    "        self.root = root",
    '        self.links = root.get_by_role("link")',
    "",
    "    def link(self, name: str | re.Pattern[str]) -> Locator:",
    '        return self.root.get_by_role("link", name=name)',
    "",
    "    def navigate_to(self, name: str | re.Pattern[str]) -> None:",
    "        self.link(name).click()",
    ""
  );
}
function pyLoginPage() {
  return lines(
    '"""Ajusta la ruta y los nombres accesibles a tu aplicación."""',
    "",
    "from __future__ import annotations",
    "",
    "import re",
    "",
    "from playwright.sync_api import Page",
    "",
    "",
    "class LoginPage:",
    "    def __init__(self, page: Page) -> None:",
    "        self.page = page",
    '        self.email = page.get_by_label(re.compile(r"correo|email", re.I))',
    '        self.password = page.get_by_label(re.compile(r"contraseña|password", re.I))',
    "        self.submit = page.get_by_role(",
    '            "button", name=re.compile(r"iniciar sesión|ingresar|sign in|log in", re.I)',
    "        )",
    "",
    "    def goto(self) -> LoginPage:",
    '        self.page.goto("/login")',
    "        return self",
    "",
    "    def sign_in(self, email: str, password: str) -> None:",
    "        self.email.fill(email)",
    "        self.password.fill(password)",
    "        self.submit.click()",
    ""
  );
}

// src/templates/py/metrics-plugin.ts
function pyMetricsPlugin() {
  return lines(
    '"""Plugin pytest: exporta métricas de la corrida a reports/metrics.json."""',
    "",
    "from __future__ import annotations",
    "",
    "import json",
    "import os",
    "import time",
    "from pathlib import Path",
    "from typing import Any",
    "",
    "import pytest",
    "",
    "_rows: dict[str, dict[str, Any]] = {}",
    "_start = time.time()",
    "",
    "",
    "def pytest_runtest_logreport(report: pytest.TestReport) -> None:",
    '    if report.when == "call" or (report.when == "setup" and report.outcome != "passed"):',
    "        previous = _rows.get(report.nodeid)",
    "        _rows[report.nodeid] = {",
    '            "nodeid": report.nodeid,',
    '            "outcome": report.outcome,',
    '            "duration": round(report.duration, 3),',
    '            "flaky": bool(previous and previous["outcome"] == "failed" and report.outcome == "passed"),',
    "        }",
    "",
    "",
    "def pytest_sessionfinish(session: pytest.Session, exitstatus: int) -> None:",
    '    if hasattr(session.config, "workerinput"):  # en xdist solo escribe el proceso controlador',
    "        return",
    "    rows = list(_rows.values())",
    "    total = len(rows)",
    '    flaky = sum(1 for r in rows if r["flaky"])',
    "    summary = {",
    '        "exit_status": int(exitstatus),',
    '        "duration_s": round(time.time() - _start, 2),',
    '        "total": total,',
    '        "passed": sum(1 for r in rows if r["outcome"] == "passed"),',
    '        "failed": sum(1 for r in rows if r["outcome"] == "failed"),',
    '        "flaky": flaky,',
    '        "flaky_rate": round(flaky / total, 4) if total else 0,',
    '        "slowest": sorted(rows, key=lambda r: r["duration"], reverse=True)[:10],',
    '        "commit": os.getenv("GITHUB_SHA") or os.getenv("CI_COMMIT_SHA") or os.getenv("GIT_COMMIT") or "local",',
    "    }",
    '    Path("reports").mkdir(exist_ok=True)',
    '    Path("reports/metrics.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")',
    ""
  );
}

// src/templates/py/tests.ts
function pyTestHome(a) {
  return lines(
    "import re",
    "",
    "import pytest",
    "from playwright.sync_api import Page, expect",
    "",
    a.data && "from data.factories import User",
    "from pages.home_page import HomePage",
    "",
    "",
    "@pytest.mark.smoke",
    "def test_carga_la_pagina_principal(page: Page, home_page: HomePage) -> None:",
    "    home_page.goto()",
    "",
    '    expect(page).to_have_title(re.compile(r".+"))',
    "    expect(home_page.main_heading.first).to_be_visible()",
    a.size !== "small" && [
      "",
      "",
      "@pytest.mark.regression",
      "def test_muestra_la_navegacion_principal(home_page: HomePage) -> None:",
      "    home_page.goto()",
      "",
      "    expect(home_page.header.links.first).to_be_visible()"
    ],
    a.data && [
      "",
      "",
      "@pytest.mark.regression",
      "def test_ejemplo_datos_sinteticos(user: User) -> None:",
      "    # El usuario se genera con la factory: nunca datos reales",
      '    assert re.fullmatch(r"qa\\+.+@example\\.com", user.email)'
    ],
    ""
  );
}
function pyTestApi() {
  return lines(
    "import pytest",
    "",
    "from api.client import ApiClient",
    "from config.env import settings",
    "",
    "pytestmark = [",
    "    pytest.mark.api,",
    '    pytest.mark.skipif(not settings.api_url, reason="Define API_URL en .env para las pruebas de API"),',
    "]",
    "",
    "",
    "@pytest.mark.smoke",
    "def test_health_responde_200(api: ApiClient) -> None:",
    '    response = api.get("/health")',
    "",
    "    assert response.status == 200",
    ""
  );
}
function pyTestDb(a) {
  const body = a.db === "mongodb" ? ['    assert db.ping()["ok"] == 1'] : ['    rows = db.query("SELECT 1")', "", "    assert rows[0][0] == 1"];
  return lines(
    "import pytest",
    "",
    "from config.env import settings",
    "from db.client import Db",
    "",
    "pytestmark = [",
    "    pytest.mark.db,",
    '    pytest.mark.skipif(not settings.db_url, reason="Define DB_URL en .env para las pruebas de BD"),',
    "]",
    "",
    "",
    "def test_la_conexion_responde(db: Db) -> None:",
    body,
    ""
  );
}
function pyTestA11y() {
  return lines(
    "import pytest",
    "from axe_playwright_python.sync_playwright import Axe",
    "from playwright.sync_api import Page",
    "",
    "from pages.home_page import HomePage",
    "",
    "",
    "@pytest.mark.a11y",
    "def test_home_sin_violaciones_criticas(page: Page, home_page: HomePage) -> None:",
    "    home_page.goto()",
    "    results = Axe().run(page)",
    "",
    '    critical = [v for v in results.response["violations"] if v.get("impact") == "critical"]',
    "    assert critical == [], results.generate_report()",
    ""
  );
}

// src/templates/ts/api-data-db.ts
function tsApiClient() {
  return lines(
    "import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';",
    "",
    "/** Cliente API delgado: setup rápido de datos y verificaciones sin UI. */",
    "export class ApiClient {",
    "  constructor(private readonly ctx: APIRequestContext) {}",
    "",
    "  raw(): APIRequestContext {",
    "    return this.ctx;",
    "  }",
    "",
    "  async getJson<T>(url: string): Promise<T> {",
    "    const res = await this.ctx.get(url);",
    "    await expect(res, 'GET ' + url).toBeOK();",
    "    return (await res.json()) as T;",
    "  }",
    "",
    "  async postJson<T>(url: string, data: unknown): Promise<T> {",
    "    const res = await this.ctx.post(url, { data });",
    "    await expect(res, 'POST ' + url).toBeOK();",
    "    return (await res.json()) as T;",
    "  }",
    "",
    "  async delete(url: string): Promise<APIResponse> {",
    "    return this.ctx.delete(url);",
    "  }",
    "}",
    ""
  );
}
function tsUserFactory() {
  return lines(
    "import { faker } from '@faker-js/faker';",
    "import { randomUUID } from 'node:crypto';",
    "",
    "export type User = {",
    "  email: string;",
    "  firstName: string;",
    "  lastName: string;",
    "  document: string;",
    "  city: string;",
    "  role: 'admin' | 'buyer';",
    "};",
    "",
    "/**",
    " * Builder de datos 100 % sintéticos. El test solo sobreescribe lo relevante.",
    " * Para reproducir un fallo: faker.seed(<número>) al inicio del test.",
    " */",
    "export const buildUser = (overrides: Partial<User> = {}): User => ({",
    "  email: 'qa+' + randomUUID() + '@example.com',",
    "  firstName: faker.person.firstName(),",
    "  lastName: faker.person.lastName(),",
    "  document: '9' + faker.string.numeric(9), // rango reservado para pruebas",
    "  city: faker.helpers.arrayElement(['Medellín', 'Bogotá', 'Cali', 'Barranquilla']),",
    "  role: 'buyer',",
    "  ...overrides,",
    "});",
    ""
  );
}
function tsDb(db) {
  const guard = lines(
    "function guard(url: string): void {",
    "  if (!url) throw new Error('DB_URL no está definida. Revisa .env.example');",
    "  if (/prod/i.test(url)) throw new Error('Guard: DB_URL parece apuntar a producción. Abortando.');",
    "}"
  );
  const impl = {
    postgres: lines(
      "import { Pool, type QueryResultRow } from 'pg';",
      "",
      guard,
      "",
      "/** Pool PostgreSQL por worker. Consultas SIEMPRE parametrizadas ($1, $2...). */",
      "export class Db {",
      "  private readonly pool: Pool;",
      "",
      "  constructor(url: string) {",
      "    guard(url);",
      "    this.pool = new Pool({ connectionString: url, max: 4 });",
      "  }",
      "",
      "  async query<T extends QueryResultRow>(sql: string, params: unknown[] = []): Promise<T[]> {",
      "    const { rows } = await this.pool.query<T>(sql, params);",
      "    return rows;",
      "  }",
      "",
      "  async close(): Promise<void> {",
      "    await this.pool.end();",
      "  }",
      "}",
      ""
    ),
    mysql: lines(
      "import { createPool, type Pool } from 'mysql2/promise';",
      "",
      guard,
      "",
      "/** Pool MySQL por worker. Consultas SIEMPRE parametrizadas (?). */",
      "export class Db {",
      "  private readonly pool: Pool;",
      "",
      "  constructor(url: string) {",
      "    guard(url);",
      "    this.pool = createPool({ uri: url, connectionLimit: 4 });",
      "  }",
      "",
      "  async query<T>(sql: string, params: unknown[] = []): Promise<T[]> {",
      "    const [rows] = await this.pool.query(sql, params);",
      "    return rows as T[];",
      "  }",
      "",
      "  async close(): Promise<void> {",
      "    await this.pool.end();",
      "  }",
      "}",
      ""
    ),
    mssql: lines(
      "import { ConnectionPool } from 'mssql';",
      "",
      guard,
      "",
      '/** Pool SQL Server por worker. Parámetros con nombre: query("... WHERE id = @id", { id }). */',
      "export class Db {",
      "  private readonly pool: Promise<ConnectionPool>;",
      "",
      "  constructor(url: string) {",
      "    guard(url);",
      "    this.pool = new ConnectionPool(url).connect();",
      "  }",
      "",
      "  async query<T>(text: string, params: Record<string, unknown> = {}): Promise<T[]> {",
      "    const request = (await this.pool).request();",
      "    for (const [key, value] of Object.entries(params)) request.input(key, value);",
      "    const result = await request.query<T>(text);",
      "    return result.recordset;",
      "  }",
      "",
      "  async close(): Promise<void> {",
      "    await (await this.pool).close();",
      "  }",
      "}",
      ""
    ),
    mongodb: lines(
      "import { MongoClient, type Collection, type Document } from 'mongodb';",
      "",
      guard,
      "",
      "/** Cliente MongoDB por worker. */",
      "export class Db {",
      "  private readonly client: MongoClient;",
      "  private readonly connected: Promise<MongoClient>;",
      "",
      "  constructor(url: string) {",
      "    guard(url);",
      "    this.client = new MongoClient(url);",
      "    this.connected = this.client.connect();",
      "  }",
      "",
      "  async collection<T extends Document>(name: string): Promise<Collection<T>> {",
      "    return (await this.connected).db().collection<T>(name);",
      "  }",
      "",
      "  async ping(): Promise<Document> {",
      "    return (await this.connected).db().command({ ping: 1 });",
      "  }",
      "",
      "  async close(): Promise<void> {",
      "    await this.client.close();",
      "  }",
      "}",
      ""
    )
  };
  return impl[db];
}

// src/templates/ts/bdd.ts
function tsCucumberConfig(a) {
  const format = [
    "progress",
    has(a, "reporters", "html") && "html:reports/cucumber-report.html",
    has(a, "reporters", "junit") && "junit:reports/cucumber-junit.xml"
  ].filter(Boolean);
  const config = {
    default: {
      paths: ["features/**/*.feature"],
      requireModule: ["tsx/cjs"],
      require: ["features/support/**/*.ts", "features/steps/**/*.ts"],
      format,
      formatOptions: { snippetInterface: "async-await" }
    }
  };
  return JSON.stringify(config, null, 2) + "\n";
}
function tsBddWorld() {
  return lines(
    "import { World, setWorldConstructor } from '@cucumber/cucumber';",
    "import type { BrowserContext, Page } from '@playwright/test';",
    "import type { HomePage } from '../../src/pages/home.page';",
    "",
    "/** Estado de un escenario. Los hooks crean un contexto, una página y los Page Objects por escenario. */",
    "export class AppWorld extends World {",
    "  context!: BrowserContext;",
    "  page!: Page;",
    "  homePage!: HomePage;",
    "}",
    "",
    "setWorldConstructor(AppWorld);",
    ""
  );
}
function tsBddHooks() {
  return lines(
    "import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber';",
    "import { chromium, firefox, selectors, webkit, type Browser, type BrowserType } from '@playwright/test';",
    "import { env } from '../../src/config/env';",
    "import { HomePage } from '../../src/pages/home.page';",
    "import type { AppWorld } from './world';",
    "",
    "const BROWSERS: Record<string, BrowserType | undefined> = { chromium, firefox, webkit };",
    "",
    "let browser: Browser | undefined;",
    "",
    "setDefaultTimeout(30_000);",
    "",
    "// Un navegador por ejecución",
    "BeforeAll(async function () {",
    "  const browserType = BROWSERS[env.BROWSER];",
    "  if (!browserType) throw new Error(`BROWSER no soportado: ${env.BROWSER}`);",
    "  selectors.setTestIdAttribute('data-qa');",
    "  browser = await browserType.launch({ headless: !env.HEADED });",
    "});",
    "",
    "// Un contexto nuevo por escenario: escenarios independientes entre sí",
    "Before(async function (this: AppWorld) {",
    "  if (!browser) throw new Error('El navegador no se inició');",
    "  this.context = await browser.newContext({ baseURL: env.BASE_URL, locale: 'es-CO' });",
    "  this.page = await this.context.newPage();",
    "  this.homePage = new HomePage(this.page);",
    "});",
    "",
    "After(async function (this: AppWorld, { result }) {",
    "  if (result?.status === Status.FAILED) {",
    "    this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');",
    "  }",
    "  await this.context.close();",
    "});",
    "",
    "AfterAll(async function () {",
    "  await browser?.close();",
    "});",
    ""
  );
}
function tsHomeSteps() {
  return lines(
    "import { Given, Then, When } from '@cucumber/cucumber';",
    "import { expect } from '@playwright/test';",
    "import type { AppWorld } from '../support/world';",
    "",
    "// Los pasos describen el comportamiento y delegan en los Page Objects: sin selectores aquí.",
    "",
    "Given('una pantalla de {int} x {int}', async function (this: AppWorld, width: number, height: number) {",
    "  await this.page.setViewportSize({ width, height });",
    "});",
    "",
    "When('abro la página de inicio', async function (this: AppWorld) {",
    "  await this.homePage.goto();",
    "});",
    "",
    "Then('la página tiene un título', async function (this: AppWorld) {",
    "  await expect(this.page).toHaveTitle(/.+/);",
    "});",
    "",
    "Then('veo el encabezado principal', async function (this: AppWorld) {",
    "  await expect(this.homePage.mainHeading.first()).toBeVisible();",
    "});",
    ""
  );
}

// src/templates/ts/config.ts
function tsPackageJson(a) {
  const scripts = {
    test: "playwright test",
    "test:smoke": "playwright test --grep @smoke",
    "test:headed": `playwright test --headed --project=${a.browsers[0]}`,
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:changed": "playwright test --only-changed=origin/main",
    "test:burn-in": "playwright test --only-changed=origin/main --repeat-each=10 --retries=0"
  };
  if (has(a, "reporters", "html")) scripts.report = "playwright show-report";
  if (has(a, "extras", "visual")) {
    scripts["test:visual"] = "cross-env VISUAL=1 playwright test --project=visual";
    scripts["test:visual:update"] = "cross-env VISUAL=1 playwright test --project=visual --update-snapshots";
  }
  if (has(a, "reporters", "allure")) {
    scripts["allure:generate"] = "allure generate allure-results -o allure-report --clean";
    scripts["allure:open"] = "allure open allure-report";
  }
  if (a.bdd) scripts["test:bdd"] = "cucumber-js";
  if (a.lint) {
    Object.assign(scripts, {
      lint: "eslint .",
      "lint:fix": "eslint . --fix",
      format: 'prettier --write "**/*.{ts,mjs}"',
      "format:check": 'prettier --check "**/*.{ts,mjs}"',
      typecheck: "tsc --noEmit"
    });
  } else scripts.typecheck = "tsc --noEmit";
  if (a.precommit) scripts.prepare = "husky";
  const dev = {
    "@playwright/test": PW_VERSION,
    "@types/node": "^22.10.0",
    dotenv: "^16.4.7",
    typescript: "^5.6.3"
  };
  if (a.lint)
    Object.assign(dev, {
      eslint: "^9.15.0",
      "@eslint/js": "^9.15.0",
      "typescript-eslint": "^8.15.0",
      "eslint-plugin-playwright": "^2.1.0",
      prettier: "^3.4.0"
    });
  if (a.data) dev["@faker-js/faker"] = "^9.2.0";
  if (has(a, "reporters", "allure"))
    Object.assign(dev, { "allure-playwright": "^3.0.6", "allure-commandline": "^2.32.0" });
  if (has(a, "extras", "a11y"))
    Object.assign(dev, { "@axe-core/playwright": "^4.10.1", "playwright-core": PW_VERSION });
  if (has(a, "extras", "visual")) dev["cross-env"] = "^7.0.3";
  if (a.bdd) Object.assign(dev, { "@cucumber/cucumber": "^12.9.0", tsx: "^4.20.0" });
  if (a.precommit) Object.assign(dev, { husky: "^9.1.7", "lint-staged": "^15.2.10" });
  if (a.db === "postgres") Object.assign(dev, { pg: "^8.13.1", "@types/pg": "^8.11.10" });
  if (a.db === "mysql") dev.mysql2 = "^3.11.4";
  if (a.db === "mssql") Object.assign(dev, { mssql: "^11.0.1", "@types/mssql": "^9.1.5" });
  if (a.db === "mongodb") dev.mongodb = "^6.10.0";
  const pkg = {
    name: a.name,
    version: "0.1.0",
    private: true,
    description: "Framework de automatización E2E con Playwright",
    engines: { node: ">=20" },
    scripts,
    devDependencies: Object.fromEntries(Object.entries(dev).sort(([x], [y]) => x.localeCompare(y)))
  };
  if (a.precommit) pkg["lint-staged"] = { "*.ts": ["eslint --fix", "prettier --write"] };
  return JSON.stringify(pkg, null, 2) + "\n";
}
function tsConfigJson(a) {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        lib: ["ES2023", "DOM"],
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        resolveJsonModule: true,
        noEmit: true,
        forceConsistentCasingInFileNames: true,
        types: ["node"]
      },
      include: [
        "*.ts",
        "src/**/*.ts",
        "tests/**/*.ts",
        "reporters/**/*.ts",
        ...a.bdd ? ["features/**/*.ts"] : []
      ]
    },
    null,
    2
  ) + "\n";
}
function tsPlaywrightConfig(a) {
  const deviceMap = {
    chromium: ["'chromium'", "devices['Desktop Chrome']"],
    firefox: ["'firefox'", "devices['Desktop Firefox']"],
    webkit: ["'webkit'", "devices['Desktop Safari']"],
    "mobile-chrome": ["'mobile-chrome'", "devices['Pixel 7']"],
    "mobile-safari": ["'mobile-safari'", "devices['iPhone 15']"]
  };
  const uiProjects = uiBrowsers(a).map((b) => {
    const [name, dev] = deviceMap[b];
    return lines(
      "    {",
      `      name: ${name},`,
      `      use: { ...${dev}${a.auth ? ", storageState: STORAGE_STATE" : ""} },`,
      a.auth && "      dependencies: ['setup'],",
      "      testIgnore: UI_IGNORE,",
      "    },"
    );
  });
  return lines(
    "import { defineConfig, devices, type ReporterDescription } from '@playwright/test';",
    "import { env } from './src/config/env';",
    "",
    "const isCI = !!process.env.CI;",
    a.auth && "export const STORAGE_STATE = '.auth/user.json';",
    "",
    "// Tests de backend (API/BD) corren en su propio proyecto, sin navegador",
    "const BACKEND_TESTS = /.*\\.(api|db)\\.spec\\.ts/;",
    "const VISUAL_TESTS = /.*\\.visual\\.spec\\.ts/;",
    "const UI_IGNORE = [BACKEND_TESTS, VISUAL_TESTS];",
    "",
    "const reporters: ReporterDescription[] = [['list']];",
    has(a, "reporters", "html") && "reporters.push(['html', { open: 'never' }]);",
    has(a, "reporters", "junit") && "reporters.push(['junit', { outputFile: 'reports/junit.xml' }]);",
    has(a, "reporters", "allure") && "reporters.push(['allure-playwright', { resultsDir: 'allure-results' }]);",
    has(a, "reporters", "metrics") && "reporters.push(['./reporters/metrics-reporter.ts']);",
    has(a, "ci", "github") && "if (process.env.GITHUB_ACTIONS) reporters.push(['github']);",
    a.shards > 1 && "if (process.env.PW_BLOB) reporters.push(['blob']); // sharding: luego `npx playwright merge-reports`",
    "",
    "export default defineConfig({",
    "  testDir: './tests',",
    "  fullyParallel: true,",
    "  forbidOnly: isCI,",
    "  retries: isCI ? 2 : 0,",
    `  workers: isCI ? '50%' : undefined,`,
    "  timeout: 30_000,",
    "  expect: { timeout: 7_000 },",
    "  reporter: reporters,",
    "  use: {",
    "    baseURL: env.BASE_URL,",
    "    testIdAttribute: 'data-qa',",
    "    trace: 'retain-on-failure',",
    "    screenshot: 'only-on-failure',",
    "    video: 'retain-on-failure',",
    "    locale: 'es-CO',",
    "  },",
    "  projects: [",
    a.auth && "    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },",
    uiProjects,
    hasBackend(a) && "    { name: 'backend', testMatch: BACKEND_TESTS },",
    has(a, "extras", "visual") && [
      "    // Visual: solo con VISUAL=1 (npm run test:visual) para no fallar por falta de baseline",
      "    ...(process.env.VISUAL === '1'",
      "      ? [{ name: 'visual', testMatch: VISUAL_TESTS, use: { ...devices['Desktop Chrome'] } }]",
      "      : []),"
    ],
    "  ],",
    "});",
    ""
  );
}
function tsEnv(a) {
  return lines(
    "import dotenv from 'dotenv';",
    "",
    "/**",
    " * Única puerta de entrada a la configuración. El resto del código NO lee process.env.",
    " * Carga .env.<TEST_ENV> y luego .env (las variables ya definidas en el entorno tienen prioridad).",
    " */",
    "const TEST_ENV = process.env.TEST_ENV || 'qa';",
    "dotenv.config({ path: [`.env.${TEST_ENV}`, '.env'] });",
    "",
    'const get = (name: string, fallback = ""): string => process.env[name] || fallback;',
    "",
    "export const env = {",
    "  TEST_ENV,",
    `  BASE_URL: get('BASE_URL', '${a.baseUrl}'),`,
    "  API_URL: get('API_URL'),",
    "  API_TOKEN: get('API_TOKEN'),",
    "  USER_EMAIL: get('TEST_USER_EMAIL'),",
    "  USER_PASSWORD: get('TEST_USER_PASSWORD'),",
    "  DB_URL: get('DB_URL'),",
    a.bdd && [`  BROWSER: get('BROWSER', '${installBrowsers(a)[0]}'),`, "  HEADED: get('HEADED') === '1',"],
    "} as const;",
    "",
    "// Guard: evita ejecutar contra producción por error",
    "if (/prod/i.test(env.BASE_URL) && process.env.ALLOW_PROD !== 'true') {",
    "  throw new Error(",
    "    `BASE_URL parece de producción (${env.BASE_URL}). Define ALLOW_PROD=true si es intencional.`,",
    "  );",
    "}",
    ""
  ).replace('(name: string, fallback = ""): string', "(name: string, fallback = ''): string");
}
function tsEslintConfig() {
  return lines(
    "import js from '@eslint/js';",
    "import tseslint from 'typescript-eslint';",
    "import playwright from 'eslint-plugin-playwright';",
    "",
    "export default tseslint.config(",
    "  {",
    "    ignores: ['node_modules', 'playwright-report', 'test-results', 'blob-report', 'reports', 'allure-*'],",
    "  },",
    "  js.configs.recommended,",
    "  ...tseslint.configs.recommended,",
    "  {",
    "    files: ['**/*.ts'],",
    "    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },",
    "    rules: {",
    "      '@typescript-eslint/no-floating-promises': 'error', // detecta await olvidados",
    "      '@typescript-eslint/await-thenable': 'error',",
    "    },",
    "  },",
    "  {",
    "    files: ['tests/**/*.ts'],",
    "    ...playwright.configs['flat/recommended'],",
    "    rules: {",
    "      ...playwright.configs['flat/recommended'].rules,",
    "      'playwright/no-wait-for-timeout': 'error',",
    "      'playwright/no-force-option': 'error',",
    "      'playwright/no-focused-test': 'error',",
    "      'playwright/no-skipped-test': ['warn', { allowConditional: true }],",
    "      'playwright/prefer-web-first-assertions': 'error',",
    "    },",
    "  },",
    "  {",
    "    files: ['**/*.mjs'],",
    "    languageOptions: { globals: { process: 'readonly', console: 'readonly' } },",
    "  },",
    ");",
    ""
  );
}

// src/templates/ts/fixtures-pages.ts
function tsFixtures(a) {
  const testTypes = [
    "  homePage: HomePage;",
    a.auth && "  loginPage: LoginPage;",
    a.api && "  api: ApiClient;",
    a.data && "  user: User;"
  ];
  const workerTypes = a.db !== "none" ? ["type WorkerFixtures = {", "  db: Db;", "};"] : null;
  return lines(
    "import { test as base, expect } from '@playwright/test';",
    "import { HomePage } from '../pages/home.page';",
    a.auth && "import { LoginPage } from '../pages/login.page';",
    a.api && "import { ApiClient } from '../api/api-client';",
    a.data && "import { buildUser, type User } from '../data/user.factory';",
    a.db !== "none" && "import { Db } from '../db/db';",
    hasBackend(a) && "import { env } from '../config/env';",
    "",
    "/** Fixtures de test: se crean bajo demanda y se destruyen al terminar cada test. */",
    "type TestFixtures = {",
    testTypes,
    "};",
    workerTypes && "",
    workerTypes,
    "",
    `export const test = base.extend<TestFixtures${workerTypes ? ", WorkerFixtures" : ""}>({`,
    "  homePage: async ({ page }, use) => {",
    "    await use(new HomePage(page));",
    "  },",
    a.auth && ["  loginPage: async ({ page }, use) => {", "    await use(new LoginPage(page));", "  },"],
    a.api && [
      "  api: async ({ playwright }, use) => {",
      "    const ctx = await playwright.request.newContext({",
      "      baseURL: env.API_URL,",
      "      extraHTTPHeaders: env.API_TOKEN ? { Authorization: 'Bearer ' + env.API_TOKEN } : {},",
      "    });",
      "    await use(new ApiClient(ctx));",
      "    await ctx.dispose();",
      "  },"
    ],
    a.data && [
      "  // eslint-disable-next-line no-empty-pattern",
      "  user: async ({}, use) => {",
      "    // Usuario 100 % sintético. Si tienes API, créalo aquí vía api.post(...) y bórralo después de use().",
      "    await use(buildUser());",
      "  },"
    ],
    a.db !== "none" && [
      "  // Una conexión (pool) por worker, cerrada al terminar el worker",
      "  db: [",
      "    // eslint-disable-next-line no-empty-pattern",
      "    async ({}, use) => {",
      "      const db = new Db(env.DB_URL);",
      "      await use(db);",
      "      await db.close();",
      "    },",
      "    { scope: 'worker' },",
      "  ],"
    ],
    "});",
    "",
    "export { expect };",
    ""
  );
}
function tsHomePage(a) {
  const withHeader = a.size !== "small";
  return lines(
    "import type { Locator, Page } from '@playwright/test';",
    withHeader && "import { HeaderComponent } from '../components/header.component';",
    "",
    "/** Page Object: locators readonly + métodos de intención. Sin aserciones de negocio. */",
    "export class HomePage {",
    "  readonly mainHeading: Locator;",
    withHeader && "  readonly header: HeaderComponent;",
    "",
    "  constructor(private readonly page: Page) {",
    "    this.mainHeading = page.getByRole('heading', { level: 1 });",
    withHeader && "    this.header = new HeaderComponent(page.getByRole('navigation').first());",
    "  }",
    "",
    "  async goto(): Promise<void> {",
    "    await this.page.goto('/');",
    "  }",
    "}",
    ""
  );
}
function tsHeaderComponent() {
  return lines(
    "import type { Locator } from '@playwright/test';",
    "",
    "/** Componente reutilizable: se compone dentro de los Page Objects (composición > herencia). */",
    "export class HeaderComponent {",
    "  readonly links: Locator;",
    "",
    "  constructor(readonly root: Locator) {",
    "    this.links = root.getByRole('link');",
    "  }",
    "",
    "  link(name: string | RegExp): Locator {",
    "    return this.root.getByRole('link', { name });",
    "  }",
    "",
    "  async navigateTo(name: string | RegExp): Promise<void> {",
    "    await this.link(name).click();",
    "  }",
    "}",
    ""
  );
}
function tsLoginPage() {
  return lines(
    "import type { Locator, Page } from '@playwright/test';",
    "",
    "/** Ajusta la ruta y los nombres accesibles a tu aplicación. */",
    "export class LoginPage {",
    "  readonly email: Locator;",
    "  readonly password: Locator;",
    "  readonly submit: Locator;",
    "",
    "  constructor(private readonly page: Page) {",
    "    this.email = page.getByLabel(/correo|email/i);",
    "    this.password = page.getByLabel(/contraseña|password/i);",
    "    this.submit = page.getByRole('button', { name: /iniciar sesión|ingresar|sign in|log in/i });",
    "  }",
    "",
    "  async goto(): Promise<void> {",
    "    await this.page.goto('/login');",
    "  }",
    "",
    "  async signIn(email: string, password: string): Promise<void> {",
    "    await this.email.fill(email);",
    "    await this.password.fill(password);",
    "    await this.submit.click();",
    "  }",
    "}",
    ""
  );
}

// src/templates/ts/metrics-reporter.ts
function tsMetricsReporter() {
  return lines(
    "import fs from 'node:fs';",
    "import type { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';",
    "",
    "type Row = {",
    "  title: string;",
    "  file: string;",
    "  project: string;",
    "  status: string;",
    "  retry: number;",
    "  ms: number;",
    "  flaky: boolean;",
    "};",
    "",
    "/** Exporta métricas de la corrida a reports/metrics.json (envíalas a Grafana, BigQuery, etc.). */",
    "export default class MetricsReporter implements Reporter {",
    "  private rows: Row[] = [];",
    "",
    "  onTestEnd(test: TestCase, result: TestResult): void {",
    "    this.rows.push({",
    "      title: test.titlePath().slice(1).join(' > '),",
    "      file: test.location.file,",
    "      project: test.parent.project()?.name ?? '',",
    "      status: result.status,",
    "      retry: result.retry,",
    "      ms: result.duration,",
    "      flaky: test.outcome() === 'flaky',",
    "    });",
    "  }",
    "",
    "  onEnd(result: FullResult): void {",
    "    // Último intento de cada test (los anteriores fueron reintentos)",
    "    const isLast = (r: Row, i: number, all: Row[]): boolean =>",
    "      all.findLastIndex((x) => x.title === r.title && x.project === r.project) === i;",
    "    const finals = this.rows.filter(isLast);",
    "    const total = finals.length;",
    "    const flaky = finals.filter((r) => r.flaky).length;",
    "    const summary = {",
    "      status: result.status,",
    "      startedAt: result.startTime.toISOString(),",
    "      durationMs: result.duration,",
    "      total,",
    "      passed: finals.filter((r) => r.status === 'passed').length,",
    "      failed: finals.filter((r) => r.status === 'failed' || r.status === 'timedOut').length,",
    "      flaky,",
    "      flakyRate: total ? Number((flaky / total).toFixed(4)) : 0,",
    "      slowest: [...finals].sort((x, y) => y.ms - x.ms).slice(0, 10),",
    "      commit: process.env.GITHUB_SHA ?? process.env.CI_COMMIT_SHA ?? process.env.GIT_COMMIT ?? 'local',",
    "    };",
    "    fs.mkdirSync('reports', { recursive: true });",
    "    fs.writeFileSync('reports/metrics.json', JSON.stringify(summary, null, 2));",
    "  }",
    "",
    "  printsToStdio(): boolean {",
    "    return false;",
    "  }",
    "}",
    ""
  );
}

// src/templates/ts/specs.ts
function tsHomeSpec(a) {
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    "",
    "test.describe('Home', () => {",
    "  test('carga la página principal', { tag: ['@smoke'] }, async ({ homePage, page }) => {",
    "    await homePage.goto();",
    "",
    "    await expect(page).toHaveTitle(/.+/);",
    "    await expect(homePage.mainHeading.first()).toBeVisible();",
    "  });",
    a.size !== "small" && [
      "",
      "  test('muestra la navegación principal', { tag: ['@regression'] }, async ({ homePage }) => {",
      "    await homePage.goto();",
      "",
      "    await expect(homePage.header.links.first()).toBeVisible();",
      "  });"
    ],
    a.data && [
      "",
      "  test('ejemplo de datos sintéticos', { tag: ['@regression'] }, async ({ user }) => {",
      "    // El usuario se genera con la factory: nunca datos reales",
      "    expect(user.email).toMatch(/^qa\\+.+@example\\.com$/);",
      "  });"
    ],
    "});",
    ""
  );
}
function tsAuthSetup() {
  return lines(
    "import fs from 'node:fs';",
    "import path from 'node:path';",
    "import { test as setup, expect } from '@playwright/test';",
    "import { env } from '../../src/config/env';",
    "import { LoginPage } from '../../src/pages/login.page';",
    "import { STORAGE_STATE } from '../../playwright.config';",
    "",
    "setup('autenticar usuario de pruebas', async ({ page }) => {",
    "  fs.mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });",
    "",
    "  // Sin credenciales: estado vacío para que el resto de proyectos pueda arrancar",
    "  if (!env.USER_EMAIL || !env.USER_PASSWORD) {",
    "    fs.writeFileSync(STORAGE_STATE, JSON.stringify({ cookies: [], origins: [] }));",
    "    const description = 'Sin TEST_USER_EMAIL/PASSWORD: storageState vacío';",
    "    setup.info().annotations.push({ type: 'warning', description });",
    "    return;",
    "  }",
    "",
    "  // Recomendado: si tu app lo permite, autentica por API (más rápido) y guarda request.storageState()",
    "  const login = new LoginPage(page);",
    "  await login.goto();",
    "  await login.signIn(env.USER_EMAIL, env.USER_PASSWORD);",
    "  await expect(page).not.toHaveURL(/login/);",
    "  await page.context().storageState({ path: STORAGE_STATE });",
    "});",
    ""
  );
}
function tsApiSpec() {
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    "import { env } from '../../src/config/env';",
    "",
    "test.skip(!env.API_URL, 'Define API_URL en .env para ejecutar las pruebas de API');",
    "",
    "test.describe('API - salud del servicio', () => {",
    "  test('GET /health responde 200', { tag: ['@smoke', '@api'] }, async ({ api }) => {",
    "    const res = await api.raw().get('/health');",
    "",
    "    expect(res.status()).toBe(200);",
    "  });",
    "});",
    ""
  );
}
function tsDbSpec(a) {
  const body = a.db === "mongodb" ? ["    const result = await db.ping();", "", "    expect(result.ok).toBe(1);"] : [
    "    const rows = await db.query<{ ok: number }>('SELECT 1 AS ok');",
    "",
    "    expect(Number(rows[0]?.ok)).toBe(1);"
  ];
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    "import { env } from '../../src/config/env';",
    "",
    "test.skip(!env.DB_URL, 'Define DB_URL en .env para ejecutar las pruebas de base de datos');",
    "",
    "test.describe('Base de datos', () => {",
    "  test('la conexión responde', { tag: ['@db'] }, async ({ db }) => {",
    body,
    "  });",
    "});",
    ""
  );
}
function tsA11ySpec() {
  return lines(
    "import AxeBuilder from '@axe-core/playwright';",
    "import { test, expect } from '../../src/fixtures';",
    "",
    "test.describe('Accesibilidad', () => {",
    "  // WCAG 2.0 A/AA; solo las violaciones críticas bloquean (el resto queda adjunto al reporte)",
    "  test('home sin violaciones críticas', { tag: ['@a11y'] }, async ({ homePage, page }, testInfo) => {",
    "    await homePage.goto();",
    "    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();",
    "",
    "    await testInfo.attach('axe-violations', {",
    "      body: JSON.stringify(results.violations, null, 2),",
    "      contentType: 'application/json',",
    "    });",
    "    const critical = results.violations.filter((v) => v.impact === 'critical');",
    "    expect(critical, 'Violaciones críticas de accesibilidad').toEqual([]);",
    "  });",
    "});",
    ""
  );
}
function tsVisualSpec() {
  return lines(
    "import { test, expect } from '../../src/fixtures';",
    "",
    "// Ejecutar con: npm run test:visual  (primera vez: npm run test:visual:update para crear la baseline)",
    "// Genera y compara baselines SIEMPRE dentro del contenedor oficial para evitar diferencias de fuentes.",
    "test('home - regresión visual', { tag: ['@visual'] }, async ({ homePage, page }) => {",
    "  await homePage.goto();",
    "",
    "  await expect(page).toHaveScreenshot('home.png', {",
    "    fullPage: false,",
    "    animations: 'disabled',",
    "    maxDiffPixelRatio: 0.01,",
    "  });",
    "});",
    ""
  );
}

// src/project/build.ts
var json = (value) => JSON.stringify(value, null, 2) + "\n";
function tsFiles(f, a) {
  f.set("package.json", tsPackageJson(a));
  f.set("tsconfig.json", tsConfigJson(a));
  f.set("playwright.config.ts", tsPlaywrightConfig(a));
  f.set("src/config/env.ts", tsEnv(a));
  f.set("src/fixtures/index.ts", tsFixtures(a));
  f.set("src/pages/home.page.ts", tsHomePage(a));
  if (a.size !== "small") f.set("src/components/header.component.ts", tsHeaderComponent());
  if (a.auth) {
    f.set("src/pages/login.page.ts", tsLoginPage());
    f.set("tests/setup/auth.setup.ts", tsAuthSetup());
  }
  if (a.api) {
    f.set("src/api/api-client.ts", tsApiClient());
    f.set("tests/api/health.api.spec.ts", tsApiSpec());
  }
  if (a.data) f.set("src/data/user.factory.ts", tsUserFactory());
  if (a.db !== "none") {
    f.set("src/db/db.ts", tsDb(a.db));
    f.set("tests/db/connection.db.spec.ts", tsDbSpec(a));
  }
  f.set("tests/e2e/home.spec.ts", tsHomeSpec(a));
  if (has(a, "extras", "a11y")) f.set("tests/e2e/a11y.spec.ts", tsA11ySpec());
  if (has(a, "extras", "visual")) f.set("tests/visual/home.visual.spec.ts", tsVisualSpec());
  if (has(a, "reporters", "metrics")) f.set("reporters/metrics-reporter.ts", tsMetricsReporter());
  if (a.bdd) {
    f.set("cucumber.json", tsCucumberConfig(a));
    f.set("features/home.feature", homeFeature());
    f.set("features/support/world.ts", tsBddWorld());
    f.set("features/support/hooks.ts", tsBddHooks());
    f.set("features/steps/home.steps.ts", tsHomeSteps());
  }
  if (a.lint) {
    f.set("eslint.config.mjs", tsEslintConfig());
    f.set(".prettierrc.json", json({ singleQuote: true, printWidth: 110, trailingComma: "all" }));
    f.set(
      ".prettierignore",
      lines(
        "playwright-report",
        "test-results",
        "blob-report",
        "reports",
        "allure-*",
        ".auth",
        ".claude",
        "package-lock.json",
        ""
      )
    );
  }
  if (a.precommit) f.set(".husky/pre-commit", "npx lint-staged\n");
}
function pyFiles(f, a) {
  f.set("requirements.txt", pyRequirements(a));
  f.set("pyproject.toml", pyProject(a));
  f.set("conftest.py", pyConftest(a));
  f.set("config/__init__.py", "");
  f.set("config/env.py", pyEnv(a));
  f.set("pages/__init__.py", "");
  f.set("pages/home_page.py", pyHomePage(a));
  if (a.size !== "small") {
    f.set("components/__init__.py", "");
    f.set("components/header.py", pyHeader());
  }
  if (a.auth) f.set("pages/login_page.py", pyLoginPage());
  if (a.api) {
    f.set("api/__init__.py", "");
    f.set("api/client.py", pyApiClient());
    f.set("tests/api/test_health.py", pyTestApi());
  }
  if (a.data) {
    f.set("data/__init__.py", "");
    f.set("data/factories.py", pyFactories());
  }
  if (a.db !== "none") {
    f.set("db/__init__.py", "");
    f.set("db/client.py", pyDb(a.db));
    f.set("tests/db/test_connection.py", pyTestDb(a));
  }
  f.set("tests/e2e/test_home.py", pyTestHome(a));
  if (has(a, "extras", "a11y")) f.set("tests/e2e/test_a11y.py", pyTestA11y());
  if (has(a, "reporters", "metrics")) {
    f.set("plugins/__init__.py", "");
    f.set("plugins/metrics.py", pyMetricsPlugin());
  }
  if (a.bdd) {
    f.set("behave.ini", pyBehaveIni(a));
    f.set("features/home.feature", homeFeature());
    f.set("features/environment.py", pyBehaveEnvironment());
    f.set("features/steps/home_steps.py", pyHomeSteps());
  }
  if (a.precommit) f.set(".pre-commit-config.yaml", pyPrecommit());
}
function infraFiles(f, a) {
  if (a.docker !== "none") {
    f.set("Dockerfile", dockerfile(a));
    f.set(".dockerignore", dockerignore());
    if (a.docker === "compose") f.set("docker-compose.yml", composeFile(a));
  }
  if (has(a, "ci", "github")) f.set(".github/workflows/e2e.yml", githubWorkflow(a));
  if (has(a, "ci", "jenkins")) f.set("Jenkinsfile", jenkinsfile(a));
  if (has(a, "ci", "gitlab")) f.set(".gitlab-ci.yml", gitlabCi(a));
  if (has(a, "ci", "azure")) f.set("azure-pipelines.yml", azurePipeline(a));
}
function governanceFiles(f, a) {
  f.set("docs/ARCHITECTURE.md", architectureDoc());
  f.set(
    ".github/CODEOWNERS",
    lines(
      "# Ajusta los equipos a tu organización",
      "*                 @mi-org/qa-platform",
      a.lang === "ts" ? "src/               @mi-org/qa-platform" : "pages/ components/ @mi-org/qa-platform",
      "tests/checkout/   @mi-org/squad-checkout",
      ""
    )
  );
}
function claudeFiles(f, a) {
  f.set("CLAUDE.md", claudeMd(a));
  f.set(".claude/settings.json", claudeSettings(a));
  const hooks = a.lang === "ts" ? claudeHooksNode(a) : claudeHooksPy(a);
  for (const [name, content] of Object.entries(hooks)) f.set(`.claude/hooks/${name}`, content);
  for (const [p, content] of Object.entries(claudeSkills(a))) f.set(`.claude/skills/${p}`, content);
  for (const [p, content] of Object.entries(claudeAgents(a))) f.set(`.claude/agents/${p}`, content);
  f.set(".mcp.json", mcpJson());
}
function answersFile(a) {
  const answers = { ...a };
  delete answers.out;
  return json({ generator: `create-pw-framework@${GENERATOR_VERSION}`, ...answers });
}
function buildProject(a) {
  const f = /* @__PURE__ */ new Map();
  f.set(".gitignore", gitignore());
  f.set(".env.example", envExample(a));
  f.set(".editorconfig", editorconfig());
  if (a.lang === "ts") tsFiles(f, a);
  else pyFiles(f, a);
  infraFiles(f, a);
  if (a.size === "large") governanceFiles(f, a);
  if (a.claude) claudeFiles(f, a);
  f.set("scaffold.answers.json", answersFile(a));
  f.set("README.md", readme(a, [...f.keys(), "README.md"]));
  if (a.language === "en") for (const [k, v] of f) f.set(k, translate(v, "en"));
  return f;
}

// src/project/install.ts
import { spawnSync } from "node:child_process";
import fs2 from "node:fs";
import path2 from "node:path";
import process4 from "node:process";
var isWindows = process4.platform === "win32";
function run(cmd, args, cwd) {
  log(c.dim(`  $ ${cmd} ${args.join(" ")}`));
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: isWindows });
  return r.status === 0;
}
function initGit(outDir) {
  if (fs2.existsSync(path2.join(outDir, ".git"))) return false;
  return spawnSync("git", ["init", "-q"], { cwd: outDir, shell: isWindows }).status === 0;
}
function install(a, outDir) {
  if (a.lang === "ts") {
    if (!run("npm", ["install"], outDir)) return false;
    return run("npx", ["playwright", "install", ...installBrowsers(a)], outDir);
  }
  const sysPy = isWindows ? "python" : "python3";
  if (!run(sysPy, ["-m", "venv", ".venv"], outDir)) return false;
  const vpy = isWindows ? path2.join(".venv", "Scripts", "python.exe") : path2.join(".venv", "bin", "python");
  if (!run(vpy, ["-m", "pip", "install", "-q", "-r", "requirements.txt"], outDir)) return false;
  if (!run(vpy, ["-m", "playwright", "install", ...installBrowsers(a)], outDir)) return false;
  if (a.precommit && a.git) run(vpy, ["-m", "pre_commit", "install"], outDir);
  return true;
}

// src/project/write.ts
import fs3 from "node:fs";
import path3 from "node:path";
var isExecutable = (rel) => rel.startsWith(".claude/hooks/") || rel === ".husky/pre-commit";
function writeProject(outDir, files) {
  for (const [rel, content] of files) {
    const abs = path3.join(outDir, rel);
    fs3.mkdirSync(path3.dirname(abs), { recursive: true });
    fs3.writeFileSync(abs, content, "utf8");
    if (isExecutable(rel)) fs3.chmodSync(abs, 493);
  }
}

// src/cli.ts
var LANGUAGE_OPTIONS = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" }
];
function requireNode18() {
  const [major] = process5.versions.node.split(".").map(Number);
  if (major < 18) {
    log(c.red("Se requiere Node.js 18 o superior."));
    process5.exit(1);
  }
}
async function resolveOutDir(args, a, interactive) {
  const suggested = `./${a.name}`;
  return path4.resolve(args.out ?? (interactive ? await askText("Carpeta de salida", suggested) : suggested));
}
async function confirmGeneration(outDir, interactive) {
  if (!interactive) return true;
  if (!await askConfirm("¿Generar el proyecto con esta configuración?", true)) return false;
  const notEmpty = fs4.existsSync(outDir) && fs4.readdirSync(outDir).length > 0;
  return !notEmpty || askConfirm(`La carpeta ${outDir} no está vacía. ¿Sobrescribir archivos?`, false);
}
function runInstall(a, outDir) {
  log(c.magenta("\n── Instalando ─────────────────────────────────────────────"));
  const installed = install(a, outDir);
  log(
    installed ? c.green("  ✔ Instalación completa") : c.yellow("  ⚠ La instalación falló; revisa los mensajes y ejecútala manualmente.")
  );
  return installed;
}
async function main() {
  const args = parseArgs(process5.argv.slice(2));
  if (args.lang) setLanguage(args.lang);
  if (args.help) return help();
  requireNode18();
  log(
    c.bold(c.green("\n  ▶ create-pw-framework")) + c.dim(`  v${GENERATOR_VERSION} · Playwright ${PW_VERSION}`)
  );
  const interactive = !args.answers && !args.yes;
  if (!args.lang && interactive) {
    log("");
    setLanguage(
      await askSelect(
        "Idioma / Language  (preguntas, código y documentación / questions, code and docs)",
        LANGUAGE_OPTIONS,
        "es"
      )
    );
  }
  log(c.dim("\n  Responde las preguntas; Enter acepta el valor sugerido.\n"));
  const a = await collectAnswers(args);
  setLanguage(a.language);
  const outDir = await resolveOutDir(args, a, interactive);
  printSummary(a);
  log("");
  if (!await confirmGeneration(outDir, interactive)) {
    log(c.yellow("Cancelado."));
    closeReader();
    return;
  }
  const files = buildProject(a);
  writeProject(outDir, files);
  log(c.green(`
  ✔ ${files.size} archivos generados en ${outDir}`));
  if (a.git && initGit(outDir)) log(c.green("  ✔ Repositorio git inicializado"));
  const doInstall = args.install ?? (interactive ? await askConfirm("¿Instalar dependencias y navegadores ahora?", true) : false);
  closeReader();
  const installed = doInstall && runInstall(a, outDir);
  printNextSteps(a, outDir, installed);
}
main().catch((err) => {
  closeReader();
  console.error(c.red(`
✖ ${err instanceof Error ? err.stack ?? err : err}`));
  process5.exit(1);
});
