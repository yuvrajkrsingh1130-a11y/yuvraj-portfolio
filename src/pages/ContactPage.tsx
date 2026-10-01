import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  Send,
  Calendar,
  Compass,
  DollarSign,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface ContactPageProps {
  delhiClock: string;
  onOpenSurgeConsole: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  delhiClock,
  onOpenSurgeConsole,
}) => {
  const [selectedScope, setSelectedScope] = useState<string>("Brand & Web Flagship");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("4-6 Weeks (Standard)");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);

  const scopeOptions = [
    {
      title: "Brand & Web Flagship",
      desc: "Complete architectural website from raw sketches to production React/Tailwind on global edge CDN.",
      deliverables: ["Hand-Drawn Spatial Wireframes", "Figma Token System", "React 19 + Framer Motion Codebase", "Edge CDN Deployment"],
    },
    {
      title: "Enterprise Design System",
      desc: "Scalable multi-brand token system in Figma mapped 1:1 to React/Tailwind component atoms.",
      deliverables: ["400+ Semantic Figma Variables", "Component Atom Matrix", "Storybook Documentation", "Zero-Drift Code Repository"],
    },
    {
      title: "SaaS Product UI/UX Redesign",
      desc: "High-density operational telemetry dashboards, virtualized data tables, and keyboard command flows.",
      deliverables: ["User Journey Architecture", "Dense Telemetry Layouts", "Interactive Wireframes", "Front-end Integration Handoff"],
    },
    {
      title: "Kinetic Motion & Interaction Lab",
      desc: "Custom spring physics, 60fps scroll-driven stages, and magnetic pointer interactions.",
      deliverables: ["Bespoke Motion Primitives", "Scroll-Scrubbed Viewports", "Reduced-Motion Hardware Fallbacks"],
    },
  ];

  const timelineOptions = [
    { label: "2-3 Weeks (Expedited Sprint)", badge: "HIGH PRIORITY" },
    { label: "4-6 Weeks (Standard Architectural Cycle)", badge: "RECOMMENDED" },
    { label: "Quarterly Retainer / Embedded Technologist", badge: "LONG TERM" },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("yuvrajsingh.portfolio.deploy@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`Project Inquiry: ${selectedScope} [${selectedTimeline}]`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nScope: ${selectedScope}\nTimeline: ${selectedTimeline}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:yuvrajsingh.portfolio.deploy@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setFormSent(true);
  };

  const currentScopeData =
    scopeOptions.find((s) => s.title === selectedScope) || scopeOptions[0];

  return (
    <div className="min-h-screen blueprint-grid px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1560px]">
        {/* Header */}
        <div className="border-b-2 border-[#103FEF] pb-8">
          <div className="inline-flex items-center gap-2 border border-[#103FEF] bg-[#103FEF] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8]">
            <Mail className="h-3.5 w-3.5" />
            <span>DISPATCH // INQUIRY ESTIMATOR &amp; TRANSMISSION</span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-[#0C0E14]">
            Start an architectural{" "}
            <span className="font-editorial italic font-normal text-[#103FEF]">
              project collaboration.
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-[#0C0E14]/80">
            Select your architectural scope below to generate an immediate specification outline,
            or dispatch directly to Yuvraj Singh in Delhi.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Scope & Timeline Estimator */}
          <div className="lg:col-span-7 space-y-8">
            {/* Scope Selector */}
            <div className="border-2 border-[#103FEF] bg-[#F4F0E8] p-6 sm:p-8 shadow-[8px_8px_0px_#103FEF]">
              <div className="flex items-center justify-between border-b border-[#103FEF]/30 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
                  01 // SELECT PROJECT SCOPE ARCHETYPE
                </span>
                <span className="font-mono text-[10px] text-[#0C0E14]/60 uppercase">
                  STEP 1 OF 2
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {scopeOptions.map((opt) => (
                  <button
                    key={opt.title}
                    type="button"
                    onClick={() => setSelectedScope(opt.title)}
                    className={`text-left p-4 border-2 transition cursor-pointer flex flex-col justify-between ${
                      selectedScope === opt.title
                        ? "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8] shadow-[4px_4px_0px_#0C0E14]"
                        : "border-[#0C0E14]/25 bg-[#ECE7DC] text-[#0C0E14] hover:border-[#103FEF]"
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs font-bold uppercase">
                        {opt.title}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed opacity-85">
                        {opt.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-current/20 flex items-center justify-between font-mono text-[10px]">
                      <span>{opt.deliverables.length} Key Outputs</span>
                      <span>{selectedScope === opt.title ? "SELECTED ✓" : "SELECT →"}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Timeline Selector */}
              <div className="mt-8 border-t border-[#103FEF]/25 pt-6">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF] mb-3">
                  02 // ESTIMATED TIMELINE CADENCE
                </div>

                <div className="space-y-2">
                  {timelineOptions.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setSelectedTimeline(t.label)}
                      className={`w-full flex items-center justify-between p-3 border cursor-pointer font-mono text-xs transition ${
                        selectedTimeline === t.label
                          ? "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8] shadow-[3px_3px_0px_#0C0E14]"
                          : "border-[#0C0E14]/25 bg-[#ECE7DC] text-[#0C0E14] hover:border-[#103FEF]"
                      }`}
                    >
                      <span className="font-medium">{t.label}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 border border-current">
                        {t.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Blueprint Summary Box */}
              <div className="mt-8 border border-[#103FEF]/40 bg-[#ECE7DC] p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#103FEF] font-bold">
                  PROJECT SPECIFICATION SUMMARY
                </div>
                <div className="mt-2 font-mono text-xs text-[#0C0E14] space-y-1">
                  <div><strong>SCOPE:</strong> {selectedScope}</div>
                  <div><strong>CADENCE:</strong> {selectedTimeline}</div>
                  <div className="pt-2"><strong>INCLUDED DELIVERABLES:</strong></div>
                  <ul className="list-disc list-inside text-xs text-[#0C0E14]/80 pl-2">
                    {currentScopeData.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Dispatch Transmission Form */}
          <div className="lg:col-span-5 border-2 border-[#0C0E14] bg-[#F4F0E8] p-6 sm:p-8 shadow-[10px_10px_0px_#103FEF]">
            <div className="flex items-center justify-between border-b border-[#0C0E14]/20 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#103FEF]">
                TRANSMISSION TERMINAL
              </span>
              <span className="font-mono text-[10px] text-[#0C0E14]/70">
                DELHI · {delhiClock}
              </span>
            </div>

            {formSent ? (
              <div className="mt-8 border-2 border-[#27C93F] bg-[#27C93F]/10 p-6 text-center">
                <div className="font-editorial text-3xl italic text-[#0C0E14]">
                  Transmission Prepared!
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#0C0E14]/80 font-mono">
                  Your mail client has been opened with your inquiry parameters pre-populated.
                  Yuvraj will respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSent(false)}
                  className="mt-4 border border-[#0C0E14] bg-[#0C0E14] px-4 py-2 font-mono text-xs font-bold text-[#F4F0E8]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0C0E14] mb-1">
                    YOUR NAME / STUDIO
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova / Veloce Labs"
                    className="w-full border-2 border-[#0C0E14]/30 bg-[#ECE7DC] p-3 font-mono text-xs text-[#0C0E14] focus:border-[#103FEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0C0E14] mb-1">
                    YOUR WORK EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@velocelabs.com"
                    className="w-full border-2 border-[#0C0E14]/30 bg-[#ECE7DC] p-3 font-mono text-xs text-[#0C0E14] focus:border-[#103FEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0C0E14] mb-1">
                    PROJECT OBJECTIVE &amp; CONTEXT
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Outline your product vision, challenges, target audience, or current design system constraints..."
                    className="w-full border-2 border-[#0C0E14]/30 bg-[#ECE7DC] p-3 font-mono text-xs text-[#0C0E14] focus:border-[#103FEF] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex cursor-pointer items-center justify-center gap-2 border border-[#103FEF] bg-[#103FEF] p-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#F4F0E8] shadow-[4px_4px_0px_#0C0E14] hover:bg-[#0833D8] transition"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Inquiry to Yuvraj</span>
                </button>
              </form>
            )}

            {/* Direct Email Copy */}
            <div className="mt-8 border-t border-[#0C0E14]/20 pt-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#0C0E14]/70 block mb-2">
                OR DIRECT DISPATCH:
              </span>
              <a
                href="mailto:yuvrajkrsingh1130@gmail.com"
                className="w-full flex cursor-pointer items-center justify-between border border-[#0C0E14]/30 bg-[#ECE7DC] p-3 font-mono text-xs font-bold text-[#103FEF] hover:bg-[#103FEF] hover:text-[#F4F0E8] transition"
              >
                <span className="truncate">yuvrajkrsingh1130@gmail.com</span>
                <Send className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between font-mono text-[10px] text-[#0C0E14]/70">
              <span className="text-[#103FEF] font-bold">STATUS: AVAILABLE // 2026 EDITION</span>
              <span>DELHI, INDIA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
