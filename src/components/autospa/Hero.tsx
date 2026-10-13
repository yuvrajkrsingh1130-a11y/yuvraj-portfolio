import { ArrowRight, Award, ChevronDown, MapPin, ShieldCheck, Sparkles, Star, Waves } from "lucide-react";
import { HERO_CARD_IMAGE, HERO_POSTER, HERO_VIDEO } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS } from "./Reveal";

interface HeroProps {
  onReserve: () => void;
  openNow: boolean;
}

const TRUST = [
  { icon: Star, value: "5.0 Google Rating", detail: "350+ five-star reviews" },
  { icon: ShieldCheck, value: "10-Yr Ceramic Warranty", detail: "System X® transferable" },
  { icon: Waves, value: "100% Hand Wash", detail: "No tunnels. No brushes. Ever." },
  { icon: Award, value: "17 Years in Service", detail: "4,500+ cars detailed yearly" },
];

export function Hero({ onReserve, openNow }: HeroProps) {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Cinematic video backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Gradient + radial vignette so video melts into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/80 via-[#050507]/35 to-[#050507]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/85 via-[#050507]/25 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 65% at 50% 42%, transparent 0%, rgba(9,9,11,0.55) 78%, #050507 100%)",
          }}
        />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-600/15 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-40 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="hero-enter" style={{ animationDelay: "0.05s" }}>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1.5 pl-2 pr-4 text-[11px] font-bold text-white shadow-lg backdrop-blur-md sm:text-xs">
              <span className="inline-flex items-center gap-1 rounded-full btn-lux px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider">
                <MapPin className="h-3 w-3" /> Tampa
              </span>
              <span className="truncate">📍 International Plaza (Directly Under Cheesecake Factory)</span>
            </span>
          </div>

          <h1
            className="hero-enter mt-7 text-[13.5vw] font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] sm:text-7xl lg:text-[92px]"
            style={{ animationDelay: "0.15s" }}
          >
            You Retail,
            <br />
            While We{" "}
            <span className="font-lux-serif bg-gradient-to-r from-blue-300 via-sky-400 to-indigo-400 bg-clip-text pr-2 font-normal italic text-transparent drop-shadow-none">
              Detail.
            </span>
          </h1>

          <p
            className="hero-enter mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
            style={{ animationDelay: "0.28s" }}
          >
            Tampa&rsquo;s premier automotive spa. Hand over your keys while you shop, dine, or
            handle business at International Plaza — and return to a showroom mirror finish.
          </p>

          <div
            className="hero-enter mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              type="button"
              onClick={onReserve}
              className={cn(
                "group inline-flex items-center justify-center gap-2 rounded-full btn-lux px-8 py-4 text-sm font-extrabold text-white shadow-[0_0_38px_rgba(59,130,246,0.55)] ring-1 ring-sky-400/60 hover:bg-blue-500 hover:shadow-[0_0_52px_rgba(59,130,246,0.85)]",
                BUTTON_PHYSICS
              )}
            >
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              Reserve Your Slot
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="#packages"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md hover:border-[#ff4653]/70 hover:bg-[#e8262f]/10 hover:shadow-[0_0_30px_rgba(232,38,47,0.25)]",
                BUTTON_PHYSICS
              )}
            >
              Explore Packages
            </a>
            <span className="inline-flex items-center gap-2 pl-1 text-xs font-semibold text-zinc-300">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  openNow ? "animate-pulse-dot bg-emerald-400" : "bg-amber-400"
                )}
                aria-hidden
              />
              {openNow ? "Open now — bays available today" : "Currently closed — reserve ahead"}
            </span>
          </div>
        </div>

        {/* Quick trust metrics bar */}
        <div
          className="hero-enter mt-14 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-md sm:grid-cols-3"
          style={{ animationDelay: "0.55s" }}
        >
          {TRUST.map((item) => (
            <div key={item.value} className="flex items-center gap-3.5 bg-[#0c0c10]/80 px-5 py-4.5 sm:py-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/15 text-sky-400">
                <item.icon className="h-4.5 w-4.5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-extrabold tracking-tight text-white">{item.value}</span>
                <span className="block text-[11px] font-medium text-zinc-400">{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating real-photo card — fresh out of our own bay */}
      <figure
        className="hero-enter absolute right-10 top-[21%] z-10 hidden w-[300px] rotate-[2.5deg] rounded-3xl border border-white/15 bg-white/[0.07] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-500 hover:rotate-0 xl:block"
        style={{ animationDelay: "0.7s" }}
      >
        <img
          src={HERO_CARD_IMAGE}
          alt="Porsche Cayenne detailed at Auto Spa America, International Plaza Tampa"
          className="h-44 w-full rounded-2xl object-cover"
          loading="eager"
        />
        <figcaption className="px-1.5 pb-1 pt-3">
          <span className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-extrabold tracking-tight text-white">Porsche Cayenne</span>
            <span className="flex items-center gap-0.5" aria-label="5 star finish">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </span>
          </span>
          <span className="mt-1 block text-[11px] font-semibold text-zinc-400">
            French Spa Signature — detailed today under Cheesecake Factory
          </span>
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#ff4653]/30 bg-[#e8262f]/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#ff8a8a]">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" aria-hidden />
            Fresh out of the bay
          </span>
        </figcaption>
      </figure>

      {/* Scroll hint */}
      <a
        href="#process"
        aria-label="Scroll to the drop-off ritual"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-zinc-400 transition-colors hover:text-white md:flex"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">The Ritual</span>
        <ChevronDown className="animate-scroll-hint h-4 w-4" />
      </a>
    </section>
  );
}

/** Kinetic service ticker that bridges hero into the page. */
const TICKER_ITEMS = [
  "2-Bucket Hand Wash",
  "Paint Correction",
  "System X® Ceramic",
  "Steam Sanitization",
  "Clay Bar Treatment",
  "Leather Conditioning",
  "Engine Bay Detail",
  "Mirror Polish",
];

export function ServiceTicker() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-[#0c0c10] py-4" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-8 pr-8 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap text-[11px] font-extrabold uppercase tracking-[0.26em] text-zinc-500"
          >
            {item}
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050507] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050507] to-transparent" />
    </div>
  );
}
