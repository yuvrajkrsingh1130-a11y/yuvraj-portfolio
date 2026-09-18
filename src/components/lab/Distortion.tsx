import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { labControls } from "../../lib/labControls";
import CoverArt from "../CoverArt";
import { projects } from "../../data/projects";

/* 04 — IMAGE DISTORTION · hover → RGB-ish displacement of artwork */

export default function Distortion() {
  const [id] = useState(() => `dis-${Math.random().toString(36).slice(2, 8)}`);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const state = useRef({ s: 0, seed: 2 });
  const project = projects.find((p) => p.cover === "machines") ?? projects[0];

  const apply = () => {
    dispRef.current?.setAttribute("scale", state.current.s.toFixed(2));
    turbRef.current?.setAttribute("seed", String(Math.floor(state.current.seed)));
  };

  const go = (on: boolean) => {
    if (prefersReducedMotion() || labControls.paused) return;
    const target = on ? 26 + labControls.chaos * 48 : 0;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(state.current, {
      s: target,
      seed: on ? 14 : 2,
      duration: 0.6 / labControls.speed,
      ease: "power2.out",
      onUpdate: apply,
    });
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onPointerEnter={() => go(true)}
      onPointerLeave={() => go(false)}
      data-cursor="HOVER"
    >
      <svg width="0" height="0" aria-hidden="true">
        <filter id={id}>
          <feTurbulence ref={turbRef} type="turbulence" baseFrequency="0.012 0.02" numOctaves="1" result="n" seed="2" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="h-full w-full" style={{ filter: `url(#${id})` }}>
        <CoverArt project={project} className="h-full w-full" label="Distortion study" />
      </div>
      <span className="tiny-label absolute bottom-3 left-3 text-[var(--concrete)] mix-blend-difference">
        HOVER TO CORRUPT
      </span>
    </div>
  );
}
