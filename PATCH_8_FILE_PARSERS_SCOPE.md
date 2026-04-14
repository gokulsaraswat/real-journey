# Patch 8 scope — file parsers

## Branch
`feature/file-parsers`

## Goal
Upgrade the admin upload flow so PDF and DOCX files analyze into the same metadata contract already used by MD, MDX, TXT, and HTML.

## Files touched
- `package.json`
- `app/api/upload-analyze/route.ts`
- `app/admin/uploads/page.tsx`
- `components/admin/upload-studio.tsx`
- `lib/data/admin.ts`
- `lib/uploads/parser.ts`
- `lib/uploads/file-parsers.ts` (new)

## Contracts preserved
- homepage, blog, learn taxonomy, reader, and admin route structure stay unchanged
- upload endpoint remains `/api/upload-analyze`
- upload analysis output keeps the existing metadata shape and only adds parser-specific fields

## New behavior
- `.pdf` files are parsed with `pdf-parse`
- `.docx` files are parsed with `mammoth`
- upload analysis now returns:
  - `parserEngine`
  - `parserWarnings[]`
- binary uploads still normalize toward canonical MDX output
- original uploaded file is still expected to remain downloadable later

## Acceptance checks
- `/admin/uploads` explains that all six formats are live
- a PDF upload returns a draft instead of a “next parser” error
- a DOCX upload returns a draft instead of a “next parser” error
- scanned/image-only PDFs surface a warning instead of crashing
- MD/MDX/TXT/HTML behavior remains unchanged

## Out of scope
- auth enforcement
- persistence to database/storage
- publish workflow
- OCR for image-only PDFs
- private storage policies
- multi-file batch uploads

## Next recommended branch
`feature/publish-workflow`
