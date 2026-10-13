#!/usr/bin/env bash
# Verificación rápida del generador (sin red):
#  1. genera variantes TS/Python × 4 bases de datos × ES/EN y tamaños pequeño/mediano en inglés
#  2. valida JSON/YAML generados (si python3 + PyYAML están disponibles)
#  3. busca restos de español en la salida en inglés
# Uso: bash scripts/check.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GEN="$ROOT/create-pw-framework.mjs"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT

node --check "$GEN"

for lang in ts py; do
  for db in postgres mysql mssql mongodb; do
    cat > "$OUT/$lang-$db.json" <<JSON
{"name":"chk-$lang-$db","lang":"$lang","size":"large","envs":["dev","qa","staging"],
"browsers":["chromium","firefox","mobile-chrome"],"reporters":["html","junit","allure","metrics"],
"api":true,"db":"$db","data":true,"auth":true,"extras":["a11y","visual"],"docker":"compose",
"ci":["github","jenkins","gitlab","azure"],"shards":3,"lint":true,"precommit":true,"claude":true,"git":false}
JSON
    for l in es en; do
      node "$GEN" --answers "$OUT/$lang-$db.json" --lang $l --out "$OUT/$l-$lang-$db" --no-install >/dev/null
    done
  done
  for size in small medium; do
    echo "{\"name\":\"chk\",\"lang\":\"$lang\",\"size\":\"$size\",\"git\":false}" > "$OUT/$size-$lang.json"
    node "$GEN" --answers "$OUT/$size-$lang.json" --lang en --out "$OUT/en-$size-$lang" --no-install >/dev/null
  done
done
echo "✔ Variantes generadas"

if python3 -c "import yaml" 2>/dev/null; then
  python3 - "$OUT" <<'PY'
import json, pathlib, sys, yaml
root = pathlib.Path(sys.argv[1]); n = 0
for p in root.rglob("*"):
    if p.name.endswith((".yml", ".yaml")): yaml.safe_load(p.read_text(encoding="utf-8")); n += 1
    elif p.suffix == ".json": json.loads(p.read_text(encoding="utf-8")); n += 1
print(f"✔ {n} archivos JSON/YAML válidos")
PY
fi

SPANISH='[áéíóúñÁÉÍÓÚÑ¿¡]|(?<![\w-])(de|la|el|los|las|para|con|sin|una|que|por|del|cada|solo|todo|este|esta|usa|ejecuta|pruebas|datos|nunca|también|archivo|carpeta|prueba|ambiente|reporte|usuario|conexión|página|corrida|reintentos|Revisa|Ajusta|Opción|Valor|Ninguno|Sí|más|como|pero|aquí|después|siempre|debe|tu|tus|vía|ningún|ninguna|bajo|hasta|desde|ejemplo|nombre|valores|guarda|crea|elige|instala)(?![\w-])'
if LC_ALL=C.UTF-8 grep -rnP "$SPANISH" "$OUT"/en-* --exclude=scaffold.answers.json; then
  echo "✖ Hay textos en español en la salida en inglés: añade sus pares en i18n/en_pairs.py y ejecuta python3 i18n/inject.py"
  exit 1
fi
echo "✔ Salida en inglés sin restos de español"
