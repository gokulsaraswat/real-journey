# Patch 2 - Homepage polish

## Branch
`feature/homepage`

## Goal
Upgrade the landing page into a stronger portfolio-style homepage while keeping blog, admin, auth, and upload work isolated for later branches.

## Files touched
- `app/page.tsx`
- `app/globals.css`
- `components/home/home-hero.tsx`
- `components/home/home-highlights.tsx`
- `components/home/home-structure.tsx`
- `components/home/home-writing-preview.tsx`
- `components/home/home-workflow.tsx`
- `lib/data/home.ts`

## Do not touch in this branch
- `app/blog/**`
- `app/admin/**`
- `app/login/**`
- `app/contribute/**`
- shared auth/storage/db work

## Acceptance check
- Home page feels like a premium dark professional portfolio
- Existing routes still work
- No new dependency added
- Loader slot remains in place for your future GIF

## Next recommended branch after merge
`feature/blog`
