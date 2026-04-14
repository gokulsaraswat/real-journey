# Patch 6 — Admin branch scope

Branch name: `feature/admin`

## Goal
Create the stable admin route family and a real login screen shell so future branches can add auth, uploads, and storage without changing the public `/login` route or the admin URLs.

## Files this patch touches
- `app/login/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/uploads/page.tsx`
- `app/admin/content/page.tsx`
- `app/admin/taxonomy/page.tsx`
- `app/admin/stories/page.tsx`
- `components/admin/*`
- `lib/data/admin.ts`

## What this patch does not touch
- homepage files
- blog files
- learn taxonomy public route contracts
- reader components and topic download handler
- shared site header, footer, theme, and global layout contracts
- actual auth provider wiring
- real file upload processing

## Merge notes
- Safe to merge after Patch 5
- `/login` stays the public auth entry route
- `/admin` becomes a real nested layout with child pages
- all admin content is seeded and dependency-free for now
- auth and upload branches can replace the seed data later without changing routes

## Acceptance check
- `/login` shows a real admin-ready access screen
- `/admin` shows a dashboard with metrics and queue cards
- `/admin/uploads` exists
- `/admin/content` exists
- `/admin/taxonomy` exists
- `/admin/stories` exists
- no new npm dependency added

## Next recommended branch after merge
`feature/uploads`
