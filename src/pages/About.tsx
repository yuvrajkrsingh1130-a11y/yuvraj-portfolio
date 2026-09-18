import { useLayoutEffect, useRef } from "react";
import CTA from "../components/CTA";
import SectionLabel from "../components/SectionLabel";
import { skills, site } from "../data/site";
import { attachMagnetic, gsap, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   ABOUT — short, confident. No corporate biography.
   ============================================================ */

const blocks = [
  {
    k: "WHO I AM",
    v: "YUVRAJ SINGH — A DESIGNER WHO SHIPS CODE AND A DEVELOPER WHO THINKS IN LAYOUTS. I SIT IN THE GAP BETWEEN THE TWO, WHICH IS WHERE THE INTERESTING STUFF HAPPENS.",
  },
  {
    k: "WHAT I DO",
    v: "GRAPHIC DESIGN, BRAND IDENTITIES, WEB DESIGN AND CREATIVE DEVELOPMENT. VISUAL THINKING, BUILT WITH CODE AND MOTION.",
  },
  {
    k: "HOW I WORK",
    v: "SMALL MOVES, LOUD RESULTS. TYPE FIRST, GRID ALWAYS, MOTION WITH A REASON. NOTHING DECORATIVE THAT DOESN'T ALSO WORK.",
  },
  {
    k: "WHAT I LIKE TO BUILD",
    v: "IDENTITIES WITH A SPINE. WEBSITES THAT REACT. POSTERS THAT SHOUT. EXPERIMENTS THAT TEACH ME SOMETHING BY FRIDAY.",
  },
];

function SkillRows() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: { trigger: row, start: "top 90%" },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      {skills.map((s, i) => (
        <div
          key={s.name}
          className="skill-row group relative isolate overflow-hidden border-t border-[var(--line-strong)] py-6 md:py-8"
          data-cursor="SKILL"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 px-1">
            <span className="mono text-xs opacity-50">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="skill-name display flex-1 text-center text-[clamp(2rem,6.6vw,5.6rem)] leading-[0.9]">
              {s.name}
            </h3>
            <span className="mono hidden max-w-[16rem] text-right text-[10px] leading-relaxed opacity-0 transition-opacity duration-300 group-hover:opacity-70 md:block">
              {s.description}
            </span>
          </div>
          {/* mobile description */}
          <p className="mono mt-2 px-1 text-[10px] opacity-50 md:hidden">{s.description}</p>
        </div>
      ))}
      <div className="border-t border-[var(--line-strong)]" />
    </div>
  );
}

export default function About() {
  usePageTitle("ABOUT — YUVRAJ SINGH");
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const detach = attachMagnetic(el);
    if (prefersReducedMotion()) return () => detach();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-rise]",
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }
      );
      gsap.utils.toArray<HTMLElement>("[data-about-block]").forEach((b) => {
        gsap.fromTo(
          b,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: b, start: "top 85%" },
          }
        );
      });
    }, el);
    return () => {
      ctx.revert();
      detach();
    };
  }, []);

  return (
    <div ref={ref} className="px-[var(--pad)] pb-24 pt-[calc(var(--nav-h)+3rem)]">
      {/* opener */}
      <div className="mb-20 md:mb-28">
        <p data-about-rise className="tiny-label mb-8 text-[var(--accent)]">
          [ ABOUT — NO CORPORATE BIOGRAPHY INSIDE ]
        </p>
        <h1 data-about-rise className="display text-[clamp(3.2rem,12.5vw,12rem)] leading-[0.84]">
          HI, I'M
          <br />
          YUVRAJ<span className="text-[var(--accent)]">.</span>
        </h1>
        <p data-about-rise className="mono mt-8 text-xs opacity-70 md:text-sm">
          {site.role}
        </p>
        <p data-about-rise className="mt-10 max-w-2xl text-lg leading-relaxed opacity-80 md:text-2xl">
          I work across graphic design, branding, web design and creative development — combining
          visual thinking with code and motion to create distinctive digital experiences.
        </p>
      </div>

      {/* blocks */}
      <div className="mb-24">
        {blocks.map((b, i) => (
          <div
            key={b.k}
            data-about-block
            className="grid grid-cols-12 gap-y-4 border-t border-[var(--line-strong)] py-8 md:py-10"
          >
            <p className="tiny-label col-span-12 md:col-span-3">
              <span className="text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span> — {b.k}
            </p>
            <p className="display col-span-12 text-[clamp(1.3rem,3.2vw,2.6rem)] leading-[1.05] md:col-span-9">
              {b.v}
            </p>
          </div>
        ))}
        <div className="border-t border-[var(--line-strong)]" aria-hidden="true" />
      </div>

      {/* skills */}
      <SectionLabel index="05" className="mb-10">
        SKILLS — HOVER TO STRESS-TEST THEM
      </SectionLabel>
      <SkillRows />

      <div className="mt-20 flex flex-wrap items-center justify-between gap-8">
        <p className="tiny-label max-w-[22rem] opacity-50">
          DESIGN + CODE + MOTION — THAT'S THE WHOLE PITCH.
        </p>
        <CTA to="/contact" accent>
          LET'S WORK TOGETHER
        </CTA>
      </div>
    </div>
  );
}
