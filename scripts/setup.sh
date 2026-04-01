#!/bin/sh
set -e

cd site_desktop_neofi

if [ ! -f ".env.local" ] && [ -f ".env.example" ]; then
  cp .env.example .env.local
fi

npm ci
npm run lint
npm run typecheck
npm run build
