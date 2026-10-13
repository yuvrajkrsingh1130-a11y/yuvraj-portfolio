import { useCallback, useEffect, useMemo, useState } from "react";
import { Phone, Sparkles } from "lucide-react";
import { Navbar } from "./components/autospa/Navbar";
import { Hero, ServiceTicker } from "./components/autospa/Hero";
import { Ritual } from "./components/autospa/Ritual";
import { Packages } from "./components/autospa/Packages";
import { Ceramic } from "./components/autospa/Ceramic";
import { Gallery } from "./components/autospa/Gallery";
import { Reviews } from "./components/autospa/Reviews";
import { LocationSection } from "./components/autospa/LocationSection";
import { Faq } from "./components/autospa/Faq";
import { SiteFooter } from "./components/autospa/SiteFooter";
import { CERAMIC_ID, ReserveModal } from "./components/autospa/ReserveModal";
import { PHONE_DISPLAY, PHONE_HREF, type VehicleClass } from "./data/autospa";
import { cn } from "./utils/cn";
import { BUTTON_PHYSICS } from "./components/autospa/Reveal";

/* ------------------------------------------------------------------ */
/*  Tampa open-now logic (America/New_York)                            */
/*  Mon–Sat 10:00–19:00 · Sun 11:00–19:00                              */
/* ------------------------------------------------------------------ */
function useTampaHours() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  return useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "short",
        hour: "numeric",
        hour12: false,
      }).formatToParts(now);
      const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
      const isSunday = weekday === "Sun";
      const opens = isSunday ? 11 : 10;
      const closes = 19;
      const openNow = hour >= opens && hour < closes;
      const range = isSunday ? "11:00 AM – 7:00 PM" : "10:00 AM – 7:00 PM";
      return {
        openNow,
        todayLabel: `Today ${range} · Tampa, FL`,
      };
    } catch {
      return { openNow: true, todayLabel: "Mon–Sat 10 AM – 7 PM · Sun 11 AM – 7 PM" };
    }
  }, [now]);
}

/* ------------------------------------------------------------------ */
/*  Cinematic intro loader (skeleton shimmer -> fade)                  */
/* ------------------------------------------------------------------ */
function IntroLoader({ done }: { done: boolean }) {
  return (
    <div
      aria-hidden={done}
      className={cn(
        "fixed inset-0 z-[90] flex items-center justify-center bg-[#09090b] transition-all duration-700 ease-out",
        done ? "pointer-events-none -translate-y-3 opacity-0" : "opacity-100"
      )}
    >
      <div className="w-full max-w-xs px-6 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-[0_0_45px_rgba(59,130,246,0.55)] ring-1 ring-white/20">
          <Sparkles className="h-7 w-7 text-white" strokeWidth={2.2} />
        </span>
        <p className="mt-6 text-lg font-extrabold tracking-tight text-white">Auto Spa America</p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
          International Plaza • Tampa
        </p>
        {/* Skeleton shimmer bars */}
        <div className="mt-8 space-y-2.5" aria-hidden>
          <div className="skeleton-bar mx-auto h-2.5 w-4/5 rounded-full" />
          <div className="skeleton-bar mx-auto h-2.5 w-3/5 rounded-full" />
          <div className="skeleton-bar mx-auto h-2.5 w-2/3 rounded-full" />
        </div>
        <div className="mx-auto mt-8 h-[3px] w-44 overflow-hidden rounded-full bg-white/[0.07]">
          <div className="h-full w-full origin-left animate-[loaderBar_1.15s_cubic-bezier(0.22,1,0.36,1)_both] rounded-full bg-gradient-to-r from-blue-500 to-indigo-400" />
        </div>
        <style>{`@keyframes loaderBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll progress hairline                                           */
/* ------------------------------------------------------------------ */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2.5px] bg-transparent" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400 shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState<VehicleClass>("sedan");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPackage, setModalPackage] = useState<string>("french-spa-signature");
  const { openNow, todayLabel } = useTampaHours();

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1250);
    return () => window.clearTimeout(t);
  }, []);

  const openReserve = useCallback((packageId?: string) => {
    if (packageId) setModalPackage(packageId);
    setModalOpen(true);
  }, []);

  const openCeramic = useCallback(() => {
    setModalPackage(CERAMIC_ID);
    setModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] font-sans text-zinc-100 selection:bg-blue-600 selection:text-white">
      <IntroLoader done={!loading} />
      <ScrollProgress />
      <Navbar onReserve={() => openReserve()} />

      <main
        className={cn(
          "transition-all delay-100 duration-1000 ease-out",
          loading ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <Hero onReserve={() => openReserve()} openNow={openNow} />
        <ServiceTicker />
        <Ritual />
        <Packages vehicle={vehicle} onVehicleChange={setVehicle} onReserve={openReserve} />
        <Ceramic onReserve={openCeramic} />
        <Gallery />
        <Reviews />
        <LocationSection openNow={openNow} todayLabel={todayLabel} />
        <Faq />
      </main>

      <SiteFooter onReserve={() => openReserve()} openNow={openNow} />

      {/* Mobile sticky conversion bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#09090b]/88 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2.5">
          <a
            href={PHONE_HREF}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-3 text-[13px] font-extrabold text-white",
              BUTTON_PHYSICS
            )}
          >
            <Phone className="h-4 w-4 text-blue-400" /> {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={() => openReserve()}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-[13px] font-extrabold text-white shadow-[0_0_26px_rgba(59,130,246,0.5)]",
              BUTTON_PHYSICS
            )}
          >
            <Sparkles className="h-4 w-4" /> Reserve Slot
          </button>
        </div>
      </div>
      {/* Spacer so the sticky bar never covers footer content on mobile */}
      <div className="h-[68px] lg:hidden" aria-hidden />

      <ReserveModal
        open={modalOpen}
        initialPackageId={modalPackage}
        vehicle={vehicle}
        onVehicleChange={setVehicle}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
