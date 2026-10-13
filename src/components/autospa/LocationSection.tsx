import { Clock, KeyRound, MapPin, Navigation, Phone, Route, Store } from "lucide-react";
import { ADDRESS, MAPS_EMBED, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS, CARD_PHYSICS, Eyebrow, Reveal } from "./Reveal";

interface LocationSectionProps {
  openNow: boolean;
  todayLabel: string;
}

const HOURS = [
  { day: "Monday — Saturday", time: "10:00 AM – 7:00 PM" },
  { day: "Sunday", time: "11:00 AM – 7:00 PM" },
];

const DRIVE_IN_STEPS = [
  "Enter the International Plaza garage from Westshore Blvd.",
  "Follow signs down to the lower level, beneath Cheesecake Factory.",
  "Look for the blue Auto Spa America glow — valet desk on your right.",
  "Keys handed off in under 2 minutes. We text you at pickup time.",
];

export function LocationSection({ openNow, todayLabel }: LocationSectionProps) {
  return (
    <section id="location" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Find The Spa</Eyebrow>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Inside International Plaza,{" "}
            <span className="font-lux-serif font-normal italic text-sky-400">underneath it all.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {/* Info card */}
          <Reveal className="lg:col-span-2">
            <div
              className={cn(
                "flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md",
                CARD_PHYSICS
              )}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/15 text-sky-400">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-white">Auto Spa America</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    {ADDRESS}
                    <span className="mt-0.5 block font-semibold text-zinc-300">
                      Lower level garage — directly beneath Cheesecake Factory
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-7 border-t border-white/[0.07] pt-6">
                <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                  <Clock className="h-3.5 w-3.5 text-sky-400" /> Hours of indulgence
                </p>
                <ul className="mt-3.5 space-y-2.5">
                  {HOURS.map((h) => (
                    <li key={h.day} className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-zinc-300">{h.day}</span>
                      <span className="font-bold text-white">{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-zinc-200">
                  <span
                    className={cn("h-2 w-2 rounded-full", openNow ? "animate-pulse-dot bg-emerald-400" : "bg-amber-400")}
                    aria-hidden
                  />
                  {openNow ? `Open now — ${todayLabel}` : `Closed — ${todayLabel}`}
                </p>
              </div>

              <div className="mt-7 border-t border-white/[0.07] pt-6">
                <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                  <Route className="h-3.5 w-3.5 text-sky-400" /> Drive-in garage instructions
                </p>
                <ol className="mt-4 space-y-3">
                  {DRIVE_IN_STEPS.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-[13px] leading-relaxed text-zinc-300">
                      <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-extrabold text-white">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <a
                  href={PHONE_HREF}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_0_28px_rgba(59,130,246,0.5)] ring-1 ring-sky-400/50 hover:bg-blue-500",
                    BUTTON_PHYSICS
                  )}
                >
                  <Phone className="h-4 w-4" /> Call Desk
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md hover:border-blue-500/50 hover:bg-blue-500/10",
                    BUTTON_PHYSICS
                  )}
                >
                  <Navigation className="h-4 w-4 text-sky-400" /> Open in Google Maps
                </a>
              </div>
              <p className="mt-4 text-center text-xs font-semibold text-zinc-500">
                Front desk: {PHONE_DISPLAY} • Valet key drop in under 2 minutes
              </p>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={150} className="lg:col-span-3">
            <div
              className={cn(
                "relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900",
                CARD_PHYSICS
              )}
            >
              <iframe
                title="Map — Auto Spa America, 2223 N Westshore Blvd, Tampa, FL 33607"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 opacity-90 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
              />
              {/* Fallback / overlay pin card */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050507]/70 to-transparent" />
              <div className="absolute bottom-5 left-5 max-w-xs rounded-2xl border border-white/15 bg-[#050507]/85 p-5 shadow-2xl backdrop-blur-md">
                <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-sky-400">
                  <Store className="h-3.5 w-3.5" /> Lower Deck • Bay Level
                </p>
                <p className="mt-2 text-sm font-bold leading-snug text-white">
                  Directly beneath Cheesecake Factory, International Plaza
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                  <KeyRound className="h-3.5 w-3.5 text-sky-400" /> Garage entry via N Westshore Blvd
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
