import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { FAQS, PHONE_DISPLAY, PHONE_HREF } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS, Eyebrow, Reveal } from "./Reveal";

function FaqItem({
  faq,
  open,
  onToggle,
  index,
}: {
  faq: (typeof FAQS)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border bg-white/[0.04] backdrop-blur-md transition-colors duration-300",
        open ? "border-blue-500/50 shadow-[0_12px_35px_rgba(59,130,246,0.18)]" : "border-white/10 hover:border-white/25"
      )}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-7"
      >
        <span
          className={cn(
            "hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-extrabold sm:flex",
            open ? "border-blue-500/50 bg-blue-500/15 text-blue-300" : "border-white/10 bg-white/5 text-zinc-400"
          )}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[15px] font-extrabold tracking-tight text-white sm:text-base">{faq.q}</span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            open
              ? "rotate-180 border-blue-500/50 bg-blue-500/15 text-blue-300"
              : "border-white/10 bg-white/5 text-zinc-400"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-400 sm:px-7 sm:pl-[76px]">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Good Questions</Eyebrow>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Before you{" "}
            <span className="font-lux-serif font-normal italic text-blue-400">hand over the keys.</span>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-3.5">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 70}>
              <FaqItem
                faq={faq}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-sm font-medium text-zinc-500">
            Still curious? The desk answers in minutes.{" "}
            <a
              href={PHONE_HREF}
              className={cn(
                "inline-flex items-center gap-1.5 font-extrabold text-blue-400 underline decoration-blue-500/40 underline-offset-4 hover:text-blue-300",
                BUTTON_PHYSICS
              )}
            >
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
