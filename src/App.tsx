import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageTab, BlueprintProject } from "./types";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { DraftingCursor } from "./components/DraftingCursor";
import { SurgeDiagnosticModal } from "./components/SurgeDiagnosticModal";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SystemPage } from "./pages/SystemPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

// Live Delhi Clock Hook (Asia/Kolkata)
function useDelhiClock() {
  const [timeString, setTimeString] = useState<string>("20:30:00 IST");

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTimeString(`${formatter.format(new Date())} IST`);
      } catch {
        setTimeString("DELHI // IST");
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return timeString;
}

export default function App() {
  const delhiClock = useDelhiClock();
  const [activeTab, setActiveTab] = useState<PageTab>("home");
  const [blueprintXRay, setBlueprintXRay] = useState<boolean>(false);
  const [cursorEnabled, setCursorEnabled] = useState<boolean>(false);
  const [surgeModalOpen, setSurgeModalOpen] = useState<boolean>(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<BlueprintProject | null>(null);

  // Cross-Network Safe Dual-Routing: Read initial route from URL Hash or Path
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "").toLowerCase();
      const path = window.location.pathname.replace("/", "").toLowerCase();
      const route = hash || path;

      if (route.startsWith("project") || route.startsWith("work")) {
        setActiveTab("projects");
      } else if (route.startsWith("system") || route.startsWith("token")) {
        setActiveTab("system");
      } else if (route.startsWith("about") || route.startsWith("manifesto")) {
        setActiveTab("about");
      } else if (route.startsWith("contact") || route.startsWith("dispatch")) {
        setActiveTab("contact");
      } else {
        setActiveTab("home");
      }
    };

    syncRouteFromUrl();
    window.addEventListener("hashchange", syncRouteFromUrl);
    window.addEventListener("popstate", syncRouteFromUrl);

    return () => {
      window.removeEventListener("hashchange", syncRouteFromUrl);
      window.removeEventListener("popstate", syncRouteFromUrl);
    };
  }, []);

  // Sync route back to hash for zero-risk static host navigation
  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    window.location.hash = tab === "home" ? "" : `/${tab}`;
  };

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#0C0E14] selection:bg-[#103FEF] selection:text-[#F4F0E8] relative">
      {/* Global CSS Styles for Fonts and Blueprint Grids */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        :root {
          --cobalt: #103FEF;
          --cobalt-deep: #0833D8;
          --cream: #F4F0E8;
          --cream-dark: #ECE7DC;
          --ink: #0C0E14;
        }

        html {
          scroll-behavior: smooth;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body {
          overflow-x: clip;
          width: 100%;
        }

        /* Hide scrollbars for horizontal pill bars on mobile */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .font-editorial {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .font-mono-tech {
          font-family: 'Space Mono', monospace;
        }

        /* Architectural Hairline Blueprint Grid */
        .blueprint-grid {
          background-image:
            linear-gradient(to right, rgba(16, 63, 239, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 63, 239, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(16, 63, 239, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 63, 239, 0.04) 1px, transparent 1px);
          background-size: 96px 96px, 96px 96px, 16px 16px, 16px 16px;
        }

        .cobalt-blueprint-grid {
          background-image:
            linear-gradient(to right, rgba(244, 240, 232, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244, 240, 232, 0.14) 1px, transparent 1px),
            linear-gradient(to right, rgba(244, 240, 232, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244, 240, 232, 0.05) 1px, transparent 1px);
          background-size: 96px 96px, 96px 96px, 24px 24px, 24px 24px;
        }

        @keyframes dashDraw {
          0% { stroke-dashoffset: 240; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 240; }
        }

        .animate-draft-line {
          stroke-dasharray: 240;
          animation: dashDraw 7s ease-in-out infinite;
        }
      `}</style>

      {/* Warm Tracing Paper Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Optional Interactive Architectural Drafting Reticle Cursor */}
      <DraftingCursor enabled={cursorEnabled} />

      {/* Architectural Sticky Header & Multi-Page Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        delhiClock={delhiClock}
        onOpenSurgeConsole={() => setSurgeModalOpen(true)}
      />

      {/* Main Multi-Page Viewport with Animated Transitions */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage
                blueprintXRay={blueprintXRay}
                setBlueprintXRay={setBlueprintXRay}
                cursorEnabled={cursorEnabled}
                setCursorEnabled={setCursorEnabled}
                onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
                setActiveTab={handleTabChange}
                onOpenSurgeConsole={() => setSurgeModalOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsPage
                onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
                onOpenSurgeConsole={() => setSurgeModalOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === "system" && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SystemPage />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                setActiveTab={handleTabChange}
                onOpenSurgeConsole={() => setSurgeModalOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage
                delhiClock={delhiClock}
                onOpenSurgeConsole={() => setSurgeModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Architectural Blueprint Footer */}
      <Footer
        delhiClock={delhiClock}
        setActiveTab={handleTabChange}
        onOpenSurgeConsole={() => setSurgeModalOpen(true)}
      />

      {/* Deep-Dive Case Study Modal Drawer */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />

      {/* Surge Production & 404 Health Console Modal */}
      <SurgeDiagnosticModal
        isOpen={surgeModalOpen}
        onClose={() => setSurgeModalOpen(false)}
      />
    </div>
  );
}
