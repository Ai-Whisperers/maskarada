#!/bin/bash
set -e

echo "=== Building APA! site ==="
pnpm build

echo "=== Building Docker image ==="
docker build -t apa-site:latest .

echo "=== Saving image ==="
docker save apa-site | gzip > /tmp/apa-site-deploy.tar.gz

echo "=== Copying to VPS ==="
scp /tmp/apa-site-deploy.tar.gz ai-whisperers@72.61.44.159:/tmp/

echo "=== Deploying on VPS ==="
ssh ai-whisperers@72.61.44.159 "
  docker load < /tmp/apa-site-deploy.tar.gz
  docker stop apa-site 2>/dev/null || true
  docker rm apa-site 2>/dev/null || true
  docker run -d --name apa-site --restart unless-stopped -p 3000:80 apa-site:latest
  echo 'Deployed on port 3000'
"

echo "=== Done ==="
