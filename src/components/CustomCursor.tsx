import { useEffect, useRef } from "react";

/* ============================================================
   CUSTOM CURSOR — ink dot + trailing ring. Over interactive
   elements the ring grows; over [data-cursor="VIEW"] elements
   it becomes a labelled badge. Fine-pointer devices only, so
   touch & keyboard users are never affected.
   ============================================================ */

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary';

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("has-cursor");
    const root = rootRef.current!;
    const dot = dotRef.current!;
    const trail = trailRef.current!;
    const label = labelRef.current!;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trailPos = { ...pos };
    let raf = 0;
    let shown = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const ease = reduced ? 1 : 0.18;
      trailPos.x += (pos.x - trailPos.x) * ease;
      trailPos.y += (pos.y - trailPos.y) * ease;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`;
      trail.style.transform = `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) translate(-50%,-50%)`;
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!shown) {
        shown = true;
        root.style.opacity = "1";
      }
    };

    const onHide = () => {
      shown = false;
      root.style.opacity = "0";
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const hit = target.closest?.(`[data-cursor], ${INTERACTIVE}`) as HTMLElement | null;
      const text = hit?.getAttribute("data-cursor") ?? "";
      if (text) {
        label.textContent = text;
        root.dataset.state = "label";
      } else if (hit) {
        root.dataset.state = "hover";
      } else {
        root.dataset.state = "idle";
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onHide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onHide);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-state="idle"
      className="cursor-root pointer-events-none fixed inset-0 z-[150] opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    >
      <div ref={trailRef} className="cursor-trail absolute left-0 top-0">
        <span ref={labelRef} className="cursor-trail-label tiny-label" />
      </div>
      <div ref={dotRef} className="cursor-dot absolute left-0 top-0" />
    </div>
  );
}
