import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Cpu, Zap, Compass, CheckCircle } from "lucide-react";

interface KineticTickerProps {
  variant?: "cream" | "cobalt";
}

export const KineticTicker: React.FC<KineticTickerProps> = ({ variant = "cream" }) => {
  const items = [
    { label: "GLOBAL EDGE CDN", icon: CheckCircle, tag: "FASTLY ANYCAST" },
    { label: "DYNAMIC ROUTING", icon: Terminal, tag: "SPA MULTI-VIEW" },
    { label: "FRAME RATE LOCK", icon: Zap, tag: "60 FPS" },
    { label: "FIGMA-TO-DOM", icon: Cpu, tag: "ZERO DRIFT" },
    { label: "DELHI STUDIO", icon: Compass, tag: "28.6139° N, 77.2090° E" },
    { label: "LIGHTHOUSE AUDIT", icon: Sparkles, tag: "100/100" },
    { label: "EDGE TTFB", icon: Zap, tag: "38MS LATENCY" },
    { label: "WCAG AAA", icon: CheckCircle, tag: "CONTRAST CERTIFIED" },
  ];

  const isCobalt = variant === "cobalt";

  return (
    <div
      className={`relative w-full overflow-hidden border-y py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] select-none ${
        isCobalt
          ? "border-[#F4F0E8]/25 bg-[#0833D8] text-[#F4F0E8]"
          : "border-[#103FEF]/25 bg-[#ECE7DC] text-[#0C0E14]"
      }`}
    >
      <motion.div
        className="flex whitespace-nowrap gap-10"
        animate={{ x: [0, -1400] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 28,
        }}
      >
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 shrink-0">
              <Icon
                className={`h-3.5 w-3.5 ${
                  isCobalt ? "text-[#F4F0E8]" : "text-[#103FEF]"
                }`}
              />
              <span className="font-semibold">{item.label}</span>
              <span
                className={`px-1.5 py-0.5 text-[9px] border font-bold ${
                  isCobalt
                    ? "border-[#F4F0E8]/40 bg-[#103FEF] text-[#F4F0E8]"
                    : "border-[#103FEF]/40 bg-[#103FEF]/10 text-[#103FEF]"
                }`}
              >
                {item.tag}
              </span>
              <span className="text-[#103FEF]/40 font-bold ml-2">//</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
