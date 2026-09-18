import type { ReactNode } from "react";
import { TransitionLink } from "./PageTransition";

/* ============================================================
   CTA — brutalist hard-shadow button with press physics and
   arrow travel. Routes internally via the transition system.
   ============================================================ */

interface CTAProps {
  to?: string;
  href?: string;
  children: ReactNode;
  /** acid background */
  accent?: boolean;
  /** obsidian background, acid text */
  ink?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CTA({ to, href, children, accent, ink, className = "", onClick }: CTAProps) {
  const cls = `cta ${accent ? "cta-acid" : ""} ${ink ? "cta-ink" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="cta-arrow" aria-hidden="true">→</span>
    </>
  );

  if (to) {
    return (
      <TransitionLink to={to} className={cls} data-magnetic="0.24" onClick={onClick}>
        {inner}
      </TransitionLink>
    );
  }
  return (
    <a href={href} className={cls} data-magnetic="0.24" onClick={onClick}>
      {inner}
    </a>
  );
}
