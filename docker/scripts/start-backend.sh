#!/bin/bash
set -e

if [ ! -f composer.json ]; then
  echo "⛔ No Symfony project found here : composer.json not found."
  exit 1
fi

echo "🚀 Installing PHP dependencies..."
composer install

# Auto-migrations activées uniquement si ENV différent de "prod"
if [ "$ENVIRONMENT" != "prod" ]; then
  echo "🧪 ENVIRONMENT=$ENVIRONMENT → Running database migrations..."
  php bin/console doctrine:migrations:migrate --no-interaction
else
  echo "⚠️ ENVIRONMENT=prod → Skipping database migrations"
fi

echo "🚀 Starting Symfony server..."
symfony server:start --no-tls --allow-http --port=8000 --listen-ip=0.0.0.0
