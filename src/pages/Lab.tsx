import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { labIntro } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   LAB — experiments in type, code & motion. Heavy components
   are lazy-loaded so the page itself stays instant.
   ============================================================ */

const LiquidType = lazy(() => import("../components/lab/LiquidType"));
const ParticleField = lazy(() => import("../components/lab/ParticleField"));
const OrbitObject = lazy(() => import("../components/lab/OrbitObject"));
const Distortion = lazy(() => import("../components/lab/Distortion"));
const TypeStretch = lazy(() => import("../components/lab/TypeStretch"));
const DotField = lazy(() => import("../components/lab/DotField"));

const experiments = [
  {
    n: "01",
    title: "LIQUID TYPE",
    hint: "HOVER → DISTORT",
    desc: "SVG turbulence field melting a display face.",
    el: <LiquidType />,
  },
  {
    n: "02",
    title: "PARTICLE FIELD",
    hint: "MOVE → SCATTER",
    desc: "Two hundred dots holding formation until provoked.",
    el: <ParticleField />,
  },
  {
    n: "03",
    title: "ORBIT OBJECT",
    hint: "MOVE → ROTATE",
    desc: "A live procedural mesh, one of the hero's siblings.",
    el: <OrbitObject />,
  },
  {
    n: "04",
    title: "IMAGE DISTORTION",
    hint: "HOVER → CORRUPT",
    desc: "Displacement maps doing bad things to artwork.",
    el: <Distortion />,
  },
  {
    n: "05",
    title: "TYPE STRETCH",
    hint: "HOVER → PULL",
    desc: "A variable font's width and weight axes, abused.",
    el: <TypeStretch />,
  },
  {
    n: "06",
    title: "DOT FIELD",
    hint: "MOVE → BEND",
    desc: "A rigid grid learning to flow around the pointer.",
    el: <DotField />,
  },
];

export default function Lab() {
  usePageTitle("LAB — YUVRAJ SINGH");
  const headRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = headRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-lab-rise]",
        { y: 46, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: "power3.out" }
      );
      gsap.fromTo(
        "[data-lab-cell]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-lab-grid]", start: "top 80%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={headRef} className="px-[var(--pad)] pb-24 pt-[calc(var(--nav-h)+3rem)]">
      {/* header */}
      <div className="mb-14">
        <p data-lab-rise className="tiny-label mb-6 text-[var(--accent)]">
          [ EXPERIMENTS — NOT CLIENT WORK ]
        </p>
        <h1 data-lab-rise className="display text-[clamp(3.6rem,14vw,13rem)] leading-[0.82]">
          LAB<span className="text-[var(--accent)]">/</span>
          <span className="text-outline">006</span>
        </h1>
        <p data-lab-rise className="mono mt-8 max-w-2xl text-xs leading-relaxed opacity-70 md:text-sm">
          {labIntro}
        </p>
      </div>

      {/* grid */}
      <div data-lab-grid className="grid grid-cols-1 md:grid-cols-2 [column-gap:0px]">
        {experiments.map((x, i) => (
          <article
            key={x.n}
            data-lab-cell
            className={`lab-cell ${i % 2 === 0 ? "md:border-r-0" : ""} ${i > 1 ? "md:border-t-0" : ""} -mt-px md:-ml-px`}
          >
            <div className="lab-stage">
              <Suspense fallback={<div className="h-full w-full animate-pulse bg-[var(--ink)] opacity-10" />}>
                {x.el}
              </Suspense>
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h2 className="display text-2xl md:text-3xl">
                  <span className="mono mr-3 text-xs text-[var(--accent)] align-middle">{x.n}</span>
                  {x.title}
                </h2>
                <p className="mt-2 max-w-xs text-xs leading-relaxed opacity-60">{x.desc}</p>
              </div>
              <p className="tiny-label shrink-0 border border-[var(--line-strong)] px-2 py-1 text-[var(--accent)]">
                {x.hint}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="tiny-label mt-12 opacity-50">
        * NEW EXPERIMENTS LAND HERE FIRST. BROKEN ON PURPOSE, FIXED ON PURPOSE.
      </p>
    </div>
  );
}
