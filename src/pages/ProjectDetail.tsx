import { useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CoverArt from "../components/CoverArt";
import CTA from "../components/CTA";
import { TransitionLink } from "../components/PageTransition";
import { getProject, nextProject, projects } from "../data/projects";
import { gsap, attachMagnetic, prefersReducedMotion, scrambleTo } from "../lib/motion";
import { usePageTitle } from "../lib/hooks";

/* ============================================================
   PROJECT DETAIL — one template, fully data-driven.
   ============================================================ */

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  const rootRef = useRef<HTMLDivElement>(null);

  usePageTitle(project ? `${project.title} — YUVRAJ SINGH` : "PROJECT — YUVRAJ SINGH");

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || !project) return;

    const titleEl = el.querySelector<HTMLElement>("[data-detail-title]");
    if (titleEl) scrambleTo(titleEl, project.title, 0.85);

    const detach = attachMagnetic(el);
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          "[data-detail-rise]",
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: "power3.out", delay: 0.12 }
        );
        gsap.fromTo(
          "[data-detail-media]",
          { clipPath: "inset(10% 0 10% 0)" },
          {
            clipPath: "inset(0% 0 0% 0)",
            ease: "none",
            scrollTrigger: { trigger: "[data-detail-media]", start: "top 85%", end: "top 35%", scrub: true },
          }
        );
        gsap.fromTo(
          "[data-next-title]",
          { xPercent: 6 },
          {
            xPercent: -4,
            ease: "none",
            scrollTrigger: { trigger: "[data-next]", start: "top bottom", end: "bottom bottom", scrub: true },
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
      detach();
    };
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-start justify-center gap-8 px-[var(--pad)] pt-24">
        <p className="tiny-label border-[2.5px] border-[var(--ink)] bg-[var(--orange)] px-2 py-1 text-[var(--concrete)]">
          ERROR — PROJECT NOT FOUND
        </p>
        <CTA to="/work">BACK TO ARCHIVE</CTA>
      </div>
    );
  }

  const next = nextProject(project.slug);

  return (
    <div ref={rootRef} className="pt-[calc(var(--nav-h)+2rem)]">
      <div className="px-[var(--pad)]">
        {/* breadcrumb */}
        <nav data-detail-rise className="mono mb-10 flex items-center gap-3 text-xs" aria-label="Breadcrumb">
          <TransitionLink to="/work" className="underline decoration-[2.5px] underline-offset-4 hover:decoration-[var(--orange)]">
            ARCHIVE
          </TransitionLink>
          <span className="opacity-40">/</span>
          <span className="bg-[var(--acid)] px-1 font-bold">[{project.index}]</span>
          <span className="opacity-40">/</span>
          <span className="opacity-60">{project.year}</span>
        </nav>

        {/* title */}
        <p className="tiny-label mb-4 border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] inline-block px-2 py-1 shadow-[3px_3px_0_0_var(--ink)]">
          {project.categoryLabel}
        </p>
        <h1
          data-detail-title
          className="display mb-12 min-h-[1em] text-[clamp(2.8rem,10.5vw,10.5rem)] leading-[0.88]"
        >
          {project.title}
        </h1>

        {/* meta grid */}
        <dl
          data-detail-rise
          className="mono mb-16 grid grid-cols-2 gap-px border-[2.5px] border-[var(--ink)] bg-[var(--ink)] text-xs shadow-[5px_5px_0_0_var(--ink)] md:grid-cols-4"
        >
          {[
            ["CLIENT", project.client],
            ["ROLE", project.role],
            ["YEAR", project.year],
            ["STACK", project.tech.join(" / ")],
          ].map(([k, v]) => (
            <div key={k} className="bg-[var(--concrete)] p-4">
              <dt className="tiny-label mb-2 text-[var(--orange)]">{k}</dt>
              <dd className="leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* hero media */}
      <div data-detail-media className="px-[var(--pad)]">
        <div className="aspect-[16/10] w-full overflow-hidden border-[2.5px] border-[var(--ink)] shadow-[7px_7px_0_0_var(--ink)] md:aspect-[21/10]">
          <CoverArt project={project} className="h-full w-full" label={`${project.title} — key visual`} />
        </div>
      </div>

      <div className="px-[var(--pad)] pb-24 pt-16">
        {/* intro */}
        <p className="display mb-20 max-w-[26ch] text-[clamp(1.6rem,4.2vw,3.6rem)] leading-[1.02]">
          {project.description}
        </p>

        {/* context / approach */}
        <div className="mb-20 grid gap-8 md:grid-cols-2">
          <div className="border-[2.5px] border-[var(--ink)] bg-[var(--concrete)] p-8 shadow-[5px_5px_0_0_var(--ink)]">
            <h2 className="tiny-label mb-5 bg-[var(--ink)] inline-block px-2 py-1 text-[var(--acid)]">[ CONTEXT ]</h2>
            <p className="max-w-lg text-base leading-relaxed opacity-90">{project.context}</p>
          </div>
          <div className="border-[2.5px] border-[var(--ink)] bg-[var(--acid)] p-8 shadow-[5px_5px_0_0_var(--ink)]">
            <h2 className="tiny-label mb-5 bg-[var(--ink)] inline-block px-2 py-1 text-[var(--acid)]">[ APPROACH ]</h2>
            <p className="max-w-lg text-base leading-relaxed">{project.approach}</p>
          </div>
        </div>

        {/* secondary media */}
        <div className="mb-16 grid grid-cols-12 gap-6">
          <figure className="col-span-12 md:col-span-7">
            <div className="aspect-[4/3] overflow-hidden border-[2.5px] border-[var(--ink)] shadow-[5px_5px_0_0_var(--ink)]">
              <CoverArt project={project} className="h-full w-full" label={`${project.title} — system view`} />
            </div>
            <figcaption className="tiny-label mt-3 opacity-60">FIG.A — SYSTEM VIEW</figcaption>
          </figure>
          <figure className="col-span-12 md:col-span-5 md:mt-16">
            <div className="aspect-[4/5] overflow-hidden border-[2.5px] border-[var(--ink)] shadow-[5px_5px_0_0_var(--ink)]">
              <CoverArt project={project} className="h-full w-full" label={`${project.title} — close up`} />
            </div>
            <figcaption className="tiny-label mt-3 opacity-60">FIG.B — CLOSE UP</figcaption>
          </figure>
        </div>

        {/* tags + prototype */}
        <div className="flex flex-wrap items-center gap-3">
          <ul className="flex flex-wrap gap-3" aria-label="Project tags">
            {project.tags.map((t) => (
              <li key={t} className="chip" aria-pressed="false">{t}</li>
            ))}
          </ul>
          {project.link && (
            <CTA href={project.link} ink className="ml-auto">
              LIVE PROTOTYPE
            </CTA>
          )}
        </div>
      </div>

      {/* next project */}
      <section data-next className="border-t-[2.5px] border-[var(--ink)] bg-[var(--ink)] text-[var(--concrete)]">
        <TransitionLink
          to={`/work/${next.slug}`}
          data-cursor="NEXT"
          className="group block px-[var(--pad)] py-20 md:py-28"
        >
          <p className="tiny-label mb-6 inline-block bg-[var(--acid)] px-2 py-1 text-[var(--ink)]">
            NEXT PROJECT — {next.index}/{String(projects.length).padStart(2, "0")}
          </p>
          <h2
            data-next-title
            className="display whitespace-nowrap text-[clamp(2.8rem,11vw,10.5rem)] leading-[0.88] transition-colors duration-300 group-hover:text-[var(--acid)]"
          >
            {next.title}
          </h2>
          <p className="mono mt-6 flex items-center gap-3 text-xs opacity-80">
            {next.categoryLabel} — {next.year}
            <span className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">→</span>
          </p>
        </TransitionLink>
      </section>
    </div>
  );
}
