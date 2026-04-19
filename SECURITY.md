# Real Journey security notes

This patch focuses on practical protections for a content-heavy learning platform with a private admin workspace.

## What is enforced
- Stronger response headers through middleware
- A default Content Security Policy
- Same-origin checks on sensitive write endpoints
- Starter request throttling for feedback and admin upload flows
- File extension, mime type, and size checks before upload parsing or storage handoff
- No-store responses on sensitive API routes

## What still comes later
- Shared or distributed rate limiting for multi-instance deployments
- Malware scanning for uploaded binaries
- Secret rotation and managed key audits in CI
- Full audit logging for admin actions

## Environment
You can extend trusted origins with `REAL_JOURNEY_TRUSTED_ORIGINS` as a comma-separated list.
