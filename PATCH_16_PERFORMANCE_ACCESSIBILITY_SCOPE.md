# Patch 16 - Performance and Accessibility

## Branch
`feature/performance-accessibility`

## Goal
Raise the baseline for keyboard access, motion preferences, route clarity, and performance auditing before deeper scale and contributor work continue.

## Files touched
- `package.json`
- `.gitignore`
- `app/layout.tsx`
- `app/globals.css`
- `app/accessibility/page.tsx`
- `app/search/page.tsx`
- `app/sitemap.ts`
- `components/accessibility/skip-link.tsx`
- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
- `components/theme/theme-toggle.tsx`
- `components/search/search-query-form.tsx`
- `components/reader/topic-reader-shell.tsx`
- `components/ui/loader-slot.tsx`
- `.github/workflows/qa.yml`
- `tests/e2e/accessibility-navigation.spec.ts`
- `lighthouserc.js`
- `TESTING.md`

## Included
- skip link to main content
- stronger focus visibility and reduced-motion handling
- public accessibility statement page
- reader and search semantic improvements
- Lighthouse CI budgets and GitHub Actions audit job
- Playwright accessibility smoke checks

## Not included
- automated color-contrast snapshots
- screen-reader-specific scripted testing
- authenticated Lighthouse runs for protected routes
- image CDN or advanced bundle-splitting work

## Merge notes
- Safe after Patch 15 testing and QA.
- This patch improves shared layout, so merge before any future navigation redesign branch.
- Admin auth and storage contracts are unchanged.

## Manual checks
1. Run `npm install`
2. Run `npm run test:a11y`
3. Run `npm run audit:lighthouse`
4. Open `/accessibility`
5. Tab from the homepage and verify the skip link appears

## Next recommended branch
`feature/analytics-insights`
