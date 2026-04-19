# Patch 10 - Auth + storage foundation

## Goal
Add real admin protection and source-file persistence without changing the public route contract or the Git-first publish workflow.

## Adds
- Supabase SSR auth client utilities
- login flow with magic link and password entry
- protected `/admin` layout
- auth callback route
- root `middleware.ts` for auth cookie refresh on admin paths
- server-side service-role storage upload route
- separate storage bucket pathing for private uploads
- upload persistence panel inside `/admin/uploads`
- starter Supabase SQL for the required buckets

## Files changed
- .env.example
- package.json
- app/admin/layout.tsx
- app/auth/callback/route.ts
- app/auth/error/page.tsx
- app/api/admin/storage-upload/route.ts
- app/login/page.tsx
- components/admin/admin-sidebar.tsx
- components/admin/admin-sign-out-button.tsx
- components/admin/upload-persistence-panel.tsx
- components/admin/upload-studio.tsx
- components/auth/access-portal.tsx
- lib/auth/admin.ts
- lib/storage/admin-uploads.ts
- lib/supabase/client.ts
- lib/supabase/server.ts
- lib/supabase/service-role.ts
- lib/supabase/middleware.ts
- middleware.ts
- supabase/migrations/001_real_journey_auth_storage.sql

## What this branch must not own
- final role-based permissions beyond the admin email allowlist
- database models for published content
- search indexing
- analytics
- contributor accounts

## Setup after applying
1. Run `npm install`
2. Fill in the new Supabase environment variables in `.env.local`
3. Run the SQL migration in Supabase
4. Add your real admin email to `SUPABASE_ADMIN_EMAILS`
5. Configure your Supabase auth redirect URLs to include `/auth/callback`
6. Start the app with `npm run dev`

## Manual checks
1. Open `/login`
2. Trigger a magic link or sign in with password
3. Confirm `/admin` redirects non-admin users away
4. Open `/admin/uploads`
5. Analyze a file and save it to storage
6. Confirm private uploads go to the private bucket

## Next recommended branch
feature/content-persistence
