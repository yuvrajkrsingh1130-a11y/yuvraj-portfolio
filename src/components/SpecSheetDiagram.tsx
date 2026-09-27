import React from "react";
import { motion } from "framer-motion";
import { BlueprintProject } from "../types";

interface SpecSheetDiagramProps {
  type: BlueprintProject["diagramType"];
  exploded: boolean;
}

export const SpecSheetDiagram: React.FC<SpecSheetDiagramProps> = ({
  type,
  exploded,
}) => {
  return (
    <div className="relative h-56 w-full overflow-hidden border border-[#103FEF]/30 bg-[#ECE7DC] p-4">
      {/* Blueprint Grid Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16, 63, 239, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 63, 239, 0.14) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Corner drafting crosshairs */}
      <span className="absolute left-2 top-1.5 font-mono text-[10px] text-[#103FEF]/70">+</span>
      <span className="absolute right-2 top-1.5 font-mono text-[10px] text-[#103FEF]/70">+</span>
      <span className="absolute bottom-1.5 left-2 font-mono text-[10px] text-[#103FEF]/70">
        SCALE // ISO-30°
      </span>
      <span className="absolute bottom-1.5 right-2 font-mono text-[10px] text-[#103FEF]">
        {exploded ? "VIEW: EXPLODED Z-AXIS" : "VIEW: ASSEMBLED"}
      </span>

      {/* Center Isometric SVG Schematic */}
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          animate={{
            rotateX: exploded ? 58 : 48,
            rotateZ: exploded ? -36 : -28,
            scale: exploded ? 0.96 : 1,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-36 w-56"
        >
          {/* Base Blueprint Plate */}
          <div
            className="absolute inset-0 border-2 border-[#103FEF] bg-[#F4F0E8]/95 p-2.5 shadow-[6px_6px_0px_rgba(16,63,239,0.22)]"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="flex items-center justify-between border-b border-[#103FEF]/30 pb-1">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#103FEF]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#103FEF]/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#103FEF]/40" />
              </div>
              <span className="font-mono text-[8px] uppercase text-[#103FEF]">
                {type.toUpperCase()}.CAD
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <div className="col-span-1 h-16 border border-dashed border-[#103FEF]/50 bg-[#103FEF]/5 p-1">
                <div className="h-2 w-8 bg-[#103FEF]/30" />
                <div className="mt-1.5 h-1.5 w-6 bg-[#103FEF]/20" />
                <div className="mt-1.5 h-1.5 w-7 bg-[#103FEF]/20" />
              </div>
              <div className="col-span-2 h-16 border border-[#103FEF]/40 bg-white/70 p-1.5">
                {type === "portfolio" && (
                  <div className="space-y-1.5">
                    <div className="h-3 w-3/4 bg-[#0C0E14]" />
                    <div className="h-2 w-1/2 bg-[#103FEF]" />
                    <div className="grid grid-cols-2 gap-1 pt-1">
                      <div className="h-5 border border-[#103FEF] bg-[#103FEF]/10" />
                      <div className="h-5 border border-[#0C0E14]/30 bg-[#F4F0E8]" />
                    </div>
                  </div>
                )}
                {type === "saas" && (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="h-2 w-10 bg-[#103FEF]" />
                      <span className="h-2 w-6 bg-[#0C0E14]/30" />
                    </div>
                    <svg viewBox="0 0 100 28" className="h-8 w-full stroke-[#103FEF] fill-none">
                      <path
                        d="M2 24 L22 16 L42 19 L64 7 L85 11 L98 3"
                        strokeWidth="2.2"
                      />
                    </svg>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="h-2 bg-[#103FEF]/25" />
                      <div className="h-2 bg-[#103FEF]/25" />
                      <div className="h-2 bg-[#103FEF]/25" />
                    </div>
                  </div>
                )}
                {type === "editorial" && (
                  <div className="flex h-full flex-col justify-between">
                    <div className="font-serif text-xs italic leading-none text-[#0C0E14]">
                      Editorial Grid
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="h-7 border border-[#103FEF] bg-[#103FEF]/15" />
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-[#0C0E14]/60" />
                        <div className="h-1.5 w-4/5 bg-[#0C0E14]/40" />
                        <div className="h-1.5 w-3/5 bg-[#103FEF]" />
                      </div>
                    </div>
                  </div>
                )}
                {type === "motion" && (
                  <div className="flex h-full items-center justify-around">
                    <div className="h-8 w-8 rounded-full border-2 border-dashed border-[#103FEF] bg-[#103FEF]/15" />
                    <svg viewBox="0 0 50 24" className="h-6 w-12 stroke-[#103FEF] fill-none">
                      <path d="M2 12 C 15 -4, 35 28, 48 12" strokeWidth="2" />
                    </svg>
                    <div className="h-6 w-6 rotate-12 border-2 border-[#0C0E14] bg-[#103FEF]" />
                  </div>
                )}
                {type === "fintech" && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[7px] font-mono">
                      <span className="text-[#27C93F] font-bold">+14.2%</span>
                      <span className="text-[#103FEF]">BID 4,210.5</span>
                    </div>
                    <div className="grid grid-cols-4 gap-0.5 pt-0.5">
                      <div className="h-7 bg-[#103FEF]/30" />
                      <div className="h-5 bg-[#103FEF]/50" />
                      <div className="h-8 bg-[#27C93F]/40" />
                      <div className="h-6 bg-[#103FEF]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating Middle Token Layer */}
          <motion.div
            animate={{ z: exploded ? 36 : 16 }}
            style={{
              transform: exploded ? "translateZ(36px)" : "translateZ(14px)",
            }}
            className="pointer-events-none absolute -right-3 -top-2 w-28 border border-[#103FEF] bg-[#103FEF] px-2 py-1 text-[8px] font-mono text-[#F4F0E8] shadow-md"
          >
            LAYER 02 // TOKENS
          </motion.div>

          {/* Floating Top Wireframe Overlay */}
          <motion.div
            style={{
              transform: exploded ? "translateZ(64px)" : "translateZ(26px)",
            }}
            className="pointer-events-none absolute -bottom-2 -left-3 border border-[#0C0E14] bg-[#F4F0E8] px-2 py-1 font-mono text-[8px] text-[#0C0E14] shadow-sm"
          >
            Z-OFFSET: {exploded ? "+64PX" : "+26PX"}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
