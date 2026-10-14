import type { Answers } from '../../answers/types.ts';
import { lines, installBrowsers, usesPoetry } from '../helpers.ts';
import { POETRY_VERSION, PW_VERSION } from '../../version.ts';

export function dockerfile(a: Answers): string {
  if (a.lang === 'ts') {
    return lines(
      '# La versión de la imagen DEBE coincidir con @playwright/test en package.json',
      `ARG PW_VERSION=${PW_VERSION}`,
      'FROM mcr.microsoft.com/playwright:v${PW_VERSION}-noble',
      'WORKDIR /e2e',
      'ENV CI=true',
      'COPY package*.json ./',
      'RUN npm ci',
      'COPY . .',
      'CMD ["npx", "playwright", "test"]',
      '',
    );
  }
  const browsers = installBrowsers(a).join(' ');
  if (usesPoetry(a)) {
    return lines(
      'FROM python:3.12-slim',
      'WORKDIR /e2e',
      'ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 CI=true',
      '# El entorno virtual queda en /e2e/.venv y va primero en el PATH: pytest se ejecuta sin "poetry run"',
      'ENV POETRY_VIRTUALENVS_IN_PROJECT=true PATH="/e2e/.venv/bin:$PATH"',
      '# Las dependencias se instalan antes de copiar el código: la capa se reutiliza entre builds',
      'COPY pyproject.toml poetry.lock* ./',
      `RUN pip install --no-cache-dir poetry==${POETRY_VERSION} && poetry install --no-interaction --no-ansi`,
      `RUN python -m playwright install --with-deps ${browsers}`,
      'COPY . .',
      'CMD ["pytest", "-n", "auto"]',
      '',
    );
  }
  return lines(
    'FROM python:3.12-slim',
    'WORKDIR /e2e',
    'ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 CI=true',
    'COPY requirements.txt .',
    `RUN pip install --no-cache-dir -r requirements.txt && python -m playwright install --with-deps ${browsers}`,
    'COPY . .',
    'CMD ["pytest", "-n", "auto"]',
    '',
  );
}
