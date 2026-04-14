# Patch 5 — Reader branch scope

Branch name: `feature/reader`

## Goal
Turn `/topic/[slug]` into a real reading surface with dual reader modes, sticky progress, a topic outline, next/previous navigation, and a working downloadable source endpoint.

## Files this patch touches
- `app/topic/[slug]/page.tsx`
- `app/api/topic-download/route.ts`
- `components/reader/*`
- `lib/data/topic-reader.ts`

## What this patch does not touch
- homepage files
- blog files
- learn taxonomy route contracts
- admin, auth, uploads
- global layout, header, footer, theme contracts

## Merge notes
- Safe to merge after Patch 4
- Topic URLs stay unchanged
- Reader mode is stored locally per browser
- Downloads currently come from a route handler that generates MDX-like source from seeded topic data
- Admin uploads can replace this generated source later without changing the reader URL

## Acceptance check
- `/topic/[slug]` shows a full reader instead of a placeholder
- docs and ebook modes both work
- outline links jump inside the page
- progress bar moves while reading
- `Download source` returns a file attachment
- no new dependency added

## Next recommended branch after merge
`feature/admin`
