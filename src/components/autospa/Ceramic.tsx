import { useState } from "react";
import { ArrowRight, BadgeCheck, Droplets, FileCheck2, Gem, ShieldCheck, Sun } from "lucide-react";
import { CERAMIC_IMAGE, GALLERY } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS, CARD_PHYSICS, Eyebrow, Reveal } from "./Reveal";

interface CeramicProps {
  onReserve: () => void;
}

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "10-Year Transferable Warranty",
    text: "Registered protection that follows the car — and lifts its resale value — for a full decade.",
  },
  {
    icon: Droplets,
    title: "Intense Hydrophobic Sheeting",
    text: "Water, lovebugs and road film sheet straight off. Washes become rinses.",
  },
  {
    icon: Sun,
    title: "Florida Sun UV Shield",
    text: "Aerospace-grade UV blockers stop Tampa sun from fading and oxidizing your clear coat.",
  },
  {
    icon: FileCheck2,
    title: "CarFax Registered Installation",
    text: "Your coating is documented on your vehicle's CarFax report by our certified installers.",
  },
];

const STATS = [
  { value: "9H", label: "Pencil hardness" },
  { value: "10 Yr", label: "Warranty" },
  { value: "110°", label: "Contact angle" },
  { value: "24 Hr", label: "Full cure" },
];

export function Ceramic({ onReserve }: CeramicProps) {
  const [imgSrc, setImgSrc] = useState(CERAMIC_IMAGE);

  return (
    <section id="ceramic" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/60 via-[#0d0d12] to-[#0a0a0e] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          <div className="grid lg:grid-cols-2">
            {/* Copy */}
            <div className="relative p-8 sm:p-12 lg:p-14">
              <div
                className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[110px]"
                aria-hidden
              />
              <Reveal className="relative">
                <div className="flex justify-start">
                  <Eyebrow>System X® Ceramic Protection</Eyebrow>
                </div>
                <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  9H Diamond Armor.
                  <br />
                  <span className="font-lux-serif font-normal italic text-blue-400">Aerospace-grade</span>{" "}
                  shine.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
                  Born in aerospace, perfected for the road. System X® bonds a diamond-hard,
                  glass-like shell to your paint — installed by certified specialists right here
                  under International Plaza.
                </p>
              </Reveal>

              <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
                {HIGHLIGHTS.map((h, i) => (
                  <Reveal key={h.title} delay={i * 100}>
                    <div
                      className={cn(
                        "h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md",
                        CARD_PHYSICS
                      )}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/15 text-blue-400">
                        <h.icon className="h-4.5 w-4.5" />
                      </span>
                      <h3 className="mt-3.5 text-sm font-extrabold tracking-tight text-white">{h.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{h.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200} className="relative mt-10">
                <button
                  type="button"
                  onClick={onReserve}
                  className={cn(
                    "group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-extrabold text-white shadow-[0_0_38px_rgba(59,130,246,0.55)] ring-1 ring-blue-400/60 hover:bg-blue-500 hover:shadow-[0_0_52px_rgba(59,130,246,0.85)]",
                    BUTTON_PHYSICS
                  )}
                >
                  <Gem className="h-4 w-4" />
                  Reserve Ceramic Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-zinc-500">
                  <BadgeCheck className="h-4 w-4 text-blue-400" />
                  Free paint assessment included — no obligation, no pressure.
                </p>
              </Reveal>
            </div>

            {/* Visual */}
            <Reveal delay={150} className="relative min-h-[420px] lg:min-h-full">
              <div className="absolute inset-0">
                <img
                  src={imgSrc}
                  onError={() => setImgSrc(GALLERY[1].src)}
                  alt="Luxury sports car finished with System X ceramic coating"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0b0b10] lg:via-transparent lg:to-transparent" />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
              </div>

              {/* Floating warranty glass card */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto">
                <div className="rounded-3xl border border-white/15 bg-[#09090b]/70 p-6 shadow-2xl backdrop-blur-md">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-blue-400">
                    System X® Certified Installer
                  </p>
                  <p className="mt-2 text-4xl font-extrabold tracking-tighter text-white">
                    10-Year <span className="font-lux-serif font-normal italic text-blue-300">warranty</span>
                  </p>
                  <div className="mt-5 grid grid-cols-4 gap-4 border-t border-white/10 pt-4">
                    {STATS.map((s) => (
                      <div key={s.label}>
                        <p className="text-base font-extrabold tracking-tight text-white">{s.value}</p>
                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
