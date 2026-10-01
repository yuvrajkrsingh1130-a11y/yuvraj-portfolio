import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Sparkles,
  Cpu,
  Copy,
  Check,
  Zap,
  Sliders,
  Maximize2,
  RefreshCw,
  Grid,
} from "lucide-react";

export const SystemPage: React.FC = () => {
  const [accentColor, setAccentColor] = useState<string>("#103FEF");
  const [baseRadius, setBaseRadius] = useState<number>(4);
  const [springStiffness, setSpringStiffness] = useState<number>(260);
  const [springDamping, setSpringDamping] = useState<number>(22);
  const [bounceTrigger, setBounceTrigger] = useState<number>(0);
  const [copiedTokens, setCopiedTokens] = useState<boolean>(false);

  const colorPalettes = [
    { name: "Cobalt Primary", hex: "#103FEF", role: "Brand & Primary Action" },
    { name: "Cobalt Deep", hex: "#0833D8", role: "Active / Pressed State" },
    { name: "Architectural Cream", hex: "#F4F0E8", role: "Canvas Background" },
    { name: "Vellum Dark", hex: "#ECE7DC", role: "Surface Secondary" },
    { name: "Carbon Ink", hex: "#0C0E14", role: "Primary Typographic Body" },
    { name: "Drafting Vermilion", hex: "#D9381E", role: "Alerts & Diagnostics" },
    { name: "Telemetry Emerald", hex: "#27C93F", role: "Live Production Status" },
  ];

  const typographyScales = [
    { token: "text-display", size: "72px", font: "Instrument Serif", weight: "400 Italic", sample: "Design at the speed of thought." },
    { token: "text-headline", size: "48px", font: "Plus Jakarta Sans", weight: "700 Bold", sample: "Spatial Architecture & Web Systems" },
    { token: "text-title", size: "28px", font: "Plus Jakarta Sans", weight: "600 Semi", sample: "Design Systems & Token Engine" },
    { token: "text-body", size: "15px", font: "Plus Jakarta Sans", weight: "400 Normal", sample: "Mathematical precision applied to modern frontend engineering." },
    { token: "font-mono-tech", size: "12px", font: "Space Mono", weight: "700 Bold", sample: "STAGE 04 // TTFB: 38MS · PRODUCTION 60FPS" },
  ];

  const spacingGrid = [
    { token: "space-1", val: "4px", use: "Hairline offsets & badge insets" },
    { token: "space-2", val: "8px", use: "Base grid atomic unit" },
    { token: "space-3", val: "12px", use: "Button icon gap & chip padding" },
    { token: "space-4", val: "16px", use: "Card inner padding base" },
    { token: "space-6", val: "24px", use: "Section container spacing" },
    { token: "space-8", val: "32px", use: "Major column gutter" },
    { token: "space-16", val: "64px", use: "Architectural section padding" },
  ];

  const handleCopyTokens = async () => {
    const tokensJson = JSON.stringify(
      {
        palette: {
          primary: accentColor,
          baseRadius: `${baseRadius}px`,
          physics: { stiffness: springStiffness, damping: springDamping },
        },
        typography: typographyScales,
        spacing: spacingGrid,
      },
      null,
      2
    );

    try {
      await navigator.clipboard.writeText(tokensJson);
      setCopiedTokens(true);
      setTimeout(() => setCopiedTokens(false), 2200);
    } catch {
      setCopiedTokens(true);
      setTimeout(() => setCopiedTokens(false), 2200);
    }
  };

  return (
    <div className="min-h-screen blueprint-grid px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1560px]">
        {/* Header */}
        <div className="border-b-2 border-[#103FEF] pb-8">
          <div className="inline-flex items-center gap-2 border border-[#103FEF] bg-[#103FEF] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8]">
            <Layers className="h-3.5 w-3.5" />
            <span>DESIGN SYSTEM STUDIO // TOKEN PLAYGROUND</span>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#0C0E14]">
                Mathematical Design Systems &amp;{" "}
                <span className="font-editorial italic font-normal text-[#103FEF]">
                  Living Tokens.
                </span>
              </h1>
              <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-[#0C0E14]/80">
                A sandbox for the multi-brand tokens, typographic hierarchies, spatial grids, and
                Framer Motion spring physics that power Yuvraj Singh&apos;s digital architecture.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyTokens}
              className="inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-[#103FEF] bg-[#103FEF] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#F4F0E8] shadow-[3px_3px_0px_#0C0E14] transition hover:bg-[#0833D8]"
            >
              {copiedTokens ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tokens Copied to JSON</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Export Design Tokens (JSON)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1. Interactive Color & Accent Studio */}
        <div className="mt-14">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
            <Sparkles className="h-4 w-4" />
            <span>01 // CHROMATIC SYSTEM &amp; SEMANTIC VARIABLES</span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            {/* Color Swatches Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {colorPalettes.map((c) => (
                <div
                  key={c.name}
                  onClick={() => setAccentColor(c.hex)}
                  className="group cursor-pointer border-2 border-[#103FEF] bg-[#F4F0E8] p-3 shadow-[4px_4px_0px_#103FEF] transition hover:-translate-y-1"
                >
                  <div
                    className="h-16 w-full border border-[#0C0E14]/20 flex items-end p-2 transition-transform group-hover:scale-[1.02]"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className="font-mono text-[10px] font-bold px-1 py-0.5 bg-black/60 text-white rounded">
                      {c.hex}
                    </span>
                  </div>
                  <div className="mt-2.5 font-mono text-xs font-bold text-[#0C0E14]">
                    {c.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#0C0E14]/70">
                    {c.role}
                  </div>
                </div>
              ))}
            </div>

            {/* Live Reactive Accent Preview Card */}
            <div className="lg:col-span-4 border-2 border-[#103FEF] bg-[#ECE7DC] p-6 shadow-[6px_6px_0px_#0C0E14]">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#103FEF] block mb-2">
                LIVE ACCENT SIMULATION
              </span>
              <div
                className="p-4 border-2 transition-all duration-300"
                style={{
                  borderColor: accentColor,
                  backgroundColor: "#F4F0E8",
                  borderRadius: `${baseRadius}px`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 font-mono text-[9px] font-bold text-white uppercase"
                    style={{ backgroundColor: accentColor }}
                  >
                    ACCENT: {accentColor}
                  </span>
                  <span className="font-mono text-[9px] text-[#0C0E14]/70">
                    RADIUS: {baseRadius}PX
                  </span>
                </div>

                <h4 className="mt-3 text-lg font-bold text-[#0C0E14]">
                  Active Interactive Primitive
                </h4>
                <p className="mt-1 text-xs text-[#0C0E14]/75">
                  Adjusting tokens below dynamically cascades across this live viewport.
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    style={{ backgroundColor: accentColor, borderRadius: `${baseRadius}px` }}
                    className="px-3 py-1.5 font-mono text-xs font-bold text-white shadow-sm"
                  >
                    Primary Action
                  </button>
                  <button
                    type="button"
                    style={{
                      borderColor: accentColor,
                      color: accentColor,
                      borderRadius: `${baseRadius}px`,
                    }}
                    className="border px-3 py-1.5 font-mono text-xs font-bold bg-white"
                  >
                    Outline Variant
                  </button>
                </div>
              </div>

              {/* Slider for Border Radius */}
              <div className="mt-6 border-t border-[#103FEF]/20 pt-4">
                <div className="flex justify-between font-mono text-xs text-[#0C0E14]">
                  <span>BORDER RADIUS TOKEN</span>
                  <span className="font-bold text-[#103FEF]">{baseRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={baseRadius}
                  onChange={(e) => setBaseRadius(Number(e.target.value))}
                  className="w-full mt-2 accent-[#103FEF] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Motion & Spring Physics Lab */}
        <div className="mt-16 border-2 border-[#103FEF] bg-[#F4F0E8] p-6 sm:p-8 shadow-[8px_8px_0px_#103FEF]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#103FEF] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
              <Zap className="h-4 w-4" />
              <span>02 // FRAMER MOTION SPRING PHYSICS ENGINE</span>
            </div>

            <button
              type="button"
              onClick={() => setBounceTrigger((prev) => prev + 1)}
              className="inline-flex cursor-pointer items-center gap-1.5 border border-[#103FEF] bg-[#103FEF] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#F4F0E8] shadow-[2px_2px_0px_#0C0E14] hover:bg-[#0833D8]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Trigger Physical Impulse</span>
            </button>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex justify-between font-mono text-xs font-medium text-[#0C0E14]">
                  <span>SPRING STIFFNESS (TENSION)</span>
                  <span className="font-bold text-[#103FEF]">{springStiffness}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  value={springStiffness}
                  onChange={(e) => setSpringStiffness(Number(e.target.value))}
                  className="w-full mt-2 accent-[#103FEF] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs font-medium text-[#0C0E14]">
                  <span>SPRING DAMPING (FRICTION)</span>
                  <span className="font-bold text-[#103FEF]">{springDamping}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={springDamping}
                  onChange={(e) => setSpringDamping(Number(e.target.value))}
                  className="w-full mt-2 accent-[#103FEF] cursor-pointer"
                />
              </div>

              <div className="border border-[#103FEF]/30 bg-[#ECE7DC] p-3 font-mono text-[11px] text-[#0C0E14]">
                <code>
                  transition: &#123; type: &quot;spring&quot;, stiffness: {springStiffness}, damping: {springDamping} &#125;
                </code>
              </div>
            </div>

            {/* Live Bouncing Physical Element */}
            <div className="lg:col-span-6 flex items-center justify-center p-8 bg-[#ECE7DC] border-2 border-dashed border-[#103FEF]/40 h-56">
              <motion.div
                key={bounceTrigger}
                initial={{ scale: 0.4, rotate: -25, y: -50 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: springStiffness,
                  damping: springDamping,
                }}
                className="flex flex-col items-center justify-center border-2 border-[#0C0E14] bg-[#103FEF] p-6 text-[#F4F0E8] shadow-[8px_8px_0px_#0C0E14] cursor-pointer"
                onClick={() => setBounceTrigger((prev) => prev + 1)}
              >
                <Cpu className="h-6 w-6" />
                <span className="mt-2 font-mono text-xs font-bold">CLICK OR IMPULSE</span>
                <span className="font-mono text-[9px] opacity-75">PHYSICAL HARMONIC</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. Typography Scale & Spatial Hierarchy */}
        <div className="mt-16">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
            <Sliders className="h-4 w-4" />
            <span>03 // TYPOGRAPHIC RATIOS &amp; SPATIAL SCALE</span>
          </div>

          <div className="mt-6 border-2 border-[#103FEF] bg-[#F4F0E8] p-6 shadow-[8px_8px_0px_#103FEF]">
            <div className="space-y-6 divide-y divide-[#103FEF]/20">
              {typographyScales.map((item) => (
                <div key={item.token} className="pt-4 first:pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#103FEF]">
                    <span>TOKEN: {item.token}</span>
                    <span className="text-[#0C0E14]/70">
                      {item.font} · {item.size} · {item.weight}
                    </span>
                  </div>
                  <div className="mt-2 text-[#0C0E14]" style={{ fontSize: item.size }}>
                    {item.sample}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. 8px Base Spatial Grid Matrix */}
        <div className="mt-16 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
            <Grid className="h-4 w-4" />
            <span>04 // 8PX ARCHITECTURAL SPATIAL MATRIX</span>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {spacingGrid.map((sp) => (
              <div
                key={sp.token}
                className="border-2 border-[#103FEF] bg-[#ECE7DC] p-3 shadow-[4px_4px_0px_#103FEF]"
              >
                <div className="font-mono text-xs font-bold text-[#103FEF]">
                  {sp.token}
                </div>
                <div className="font-mono text-lg font-bold text-[#0C0E14] mt-1">
                  {sp.val}
                </div>
                <div
                  className="my-3 bg-[#103FEF]"
                  style={{ height: sp.val, width: "100%" }}
                />
                <div className="font-mono text-[9px] text-[#0C0E14]/70">
                  {sp.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
