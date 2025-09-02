#!/usr/bin/env bash
set -euo pipefail

FILE="${1:-}"
if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
  echo "Usage: $0 /chemin/vers/dump.sql.gz"
  exit 1
fi

gunzip -c "$FILE" | mysql -h "db" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "db-taskBoard" 
echo "Restore OK from $FILE"
