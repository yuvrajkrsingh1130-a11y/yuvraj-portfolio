import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { navItems, site } from "../data/site";
import { TransitionLink, useTransitionNav } from "./PageTransition";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { stopScroll } from "../lib/scroll";

/* ============================================================
   NAVIGATION — wordmark left, numbered links right, status +
   clock. Gains a border once the page scrolls. Mobile gets a
   full-screen stagger menu.
   ============================================================ */

function useClock(): string {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
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
        { clipPath: "inset(0 0 0% 0)", duration: reduced ? 0 : 0.55, ease: "power4.inOut" }
      ).fromTo(
        [...items, ".menu-meta"],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: reduced ? 0 : 0.7, stagger: 0.06, ease: "power4.out" },
        reduced ? 0 : "-=0.25"
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
        duration: reduced ? 0 : 0.3,
        stagger: 0.03,
        ease: "power2.in",
      }).to(
        panel,
        { clipPath: "inset(0 0 100% 0)", duration: reduced ? 0 : 0.45, ease: "power4.inOut" },
        reduced ? 0 : "-=0.1"
      );
    }
    return () => {
      tlRef.current?.kill();
    };
  }, [open]);

  /* close instantly when the route changes behind the panel */
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--ink)] p-6 pb-8 text-[var(--paper)] [clip-path:inset(0_0_100%_0)] [visibility:hidden] md:p-10"
      aria-hidden={!open}
    >
      <div className="h-[calc(var(--nav-h))]" />
      <nav aria-label="Mobile">
        <ul ref={linksRef} className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to} className="overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigateTo(item.to);
                }}
                className="display group flex items-baseline gap-4 py-1 text-left text-[clamp(3rem,12vw,6rem)]"
              >
                <span className="mono text-xs text-[var(--accent)] align-super">{item.index}</span>
                <span className="transition-transform duration-500 group-active:translate-x-2">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu-meta flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="tiny-label text-[var(--accent)]">{site.status}</p>
          <p className="tiny-label opacity-60">{site.location}</p>
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
  const time = useClock();

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
      { yPercent: -120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power4.out", delay: 0.1 }
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
        className={`fixed inset-x-0 top-0 z-[110] transition-colors duration-500 ${
          menuOpen
            ? "text-[var(--paper)]"
            : scrolled
              ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur-[2px]"
              : ""
        }`}
      >
        <div className="flex h-[var(--nav-h)] items-center justify-between gap-4 px-[var(--pad)]">
          <div data-nav-item className="overflow-hidden">
            <TransitionLink
              to="/"
              className="display block text-lg tracking-tight md:text-xl"
              aria-label="Yuvraj Singh — home"
            >
              YUVRAJ SINGH<span className="text-[var(--accent)]">*</span>
            </TransitionLink>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <span data-nav-item className="tiny-label mr-2 hidden items-center gap-2 lg:flex">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </span>
            <nav aria-label="Primary" className="flex items-center gap-6">
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
            <span data-nav-item className="tiny-label hidden tabular-nums opacity-50 lg:block" aria-hidden="true">
              {time}
            </span>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            data-nav-item
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="tiny-label flex items-center gap-3 py-2 md:hidden"
          >
            {menuOpen ? "CLOSE" : "MENU"}
            <span className="flex h-3 w-5 flex-col justify-between" aria-hidden="true">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
