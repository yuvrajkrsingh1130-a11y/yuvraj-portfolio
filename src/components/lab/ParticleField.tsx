import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/motion";
import { labControls } from "../../lib/labControls";

/* 02 — PARTICLE FIELD · pointer → particles scatter & regroup */

interface P {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
}

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let particles: P[] = [];
    let raf = 0;
    let running = true;

    const seed = () => {
      const count = Math.min(260, Math.floor((w * h) / 3400));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { x, y, hx: x, hy: y, vx: 0, vy: 0 };
      });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (prefersReducedMotion()) drawStatic();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0a0a";
      for (const p of particles) ctx.fillRect(p.x, p.y, 2, 2);
    };

    let active = false;
    const start = () => {
      if (active || prefersReducedMotion()) return;
      active = true;
      raf = requestAnimationFrame(step);
    };
    const step = () => {
      if (!running) {
        active = false;
        return;
      }
      raf = requestAnimationFrame(step);
      if (labControls.paused) return;
      const R = 70 + labControls.chaos * 130;
      const sp = labControls.speed;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0a0a";
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((R - d) / R) * 1.6 * sp;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.hx - p.x) * 0.012 * sp;
        p.vy += (p.hy - p.y) * 0.012 * sp;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
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
    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="h-full w-full touch-none bg-[var(--concrete)]"
      data-cursor="DRAG"
      aria-label="Particle field — particles react to the pointer"
      role="img"
    />
  );
}
