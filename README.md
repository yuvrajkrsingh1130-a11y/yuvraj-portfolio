# YUVRAJ SINGH — PORTFOLIO

BRUTALIST × CREATIVE TECHNOLOGY × GRAPHIC DESIGN × 3D × MOTION

An original, multi-page portfolio for **Yuvraj Singh** — graphic designer, brand
designer and creative developer. Built with React + TypeScript + GSAP + Lenis +
Three.js, deployable to Vercel as a static SPA.

## Stack

- Vite + React 19 + TypeScript
- GSAP + ScrollTrigger (all choreography)
- Lenis (smooth scroll, wired into GSAP's ticker)
- Three.js (procedural hero object — GPU noise displacement, no assets)
- Tailwind CSS 4 + a custom brutalist design system
- react-router (code-split pages)

## Pages

| Route         | Page                                        |
| ------------- | ------------------------------------------- |
| `/`           | Home — hero + 3D, statement, work, featured, horizontal strip |
| `/work`       | Index of all projects with filters + hover previews |
| `/work/:slug` | Data-driven project detail template          |
| `/lab`        | Six interactive experiments (type, particles, WebGL, distortion…) |
| `/about`      | Identity + interactive skills typography     |
| `/contact`    | Huge CTA + brutalist brief form              |

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Replace the placeholder content

Everything editable lives in two files:

- `src/data/projects.ts` — project titles, categories, years, roles, copy,
  palettes, cover variants, links. Every page reads from here.
- `src/data/site.ts` — name, email, status line, socials, nav items, skills.

Placeholder artwork is generated SVG (`src/components/CoverArt.tsx`). When real
imagery exists, swap that component's output for `<img>` tags — the layouts
don't care. The contact form drafts a `mailto:`; wire it to any form endpoint
in `src/pages/Contact.tsx`.

## Architecture notes

- `src/lib/motion.ts` — central GSAP setup: word splitting, scramble, magnetic
  elements, reduced-motion detection.
- `src/lib/scroll.ts` — Lenis singleton + ScrollTrigger sync.
- `src/components/PageTransition.tsx` — shared route-transition overlay;
  use `TransitionLink` / `useTransitionNav()` instead of raw `<Link>`.
- Animations live inside `gsap.context()` scopes and are reverted on unmount;
  ScrollTriggers, RAF loops, observers and event listeners are always cleaned up.
- `prefers-reduced-motion` disables smooth scroll, the 3D loop, scrambles,
  transitions and heavy reveals. The custom cursor only mounts on fine pointers.
