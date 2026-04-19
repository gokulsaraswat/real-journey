# Patch 11 - Stories vault

## Goal
Turn the Stories area into a real product surface with:
- public story collections
- private story vault routes
- reader pages for stories
- collection pages for nested story paths
- generated source downloads
- improved admin story inventory

## Files touched
- app/stories/page.tsx
- app/stories/[...slug]/page.tsx
- app/stories/private/page.tsx
- app/stories/private/[...slug]/page.tsx
- app/api/story-download/route.ts
- app/admin/stories/page.tsx
- components/stories/*
- components/admin/stories-vault-manager.tsx
- lib/data/stories.ts

## What this patch does not touch
- blog routes
- learn taxonomy
- upload parsing
- publish workflow
- homepage layout
- feedback database integration

## Merge notes
- Safe after Patch 10 auth/storage.
- The route structure is additive and stays inside the stories feature boundary.
- Private story access depends on the login + middleware behavior already introduced earlier.

## Follow-up branches after this patch
- feature/feedback-contribute
- feature/search-discovery
- feature/deployment-polish
