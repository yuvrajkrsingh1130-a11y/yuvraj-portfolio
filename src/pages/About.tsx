import { useLayoutEffect, useRef } from "react";
import CTA from "../components/CTA";
import SectionLabel from "../components/SectionLabel";
import { site, philosophy, toolkit, timeline } from "../data/site";
import { attachMagnetic, gsap, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   ABOUT & STUDIO MANIFEST
   ============================================================ */

export default function About() {
  usePageTitle("ABOUT — YUVRAJ SINGH");
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const detach = attachMagnetic(el);
    if (prefersReducedMotion()) return () => detach();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-rise]",
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "power3.out" }
      );
      gsap.utils.toArray<HTMLElement>("[data-about-block]").forEach((b) => {
        gsap.fromTo(
          b,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: b, start: "top 86%" },
          }
        );
      });
    }, el);
    return () => {
      ctx.revert();
      detach();
    };
  }, []);

  return (
    <div ref={ref} className="px-[var(--pad)] pb-24 pt-[calc(var(--nav-h)+3rem)]">
      {/* identity card */}
      <section className="mb-20 md:mb-28">
        <p data-about-rise className="tiny-label mb-8 inline-block bg-[var(--ink)] px-2 py-1 text-[var(--acid)]">
          [ IDENTITY CARD — NO CORPORATE BIOGRAPHY INSIDE ]
        </p>

        <div data-about-rise className="grid gap-6 md:grid-cols-12">
          {/* portrait block */}
          <div className="relative flex min-h-[280px] items-center justify-center border-[2.5px] border-[var(--ink)] bg-[var(--acid)] shadow-[7px_7px_0_0_var(--ink)] md:col-span-4">
            <span className="display text-[clamp(5rem,12vw,9rem)]" aria-hidden="true">YS</span>
            <span className="tiny-label absolute left-3 top-3">ID: YS-2026</span>
            <span className="tiny-label absolute bottom-3 right-3">{site.coords}</span>
            <div className="absolute inset-3 border-2 border-dashed border-[var(--ink)] opacity-40" aria-hidden="true" />
          </div>

          {/* name block */}
          <div className="md:col-span-8">
            <h1 data-about-rise className="display text-[clamp(2.8rem,9.5vw,9rem)] leading-[0.88]">
              YUVRAJ
              <br />
              SINGH<span className="text-[var(--orange)]">*</span>
            </h1>
            <p data-about-rise className="mono mt-6 max-w-xl text-sm leading-relaxed md:text-base">
              {site.role}, operating from {site.base}. I design interfaces, identities and
              experiments — then I build them with code and motion so nothing ships as a static
              mockup of itself.
            </p>
            <div data-about-rise className="mt-8 flex flex-wrap gap-3">
              {["DELHI, INDIA", site.timezone, site.status].map((t, i) => (
                <span
                  key={t}
                  className={`border-[2.5px] border-[var(--ink)] px-3 py-2 font-mono text-[10px] font-bold shadow-[3px_3px_0_0_var(--ink)] ${
                    i === 2 ? "bg-[var(--acid)]" : "bg-[var(--concrete)]"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* philosophy */}
      <section className="mb-20 md:mb-28">
        <SectionLabel index="01" className="mb-10">STUDIO MANIFEST</SectionLabel>
        <div className="space-y-6">
          {philosophy.map((line, i) => (
            <p
              key={i}
              data-about-block
              className={`display max-w-5xl border-[2.5px] border-[var(--ink)] p-6 text-[clamp(1.4rem,3.6vw,3rem)] leading-[0.98] shadow-[5px_5px_0_0_var(--ink)] md:p-8 ${
                i === 1 ? "bg-[var(--ink)] text-[var(--concrete)]" : i === 2 ? "bg-[var(--orange)]" : "bg-[var(--concrete)]"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* toolkit */}
      <section className="mb-20 md:mb-28">
        <SectionLabel index="02" className="mb-10">TOOLKIT & STACK — RAW BLOCKS</SectionLabel>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((group, gi) => (
            <div
              key={group.group}
              data-about-block
              className="border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] shadow-[5px_5px_0_0_var(--ink)] transition-transform duration-300 [transition-timing-function:var(--ease-expo)] hover:-translate-y-1"
            >
              <p className={`tiny-label border-b-[2.5px] border-[var(--ink)] px-4 py-3 ${gi % 2 ? "bg-[var(--acid)]" : "bg-[var(--ink)] text-[var(--acid)]"}`}>
                {group.group}
              </p>
              <ul className="mono space-y-3 p-4 text-sm font-bold">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center justify-between border-b-2 border-dashed border-[var(--ink)]/30 pb-2 last:border-0">
                    {item}
                    <span className="text-[var(--orange)]" aria-hidden="true">+</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* experience timeline */}
      <section className="mb-20">
        <SectionLabel index="03" className="mb-10">EXPERIENCE — ROADMAP</SectionLabel>
        <ol className="relative ml-2 border-l-[2.5px] border-[var(--ink)] pl-8 md:ml-4 md:pl-12">
          {timeline.map((m) => (
            <li key={`${m.year}-${m.title}`} data-about-block className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[43px] top-1 h-5 w-5 border-[2.5px] border-[var(--ink)] bg-[var(--acid)] md:-left-[59px]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="mono border-[2.5px] border-[var(--ink)] bg-[var(--ink)] px-2 py-1 text-xs font-bold text-[var(--acid)]">
                  {m.year}
                </span>
                <span className="tiny-label border-[2.5px] border-[var(--ink)] px-2 py-1">{m.tag}</span>
              </div>
              <h3 className="display mt-4 text-3xl md:text-4xl">{m.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-80 md:text-base">{m.detail}</p>
            </li>
          ))}
        </ol>
        <p className="tiny-label mt-10 opacity-60">* SAMPLE TIMELINE — REPLACE WITH REAL MILESTONES IN src/data/site.ts</p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-8 border-t-[2.5px] border-[var(--ink)] pt-12">
        <p className="tiny-label max-w-[24rem] opacity-60">
          DESIGN THAT REFUSES TO WHISPER — THAT'S THE WHOLE PITCH.
        </p>
        <CTA to="/contact" accent>LET'S WORK TOGETHER</CTA>
      </div>
    </div>
  );
}
