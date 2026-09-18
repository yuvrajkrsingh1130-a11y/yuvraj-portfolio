import { useEffect, useLayoutEffect, useRef } from "react";
import HeroScene from "../components/HeroScene";
import CoverArt from "../components/CoverArt";
import CTA from "../components/CTA";
import Marquee from "../components/Marquee";
import SectionLabel from "../components/SectionLabel";
import { TransitionLink } from "../components/PageTransition";
import { projects, featuredProject } from "../data/projects";
import { site } from "../data/site";
import { gsap, splitWords, attachMagnetic, prefersReducedMotion } from "../lib/motion";
import { usePageTitle, useIsDesktop } from "../lib/hooks";

/* ============================================================
   HOME
   ============================================================ */

function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      /* entrance — starts while the preloader retracts */
      const intro = gsap.timeline({ delay: 0.25 });
      if (!reduced) {
        intro
          .fromTo(
            "[data-hero-line]",
            { yPercent: 112 },
            { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.09 }
          )
          .fromTo(
            "[data-hero-meta]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07 },
            "-=0.6"
          )
          .fromTo(
            "[data-hero-canvas]",
            { opacity: 0, scale: 0.86 },
            { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
            "-=0.9"
          )
          .fromTo(
            "[data-hero-badge]",
            { opacity: 0, scale: 0.6, rotate: -40 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" },
            "-=1"
          );
      }

      /* scroll exit — controlled parallax, nothing aggressive */
      if (!reduced) {
        gsap.to("[data-hero-copy]", {
          yPercent: -26,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-canvas]", {
          yPercent: 14,
          scale: 0.9,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* pointer parallax on the type block */
      let detach = () => {};
      if (!reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const copy = el.querySelector<HTMLElement>("[data-hero-copy]");
        const badge = el.querySelector<HTMLElement>("[data-hero-badge]");
        if (copy) {
          const xTo = gsap.quickTo(copy, "x", { duration: 0.9, ease: "power3.out" });
          const yTo = gsap.quickTo(copy, "y", { duration: 0.9, ease: "power3.out" });
          const bxTo = badge ? gsap.quickTo(badge, "x", { duration: 1.2, ease: "power3.out" }) : null;
          const byTo = badge ? gsap.quickTo(badge, "y", { duration: 1.2, ease: "power3.out" }) : null;
          const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            xTo(nx * -12);
            yTo(ny * -8);
            bxTo?.(nx * 22);
            byTo?.(ny * 16);
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
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]">
      {/* faint vertical grid */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* coordinates */}
      <p className="tiny-label absolute left-[var(--pad)] top-[calc(var(--nav-h)+1rem)] opacity-50" aria-hidden="true">
        N 28.61° / E 77.20°
      </p>
      <p className="tiny-label absolute right-[var(--pad)] top-[calc(var(--nav-h)+1rem)] opacity-50" aria-hidden="true">
        SYS.01 — HERO
      </p>

      {/* 3D object */}
      <HeroScene
        className="pointer-events-none absolute -right-[14%] top-[16%] z-0 h-[62vh] w-[78vw] opacity-90 md:right-[-4%] md:top-[10%] md:h-[76vh] md:w-[52vw]"
        data-hero-canvas=""
      />

      {/* rotating badge */}
      <div
        data-hero-badge
        className="absolute right-[10%] top-[18%] z-10 hidden h-36 w-36 md:block lg:right-[16%]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_16s_linear_infinite]">
          <defs>
            <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-[var(--ink)]" style={{ fontSize: "9.2px", fontFamily: "var(--font-mono)", letterSpacing: "2.6px" }}>
            <textPath href="#badge-circle">DESIGN × CODE × MOTION × DESIGN ×</textPath>
          </text>
        </svg>
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)]" />
      </div>

      {/* title */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-[var(--pad)]" data-hero-copy>
        <h1 className="display text-[clamp(4.2rem,17.5vw,16.5rem)]">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">YUVRAJ</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block pl-[0.35em]">
              SINGH<span className="text-[var(--accent)]">*</span>
            </span>
          </span>
        </h1>
        <div data-hero-meta className="mono mt-8 flex max-w-xl items-center gap-4 text-[11px] md:text-xs">
          <span className="h-2 w-2 bg-[var(--accent)]" aria-hidden="true" />
          <p>{site.role}</p>
        </div>
      </div>

      {/* bottom meta */}
      <div className="relative z-10 flex items-end justify-between gap-4 px-[var(--pad)] pb-8" data-hero-meta>
        <p className="tiny-label max-w-[10rem] opacity-60">
          GRAPHIC DESIGN / BRAND / WEB / CODE — SELECTED WORKS 01–06
        </p>
        <div className="flex flex-col items-center gap-2" aria-hidden="true">
          <span className="tiny-label opacity-60">SCROLL</span>
          <span className="relative block h-12 w-px overflow-hidden bg-[var(--line)]">
            <span className="hero-scroll-dash absolute left-0 top-0 h-4 w-px bg-[var(--ink)]" />
          </span>
        </div>
        <p className="tiny-label text-right opacity-60">
          PORTFOLIO
          <br />
          2026 EDITION
        </p>
      </div>

      <style>{`
        .hero-scroll-dash { animation: dash-drop 1.6s var(--ease-inout) infinite; }
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

/* ---------------- intro statement ---------------- */

function IntroStatement() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    const target = el.querySelector<HTMLElement>("[data-statement]");
    if (!target) return;
    const words = splitWords(target);

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.set(words, { opacity: 0.14, y: 8 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.35,
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.4 },
        });
        /* two counter-drifting words */
        gsap.to("[data-drift-left]", {
          xPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.to("[data-drift-right]", {
          xPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden px-[var(--pad)] py-28 md:py-40">
      <p className="tiny-label mb-10 opacity-50">[ STATEMENT ]</p>
      <p
        data-statement
        className="display max-w-[16ch] text-[clamp(2.2rem,6.4vw,6.2rem)] leading-[0.95]"
      >
        I DESIGN <span data-drift-left className="inline-block text-[var(--accent)]">VISUAL IDENTITIES</span>,
        DIGITAL EXPERIENCES AND INTERACTIVE WEBSITES THAT BLEND{" "}
        <span data-drift-right className="inline-block">GRAPHIC DESIGN</span> WITH{" "}
        <em className="not-italic underline decoration-[var(--accent)] decoration-[0.08em] underline-offset-[0.14em]">
          CODE
        </em>
        .
      </p>
    </section>
  );
}

/* ---------------- selected work ---------------- */

function WorkFigure({ index }: { index: number }) {
  const project = projects[index];
  const even = index % 2 === 0;
  return (
    <TransitionLink
      to={`/work/${project.slug}`}
      data-cursor="VIEW"
      className={`work-item group relative mb-20 grid grid-cols-12 items-end gap-y-6 md:mb-28 ${
        even ? "" : "md:mt-[-4rem]"
      }`}
    >
      <figure
        data-work-fig
        className={`relative col-span-12 overflow-hidden md:col-span-5 ${
          even ? "md:col-start-1" : "md:col-start-8 md:order-2"
        }`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden border border-[var(--line-strong)]">
          <div className="h-full w-full transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.045]">
            <CoverArt project={project} className="h-full w-full" />
          </div>
        </div>
        <figcaption className="tiny-label mt-3 flex justify-between opacity-60">
          <span>FIG.{project.index}</span>
          <span>{project.year}</span>
        </figcaption>
      </figure>

      <div className={`col-span-12 md:col-span-6 ${even ? "md:col-start-7" : "md:col-start-1 md:order-1"}`}>
        <p className="mono mb-3 text-xs opacity-60">
          {project.index} — {project.categoryLabel}
        </p>
        <h3 className="display text-[clamp(2.6rem,7vw,6rem)] transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-3">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">{project.description}</p>
        <p className="row-view mono mt-5 inline-block text-xs text-[var(--accent)]">
          VIEW PROJECT →
        </p>
      </div>

      {/* oversized ghost number */}
      <span
        aria-hidden="true"
        className={`display pointer-events-none absolute -top-10 z-[-1] text-[clamp(6rem,16vw,13rem)] leading-none opacity-[0.07] ${
          even ? "right-0" : "left-0"
        }`}
      >
        {project.index}
      </span>
    </TransitionLink>
  );
}

function SelectedWork() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".work-item").forEach((item, i) => {
        const fromX = i % 2 === 0 ? -48 : 48;
        gsap.fromTo(
          item,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
        const fig = item.querySelector("[data-work-fig]");
        if (fig) {
          gsap.fromTo(
            fig.firstElementChild,
            { clipPath: "inset(18% 8% 18% 8%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: item, start: "top 85%", end: "top 25%", scrub: true },
            }
          );
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-[var(--pad)] pb-10 pt-6">
      <SectionLabel index="01" className="mb-14">
        SELECTED WORK — 2025/26
      </SectionLabel>
      {projects.map((_, i) => (
        <WorkFigure key={i} index={i} />
      ))}
      <div className="mt-4 flex justify-end">
        <CTA to="/work">SEE ALL WORK</CTA>
      </div>
    </section>
  );
}

/* ---------------- featured project ---------------- */

function Featured() {
  const ref = useRef<HTMLElement>(null);
  const project = featuredProject;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.fromTo(
        "[data-feat-media]",
        { scale: 0.72, rotate: -3, yPercent: 6 },
        { scale: 1, rotate: 0, yPercent: 0, ease: "none" },
        0
      )
        .fromTo(
          "[data-feat-title]",
          { xPercent: 8 },
          { xPercent: -32, ease: "none" },
          0
        )
        .fromTo(
          "[data-feat-meta]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.45
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[230vh] bg-[var(--ink)] text-[var(--paper)]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <p className="tiny-label absolute left-[var(--pad)] top-24 text-[var(--accent)]">
          FEATURED — {project.index}/{String(projects.length).padStart(2, "0")}
        </p>

        <div data-feat-media className="relative mx-auto w-[min(86vw,1080px)]">
          <div className="aspect-[4/3] w-full overflow-hidden border border-[var(--line-inv)]">
            <CoverArt project={project} className="h-full w-full" />
          </div>
        </div>

        <h3
          data-feat-title
          className="display pointer-events-none absolute top-1/2 w-full -translate-y-1/2 whitespace-nowrap text-center text-[clamp(3.4rem,13vw,13rem)] text-transparent [-webkit-text-stroke:2px_var(--paper)]"
          aria-hidden="true"
        >
          {project.title}
        </h3>

        <div data-feat-meta className="absolute bottom-10 left-[var(--pad)] right-[var(--pad)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono mb-2 text-xs opacity-70">
              {project.categoryLabel} — {project.year}
            </p>
            <p className="max-w-md text-sm opacity-80">{project.description}</p>
          </div>
          <CTA to={`/work/${project.slug}`} fill>
            OPEN CASE STUDY
          </CTA>
        </div>
      </div>
    </section>
  );
}

/* ---------------- horizontal strip ---------------- */

const stripCards = [
  { n: "E1", t: "LIQUID TYPE", d: "LETTERS THAT MELT ON HOVER", to: "/lab" },
  { n: "E2", t: "PARTICLE FIELD", d: "A CROWD OF DOTS THAT FOLLOWS YOU", to: "/lab" },
  { n: "E3", t: "SOFT MACHINES", d: "CHROME FORMS, BREATHING ON THE GPU", to: "/work/soft-machines" },
  { n: "E4", t: "TYPE STRETCH", d: "VARIABLE FONTS, PULLED UNTIL THEY SNAP", to: "/lab" },
  { n: "E5", t: "SIGNAL FIELD", d: "SCROLL VELOCITY AS AN INSTRUMENT", to: "/work/signal-field" },
];

function HorizontalStrip() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !isDesktop || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const track = el.querySelector<HTMLElement>("[data-strip-track]");
      if (!track) return;
      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${getAmount()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to("[data-strip-progress]", {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${getAmount()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--paper)] md:h-[100svh]">
      <div className="flex h-full flex-col justify-center py-20 md:py-0">
        <div className="mb-10 flex items-center justify-between px-[var(--pad)]">
          <SectionLabel index="02" className="flex-1">
            FROM THE LAB — DRAG / SCROLL
          </SectionLabel>
        </div>

        <div
          data-strip-track
          className="no-scrollbar flex gap-6 overflow-x-auto px-[var(--pad)] pb-6 md:h-[46vh] md:overflow-visible md:pb-0"
        >
          {stripCards.map((c) => (
            <TransitionLink
              key={c.n}
              to={c.to}
              data-cursor="EXPLORE"
              className="group relative flex min-w-[76vw] flex-col justify-between border border-[var(--line-strong)] bg-[var(--bone)] p-6 transition-colors duration-500 hover:bg-[var(--ink)] hover:text-[var(--paper)] sm:min-w-[46vw] md:min-w-[30vw] lg:min-w-[26vw]"
            >
              <div className="flex items-start justify-between">
                <span className="mono text-xs opacity-60">{c.n}</span>
                <span className="mono transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div>
                <h3 className="display text-[clamp(1.8rem,3.4vw,3rem)]">{c.t}</h3>
                <p className="mono mt-3 text-[11px] opacity-60">{c.d}</p>
              </div>
              <span className="pointer-events-none absolute -bottom-6 -right-2 display text-[7rem] leading-none opacity-[0.06]" aria-hidden="true">
                {c.n.slice(1)}
              </span>
            </TransitionLink>
          ))}

          <div className="flex min-w-[40vw] items-center md:min-w-[22vw]">
            <CTA to="/lab">EXPLORE LAB</CTA>
          </div>
        </div>

        <div className="mx-[var(--pad)] mt-8 h-px bg-[var(--line)]">
          <div data-strip-progress className="h-full origin-left scale-x-0 bg-[var(--accent)] md:scale-x-[0.05]" />
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
    const detach = attachMagnetic(el);
    return detach;
  }, []);

  return (
    <section ref={ref} className="px-[var(--pad)] py-28 md:py-36">
      <Marquee speed={26} className="mb-16 border-y border-[var(--line-strong)] py-4">
        {[0, 1].map((n) => (
          <span key={n} className="display whitespace-nowrap px-6 text-[clamp(2rem,5vw,4.5rem)]">
            DESIGN × CODE × MOTION × DESIGN × CODE × MOTION ×
          </span>
        ))}
      </Marquee>
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <h2 className="display max-w-3xl text-[clamp(2.6rem,7.4vw,7rem)] leading-[0.9]">
          HAVE A PROJECT?
          <br />
          <span className="text-outline text-[var(--ink)]">LET'S MAKE IT</span>
          <br />
          MOVE<span className="text-[var(--accent)]">.</span>
        </h2>
        <CTA to="/contact" accent className="text-base md:px-10 md:py-6 md:text-lg">
          START A PROJECT
        </CTA>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("YUVRAJ SINGH — DESIGN × CODE × MOTION");

  return (
    <>
      <Hero />
      <IntroStatement />
      <SelectedWork />
      <Featured />
      <HorizontalStrip />
      <ClosingCTA />
    </>
  );
}
