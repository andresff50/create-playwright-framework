import type { Answers } from '../../answers/types.ts';
import { has, installBrowsers, lines, pyRun, usesPoetry } from '../helpers.ts';
import { pyDevDependencyGroup, pyProjectDependencies } from './deps.ts';

export function pyProject(a: Answers): string {
  const addopts = [
    ...installBrowsers(a).map((b) => `--browser=${b}`),
    '--tracing=retain-on-failure',
    '--screenshot=only-on-failure',
    '--video=retain-on-failure',
    has(a, 'reporters', 'html') && '--html=reports/report.html --self-contained-html',
    has(a, 'reporters', 'junit') && '--junitxml=reports/junit.xml',
    has(a, 'reporters', 'allure') && '--alluredir=allure-results',
  ]
    .filter(Boolean)
    .join(' ');
  return lines(
    '[project]',
    `name = "${a.name}"`,
    'version = "0.1.0"',
    'description = "Framework de automatización E2E con Playwright + pytest"',
    // Poetry resuelve para todo el rango: sin límite superior choca con paquetes que declaran <4.0
    usesPoetry(a) ? 'requires-python = ">=3.11,<4.0"' : 'requires-python = ">=3.11"',
    usesPoetry(a) && [
      pyProjectDependencies(a),
      pyDevDependencyGroup(a),
      '',
      '[tool.poetry]',
      '# Proyecto de pruebas, no una librería: Poetry solo gestiona dependencias',
      'package-mode = false',
      '',
      '[build-system]',
      'requires = ["poetry-core>=2.0"]',
      'build-backend = "poetry.core.masonry.api"',
    ],
    '',
    '[tool.pytest.ini_options]',
    'testpaths = ["tests"]',
    'pythonpath = ["."]',
    `addopts = "${addopts}"`,
    'markers = [',
    '    "smoke: pruebas críticas y rápidas",',
    '    "regression: suite completa",',
    a.api && '    "api: pruebas de API",',
    a.db !== 'none' && '    "db: pruebas de base de datos",',
    has(a, 'extras', 'a11y') && '    "a11y: accesibilidad",',
    ']',
    a.lint && [
      '',
      '[tool.ruff]',
      'line-length = 110',
      'target-version = "py311"',
      'extend-exclude = [".claude"]',
      '',
      '[tool.ruff.lint]',
      '# PT = estilo pytest, B = bugbear, SIM = simplificaciones, UP = sintaxis moderna, I = imports',
      'select = ["E", "F", "I", "B", "UP", "PT", "SIM", "ARG", "RUF"]',
      'ignore = ["RUF001", "RUF002", "RUF003"]  # permite tildes y eñes en textos',
      '',
      '[tool.mypy]',
      'python_version = "3.11"',
      'strict = true',
      'ignore_missing_imports = true',
      'exclude = ["^\\\\.venv/", "^\\\\.claude/"]',
      '',
      '# factory_boy no está tipado por completo: se trata como Any',
      '[[tool.mypy.overrides]]',
      'module = ["factory", "factory.*"]',
      'follow_imports = "skip"',
    ],
    '',
  );
}

export function pyEnv(a: Answers): string {
  return lines(
    '"""Única puerta de entrada a la configuración. El resto del código NO lee os.environ."""',
    '',
    'from __future__ import annotations',
    '',
    'import os',
    'from dataclasses import dataclass',
    '',
    'from dotenv import load_dotenv',
    '',
    'TEST_ENV = os.getenv("TEST_ENV", "qa")',
    'load_dotenv(f".env.{TEST_ENV}", override=False)',
    'load_dotenv(".env", override=False)',
    '',
    '',
    '@dataclass(frozen=True)',
    'class Settings:',
    '    test_env: str',
    '    base_url: str',
    '    api_url: str',
    '    api_token: str',
    '    user_email: str',
    '    user_password: str',
    '    db_url: str',
    a.bdd && ['    browser: str', '    headed: bool'],
    '',
    '',
    'def _load() -> Settings:',
    `    base_url = os.getenv("BASE_URL") or "${a.baseUrl}"`,
    '    if "prod" in base_url.lower() and os.getenv("ALLOW_PROD") != "true":',
    '        raise RuntimeError(',
    '            f"BASE_URL parece de producción ({base_url}). Define ALLOW_PROD=true si es intencional."',
    '        )',
    '    return Settings(',
    '        test_env=TEST_ENV,',
    '        base_url=base_url,',
    '        api_url=os.getenv("API_URL", ""),',
    '        api_token=os.getenv("API_TOKEN", ""),',
    '        user_email=os.getenv("TEST_USER_EMAIL", ""),',
    '        user_password=os.getenv("TEST_USER_PASSWORD", ""),',
    '        db_url=os.getenv("DB_URL", ""),',
    a.bdd && [
      `        browser=os.getenv("BROWSER") or "${installBrowsers(a)[0]}",`,
      '        headed=os.getenv("HEADED") == "1",',
    ],
    '    )',
    '',
    '',
    'settings = _load()',
    '',
  );
}

/** Configuración local de Poetry: el entorno virtual vive en ./.venv, igual que con pip. */
export function poetryToml(): string {
  return lines('[virtualenvs]', 'in-project = true', '');
}

export function pyPrecommit(a: Answers): string {
  return lines(
    `# ${pyRun(a, 'pre-commit install')}  →  se ejecuta en cada commit`,
    'repos:',
    '  - repo: https://github.com/astral-sh/ruff-pre-commit',
    '    rev: v0.6.9',
    '    hooks:',
    '      - id: ruff',
    '        args: [--fix]',
    '      - id: ruff-format',
    '  - repo: https://github.com/pre-commit/mirrors-mypy',
    '    rev: v1.11.2',
    '    hooks:',
    '      - id: mypy',
    '  - repo: https://github.com/pre-commit/pre-commit-hooks',
    '    rev: v4.6.0',
    '    hooks:',
    '      - id: detect-private-key',
    '      - id: check-added-large-files',
    '',
  );
}
