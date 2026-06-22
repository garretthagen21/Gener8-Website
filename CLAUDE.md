# Gener8-Website

Marketing/product website for the Gener-8 platform. See workspace root `CLAUDE.md` for system context.

## Stack
Static HTML + CSS, with interactions in TypeScript compiled to `js/`.

- `*.html` — one file per page (index, overview, patient-app, telemonitoring, video-training, contact)
- `css/style.css` — styles + brand tokens
- `src/*.ts` → `js/` — `npm run build` (or `npm run watch`); `npm run serve` to preview
- `assets/img`, `assets/video` — media
- `extracted/` — cleaned source text + asset list from the original WordPress export

## Brand tokens (from the live site)
Navy `#0b2c55` · ink `#000f08` · neon green `#1de517` · Montserrat + Merriweather.

## Branching Strategy
- Base branch: `master`
- PRs target `master`
