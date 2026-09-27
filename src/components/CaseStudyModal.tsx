import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, GitBranch, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { BlueprintProject } from "../types";
import { SpecSheetDiagram } from "./SpecSheetDiagram";

interface CaseStudyModalProps {
  project: BlueprintProject | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0C0E14]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto border-2 border-[#103FEF] bg-[#F4F0E8] p-6 sm:p-10 shadow-[16px_16px_0px_#0C0E14]"
        >
          {/* Top Sheet Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#103FEF] pb-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#103FEF] px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F4F0E8]">
                {project.sheet}
              </span>
              <span className="border border-[#103FEF]/40 bg-[#ECE7DC] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#103FEF]">
                {project.id} // CASE STUDY
              </span>
              <span className="hidden sm:inline-block font-mono text-xs text-[#0C0E14]/60">
                {project.year}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer border border-[#0C0E14]/30 bg-[#ECE7DC] p-2 text-[#0C0E14] transition hover:bg-[#103FEF] hover:text-[#F4F0E8]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Project Title Block */}
          <div className="mt-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#103FEF]">
              {project.category}
            </span>
            <h2 className="mt-1 text-3xl sm:text-5xl font-bold tracking-tight text-[#0C0E14]">
              {project.title}
            </h2>
            <p className="mt-1 font-editorial text-2xl italic text-[#0C0E14]/75">
              {project.subtitle}
            </p>
          </div>

          {/* Main Visual Schematic */}
          <div className="my-8">
            <SpecSheetDiagram type={project.diagramType} exploded={true} />
          </div>

          {/* Architectural Challenge & Solution */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-[#103FEF]/30 bg-[#ECE7DC] p-5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#D9381E]">
                <Cpu className="h-4 w-4" />
                <span>The Architectural Challenge</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#0C0E14]/85">
                {project.challenge || project.summary}
              </p>
            </div>

            <div className="border border-[#103FEF]/30 bg-[#F4F0E8] p-5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#103FEF]">
                <Layers className="h-4 w-4" />
                <span>The Engineering Solution</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#0C0E14]/85">
                {project.solution || "Architected unified token variables with automated edge deployment hooks, sub-second latency optimization, and zero layout shift."}
              </p>
            </div>
          </div>

          {/* Impact & Performance Metrics */}
          {project.impactMetrics && (
            <div className="mt-8 border-y-2 border-[#103FEF]/25 py-6">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF] mb-4">
                MEASURED PRODUCTION IMPACT &amp; TELEMETRY
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="border border-[#0C0E14]/20 bg-[#ECE7DC] p-4">
                    <div className="font-editorial text-3xl sm:text-4xl italic text-[#103FEF]">
                      {metric.value}
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-[#0C0E14]">
                      {metric.label}
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-[#0C0E14]/70">
                      {metric.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack & Technical Specs */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#0C0E14] block mb-3">
                PRODUCTION TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-[#103FEF]/30 bg-[#ECE7DC] px-3 py-1 font-mono text-xs text-[#0C0E14]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#0C0E14] block mb-3">
                ARCHITECTURAL SPECIFICATIONS
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {project.specs.map((s) => (
                  <div key={s.key} className="border border-[#0C0E14]/20 bg-[#F4F0E8] p-2">
                    <span className="text-[10px] text-[#103FEF] uppercase block">{s.key}</span>
                    <span className="font-bold text-[#0C0E14]">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#103FEF] pt-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#103FEF] bg-[#103FEF] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#F4F0E8] shadow-[4px_4px_0px_#0C0E14] transition hover:bg-[#0833D8]"
            >
              <span>Launch Live Deployment</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer border border-[#0C0E14] bg-[#ECE7DC] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#0C0E14] transition hover:bg-[#0C0E14] hover:text-[#F4F0E8]"
            >
              Close Case Study Sheet
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
