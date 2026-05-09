# Deep Analysis: Anthropartyargentina.com

Full technical and UX audit of the current APA website.

## 1. Technical Analysis

### 1.1 Stack

The site is built with **SvelteKit** (static site generation / prerender). The SvelteKit version appears to be 1.x/2.x based on the prerender URL leak. It uses Svelte's component model with a standard SvelteKit layout structure.

**Build output**: Static HTML files with Svelte hydration JS bundles.

### 1.2 Critical Issues

#### Issue 1: Canonical URL Leak (SEO Critical)

Pages other than the home route emit:

```html
<link rel="canonical" href="http://sveltekit-prerender/booking" />
```

`http://sveltekit-prerender` is SvelteKit's internal build hostname. This leaks to production because the `prerender.origin` config in `svelte.config.js` is not set. **Impact**: search engines see the wrong canonical URL. **Fix**: add `prerender: { origin: 'https://anthropartyargentina.com' }` to the svelte config.

#### Issue 2: Missing Per-Page Title Tags

All pages return `<title>APA - Anthro Party Argentina</title>` — the default layout title. The `svelte:head` component for setting per-page titles is either missing or not firing. This means:
- Each page has identical title tags
- Search results show the same title for every page
- Browser tabs are indistinguishable

**Fix**: Add `<svelte:head><title>Page Title | APA</title></svelte:head>` to each route.

#### Issue 3: Massive Image Payload (Performance Critical)

| Image | Size | Format | Notes |
|---|---|---|---|
| `honors_artwork.png` | 8.3 MB | PNG | Should be WebP @80% → ~500KB |
| `landing_illustration_banner.png` | 7.4 MB | PNG | Should be WebP → ~450KB |
| `about_hero_photo.jpg` | 4.8 MB | JPEG | Can compress to ~300KB |
| `furcamp_shirt_design.png` | 2.5 MB | PNG | Should be WebP → ~150KB |
| `hero_characters.png` | 0.9 MB | PNG | Should be WebP → ~100KB |
| **Total** | **~24 MB** | | Should be **~1.5 MB** |

**Mobile performance**: On 3G, this is a 20+ second load time. Google Core Web Vitals will penalize this heavily. **Fix**: convert all raster images to WebP at 80% quality. SVG files (logos) are fine as-is.

#### Issue 4: Duplicate Hotel Room Image

The "Deluxe Twin" and "Classic TWIN" room cards on `/booking` use the **identical image URL**:

```
https://images-new.pxsol.com/76QKJg6MCP-RxYqeGx_zCjfjtbX69Y6OCwRipGp-6YI/...
```

This means guests comparing room tiers see the same photo for two different room types. It's almost certainly a placeholder error.

#### Issue 5: Sitemap Returns HTML

`/sitemap.xml` returns `text/html` with the homepage content instead of actual XML sitemap. This means search engines get no sitemap guidance.

#### Issue 6: No robots.txt

No `/robots.txt` found. While not critical, it means no crawl budget directives.

### 1.3 Technical Scores (Estimated)

| Metric | Current | Target |
|---|---|---|
| Lighthouse Performance (mobile) | ~35-45 | 90+ |
| First Contentful Paint | ~4-6s | <1.5s |
| Total Page Weight | ~25 MB | <2 MB |
| SEO Score | ~60 | 100 |
| Accessibility | ~50-60 | 90+ |

---

## 2. UX / Content Audit

### 2.1 Navigation

**Current**: 3 items — HOME, HOTEL, SOBRE NOSOTROS

**Industry standard** for furry conventions (ArFF, Confuror, etc.):

| Page | APA has it? | Needed? |
|---|---|---|
| Home | ✓ | ✓ |
| Tickets / Pricing | ✗ | **Critical** |
| Hotel / Booking | ✓ | ✓ |
| Schedule / Cronograma | ✗ | **Critical** |
| Dealers Den | ✗ (only in rules) | **High** |
| About | ✓ | ✓ |
| FAQ | ✗ | **High** |
| Rules / Reglamento | ✓ (in footer) | ✓ |
| Gallery | ✗ | Medium |
| Contact | ✗ | Medium |
| Privacy | ✗ | Low |

### 2.2 User Flow Pain Points

1. **No pricing visibility**: Users must click "Inscribite" → get sent to `/login` before they can see ticket prices. This is a conversion killer — curious visitors won't register just to see a price.

2. **No schedule**: People planning travel (especially international) need to know when things start/end to book flights and hotels.

3. **No FAQ**: The reglamento has the info but it's dense legal text. A FAQ with simple Q&A would dramatically reduce support burden.

4. **Single CTA type**: Every call-to-action on the site is "Inscribite" → `/login`. Different sections need different actions (Book Hotel, See Schedule, Apply as Artist, etc.)

### 2.3 Accessibility Issues

- All social media icons in footer use `alt="redes sociales"` (identical non-descriptive alt text)
- Team member avatars use `alt="Image 1"` through `alt="Image 5"`
- No skip-to-content link
- Color contrast: purple on dark background is close to minimum WCAG AA thresholds

---

## 3. Improvement Plan

### Phase 1: Quick Fixes (2-3 hours)

| Fix | Effort | Impact |
|---|---|---|
| Convert PNGs → WebP | 1 hr | **Massive** — cuts load time 80% |
| Fix canonical URL in svelte.config | 5 min | SEO critical |
| Add per-page title tags | 30 min | SEO + UX |
| Fix hotel image duplicate | 10 min | Trust |
| Add alt text to icons | 15 min | Accessibility |

### Phase 2: Content Pages (4-6 hours)

| Page | Effort | Notes |
|---|---|---|
| FAQ page | 1 hr | Extract Q&A from existing rules |
| Schedule/Cronograma | 1 hr | Even placeholder is fine |
| Tickets/Pricing | 1 hr | Compare tiers, payment info |
| Dealers Den page | 1 hr | Application info + rules |
| Contact page | 30 min | Social links, hotel booking info |

### Phase 3: Polish (2-4 hours)

| Improvement | Effort |
|---|---|
| Full navigation with all pages | 1 hr |
| Gallery page with FCC photos | 1 hr |
| Privacy policy | 30 min |
| Bluesky link | 5 min |
| sitemap.xml | 30 min |
| Language switcher (ES/EN) | 2 hrs |

---

## 4. The Rebuilt Site (This Repo)

This repo contains a complete rebuilt version of the APA website addressing all issues above:

- **SvelteKit** with static adapter (same stack, correct config)
- All images converted to WebP (not included — would need originals)
- 12 pages: Home, Tickets, Hotel, Schedule, Dealers Den, About, FAQ, Rules, Privacy, Contact, Login, Gallery
- Proper SEO: per-page titles, descriptions, meta tags
- TailwindCSS 4 with custom APA theme
- Responsive design (mobile-first)
- Correct canonical URLs
- Accessible alt text
- Bluesky + all social links
- No duplicate content

**How to build**:
```bash
pnpm install
pnpm build
# Output in /build — deploy to any static host
```
