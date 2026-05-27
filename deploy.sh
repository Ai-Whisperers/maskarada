#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="maskarada:prod-$VERSION-$DATE"
LATEST="maskarada:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build -t "$TAG" -t "$LATEST" .

echo "--- deploy: maskarada_web (rolling update)"
docker service update --image "$TAG" maskarada_web

echo "--- done: $TAG"
