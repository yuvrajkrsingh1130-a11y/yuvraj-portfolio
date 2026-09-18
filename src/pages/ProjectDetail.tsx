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
    if (titleEl) scrambleTo(titleEl, project.title, 0.9);

    const detach = attachMagnetic(el);
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          "[data-detail-rise]",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "power3.out", delay: 0.15 }
        );
        gsap.fromTo(
          "[data-detail-media]",
          { clipPath: "inset(12% 0 12% 0)" },
          {
            clipPath: "inset(0% 0 0% 0)",
            ease: "none",
            scrollTrigger: { trigger: "[data-detail-media]", start: "top 85%", end: "top 30%", scrub: true },
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
      <div className="flex min-h-[70vh] flex-col items-start justify-center px-[var(--pad)] pt-24">
        <p className="tiny-label mb-4 text-[var(--accent)]">ERROR — PROJECT NOT FOUND</p>
        <CTA to="/work">BACK TO WORK</CTA>
      </div>
    );
  }

  const next = nextProject(project.slug);

  return (
    <div ref={rootRef} className="pt-[calc(var(--nav-h)+2rem)]">
      <div className="px-[var(--pad)]">
        {/* breadcrumb */}
        <nav data-detail-rise className="mono mb-10 flex items-center gap-3 text-xs" aria-label="Breadcrumb">
          <TransitionLink to="/work" className="underline-offset-4 hover:underline">
            INDEX
          </TransitionLink>
          <span className="opacity-40">/</span>
          <span className="text-[var(--accent)]">{project.index}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-60">{project.year}</span>
        </nav>

        {/* title */}
        <p className="tiny-label mb-4 opacity-60">{project.categoryLabel}</p>
        <h1
          data-detail-title
          className="display mb-12 min-h-[1em] text-[clamp(3rem,11vw,11rem)] leading-[0.85]"
        >
          {project.title}
        </h1>

        {/* meta grid */}
        <dl data-detail-rise className="mono mb-16 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-[var(--line-strong)] py-6 text-xs md:grid-cols-4">
          {[
            ["CLIENT", project.client],
            ["ROLE", project.role],
            ["YEAR", project.year],
            ["CATEGORY", project.categoryLabel],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="tiny-label mb-2 opacity-50">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* hero media */}
      <div data-detail-media data-detail-rise className="px-[var(--pad)]">
        <div className="aspect-[16/10] w-full overflow-hidden border border-[var(--line-strong)] md:aspect-[21/10]">
          <CoverArt project={project} className="h-full w-full" label={`${project.title} — key visual`} />
        </div>
      </div>

      <div className="px-[var(--pad)] pb-24 pt-16">
        {/* intro */}
        <p className="display mb-20 max-w-[24ch] text-[clamp(1.7rem,4.4vw,4rem)] leading-[1.02]">
          {project.description}
        </p>

        {/* context / approach */}
        <div className="mb-20 grid gap-10 border-t border-[var(--line-strong)] pt-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="tiny-label mb-5 text-[var(--accent)]">[ CONTEXT ]</h2>
            <p className="max-w-lg text-base leading-relaxed opacity-80">{project.context}</p>
          </div>
          <div>
            <h2 className="tiny-label mb-5 text-[var(--accent)]">[ APPROACH ]</h2>
            <p className="max-w-lg text-base leading-relaxed opacity-80">{project.approach}</p>
          </div>
        </div>

        {/* secondary media */}
        <div className="mb-16 grid grid-cols-12 gap-6">
          <figure className="col-span-12 md:col-span-7">
            <div className="aspect-[4/3] overflow-hidden border border-[var(--line-strong)]">
              <CoverArt project={project} className="h-full w-full" label={`${project.title} — detail 01`} />
            </div>
            <figcaption className="tiny-label mt-3 opacity-50">FIG.A — SYSTEM VIEW</figcaption>
          </figure>
          <figure className="col-span-12 md:col-span-5 md:mt-16">
            <div className="aspect-[4/5] overflow-hidden border border-[var(--line-strong)]">
              <CoverArt project={project} className="h-full w-full" label={`${project.title} — detail 02`} />
            </div>
            <figcaption className="tiny-label mt-3 opacity-50">FIG.B — CLOSE UP</figcaption>
          </figure>
        </div>

        {/* tags */}
        <ul className="flex flex-wrap gap-3" aria-label="Project tags">
          {project.tags.map((t) => (
            <li key={t} className="chip" aria-pressed={undefined}>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* next project */}
      <section data-next className="border-t border-[var(--line-strong)] bg-[var(--ink)] text-[var(--paper)]">
        <TransitionLink
          to={`/work/${next.slug}`}
          data-cursor="NEXT"
          className="group block px-[var(--pad)] py-20 md:py-28"
        >
          <p className="tiny-label mb-6 text-[var(--accent)]">
            NEXT PROJECT — {next.index}/{String(projects.length).padStart(2, "0")}
          </p>
          <h2
            data-next-title
            className="display whitespace-nowrap text-[clamp(3rem,12vw,11rem)] leading-[0.85] transition-colors duration-500 group-hover:text-[var(--accent)]"
          >
            {next.title}
          </h2>
          <p className="mono mt-6 flex items-center gap-3 text-xs opacity-70">
            {next.categoryLabel} — {next.year}
            <span className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">→</span>
          </p>
        </TransitionLink>
      </section>
    </div>
  );
}
