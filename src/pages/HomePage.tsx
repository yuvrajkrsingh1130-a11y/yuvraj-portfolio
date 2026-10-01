import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  ExternalLink,
  Eye,
  Grid,
  Layers,
  Maximize2,
  PenTool,
  Sparkles,
  Terminal,
  Zap,
  Cpu,
  MousePointer2,
} from "lucide-react";
import { BlueprintProject, PageTab, StageSpec } from "../types";
import { SCROLL_STAGES, BLUEPRINT_PROJECTS } from "../data/portfolioData";
import { SpecSheetDiagram } from "../components/SpecSheetDiagram";
import { KineticTicker } from "../components/KineticTicker";

interface HomePageProps {
  blueprintXRay: boolean;
  setBlueprintXRay: React.Dispatch<React.SetStateAction<boolean>>;
  cursorEnabled: boolean;
  setCursorEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenCaseStudy: (project: BlueprintProject) => void;
  setActiveTab: (tab: PageTab) => void;
  onOpenSurgeConsole: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  blueprintXRay,
  setBlueprintXRay,
  cursorEnabled,
  setCursorEnabled,
  onOpenCaseStudy,
  setActiveTab,
  onOpenSurgeConsole,
}) => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [explodedSheets, setExplodedSheets] = useState<Record<string, boolean>>({
    "ARCH-01": false,
    "SYS-02": true,
    "WEBGL-03": false,
    "KINETIC-04": false,
  });
  const [activeTokenAccent, setActiveTokenAccent] = useState<
    "#103FEF" | "#0C0E14" | "#D9381E" | "#059669"
  >("#103FEF");

  // Sticky 400vh Scroll-Driven Desk
  const deskScrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: deskScrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (val) => {
      if (val < 0.25) setActiveStage(1);
      else if (val < 0.5) setActiveStage(2);
      else if (val < 0.75) setActiveStage(3);
      else setActiveStage(4);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Continuous 3D transforms for desk canvas
  const canvasRotateX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [56, 52, 42, 14]);
  const canvasRotateZ = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [-32, -26, -16, 0]);
  const canvasScale = useTransform(smoothProgress, [0, 0.5, 0.85, 1], [0.92, 0.98, 1.03, 1.06]);
  const progressPercent = useTransform(smoothProgress, (v) => `${Math.round(v * 100)}%`);

  const scrollToStage = (stageNum: number) => {
    if (!deskScrollRef.current) return;
    const containerTop = deskScrollRef.current.offsetTop;
    const containerHeight = deskScrollRef.current.offsetHeight - window.innerHeight;
    const ratios: Record<number, number> = {
      1: 0.06,
      2: 0.36,
      3: 0.63,
      4: 0.92,
    };
    const targetY = containerTop + containerHeight * (ratios[stageNum] ?? 0);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const currentStageData =
    SCROLL_STAGES.find((s) => s.id === activeStage) || SCROLL_STAGES[0];

  return (
    <div className="relative">
      {/* =====================================================================
          1. HERO DRAFTING HEADER BANNER
      ===================================================================== */}
      <section className="blueprint-grid relative overflow-hidden border-b border-[#103FEF]/25 px-4 pb-16 pt-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1560px]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 inline-flex flex-wrap items-center gap-2.5 border border-[#103FEF] bg-[#103FEF]/8 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#103FEF]"
              >
                <PenTool className="h-3.5 w-3.5" />
                <span>TRACING PAPER TO PRODUCTION DOM // ILLOCA-INSPIRED CAD ENGINE</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-6xl lg:text-[5.25rem] font-semibold leading-[1.04] sm:leading-[0.98] tracking-[-0.035em] text-[#0C0E14]"
              >
                Design at the speed of thought.{" "}
                <span className="font-editorial italic font-normal text-[#103FEF]">
                  Engineered for the web.
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-between border-l-2 border-[#103FEF] pl-5 lg:col-span-4"
            >
              <p className="text-sm leading-relaxed text-[#0C0E14]/80 sm:text-base">
                Portfolio of <strong className="font-semibold text-[#0C0E14]">Yuvraj Singh</strong> —
                UI/UX Designer, Design Technologist &amp; Creative Frontend Engineer in Delhi, India.
                Scroll the drafting desk below to witness raw pencil wireframes assemble into live edge architecture.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("projects")}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#103FEF] bg-[#103FEF] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#F4F0E8] shadow-[3px_3px_0px_#0C0E14] transition hover:bg-[#0833D8]"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setBlueprintXRay((prev) => !prev)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 font-mono text-xs uppercase tracking-[0.14em] transition ${
                    blueprintXRay
                      ? "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8]"
                      : "border-[#0C0E14]/30 bg-[#ECE7DC] text-[#0C0E14] hover:border-[#103FEF]"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{blueprintXRay ? "X-Ray: ON" : "X-Ray: OFF"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCursorEnabled((prev) => !prev)}
                  className={`hidden sm:inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition ${
                    cursorEnabled
                      ? "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8]"
                      : "border-[#0C0E14]/30 bg-[#ECE7DC] text-[#0C0E14] hover:border-[#103FEF]"
                  }`}
                  title="Toggle drafting crosshairs reticle"
                >
                  <MousePointer2 className="h-3.5 w-3.5" />
                  <span>{cursorEnabled ? "CAD Reticle" : "Cursor"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kinetic Marquee Ribbon */}
      <KineticTicker variant={blueprintXRay ? "cobalt" : "cream"} />

      {/* =====================================================================
          2. CORE FEATURE: PINNED 400VH SCROLL-DRIVEN "DESK-TO-INTERFACE"
      ===================================================================== */}
      <section
        id="process"
        ref={deskScrollRef}
        className="relative min-h-[400vh] border-b border-[#103FEF]/30"
      >
        <div
          className={`sticky top-[61px] flex min-h-[calc(100vh-61px)] flex-col justify-between overflow-hidden transition-colors duration-500 ${
            blueprintXRay
              ? "cobalt-blueprint-grid bg-[#0833D8] text-[#F4F0E8]"
              : "blueprint-grid bg-[#F4F0E8] text-[#0C0E14]"
          }`}
        >
          {/* Top HUD Bar */}
          <div
            className={`border-b px-4 py-3 sm:px-6 lg:px-10 ${
              blueprintXRay
                ? "border-[#F4F0E8]/20 bg-[#0833D8]/90"
                : "border-[#103FEF]/20 bg-[#ECE7DC]/85"
            } backdrop-blur-md`}
          >
            <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${
                    blueprintXRay
                      ? "border-[#F4F0E8] bg-[#F4F0E8] text-[#103FEF]"
                      : "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8]"
                  }`}
                >
                  <Compass className="h-3.5 w-3.5" />
                  DESK-TO-INTERFACE ENGINE
                </span>
                <span className="hidden font-mono text-xs uppercase tracking-[0.18em] opacity-75 sm:inline">
                  SCROLL PROGRESS:
                </span>
                <motion.span className="font-mono text-xs font-bold text-[#103FEF] bg-[#F4F0E8] px-2 py-0.5 border border-[#103FEF]/30">
                  {progressPercent}
                </motion.span>
              </div>

              {/* Stage Selector Pills (Horizontal swipe on mobile) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full -mx-1 px-1 sm:mx-0 sm:px-0">
                {SCROLL_STAGES.map((st) => {
                  const isCurrent = activeStage === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => scrollToStage(st.id)}
                      className={`shrink-0 cursor-pointer rounded-full border px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] transition-all ${
                        isCurrent
                          ? "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8] shadow-[2px_2px_0px_#0C0E14]"
                          : blueprintXRay
                          ? "border-[#F4F0E8]/30 bg-[#0833D8] text-[#F4F0E8]/80 hover:border-[#F4F0E8]"
                          : "border-[#103FEF]/30 bg-[#F4F0E8] text-[#0C0E14]/80 hover:border-[#103FEF]"
                      }`}
                    >
                      0{st.id}. {st.badge}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Stage Grid: On mobile, 3D model is on top so it transforms on screen, followed by compact spec card */}
          <div className="mx-auto flex flex-col lg:grid w-full max-w-[1560px] flex-1 items-center gap-3 sm:gap-8 px-3 py-3 sm:px-6 lg:grid-cols-12 lg:px-10 overflow-hidden">
            {/* Dynamic Stage Narrative Card */}
            <div className="order-2 lg:order-1 z-20 lg:col-span-5 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStageData.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`relative border-2 p-4 sm:p-8 ${
                    blueprintXRay
                      ? "border-[#F4F0E8] bg-[#103FEF]/95 text-[#F4F0E8] shadow-[6px_6px_0px_rgba(244,240,232,0.25)] sm:shadow-[8px_8px_0px_rgba(244,240,232,0.25)]"
                      : "border-[#103FEF] bg-[#F4F0E8]/95 text-[#0C0E14] shadow-[6px_6px_0px_#103FEF] sm:shadow-[8px_8px_0px_#103FEF]"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-current/20 pb-2.5">
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF] bg-[#F4F0E8] px-2 py-0.5 border border-[#103FEF]">
                      {currentStageData.code}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] opacity-75">
                      {currentStageData.rangeLabel}
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current font-mono text-sm font-bold">
                      {currentStageData.id}
                    </span>
                    <p className="font-editorial text-3xl italic sm:text-4xl">
                      {currentStageData.badge} //
                    </p>
                  </div>

                  <h2 className="mt-2 sm:mt-3 text-lg sm:text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
                    {currentStageData.headline}
                  </h2>

                  <p className="mt-1 sm:mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] opacity-70">
                    {currentStageData.subheadline}
                  </p>

                  <p className="mt-2 sm:mt-4 text-xs sm:text-base leading-relaxed opacity-90 line-clamp-2 sm:line-clamp-none">
                    {currentStageData.description}
                  </p>

                  {/* 3 Metrics */}
                  <div className="mt-3 sm:mt-6 grid grid-cols-3 gap-1.5 sm:gap-2 border-y border-current/20 py-2 sm:py-3.5">
                    {currentStageData.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] opacity-65">
                          {m.label}
                        </div>
                        <div className="mt-0.5 font-mono text-xs sm:text-base font-bold">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables (Hidden on tiny mobile screens to preserve viewport space) */}
                  <div className="mt-3 sm:mt-5 hidden sm:block">
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                      STAGE ARTIFACTS &amp; OUTPUTS:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentStageData.deliverables.map((item) => (
                        <span
                          key={item}
                          className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                            blueprintXRay
                              ? "border-[#F4F0E8]/40 bg-[#0833D8]"
                              : "border-[#103FEF]/35 bg-[#ECE7DC]"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Controls */}
                  <div className="mt-3 sm:mt-6 flex flex-wrap items-center justify-between gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {[1, 2, 3, 4].map((step) => (
                        <button
                          key={step}
                          type="button"
                          onClick={() => scrollToStage(step)}
                          aria-label={`Jump to stage ${step}`}
                          className={`h-2 sm:h-2.5 cursor-pointer transition-all ${
                            activeStage === step
                              ? "w-6 sm:w-8 bg-[#103FEF]"
                              : "w-2 sm:w-2.5 bg-current/25 hover:bg-current/50"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("projects")}
                      className="inline-flex cursor-pointer items-center gap-1 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] underline decoration-2 underline-offset-4 hover:opacity-80 text-[#103FEF]"
                    >
                      <span>Explore All Projects</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Over-the-Shoulder 3D Desk Canvas: Shown on top on mobile, right on desktop */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center lg:col-span-7 w-full overflow-hidden">
              <div
                className="relative flex h-[230px] sm:h-[360px] lg:h-[520px] w-full items-center justify-center overflow-hidden"
                style={{ perspective: "1300px" }}
              >
                {/* Desk Tools Underlay */}
                <div className="pointer-events-none absolute inset-2 sm:inset-4 rounded-xl sm:rounded-2xl border-2 border-dashed border-[#103FEF]/30 bg-[#ECE7DC]/45">
                  <div className="flex h-5 sm:h-6 items-center justify-between border-b border-[#103FEF]/25 px-2 sm:px-4 font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#103FEF]">
                    <span>00PX</span>
                    <span className="hidden sm:inline">240PX</span>
                    <span>DRAFTING DESK</span>
                    <span className="hidden sm:inline">960PX</span>
                    <span>1440PX</span>
                  </div>

                  <div className="absolute bottom-4 left-4 hidden sm:flex flex-col gap-2">
                    <div className="flex items-center gap-2 border border-[#103FEF]/40 bg-[#F4F0E8] px-3 py-1.5 shadow-sm">
                      <PenTool className="h-3.5 w-3.5 text-[#103FEF]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0C0E14]">
                        GRAPHITE 2B // TRACING LAYER
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 hidden border border-[#103FEF]/40 bg-[#F4F0E8] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#103FEF] sm:block">
                    ACTIVE CAMERA: {activeStage < 4 ? "ISO-30°" : "FRONTAL 1:1"}
                  </div>
                </div>

                {/* 3D Transform Canvas (Scales cleanly across mobile and desktop) */}
                <motion.div
                  style={{
                    rotateX: canvasRotateX,
                    rotateZ: canvasRotateZ,
                    scale: canvasScale,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative h-[210px] w-[270px] sm:h-[320px] sm:w-[420px] lg:h-[360px] lg:w-[490px] shrink-0"
                >
                  {/* BASE TRACING SHEET (Stage 1) */}
                  <div
                    className="absolute inset-0 border-2 border-[#103FEF] bg-[#F4F0E8] p-4 shadow-[16px_16px_0px_rgba(16,63,239,0.22)]"
                    style={{ transform: "translateZ(0px)" }}
                  >
                    <div className="flex items-center justify-between border-b border-[#103FEF]/30 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#103FEF]" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#103FEF]">
                          SHEET // YUVRAJ.DESIGN — STAGE 0{activeStage}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase text-[#0C0E14]/60">
                        1440 × 900PX
                      </span>
                    </div>

                    <div className="relative mt-3 h-[235px] sm:h-[280px]">
                      <svg viewBox="0 0 440 250" className="h-full w-full overflow-visible">
                        <line x1="0" y1="0" x2="440" y2="250" stroke="#103FEF" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.45" />
                        <line x1="440" y1="0" x2="0" y2="250" stroke="#103FEF" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.45" />

                        <rect x="8" y="10" width="95" height="225" fill="rgba(16, 63, 239, 0.04)" stroke="#103FEF" strokeWidth="1.5" strokeDasharray="6 3" />
                        <text x="16" y="28" fill="#103FEF" fontSize="8" fontFamily="Space Mono, monospace">
                          NAV // RAIL
                        </text>
                        <line x1="16" y1="42" x2="84" y2="42" stroke="#0C0E14" strokeWidth="2" />
                        <line x1="16" y1="56" x2="72" y2="56" stroke="#103FEF" strokeWidth="1.5" />
                        <line x1="16" y1="70" x2="78" y2="70" stroke="#103FEF" strokeWidth="1.5" />
                        <line x1="16" y1="84" x2="64" y2="84" stroke="#103FEF" strokeWidth="1.5" />

                        <rect x="116" y="10" width="314" height="108" fill="rgba(244, 240, 232, 0.9)" stroke="#0C0E14" strokeWidth="1.5" />
                        <path d="M 130 95 C 190 25, 270 110, 410 32" fill="none" stroke="#103FEF" strokeWidth="2.2" className="animate-draft-line" />
                        <circle cx="130" cy="95" r="4" fill="#F4F0E8" stroke="#103FEF" strokeWidth="2" />
                        <circle cx="410" cy="32" r="4" fill="#103FEF" />
                        <text x="128" y="30" fill="#0C0E14" fontSize="11" fontFamily="Instrument Serif, serif" fontStyle="italic">
                          &ldquo;Raw Sketch Intent → Structured Grid&rdquo;
                        </text>

                        <rect x="116" y="130" width="98" height="105" fill="rgba(16,63,239,0.06)" stroke="#103FEF" strokeWidth="1.4" />
                        <rect x="224" y="130" width="98" height="105" fill="rgba(16,63,239,0.06)" stroke="#103FEF" strokeWidth="1.4" />
                        <rect x="332" y="130" width="98" height="105" fill="rgba(16,63,239,0.06)" stroke="#103FEF" strokeWidth="1.4" />
                        <text x="126" y="150" fill="#103FEF" fontSize="8" fontFamily="Space Mono, monospace">ATOM // 01</text>
                        <text x="234" y="150" fill="#103FEF" fontSize="8" fontFamily="Space Mono, monospace">ATOM // 02</text>
                        <text x="342" y="150" fill="#103FEF" fontSize="8" fontFamily="Space Mono, monospace">ATOM // 03</text>
                      </svg>
                    </div>
                  </div>

                  {/* STAGE 2 LAYER: 3D Atoms */}
                  <motion.div
                    animate={{
                      opacity: activeStage >= 2 ? 1 : 0.12,
                      z: activeStage >= 2 ? 44 : 8,
                    }}
                    transition={{ duration: 0.45 }}
                    style={{
                      transform: activeStage >= 2 ? "translateZ(44px)" : "translateZ(8px)",
                    }}
                    className="pointer-events-none absolute inset-3 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="border-2 border-[#103FEF] bg-[#103FEF] px-3 py-2 text-[#F4F0E8] shadow-[6px_6px_0px_#0C0E14]">
                        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em]">
                          <Layers className="h-3 w-3" />
                          <span>FIGMA TOKEN // COBALT-600</span>
                        </div>
                        <div className="mt-1 font-mono text-xs font-bold">
                          #103FEF · AUTO-LAYOUT GAP: 16PX
                        </div>
                      </div>

                      <div className="border-2 border-[#0C0E14] bg-[#F4F0E8] px-3 py-2 text-[#0C0E14] shadow-[6px_6px_0px_#103FEF]">
                        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#103FEF]">
                          TYPOGRAPHY SPEC
                        </div>
                        <div className="font-editorial text-lg italic leading-none">
                          Instrument Serif · 64px
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="border-2 border-[#103FEF] bg-[#F4F0E8]/95 p-2.5 shadow-md">
                        <span className="font-mono text-[8px] uppercase text-[#103FEF]">
                          VARIANT: HOVER
                        </span>
                        <div className="mt-1.5 rounded-full bg-[#103FEF] px-2.5 py-1 text-center font-mono text-[9px] text-[#F4F0E8]">
                          DEPLOY COMPONENT ↗
                        </div>
                      </div>
                      <div className="border-2 border-[#103FEF] bg-[#F4F0E8]/95 p-2.5 shadow-md">
                        <span className="font-mono text-[8px] uppercase text-[#103FEF]">
                          GRID: 8PX BASE
                        </span>
                        <div className="mt-1.5 flex items-center justify-between border border-[#103FEF]/40 bg-[#ECE7DC] px-2 py-1 font-mono text-[9px]">
                          <span>padding: 24px</span>
                          <span className="text-[#103FEF]">✓</span>
                        </div>
                      </div>
                      <div className="border-2 border-[#103FEF] bg-[#F4F0E8]/95 p-2.5 shadow-md">
                        <span className="font-mono text-[8px] uppercase text-[#103FEF]">
                          SPRING PHYSICS
                        </span>
                        <div className="mt-1.5 font-mono text-[10px] font-bold text-[#0C0E14]">
                          stiffness: 260
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* STAGE 3 & 4 LAYER: Assembled Viewport */}
                  <motion.div
                    animate={{
                      opacity: activeStage >= 3 ? 1 : 0,
                      scale: activeStage >= 3 ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.45 }}
                    style={{
                      transform:
                        activeStage === 4
                          ? "translateZ(92px)"
                          : activeStage === 3
                          ? "translateZ(74px)"
                          : "translateZ(20px)",
                    }}
                    className={`absolute inset-0 flex flex-col justify-between border-2 border-[#0C0E14] bg-[#0C0E14] p-4 text-[#F4F0E8] shadow-[20px_20px_0px_rgba(16,63,239,0.45)] ${
                      activeStage >= 3 ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[#F4F0E8]/15 pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-[#F4F0E8]/20 bg-[#F4F0E8]/10 px-3 py-0.5 font-mono text-[10px] text-[#F4F0E8]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]" />
                        <span>https://yuvraj.design</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase text-[#103FEF] bg-[#F4F0E8] px-2 py-0.5 font-bold">
                        {activeStage === 4 ? "PRODUCTION DOM // 60 FPS" : "ISO VIEWPORT"}
                      </span>
                    </div>

                    <div className="my-3 grid flex-1 grid-cols-12 gap-3">
                      <div className="col-span-5 flex flex-col justify-between border border-[#F4F0E8]/15 bg-[#103FEF] p-3">
                        <div>
                          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#F4F0E8]/80">
                            YUVRAJ SINGH // PORTFOLIO
                          </div>
                          <div className="mt-1 font-editorial text-2xl italic leading-tight text-white">
                            Spatial Web Systems
                          </div>
                        </div>
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between font-mono text-[9px]">
                            <span>LIGHTHOUSE</span>
                            <span className="font-bold">100 / 100</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#0833D8]">
                            <div className="h-full w-full bg-[#F4F0E8]" />
                          </div>
                          <div className="font-mono text-[9px] text-[#F4F0E8]/80">
                            EDGE LATENCY: 38ms
                          </div>
                        </div>
                      </div>

                      <div className="col-span-7 flex flex-col justify-between border border-[#F4F0E8]/15 bg-[#161922] p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#F4F0E8]/70">
                            REAL-TIME INTERACTION VELOCITY
                          </span>
                          <span className="font-mono text-[9px] text-[#27C93F]">
                            ● 60.0 FPS
                          </span>
                        </div>

                        <svg viewBox="0 0 220 56" className="my-1 h-14 w-full overflow-visible">
                          <defs>
                            <linearGradient id="cobaltGradHome" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#103FEF" stopOpacity="0.65" />
                              <stop offset="100%" stopColor="#103FEF" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 45 Q 35 12, 70 30 T 145 15 T 220 8 L 220 56 L 0 56 Z"
                            fill="url(#cobaltGradHome)"
                          />
                          <path
                            d="M0 45 Q 35 12, 70 30 T 145 15 T 220 8"
                            fill="none"
                            stroke="#103FEF"
                            strokeWidth="2.5"
                          />
                          <circle cx="145" cy="15" r="3.5" fill="#F4F0E8" stroke="#103FEF" strokeWidth="2" />
                          <circle cx="220" cy="8" r="4" fill="#27C93F" />
                        </svg>

                        <div className="flex items-center justify-between gap-2 border-t border-[#F4F0E8]/10 pt-2">
                          <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#F4F0E8]/80">
                            <Terminal className="h-3 w-3 text-[#103FEF]" />
                            <span>PRODUCTION BUNDLE // 0 CUMULATIVE LAYOUT SHIFT</span>
                          </div>
                          <span className="inline-flex items-center rounded bg-[#103FEF] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F4F0E8]">
                            WCAG AAA
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-[#F4F0E8]/60">
                      <span>DOM NODES: OPTIMIZED</span>
                      <span>DELHI, INDIA</span>
                      <span className="text-[#F4F0E8]">STAGE 0{activeStage} // ACTIVE</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom HUD */}
          <div
            className={`border-t px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] sm:px-6 lg:px-10 ${
              blueprintXRay
                ? "border-[#F4F0E8]/20 bg-[#0833D8] text-[#F4F0E8]/80"
                : "border-[#103FEF]/20 bg-[#ECE7DC] text-[#0C0E14]/75"
            }`}
          >
            <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-2">
              <span>
                SCROLL DOWN TO ADVANCE EVOLUTION (STAGE 01 → 04) OR SELECT STAGES FROM THE TOP HUD
              </span>
              <span>SCALE 1:100 // CAD PROJECTION // YUVRAJ SINGH</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED SPEC SHEETS (With Scroll-Triggered Reveal Animations)
      ===================================================================== */}
      <section
        id="work"
        className="blueprint-grid relative border-b border-[#103FEF]/30 px-4 py-24 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-[1560px]">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b-2 border-[#103FEF] pb-8 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#103FEF] bg-[#103FEF] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8]">
                <Grid className="h-3.5 w-3.5" />
                <span>ARCHITECTURAL PROJECT SPEC SHEETS // 01–04</span>
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#0C0E14] sm:text-6xl">
                Selected Works &amp;{" "}
                <span className="font-editorial italic font-normal text-[#103FEF]">
                  Spatial Systems.
                </span>
              </h2>
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="max-w-md font-mono text-xs leading-relaxed text-[#0C0E14]/75">
                Each project is documented as an interactive architectural specification sheet.
                Click <strong className="text-[#103FEF]">&ldquo;INSPECT CASE STUDY&rdquo;</strong> for in-depth engineering breakdowns.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex cursor-pointer items-center gap-2 border border-[#103FEF] bg-[#ECE7DC] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#103FEF] hover:bg-[#103FEF] hover:text-[#F4F0E8] transition"
              >
                <span>View Full Architectural Catalog (All 5 Sheets)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Grid of Projects */}
          <div className="grid gap-8 lg:grid-cols-2">
            {BLUEPRINT_PROJECTS.slice(0, 4).map((project, index) => {
              const isExploded = !!explodedSheets[project.id];
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col justify-between border-2 border-[#103FEF] bg-[#F4F0E8] p-6 shadow-[8px_8px_0px_#103FEF] transition-transform duration-300 hover:-translate-y-1 sm:p-8"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#103FEF] pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-[#103FEF] px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F4F0E8]">
                          {project.sheet}
                        </span>
                        <span className="border border-[#103FEF]/40 bg-[#ECE7DC] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#103FEF]">
                          {project.scale}
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
                        className={`inline-flex cursor-pointer items-center gap-1.5 border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                          isExploded
                            ? "border-[#0C0E14] bg-[#0C0E14] text-[#F4F0E8]"
                            : "border-[#103FEF] bg-[#F4F0E8] text-[#103FEF] hover:bg-[#103FEF] hover:text-[#F4F0E8]"
                        }`}
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span>{isExploded ? "Collapse Layers" : "Explode Z-Layers"}</span>
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#103FEF]">
                          {project.category}
                        </p>
                        <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#0C0E14] sm:text-3xl">
                          {project.title}
                        </h3>
                        <p className="font-editorial text-xl italic text-[#0C0E14]/75">
                          {project.subtitle}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#0C0E14]/60">
                        {project.year}
                      </span>
                    </div>

                    <div className="my-5">
                      <SpecSheetDiagram
                        type={project.diagramType}
                        exploded={isExploded}
                      />
                    </div>

                    <p className="text-sm leading-relaxed text-[#0C0E14]/85 sm:text-base">
                      {project.summary}
                    </p>

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

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#103FEF]/25 pt-5">
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(project)}
                      className="inline-flex cursor-pointer items-center gap-1.5 border border-[#103FEF] bg-[#ECE7DC] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#103FEF] hover:bg-[#103FEF] hover:text-[#F4F0E8] transition"
                    >
                      <span>Inspect Case Study</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#103FEF] bg-[#103FEF] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#F4F0E8] shadow-[3px_3px_0px_#0C0E14] transition hover:-translate-y-0.5 hover:bg-[#0833D8]"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. TRACING PAPER PHILOSOPHY & LIVE DESIGN SYSTEM TOKENS
      ===================================================================== */}
      <section
        id="system"
        className="relative border-b border-[#103FEF]/30 bg-[#ECE7DC] px-4 py-24 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-[1560px]">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Manifesto */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative border-2 border-[#0C0E14] bg-[#F4F0E8] p-8 shadow-[10px_10px_0px_#103FEF] lg:col-span-6 sm:p-10"
            >
              <div className="flex items-center justify-between border-b border-[#0C0E14]/20 pb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
                  MEMORANDUM // TRACING PAPER PHILOSOPHY
                </span>
                <span className="font-mono text-[11px] uppercase text-[#0C0E14]/60">
                  FROM: YUVRAJ SINGH
                </span>
              </div>

              <h3 className="mt-6 font-editorial text-4xl italic text-[#0C0E14] sm:text-5xl">
                To those who shape digital products,
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#0C0E14]/85 sm:text-base">
                <p>
                  Great interfaces were never meant to feel like generic templates. They begin more naturally
                  than that — through spatial sketches, annotated user journeys, mathematical grids, and the rapid
                  back-and-forth between visual instinct and engineering rigor.
                </p>
                <p className="border-l-2 border-[#103FEF] pl-4 font-medium text-[#0C0E14]">
                  I bridge both disciplines: rigorous systems thinking in Figma combined with obsessive React,
                  TypeScript, and motion physics in the production DOM.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#0C0E14]/20 pt-6">
                <div>
                  <div className="font-editorial text-2xl italic text-[#103FEF]">
                    Yuvraj Singh
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0C0E14]/65">
                    UI/UX &amp; DIGITAL PRODUCT DESIGNER · DELHI, INDIA
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("about");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#103FEF] underline underline-offset-4 cursor-pointer"
                >
                  Read Studio Manifesto &amp; Principles ↗
                </button>
              </div>
            </motion.div>

            {/* Right Live Token Inspector */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between border-2 border-[#103FEF] bg-[#F4F0E8] p-8 shadow-[10px_10px_0px_#0C0E14] lg:col-span-6 sm:p-10"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#103FEF]/25 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
                    INTERACTIVE SYSTEM INSPECTOR // LIVE TOKENS
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase text-[#0C0E14]/70">
                      SWATCH:
                    </span>
                    {(
                      [
                        { hex: "#103FEF", name: "Cobalt" },
                        { hex: "#0C0E14", name: "Charcoal" },
                        { hex: "#D9381E", name: "Vermilion" },
                        { hex: "#059669", name: "Emerald" },
                      ] as const
                    ).map((swatch) => (
                      <button
                        key={swatch.hex}
                        type="button"
                        onClick={() => setActiveTokenAccent(swatch.hex)}
                        title={swatch.name}
                        className={`h-5 w-5 cursor-pointer rounded-full border-2 transition-transform ${
                          activeTokenAccent === swatch.hex
                            ? "scale-125 border-[#0C0E14]"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="mt-6 border-2 p-5 transition-colors duration-300"
                  style={{
                    borderColor: activeTokenAccent,
                    backgroundColor: "#ECE7DC",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F4F0E8]"
                      style={{ backgroundColor: activeTokenAccent }}
                    >
                      TOKEN.ACCENT = {activeTokenAccent}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[#0C0E14]/70">
                      8PX SPATIAL GRID
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="border border-[#0C0E14]/20 bg-[#F4F0E8] p-3">
                      <Cpu className="h-4 w-4" style={{ color: activeTokenAccent }} />
                      <div className="mt-2 font-mono text-xs font-bold">Product Design</div>
                      <p className="mt-1 font-mono text-[10px] text-[#0C0E14]/70">
                        Figma Variables, Wireframes, Spatial Flows
                      </p>
                    </div>
                    <div className="border border-[#0C0E14]/20 bg-[#F4F0E8] p-3">
                      <Zap className="h-4 w-4" style={{ color: activeTokenAccent }} />
                      <div className="mt-2 font-mono text-xs font-bold">Creative Frontend</div>
                      <p className="mt-1 font-mono text-[10px] text-[#0C0E14]/70">
                        React 19, TypeScript, Framer Motion
                      </p>
                    </div>
                    <div className="border border-[#0C0E14]/20 bg-[#F4F0E8] p-3">
                      <Sparkles className="h-4 w-4" style={{ color: activeTokenAccent }} />
                      <div className="mt-2 font-mono text-xs font-bold">Edge Static CDN</div>
                      <p className="mt-1 font-mono text-[10px] text-[#0C0E14]/70">
                        Global Anycast Edge, Sub-50ms TTFB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#103FEF]/25 pt-6">
                <div>
                  <div className="font-editorial text-4xl italic text-[#103FEF]">4+ Yrs</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0C0E14]/70">
                    DESIGN &amp; CODE CRAFT
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("system");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 border border-[#103FEF] bg-[#103FEF] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#F4F0E8] shadow-[3px_3px_0px_#0C0E14] transition hover:bg-[#0833D8]"
                >
                  <span>Launch Design System Lab</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
