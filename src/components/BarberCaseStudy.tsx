import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface BarberCaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BarberCaseStudy({ isOpen, onClose }: BarberCaseStudyProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            background: 'var(--ivory)',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Sticky close button */}
          <button
            onClick={onClose}
            data-cursor="hover"
            aria-label="Close case study and return to portfolio"
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 700,
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ivory)',
              cursor: 'none',
              background: 'var(--charcoal)',
              border: 'none',
              padding: '9px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            ← BACK
          </button>

          <Chapter01Hero />
          <Chapter01Brief />
          <Chapter01Mockups />
          <Chapter01DesignSystem />
          <Chapter01Closing onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===============================
   CHAPTER 1 — CINEMATIC HERO
   =============================== */

function Chapter01Hero() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      {/* Large ambient background letter */}
      <div style={{
        position: 'absolute',
        right: '-4%',
        top: '-6%',
        fontFamily: 'var(--font-serif)',
        fontSize: 'min(65vw, 700px)',
        fontWeight: 400,
        color: 'rgba(122,45,58,0.07)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        B
      </div>

      {/* Top metadata */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{ marginBottom: '32px' }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['BRAND', 'WEB DESIGN', 'UI/UX', '2026', 'CLIENT WORK'].map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '8px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(184,168,152,0.6)',
                border: '1px solid rgba(184,168,152,0.15)',
                padding: '4px 10px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.95 }}
        style={{ marginBottom: '36px' }}
      >
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(56px, 10vw, 140px)',
          fontWeight: 400,
          color: 'rgba(245,240,232,0.95)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
        }}>
          BARBER<br />
          <span style={{ color: 'var(--burgundy)' }}>HOUSE</span>
        </h1>
      </motion.div>

      {/* Subtitle + rule */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ maxWidth: '500px' }}
      >
        <div style={{ height: '1px', background: 'rgba(245,240,232,0.1)', marginBottom: '24px' }} />
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(13px, 1.6vw, 17px)',
          fontWeight: 300,
          color: 'rgba(245,240,232,0.45)',
          lineHeight: 1.75,
        }}>
          A modern digital identity and booking experience for a contemporary barbershop.
          Where precision meets personality.
        </p>
      </motion.div>
    </div>
  );
}

/* ===============================
   BRIEF / OVERVIEW
   =============================== */

