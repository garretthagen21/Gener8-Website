# Gener-8 Website Rebuild

Static rebuild of gener-8.com (Gener-8® Continuous Rehabilitation Machine), sourced from
the WordPress/Elementor export `gener-8com.WordPress.2026-06-19.xml`.

## Stack
Static HTML/CSS + TypeScript (compiled to `js/`). No framework, no bundler.

```bash
npm install        # one-time: installs typescript
npm run build      # compile src/*.ts -> js/
npm run watch      # recompile on change
npm run serve      # serve at http://localhost:8000
```

## Brand tokens (pulled from the LIVE site CSS, not the iOS CLAUDE.md)
- Navy `#0b2c55` · deep navy `#071e3b` · ink `#000f08`
- Neon green `#1de517` · deep green `#14b80f`
- Fonts: Montserrat (UI) + Merriweather (serif accent)
- Logo: `logo-wordmark.png` (header), `logo-icon.png` (navy badge + green G8),
  `icon-glyph.png` (transparent glyph), `favicon.png`

## Pages
| File | Source page |
|------|-------------|
| `index.html` | Home |
| `overview.html` | Overview — 8 functions, telemedicine + testimonial, costs, video, close-up gallery (lightbox), specs, warranty |
| `patient-app.html` | Patient Monitoring App |
| `telemonitoring.html` | Telemonitoring (3-phase vision) |
| `video-training.html` | Video Training |
| `contact.html` | Contact (validated form → mailto) |

## Interactions (`src/main.ts`)
Mobile nav drawer · gallery lightbox · contact-form validation + mailto handoff · active-nav highlighting.

## Assets / video — DECISION PENDING
- Overview video stays a **YouTube embed** (`1TNK4opMnU8`), as on the original.
- Video Training: 2 demos are MP4 (`active-rom.mp4`, `ios-signup-demo.mp4`) and play
  cross-browser — these are committed.
- The 4 exercise clips are QuickTime `.mov` (~97 MB) that play only in Safari/iOS.
  They are **git-ignored** (kept on disk) pending a choice:
  1. Transcode `.mov` → MP4 (needs ffmpeg), or
  2. Upload to YouTube and embed (lightest; matches the overview approach).

## Notes
- Dropped a `1xbet` spam line injected in the Home export (old site compromise) and
  Elementor "Add Your Heading Text Here" placeholders.
- `extracted/` holds the cleaned source text + full asset URL list from the WP export.
- Contact form is client-side (mailto). A real backend (Formspree/serverless) is the
  next step for server-side submission.

## Deployment
- **Live (Netlify):** https://bright-chaja-4940c2.netlify.app/
- Auto-deploys from `master`. Config in `netlify.toml` (build `npm run build`, publish root).
- Contact form via Netlify Forms (`Forms -> contact`).
- Domain cutover for gener-8.com (DNS) still pending.
