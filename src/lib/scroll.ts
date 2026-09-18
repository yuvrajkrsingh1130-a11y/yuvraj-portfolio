import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

/* ============================================================
   SMOOTH SCROLL — Lenis wired into GSAP's ticker so
   ScrollTrigger stays in sync. Native scroll is used when the
   visitor prefers reduced motion.
   ============================================================ */

let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (prefersReducedMotion() || lenis) return () => {};

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Scroll to a target (selector, element or y position). */
export function scrollToTarget(
  target: string | number,
  opts: { immediate?: boolean; offset?: number } = {}
): void {
  if (lenis && !opts.immediate) {
    lenis.scrollTo(target, { offset: opts.offset ?? 0, duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "auto" });
    return;
  }
  const el = document.querySelector<HTMLElement>(target);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0);
    window.scrollTo({ top: y, behavior: "auto" });
  }
}

export function stopScroll(lock: boolean): void {
  if (lenis) {
    if (lock) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = lock ? "hidden" : "";
}
