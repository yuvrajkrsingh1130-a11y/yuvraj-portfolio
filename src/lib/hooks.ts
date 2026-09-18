import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./motion";

/** Live media query hook. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on devices without a fine hover pointer (touch). */
export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/** Sets document title per page. */
export function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export { prefersReducedMotion };
