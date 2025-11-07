#!/usr/bin/env bash
set -euo pipefail

DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-fut_brazuca_dev}
DB_USER=${DB_USER:-fut_brazuca}
DB_EXTRA_OPTS=${DB_EXTRA_OPTS:-}

echo "Aplicando migrações em ${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

for file in $(ls db/migrations/*.sql | sort); do
  echo ">> Rodando ${file}"
  psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    $DB_EXTRA_OPTS \
    -d "$DB_NAME" \
    -v ON_ERROR_STOP=1 \
    -f "$file"
done

echo "Migrações aplicadas com sucesso."
