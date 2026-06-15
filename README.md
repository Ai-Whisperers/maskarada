# Club maškaráda — **LEGACY (PRE-MONOREPO) REFERENCE**

> ⚠️ **This standalone SvelteKit repo is no longer the source of truth.**
>
> **Migrated to monorepo on 2026-06-15.** The active development and deployment is now at
> [`Ai-Whisperers/paragu-ai-platform`](https://github.com/Ai-Whisperers/paragu-ai-platform) under
> `apps/maskarada/`. Live site: https://maskarada.paragu-ai.com

This repo is kept as a historical reference of the SvelteKit 5 + adapter-static + nginx-alpine
implementation. Do not deploy from this directory. Do not push changes here expecting them to
go live. The `maskarada_web` Swarm service now runs the monorepo build.

## Migration summary

| | Before (this repo) | After (monorepo) |
|---|---|---|
| **Stack** | SvelteKit 5 + adapter-static + nginx | Next.js 16.2 App Router + standalone |
| **Container** | `nginx:alpine` serving flat HTML | `node:20-slim` running `apps/maskarada/server.js` |
| **Build target** | `build/` static files | `.next/standalone/` + `.next/static/` |
| **Supabase** | `@supabase/supabase-js` directly | `@supabase/ssr` (via `lib/supabase.ts`) |
| **Tailwind** | v4 via Vite plugin | v4 via PostCSS |
| **Image count** | 30 MB of WebP/JPG in `static/images/` | Preserved as-is in `apps/maskarada/public/images/` |
| **Pages** | 12 routes | 12 routes + 4 locale shells + `/api/health` |
| **Smoke test** | All 11 paths 200 | All 13 paths 200, 4 × 307, 1 × 308 (canonical trailing-slash redirect) |
| **Security headers** | None in app (nginx had basic) | Full CSP, HSTS, XCTO, Referrer-Policy via `next.config.ts` |
| **Health check** | `wget /` (always 200) | `wget /api/health` (real JSON status) |

## What to do with this repo

- **Don't deploy from it.** The image is no longer built from this directory.
- **Reference only.** If you need to understand the original design decisions, look here.
- **Archive soon.** After 30 days stable in monorepo, this repo should be archived on GitHub.
- **Don't delete.** Repo stays in git for history.

## Original deployment (for reference, do not run)

```bash
# This is what the standalone deploy looked like.
# DO NOT RUN — use the monorepo deploy instead.
cd /root/maskarada
npm run build
docker build -t maskarada:prod .
docker service update --force --image maskarada:prod maskarada_web
```

## Monorepo deploy (the new way)

```bash
cd /root/paragu-ai-platform/apps/maskarada
pnpm run build
docker build -f Dockerfile.standalone -t maskarada:prod .
docker stack deploy -c docker-compose.yml maskarada
# IMPORTANT: full stack redeploy is required when changing
# docker-compose.yml labels. `docker service update` does NOT pick up
# label changes — see "Outdated Traefik labels" pitfall in the
# paragu-ai-platform-maintenance skill.
```

## Supabase

Project `qyvokpribmbrosafntqa` — schema unchanged (mk_tickets, mk_blocklist, mk_marketing_list, mk_site_config, mk_capacity). RLS preserved. The Supabase client moved from `@supabase/supabase-js` to `@supabase/ssr` in the monorepo — the public anon key and all method names are identical, so schema is compatible.

## Contact

For any questions about this migration, see the `maskarada-site-upgrade` skill (now points to monorepo paths) or the `paragu-ai-platform-maintenance` skill.
