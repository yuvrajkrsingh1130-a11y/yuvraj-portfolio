import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

/**
 * Fade-up scroll reveal powered by IntersectionObserver.
 * Adds `.is-visible` once when the element enters the viewport.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Shared eyebrow label used above section headlines. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-sky-400">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" aria-hidden />
      {children}
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" aria-hidden />
    </span>
  );
}

/** Exact card physics requested in the design spec. */
export const CARD_PHYSICS =
  "transition-all duration-300 ease-out hover:-translate-y-2.5 hover:shadow-[0_12px_35px_rgba(59,130,246,0.25)] hover:border-blue-400/50";

/** Exact button micro-scale physics requested in the design spec. */
export const BUTTON_PHYSICS =
  "hover:scale-105 active:scale-95 transition-transform duration-200";
