import type { Answers } from '../../answers/types.ts';
import { lines, has, installBrowsers } from '../helpers.ts';
import { PW_VERSION } from '../../version.ts';

export function gitlabCi(a: Answers): string {
  const ts = a.lang === 'ts';
  const n = a.shards;
  return lines(
    ts ? `image: mcr.microsoft.com/playwright:v${PW_VERSION}-noble` : 'image: python:3.12',
    '',
    'stages: [quality, test]',
    '',
    'variables:',
    '  CI: "true"',
    '  TEST_ENV: qa',
    ts ? '  npm_config_cache: "$CI_PROJECT_DIR/.npm"' : '  PIP_CACHE_DIR: "$CI_PROJECT_DIR/.pip"',
    '  # BASE_URL, API_TOKEN, DB_URL...: defínelas en Settings → CI/CD → Variables (masked)',
    '',
    'cache:',
    '  key:',
    `    files: [${ts ? 'package-lock.json' : 'requirements.txt'}]`,
    `  paths: [${ts ? '.npm/' : '.pip/'}]`,
    '',
    ts
      ? ['.install: &install', '  - npm ci']
      : [
          '.install: &install',
          '  - pip install -r requirements.txt',
          `  - python -m playwright install --with-deps ${installBrowsers(a).join(' ')}`,
        ],
    '',
    a.lint && [
      'lint:',
      '  stage: quality',
      '  script:',
      ts
        ? ['    - npm ci', '    - npm run lint', '    - npm run typecheck']
        : [
            '    - pip install -r requirements.txt',
            '    - ruff check .',
            '    - ruff format --check .',
            '    - mypy .',
          ],
      '',
    ],
    'e2e:',
    '  stage: test',
    n > 1 && `  parallel: ${n}`,
    '  script:',
    '    - *install',
    ts
      ? n > 1
        ? '    - npx playwright test --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL'
        : '    - npx playwright test'
      : n > 1
        ? '    - pytest -n auto --reruns 2 --splits $CI_NODE_TOTAL --group $CI_NODE_INDEX'
        : '    - pytest -n auto --reruns 2',
    '  artifacts:',
    '    when: always',
    '    expire_in: 2 weeks',
    '    paths:',
    ts && '      - playwright-report/',
    '      - test-results/',
    '      - reports/',
    has(a, 'reporters', 'allure') && '      - allure-results/',
    '    reports:',
    '      junit: reports/junit.xml',
    a.bdd && [
      '',
      'bdd:',
      '  stage: test',
      '  script:',
      '    - *install',
      ts ? '    - npm run test:bdd' : '    - python -m behave',
      '  artifacts:',
      '    when: always',
      '    expire_in: 2 weeks',
      '    paths:',
      '      - reports/',
      '    reports:',
      ts ? '      junit: reports/cucumber-junit.xml' : '      junit: reports/behave/*.xml',
    ],
    '',
  );
}
