import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { navItems, site } from "../data/site";
import { TransitionLink, useTransitionNav } from "./PageTransition";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { stopScroll } from "../lib/scroll";

/* ============================================================
   NAVIGATION — sticky wireframe bar: wordmark, status pill,
   IST clock, numbered links. Mobile gets a full-screen panel.
   ============================================================ */

/** Live Delhi (IST) clock regardless of visitor timezone. */
function useISTClock(): string {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    fmt();
    const id = window.setInterval(fmt, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { navigateTo } = useTransitionNav();
  const location = useLocation();

  useEffect(() => {
    const panel = panelRef.current;
    const list = linksRef.current;
    if (!panel || !list) return;

    const items = list.querySelectorAll("li");
    tlRef.current?.kill();
    const reduced = prefersReducedMotion();

    if (open) {
      stopScroll(true);
      panel.style.visibility = "visible";
      const tl = gsap.timeline();
      tlRef.current = tl;
      tl.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: reduced ? 0 : 0.5, ease: "power4.inOut" }
      ).fromTo(
        [...items, ".menu-meta"],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: reduced ? 0 : 0.65, stagger: 0.055, ease: "power4.out" },
        reduced ? 0 : "-=0.22"
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          panel.style.visibility = "hidden";
          stopScroll(false);
        },
      });
      tlRef.current = tl;
      tl.to([...items, ".menu-meta"], {
        yPercent: -60,
        opacity: 0,
        duration: reduced ? 0 : 0.28,
        stagger: 0.03,
        ease: "power2.in",
      }).to(
        panel,
        { clipPath: "inset(0 0 100% 0)", duration: reduced ? 0 : 0.4, ease: "power4.inOut" },
        reduced ? 0 : "-=0.08"
      );
    }
    return () => {
      tlRef.current?.kill();
    };
  }, [open]);

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--ink)] p-6 pb-8 text-[var(--concrete)] [clip-path:inset(0_0_100%_0)] [visibility:hidden] md:p-10"
      aria-hidden={!open}
    >
      <div className="h-[var(--nav-h)]" />
      <nav aria-label="Mobile">
        <ul ref={linksRef} className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to} className="overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigateTo(item.to);
                }}
                className="display group flex w-full items-center gap-5 border-2 border-transparent px-2 py-2 text-left text-[clamp(2.4rem,10vw,5rem)] transition-colors active:border-[var(--acid)] active:bg-[var(--acid)] active:text-[var(--ink)]"
              >
                <span className="mono text-xs text-[var(--orange)]">[{item.index}]</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu-meta flex flex-wrap items-end justify-between gap-4 border-t-2 border-[var(--concrete)] pt-6">
        <div className="space-y-1">
          <p className="tiny-label text-[var(--acid)]">🟢 {site.status}</p>
          <p className="tiny-label opacity-60">{site.base} — {site.coords}</p>
        </div>
        <a href={`mailto:${site.email}`} className="mono text-sm underline underline-offset-4">
          {site.email}
        </a>
      </div>
    </div>
  );
}

export default function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headRef = useRef<HTMLElement>(null);
  const time = useISTClock();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* entrance */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const head = headRef.current;
    if (!head) return;
    const tween = gsap.fromTo(
      head.querySelectorAll("[data-nav-item]"),
      { yPercent: -130, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power4.out", delay: 0.12 }
    );
    return () => {
      tween.kill();
    };
  }, []);

  const isActive = (to: string) => location.pathname.startsWith(to);

  return (
    <>
      <header
        ref={headRef}
        className={`fixed inset-x-0 top-0 z-[110] border-b-[2.5px] border-[var(--ink)] transition-all duration-300 ${
          menuOpen
            ? "border-transparent bg-transparent text-[var(--concrete)]"
            : scrolled
              ? "bg-[var(--concrete)] shadow-[0_4px_0_0_rgba(10,10,10,0.08)]"
              : "bg-[color-mix(in_srgb,var(--concrete)_86%,transparent)] backdrop-blur-[2px]"
        }`}
      >
        <div className="flex h-[var(--nav-h)] items-center justify-between gap-3 px-[var(--pad)]">
          {/* wordmark */}
          <div data-nav-item className="overflow-hidden">
            <TransitionLink
              to="/"
              className="display flex items-center gap-2 text-base tracking-tight md:text-lg"
              aria-label="Yuvraj Singh — home"
            >
              <span className="inline-block h-3 w-3 bg-[var(--orange)]" aria-hidden="true" />
              YUVRAJ SINGH
              <span className="mono hidden text-[0.55rem] opacity-50 sm:inline">©2026</span>
            </TransitionLink>
          </div>

          {/* desktop cluster */}
          <div className="hidden items-center gap-3 lg:flex">
            <span data-nav-item className="tiny-label mr-1 hidden items-center gap-2 border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] px-3 py-2 shadow-[3px_3px_0_0_var(--ink)] xl:flex">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </span>
            <nav aria-label="Primary" className="flex items-center gap-1.5">
              {navItems.map((item) => (
                <div key={item.to} data-nav-item className="overflow-hidden">
                  <TransitionLink
                    to={item.to}
                    className={`nav-link tiny-label ${isActive(item.to) ? "is-active" : ""}`}
                    aria-current={isActive(item.to) ? "page" : undefined}
                  >
                    <span className="nav-idx">{item.index}</span>
                    {item.label}
                  </TransitionLink>
                </div>
              ))}
            </nav>
            <span
              data-nav-item
              className="tiny-label hidden border-[2.5px] border-[var(--ink)] bg-[var(--ink)] px-3 py-2 tabular-nums text-[var(--acid)] shadow-[3px_3px_0_0_var(--orange)] xl:block"
              aria-label={`Local time in Delhi: ${time}`}
            >
              DELHI {time} IST
            </span>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            data-nav-item
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="tiny-label flex items-center gap-3 border-[2.5px] border-current px-3 py-2 lg:hidden"
          >
            {menuOpen ? "CLOSE ✕" : "MENU ≡"}
          </button>
        </div>
      </header>

      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
