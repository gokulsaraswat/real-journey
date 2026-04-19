# Testing for Real Journey

## Branch
feature/performance-accessibility

## What this patch adds
- Vitest-based unit tests for stable helper logic
- Playwright smoke tests for public routes and admin redirect behavior
- GitHub Actions QA workflow for lint, typecheck, unit tests, and browser smoke tests
- Test scripts added to package.json
- Test artifact ignores in .gitignore

## Commands
npm install
npm run test:unit
npm run test:e2e
npm run test:a11y
npm run audit:lighthouse
npm run qa
npm run qa:accessibility
npm run qa:full

## Covered areas
- site branding and navigation config
- admin allowlist helper behavior
- search indexing and discovery results
- health route response shape
- upload template guards
- public route smoke coverage
- admin redirect coverage when Supabase env is missing

## Notes
- Playwright starts the Next dev server automatically.
- The browser test suite uses Chromium only to keep CI smaller.
- This patch does not add coverage thresholds yet.

## Recommended next branch
feature/analytics-insights


## Performance and accessibility extras
- `npm run test:a11y` validates skip navigation, search labels, and reader mode semantics.
- `npm run audit:lighthouse` runs Lighthouse CI against key public routes.
- Lighthouse artifacts are stored in `.lighthouseci` locally and uploaded in GitHub Actions.
