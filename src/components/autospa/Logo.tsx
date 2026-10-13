import { Star } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Auto Spa America original wordmark, rebuilt as a crisp vector lockup:
 * red script "Auto" + blue script "Spa" over blue "AMERICA" with 3 red stars.
 * Scales losslessly via the root font-size (pass a text-* class).
 */
export function AutoSpaLogo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Auto Spa America"
      className={cn("inline-flex select-none flex-col leading-none", className)}
    >
      {/* Script line */}
      <span className="flex items-baseline whitespace-nowrap" aria-hidden>
        <span className="bg-[linear-gradient(180deg,#ffc4a3_0%,#ff6a4d_30%,#e8112d_62%,#8f0f1d_100%)] bg-clip-text font-logo-script pr-[0.08em] text-[2em] text-transparent [filter:drop-shadow(0_2px_5px_rgba(232,17,45,0.35))]">
          Auto
        </span>
        <span className="-ml-[0.32em] bg-[linear-gradient(180deg,#eaf7ff_0%,#7dd3fc_32%,#2196e8_62%,#0b3d91_100%)] bg-clip-text font-logo-script text-[2em] text-transparent [filter:drop-shadow(0_2px_5px_rgba(56,189,248,0.35))]">
          Spa
        </span>
      </span>
      {/* AMERICA + stars */}
      <span className="mt-[0.14em] flex items-center gap-[0.55em] pl-[0.06em]" aria-hidden>
        <span className="bg-[linear-gradient(180deg,#dbeafe_0%,#60a5fa_45%,#1e56c8_100%)] bg-clip-text font-logo-sub text-[0.58em] font-bold tracking-[0.34em] text-transparent">
          AMERICA
        </span>
        <span className="flex items-center gap-[0.28em]">
          {[0, 1, 2].map((i) => (
            <Star key={i} className="h-[0.52em] w-[0.52em] fill-[#f43f3f] text-[#f43f3f] drop-shadow-[0_0_4px_rgba(244,63,63,0.6)]" aria-hidden />
          ))}
        </span>
      </span>
    </span>
  );
}
