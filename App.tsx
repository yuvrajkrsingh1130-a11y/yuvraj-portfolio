import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import BookOpening from './components/BookOpening';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import WorkSection from './components/WorkSection';
import BarberCaseStudy from './components/BarberCaseStudy';
import AboutSection from './components/AboutSection';
import PlaygroundSection from './components/PlaygroundSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [bookOpened, setBookOpened] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  /* ========================
     BOOK OPENED
  ======================== */
  const handleBookOpened = useCallback(() => {
    setBookOpened(true);
  }, []);

  /* ========================
     SCROLL TRACKING
  ======================== */
  useEffect(() => {
    if (!bookOpened) return;

    const sectionIds = ['hero', 'work', 'about', 'experiments', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { id: string; ratio: number } | null = null;
        entries.forEach((entry) => {
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { id: entry.target.id, ratio: entry.intersectionRatio };
          }
        });
        if (best && (best as { id: string; ratio: number }).ratio > 0.2) {
          setActiveSection((best as { id: string; ratio: number }).id);
        }
      },
      {
        threshold: [0.2, 0.5],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    els.forEach(el => observer.observe(el!));

    return () => observer.disconnect();
  }, [bookOpened]);

  /* ========================
     NAVIGATION
  ======================== */
  const handleNavigate = useCallback((id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const navH = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  /* ========================
     SCROLL LOCK
  ======================== */
  useEffect(() => {
    if (!bookOpened || caseStudyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [bookOpened, caseStudyOpen]);

  return (
    <>
      {/* ==================
          GLOBAL OVERLAYS
      ================== */}
      {/* Film grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />

      {/* Custom cursor — hidden automatically on touch devices */}
      <CustomCursor />

      {/* ==================
          BOOK INTRO
      ================== */}
      <AnimatePresence mode="wait">
        {!bookOpened && (
          <BookOpening key="book" onComplete={handleBookOpened} />
        )}
      </AnimatePresence>

      {/* ==================
          PORTFOLIO
      ================== */}
      <AnimatePresence>
        {bookOpened && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Navigation */}
            <Navigation
              activeSection={activeSection}
              onNavigate={handleNavigate}
            />

            {/* Skip to main content (a11y) */}
            <a
              href="#main-content"
              style={{
                position: 'fixed',
                top: '-60px',
                left: '16px',
                zIndex: 99999,
                background: 'var(--charcoal)',
                color: 'var(--ivory)',
                padding: '8px 16px',
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'top 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.top = '16px'; }}
              onBlur={(e) => { e.currentTarget.style.top = '-60px'; }}
            >
              Skip to content
            </a>

            {/* Main content */}
            <main id="main-content" tabIndex={-1}>
              <HeroSection onNavigate={handleNavigate} />
              <WorkSection onProjectOpen={(id) => {
                if (id === 'barber-house') setCaseStudyOpen(true);
              }} />
              <AboutSection />
              <PlaygroundSection />
              <ContactSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================
          CASE STUDY
      ================== */}
      <BarberCaseStudy
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
      />
    </>
  );
}
