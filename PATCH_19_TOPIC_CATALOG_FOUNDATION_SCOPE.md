# Patch 19 — Topic Catalog Foundation

## Purpose
This patch adds the **admin topic catalog foundation** so Real Journey can scale toward a very large knowledge map without hardcoding topic pages first.

## What this patch adds
- `/admin/topic-catalog` admin page
- topic catalog parser utilities in `lib/topics/catalog.ts`
- sample catalog data in `lib/data/topic-catalog-sample.ts`
- API route to inspect catalog data: `/api/admin/topic-catalog`
- API route to normalize raw topic text: `/api/admin/topic-catalog/normalize`
- admin navigation update to surface the new page
- starter unit tests for parser behavior

## Why it matters
This patch keeps the main branch lightweight while allowing content branches to work from a stable topic contract:
- sections
- topic number
- topic title
- slug
- domain
- track
- level
- status

## What this patch does not do yet
- it does **not** import the full 1000-topic source yet
- it does **not** persist topic data to Supabase yet
- it does **not** create all topic pages yet

Those will land in the next large content-scale patch.

## Branch intent
Suggested branch:
- `feature/topic-catalog-foundation`

## Safe merge notes
This patch mainly touches:
- admin navigation
- new admin topic catalog page
- new parser logic

It is safe to merge before the full 1000-topic seed patch.
