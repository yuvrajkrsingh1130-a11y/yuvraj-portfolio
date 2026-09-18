import { useEffect, useLayoutEffect, useRef } from "react";
import HeroScene from "../components/HeroScene";
import CoverArt from "../components/CoverArt";
import CTA from "../components/CTA";
import Marquee from "../components/Marquee";
import SectionLabel from "../components/SectionLabel";
import { TransitionLink } from "../components/PageTransition";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { gsap, attachMagnetic, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   HOME — THE CANVAS
   ============================================================ */

const TICKER_TAGS = [
  "UI/UX DESIGN",
  "BRANDING",
  "POSTER ART",
  "WEB EXPERIMENTS",
  "THREE.JS",
  "GSAP MOTION",
  "DESIGN SYSTEMS",
  "ART DIRECTION",
];

function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 0.25 });
      if (!reduced) {
        intro
          .fromTo(
            "[data-hero-line]",
            { yPercent: 112 },
            { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.09 }
          )
          .fromTo(
            "[data-hero-meta]",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.07 },
            "-=0.55"
          )
          .fromTo(
            "[data-hero-canvas]",
            { opacity: 0, scale: 0.86, rotate: -6 },
            { opacity: 1, scale: 1, rotate: 0, duration: 1.3, ease: "power3.out" },
            "-=0.85"
          );
      }

      if (!reduced) {
        gsap.to("[data-hero-copy]", {
          yPercent: -24,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-canvas]", {
          yPercent: 16,
          scale: 0.88,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* pointer parallax */
      let detach = () => {};
      if (!reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const copy = el.querySelector<HTMLElement>("[data-hero-copy]");
        if (copy) {
          const xTo = gsap.quickTo(copy, "x", { duration: 0.9, ease: "power3.out" });
          const yTo = gsap.quickTo(copy, "y", { duration: 0.9, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            xTo(nx * -12);
            yTo(ny * -9);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          detach = () => window.removeEventListener("pointermove", onMove);
        }
      }
      return () => detach();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden border-b-[2.5px] border-[var(--ink)] pt-[var(--nav-h)]">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* coordinates / sys labels */}
      <p className="tiny-label absolute left-[var(--pad)] top-[calc(var(--nav-h)+1rem)] opacity-60" aria-hidden="true">
        {site.coords} — DELHI
      </p>
      <p className="tiny-label absolute right-[var(--pad)] top-[calc(var(--nav-h)+1rem)] opacity-60" aria-hidden="true">
        SYS.01 — THE CANVAS
      </p>

      {/* 3D emblem */}
      <HeroScene
        className="pointer-events-none absolute -right-[16%] top-[20%] z-0 h-[52vh] w-[74vw] md:right-[-2%] md:top-[12%] md:h-[72vh] md:w-[46vw]"
        data-hero-canvas=""
      />

      {/* headline */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-[var(--pad)]" data-hero-copy>
        <h1 className="display text-[clamp(3.4rem,14.5vw,13.5rem)]">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">DESIGN LOUD.</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              BUILD <span className="bg-[var(--acid)] px-2">RAW</span>.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              SHIP FAST<span className="text-[var(--orange)]">*</span>
            </span>
          </span>
        </h1>

        <div data-hero-meta className="mt-8 flex max-w-2xl flex-wrap items-center gap-3">
          <p className="mono border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] px-3 py-2 text-[11px] shadow-[4px_4px_0_0_var(--ink)] md:text-xs">
            {site.name} — {site.role}
          </p>
          <p className="mono border-[2.5px] border-[var(--ink)] bg-[var(--ink)] px-3 py-2 text-[11px] text-[var(--acid)] md:text-xs">
            {site.base}
          </p>
        </div>
      </div>

      {/* bottom strip */}
      <div className="relative z-10 flex items-end justify-between gap-4 px-[var(--pad)] pb-8" data-hero-meta>
        <p className="tiny-label max-w-[11rem] opacity-70">
          UI/UX × BRANDING × POSTERS × WEB EXPERIMENTS — SELECTED WORKS 01–09
        </p>
        <div className="flex flex-col items-center gap-2" aria-hidden="true">
          <span className="tiny-label opacity-70">SCROLL</span>
          <span className="relative block h-12 w-[3px] overflow-hidden border border-[var(--ink)] bg-transparent">
            <span className="hero-scroll-dash absolute left-0 top-0 h-4 w-full bg-[var(--orange)]" />
          </span>
        </div>
        <p className="tiny-label text-right opacity-70">
          PORTFOLIO
          <br />
          VOL.02 — 2026
        </p>
      </div>

      <style>{`
        .hero-scroll-dash { animation: dash-drop 1.5s var(--ease-inout) infinite; }
        @keyframes dash-drop {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(350%); }
          100% { transform: translateY(350%); }
        }
        @media (prefers-reduced-motion: reduce) { .hero-scroll-dash { animation: none; } }
      `}</style>
    </section>
  );
}

/* ---------------- skill ticker ---------------- */

function SkillTicker() {
  return (
    <div className="border-b-[2.5px] border-[var(--ink)] bg-[var(--ink)] py-3 text-[var(--acid)]">
      <Marquee speed={24}>
        {[0, 1].map((n) => (
          <span key={n} className="mono flex whitespace-nowrap text-sm font-bold tracking-[0.18em]">
            {TICKER_TAGS.map((t) => (
              <span key={t} className="flex items-center">
                <span className="px-5">{t}</span>
                <span className="text-[var(--orange)]" aria-hidden="true">✦</span>
              </span>
            ))}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ---------------- selected works slider ---------------- */

function WorksSlider() {
  const ref = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          "[data-slider-card]",
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 75%" },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  /* drag-to-scroll for desktop */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startLeft = slider.scrollLeft;
      slider.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      slider.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
    };
    slider.addEventListener("pointerdown", onDown);
    slider.addEventListener("pointermove", onMove);
    slider.addEventListener("pointerup", onUp);
    slider.addEventListener("pointercancel", onUp);
    return () => {
      slider.removeEventListener("pointerdown", onDown);
      slider.removeEventListener("pointermove", onMove);
      slider.removeEventListener("pointerup", onUp);
      slider.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section ref={ref} className="border-b-[2.5px] border-[var(--ink)] py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6 px-[var(--pad)]">
        <SectionLabel index="01" className="flex-1">
          SELECTED WORKS — DRAG / SCROLL
        </SectionLabel>
        <CTA to="/work" className="hidden md:inline-flex">SEE ALL WORK</CTA>
      </div>

      <div
        ref={sliderRef}
        className="no-scrollbar h-snap flex cursor-grab gap-6 overflow-x-auto px-[var(--pad)] pb-8 active:cursor-grabbing"
      >
        {projects.slice(0, 6).map((p) => (
          <TransitionLink
            key={p.slug}
            to={`/work/${p.slug}`}
            data-cursor="VIEW"
            data-slider-card
            className="bento-card group min-w-[78vw] max-w-[78vw] sm:min-w-[420px] sm:max-w-[420px]"
          >
            <div className="wire-overlay" aria-hidden="true" />
            <div className="relative aspect-[4/3] overflow-hidden border-b-[2.5px] border-[var(--ink)]">
              <CoverArt project={p} className="card-cover h-full w-full" />
              <span className="absolute left-3 top-3 z-[4] border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] px-2 py-1 font-mono text-[10px] font-bold">
                [{p.index}]
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
              <div>
                <h3 className="display text-3xl md:text-4xl">{p.title}</h3>
                <p className="mono mt-2 text-[11px] opacity-70">{p.categoryLabel}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="mono text-xs opacity-60">{p.year}</span>
                <span className="card-hover-info mono text-xs font-bold text-[var(--orange)]">
                  OPEN CASE ↗
                </span>
              </div>
            </div>
          </TransitionLink>
        ))}

        {/* end card */}
        <div className="flex min-w-[60vw] items-center justify-center sm:min-w-[320px]">
          <CTA to="/work" accent>
            FULL ARCHIVE
          </CTA>
        </div>
      </div>

      <div className="mt-2 flex justify-center px-[var(--pad)] md:hidden">
        <CTA to="/work">SEE ALL WORK</CTA>
      </div>
    </section>
  );
}

/* ---------------- stats / philosophy bento ---------------- */

const bentoCells = [
  {
    span: "md:col-span-2 md:row-span-2",
    bg: "bg-[var(--acid)]",
    body: (
      <>
        <p className="tiny-label mb-6">[ MANIFESTO ]</p>
        <p className="display text-[clamp(1.8rem,4vw,3.4rem)] leading-[0.95]">
          FUNCTIONAL CHAOS: SWISS GRIDS, BRUTAL ENERGY, ZERO FILLER.
        </p>
      </>
    ),
  },
  {
    span: "",
    bg: "bg-[var(--concrete)]",
    body: (
      <>
        <p className="mono text-xs opacity-60">DISCIPLINES</p>
        <p className="display mt-2 text-4xl">04</p>
        <p className="mono mt-2 text-[11px] opacity-70">UI/UX / GRAPHIC / BRAND / WEB</p>
      </>
    ),
  },
  {
    span: "",
    bg: "bg-[var(--ink)] text-[var(--concrete)]",
    body: (
      <>
        <p className="mono text-xs text-[var(--acid)]">RAPID PROTOTYPING</p>
        <p className="mt-3 text-sm leading-snug opacity-90">
          IDEA → CLICKABLE PROTOTYPE IN DAYS, NOT SPRINTS.
        </p>
      </>
    ),
  },
  {
    span: "",
    bg: "bg-[var(--orange)]",
    body: (
      <>
        <p className="mono text-xs">ART DIRECTION</p>
        <p className="mt-3 text-sm font-bold leading-snug">
          EXPERIMENTAL BY DEFAULT. SAFE IS A DESIGN SMELL.
        </p>
      </>
    ),
  },
  {
    span: "",
    bg: "bg-[var(--concrete)]",
    body: (
      <>
        <p className="mono text-xs opacity-60">BASE</p>
        <p className="display mt-2 text-2xl leading-none">DELHI, IST</p>
        <p className="mono mt-2 text-[11px] opacity-70">{site.coords}</p>
      </>
    ),
  },
];

function PhilosophyBento() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          "[data-bento]",
          { y: 46, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: "top 75%" },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="border-b-[2.5px] border-[var(--ink)] px-[var(--pad)] py-16 md:py-24">
      <SectionLabel index="02" className="mb-10">
        PHILOSOPHY & CAPABILITIES — MODULAR
      </SectionLabel>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:auto-rows-[190px]">
        {bentoCells.map((cell, i) => (
          <div
            key={i}
            data-bento
            className={`flex flex-col justify-between border-[2.5px] border-[var(--ink)] p-6 shadow-[5px_5px_0_0_var(--ink)] transition-transform duration-300 [transition-timing-function:var(--ease-expo)] hover:-translate-y-1 ${cell.span} ${cell.bg}`}
          >
            {cell.body}
          </div>
        ))}
        {/* CTA cell */}
        <div
          data-bento
          className="flex items-center justify-center border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] p-6 shadow-[5px_5px_0_0_var(--ink)]"
        >
          <CTA to="/about">ABOUT ME</CTA>
        </div>
      </div>
    </section>
  );
}

/* ---------------- closing CTA ---------------- */

function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return attachMagnetic(el);
  }, []);

  return (
    <section ref={ref} className="px-[var(--pad)] py-20 md:py-28">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <h2 className="display max-w-3xl text-[clamp(2.4rem,7vw,6.4rem)] leading-[0.9]">
          GOT A BRIEF?
          <br />
          <span className="text-outline text-[var(--ink)]">MAKE IT</span>{" "}
          <span className="bg-[var(--acid)] px-2">UNIGNORABLE</span>
          <span className="text-[var(--orange)]">.</span>
        </h2>
        <CTA to="/contact" accent className="text-base md:px-10 md:py-6 md:text-lg">
          START A PROJECT
        </CTA>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("YUVRAJ SINGH — MULTIDISCIPLINARY DESIGNER, DELHI");

  return (
    <>
      <Hero />
      <SkillTicker />
      <WorksSlider />
      <PhilosophyBento />
      <ClosingCTA />
    </>
  );
}
