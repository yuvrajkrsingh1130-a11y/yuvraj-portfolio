import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  Maximize2,
  ExternalLink,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { BlueprintProject } from "../types";
import { BLUEPRINT_PROJECTS } from "../data/portfolioData";
import { SpecSheetDiagram } from "../components/SpecSheetDiagram";

interface ProjectsPageProps {
  onOpenCaseStudy: (project: BlueprintProject) => void;
  onOpenSurgeConsole: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenCaseStudy,
  onOpenSurgeConsole,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [explodedSheets, setExplodedSheets] = useState<Record<string, boolean>>({
    "ARCH-01": false,
    "SYS-02": true,
    "WEBGL-03": false,
    "KINETIC-04": false,
    "FINTECH-05": false,
  });

  const categories = [
    "ALL",
    "LIVE PRODUCTION DEPLOYMENT",
    "DESIGN SYSTEM & PRODUCT UI",
    "BRAND IDENTITY & KINETIC WEB",
    "MOTION FRAMEWORK & UX LAB",
    "FINANCIAL TELEMETRY & DATA",
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? BLUEPRINT_PROJECTS
      : BLUEPRINT_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen blueprint-grid px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1560px]">
        {/* Page Header */}
        <div className="border-b-2 border-[#103FEF] pb-8">
          <div className="inline-flex items-center gap-2 border border-[#103FEF] bg-[#103FEF] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8]">
            <Grid className="h-3.5 w-3.5" />
            <span>ARCHITECTURAL DRAWING CATALOG // CASE STUDIES</span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-[#0C0E14]">
            Engineering &amp;{" "}
            <span className="font-editorial italic font-normal text-[#103FEF]">
              Spatial Architecture.
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-[#0C0E14]/80">
            A comprehensive catalog of production web applications, design systems, and motion
            experiments engineered by Yuvraj Singh. Every sheet is verified for sub-second edge
            performance, zero cumulative layout shift, and WCAG AAA compliance.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 font-mono text-xs uppercase text-[#103FEF] mr-2">
              <Filter className="h-3.5 w-3.5" />
              <span>FILTER DISCIPLINE:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                  selectedCategory === cat
                    ? "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8] shadow-[2px_2px_0px_#0C0E14]"
                    : "border-[#103FEF]/30 bg-[#ECE7DC] text-[#0C0E14] hover:border-[#103FEF]"
                }`}
              >
                {cat === "ALL" ? "All Drawing Sheets (5)" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project, idx) => {
            const isExploded = !!explodedSheets[project.id];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between border-2 border-[#103FEF] bg-[#F4F0E8] p-6 sm:p-8 shadow-[8px_8px_0px_#103FEF] transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#103FEF] pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-[#103FEF] px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F4F0E8]">
                        {project.sheet}
                      </span>
                      <span className="border border-[#103FEF]/40 bg-[#ECE7DC] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#103FEF]">
                        {project.scale}
                      </span>
                      <span className="font-mono text-[10px] text-[#0C0E14]/60">
                        {project.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExplodedSheets((prev) => ({
                          ...prev,
                          [project.id]: !prev[project.id],
                        }))
                      }
                      className={`inline-flex cursor-pointer items-center gap-1.5 border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
                        isExploded
                          ? "border-[#0C0E14] bg-[#0C0E14] text-[#F4F0E8]"
                          : "border-[#103FEF] bg-[#F4F0E8] text-[#103FEF] hover:bg-[#103FEF] hover:text-[#F4F0E8]"
                      }`}
                    >
                      <Maximize2 className="h-3 w-3" />
                      <span>{isExploded ? "Collapse" : "Explode Z-Layers"}</span>
                    </button>
                  </div>

                  {/* Title & Metadata */}
                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#103FEF]">
                        {project.category}
                      </p>
                      <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#0C0E14]">
                        {project.title}
                      </h2>
                      <p className="font-editorial text-xl italic text-[#0C0E14]/75">
                        {project.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0C0E14]/60">
                      {project.year}
                    </span>
                  </div>

                  {/* Schematic */}
                  <div className="my-5">
                    <SpecSheetDiagram
                      type={project.diagramType}
                      exploded={isExploded}
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-[#0C0E14]/85">
                    {project.summary}
                  </p>

                  {/* Specs Table */}
                  <div className="mt-6 grid grid-cols-2 gap-px border border-[#103FEF]/40 bg-[#103FEF]/30">
                    {project.specs.map((spec) => (
                      <div key={spec.key} className="bg-[#ECE7DC] p-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#103FEF]">
                          {spec.key}
                        </div>
                        <div className="mt-1 font-mono text-xs font-bold text-[#0C0E14]">
                          {spec.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#103FEF]/25 pt-5">
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(project)}
                    className="inline-flex cursor-pointer items-center gap-1.5 border border-[#103FEF] bg-[#103FEF] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#F4F0E8] shadow-[3px_3px_0px_#0C0E14] transition hover:bg-[#0833D8]"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-[#0C0E14]/30 bg-[#ECE7DC] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0C0E14] transition hover:border-[#103FEF] hover:bg-[#103FEF] hover:text-[#F4F0E8]"
                  >
                    <span>Launch Live</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Technical Architecture Comparison Table */}
        <div className="mt-20 border-2 border-[#103FEF] bg-[#ECE7DC] p-6 sm:p-8 shadow-[10px_10px_0px_#103FEF]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#103FEF]/25 pb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
                PRODUCTION BENCHMARK AUDIT // 2026
              </span>
              <h3 className="mt-1 text-2xl font-bold text-[#0C0E14]">
                Technical Performance &amp; Edge Latency Audit
              </h3>
            </div>

            <button
              type="button"
              onClick={onOpenSurgeConsole}
              className="inline-flex cursor-pointer items-center gap-1.5 border border-[#103FEF] bg-[#F4F0E8] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#103FEF] hover:bg-[#103FEF] hover:text-[#F4F0E8] transition"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Verify Surge 200 OK Status</span>
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-[#103FEF]/30 bg-[#F4F0E8]">
              <thead>
                <tr className="border-b border-[#103FEF]/30 bg-[#103FEF] text-[#F4F0E8]">
                  <th className="p-3">SHEET ID</th>
                  <th className="p-3">PROJECT NAME</th>
                  <th className="p-3">LIGHTHOUSE</th>
                  <th className="p-3">EDGE LATENCY</th>
                  <th className="p-3">LAYOUT SHIFT</th>
                  <th className="p-3">SURGE SPA STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#103FEF]/20">
                {BLUEPRINT_PROJECTS.map((p) => (
                  <tr key={p.id} className="hover:bg-[#ECE7DC]/60 transition">
                    <td className="p-3 font-bold text-[#103FEF]">{p.id}</td>
                    <td className="p-3 font-medium text-[#0C0E14]">{p.title}</td>
                    <td className="p-3 text-[#27C93F] font-bold">100 / 100</td>
                    <td className="p-3">&lt; 40ms Edge</td>
                    <td className="p-3">0.000 CLS</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-[#27C93F] font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>200 OK (200.html)</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
