# Patch 13 - Search discovery

## Branch
`feature/search-discovery`

## Goal
Add one public discovery surface that can search across learn topics, blog posts, and public stories without changing existing route contracts.

## Files touched
- `app/search/page.tsx`
- `app/api/search/route.ts`
- `components/search/*`
- `lib/search/index.ts`
- `lib/config/site.ts`
- `app/sitemap.ts`

## Included
- public `/search` route
- query + type filters
- paginated result cards
- discovery landing state when no query is entered
- JSON search endpoint for future command-bar or client-side integrations
- top navigation entry for Search
- sitemap update for the new route

## Not included
- private-vault search
- semantic vector search
- database-backed indexing
- autocomplete UI in the header
- admin-only search analytics
- deployment and performance polish

## Privacy note
Only public stories are indexed. Private story-vault assets remain outside this search surface.

## Merge notes
- Safe after Patch 12.
- Search is additive and does not rewrite learn, blog, reader, or stories URLs.
- The search endpoint is public and uses seeded data only.

## Manual checks
1. Open `/search`
2. Try `http`, `architecture`, `java`, and `workflow`
3. Switch between All, Topics, Blog, and Stories
4. Check the next/previous page controls with a broad query like `design`
5. Open `/api/search?q=http`
6. Confirm private story-vault items do not appear in public results

## Next recommended branch
`feature/deployment-polish`
