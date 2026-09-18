import type { ReactNode } from "react";
import { TransitionLink } from "./PageTransition";

/* ============================================================
   CTA — magnetic border button with hover fill + arrow travel.
   Routes internally via the transition system.
   ============================================================ */

interface CTAProps {
  to?: string;
  href?: string;
  children: ReactNode;
  fill?: boolean;
  accent?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CTA({ to, href, children, fill, accent, className = "", onClick }: CTAProps) {
  const cls = `cta ${fill ? "cta-fill" : ""} ${accent ? "cta-accent" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="cta-arrow" aria-hidden="true">→</span>
    </>
  );

  if (to) {
    return (
      <TransitionLink to={to} className={cls} data-magnetic="0.28" onClick={onClick}>
        {inner}
      </TransitionLink>
    );
  }
  return (
    <a href={href} className={cls} data-magnetic="0.28" onClick={onClick}>
      {inner}
    </a>
  );
}
