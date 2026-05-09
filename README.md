# Club maškaráda

> La noche donde el deseo usa máscara.

Event website for Club maškaráda — BDSM/kink parties in Asunción, Paraguay.

## Tech

- **Framework:** SvelteKit 5 with `@sveltejs/adapter-static`
- **Styling:** Tailwind CSS v4
- **Deployment:** Docker Swarm (nginx:alpine) behind Traefik
- **Domain:** maskarada.paragu-ai.com

## Pages

- `/` — Hero, event details, experience cards, Instagram link
- `/sobre` — About, philosophy, what we offer
- `/entradas` — Ticket reservation form (WhatsApp lead capture)
- `/galeria` — Photo gallery (coming soon)
- `/reglas` — Club rules and code of conduct
- `/faq` — Accordion FAQ
- `/contacto` — Contact info & collaboration inquiries
- `/privacidad` — Privacy policy

## Local dev

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
docker build -t maskarada:prod .
docker save maskarada:prod | gzip > /tmp/maskarada-deploy.tar.gz
scp /tmp/maskarada-deploy.tar.gz ai-whisperers@VPS:/tmp/
# On VPS:
docker load < /tmp/maskarada-deploy.tar.gz
docker stack deploy -c docker-compose.yml maskarada
```

## DNS

Add A record in Cloudflare: `maskarada` → `72.61.44.159` (proxied)

## Lead capture

The ticket form on `/entradas` sends data to the club's WhatsApp via a pre-formatted message link.
