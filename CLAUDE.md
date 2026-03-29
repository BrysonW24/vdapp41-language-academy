# CLAUDE.md — Language Academy

## What this app is

A unified language academy built as a static, content-driven Next.js app.

It currently serves Spanish, Chinese, German, and Thai from one shared codebase using language-prefixed routes such as `/es`, `/zh`, `/de`, and `/th`.

## Architecture

- Content lives in `content/curriculum/<lang>/`
- Shared normalized loaders live in `src/lib/academy-content.ts`
- Language registry lives in `src/lib/languages.ts`
- Shared academy types live in `src/types/academy.ts`
- App routes live under `src/app/[lang]/`

## Content conventions

- Keep the UI shared and language-aware
- Add new curriculum inside the correct language folder instead of cloning the app
- Prefer reusable schemas and loaders over language-specific page implementations

## Git

- Build and type-check should pass before pushing
