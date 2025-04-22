#!/bin/bash
set -e

if [ ! -f composer.json ]; then
  echo "⛔ No Symfony project found here : composer.json not found."
  exit 1
fi

echo "🚀 Installing PHP dependencies..."
composer install

echo "🚀 Starting Symfony server..."
symfony server:start --no-tls --allow-http --port=8000 --listen-ip=0.0.0.0