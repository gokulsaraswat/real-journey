# Patch 15 - Testing and QA

## Branch
`feature/testing-qa`

## Goal
Add a stable QA baseline for Real Journey so public routes, helper logic, and core discovery flows can be validated in CI before deeper scale work continues.

## Files touched
- `package.json`
- `.gitignore`
- `vitest.config.ts`
- `playwright.config.ts`
- `.github/workflows/qa.yml`
- `tests/unit/site-config.test.ts`
- `tests/unit/admin-auth.test.ts`
- `tests/unit/search.test.ts`
- `tests/unit/health-route.test.ts`
- `tests/unit/upload-templates.test.ts`
- `tests/e2e/public-surfaces.spec.ts`
- `TESTING.md`

## Included
- unit tests for pure helpers and route handlers
- browser smoke tests for homepage, blog, search, topic reader, and admin redirect
- GitHub Actions QA workflow
- package scripts for repeatable local testing
- ignored test artifacts

## Not included
- coverage thresholds
- Lighthouse automation
- visual regression snapshots
- database-backed integration tests
- contributor moderation flow tests

## Merge notes
- Safe after Patch 14 deployment polish.
- This patch adds testing and workflow files only. It does not change route contracts.
- The admin redirect smoke test assumes Supabase env values are absent in local and CI by default.

## Manual checks
1. Run `npm install`
2. Run `npm run test:unit`
3. Run `npm run test:e2e`
4. Run `npm run qa`
5. Open the generated Playwright report if any test fails

## Next recommended branch
`feature/performance-accessibility`
