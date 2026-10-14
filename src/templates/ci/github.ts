import type { Answers } from '../../answers/types.ts';
import { lines, has, installBrowsers, pyInstallCommands, pyQualityCommands, pyRun } from '../helpers.ts';
import { PW_VERSION } from '../../version.ts';

export const envSecretsGh = (a: Answers): string =>
  lines(
    "      TEST_ENV: ${{ vars.TEST_ENV || 'qa' }}",
    '      BASE_URL: ${{ vars.BASE_URL }}',
    a.api && ['      API_URL: ${{ vars.API_URL }}', '      API_TOKEN: ${{ secrets.API_TOKEN }}'],
    a.auth && [
      '      TEST_USER_EMAIL: ${{ vars.TEST_USER_EMAIL }}',
      '      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}',
    ],
    a.db !== 'none' && '      DB_URL: ${{ secrets.DB_URL }}',
  );

/** Pasos que preparan Python e instalan las dependencias (pip o Poetry). */
const pySetupSteps = (a: Answers): string[] => [
  '      - uses: actions/setup-python@v5',
  "        with: { python-version: '3.12', cache: pip }",
  ...pyInstallCommands(a).map((command) => `      - run: ${command}`),
];

const bddJobTs = (a: Answers) =>
  a.bdd && [
    '',
    '  bdd:',
    a.lint && '    needs: [quality]',
    '    runs-on: ubuntu-latest',
    '    timeout-minutes: 30',
    '    container:',
    `      image: mcr.microsoft.com/playwright:v${PW_VERSION}-noble`,
    '      options: --ipc=host',
    '    env:',
    '      CI: true',
    '      HOME: /root',
    envSecretsGh(a),
    '    steps:',
    '      - uses: actions/checkout@v4',
    '      - run: npm ci',
    '      - run: npm run test:bdd',
    '      - uses: actions/upload-artifact@v4',
    '        if: ${{ !cancelled() }}',
    '        with: { name: bdd-results, path: reports/, retention-days: 14 }',
  ];

const bddJobPy = (a: Answers) =>
  a.bdd && [
    '',
    '  bdd:',
    a.lint && '    needs: [quality]',
    '    runs-on: ubuntu-latest',
    '    timeout-minutes: 30',
    '    env:',
    '      CI: true',
    envSecretsGh(a),
    '    steps:',
    '      - uses: actions/checkout@v4',
    pySetupSteps(a),
    `      - run: ${pyRun(a, 'python -m playwright install')} --with-deps ${installBrowsers(a)[0]}`,
    `      - run: ${pyRun(a, 'python -m behave')}`,
    '      - uses: actions/upload-artifact@v4',
    '        if: ${{ !cancelled() }}',
    '        with: { name: bdd-results, path: reports/, retention-days: 14 }',
  ];

export function githubWorkflow(a: Answers): string {
  const n = a.shards;
  const pytest = pyRun(a, 'pytest -n auto --reruns 2');
  const shardMatrix =
    n > 1
      ? [
          '    strategy:',
          '      fail-fast: false',
          '      matrix:',
          `        shard: [${Array.from({ length: n }, (_, i) => i + 1).join(', ')}]`,
        ]
      : null;
  const head = lines(
    `name: e2e`,
    'on:',
    '  push:',
    '    branches: [main]',
    '  pull_request:',
    '  workflow_dispatch:',
    '  schedule:',
    "    - cron: '0 11 * * 1-5' # 06:00 hora Colombia, regresión diaria",
    'concurrency:',
    '  group: e2e-${{ github.ref }}',
    '  cancel-in-progress: true',
    'jobs:',
  );
  if (a.lang === 'ts') {
    return lines(
      head,
      a.lint && [
        '  quality:',
        '    runs-on: ubuntu-latest',
        '    steps:',
        '      - uses: actions/checkout@v4',
        '      - uses: actions/setup-node@v4',
        '        with: { node-version: 22, cache: npm }',
        '      - run: npm ci',
        '      - run: npm run lint',
        '      - run: npm run typecheck',
        '      - run: npm run format:check',
        '',
      ],
      '  test:',
      a.lint && '    needs: [quality]',
      '    runs-on: ubuntu-latest',
      '    timeout-minutes: 60',
      '    container:',
      `      image: mcr.microsoft.com/playwright:v${PW_VERSION}-noble`,
      '      options: --ipc=host',
      shardMatrix,
      '    env:',
      '      CI: true',
      '      HOME: /root',
      n > 1 && '      PW_BLOB: 1',
      envSecretsGh(a),
      '    steps:',
      '      - uses: actions/checkout@v4',
      '      - run: npm ci',
      n > 1
        ? '      - run: npx playwright test --shard=${{ matrix.shard }}/${{ strategy.job-total }}'
        : '      - run: npx playwright test',
      '      - uses: actions/upload-artifact@v4',
      '        if: ${{ !cancelled() }}',
      '        with:',
      n > 1 ? '          name: results-${{ matrix.shard }}' : '          name: results',
      '          path: |',
      n > 1 ? '            blob-report/' : '            playwright-report/',
      '            reports/',
      '            test-results/',
      has(a, 'reporters', 'allure') && '            allure-results/',
      '          retention-days: 14',
      n > 1 && [
        '',
        '  merge-reports:',
        '    if: ${{ !cancelled() }}',
        '    needs: [test]',
        '    runs-on: ubuntu-latest',
        '    steps:',
        '      - uses: actions/checkout@v4',
        '      - uses: actions/setup-node@v4',
        '        with: { node-version: 22, cache: npm }',
        '      - run: npm ci',
        '      - uses: actions/download-artifact@v4',
        '        with: { pattern: results-*, path: all-results }',
        '      - run: mkdir -p all-blob && cp all-results/*/blob-report/*.zip all-blob/',
        '      - run: npx playwright merge-reports --reporter html ./all-blob',
        '      - uses: actions/upload-artifact@v4',
        '        with: { name: html-report, path: playwright-report, retention-days: 14 }',
      ],
      bddJobTs(a),
      '',
    );
  }
  return lines(
    head,
    a.lint && [
      '  quality:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v4',
      pySetupSteps(a),
      pyQualityCommands(a).map((command) => `      - run: ${command}`),
      '',
    ],
    '  test:',
    a.lint && '    needs: [quality]',
    '    runs-on: ubuntu-latest',
    '    timeout-minutes: 60',
    n > 1 && [
      '    strategy:',
      '      fail-fast: false',
      '      matrix:',
      `        group: [${Array.from({ length: n }, (_, i) => i + 1).join(', ')}]`,
    ],
    '    env:',
    '      CI: true',
    envSecretsGh(a),
    '    steps:',
    '      - uses: actions/checkout@v4',
    pySetupSteps(a),
    `      - run: ${pyRun(a, 'python -m playwright install')} --with-deps ${installBrowsers(a).join(' ')}`,
    n > 1 ? `      - run: ${pytest} --splits ${n} --group \${{ matrix.group }}` : `      - run: ${pytest}`,
    '      - uses: actions/upload-artifact@v4',
    '        if: ${{ !cancelled() }}',
    '        with:',
    n > 1 ? '          name: results-${{ matrix.group }}' : '          name: results',
    '          path: |',
    '            reports/',
    '            test-results/',
    has(a, 'reporters', 'allure') && '            allure-results/',
    '          retention-days: 14',
    bddJobPy(a),
    '',
  );
}