function Chapter01Brief() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const cards = [
    {
      label: 'THE BRIEF',
      content: 'A contemporary barbershop needed a digital presence that matched the quality and atmosphere of their physical space — clean, confident, and easy to navigate.',
    },
    {
      label: 'THE APPROACH',
      content: 'Restrained typography, intentional negative space, and a dark colour palette that communicates authority without being aggressive. Every element had a reason to exist.',
    },
    {
      label: 'DELIVERABLES',
      list: ['Visual Identity System', 'Website Design', 'Booking Flow UI', 'Mobile App Screens', 'Brand Guidelines'],
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--ivory)',
        padding: 'clamp(60px, 9vw, 110px) clamp(24px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'clamp(36px, 5vw, 60px)',
      }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.15, duration: 0.75 }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--warm-gray)',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--ivory-deeper)',
          }}>
            {card.label}
          </p>

          {card.content && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--charcoal)',
              lineHeight: 1.8,
            }}>
              {card.content}
            </p>
          )}

          {card.list && (
            <ul style={{ listStyle: 'none' }}>
              {card.list.map((item, li) => (
                <li
                  key={item}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--charcoal)',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--ivory-deeper)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    color: 'var(--warm-gray-light)',
                    minWidth: '20px',
                  }}>
                    {String(li + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ===============================
   MOCKUPS / SCREENS
   =============================== */

function Chapter01Mockups() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        background: '#0f0f0f',
        padding: 'clamp(60px, 9vw, 110px) clamp(24px, 6vw, 80px)',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(184,168,152,0.4)',
          marginBottom: '48px',
        }}
      >
        SCREENS & INTERFACES
      </motion.p>

      {/* Desktop browser mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.9 }}
        style={{ marginBottom: '40px' }}
      >
        <BarberDesktopScreen />
      </motion.div>

      {/* Three mobile mockups */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.45, duration: 0.9 }}
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {['BOOKING', 'SERVICES', 'GALLERY'].map((screen, i) => (
          <BarberMobileScreen key={screen} screen={screen} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

function BarberDesktopScreen() {
  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      background: '#0d0d0d',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '10px 10px 0 0',
      overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
    }}>
      {/* Browser bar */}
      <div style={{
        background: '#1a1a1a',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
        ))}
        <div style={{
          flex: 1,
          background: '#111',
          borderRadius: '4px',
          padding: '5px 12px',
          margin: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28c840', opacity: 0.7 }} />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>barberhouse.co</p>
        </div>
      </div>

      {/* Page content */}
      <div style={{ background: '#111111' }}>
        {/* Nav */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'rgba(245,240,232,0.9)', letterSpacing: '0.1em' }}>BARBER HOUSE</p>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['SERVICES', 'GALLERY', 'BOOKING', 'ABOUT'].map(n => (
              <p key={n} style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{n}</p>
            ))}
          </div>
          <div style={{ background: 'var(--burgundy)', padding: '7px 16px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.22em', color: 'rgba(245,240,232,0.95)', textTransform: 'uppercase' }}>BOOK NOW</p>
          </div>
        </div>

        {/* Hero section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '52px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--burgundy)', marginBottom: '20px' }} />
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: 'rgba(245,240,232,0.95)', lineHeight: 1.05, marginBottom: '16px', letterSpacing: '-0.01em' }}>
              THE ART<br />OF THE<br />CUT.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, marginBottom: '24px', fontWeight: 300 }}>
              Precision styling for the modern<br />gentleman. By appointment only.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ background: 'var(--burgundy)', padding: '9px 18px' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.2em', color: 'white', textTransform: 'uppercase' }}>BOOK NOW</p>
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '9px 18px' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>OUR WORK</p>
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(122,45,58,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative scissors icon */}
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '100px',
              color: 'rgba(122,45,58,0.25)',
              userSelect: 'none',
              lineHeight: 1,
            }}>✦</p>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontFamily: 'var(--font-sans)',
              fontSize: '7px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
            }}>
              HERO IMAGE
            </div>
          </div>
        </div>

        {/* Services strip */}
        <div style={{
          display: 'flex',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          {['HAIRCUT', 'BEARD TRIM', 'HOT TOWEL SHAVE', 'FULL PACKAGE'].map((service, i) => (
            <div
              key={service}
              style={{
                flex: 1,
                padding: '20px 24px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '6px' }}>{service}</p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'rgba(245,240,232,0.6)' }}>—</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarberMobileScreen({ screen, index }: { screen: string; index: number }) {
  const screenConfigs: Record<string, { bg: string; accent: string; content: React.ReactNode }> = {
    BOOKING: {
      bg: '#1a1a1a',
      accent: '#7a2d3a',
      content: (
        <div style={{ padding: '12px 10px', flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '6px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginBottom: '10px', textTransform: 'uppercase' }}>SELECT DATE</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', marginBottom: '12px' }}>
            {Array.from({ length: 28 }, (_, i) => (
              <div key={i} style={{
                height: '18px',
                background: i === 14 ? '#7a2d3a' : 'rgba(255,255,255,0.06)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '5px', color: i === 14 ? 'white' : 'rgba(255,255,255,0.3)' }}>{i + 1}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '6px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px', textTransform: 'uppercase' }}>SELECT TIME</p>
          {['10:00', '11:30', '14:00'].map((t, i) => (
            <div key={t} style={{
              padding: '6px 8px',
              marginBottom: '4px',
              background: i === 1 ? '#7a2d3a' : 'rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', color: i === 1 ? 'white' : 'rgba(255,255,255,0.4)' }}>{t}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', color: i === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}>AVAIL</p>
            </div>
          ))}
        </div>
      ),
    },
    SERVICES: {
      bg: '#161616',
      accent: '#5a5e45',
      content: (
        <div style={{ padding: '12px 10px', flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'rgba(245,240,232,0.85)', marginBottom: '12px', letterSpacing: '-0.01em' }}>Services</p>
          {[
            { name: 'Haircut', price: '£35' },
            { name: 'Beard Trim', price: '£20' },
            { name: 'Hot Towel Shave', price: '£45' },
            { name: 'Full Package', price: '£75' },
          ].map((item) => (
            <div key={item.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{item.name}</p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '11px', color: 'rgba(245,240,232,0.8)' }}>{item.price}</p>
            </div>
          ))}
          <div style={{ marginTop: '14px', background: '#7a2d3a', padding: '9px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.2em', color: 'white', textTransform: 'uppercase' }}>BOOK NOW</p>
          </div>
        </div>
      ),
    },
    GALLERY: {
      bg: '#121212',
      accent: '#b8a898',
      content: (
        <div style={{ padding: '12px 10px', flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '6px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginBottom: '10px', textTransform: 'uppercase' }}>OUR WORK</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', marginBottom: '6px' }}>
            {['#2a2a2a', '#1e1e1e', '#262626', '#1a1a1a', '#222', '#1c1c1c'].map((bg, i) => (
              <div key={i} style={{ aspectRatio: '1', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'rgba(122,45,58,0.3)' }}>✦</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  const config = screenConfigs[screen] || screenConfigs.BOOKING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.65 }}
      viewport={{ once: true }}
      style={{
        width: 'clamp(120px, 20vw, 160px)',
        background: config.bg,
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Status bar */}
      <div style={{
        height: '26px',
        background: 'rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
      }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '6px', color: 'rgba(255,255,255,0.4)' }}>9:41</p>
        <div style={{ width: '36px', height: '7px', background: 'rgba(255,255,255,0.12)', borderRadius: '3px' }} />
      </div>

      {/* Screen content */}
      {config.content}

      {/* Home indicator */}
      <div style={{ height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
      </div>
    </motion.div>
  );
}

/* ===============================
   DESIGN SYSTEM
   =============================== */

function Chapter01DesignSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const palette = [
    { name: 'CHARCOAL', hex: '#1C1C1C', bg: '#1C1C1C', text: 'rgba(245,240,232,0.7)', usage: 'Primary / Background' },
    { name: 'BURGUNDY', hex: '#7A2D3A', bg: '#7A2D3A', text: 'rgba(245,240,232,0.8)', usage: 'Accent / CTA' },
    { name: 'IVORY', hex: '#F5F0E8', bg: '#F5F0E8', text: '#1C1C1C', usage: 'Light / Text' },
    { name: 'METALLIC', hex: '#B8A898', bg: '#B8A898', text: '#1C1C1C', usage: 'Muted / Detail' },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--ivory)',
        padding: 'clamp(60px, 9vw, 110px) clamp(24px, 6vw, 80px)',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--warm-gray)',
          marginBottom: '48px',
        }}
      >
        DESIGN SYSTEM
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '60px' }}>
        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--warm-gray)',
            marginBottom: '28px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--ivory-deeper)',
          }}>
            TYPOGRAPHY
          </p>

          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '60px', fontWeight: 400, color: 'var(--charcoal)', lineHeight: 1, marginBottom: '8px' }}>Aa</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--warm-gray)', letterSpacing: '0.05em' }}>Cormorant Garamond</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'var(--warm-gray-light)', letterSpacing: '0.05em', marginTop: '2px' }}>Display / Headlines</p>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '22px', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1, marginBottom: '8px' }}>Aa</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--warm-gray)', letterSpacing: '0.05em' }}>DM Sans</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'var(--warm-gray-light)', letterSpacing: '0.05em', marginTop: '2px' }}>Body / UI / Navigation</p>
          </div>
        </motion.div>

        {/* Colour palette */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.75 }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--warm-gray)',
            marginBottom: '28px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--ivory-deeper)',
          }}>
            COLOUR PALETTE
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {palette.map(color => (
              <div
                key={color.name}
                style={{
                  background: color.bg,
                  padding: '16px 14px',
                  aspectRatio: '16/9',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  border: color.bg === '#F5F0E8' ? '1px solid var(--ivory-deeper)' : 'none',
                }}
              >
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.15em', color: color.text, textTransform: 'uppercase', fontWeight: 500 }}>{color.name}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', color: color.text, opacity: 0.55, letterSpacing: '0.05em', marginTop: '2px' }}>{color.hex}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ===============================
   CLOSING / NEXT
   =============================== */

function Chapter01Closing({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      background: 'var(--charcoal)',
      padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '32px',
    }}>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '9px',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(245,240,232,0.3)',
      }}>
        CASE STUDY COMPLETE
      </p>

      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(36px, 6vw, 72px)',
        fontWeight: 400,
        color: 'rgba(245,240,232,0.88)',
        lineHeight: 1.05,
        letterSpacing: '-0.01em',
      }}>
        NEXT PROJECT →
      </h2>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        fontWeight: 300,
        color: 'rgba(245,240,232,0.35)',
        maxWidth: '360px',
        lineHeight: 1.7,
      }}>
        Return to the full portfolio to explore more work.
      </p>

      <button
        onClick={onClose}
        data-cursor="hover"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--charcoal)',
          cursor: 'none',
          background: 'var(--ivory)',
          border: 'none',
          padding: '14px 32px',
          transition: 'transform 0.2s',
        }}
      >
        RETURN TO PORTFOLIO
      </button>
    </div>
  );
}
