import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Car, CarFront, Check, Clock, Crown, MousePointer2 } from "lucide-react";
import { PACKAGES, type VehicleClass } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS, Eyebrow, Reveal } from "./Reveal";

interface PackagesProps {
  vehicle: VehicleClass;
  onVehicleChange: (v: VehicleClass) => void;
  onReserve: (packageId?: string) => void;
}

/** Fanned-out resting pose (applied once the stack scrolls into view). */
const FAN_POSE = [
  "lg:-rotate-3 lg:-translate-y-2",
  "lg:rotate-0 lg:-translate-y-5 lg:z-10",
  "lg:rotate-0 lg:-translate-y-5 lg:z-10",
  "lg:rotate-3 lg:translate-y-2",
] as const;

/** "Pile of cards" pose the stack starts in before fanning out. */
const PILE_POSE = [
  "lg:translate-x-24 lg:rotate-[5deg]",
  "lg:translate-x-8 lg:rotate-[2deg]",
  "lg:-translate-x-8 lg:-rotate-[2deg]",
  "lg:-translate-x-24 lg:-rotate-[5deg]",
] as const;

/** Center cards get an elevated sapphire highlight in the fan. */
const CENTER_GLOW =
  "lg:border-sky-400/40 lg:shadow-[0_18px_45px_rgba(56,189,248,0.16)]";

export function Packages({ vehicle, onVehicleChange, onReserve }: PackagesProps) {
  const isSuv = vehicle === "suv";
  const [fanned, setFanned] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  /* Fan the pile out the first time it enters the viewport. */
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFanned(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="packages" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-700/10 blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Detailing Packages</Eyebrow>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Pick a card.{" "}
            <span className="font-lux-serif font-normal italic text-sky-400">Any card.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Four tiers of artisan care, transparently priced. Every package is 100% hand wash —
            no tunnels, no brushes, no shortcuts.
          </p>
        </Reveal>

        {/* Vehicle toggle switch */}
        <Reveal delay={120} className="mt-12 flex flex-col items-center gap-3">
          <div
            role="group"
            aria-label="Select vehicle class"
            className="relative grid w-full max-w-xl grid-cols-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md"
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full bg-blue-600 shadow-[0_0_28px_rgba(59,130,246,0.55)] ring-1 ring-sky-400/50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isSuv ? "translate-x-[calc(100%+6px)]" : "translate-x-1.5"
              )}
            />
            <button
              type="button"
              aria-pressed={!isSuv}
              onClick={() => onVehicleChange("sedan")}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-extrabold transition-colors duration-300",
                !isSuv ? "text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              <Car className="h-4 w-4" />
              Sedan / Coupe
            </button>
            <button
              type="button"
              aria-pressed={isSuv}
              onClick={() => onVehicleChange("suv")}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-extrabold transition-colors duration-300",
                isSuv ? "text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              <CarFront className="h-4 w-4" />
              SUV / Truck / Van
            </button>
          </div>
          <p className="text-xs font-semibold text-zinc-500" aria-live="polite">
            {isSuv
              ? "Showing SUV / Truck / Van pricing (+$15–$35 for added surface & cabin volume)"
              : "Showing Sedan / Coupe pricing — switch above for SUV, truck & van rates"}
          </p>
        </Reveal>

        {/* ---------- 3D Card Stack / Fan-Out ---------- */}
        <div ref={stackRef} className="relative mt-16">
          {/* Ghost pile beneath the fan (desktop) */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-x-10 bottom-0 top-8 hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] transition-all delay-100 duration-1000 xl:block",
              fanned ? "rotate-[-5deg] opacity-60" : "rotate-0 opacity-0"
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-x-6 bottom-0 top-5 hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.03] transition-all delay-200 duration-1000 xl:block",
              fanned ? "rotate-[4deg] opacity-70" : "rotate-0 opacity-0"
            )}
          />

          <div className="relative grid gap-5 [perspective:1800px] md:grid-cols-2 xl:grid-cols-4">
            {PACKAGES.map((pkg, i) => {
              const price = isSuv ? pkg.suvPrice : pkg.sedanPrice;
              const isCenter = i === 1 || i === 2;
              const dimmed = fanned && hovered !== null && hovered !== i;
              return (
                <div
                  key={pkg.id}
                  className={cn(
                    "relative transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [transform-style:preserve-3d]",
                    fanned ? FAN_POSE[i] : cn("translate-y-12 scale-[.96]", PILE_POSE[i]),
                    !fanned ? "opacity-0" : dimmed ? "opacity-40 saturate-[.55] brightness-[.75]" : "opacity-100"
                  )}
                  style={{ transitionDelay: fanned && hovered === null ? `${i * 110}ms` : "0ms" }}
                >
                  <article
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-[#0b0b10]/90 p-7 backdrop-blur-md",
                      "transition-all duration-300 ease-out hover:z-20 hover:-translate-y-4 hover:scale-105 hover:border-sky-400/60 hover:shadow-[0_20px_50px_rgba(59,130,246,0.35)]",
                      pkg.popular
                        ? "border-sky-400/50 shadow-[0_0_45px_rgba(56,189,248,0.22)] ring-1 ring-sky-400/30"
                        : cn("border-white/10", isCenter && CENTER_GLOW)
                    )}
                  >
                    {pkg.popular && (
                      <>
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent"
                          aria-hidden
                        />
                        <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-3 py-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(56,189,248,0.65)]">
                          <Crown className="h-3 w-3" /> Most Popular
                        </span>
                      </>
                    )}

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-zinc-500">
                      Tier {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 pr-14 text-lg font-extrabold leading-snug tracking-tight text-white">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 min-h-[60px] text-[13px] leading-relaxed text-zinc-400">{pkg.tagline}</p>

                    <div className="mt-5 flex items-end gap-2">
                      <span
                        key={`${pkg.id}-${vehicle}`}
                        className="animate-price-in inline-block text-5xl font-extrabold tracking-tighter text-white"
                      >
                        ${price}
                      </span>
                      <span className="pb-1.5 text-xs font-semibold leading-tight text-zinc-500">
                        / vehicle
                        <br />
                        {isSuv ? "SUV rate" : "Sedan rate"}
                      </span>
                    </div>

                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-sky-300">
                      <Clock className="h-3.5 w-3.5" /> {pkg.duration} in-bay
                    </p>

                    <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-[13px] font-medium text-zinc-300">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-400">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => onReserve(pkg.id)}
                      className={cn(
                        "group/btn mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold",
                        BUTTON_PHYSICS,
                        pkg.popular
                          ? "bg-blue-600 text-white shadow-[0_0_28px_rgba(59,130,246,0.5)] ring-1 ring-sky-400/50 hover:bg-blue-500"
                          : "border border-white/15 bg-white/5 text-white hover:border-sky-400/50 hover:bg-sky-500/10"
                      )}
                    >
                      Reserve {pkg.name.split(" ")[0]}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center text-[13px] font-medium text-zinc-500">
            <MousePointer2 className="h-4 w-4 shrink-0 text-sky-400" aria-hidden />
            <span>
              Hover a card to bring it forward.{" "}
              <BadgeCheck className="mr-1 inline h-4 w-4 text-sky-400" aria-hidden />
              Every package includes a final-inspection walkthrough, tire dressing and a text
              alert the moment your car is ready.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
