import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/motion";
import { labControls } from "../../lib/labControls";

/* 06 — DOT FIELD · pointer → a grid of dots bends around it */

export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let running = true;
    let active = false;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prefersReducedMotion()) draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const gap = 26;
      const R = 90 + labControls.chaos * 80;
      const sp = labControls.speed;
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.hypot(dx, dy);
          let ox = 0;
          let oy = 0;
          let size = 1.6;
          if (d < R) {
            const f = (1 - d / R) * 18;
            ox = (dx / (d || 1)) * f;
            oy = (dy / (d || 1)) * f;
            size = 1.6 + (1 - d / R) * 3.2;
          }
          const wob = prefersReducedMotion() ? 0 : Math.sin(time * 0.002 * sp + x * 0.05 + y * 0.03) * 0.8;
          ctx.fillStyle = d < R ? "#ff4d00" : "#0a0a0a";
          ctx.fillRect(x + ox + wob, y + oy + wob, size, size);
        }
      }
    };

    const step = (t: number) => {
      if (!running) {
        active = false;
        return;
      }
      raf = requestAnimationFrame(step);
      if (!labControls.paused) draw(t);
    };
    const start = () => {
      if (active || prefersReducedMotion()) return;
      active = true;
      raf = requestAnimationFrame(step);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (!prefersReducedMotion()) {
      start();
      const io = new IntersectionObserver((e) => {
        running = e[0].isIntersecting;
        if (running) start();
      });
      io.observe(canvas);
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      const onLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
      };
      canvas.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
      };
    }
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={ref}
      className="h-full w-full bg-[var(--concrete)]"
      data-cursor="DRAG"
      aria-label="Dot field — a grid of dots bends around the pointer"
      role="img"
    />
  );
}
