# Patch 17 - Backup, Export, and Ops

## Goal
Add a lightweight admin operations surface for exporting the current state of Real Journey and checking deployment readiness.

## Included
- `/admin/ops` admin page
- Protected admin ops JSON status endpoint
- Export routes for:
  - ops manifest JSON
  - content bundle JSON
  - public inventory CSV
  - search snapshot JSON
- Small ops helpers for admin API auth, status snapshots, and export serialization
- Admin sidebar navigation entry for Ops

## Why this patch exists
The app now has homepage, blog, taxonomy, reader, admin, uploads, parsing, publish flow, auth, stories, feedback, search, deployment polish, testing, and accessibility work. The next stable step is recovery-friendly exports.

This patch keeps the export system intentionally simple:
- human-readable files
- no mutation side effects
- admin-only access
- easy to inspect in Git or local storage

## Branch suggestion
- `feature/backup-ops`

## Safe merge notes
- This patch mainly adds new files.
- One shared file is updated: `lib/data/admin.ts`.
- Merge this before any security-hardening patch so admin routes already have an ops surface to protect.
