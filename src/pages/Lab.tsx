import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { labIntro } from "../data/site";
import { labControls, resetLabControls } from "../lib/labControls";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   LAB / PLAYGROUND — experiments + monospace inspector panel
   (FPS, canvas controls, concept notes).
   ============================================================ */

const LiquidType = lazy(() => import("../components/lab/LiquidType"));
const ParticleField = lazy(() => import("../components/lab/ParticleField"));
const OrbitObject = lazy(() => import("../components/lab/OrbitObject"));
const Distortion = lazy(() => import("../components/lab/Distortion"));
const TypeStretch = lazy(() => import("../components/lab/TypeStretch"));
const DotField = lazy(() => import("../components/lab/DotField"));

interface Experiment {
  n: string;
  title: string;
  hint: string;
  desc: string;
  notes: string;
  el: React.ReactNode;
}

const experiments: Experiment[] = [
  {
    n: "01",
    title: "LIQUID TYPE",
    hint: "HOVER → DISTORT",
    desc: "SVG turbulence field melting a display face.",
    notes: "feTurbulence + feDisplacementMap driven by pointer state. CHAOS raises displacement scale; SPEED changes melt rate.",
    el: <LiquidType />,
  },
  {
    n: "02",
    title: "PARTICLE FIELD",
    hint: "MOVE → SCATTER",
    desc: "A formation of dots holding shape until provoked.",
    notes: "Canvas 2d, ~250 particles with home-springs and pointer repulsion. CHAOS widens the repulsion radius.",
    el: <ParticleField />,
  },
  {
    n: "03",
    title: "ORBIT OBJECT",
    hint: "MOVE → ROTATE",
    desc: "A live procedural mesh — the hero emblem's sibling.",
    notes: "WebGL icosahedron with simplex displacement on the GPU. Pointer feeds rotation + bulge; SPEED multiplies response.",
    el: <OrbitObject />,
  },
  {
    n: "04",
    title: "IMAGE DISTORTION",
    hint: "HOVER → CORRUPT",
    desc: "Displacement maps doing bad things to artwork.",
    notes: "Single-pass SVG displacement over generated cover art. CHAOS controls corruption intensity.",
    el: <Distortion />,
  },
  {
    n: "05",
    title: "TYPE STRETCH",
    hint: "HOVER → PULL",
    desc: "A variable font's width and weight axes, abused.",
    notes: "Syne's wdth/wght axes animated with elastic easing. CHAOS pushes the stretch further; SPEED changes snap-back.",
    el: <TypeStretch />,
  },
  {
    n: "06",
    title: "DOT FIELD",
    hint: "MOVE → BEND",
    desc: "A rigid grid learning to flow around the pointer.",
    notes: "Canvas grid with distance-based displacement and a slow wave. CHAOS widens the bend; SPEED drives the wave.",
    el: <DotField />,
  },
];

/* ---------------- FPS meter ---------------- */

function FpsMeter() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let last = performance.now();
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      frames++;
      if (t - last >= 500) {
        const fps = Math.round((frames * 1000) / (t - last));
        if (ref.current) ref.current.textContent = String(Math.min(fps, 120));
        frames = 0;
        last = t;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span ref={ref} className="text-[var(--acid)]">
      --
    </span>
  );
}

/* ---------------- inspector ---------------- */

