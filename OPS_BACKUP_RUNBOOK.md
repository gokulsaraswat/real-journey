# Real Journey Ops Backup Runbook

## Before risky changes
1. Open `/admin/ops`
2. Export the ops manifest
3. Export the content bundle
4. Export the public inventory CSV
5. Export the search snapshot if you will change search or content ingestion

## Good moments to export
- before taxonomy refactors
- before storage bucket changes
- before auth changes
- before parser changes
- before big publish batches
- before deployment environment changes

## What each file is for
- `real-journey-ops-manifest.json`
  - environment, buckets, config flags, export endpoints
- `real-journey-content-bundle.json`
  - structured topic/blog/story inventory for recovery or migration
- `real-journey-public-inventory.csv`
  - fast human review in spreadsheets
- `real-journey-search-snapshot.json`
  - search totals, popular tags, quick-query result samples

## Recovery principle
Keep exports readable. Do not invent a complex backup system before you need one.
