import { useEffect, useRef } from "react";
import { navItems, site } from "../data/site";
import { TransitionLink } from "./PageTransition";
import { attachMagnetic, gsap, prefersReducedMotion } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";

/* ============================================================
   FOOTER — huge name reveal, mail CTA, socials, metadata.
   ============================================================ */

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const detachMagnetic = attachMagnetic(el);

    if (prefersReducedMotion()) return () => detachMagnetic();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-line]",
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 78%" },
        }
      );
      gsap.fromTo(
        "[data-footer-item]",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: "[data-footer-cols]", start: "top 85%" },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      detachMagnetic();
    };
  }, []);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      {/* accent seam */}
      <div className="h-[3px] w-full bg-[var(--accent)]" aria-hidden="true" />

      <div className="px-[var(--pad)] pb-10 pt-16 md:pt-24">
        <p className="tiny-label mb-8 text-[var(--accent)]">LET'S BUILD SOMETHING.</p>

        {/* huge name */}
        <h2 className="sr-only">Contact Yuvraj Singh</h2>
        <div className="select-none" aria-hidden="true">
          {["YUVRAJ", "SINGH*"].map((line) => (
            <div key={line} className="overflow-hidden">
              <p
                data-footer-line
                className="display text-[clamp(4rem,17.5vw,17rem)] leading-[0.82] text-[var(--paper)]"
              >
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* mail CTA */}
        <div className="mt-12 md:mt-16">
          <a
            href={`mailto:${site.email}`}
            data-magnetic="0.25"
            className="group inline-flex flex-wrap items-center gap-4 md:gap-6"
            data-cursor="WRITE"
          >
            <span
              data-magnetic-inner
              className="display text-[clamp(1.4rem,4.6vw,4rem)] leading-none transition-colors duration-300 group-hover:text-[var(--accent)]"
            >
              {site.email}
            </span>
            <span className="mono text-sm transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>

        {/* columns */}
        <div
          data-footer-cols
          className="mt-16 grid grid-cols-2 gap-10 border-t border-[var(--line-inv)] pt-10 md:grid-cols-4"
        >
          <div data-footer-item>
            <p className="tiny-label mb-4 opacity-50">SITEMAP</p>
            <ul className="space-y-2">
              {[{ label: "INDEX", to: "/" }, ...navItems].map((item) => (
                <li key={item.to}>
                  <TransitionLink to={item.to} className="footer-link mono text-xs">
                    {item.label}
                    <span className="fl-arrow" aria-hidden="true">↗</span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-item>
            <p className="tiny-label mb-4 opacity-50">SOCIALS</p>
            <ul className="space-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link mono text-xs"
                  >
                    {s.label}
                    <span className="fl-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-item>
            <p className="tiny-label mb-4 opacity-50">DISCIPLINES</p>
            <ul className="mono space-y-2 text-xs opacity-80">
              <li>GRAPHIC DESIGN</li>
              <li>BRAND DESIGN</li>
              <li>WEB DESIGN</li>
              <li>CODE</li>
              <li>MOTION</li>
            </ul>
          </div>

          <div data-footer-item>
            <p className="tiny-label mb-4 opacity-50">STATUS</p>
            <p className="mono flex items-center gap-2 text-xs">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </p>
            <p className="mono mt-3 text-xs opacity-60">{site.location}</p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line-inv)] pt-6">
          <p className="tiny-label opacity-50">© 2026 YUVRAJ SINGH — ALL RIGHTS RESERVED</p>
          <p className="tiny-label opacity-50">DESIGNED + BUILT WITH DESIGN × CODE × MOTION</p>
          <button
            type="button"
            data-magnetic="0.35"
            onClick={() => scrollToTarget(0)}
            className="tiny-label border border-[var(--line-inv)] px-4 py-2 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
