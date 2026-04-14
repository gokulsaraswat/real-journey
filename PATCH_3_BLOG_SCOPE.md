# Patch 3 — Blog branch scope

Branch name: `feature/blog`

## Goal
Turn `/blog` from a placeholder into a real premium writing surface with static data, article cards, and detail pages.

## Files this patch touches
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/blog/*`
- `lib/data/blog.ts`

## What this patch does not touch
- homepage files
- learn taxonomy routes
- admin, auth, uploads
- global layout and shared navigation

## Merge notes
- Safe to merge after Patch 2
- Keep this branch focused on the blog only
- MDX ingestion, search, and admin publishing can arrive in later patches without changing these route contracts
