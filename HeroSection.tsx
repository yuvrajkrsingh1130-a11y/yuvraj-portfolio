import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -30]);
  const bgLetterY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 80]);

  const words = ['I DESIGN', 'DIGITAL', 'EXPERIENCES', 'THAT FEEL', 'AS GOOD', 'AS THEY', 'FUNCTION.'];

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Introduction"
      style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {/* Large decorative background number */}
      <motion.div
        style={{
          position: 'absolute',
          right: '-4%',
          bottom: '-10%',
          fontFamily: 'var(--font-serif)',
          fontSize: 'min(50vw, 560px)',
          fontWeight: 400,
          color: 'var(--ivory-dark)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          y: bgLetterY,
        }}
        aria-hidden="true"
      >
        01
      </motion.div>

      {/* Editorial grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
        className="max-md:!grid-cols-1"
      >
        {/* ===== LEFT PAGE ===== */}
        <motion.div
          style={{
            padding: 'clamp(110px, 11vw, 150px) clamp(28px, 5.5vw, 72px) clamp(48px, 7vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--ivory-deeper)',
            y: leftY,
          }}
        >
          {/* Top metadata row */}
          <motion.div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--warm-gray)',
                marginBottom: '4px',
              }}>
                YUVRAJ / DESIGNER
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.15em',
                color: 'var(--warm-gray-light)',
              }}>
                PORTFOLIO 2026
              </p>
            </div>
            {/* Availability badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--olive)',
              }} />
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '8px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--olive)',
              }}>
                AVAILABLE
              </p>
            </div>
          </motion.div>

          {/* Main headline */}
          <div style={{ margin: 'auto 0', padding: 'clamp(40px, 6vw, 80px) 0' }}>
            <h1
              aria-label="I design digital experiences that feel as good as they function."
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(40px, 5.8vw, 80px)',
                fontWeight: 400,
                lineHeight: 1.03,
                letterSpacing: '-0.015em',
                color: 'var(--charcoal)',
                marginBottom: '36px',
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'block' }}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + i * 0.07,
                    duration: 0.65,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {i === 5 ? <em style={{ fontStyle: 'italic', color: 'var(--warm-gray)' }}>{word}</em> : word}
                </motion.span>
              ))}
            </h1>

            {/* Rule */}
            <motion.div
              style={{
                height: '1px',
                background: 'var(--ivory-deeper)',
                marginBottom: '24px',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.9, ease: 'easeInOut' }}
            />

            <motion.p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'var(--warm-gray)',
                maxWidth: '340px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
            >
              Graphic design, UI/UX, and creative development — built with intention. Based wherever the work is good.
            </motion.p>
          </div>

          {/* Bottom row */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            >
              <div style={{ width: '1px', height: '28px', background: 'var(--warm-gray-light)' }} />
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--warm-gray)',
              }}>
                SCROLL ↓
              </p>
            </motion.div>

            <button
              onClick={() => onNavigate('work')}
              className="btn-editorial"
              data-cursor="view"
            >
              VIEW WORK →
            </button>
          </motion.div>
        </motion.div>

        {/* ===== RIGHT PAGE ===== */}
        <motion.div
          className="hide-mobile"
          style={{
            padding: 'clamp(110px, 11vw, 150px) clamp(28px, 5.5vw, 72px) clamp(48px, 7vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            y: rightY,
          }}
        >
          <AbstractComposition />

          {/* Bottom metadata */}
          <motion.div
            style={{ position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.7 }}
          >
            <div style={{ height: '1px', background: 'var(--ivory-deeper)', marginBottom: '20px' }} />
            <div style={{ display: 'flex', gap: '32px' }}>
              {['GRAPHIC DESIGN', 'UI / UX', 'WEB'].map((service) => (
                <div key={service}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '8px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--warm-gray-light)',
                  }}>
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AbstractComposition() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Huge background Y */}
      <motion.div
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-serif)',
          fontSize: 'min(42vw, 420px)',
          fontWeight: 400,
          color: 'var(--ivory-darker, var(--ivory-dark))',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          top: '0',
          right: '-10%',
          letterSpacing: '-0.04em',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        Y
      </motion.div>

      {/* Vertical rule */}
      <motion.div
        style={{
          position: 'absolute',
          left: '22%',
          top: '20%',
          width: '1px',
          background: 'var(--ivory-deeper)',
          transformOrigin: 'top',
        }}
        initial={{ height: 0 }}
        animate={{ height: '200px' }}
        transition={{ delay: 0.7, duration: 1.0, ease: 'easeInOut' }}
      />

      {/* Circle */}
      <motion.div
        style={{
          position: 'absolute',
          left: '18%',
          top: '18%',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '1px solid var(--ivory-deeper)',
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.7, ease: 'backOut' }}
      />

      {/* Dotted accent */}
      <motion.div
        style={{
          position: 'absolute',
          top: '45%',
          right: '28%',
          width: '6px',
          height: '6px',
          background: 'var(--burgundy)',
          borderRadius: '50%',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: 'backOut' }}
      />

      {/* Small olive square */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '35%',
          right: '20%',
          width: '20px',
          height: '20px',
          border: '1px solid var(--olive)',
          opacity: 0.5,
          transform: 'rotate(18deg)',
        }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.5, rotate: 18 }}
        transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
      />

      {/* Italic caption */}
      <motion.p
        style={{
          position: 'absolute',
          bottom: '28%',
          left: '12%',
          fontFamily: 'var(--font-serif)',
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'var(--warm-gray-light)',
          lineHeight: 1.7,
          textAlign: 'left',
          maxWidth: '160px',
        }}
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.15, duration: 0.8 }}
        aria-hidden="true"
      >
        "Design is the<br />
        art of making<br />
        decisions."
      </motion.p>

      {/* Vertical label */}
      <motion.p
        style={{
          position: 'absolute',
          right: '10%',
          bottom: '20%',
          fontFamily: 'var(--font-sans)',
          fontSize: '8px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--warm-gray-light)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        aria-hidden="true"
      >
        SELECTED 2026
      </motion.p>
    </div>
  );
}
