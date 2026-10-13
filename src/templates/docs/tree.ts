interface TreeNode {
  [name: string]: TreeNode;
}

const isDir = (node: TreeNode): boolean => Object.keys(node).length > 0;

/** Dibuja la lista de rutas como árbol de carpetas (carpetas primero, luego archivos, por orden alfabético). */
export function buildTree(files: string[]): string {
  const root: TreeNode = {};
  for (const f of [...files].sort()) {
    let node = root;
    for (const part of f.split('/')) node = node[part] ??= {};
  }
  const out: string[] = [];
  const walk = (node: TreeNode, prefix: string): void => {
    const keys = Object.keys(node).sort((x, y) => {
      const dx = isDir(node[x]);
      const dy = isDir(node[y]);
      return dx === dy ? x.localeCompare(y) : dx ? -1 : 1;
    });
    keys.forEach((k, i) => {
      const last = i === keys.length - 1;
      const dir = isDir(node[k]);
      out.push(prefix + (last ? '└── ' : '├── ') + k + (dir ? '/' : ''));
      if (dir) walk(node[k], prefix + (last ? '    ' : '│   '));
    });
  };
  walk(root, '');
  return out.join('\n');
}
