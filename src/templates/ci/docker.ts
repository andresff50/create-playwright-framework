import type { Answers } from '../../answers/types.ts';
import { lines, installBrowsers } from '../helpers.ts';
import { PW_VERSION } from '../../version.ts';

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
  return lines(
    'FROM python:3.12-slim',
    'WORKDIR /e2e',
    'ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 CI=true',
    'COPY requirements.txt .',
    `RUN pip install --no-cache-dir -r requirements.txt && python -m playwright install --with-deps ${installBrowsers(a).join(' ')}`,
    'COPY . .',
    'CMD ["pytest", "-n", "auto"]',
    '',
  );
}
