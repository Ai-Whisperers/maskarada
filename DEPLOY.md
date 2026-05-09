# Deploy Manual

SSH is currently not available on the VPS (port 22 closed). Two paths to deploy:

## Option A: Via Hostinger API (if token is available)

```bash
python3 scripts/hostinger.py docker deploy <vm_id> apa-site --file docker-compose.yml
```

## Option B: Via Hostinger Panel

1. Go to https://hpanel.hostinger.com/
2. Navigate to VPS → agentzero
3. Enable SSH or use VPS Console
4. Run:

```bash
git clone https://github.com/Ai-Whisperers/anthro-party-argentina.git /opt/apa
cd /opt/apa
docker compose up -d
```

## Option C: Via SSH (when port 22 is open)

```bash
# From local machine:
bash deploy.sh
```

## Docker Compose

```yaml
services:
  apa-site:
    image: apa-site:latest
    build: .
    ports:
      - "3000:80"
    restart: unless-stopped
    networks:
      - apa-net

networks:
  apa-net:
    driver: bridge
```

## Traefik Integration

If running behind Traefik on the VPS:

1. Deploy the compose above
2. Connect Traefik to the network:
   ```bash
   docker network connect apa-net $(docker ps -q -f name=traefik_traefik)
   ```
3. Traefik will auto-discover via Docker labels

## Health Check

Once deployed, verify:
```bash
curl -s http://localhost:3000 | head -10
curl -s https://anthro-party-argentina.paragu-ai.com | head -10
```
