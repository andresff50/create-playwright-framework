import fs from 'node:fs';
import path from 'node:path';
import type { ProjectFiles } from './build.ts';

const isExecutable = (rel: string): boolean =>
  rel.startsWith('.claude/hooks/') || rel === '.husky/pre-commit';

export function writeProject(outDir: string, files: ProjectFiles): void {
  for (const [rel, content] of files) {
    const abs = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, 'utf8');
    if (isExecutable(rel)) fs.chmodSync(abs, 0o755);
  }
}
