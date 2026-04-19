# Patch 14 - Deployment polish

## Branch
`feature/deployment-polish`

## Goal
Add production polish around metadata, discovery readiness, observability, and deployment checks without changing the app's public route contract.

## Files touched
- `app/layout.tsx`
- `app/manifest.ts`
- `app/opengraph-image.tsx`
- `app/twitter-image.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/api/health/route.ts`
- `app/search/page.tsx`
- `app/login/page.tsx`
- `app/admin/layout.tsx`
- `components/observability/vercel-observability.tsx`
- `components/seo/site-json-ld.tsx`
- `lib/seo/site-schema.ts`
- `lib/config/site.ts`
- `.env.example`
- `package.json`
- `public/icon.svg`
- `DEPLOYMENT.md`

## Included
- app manifest metadata route
- generated Open Graph image
- generated Twitter image
- expanded sitemap with learn, blog, and public story URLs
- robots rules that keep admin, auth, API, and private-vault paths out of crawlers
- site-wide JSON-LD for website and person entities
- optional Vercel Analytics and Speed Insights wiring
- small noindex polish for search, login, and admin surfaces
- health-check route for deployment verification

## Not included
- end-to-end tests
- Lighthouse automation
- CDN or cache headers customization
- CI deployment pipeline
- database-backed search indexing
- contributor moderation workflows

## Merge notes
- Safe after Patch 13 search discovery.
- This patch is mostly metadata, platform wiring, and deployment-facing polish.
- The observability components are opt-in through environment variables, so local development remains clean by default.

## Manual checks
1. Run `npm install`
2. Start with `npm run dev`
3. Open `/manifest.webmanifest`
4. Open `/robots.txt`
5. Open `/sitemap.xml`
6. Open `/opengraph-image`
7. Open `/twitter-image`
8. Open `/api/health`
9. Confirm `/search` renders but is marked noindex
10. If enabling Vercel observability, deploy once and verify Analytics / Speed Insights are enabled in Vercel

## Next recommended branch
`feature/testing-qa`
