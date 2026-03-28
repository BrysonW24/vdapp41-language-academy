# CLAUDE.md — AI Engineer Academy

## What this app is

A premium visual AI engineering academy (vdapp33-ai-engineer-academy) that teaches AI/ML engineering from beginner to production-ready. Content-driven static site — no database, no auth, no backend. All content comes from structured JSON files at build time.

**Forked from:** vdapp32-marketing-academy. Same architecture, design system, and component library — completely different curriculum content.

**Target user:** Someone starting from zero in AI engineering and progressing toward production-ready skills.

## Architecture

Same as vdapp32 — see that CLAUDE.md for full architecture docs. Key points:
- Content in `content/curriculum/` as Zod-validated JSON
- Loaders in `src/lib/content.ts`
- Schemas in `src/types/curriculum.ts`
- Warm editorial "paper and canvas" theme
- Static generation via Next.js 15 App Router

## Content conventions

- Plain English, explain jargon when introduced
- Australian English spelling and AUD salaries
- Real-world examples (OpenAI, Google, Anthropic, Hugging Face, Netflix)
- Each lesson follows: What → Why → How → Example → Mistakes → Exercise → Next
- Module status: "complete" or "coming-soon"

## Git

- Email: Bryson_work@hotmail.com
- Conventional commits
- Build must pass before pushing
