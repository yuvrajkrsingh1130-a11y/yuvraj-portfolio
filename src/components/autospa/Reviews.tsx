import { BadgeCheck, Quote, Star } from "lucide-react";
import { REVIEWS } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { CARD_PHYSICS, Eyebrow, Reveal } from "./Reveal";

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} role="img" aria-label="Rated 5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </span>
  );
}

/** Multicolor Google "G" rendered as inline SVG (no external asset). */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.2-2.1 3.7-5.1 3.7-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5.1L1.3 17.2C3.3 21.2 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.3 6.8C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.2l3.9-2.9z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.8 1.3 6.8l3.9 2.9c.9-2.9 3.6-5 6.8-5z"
      />
    </svg>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Verified Social Proof</Eyebrow>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Tampa&rsquo;s owners{" "}
            <span className="font-lux-serif font-normal italic text-blue-400">trust us.</span>
          </h2>
        </Reveal>

        {/* Google rating banner */}
        <Reveal delay={120}>
          <div
            className={cn(
              "mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-8 text-center backdrop-blur-md sm:flex-row sm:text-left",
              CARD_PHYSICS
            )}
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              <GoogleMark className="h-8 w-8" />
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <span className="text-3xl font-extrabold tracking-tighter text-white">5.0</span>
                <Stars />
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-zinc-400">
                From <span className="font-bold text-white">300+ verified Google reviews</span> by
                Tampa exotic &amp; luxury car owners.
              </p>
            </div>
            <div className="hidden shrink-0 border-l border-white/10 pl-6 text-center sm:block">
              <p className="text-2xl font-extrabold tracking-tight text-white">98%</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                Repeat
                <br />
                clients
              </p>
            </div>
          </div>
        </Reveal>

        {/* Testimonial cards */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 120} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md",
                  CARD_PHYSICS
                )}
              >
                <Quote className="absolute right-6 top-6 h-8 w-8 text-blue-500/20" aria-hidden />
                <div className="flex items-center gap-3.5">
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-extrabold text-white ring-2 ring-white/15",
                      review.gradient
                    )}
                    aria-hidden
                  >
                    {review.initials}
                  </span>
                  <div className="leading-tight">
                    <p className="flex items-center gap-1.5 text-sm font-extrabold text-white">
                      {review.name}
                      <BadgeCheck className="h-4 w-4 shrink-0 text-blue-400" aria-label="Verified Google review" />
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-zinc-400">
                      {review.vehicle} • {review.neighborhood}
                    </p>
                  </div>
                </div>

                <Stars className="mt-5" />
                <blockquote className="mt-3.5 flex-1 text-[15px] leading-relaxed text-zinc-300">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                <footer className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-400">
                    {review.service}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500">
                    <GoogleMark className="h-3.5 w-3.5" /> Google Review
                  </span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
