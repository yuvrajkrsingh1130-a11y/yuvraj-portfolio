import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface BookOpeningProps {
  onComplete: () => void;
}

type BookPhase = 'idle' | 'lifting' | 'opening' | 'done';

export default function BookOpening({ onComplete }: BookOpeningProps) {
  const [phase, setPhase] = useState<BookPhase>('idle');
  const [skipped, setSkipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const addTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const handleSkip = () => {
    clearTimeouts();
    setSkipped(true);
    onComplete();
  };

  const handleBookClick = () => {
    if (phase !== 'idle') return;

    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    setPhase('lifting');
    addTimeout(() => setPhase('opening'), 600);
    addTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2400);
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  if (skipped) return null;

  const getCoverAnimation = () => {
    switch (phase) {
      case 'idle':
        return { rotateY: 0, z: 0, y: 0 };
      case 'lifting':
        return { rotateY: 0, z: 20, y: -8 };
      case 'opening':
      case 'done':
        return { rotateY: -160, z: 20, y: -8 };
      default:
        return { rotateY: 0, z: 0, y: 0 };
    }
  };

  const getCoverTransition = () => {
    switch (phase) {
      case 'lifting':
        return { duration: 0.5, ease: 'easeInOut' as const };
      case 'opening':
      case 'done':
        return { duration: 1.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.1 };
      default:
        return { duration: 0.3 };
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        style={{ background: 'var(--ivory)' }}
      >
        {/* Vignette */}
        <div className="vignette" />

        {/* Skip button */}
        <motion.button
          onClick={handleSkip}
          data-cursor="hover"
          className="absolute top-8 right-8 z-10"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--warm-gray)',
            cursor: 'none',
            background: 'none',
            border: 'none',
            padding: '8px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8 } }}
          whileHover={{ color: 'var(--charcoal)' } as Record<string, string>}
        >
          SKIP INTRO
        </motion.button>

        {/* Corner labels */}
        <motion.div
          className="absolute bottom-8 left-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6 } }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>
            SELECTED WORKS
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-8 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6 } }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>
            2026
          </p>
        </motion.div>

        {/* Book wrapper */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ perspective: '1200px' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 } }}
        >
          {/* Ambient shadow */}
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              width: '280px',
              height: '24px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
              transform: 'translateX(-50%)',
              filter: phase === 'lifting' || phase === 'opening' ? 'blur(8px)' : 'blur(4px)',
              opacity: phase === 'lifting' || phase === 'opening' ? 0.5 : 0.8,
              transition: 'all 0.5s ease',
            }}
          />

          {/* Book 3D container */}
          <div
            style={{ transformStyle: 'preserve-3d', cursor: phase === 'idle' ? 'none' : 'auto', position: 'relative' }}
            data-cursor="open"
            onClick={handleBookClick}
          >
            {/* Book pages / back */}
            <div
              style={{
                width: '300px',
                height: '400px',
                position: 'relative',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Book body */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #2a2520 0%, #1c1a17 100%)',
                  borderRadius: '2px 4px 4px 2px',
                  boxShadow: '4px 0 12px rgba(0,0,0,0.25), inset -4px 0 8px rgba(0,0,0,0.2)',
                }}
              />

              {/* Spine */}
              <div
                style={{
                  position: 'absolute',
                  left: '-18px',
                  top: 0,
                  bottom: 0,
                  width: '18px',
                  background: 'linear-gradient(90deg, #1a1815 0%, #2a2520 100%)',
                  transform: 'rotateY(-90deg)',
                  transformOrigin: 'right center',
                  borderRadius: '2px 0 0 2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '8px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.4)',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                  }}
                >
                  YUVRAJ
                </span>
              </div>

              {/* Page edges */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${2 + i * 0.5}px`,
                    right: '-1px',
                    bottom: `${2 + i * 0.5}px`,
                    width: '4px',
                    background: `rgba(240, 235, 225, ${0.9 - i * 0.1})`,
                    borderRadius: '0 1px 1px 0',
                  }}
                />
              ))}
            </div>

            {/* Animated cover */}
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '300px',
                height: '400px',
              }}
              animate={getCoverAnimation()}
              transition={getCoverTransition()}
            >
              {/* Front face of cover */}
              <CoverFace />

              {/* Back face of cover (inner) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#e8e0d0',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: '2px 0 0 2px',
                }}
              />
            </motion.div>

            {/* Inner page revealed */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '300px',
                height: '400px',
                background: 'var(--ivory)',
                borderRadius: '0 2px 2px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              animate={phase === 'opening' || phase === 'done' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--warm-gray)', fontStyle: 'italic', textAlign: 'center' }}>
                Opening...
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Click/tap prompt */}
        <motion.div
          className="absolute"
          style={{ bottom: '15%' }}
          animate={phase === 'idle' ? { opacity: 1 } : { opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--warm-gray)',
            }}
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            TAP TO OPEN
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CoverFace() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '300px',
        height: '400px',
        background: 'linear-gradient(145deg, #1e1b18 0%, #2d2925 40%, #1c1a17 100%)',
        borderRadius: '2px 4px 4px 2px',
        backfaceVisibility: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.012) 2px,
            rgba(255,255,255,0.012) 4px
          )`,
        }}
      />

      {/* Decorative corners */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', width: '30px', height: '30px', borderTop: '1px solid rgba(184,168,152,0.4)', borderLeft: '1px solid rgba(184,168,152,0.4)' }} />
      <div style={{ position: 'absolute', top: '20px', right: '20px', width: '30px', height: '30px', borderTop: '1px solid rgba(184,168,152,0.4)', borderRight: '1px solid rgba(184,168,152,0.4)' }} />
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '30px', height: '30px', borderBottom: '1px solid rgba(184,168,152,0.4)', borderLeft: '1px solid rgba(184,168,152,0.4)' }} />
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '30px', height: '30px', borderBottom: '1px solid rgba(184,168,152,0.4)', borderRight: '1px solid rgba(184,168,152,0.4)' }} />

      {/* Horizontal rules */}
      <div style={{ position: 'absolute', top: '48px', left: '40px', right: '40px', height: '1px', background: 'rgba(184,168,152,0.25)' }} />
      <div style={{ position: 'absolute', bottom: '48px', left: '40px', right: '40px', height: '1px', background: 'rgba(184,168,152,0.25)' }} />

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '8px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(184,168,152,0.7)',
          marginBottom: '24px',
        }}>
          PORTFOLIO
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '42px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          color: 'rgba(245,240,232,0.95)',
          lineHeight: 1,
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          YUVRAJ
        </h1>

        <div style={{ width: '40px', height: '1px', background: 'rgba(184,168,152,0.5)', margin: '0 auto 16px' }} />

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(184,168,152,0.8)',
          marginBottom: '8px',
          fontWeight: 400,
        }}>
          Graphic & UI/UX Designer
        </p>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '8px',
          letterSpacing: '0.15em',
          color: 'rgba(184,168,152,0.5)',
          marginTop: '32px',
        }}>
          SELECTED WORKS / 2026
        </p>
      </div>
    </div>
  );
}
