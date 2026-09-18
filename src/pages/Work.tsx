import { useLayoutEffect, useMemo, useRef, useState } from "react";
import CoverArt from "../components/CoverArt";
import { TransitionLink } from "../components/PageTransition";
import { projects, type ProjectCategory } from "../data/projects";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   WORK — full index. Rows invert on hover; a floating cover
   preview trails the pointer on desktop.
   ============================================================ */

const FILTERS: Array<{ label: string; value: ProjectCategory | "ALL" }> = [
  { label: "ALL", value: "ALL" },
  { label: "IDENTITY", value: "IDENTITY" },
  { label: "EDITORIAL", value: "EDITORIAL" },
  { label: "DIGITAL", value: "DIGITAL" },
  { label: "WEBSITE", value: "WEBSITE" },
  { label: "CAMPAIGN", value: "CAMPAIGN" },
  { label: "EXPERIMENTAL", value: "EXPERIMENTAL" },
];

function FloatingPreview({ active }: { active: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !prefersReducedMotion(),
    []
  );

  useLayoutEffect(() => {
    if (!fine) return;
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const rTo = gsap.quickTo(el, "rotate", { duration: 0.5, ease: "power3.out" });
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 120);
      rTo(Math.max(-7, Math.min(7, (e.clientX - lastX) * 0.6)));
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine]);

  if (!fine) return null;
  const project = projects[active];
  if (!project) return null;

  return (
    <div
      ref={ref}
      className={`pointer-events-none fixed left-0 top-0 z-[95] hidden w-[300px] transition-opacity duration-300 md:block ${
        active >= 0 ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="aspect-[4/3] w-full overflow-hidden border border-[var(--line-strong)] shadow-[8px_8px_0_var(--ink)]">
        <CoverArt project={project} className="h-full w-full" />
      </div>
    </div>
  );
}

export default function Work() {
  usePageTitle("WORK — YUVRAJ SINGH");
  const [filter, setFilter] = useState<ProjectCategory | "ALL">("ALL");
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => (filter === "ALL" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-work-entry]",
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "power3.out" }
      );
    }, el);
    return () => ctx.revert();
  }, [filter]);

  return (
    <div className="px-[var(--pad)] pb-24 pt-[calc(var(--nav-h)+3rem)]">
      <FloatingPreview active={active} />

      {/* header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
        <h1 className="display text-[clamp(4rem,16vw,15rem)] leading-[0.8]">
          WORK
          <sup className="mono ml-4 align-super text-[clamp(1rem,3vw,2rem)] text-[var(--accent)]">
            ({String(visible.length).padStart(2, "0")})
          </sup>
        </h1>
        <p className="tiny-label max-w-[16rem] pb-4 opacity-60">
          SELECTED PROJECTS 2025—2026. PLACEHOLDER BRIEFS, REAL CRAFT.
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
            onClick={() => {
              setFilter(f.value);
              setActive(-1);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* index */}
      <div ref={listRef} onMouseLeave={() => setActive(-1)}>
        {visible.map((p, i) => (
          <TransitionLink
            key={`${filter}-${p.slug}`}
            to={`/work/${p.slug}`}
            data-cursor="VIEW"
            data-work-entry
            className="work-row group grid grid-cols-12 items-center gap-y-2"
            onMouseEnter={() => setActive(projects.indexOf(p))}
          >
            <span className="mono col-span-2 text-xs opacity-60 md:col-span-1">{p.index}</span>
            <span className="col-span-10 md:col-span-6">
              <span className="row-title display block text-[clamp(2rem,5.6vw,4.6rem)]">
                {p.title}
              </span>
            </span>
            <span className="tiny-label col-span-6 opacity-60 md:col-span-3">
              {p.categoryLabel}
            </span>
            <span className="tiny-label col-span-3 text-right md:col-span-1">{p.year}</span>
            <span className="row-view mono col-span-3 hidden text-right text-xs md:col-span-1 md:block">
              VIEW →
            </span>
            {/* mobile preview */}
            <span className="col-span-12 mt-3 block border border-[var(--line)] md:hidden">
              <CoverArt project={p} className="aspect-[16/9] w-full" />
            </span>
            {i === visible.length - 1 && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--line-strong)]" aria-hidden="true" />
            )}
          </TransitionLink>
        ))}
      </div>

      <p className="tiny-label mt-10 opacity-50">
        * ALL PROJECTS ARE PLACEHOLDERS UNTIL THE REAL BRIEFS LAND — SWAP THEM IN src/data/projects.ts
      </p>
    </div>
  );
}
