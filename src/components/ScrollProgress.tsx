import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

/* Thin accent progress line + bottom-right percentage readout. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (textRef.current)
        textRef.current.textContent = `SCROLL ${String(Math.round(p * 100)).padStart(3, "0")}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={barRef}
        className="fixed left-0 top-0 z-[115] h-[2px] w-full origin-left scale-x-0 bg-[var(--accent)]"
        aria-hidden="true"
      />
      <span
        ref={textRef}
        className="tiny-label fixed bottom-4 right-[var(--pad)] z-[115] hidden opacity-50 md:block"
        aria-hidden="true"
      >
        SCROLL 000%
      </span>
    </>
  );
}
