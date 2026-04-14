# Real Journey - Patch 1

Patch 1 creates the stable starter shell for **Real Journey**.

## What is included
- Next.js App Router starter with TypeScript, Tailwind CSS, and ESLint
- Premium dark professional shell with optional light mode
- Homepage skeleton for Gokul Saraswat - Engineer
- Top-level routes for blog, learn, stories, login, admin, and contribute
- Loading screen slot for your future GIF loader
- Project rules for multi-chat and multi-branch work
- Content contracts for future blog/topic/story/admin branches

## Start locally
```bash
npm install
npm run dev
```

## Environment
Copy `.env.example` to `.env.local` and update the values.

## Loader GIF later
When you are ready, place your loader file at:

```text
/public/loader/real-journey-loader.gif
```

Patch 1 currently uses a clean fallback loader so the app works before the GIF is added.

## Branch-safe workflow
This repository is intended to work with multiple ChatGPT feature chats.

- Main chat: architecture, contracts, merge rules, final decisions
- Feature chats: isolated implementation work
- One chat = one Git branch

Recommended early branches after patch 1:
- `chore/setup`
- `feature/homepage`
- `feature/blog`
- `feature/learn-taxonomy`
- `feature/reader`
- `feature/admin`
- `feature/uploads`
- `feature/feedback`

## Reserved next patches
- Patch 2: homepage polish + blog UI
- Patch 3: taxonomy and nested navigation
- Patch 4: reader modes
- Patch 5: auth and admin shell
- Patch 6+: upload ingestion and publish flow
