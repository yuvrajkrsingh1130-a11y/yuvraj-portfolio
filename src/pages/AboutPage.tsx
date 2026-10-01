import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  GitBranch,
  Cpu,
  Monitor,
  CheckCircle2,
  Terminal,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { STUDIO_TIMELINE, STUDIO_PRINCIPLES, HARDWARE_SETUP } from "../data/portfolioData";
import { PageTab } from "../types";

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenSurgeConsole: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setActiveTab,
  onOpenSurgeConsole,
}) => {
  return (
    <div className="min-h-screen blueprint-grid px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1560px]">
        {/* Header */}
        <div className="border-b-2 border-[#103FEF] pb-8">
          <div className="inline-flex items-center gap-2 border border-[#103FEF] bg-[#103FEF] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8]">
            <Compass className="h-3.5 w-3.5" />
            <span>BIOGRAPHY // ARCHITECTURAL MANIFESTO &amp; STUDIO</span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-[#0C0E14]">
            Craft at the intersection of{" "}
            <span className="font-editorial italic font-normal text-[#103FEF]">
              Figma &amp; the DOM.
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-[#0C0E14]/80">
            I am <strong className="font-semibold text-[#0C0E14]">Yuvraj Singh</strong>, a UI/UX
            Designer and Creative Frontend Engineer based in Delhi, India. I specialize in designing
            multi-brand design systems in Figma and engineering high-framerate, accessible web
            applications in React, TypeScript, Tailwind CSS, and Framer Motion.
          </p>
        </div>

        {/* 1. Studio Coordinates & Profile Card */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 border-2 border-[#103FEF] bg-[#F4F0E8] p-6 sm:p-8 shadow-[8px_8px_0px_#103FEF]">
            <div className="flex items-center justify-between border-b border-[#103FEF]/30 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
                STUDIO SPEC SHEET
              </span>
              <span className="font-mono text-[10px] uppercase text-[#0C0E14]/60">
                REV 2026.4
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="border border-[#0C0E14]/20 bg-[#ECE7DC] p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#103FEF] block">
                  PRACTITIONER NAME
                </span>
                <span className="font-editorial text-2xl italic text-[#0C0E14] block mt-0.5">
                  Yuvraj Singh
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#0C0E14]/20 bg-[#ECE7DC] p-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#103FEF] block">
                    LOCATION
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0C0E14] block mt-0.5">
                    Delhi, India
                  </span>
                </div>

                <div className="border border-[#0C0E14]/20 bg-[#ECE7DC] p-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#103FEF] block">
                    GEO COORDINATES
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0C0E14] block mt-0.5">
                    28.6139° N, 77.2090° E
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#0C0E14]/20 bg-[#ECE7DC] p-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#103FEF] block">
                    PRIMARY STACK
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0C0E14] block mt-0.5">
                    React 19, TS, Motion
                  </span>
                </div>

                <div className="border border-[#0C0E14]/20 bg-[#ECE7DC] p-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#103FEF] block">
                    STATIC HOSTING
                  </span>
                  <span className="font-mono text-xs font-bold text-[#27C93F] block mt-0.5">
                    Global Anycast CDN
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#103FEF]/25 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full flex items-center justify-between border border-[#103FEF] bg-[#103FEF] p-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F4F0E8] hover:bg-[#0833D8] transition"
              >
                <span>Dispatch Project Inquiry</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 border-2 border-[#0C0E14] bg-[#F4F0E8] p-6 sm:p-8 shadow-[8px_8px_0px_#0C0E14]">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF] block mb-3">
              THE PHILOSOPHY OF DIGITAL DRAFTING
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C0E14] tracking-tight">
              Bridging the divide between high-concept visual design and production-grade engineering.
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#0C0E14]/85">
              <p>
                In standard product teams, a chasm exists between design handoff and software execution.
                Designers craft static canvas frames without thinking about layout reflow or frame budgets;
                engineers inspect CSS snippets without understanding the spatial intent, typographic harmony,
                or tactile physics behind an interaction.
              </p>
              <p>
                My practice eliminates that seam entirely. By working as a hybrid design technologist,
                every component is conceived through physical pencil drafting, formalized into mathematical
                Figma tokens, and written in clean, semantic TypeScript that deploys to static edge networks
                with sub-second TTFB.
              </p>
              <blockquote className="border-l-2 border-[#103FEF] pl-4 font-editorial text-xl italic text-[#103FEF]">
                “Software shouldn’t feel like disposable web widgets. It should feel like a bespoke piece
                of architectural precision—grounded, responsive, and tactile.”
              </blockquote>
            </div>
          </div>
        </div>

        {/* 2. Studio Principles (6 Tenets) */}
        <div className="mt-20">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
            <Cpu className="h-4 w-4" />
            <span>SIX ARCHITECTURAL PRINCIPLES OF PRACTICE</span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STUDIO_PRINCIPLES.map((pr) => (
              <div
                key={pr.number}
                className="border-2 border-[#103FEF] bg-[#F4F0E8] p-6 shadow-[6px_6px_0px_#103FEF] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#103FEF]/25 pb-2">
                    <span className="bg-[#103FEF] px-2 py-0.5 font-mono text-xs font-bold text-[#F4F0E8]">
                      RULE {pr.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[#103FEF]">
                      AXIOM
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#0C0E14]">
                    {pr.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#103FEF]">
                    {pr.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#0C0E14]/80">
                    {pr.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#103FEF]/20 font-editorial text-sm italic text-[#103FEF]">
                  {pr.quote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Chronological Career & Practice Timeline */}
        <div className="mt-20">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
            <GitBranch className="h-4 w-4" />
            <span>EXPERIENCE CHRONOLOGY // 2022 — PRESENT</span>
          </div>

          <div className="mt-6 border-2 border-[#103FEF] bg-[#ECE7DC] p-6 sm:p-8 shadow-[8px_8px_0px_#0C0E14]">
            <div className="space-y-8 divide-y divide-[#103FEF]/25">
              {STUDIO_TIMELINE.map((item, idx) => (
                <div key={idx} className="pt-6 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#103FEF]">
                        {item.period}
                      </span>
                      <h4 className="mt-1 text-2xl font-bold text-[#0C0E14]">
                        {item.role}
                      </h4>
                      <p className="font-editorial text-lg italic text-[#0C0E14]/75">
                        {item.organization} · {item.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#0C0E14]/85">
                    {item.description}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    {item.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#0C0E14]/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#103FEF] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tokens.map((tok) => (
                      <span
                        key={tok}
                        className="border border-[#103FEF]/30 bg-[#F4F0E8] px-2 py-0.5 font-mono text-[10px] text-[#0C0E14]"
                      >
                        {tok}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Drafting Desk & Hardware Setup */}
        <div className="mt-20">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
            <Monitor className="h-4 w-4" />
            <span>STUDIO EQUIPMENT &amp; DRAFTING HARDWARE</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HARDWARE_SETUP.map((hw, idx) => (
              <div
                key={idx}
                className="border-2 border-[#103FEF] bg-[#F4F0E8] p-5 shadow-[4px_4px_0px_#103FEF]"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#103FEF]">
                  {hw.category}
                </div>
                <div className="mt-1 font-mono text-sm font-bold text-[#0C0E14]">
                  {hw.name}
                </div>
                <div className="mt-1 font-mono text-xs text-[#103FEF] bg-[#ECE7DC] p-1.5 border border-[#103FEF]/20">
                  {hw.spec}
                </div>
                <p className="mt-2 text-xs text-[#0C0E14]/75">
                  {hw.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
