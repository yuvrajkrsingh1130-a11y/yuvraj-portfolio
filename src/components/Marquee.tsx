import type { ReactNode } from "react";

/* ============================================================
   MARQUEE — two duplicated tracks, pure CSS animation.
   ============================================================ */

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: number; // seconds per loop
  className?: string;
}

export default function Marquee({ children, reverse, speed = 22, className = "" }: MarqueeProps) {
  return (
    <div
      className={`marquee ${className}`}
      data-reverse={reverse || undefined}
      style={{ ["--marquee-speed" as string]: `${speed}s` }}
      aria-hidden="true"
    >
      <div className="marquee-track">{children}</div>
      <div className="marquee-track">{children}</div>
    </div>
  );
}
