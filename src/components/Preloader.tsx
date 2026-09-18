import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { stopScroll } from "../lib/scroll";

/* ============================================================
   PRELOADER — ink screen, percentage 00→100, cycling technical
   status, thin progress line. Fast by design (~1.6s), skipped
   on repeat visits within the session, instant for reduced
   motion.
   ============================================================ */

const STATUS_LINES = [
  "INITIALIZING EXPERIENCE",
  "LOADING TYPE SYSTEM",
  "CALIBRATING MOTION",
  "COMPILING GRID",
  "WARMING UP WEBGL",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    stopScroll(true);
    const reduced = prefersReducedMotion();
    const skip = sessionStorage.getItem("ys-loaded") === "1";
    const DUR = reduced ? 0.15 : skip ? 0.55 : 1.35;

    let statusTimer = 0;
    if (!reduced) {
      let i = 0;
      statusTimer = window.setInterval(() => {
        i = (i + 1) % STATUS_LINES.length;
        if (statusRef.current) statusRef.current.textContent = STATUS_LINES[i];
      }, 280);
    }

    sessionStorage.setItem("ys-loaded", "1");

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        window.clearInterval(statusTimer);
      },
    });

    tl.to(counter, {
      v: 100,
      duration: DUR,
      ease: reduced ? "none" : "power2.inOut",
      onUpdate: () => {
        if (counterRef.current)
          counterRef.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
      },
    });

    if (!reduced) {
      tl.to(
        lineRef.current,
        { scaleX: 1, duration: DUR, ease: "power2.inOut" },
        0
      );
      /* shift typography out, then slide the screen away while
         the page underneath starts its entrance */
      tl.to(titleRef.current, {
        yPercent: -110,
        duration: 0.45,
        ease: "power4.in",
      })
        .add(() => {
          stopScroll(false);
          doneRef.current();
        })
        .to(root, {
          yPercent: -100,
          duration: 0.65,
          ease: "power4.inOut",
        })
        .set(root, { display: "none" });
    } else {
      tl.set(root, { display: "none" }).add(() => {
        stopScroll(false);
        doneRef.current();
      });
    }

    return () => {
      window.clearInterval(statusTimer);
      tl.kill();
      stopScroll(false);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[130] flex flex-col justify-between overflow-hidden bg-[var(--ink)] p-6 text-[var(--concrete)] md:p-10"
      aria-hidden="true"
    >
      {/* top line */}
      <div className="flex items-center justify-between">
        <span className="tiny-label opacity-60">YUVRAJ SINGH — DELHI, IST</span>
        <span ref={statusRef} className="tiny-label text-[var(--acid)]">
          INITIALIZING EXPERIENCE
        </span>
      </div>

      {/* huge name */}
      <div className="overflow-hidden">
        <div ref={titleRef}>
          <p className="display text-[clamp(3rem,13vw,12rem)] leading-[0.85]">
            YUVRAJ
            <br />
            SINGH<span className="text-[var(--acid)]">*</span>
          </p>
        </div>
      </div>

      {/* bottom row */}
      <div>
        <div
          ref={lineRef}
          className="mb-6 h-[3px] w-full origin-left scale-x-0 bg-[var(--acid)]"
        />
        <div className="flex items-end justify-between">
          <span className="tiny-label opacity-60">UI/UX × BRANDING × WEB EXPERIMENTS</span>
          <span
            ref={counterRef}
            className="mono text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-bold"
          >
            00
          </span>
        </div>
      </div>
    </div>
  );
}
