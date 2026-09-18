import { useEffect, useRef, useState } from "react";
import { createBlobScene, webglAvailable, type BlobHandle } from "./three/blobScene";
import { getLenis } from "../lib/scroll";
import { prefersReducedMotion } from "../lib/motion";

/* ============================================================
   Hero 3D object. Lazy-mounts a WebGL scene, pauses it when off
   screen, and degrades to a static CSS form without WebGL.
   ============================================================ */

export default function HeroScene({
  className = "",
  ...rest
}: { className?: string } & Record<string, unknown>) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    if (!webglAvailable()) {
      setFailed(true);
      return;
    }

    let handle: BlobHandle | null = null;
    try {
      const isSmall = window.innerWidth < 768;
      handle = createBlobScene(canvas, {
        detail: isSmall ? 3 : 5,
        amp: isSmall ? 0.26 : 0.34,
        reducedMotion: prefersReducedMotion(),
      });
    } catch {
      setFailed(true);
      return;
    }

    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      handle?.resize(r.width, r.height);
    });
    ro.observe(wrap);
    handle.resize(wrap.clientWidth, wrap.clientHeight);

    /* pause when off-screen */
    const io = new IntersectionObserver(
      (entries) => handle?.setPaused(!entries[0].isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(wrap);

    /* pointer influence (normalised -1..1) */
    const onPointer = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      handle?.setPointer(x, y);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* feed scroll velocity */
    let velTimer = 0;
    const tickVel = () => {
      const l = getLenis();
      if (l) handle?.setVelocity(Math.abs(l.velocity));
      velTimer = window.setTimeout(tickVel, 120);
    };
    tickVel();

    const h = handle;
    return () => {
      window.clearTimeout(velTimer);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      io.disconnect();
      h.dispose();
    };
  }, []);

  if (failed) {
    return (
      <div className={`relative ${className}`} ref={wrapRef} aria-hidden="true" {...rest}>
        <div className="hero-fallback" />
      </div>
    );
  }

  return (
    <div className={className} ref={wrapRef} aria-hidden="true" {...rest}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
