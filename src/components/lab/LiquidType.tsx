import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

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

  const go = (f: number, s: number) => {
    if (prefersReducedMotion()) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(state.current, { f, s, duration: 0.7, ease: "power2.out", onUpdate: apply });
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[var(--ink)] text-[var(--paper)]"
      onPointerEnter={() => go(0.012, 34)}
      onPointerLeave={() => go(0, 0)}
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
