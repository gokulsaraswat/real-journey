# Real Journey - Project Rules

## Identity
- Brand: Real Journey
- Owner: Gokul Saraswat
- Title: Engineer
- Theme: premium dark professional with optional light mode

## Product decisions already locked
- Personal Stories visibility: mixed
- Public content + private admin
- Downloadable files + reader pages
- Feedback goes to GitHub and email
- Contribution flow is Git based
- Multiple admins later
- Reader experience will support both ebook mode and docs mode
- Loader GIF will be added later

## Chat + branch workflow
- This main chat is the architecture branch
- Keep the main chat minimal
- Do not paste large code blocks into the main chat
- Use separate feature chats for heavy implementation
- One feature chat should map to one Git branch

## What belongs in the main chat
- final decisions
- route contracts
- content schema contracts
- design system rules
- merge order
- patch definitions
- summaries from feature chats

## What belongs in feature chats
- component code
- experiments
- styling work
- route implementation
- isolated bug fixes

## Branch naming
- `chore/setup`
- `feature/homepage`
- `feature/blog`
- `feature/learn-taxonomy`
- `feature/reader`
- `feature/admin`
- `feature/uploads`
- `feature/feedback`
- `fix/<name>`

## Main chat update format
Use this summary format when a feature branch is ready to report back:

```text
Branch: feature/blog
Done: blog list + blog detail page shell
Files: app/blog/*, components/blog/*, lib/blog/*
Needs decision: shared content card or blog-only card
```

## Merge rule
A feature branch should not rewrite shared contracts without approval from the main chat.

Shared contracts in patch 1:
- `lib/config/site.ts`
- `lib/contracts/content.ts`
- `components/layout/*`
- `app/layout.tsx`
- `app/globals.css`
