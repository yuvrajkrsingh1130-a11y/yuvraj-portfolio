import React, { useState } from "react";
import { Compass, ArrowUpRight, Menu, X } from "lucide-react";
import { PageTab } from "../types";

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  delhiClock: string;
  onOpenSurgeConsole?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  delhiClock,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; tab: PageTab; code: string }[] = [
    { label: "Drafting Desk", tab: "home", code: "01" },
    { label: "Case Studies", tab: "projects", code: "02" },
    { label: "System Lab", tab: "system", code: "03" },
    { label: "Studio & Craft", tab: "about", code: "04" },
    { label: "Dispatch / Contact", tab: "contact", code: "05" },
  ];

  const handleTabClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#103FEF]/25 bg-[#F4F0E8]/94 backdrop-blur-md">
      {/* Top Micro Ruler Strip */}
      <div className="hidden border-b border-[#103FEF]/15 bg-[#ECE7DC] px-6 py-1 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#103FEF]">
          <span>DRAWING NO. YS-2026-PORTFOLIO</span>
          <span>//</span>
          <span>PROJECTION: ISOMETRIC 30° / DESK-TO-INTERFACE</span>
          <span>//</span>
          <span>COORDS: 28.6139° N, 77.2090° E</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border border-[#103FEF]/30 bg-[#F4F0E8] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#103FEF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F] animate-pulse" />
            <span>SYSTEM STATUS: ACTIVE // 60 FPS</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0C0E14]/70">
            <span>STATUS: AVAILABLE FOR SELECT COMMISSIONS</span>
            <span className="inline-block h-2 w-2 rounded-full bg-[#103FEF]" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-[1560px] items-center justify-between px-4 py-3.5 sm:px-6 lg:px-10">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleTabClick("home")}
          className="group flex cursor-pointer items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center border border-[#103FEF] bg-[#103FEF] text-[#F4F0E8] shadow-[2px_2px_0px_#0C0E14] transition-transform duration-200 group-hover:-translate-y-0.5">
            <Compass className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#103FEF] bg-[#F4F0E8]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-[#0C0E14]">
                Yuvraj
              </span>
              <span className="font-editorial text-xl italic text-[#103FEF]">
                .design
              </span>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#0C0E14]/60">
              UI/UX &amp; WEB ARCHITECTURE
            </p>
          </div>
        </button>

        {/* Center Multi-Page Nav Tabs (Desktop) */}
        <nav className="hidden items-center gap-1 rounded-full border border-[#103FEF]/25 bg-[#ECE7DC]/90 p-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => handleTabClick(item.tab)}
                className={`group relative cursor-pointer rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-200 ${
                  isActive
                    ? "bg-[#103FEF] text-[#F4F0E8] shadow-[2px_2px_0px_#0C0E14]"
                    : "text-[#0C0E14] hover:bg-[#103FEF]/10 hover:text-[#103FEF]"
                }`}
              >
                <span
                  className={`mr-1.5 text-[9px] transition-colors ${
                    isActive ? "text-[#F4F0E8]/80" : "text-[#103FEF]"
                  }`}
                >
                  {item.code}.
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Delhi Clock + Surge Diagnostic Trigger + CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#103FEF]/30 bg-[#ECE7DC] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0C0E14] xl:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#103FEF]" />
            <span>DELHI · {delhiClock}</span>
          </div>

          <button
            type="button"
            onClick={() => handleTabClick("contact")}
            className="inline-flex cursor-pointer items-center gap-1.5 sm:gap-2 rounded-full border border-[#0833D8] bg-[#103FEF] px-3.5 py-1.5 sm:px-5 sm:py-2.5 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#F4F0E8] shadow-[2px_2px_0px_#0C0E14] sm:shadow-[3px_3px_0px_#0C0E14] transition-all duration-200 hover:bg-[#0833D8]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center border border-[#103FEF] bg-[#ECE7DC] p-2 text-[#0C0E14] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#103FEF]/25 bg-[#F4F0E8] px-4 py-5 md:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.tab}
                type="button"
                onClick={() => handleTabClick(item.tab)}
                className={`flex w-full cursor-pointer items-center justify-between border p-3 font-mono text-xs uppercase tracking-[0.16em] transition ${
                  activeTab === item.tab
                    ? "border-[#103FEF] bg-[#103FEF] text-[#F4F0E8]"
                    : "border-[#103FEF]/20 bg-[#ECE7DC] text-[#0C0E14]"
                }`}
              >
                <span>{item.code}. {item.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-[#103FEF]/20 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-[#0C0E14]/75 px-1 py-1">
              <span>DELHI TIME:</span>
              <span className="font-bold text-[#103FEF]">{delhiClock}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
