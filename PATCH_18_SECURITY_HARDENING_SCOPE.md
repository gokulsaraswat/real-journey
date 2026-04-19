# Patch 18 - Security hardening

## Goal
Add a practical security layer on top of the existing auth, admin, feedback, and upload flows without changing the site IA.

## Included
- Middleware-applied security headers
- Content Security Policy helper
- Same-origin checks for sensitive POST routes
- Starter request rate limiting
- Stronger upload validation for analyze + storage routes
- Admin security review page
- Unit tests for CSP + rate-limit helpers

## Routes touched
- `middleware.ts`
- `/api/feedback`
- `/api/upload-analyze`
- `/api/admin/storage-upload`
- `/admin/security`

## Notes
- Rate limiting is memory-backed in this branch. It is good for local/dev and single-instance deployments, but a shared store is better later.
- The upload route now expects an authenticated admin session for analysis and storage handoff.
- Same-origin checks trust `NEXT_PUBLIC_SITE_URL`, the current request host, localhost defaults, and optional `REAL_JOURNEY_TRUSTED_ORIGINS`.
