import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/* ---------------- reduced motion ---------------- */

const rmQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

export function prefersReducedMotion(): boolean {
  return rmQuery?.matches ?? false;
}

/* ---------------- word splitting ---------------- */

/**
 * Splits the text content of an element into inline word spans:
 * <span class="w">word </span>. Nested elements are recursed so
 * markup like <em> survives. Returns the word spans.
 */
export function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const words: HTMLSpanElement[] = [];

  const wrapText = (node: Text) => {
    if ((node.parentElement as HTMLElement | null)?.classList.contains("w")) return;
    const frag = document.createDocumentFragment();
    const parts = node.textContent?.split(/(\s+)/) ?? [];
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(" "));
        continue;
      }
      const span = document.createElement("span");
      span.className = "w";
      span.textContent = part;
      frag.appendChild(span);
      words.push(span);
    }
    node.replaceWith(frag);
  };

  const walk = (parent: HTMLElement) => {
    Array.from(parent.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) wrapText(child as Text);
      else if (child.nodeType === Node.ELEMENT_NODE) {
        const c = child as HTMLElement;
        if (c.tagName === "BR") return;
        walk(c);
      }
    });
  };

  walk(el);
  el.classList.add("split");
  return words;
}

/* ---------------- scramble decode ---------------- */

const SCRAMBLE_CHARS = "█▓▒░<>/\\|=+*#01";

/** Decodes `text` into `el` with a scramble effect. */
export function scrambleTo(el: HTMLElement, text: string, duration = 0.8): void {
  if (prefersReducedMotion()) {
    el.textContent = text;
    return;
  }
  const obj = { progress: 0 };
  gsap.to(obj, {
    progress: 1,
    duration,
    ease: "power2.inOut",
    onUpdate: () => {
      const reveal = Math.floor(obj.progress * text.length);
      let out = text.slice(0, reveal);
      for (let i = reveal; i < text.length; i++) {
        out +=
          text[i] === " "
            ? " "
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = text;
    },
  });
}

/* ---------------- magnetic elements ---------------- */

/**
 * Makes elements matching [data-magnetic] pull toward the pointer.
 * Returns a cleanup function. Skipped on touch / reduced motion.
 */
export function attachMagnetic(scope: ParentNode = document): () => void {
  if (prefersReducedMotion()) return () => {};
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    return () => {};

  const els = Array.from(scope.querySelectorAll<HTMLElement>("[data-magnetic]"));
  const cleanups: Array<() => void> = [];

  for (const el of els) {
    const strength = Number(el.dataset.magnetic ?? 0.32);
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");
    const ixTo = inner
      ? gsap.quickTo(inner, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" })
      : null;
    const iyTo = inner
      ? gsap.quickTo(inner, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" })
      : null;

    const rect = () => el.getBoundingClientRect();

    const onMove = (e: PointerEvent) => {
      const r = rect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo?.(dx * strength * 0.6);
      iyTo?.(dy * strength * 0.6);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      ixTo?.(0);
      iyTo?.(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    });
  }

  return () => cleanups.forEach((fn) => fn());
}

/* ---------------- shared easings / defaults ---------------- */

export const EASE = {
  expo: "power4.out",
  inOut: "power4.inOut",
  soft: "power2.out",
};

export function refreshScrollTrigger(): void {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
