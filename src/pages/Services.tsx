import { useLayoutEffect, useRef, useState } from "react";
import CTA from "../components/CTA";
import SectionLabel from "../components/SectionLabel";
import { services, workflow } from "../data/services";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   CAPABILITIES & SERVICES — modular blocks + workflow accordion
   ============================================================ */

const accentClass = {
  acid: "bg-[var(--acid)]",
  orange: "bg-[var(--orange)]",
  ink: "bg-[var(--ink)] text-[var(--acid)]",
};

export default function Services() {
  usePageTitle("SERVICES — YUVRAJ SINGH");
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-svc-rise]",
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "power3.out" }
      );
      gsap.utils.toArray<HTMLElement>("[data-svc-block]").forEach((b, i) => {
        gsap.fromTo(
          b,
          { y: 56, opacity: 0, rotate: i % 2 ? 0.6 : -0.6 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: b, start: "top 85%" },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="px-[var(--pad)] pb-24 pt-[calc(var(--nav-h)+3rem)]">
      {/* header */}
      <div className="mb-16">
        <p data-svc-rise className="tiny-label mb-6 inline-block bg-[var(--ink)] px-2 py-1 text-[var(--acid)]">
          [ CAPABILITIES — WHAT GETS SHIPPED ]
        </p>
        <h1 data-svc-rise className="display text-[clamp(2.8rem,11vw,10.5rem)] leading-[0.85]">
          WHAT I
          <br />
          <span className="bg-[var(--acid)] px-3">DO BEST</span>
          <span className="text-[var(--orange)]">.</span>
        </h1>
      </div>

      {/* service blocks */}
      <div className="mb-24 space-y-8">
        {services.map((s) => (
          <article
            key={s.index}
            data-svc-block
            className="grid gap-0 border-[2.5px] border-[var(--ink)] shadow-[7px_7px_0_0_var(--ink)] md:grid-cols-12"
          >
            <div className={`flex flex-col justify-between gap-6 border-b-[2.5px] border-[var(--ink)] p-8 md:col-span-4 md:border-b-0 md:border-r-[2.5px] ${accentClass[s.accent]}`}>
              <span className="mono text-sm font-bold opacity-70">[{s.index}]</span>
              <h2 className="display text-[clamp(1.8rem,3.6vw,3rem)] leading-[0.92]">{s.title}</h2>
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 md:col-span-8">
              <p className="max-w-xl text-base leading-relaxed opacity-90 md:text-lg">{s.blurb}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="mono flex items-center gap-3 border-2 border-[var(--ink)] bg-[var(--concrete)] px-3 py-2 text-[11px] font-bold shadow-[3px_3px_0_0_var(--ink)]">
                    <span className="h-2 w-2 shrink-0 bg-[var(--orange)]" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* workflow accordion */}
      <SectionLabel index="01" className="mb-10">WORKFLOW — 01 RESEARCH → 04 PRODUCTION</SectionLabel>
      <div className="mb-24 border-[2.5px] border-[var(--ink)] shadow-[7px_7px_0_0_var(--ink)]">
        {workflow.map((step, i) => {
          const isOpen = open === i;
          return (
            <div key={step.index} className={i > 0 ? "border-t-[2.5px] border-[var(--ink)]" : ""}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`wf-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`flex w-full items-center gap-5 px-6 py-5 text-left transition-colors md:px-8 ${
                  isOpen ? "bg-[var(--ink)] text-[var(--acid)]" : "bg-[var(--concrete)] hover:bg-[var(--acid)]"
                }`}
              >
                <span className={`mono text-lg font-bold md:text-2xl ${isOpen ? "text-[var(--orange)]" : ""}`}>
                  {step.index}
                </span>
                <span className="display flex-1 text-2xl md:text-4xl">{step.title}</span>
                <span
                  className={`mono text-2xl transition-transform duration-400 [transition-timing-function:var(--ease-expo)] ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div id={`wf-panel-${i}`} className={`acc-panel ${isOpen ? "open" : ""}`}>
                <div>
                  <p className="border-t-2 border-dashed border-[var(--ink)]/40 bg-[var(--concrete)] px-6 py-6 text-sm leading-relaxed opacity-90 md:px-8 md:text-base">
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-8 border-t-[2.5px] border-[var(--ink)] pt-12">
        <p className="tiny-label max-w-[24rem] opacity-60">
          NEED SOMETHING BETWEEN THESE BLOCKS? THAT'S USUALLY THE INTERESTING PART.
        </p>
        <CTA to="/contact" accent>REQUEST A QUOTE</CTA>
      </div>
    </div>
  );
}
