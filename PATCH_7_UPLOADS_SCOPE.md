# Patch 7 - Upload studio and text parser preview

## Branch
`feature/uploads`

## Goal
Turn the admin uploads page into a real intake surface for MD, MDX, TXT, and HTML so the next branches can focus on storage, auth, and binary file extraction.

## Included
- Interactive upload studio on `/admin/uploads`
- Drag-and-drop or browse flow for one file at a time
- Server-side analysis route at `/api/upload-analyze`
- Downloadable templates for:
  - `.mdx`
  - `.md`
  - `.txt`
  - `.html`
- Canonical metadata contract cards
- Format readiness cards showing what is ready now versus next parser work
- Parser helpers isolated under `lib/uploads`

## Not included
- Database persistence
- Storage buckets
- Real publish actions
- Supabase wiring
- PDF parsing
- DOCX parsing
- Multi-file queue persistence

## Why this patch stays branch-safe
- Only `app/admin/uploads`, `app/api/upload-*`, `components/admin/*upload*`, `lib/uploads/*`, and `lib/data/admin.ts` are touched
- No homepage, blog, reader, taxonomy, or auth contracts are changed
- PDF and DOCX are intentionally left for a later parser branch to avoid broad scope drift

## Manual test checklist
1. Open `/admin/uploads`
2. Download each template from the format cards
3. Upload an `.mdx` file and check title, slug, summary, and headings
4. Upload a `.txt` file and confirm fallback metadata still appears
5. Upload a `.html` file and confirm heading extraction works
6. Upload a `.pdf` or `.docx` file and confirm the page explains that parser work is next
7. Check dark mode and light mode
8. Check mobile layout

## Next likely branch
`feature/file-parsers`

That next branch can add:
- PDF extraction
- DOCX extraction
- storage persistence
- original file retention
- publish / draft save actions
