import React from "react";
import { Link2, Mail, ArrowUpRight } from "lucide-react";
import { PageTab } from "../types";

interface FooterProps {
  delhiClock: string;
  setActiveTab: (tab: PageTab) => void;
  onOpenSurgeConsole?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  delhiClock,
  setActiveTab,
}) => {

  return (
    <footer
      id="contact"
      className="cobalt-blueprint-grid relative overflow-hidden bg-[#103FEF] px-4 pb-16 pt-24 text-[#F4F0E8] sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1560px]">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left 7 Columns: Headline + Email Copy + Social Routes */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 border border-[#F4F0E8]/40 bg-[#0833D8] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8]">
              <span className="h-2 w-2 rounded-full bg-[#27C93F] animate-pulse" />
              <span>COMMISSION WINDOW OPEN // 2026 EDITION</span>
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-tight text-[#F4F0E8] sm:text-6xl lg:text-7xl">
              Design at the speed of thought.{" "}
              <span className="font-editorial italic font-normal text-white">
                Engineered for the web.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#F4F0E8]/85 sm:text-lg">
              Ready to translate your product vision from raw sketch to high-velocity web reality?
              Direct dispatch to Yuvraj Singh, UI/UX Designer &amp; Creative Frontend Engineer in Delhi.
            </p>

            {/* Primary Action Button */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white bg-[#F4F0E8] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#103FEF] shadow-[4px_4px_0px_rgba(12,14,20,0.45)] transition hover:bg-white"
              >
                <span>Interactive Inquiry Estimator</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Architectural & Contact Routes */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[#F4F0E8]/35 bg-[#0833D8]/80 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[#F4F0E8] transition hover:border-[#F4F0E8] hover:bg-[#F4F0E8] hover:text-[#103FEF]"
              >
                <Link2 className="h-3.5 w-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex cursor-pointer items-center gap-2 border border-[#F4F0E8]/35 bg-[#0833D8]/80 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[#F4F0E8] transition hover:border-[#F4F0E8] hover:bg-[#F4F0E8] hover:text-[#103FEF]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Direct Dispatch</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Isometric Wireframe Monument */}
          <div className="flex items-center justify-center lg:col-span-5 w-full">
            <div className="relative w-full max-w-full sm:max-w-md overflow-hidden border-2 border-[#F4F0E8]/50 bg-[#0833D8]/70 p-4 sm:p-6 shadow-[6px_6px_0px_rgba(12,14,20,0.4)] sm:shadow-[12px_12px_0px_rgba(12,14,20,0.4)]">
              <div className="flex items-center justify-between border-b border-[#F4F0E8]/25 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F4F0E8]/80">
                <span>FIG. 05 // WIREFRAME MONUMENT</span>
                <span>VECTOR 1:1</span>
              </div>

              {/* Isometric 3D Line-Art SVG */}
              <svg
                viewBox="0 0 360 280"
                className="mt-4 h-52 sm:h-64 w-full overflow-hidden sm:overflow-visible"
                fill="none"
              >
                {/* Outer Isometric Cube Wireframe */}
                <polygon
                  points="180,20 320,95 320,210 180,265 40,210 40,95"
                  stroke="#F4F0E8"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                  opacity="0.55"
                />
                {/* Top Isometric Architectural Deck */}
                <polygon
                  points="180,45 295,105 180,165 65,105"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  fill="rgba(244, 240, 232, 0.08)"
                />
                {/* Middle Floating UI Plane */}
                <polygon
                  points="180,82 295,142 180,202 65,142"
                  stroke="#FFFFFF"
                  strokeWidth="1.75"
                  strokeDasharray="3 3"
                  fill="rgba(244, 240, 232, 0.05)"
                />
                {/* Base Structural Foundation Plane */}
                <polygon
                  points="180,120 295,180 180,240 65,180"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  fill="rgba(8, 51, 216, 0.55)"
                />
                {/* Vertical Isometric Pillars */}
                <line x1="65" y1="105" x2="65" y2="180" stroke="#FFFFFF" strokeWidth="1.75" />
                <line x1="180" y1="165" x2="180" y2="240" stroke="#FFFFFF" strokeWidth="2.2" />
                <line x1="295" y1="105" x2="295" y2="180" stroke="#FFFFFF" strokeWidth="1.75" />
                <line x1="180" y1="45" x2="180" y2="120" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 3" />

                {/* Inner Isometric Browser Window Block */}
                <polygon
                  points="180,68 245,102 180,136 115,102"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  fill="#103FEF"
                />
                <circle cx="180" cy="102" r="5" fill="#FFFFFF" />
                <circle cx="180" cy="45" r="3.5" fill="#F4F0E8" />
                <circle cx="295" cy="105" r="3.5" fill="#F4F0E8" />
                <circle cx="65" cy="105" r="3.5" fill="#F4F0E8" />
                <circle cx="180" cy="240" r="4" fill="#27C93F" />

                {/* Dimension Callout Labels */}
                <text
                  x="18"
                  y="36"
                  fill="#F4F0E8"
                  fontSize="9"
                  fontFamily="Space Mono, monospace"
                >
                  Z-AXIS // +300PX
                </text>
                <text
                  x="230"
                  y="258"
                  fill="#F4F0E8"
                  fontSize="9"
                  fontFamily="Space Mono, monospace"
                >
                  YUVRAJ.DESIGN // 2026
                </text>
              </svg>

              <div className="mt-2 flex items-center justify-between border-t border-[#F4F0E8]/25 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F4F0E8]/80">
                <span>DELHI, INDIA · {delhiClock}</span>
                <span>STATUS: AVAILABLE // 2026 EDITION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Blueprint Copyright & Return to Top */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#F4F0E8]/25 pt-6 font-mono text-xs uppercase tracking-[0.18em] text-[#F4F0E8]/80 sm:flex-row sm:items-center">
          <div>
            © 2026 YUVRAJ SINGH — UI/UX &amp; DIGITAL PRODUCT DESIGNER. ALL RIGHTS RESERVED.
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex cursor-pointer items-center gap-2 border border-[#F4F0E8]/40 bg-[#0833D8] px-4 py-2 text-[11px] text-[#F4F0E8] transition hover:bg-[#F4F0E8] hover:text-[#103FEF]"
          >
            <span>RETURN TO DRAFTING TOP (0%)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
