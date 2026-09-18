import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import { TransitionProvider, TransitionLink } from "./components/PageTransition";
import { initSmoothScroll } from "./lib/scroll";
import { ScrollTrigger } from "./lib/motion";

/* Pages are code-split so the first load stays light. */
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Lab = lazy(() => import("./pages/Lab"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-start justify-center px-[var(--pad)] pt-24">
      <p className="tiny-label mb-4 text-[var(--orange)]">ERROR 404 — SIGNAL LOST</p>
      <h1 className="display text-[clamp(3rem,10vw,9rem)]">
        WRONG
        <br />
        TURN.
      </h1>
      <TransitionLink to="/" className="cta mt-10" data-magnetic="0.28">
        <span>BACK TO INDEX</span>
        <span className="cta-arrow" aria-hidden="true">→</span>
      </TransitionLink>
    </section>
  );
}

function Shell() {
  const location = useLocation();

  /* reset scroll + refresh measurements on every route change */
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    const onFonts = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(onFonts).catch(() => {});
    return () => {
      window.clearTimeout(t);
      document.fonts?.ready.then(() => {}).catch(() => {});
    };
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        SKIP TO CONTENT
      </a>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const dispose = initSmoothScroll();
    return dispose;
  }, []);

  return (
    <BrowserRouter>
      {/* stays mounted; hides itself once its timeline finishes */}
      <Preloader onDone={() => setReady(true)} />
      {ready && (
        <TransitionProvider>
          <Shell />
        </TransitionProvider>
      )}
    </BrowserRouter>
  );
}
