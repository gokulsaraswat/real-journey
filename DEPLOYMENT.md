# Real Journey deployment notes

## Recommended target
Deploy to Vercel with Supabase already configured from earlier patches.

## Required environment variables
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GITHUB_REPO_URL`
- `NEXT_PUBLIC_FEEDBACK_EMAIL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ADMIN_EMAILS`
- `SUPABASE_ADMIN_UPLOAD_BUCKET`
- `SUPABASE_PRIVATE_STORY_BUCKET`

## Optional observability flags
- `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS`
- `NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS`
- `NEXT_PUBLIC_SPEED_INSIGHTS_SAMPLE_RATE`

## Pre-deploy checklist
- set `NEXT_PUBLIC_SITE_URL` to the real production domain
- confirm GitHub repo URL is correct
- confirm feedback email is correct
- confirm Supabase redirect URLs include `/auth/callback`
- confirm admin allowlist emails are correct
- add your final loader GIF file at `public/loader/real-journey-loader.gif`

## Smoke checks after deploy
- homepage loads
- dark and light mode toggle works
- login works for admin email allowlist
- `/stories/private` redirects or protects properly
- `/search` works publicly
- `/robots.txt` and `/sitemap.xml` are reachable
- `/api/health` returns status ok
- share preview uses the generated OG / Twitter image routes

## Notes
- Search stays public for discovery, but search pages themselves are marked `noindex`.
- Private stories, admin surfaces, auth callbacks, and API routes stay out of the crawl surface.
- Vercel Analytics and Speed Insights are only rendered when explicitly enabled by env flags.
