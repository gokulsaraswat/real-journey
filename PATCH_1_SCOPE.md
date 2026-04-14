# Patch 1 Scope

## Goal
Create the stable shell of Real Journey without loading the main branch with feature-heavy code.

## This patch includes
- app shell
- dark/light theme toggle
- premium header and footer
- homepage skeleton
- loading UI placeholder
- placeholder route pages
- content contracts
- project workflow docs

## This patch does not include yet
- auth logic
- database
- admin protection
- upload pipeline
- PDF or DOCX parsing
- full blog system
- taxonomy CRUD
- reader mode toggle
- search

## Safe next branches after this patch
- `feature/homepage` for visual polish and portfolio data
- `feature/blog` for blog list/detail pages
- `feature/learn-taxonomy` for dynamic route tree
- `feature/reader` for ebook/docs mode
- `feature/admin` for admin dashboard shell
- `feature/uploads` for file upload and normalization flow
- `feature/feedback` for GitHub + email feedback integration

## Shared files other branches should avoid editing unless necessary
- `app/layout.tsx`
- `app/globals.css`
- `lib/config/site.ts`
- `lib/contracts/content.ts`
- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
