import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { labControls } from "../../lib/labControls";

/* 01 — LIQUID TYPE · hover → letters distort via SVG displacement */

export default function LiquidType() {
  const [id] = useState(() => `liq-${Math.random().toString(36).slice(2, 8)}`);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const state = useRef({ f: 0, s: 0 });

  const apply = () => {
    turbRef.current?.setAttribute("baseFrequency", `${state.current.f.toFixed(4)} ${state.current.f.toFixed(4)}`);
    dispRef.current?.setAttribute("scale", state.current.s.toFixed(2));
  };

  const go = (on: boolean) => {
    if (prefersReducedMotion() || labControls.paused) return;
    const s = on ? 18 + labControls.chaos * 38 : 0;
    const f = on ? 0.008 + labControls.chaos * 0.01 : 0;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(state.current, {
      f,
      s,
      duration: 0.7 / labControls.speed,
      ease: "power2.out",
      onUpdate: apply,
    });
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[var(--ink)] text-[var(--concrete)]"
      onPointerEnter={() => go(true)}
      onPointerLeave={() => go(false)}
      data-cursor="HOVER"
    >
      <svg width="0" height="0" aria-hidden="true">
        <filter id={id}>
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0 0" numOctaves="2" result="noise" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="0" />
        </filter>
      </svg>
      <p
        className="display select-none text-[clamp(3rem,8vw,6.5rem)]"
        style={{ filter: `url(#${id})` }}
        aria-hidden="true"
      >
        LIQUID
      </p>
      <span className="sr-only">Liquid type — letters distort while hovering</span>
    </div>
  );
}
