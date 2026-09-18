import { useLayoutEffect, useMemo, useRef, useState } from "react";
import CoverArt from "../components/CoverArt";
import { TransitionLink } from "../components/PageTransition";
import { projects, type ProjectCategory } from "../data/projects";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   WORKS / PROJECTS ARCHIVE — brutalist pill filters + bento
   grid with wireframe hover overlays.
   ============================================================ */

const FILTERS: Array<{ label: string; value: ProjectCategory | "ALL" }> = [
  { label: "ALL", value: "ALL" },
  { label: "UI/UX", value: "UI/UX" },
  { label: "BRANDING & POSTERS", value: "BRANDING & POSTERS" },
  { label: "WEB EXPERIMENTS", value: "WEB EXPERIMENTS" },
];

const spanClass: Record<string, string> = {
  wide: "md:col-span-4",
  tall: "md:col-span-2 md:row-span-2",
  box: "md:col-span-2",
};

export default function Work() {
  usePageTitle("WORKS — YUVRAJ SINGH");
  const [filter, setFilter] = useState<ProjectCategory | "ALL">("ALL");
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => (filter === "ALL" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-bento-entry]",
        { y: 54, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: "power3.out" }
      );
    }, el);
    return () => ctx.revert();
  }, [filter]);

  return (
    <div className="px-[var(--pad)] pb-24 pt-[calc(var(--nav-h)+3rem)]">
      {/* header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <h1 className="display text-[clamp(3.2rem,13vw,12rem)] leading-[0.85]">
          WORKS
          <sup className="mono ml-3 align-super text-[clamp(1rem,2.6vw,1.8rem)] text-[var(--orange)]">
            [{String(visible.length).padStart(2, "0")}]
          </sup>
        </h1>
        <p className="tiny-label max-w-[17rem] border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] p-3 shadow-[4px_4px_0_0_var(--ink)]">
          PROJECT ARCHIVE 2024—2026. UI/UX, BRANDING, POSTERS & WEB EXPERIMENTS.
        </p>
      </div>

      {/* filters */}
      <div className="no-scrollbar mb-12 flex gap-3 overflow-x-auto pb-2" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className="chip shrink-0"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* bento grid */}
      <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[300px]">
        {visible.map((p) => (
          <TransitionLink
            key={`${filter}-${p.slug}`}
            to={`/work/${p.slug}`}
            data-cursor="OPEN"
            data-bento-entry
            className={`bento-card group ${spanClass[p.span]}`}
          >
            <div className="wire-overlay" aria-hidden="true" />

            {/* cover */}
            <div className="relative flex-1 overflow-hidden border-b-[2.5px] border-[var(--ink)]">
              <CoverArt project={p} className="card-cover h-full w-full" />
              <span className="absolute left-3 top-3 z-[4] border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] px-2 py-1 font-mono text-[10px] font-bold">
                [{p.index}]
              </span>
              <span className="absolute right-3 top-3 z-[4] border-[2.5px] border-[var(--ink)] bg-[var(--acid)] px-2 py-1 font-mono text-[10px] font-bold">
                {p.year}
              </span>
            </div>

            {/* meta */}
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="display text-2xl leading-none md:text-3xl">{p.title}</h2>
                <span className="mono mt-1 shrink-0 text-lg" aria-hidden="true">↗</span>
              </div>
              <p className="mono text-[11px] opacity-70">{p.categoryLabel}</p>

              {/* tech badges — revealed on hover for desktop */}
              <div className="card-hover-info flex flex-wrap gap-2">
                {p.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="border-2 border-[var(--ink)] bg-[var(--concrete)] px-1.5 py-0.5 font-mono text-[9px] font-bold"
                  >
                    {t}
                  </span>
                ))}
                {p.link && (
                  <span className="border-2 border-[var(--ink)] bg-[var(--orange)] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[var(--concrete)]">
                    LIVE PROTOTYPE ↗
                  </span>
                )}
              </div>
            </div>
          </TransitionLink>
        ))}
      </div>

      <p className="tiny-label mt-10 opacity-60">
        * PLACEHOLDER BRIEFS UNTIL THE REAL ONES LAND — EDIT src/data/projects.ts
      </p>
    </div>
  );
}
