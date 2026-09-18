import { useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

/* 05 — TYPE STRETCH · hover → variable font gets pulled wide */

export default function TypeStretch() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const state = useRef({ wdth: 78, wght: 750, skew: 0 });

  const apply = () => {
    const el = wordRef.current;
    if (!el) return;
    el.style.fontVariationSettings = `"wdth" ${state.current.wdth}, "wght" ${state.current.wght}`;
    el.style.transform = `skewX(${state.current.skew}deg)`;
  };

  const go = (wide: boolean) => {
    if (prefersReducedMotion()) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(state.current, {
      wdth: wide ? 125 : 78,
      wght: wide ? 900 : 750,
      skew: wide ? -7 : 0,
      duration: 0.65,
      ease: "elastic.out(1, 0.55)",
      onUpdate: apply,
    });
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden bg-[var(--bone)]"
      onPointerEnter={() => go(true)}
      onPointerLeave={() => go(false)}
      data-cursor="PULL"
    >
      <span
        ref={wordRef}
        className="display inline-block select-none whitespace-nowrap text-[clamp(2.6rem,6.5vw,5.5rem)] will-change-transform"
        style={{ fontVariationSettings: '"wdth" 78, "wght" 750' }}
        aria-hidden="true"
      >
        STRETCH
      </span>
      <span className="sr-only">Type stretch — the word stretches while hovering</span>
    </div>
  );
}
