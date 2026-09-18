import { useEffect, useRef } from "react";
import { navItems, site } from "../data/site";
import { TransitionLink } from "./PageTransition";
import { attachMagnetic, gsap, prefersReducedMotion } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";

/* ============================================================
   FOOTER — brutalist closer: huge name, mail block, channels.
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
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
      gsap.fromTo(
        "[data-footer-item]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: "[data-footer-cols]", start: "top 88%" },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      detachMagnetic();
    };
  }, []);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t-[2.5px] border-[var(--ink)] bg-[var(--ink)] text-[var(--concrete)]">
      <div className="grid-lines-inv pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative px-[var(--pad)] pb-10 pt-16 md:pt-24">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <p className="tiny-label bg-[var(--acid)] px-2 py-1 text-[var(--ink)]">LET'S BUILD SOMETHING.</p>
          <p className="tiny-label opacity-50">{site.coords} — {site.base}</p>
        </div>

        {/* huge name */}
        <h2 className="sr-only">Contact Yuvraj Singh</h2>
        <div className="select-none" aria-hidden="true">
          {["YUVRAJ", "SINGH*"].map((line) => (
            <div key={line} className="overflow-hidden">
              <p
                data-footer-line
                className="display text-[clamp(3.6rem,17vw,16rem)] leading-[0.88] text-[var(--concrete)]"
              >
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* mail CTA */}
        <div className="mt-12 md:mt-14">
          <a
            href={`mailto:${site.email}`}
            data-magnetic="0.22"
            data-cursor="WRITE"
            className="group inline-flex flex-wrap items-center gap-4 border-[2.5px] border-[var(--concrete)] bg-[var(--ink)] px-5 py-4 transition-colors duration-300 hover:bg-[var(--acid)] hover:text-[var(--ink)] md:gap-6 md:px-8 md:py-5"
          >
            <span
              data-magnetic-inner
              className="display text-[clamp(1.2rem,3.8vw,3rem)] leading-none"
            >
              {site.email}
            </span>
            <span className="mono text-lg transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        {/* columns */}
        <div
          data-footer-cols
          className="mt-14 grid grid-cols-2 gap-10 border-t-[2.5px] border-[var(--concrete)] pt-10 md:grid-cols-4"
        >
          <div data-footer-item>
            <p className="tiny-label mb-4 text-[var(--acid)]">SITEMAP</p>
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
            <p className="tiny-label mb-4 text-[var(--acid)]">CHANNELS</p>
            <ul className="space-y-2">
              {site.socials.slice(1).map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="footer-link mono text-xs">
                    {s.label}
                    <span className="fl-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-item>
            <p className="tiny-label mb-4 text-[var(--acid)]">DISCIPLINES</p>
            <ul className="mono space-y-2 text-xs opacity-90">
              <li>UI/UX DESIGN</li>
              <li>BRANDING & POSTERS</li>
              <li>WEB EXPERIMENTS</li>
              <li>CREATIVE DIRECTION</li>
            </ul>
          </div>

          <div data-footer-item>
            <p className="tiny-label mb-4 text-[var(--acid)]">STATUS</p>
            <p className="mono flex items-center gap-2 text-xs">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </p>
            <p className="mono mt-3 text-xs opacity-60">
              {site.base}
              <br />
              {site.timezone}
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-[2.5px] border-[var(--concrete)] pt-6">
          <p className="tiny-label opacity-60">© 2026 YUVRAJ SINGH — ALL RIGHTS RESERVED</p>
          <p className="tiny-label opacity-60">FUNCTIONAL CHAOS, BUILT IN DELHI</p>
          <button
            type="button"
            data-magnetic="0.35"
            onClick={() => scrollToTarget(0)}
            className="tiny-label border-[2.5px] border-[var(--concrete)] px-4 py-2 transition-colors hover:bg-[var(--acid)] hover:text-[var(--ink)]"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
