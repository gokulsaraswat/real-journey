# Patch 9 - Publish workflow

## Goal
Turn analyzed uploads into a Git-ready release packet without adding database persistence yet.

## Adds
- /admin/publish workspace
- /api/publish-packet route
- upload-to-publish handoff via sessionStorage
- canonical MDX packet generator
- manifest JSON generator
- release notes generator
- suggested branch name and commit message

## Files changed
- app/admin/content/page.tsx
- app/admin/uploads/page.tsx
- app/admin/publish/page.tsx
- app/api/publish-packet/route.ts
- components/admin/admin-sidebar.tsx
- components/admin/publish-workflow-studio.tsx
- components/admin/upload-studio.tsx
- lib/data/admin.ts
- lib/publish/constants.ts
- lib/publish/workflow.ts
- lib/uploads/parser.ts

## What this branch must not own
- real auth
- database writes
- storage uploads
- search indexing
- background jobs

## Manual checks
1. Open /admin/uploads
2. Upload md, mdx, txt, html, pdf, or docx
3. Confirm canonical body preview exists
4. Click "Send to publish workflow"
5. Confirm /admin/publish loads the draft
6. Generate packet
7. Download all three output files

## Next recommended branch
feature/auth-storage
