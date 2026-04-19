# Patch 12 - Feedback + contribute

## Goal
Turn the placeholder contribute surface into a real workflow with:
- a public contribution page
- feedback form that prepares GitHub and email drafts
- admin feedback inbox
- GitHub issue and PR templates
- Supabase-backed feedback persistence when configured
- small auth stability fixes needed by the new admin route

## Files touched
- app/contribute/page.tsx
- app/api/feedback/route.ts
- app/admin/feedback/page.tsx
- components/contribute/*
- components/admin/feedback-inbox.tsx
- components/auth/access-portal.tsx
- lib/data/contribute.ts
- lib/feedback/index.ts
- lib/data/admin.ts
- lib/auth/admin.ts
- lib/supabase/server.ts
- supabase/migrations/002_real_journey_feedback.sql
- .github/*
- CONTRIBUTING.md
- .env.example

## What this patch does not touch
- blog routes
- learn taxonomy rendering
- upload parsing
- reader mode
- stories vault routes
- search/discovery
- deployment setup

## Merge notes
- Safe after Patch 11 stories vault.
- Adds one new admin route: /admin/feedback.
- Reuses existing GitHub repo URL and feedback email environment values.
- Includes small auth compatibility fixes for admin route protection and auth callback imports.

## Follow-up branches after this patch
- feature/search-discovery
- feature/deployment-polish
