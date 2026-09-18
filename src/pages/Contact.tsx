import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import SectionLabel from "../components/SectionLabel";
import { site } from "../data/site";
import { gsap, attachMagnetic, prefersReducedMotion } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   CONTACT — huge CTA + brutalist form. The form composes a
   mailto draft; wire it to a real endpoint when ready.
   ============================================================ */

const PROJECT_TYPES = ["BRAND IDENTITY", "WEBSITE", "DIGITAL EXPERIENCE", "SOMETHING ELSE"];

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
          { y: 54, opacity: 0 },
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
      <div className="mb-16 md:mb-24">
        <p data-contact-rise className="tiny-label mb-8 text-[var(--accent)]">
          [ CONTACT — USUALLY REPLIES WITHIN 48H ]
        </p>
        <h1 data-contact-rise className="display text-[clamp(2.9rem,11.5vw,11rem)] leading-[0.86]">
          LET'S MAKE
          <br />
          SOMETHING
          <br />
          <span className="text-outline">INTERESTING</span>
          <span className="text-[var(--accent)]">.</span>
        </h1>
      </div>

      {/* big CTA */}
      <div data-contact-rise className="mb-24">
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent("PROJECT INQUIRY")}`}
          data-magnetic="0.22"
          data-cursor="WRITE"
          className="group inline-flex flex-wrap items-center gap-5 border-y-2 border-[var(--ink)] py-6 md:gap-8 md:py-8"
        >
          <span
            data-magnetic-inner
            className="display text-[clamp(1.6rem,5.4vw,4.6rem)] leading-none transition-colors duration-300 group-hover:text-[var(--accent)]"
          >
            START A PROJECT
          </span>
          <span
            className="mono text-2xl transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-3 md:text-4xl"
            aria-hidden="true"
          >
            →
          </span>
        </a>
        <p className="tiny-label mt-4 opacity-50">OR JUST WRITE — {site.email}</p>
      </div>

      <div className="grid gap-16 md:grid-cols-12">
        {/* form */}
        <form onSubmit={onSubmit} className="md:col-span-7" aria-label="Project inquiry form">
          <SectionLabel index="06" className="mb-10">
            BRIEF FORM — KEEP IT SHORT
          </SectionLabel>

          <div className="space-y-10">
            <div>
              <label htmlFor="c-name" className="tiny-label mb-2 block opacity-60">
                01 — NAME
              </label>
              <input id="c-name" name="name" required autoComplete="name" placeholder="WHO'S ASKING?" className="field" />
            </div>
            <div>
              <label htmlFor="c-email" className="tiny-label mb-2 block opacity-60">
                02 — EMAIL
              </label>
              <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="WHERE DO I REPLY?" className="field" />
            </div>
            <fieldset>
              <legend className="tiny-label mb-4 opacity-60">03 — PROJECT TYPE</legend>
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
              <label htmlFor="c-msg" className="tiny-label mb-2 block opacity-60">
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
              <button type="submit" className="cta cta-accent" data-magnetic="0.3">
                <span>SEND BRIEF</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
              {sent && (
                <p className="tiny-label text-[var(--accent)]" role="status">
                  OPENING YOUR MAIL APP — IF NOTHING HAPPENED, WRITE TO {site.email}
                </p>
              )}
            </div>
            <p className="tiny-label opacity-40">
              * FORM DRAFTS AN EMAIL. PLUG YOUR OWN ENDPOINT IN src/pages/Contact.tsx WHEN READY.
            </p>
          </div>
        </form>

        {/* side info */}
        <aside className="md:col-span-5">
          <div className="border border-[var(--line-strong)] bg-[var(--bone)] p-8">
            <p className="tiny-label mb-6 text-[var(--accent)]">CURRENT STATUS</p>
            <p className="mono flex items-center gap-3 text-sm">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </p>
            <dl className="mt-10 space-y-6 border-t border-[var(--line-strong)] pt-8">
              <div>
                <dt className="tiny-label mb-1 opacity-50">LOCATION</dt>
                <dd className="mono text-sm">{site.location}</dd>
              </div>
              <div>
                <dt className="tiny-label mb-1 opacity-50">EMAIL</dt>
                <dd className="mono text-sm">
                  <a href={`mailto:${site.email}`} className="underline decoration-[var(--accent)] underline-offset-4">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="tiny-label mb-1 opacity-50">ELSEWHERE</dt>
                <dd>
                  <ul className="space-y-2">
                    {site.socials.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noreferrer" className="footer-link mono text-xs text-[var(--ink)]">
                          {s.label} <span className="opacity-50">{s.handle}</span>
                          <span className="fl-arrow" aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