function Inspector({ exp }: { exp: Experiment }) {
  const [speed, setSpeed] = useState(labControls.speed);
  const [chaos, setChaos] = useState(labControls.chaos);
  const [paused, setPaused] = useState(labControls.paused);

  useEffect(() => {
    labControls.speed = speed;
  }, [speed]);
  useEffect(() => {
    labControls.chaos = chaos;
  }, [chaos]);
  useEffect(() => {
    labControls.paused = paused;
  }, [paused]);

  return (
    <aside className="border-[2.5px] border-[var(--ink)] bg-[var(--ink)] text-[var(--concrete)] shadow-[7px_7px_0_0_var(--acid)]" aria-label="Experiment inspector">
      <div className="flex items-center justify-between border-b-[2.5px] border-[var(--concrete)] px-5 py-3">
        <p className="tiny-label text-[var(--acid)]">INSPECTOR.EXE</p>
        <p className="mono text-[10px] opacity-70">EXP/{exp.n}</p>
      </div>

      <div className="space-y-5 p-5 font-mono">
        <div>
          <p className="display text-2xl text-[var(--concrete)]">{exp.title}</p>
          <p className="mt-2 text-[11px] leading-relaxed opacity-70">{exp.notes}</p>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-px bg-[var(--concrete)] text-center">
          <div className="bg-[var(--ink)] p-3">
            <p className="text-[9px] opacity-60">FPS</p>
            <p className="text-lg font-bold"><FpsMeter /></p>
          </div>
          <div className="bg-[var(--ink)] p-3">
            <p className="text-[9px] opacity-60">STATE</p>
            <p className={`text-lg font-bold ${paused ? "text-[var(--orange)]" : "text-[var(--acid)]"}`}>
              {paused ? "PAUSED" : "LIVE"}
            </p>
          </div>
          <div className="bg-[var(--ink)] p-3">
            <p className="text-[9px] opacity-60">CANVAS</p>
            <p className="text-lg font-bold">60HZ</p>
          </div>
        </div>

        {/* controls */}
        <label className="block text-[11px]">
          <span className="flex justify-between">
            SPEED <span>{speed.toFixed(2)}x</span>
          </span>
          <input
            type="range"
            min={0.2}
            max={2}
            step={0.05}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="mt-2 w-full accent-[#ccff00]"
            aria-label="Experiment speed"
          />
        </label>
        <label className="block text-[11px]">
          <span className="flex justify-between">
            CHAOS <span>{Math.round(chaos * 100)}%</span>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={chaos}
            onChange={(e) => setChaos(Number(e.target.value))}
            className="mt-2 w-full accent-[#ff4d00]"
            aria-label="Experiment chaos"
          />
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className={`flex-1 border-[2.5px] border-[var(--concrete)] px-3 py-2 text-[11px] font-bold transition-colors hover:bg-[var(--acid)] hover:text-[var(--ink)] ${
              paused ? "bg-[var(--orange)] text-[var(--ink)]" : ""
            }`}
          >
            {paused ? "▶ RESUME" : "⏸ PAUSE"}
          </button>
          <button
            type="button"
            onClick={() => {
              resetLabControls();
              setSpeed(labControls.speed);
              setChaos(labControls.chaos);
              setPaused(false);
            }}
            className="flex-1 border-[2.5px] border-[var(--concrete)] px-3 py-2 text-[11px] font-bold transition-colors hover:bg-[var(--acid)] hover:text-[var(--ink)]"
          >
            ↺ RESET
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- page ---------------- */

export default function Lab() {
  usePageTitle("LAB — YUVRAJ SINGH");
  const headRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);

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
        <p data-lab-rise className="tiny-label mb-6 inline-block bg-[var(--orange)] px-2 py-1 text-[var(--ink)]">
          [ PLAYGROUND — NOT CLIENT WORK ]
        </p>
        <h1 data-lab-rise className="display text-[clamp(3.2rem,13vw,12rem)] leading-[0.85]">
          LAB<span className="text-[var(--orange)]">/</span>
          <span className="bg-[var(--acid)] px-2">006</span>
        </h1>
        <p data-lab-rise className="mono mt-8 max-w-2xl text-xs leading-relaxed opacity-80 md:text-sm">
          {labIntro}
        </p>
      </div>

      {/* grid + inspector */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div data-lab-grid className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {experiments.map((x, i) => (
            <div
              key={x.n}
              data-lab-cell
              role="button"
              tabIndex={0}
              aria-selected={selected === i}
              aria-label={`Select experiment ${x.title}`}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(i);
                }
              }}
              className="lab-cell cursor-pointer text-left"
            >
              <div className="lab-stage">
                <Suspense fallback={<div className="h-full w-full bg-[var(--ink)] opacity-10" />}>
                  {x.el}
                </Suspense>
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h2 className="display text-2xl md:text-3xl">
                    <span className="mono mr-3 align-middle text-xs text-[var(--orange)]">{x.n}</span>
                    {x.title}
                  </h2>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed opacity-60">{x.desc}</p>
                </div>
                <span className="tiny-label shrink-0 border-[2.5px] border-[var(--ink)] bg-[var(--acid)] px-2 py-1">
                  {x.hint}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start">
          <Inspector key={selected} exp={experiments[selected]} />
        </div>
      </div>

      <p className="tiny-label mt-12 opacity-60">
        * NEW EXPERIMENTS LAND HERE FIRST. BROKEN ON PURPOSE, FIXED ON PURPOSE.
      </p>
    </div>
  );
}
