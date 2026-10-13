import { CarFront, KeyRound, ShoppingBag, Sparkles } from "lucide-react";
import { CARD_PHYSICS, Eyebrow, Reveal } from "./Reveal";
import { cn } from "../../utils/cn";

const STEPS = [
  {
    number: "01",
    icon: KeyRound,
    title: "Drop Your Keys",
    meta: "Under 2 minutes",
    description:
      "Roll into the lower deck garage beneath Cheesecake Factory. Hand off your keys at our valet desk — no lines, no waiting rooms.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Detail",
    meta: "Artisan hand craft",
    description:
      "2-bucket hand wash, paint correction and steam sanitization by specialists who treat every panel like their own collection piece.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Dine & Shop",
    meta: "Zero hassle",
    description:
      "Enjoy Nordstrom, Apple and Cheesecake Factory while we work. We text you the moment your car enters final inspection.",
  },
  {
    number: "04",
    icon: CarFront,
    title: "Drive Off Brilliant",
    meta: "Mirror finish",
    description:
      "Return to a showroom mirror finish, detailed wheels and a sanitized cabin. Keys in hand, straight onto Westshore Blvd.",
  },
];

export function Ritual() {
  return (
    <section id="process" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>The Drop-Off Ritual</Eyebrow>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Four steps.{" "}
            <span className="font-lux-serif font-normal italic text-sky-400">Zero</span> waiting.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            The only detail studio in Tampa built around your day — not the other way around.
            Park once, and let the ritual unfold while you&rsquo;re upstairs.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connector line (desktop) */}
          <div
            className="absolute left-0 right-0 top-[52px] hidden border-t border-dashed border-blue-500/25 lg:block"
            aria-hidden
          />
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 120}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md",
                    CARD_PHYSICS
                  )}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-600/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-blue-500/30 bg-[#0c0c10] text-sky-400 shadow-[0_0_22px_rgba(59,130,246,0.25)]">
                        <step.icon className="h-5 w-5" />
                      </span>
                      <span className="text-5xl font-extrabold tracking-tighter text-white/[0.07] transition-colors duration-300 group-hover:text-blue-500/20">
                        {step.number}
                      </span>
                    </div>
                    <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.24em] text-sky-400">
                      {step.meta}
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
