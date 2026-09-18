# YUVRAJ SINGH — PORTFOLIO

NEO-BRUTALISM × SWISS EDITORIAL × 3D — functional chaos, brutalist grids,
precision typography. Built for **Yuvraj Singh**, Multidisciplinary Visual &
UI/UX Designer, Delhi, India.

## Stack

- Vite + React 19 + TypeScript
- Lenis.js (smooth momentum scrolling, wired into GSAP's ticker)
- GSAP + ScrollTrigger (page transitions, reveals, marquees, counters)
- Three.js / WebGL (interactive chrome emblem — GPU simplex displacement,
  reacts to cursor + scroll velocity, zero texture downloads)
- Tailwind CSS 4 + a custom neo-brutalist design system
- react-router (code-split pages)

## Design tokens

| Token        | Value                                    |
| ------------ | ---------------------------------------- |
| Obsidian     | `#0A0A0A`                                |
| Concrete     | `#F4F4F0`                                |
| Acid green   | `#CCFF00`                                |
| Warning orange | `#FF4D00`                              |
| Borders      | `2.5px solid`, radius `0`                |
| Shadows      | `4px 4px 0 0` hard offset, zero blur     |
| Display type | Syne (800) · Mono metadata: Space Mono   |

## Pages

| Route         | Page                                                            |
| ------------- | --------------------------------------------------------------- |
| `/`           | Home — hero + 3D emblem, skill ticker, works slider, philosophy bento |
| `/work`       | Projects archive — pill filters + bento grid with wireframe hover overlays |
| `/work/:slug` | Data-driven project detail                                       |
| `/about`      | Identity card, studio manifest, toolkit blocks, experience timeline |
| `/services`   | Capabilities blocks + workflow accordion (01 Research → 04 Production) |
| `/lab`        | Six live experiments + monospace inspector (FPS, speed/chaos controls, notes) |
| `/contact`    | LET'S BUILD SOMETHING UNIGNORABLE — brutalist form + direct channels |

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/ (vercel.json handles SPA rewrites)
```

## Replace the placeholder content

Everything editable lives in `src/data/`:

- `projects.ts` — titles, categories, years, tech stacks, prototype links,
  copy, bento spans. Home, Work and Project detail all read from here.
- `site.ts` — name, role, email, socials, philosophy lines, toolkit groups,
  experience timeline.
- `services.ts` — capability blocks and workflow steps.

Placeholder artwork is generated SVG (`src/components/CoverArt.tsx`) — swap
its output for real `<img>` tags when projects ship; layouts won't care. The
contact form drafts a `mailto:`; wire any form endpoint in
`src/pages/Contact.tsx`.

## Architecture notes

- `src/lib/motion.ts` — central GSAP setup (word split, scramble, magnetic
  elements, reduced-motion detection).
- `src/lib/scroll.ts` — Lenis singleton + ScrollTrigger sync.
- `src/lib/labControls.ts` — mutable store the Lab inspector writes and every
  experiment reads each frame.
- `src/components/PageTransition.tsx` — shared route-transition overlay; use
  `TransitionLink` / `useTransitionNav()` instead of raw `<Link>`.
- Animations live inside `gsap.context()` scopes and revert on unmount;
  ScrollTriggers, RAF loops, observers and listeners are always cleaned up.
- `prefers-reduced-motion` disables smooth scroll, the WebGL loop, scrambles
  and heavy reveals. The custom cursor only mounts on fine-pointer devices.
- WebGL scenes pause off-screen; lab components lazy-load; pages code-split.
