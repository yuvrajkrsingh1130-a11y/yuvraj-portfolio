import { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS } from "./Reveal";

interface NavbarProps {
  onReserve: () => void;
}

export function Navbar({ onReserve }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-[#09090b]/85 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
          : "border-b border-white/5 bg-[#09090b]/40 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#top" className="group flex min-w-0 items-center gap-3" aria-label="Auto Spa America — back to top">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-[0_0_28px_rgba(59,130,246,0.45)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.2} />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#09090b] bg-emerald-400" aria-hidden />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[15px] font-extrabold tracking-tight text-white sm:text-base">
              Auto Spa America
              <span className="mx-1.5 font-light text-blue-400">•</span>
              <span className="font-semibold text-zinc-300">International Plaza</span>
            </span>
            <span className="block text-[9.5px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Exotic Detailing • Tampa, FL
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-zinc-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={PHONE_HREF}
            className={cn(
              "hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] font-bold text-white backdrop-blur-md hover:border-blue-500/50 hover:bg-blue-500/10 xl:inline-flex",
              BUTTON_PHYSICS
            )}
          >
            <Phone className="h-3.5 w-3.5 text-blue-400" />
            Call {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={onReserve}
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_0_26px_rgba(59,130,246,0.5)] ring-1 ring-blue-400/50 hover:bg-blue-500 hover:shadow-[0_0_36px_rgba(59,130,246,0.75)]",
              BUTTON_PHYSICS
            )}
          >
            Reserve Slot
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 ease-out lg:hidden",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="space-y-1 border-t border-white/10 bg-[#09090b]/95 px-4 py-4 backdrop-blur-md" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
              <span className="text-blue-500">→</span>
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-bold text-white"
          >
            <Phone className="h-4 w-4 text-blue-400" /> Call {PHONE_DISPLAY}
          </a>
        </nav>
      </div>
    </header>
  );
}
