# Patch 4 — Learn taxonomy branch

Branch name: `feature/learn-taxonomy`

## Goal
Turn `/learn` into a real nested learning system with route-safe taxonomy pages for domain, track, level, category, subcategory, and topic.

## Files this patch touches
- `app/learn/page.tsx`
- `app/learn/[domain]/page.tsx`
- `app/learn/[domain]/[track]/page.tsx`
- `app/learn/[domain]/[track]/[level]/page.tsx`
- `app/learn/[domain]/[track]/[level]/[category]/page.tsx`
- `app/learn/[domain]/[track]/[level]/[category]/[subcategory]/page.tsx`
- `app/topic/[slug]/page.tsx`
- `components/learn/*`
- `lib/data/learn.ts`

## What this patch does not touch
- homepage files
- blog files
- admin, auth, uploads
- global layout, header, footer, theme contracts
- reader mode behavior

## Merge notes
- Safe to merge after Patch 3
- This branch establishes the route contract for 500+ topics
- Topic pages are intentionally lightweight so `feature/reader` can add ebook/docs mode next without changing URLs

## Acceptance check
- `/learn` shows real domain cards and taxonomy stats
- nested routes work down to subcategory pages
- `/topic/[slug]` works as a stable topic leaf page
- no new dependency added
- blog and homepage stay unchanged

## Next recommended branch after merge
`feature/reader`
