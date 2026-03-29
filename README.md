# vdapp41 — Language Academy

A unified language-learning app built on one shared Next.js codebase.

## What this is

This repo now serves multiple language tracks from one deploy:

- Spanish: `/es`
- Chinese: `/zh`
- German: `/de`
- Thai: `/th`

The app uses one shared UI shell with language-specific curriculum loaded from:

- `content/curriculum/es`
- `content/curriculum/zh`
- `content/curriculum/de`
- `content/curriculum/th`

## Current content status

- Spanish: 1000 words, 15 topics, 12 grammar rules, 8 phrase packs
- Chinese: 420 words
- German: 700 words
- Thai: scaffold ready, content pending

## Development

```bash
npm install
npm run dev
npm run build
npm run type-check
```
