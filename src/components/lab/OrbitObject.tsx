import { useEffect, useRef, useState } from "react";
import { createBlobScene, webglAvailable, type BlobHandle } from "../three/blobScene";
import { prefersReducedMotion } from "../../lib/motion";

/* 03 — ORBIT OBJECT · pointer → live 3D form rotates & bulges */

export default function OrbitObject() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !webglAvailable()) {
      setFailed(true);
      return;
    }

    let handle: BlobHandle | null = null;
    try {
      handle = createBlobScene(canvas, {
        detail: 3,
        amp: 0.22,
        freq: 1.9,
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

    const io = new IntersectionObserver((e) => handle?.setPaused(!e[0].isIntersecting));
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      handle?.setPointer(x, y);
      handle?.setVelocity(0.8);
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });

    const h = handle;
    return () => {
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      h.dispose();
    };
  }, []);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--ink)]">
        <div className="h-40 w-40 rounded-full border border-[var(--paper)]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="h-full w-full bg-[var(--ink)]" data-cursor="SPIN">
      <canvas ref={canvasRef} className="block h-full w-full" aria-label="3D object — rotates toward the pointer" role="img" />
    </div>
  );
}
