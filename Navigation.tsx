import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../data/projects';

interface NavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [indexOpen, setIndexOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setIndexOpen(false);
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '14px clamp(20px, 5vw, 64px)' : '22px clamp(20px, 5vw, 64px)',
          background: scrolled ? 'rgba(245, 240, 232, 0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--ivory-deeper)' : 'none',
          transition: 'padding 0.3s ease, background 0.4s ease, border-bottom 0.3s',
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavigate('hero')}
          data-cursor="hover"
          aria-label="YUVRAJ — Go to top"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '19px',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--charcoal)',
            cursor: 'none',
            background: 'none',
            border: 'none',
            lineHeight: 1,
          }}
        >
          YUVRAJ
        </button>

        {/* Desktop nav items */}
        <div
          className="hide-mobile"
          style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              data-cursor="hover"
              className="nav-underline"
              aria-current={activeSection === item.id ? 'page' : undefined}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: activeSection === item.id ? 'var(--charcoal)' : 'var(--warm-gray)',
                cursor: 'none',
                background: 'none',
                border: 'none',
                padding: '4px 0',
                transition: 'color 0.3s',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side — Index button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor="hover"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              cursor: 'auto',
              background: 'none',
              border: '1px solid var(--charcoal)',
              padding: '6px 12px',
            }}
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>

          {/* Desktop index */}
          <button
            className="hide-mobile"
            onClick={() => setIndexOpen(true)}
            data-cursor="hover"
            aria-label="Open index"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              cursor: 'none',
              background: 'none',
              border: '1px solid var(--charcoal)',
              padding: '7px 16px',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--charcoal)';
              e.currentTarget.style.color = 'var(--ivory)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--charcoal)';
            }}
          >
            INDEX
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'var(--charcoal)',
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 32px 48px',
            }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(32px, 8vw, 52px)',
                    fontWeight: 400,
                    color: 'rgba(245,240,232,0.85)',
                    background: 'none',
                    border: 'none',
                    cursor: 'auto',
                    textAlign: 'left',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(245,240,232,0.07)',
                    letterSpacing: '-0.01em',
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  {item.label.replace(/^\d+\s/, '')}
                </motion.button>
              ))}
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: 'rgba(245,240,232,0.3)',
              }}>
                hello@yuvraj.design
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Index Overlay */}
      <AnimatePresence>
        {indexOpen && (
          <IndexOverlay
            onNavigate={handleNavigate}
            onClose={() => setIndexOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface IndexOverlayProps {
  onNavigate: (id: string) => void;
  onClose: () => void;
}

function IndexOverlay({ onNavigate, onClose }: IndexOverlayProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const sections = [
    { number: '00', title: 'INTRODUCTION', sub: 'The book opens here.', id: 'hero' },
    { number: '01', title: 'SELECTED WORKS', sub: 'Barber House, Casa, Northline, Experiment 004', id: 'work' },
    { number: '02', title: 'ABOUT', sub: 'Designer. Visual thinker. Builder.', id: 'about' },
    { number: '03', title: 'THE PLAYGROUND', sub: 'Experiments in motion and interaction.', id: 'experiments' },
    { number: '04', title: 'CONTACT', sub: "Let's make something worth opening.", id: 'contact' },
  ];

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 450,
        background: 'var(--charcoal)',
        display: 'flex',
        flexDirection: 'column',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label="Site index"
    >
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px clamp(24px, 5vw, 64px)',
        borderBottom: '1px solid rgba(245,240,232,0.07)',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.35)',
        }}>
          INDEX / YUVRAJ / 2026
        </p>
        <button
          onClick={onClose}
          data-cursor="hover"
          aria-label="Close index"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.5)',
            cursor: 'none',
            background: 'none',
            border: '1px solid rgba(245,240,232,0.15)',
            padding: '7px 16px',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--ivory)';
            e.currentTarget.style.borderColor = 'rgba(245,240,232,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(245,240,232,0.5)';
            e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)';
          }}
        >
          CLOSE ×
        </button>
      </div>

      {/* Sections */}
      <nav style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(24px, 5vw, 64px)',
      }}>
        {sections.map((section, i) => (
          <motion.button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            data-cursor="hover"
            className="index-row"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '28px',
              padding: '20px 0',
              background: 'none',
              border: 'none',
              cursor: 'none',
              textAlign: 'left',
              width: '100%',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
          >
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'rgba(184,168,152,0.45)',
              minWidth: '28px',
              flexShrink: 0,
            }}>
              {section.number}
            </span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: '20px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(22px, 3.5vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: 'rgba(245,240,232,0.88)',
                lineHeight: 1.15,
              }}>
                {section.title}
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.3)',
              }}>
                {section.sub}
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'rgba(184,168,152,0.4)',
              flexShrink: 0,
            }}>
              →
            </span>
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '20px clamp(24px, 5vw, 64px)',
        borderTop: '1px solid rgba(245,240,232,0.07)',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        {['hello@yuvraj.design', 'Instagram', 'LinkedIn'].map((link) => (
          <a
            key={link}
            href={link.includes('@') ? `mailto:${link}` : '#'}
            data-cursor="hover"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(245,240,232,0.3)',
              textDecoration: 'none',
              transition: 'color 0.25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.7)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.3)'; }}
          >
            {link}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
