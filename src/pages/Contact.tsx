import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import SectionLabel from "../components/SectionLabel";
import { site } from "../data/site";
import { gsap, attachMagnetic, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   CONTACT & TERMINAL — huge CTA + brutalist form + channels.
   Form drafts a mailto; wire a real endpoint when ready.
   ============================================================ */

const PROJECT_TYPES = ["UI/UX DESIGN", "BRANDING", "WEB EXPERIMENT", "SOMETHING ELSE"];

export default function Contact() {
  usePageTitle("CONTACT — YUVRAJ SINGH");
  const ref = useRef<HTMLDivElement>(null);
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const detach = attachMagnetic(el);
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          "[data-contact-rise]",
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, stagger: 0.09, ease: "power3.out" }
        );
      }
    }, el);
    return () => {
      ctx.revert();
      detach();
    };
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`PROJECT INQUIRY — ${type}`);
    const body = encodeURIComponent(
      `NAME: ${fd.get("name")}\nEMAIL: ${fd.get("email")}\nPROJECT TYPE: ${type}\n\n${fd.get("message")}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div ref={ref} className="px-[var(--pad)] pb-24 pt-[calc(var(--nav-h)+3rem)]">
      {/* huge opening */}
      <div className="mb-16 md:mb-20">
        <p data-contact-rise className="tiny-label mb-8 inline-block bg-[var(--orange)] px-2 py-1 text-[var(--ink)]">
          [ CONTACT TERMINAL — USUALLY REPLIES WITHIN 48H ]
        </p>
        <h1 data-contact-rise className="display text-[clamp(2.5rem,9.8vw,9.6rem)] leading-[0.88]">
          LET'S BUILD
          <br />
          SOMETHING
          <br />
          <span className="bg-[var(--acid)] px-2">UNIGNORABLE</span>
          <span className="text-[var(--orange)]">.</span>
        </h1>
      </div>

      <div className="grid gap-14 md:grid-cols-12">
        {/* form */}
        <form onSubmit={onSubmit} className="md:col-span-7" aria-label="Project inquiry form">
          <SectionLabel index="01" className="mb-10">
            BRIEF FORM — KEEP IT SHORT
          </SectionLabel>

          <div className="space-y-8">
            <div>
              <label htmlFor="c-name" className="tiny-label mb-3 block">
                01 — NAME
              </label>
              <input id="c-name" name="name" required autoComplete="name" placeholder="WHO'S ASKING?" className="field" />
            </div>
            <div>
              <label htmlFor="c-email" className="tiny-label mb-3 block">
                02 — EMAIL
              </label>
              <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="WHERE DO I REPLY?" className="field" />
            </div>
            <fieldset>
              <legend className="tiny-label mb-4">03 — PROJECT TYPE</legend>
              <div className="flex flex-wrap gap-3">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="chip"
                    aria-pressed={type === t}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="c-msg" className="tiny-label mb-3 block">
                04 — MESSAGE
              </label>
              <textarea
                id="c-msg"
                name="message"
                required
                rows={4}
                placeholder="WHAT ARE WE BUILDING?"
                className="field resize-y"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button type="submit" className="cta cta-acid" data-magnetic="0.3">
                <span>SEND BRIEF</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
              {sent && (
                <p className="tiny-label bg-[var(--ink)] px-2 py-1 text-[var(--acid)]" role="status">
                  OPENING YOUR MAIL APP — OR WRITE TO {site.email}
                </p>
              )}
            </div>
            <p className="tiny-label opacity-50">
              * FORM DRAFTS AN EMAIL. PLUG YOUR OWN ENDPOINT IN src/pages/Contact.tsx WHEN READY.
            </p>
          </div>
        </form>

        {/* direct channels */}
        <aside className="md:col-span-5">
          <SectionLabel index="02" className="mb-10">
            DIRECT CHANNELS
          </SectionLabel>

          <ul className="space-y-4">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="group flex items-center justify-between border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] px-5 py-4 shadow-[4px_4px_0_0_var(--ink)] transition-all duration-200 [transition-timing-function:var(--ease-expo)] hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--acid)] hover:shadow-[6px_6px_0_0_var(--acid)]"
                >
                  <span className="mono text-sm font-bold">{s.label}</span>
                  <span className="mono text-xs opacity-70 group-hover:opacity-100">{s.handle}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* coordinates */}
          <div className="mt-8 border-[2.5px] border-[var(--ink)] bg-[var(--ink)] p-6 text-[var(--concrete)] shadow-[5px_5px_0_0_var(--acid)]">
            <p className="tiny-label mb-4 text-[var(--acid)]">LOCAL COORDINATES</p>
            <p className="mono text-sm leading-relaxed">
              {site.base}
              <br />
              {site.coords}
              <br />
              {site.timezone}
            </p>
            <p className="mono mt-5 flex items-center gap-2 text-xs">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
