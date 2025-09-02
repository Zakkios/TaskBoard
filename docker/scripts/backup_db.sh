#!/usr/bin/env bash
set -euo pipefail

DATE=$(date +"%Y-%m-%d_%H-%M")
OUT_DIR="/var/backups/taskboard"
mkdir -p "$OUT_DIR"

mysqldump -h "db" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" --single-transaction "db-taskBoard"   | gzip > "$OUT_DIR/db-taskBoard_${DATE}.sql.gz"

find "$OUT_DIR" -type f -name "*.sql.gz" -mtime +7 -delete

echo "Backup OK: $OUT_DIR/${MYSQL_DATABASE}_${DATE}.sql.gz"
