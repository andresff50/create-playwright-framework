"""Embebe la tabla es→en (en_pairs.py) dentro de create-pw-framework.mjs.

Uso: python3 i18n/inject.py   (desde la carpeta del generador)
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from en_pairs import PAIRS  # noqa: E402

script = ROOT / "create-pw-framework.mjs"
src = script.read_text(encoding="utf-8")

seen: dict[str, str] = {}
for es, en in PAIRS:
    if es in seen and seen[es] != en:
        raise SystemExit(f"Clave duplicada con traducciones distintas: {es!r}")
    if es != en:
        seen[es] = en

body = ",\n".join(f"  [{json.dumps(k, ensure_ascii=False)}, {json.dumps(v, ensure_ascii=False)}]" for k, v in seen.items())
table = f"/*__I18N_START__*/\nconst I18N_EN = new Map([\n{body},\n]);\n/*__I18N_END__*/"

if "/*__I18N_TABLE__*/" in src:
    src = src.replace("/*__I18N_TABLE__*/", table)
else:
    src = re.sub(r"/\*__I18N_START__\*/.*?/\*__I18N_END__\*/", lambda _: table, src, flags=re.S)

script.write_text(src, encoding="utf-8")
print(f"{len(seen)} traducciones embebidas en {script.name}")
