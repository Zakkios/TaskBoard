#!/bin/bash
set -e

echo "🚀 Installing JS dependencies..."
npm install

echo "🚀 Installing vite globally..."
npm install -g vite

echo "🚀 Starting React app..."
npm run dev -- --host 0.0.0.0