
import { ArrowRight, BadgeCheck, Car, CarFront, Check, Clock, Crown } from "lucide-react";
import { PACKAGES, type VehicleClass } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS, CARD_PHYSICS, Eyebrow, Reveal } from "./Reveal";

interface PackagesProps {
  vehicle: VehicleClass;
  onVehicleChange: (v: VehicleClass) => void;
  onReserve: (packageId?: string) => void;
}

export function Packages({ vehicle, onVehicleChange, onReserve }: PackagesProps) {
  const isSuv = vehicle === "suv";

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
            Choose your{" "}
            <span className="font-lux-serif font-normal italic text-blue-400">ritual.</span>
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
                "absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full bg-blue-600 shadow-[0_0_28px_rgba(59,130,246,0.55)] ring-1 ring-blue-400/50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
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

        {/* Pricing cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((pkg, i) => {
            const price = isSuv ? pkg.suvPrice : pkg.sedanPrice;
            return (
              <Reveal key={pkg.id} delay={i * 110} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/[0.04] p-7 backdrop-blur-md",
                    CARD_PHYSICS,
                    pkg.popular
                      ? "border-blue-500/50 shadow-[0_0_45px_rgba(59,130,246,0.22)] ring-1 ring-blue-500/30"
                      : "border-white/10"
                  )}
                >
                  {pkg.popular && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        aria-hidden
                      />
                      <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                        <Crown className="h-3 w-3" /> Popular Choice
                      </span>
                    </>
                  )}

                  <h3 className="pr-16 text-lg font-extrabold leading-snug tracking-tight text-white">
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

                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-300">
                    <Clock className="h-3.5 w-3.5" /> {pkg.duration} in-bay
                  </p>

                  <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] font-medium text-zinc-300">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
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
                      "group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold",
                      BUTTON_PHYSICS,
                      pkg.popular
                        ? "bg-blue-600 text-white shadow-[0_0_28px_rgba(59,130,246,0.5)] ring-1 ring-blue-400/50 hover:bg-blue-500"
                        : "border border-white/15 bg-white/5 text-white hover:border-blue-500/50 hover:bg-blue-500/10"
                    )}
                  >
                    Reserve {pkg.name.split(" ")[0]}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center text-[13px] font-medium text-zinc-500">
            <BadgeCheck className="h-4 w-4 shrink-0 text-blue-400" />
            Every package includes a complimentary final-inspection walkthrough, tire dressing
            and a text alert the moment your car is ready for pickup.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
