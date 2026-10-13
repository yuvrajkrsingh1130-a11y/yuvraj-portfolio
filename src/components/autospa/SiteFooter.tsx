import { ArrowUp, Clock, MapPin, Phone } from "lucide-react";
import { ADDRESS, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS } from "./Reveal";
import { AutoSpaLogo } from "./Logo";

interface SiteFooterProps {
  onReserve: () => void;
  openNow: boolean;
}

export function SiteFooter({ onReserve, openNow }: SiteFooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#050507]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-blue-700/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex flex-col gap-2.5" aria-label="Auto Spa America — back to top">
              <AutoSpaLogo className="h-16" />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-zinc-500">
                International Plaza • Exotic Detailing • Tampa, Florida
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500">
              You retail, while we detail. Tampa&rsquo;s premier automotive spa for exotic and
              luxury machines — hand washed, corrected and ceramic-armored while you enjoy
              International Plaza.
            </p>
            <button
              type="button"
              onClick={onReserve}
              className={cn(
                "mt-6 inline-flex items-center gap-2 rounded-full btn-lux px-6 py-3 text-[13px] font-extrabold text-white shadow-[0_0_26px_rgba(59,130,246,0.5)] ring-1 ring-sky-400/50 hover:bg-blue-500",
                BUTTON_PHYSICS
              )}
            >
              Reserve Your Slot
            </button>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-zinc-500">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-zinc-500">Visit</p>
            <ul className="mt-4 space-y-3.5 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span>
                  {ADDRESS}
                  <span className="block text-zinc-500">Lower garage, under Cheesecake Factory</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span>
                  Mon–Sat 10 AM – 7 PM • Sun 11 AM – 7 PM
                  <span className="mt-0.5 flex items-center gap-1.5 font-semibold text-zinc-300">
                    <span className={cn("h-1.5 w-1.5 rounded-full", openNow ? "bg-emerald-400" : "bg-amber-400")} aria-hidden />
                    {openNow ? "Open now" : "Closed — reserve ahead"}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-zinc-500">Contact</p>
            <a
              href={PHONE_HREF}
              className="mt-4 flex items-center gap-2.5 text-sm font-extrabold text-white transition-colors hover:text-blue-300"
            >
              <Phone className="h-4 w-4 text-sky-400" /> {PHONE_DISPLAY}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Call the desk for same-day bay availability and ceramic consultations.
            </p>
            <a
              href="#top"
              className={cn(
                "mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:border-blue-500/50 hover:bg-blue-500/10",
                BUTTON_PHYSICS
              )}
            >
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-medium text-zinc-600">
            © {new Date().getFullYear()} Auto Spa America • International Plaza, Tampa, FL. All rights reserved.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-600">
            System X® Certified • 100% Hand Wash • Est. Tampa
          </p>
        </div>
      </div>
    </footer>
  );
}
