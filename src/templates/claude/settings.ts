import type { Answers } from '../../answers/types.ts';

export function claudeSettings(a: Answers): string {
  const ts = a.lang === 'ts';
  const run = (script: string) =>
    ts
      ? `node "\${CLAUDE_PROJECT_DIR}/.claude/hooks/${script}.mjs"`
      : `python3 "\${CLAUDE_PROJECT_DIR}/.claude/hooks/${script}.py"`;
  const host = (() => {
    try {
      return new URL(a.baseUrl).hostname;
    } catch {
      return 'localhost';
    }
  })();
  const settings = {
    permissions: {
      deny: [
        'Read(./.env)',
        'Read(./.env.*)',
        'Read(**/.env)',
        'Read(**/.env.*)',
        'Edit(**/.env)',
        'Edit(**/.env.*)',
        'Read(**/.auth/**)',
        'Read(**/*.pem)',
        'Read(**/secrets/**)',
        'Bash(printenv*)',
        'Bash(env)',
        'Bash(curl *)',
        'Bash(wget *)',
      ],
      allow: [
        'Read(./.env.example)',
        ...(ts
          ? [
              'Bash(npx playwright test *)',
              'Bash(npx playwright show-trace *)',
              'Bash(npm run *)',
              'Bash(npx eslint *)',
              'Bash(npx tsc --noEmit*)',
            ]
          : ['Bash(pytest *)', 'Bash(ruff *)', 'Bash(mypy *)', 'Bash(playwright show-trace *)']),
        'mcp__playwright__browser_navigate',
        'mcp__playwright__browser_snapshot',
      ],
      ask: ['Bash(git push*)', 'Bash(docker *)'],
    },
    sandbox: {
      enabled: false,
      filesystem: {
        denyRead: [
          './.env',
          './.env.local',
          ...a.envs.map((e) => `./.env.${e}`),
          './.auth',
          '~/.ssh',
          '~/.aws',
        ],
      },
      network: {
        allowedDomains: [
          host,
          'localhost',
          ...(ts ? ['registry.npmjs.org'] : ['pypi.org', 'files.pythonhosted.org']),
        ],
      },
    },
    hooks: {
      PreToolUse: [
        {
          matcher: 'Read|Edit|Write|Bash|Grep|Glob',
          hooks: [{ type: 'command', command: run('block-secrets'), timeout: 10 }],
        },
        { matcher: 'Write|Edit', hooks: [{ type: 'command', command: run('block-pii'), timeout: 10 }] },
      ],
      ...(a.lint
        ? {
            PostToolUse: [
              {
                matcher: 'Edit|Write',
                hooks: [{ type: 'command', command: run('lint-after-edit'), timeout: 120 }],
              },
            ],
          }
        : {}),
      Stop: [{ hooks: [{ type: 'command', command: run('final-gate'), timeout: 30 }] }],
    },
  };
  return JSON.stringify(settings, null, 2) + '\n';
}

export function mcpJson(): string {
  return (
    JSON.stringify(
      {
        mcpServers: {
          playwright: { command: 'npx', args: ['-y', '@playwright/mcp@latest', '--headless', '--isolated'] },
        },
      },
      null,
      2,
    ) + '\n'
  );
}
