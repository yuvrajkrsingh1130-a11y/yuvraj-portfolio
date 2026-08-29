import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PlaygroundSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experiments"
      ref={ref}
      aria-label="Playground experiments"
      style={{
        background: 'var(--charcoal-soft, #242424)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background accent */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(ellipse, rgba(122,45,58,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Section header */}
      <motion.div
        style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ height: '1px', width: '32px', background: 'rgba(245,240,232,0.2)' }} />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(184,168,152,0.55)',
          }}>
            CHAPTER 03
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <motion.h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(44px, 7.5vw, 104px)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: 'rgba(245,240,232,0.9)',
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.9 }}
          >
            THE<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(184,168,152,0.6)' }}>PLAYGROUND</em>
          </motion.h2>

          <motion.p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.4)',
              maxWidth: '280px',
              lineHeight: 1.75,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Small experiments in motion, type, and interaction. This is where thinking happens before designing does.
          </motion.p>
        </div>
      </motion.div>

      {/* 2x2 experiment grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2px',
      }}>
        {/* Kinetic Type */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <KineticTypeExperiment />
        </motion.div>

        {/* Magnetic Objects */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <MagneticExperiment />
        </motion.div>

        {/* Colour Study */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <ColourStudyExperiment />
        </motion.div>

        {/* Type Scale */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <TypeScaleExperiment />
        </motion.div>
      </div>
    </section>
  );
}

/* ===========================
   EXPERIMENT CARD WRAPPER
   =========================== */

function ExperimentCard({
  tag,
  title,
  children,
  bg = '#1c1c1c',
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      className="experiment-card"
      data-cursor="explore"
      style={{
        background: bg,
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Tag */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '7px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.35)',
          background: 'rgba(28,28,28,0.4)',
          padding: '3px 8px',
          backdropFilter: 'blur(4px)',
        }}>
          {tag}
        </span>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px 24px',
      }}>
        {children}
      </div>

      {/* Label */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(245,240,232,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 300,
          color: 'rgba(245,240,232,0.5)',
          letterSpacing: '0.05em',
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '8px',
          color: 'rgba(245,240,232,0.2)',
          letterSpacing: '0.1em',
        }}>
          INTERACT →
        </p>
      </div>
    </div>
  );
}

/* ===========================
   EXPERIMENT 1: KINETIC TYPE
   =========================== */

function KineticTypeExperiment() {
  const phrase = 'DESIGN';

  return (
    <ExperimentCard tag="TYPOGRAPHY" title="Kinetic type — hover each letter" bg="#181818">
      <div style={{ display: 'flex', gap: '1px', alignItems: 'center' }}>
        {phrase.split('').map((char, i) => (
          <motion.span
            key={i}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 48px)',
              fontWeight: 400,
              color: 'rgba(245,240,232,0.85)',
              display: 'inline-block',
              cursor: 'default',
              userSelect: 'none',
            }}
            whileHover={{
              y: -10,
              rotate: ([-3, 4, -2, 3, -4, 2] as number[])[i] ?? 0,
              color: (['var(--burgundy)', 'var(--olive)', 'var(--dusty-blue)', 'var(--burgundy)', 'var(--metallic-beige)', 'var(--olive)'] as string[])[i],
              transition: { duration: 0.2, ease: 'backOut' },
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </ExperimentCard>
  );
}

/* ===========================
   EXPERIMENT 2: MAGNETIC
   =========================== */

function MagneticExperiment() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) * 0.18,
      y: (e.clientY - rect.top - rect.height / 2) * 0.18,
    });
  }, []);

  return (
    <ExperimentCard tag="INTERACTION" title="Magnetic objects — move cursor inside" bg="#1a1a1a">
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px' }}
        data-cursor="drag"
      >
        {[
          { size: 52, mass: 0.4, color: 'rgba(245,240,232,0.9)', shape: 'circle', factor: 1.0 },
          { size: 36, mass: 0.7, color: 'var(--burgundy)', shape: 'square', factor: 1.5 },
          { size: 24, mass: 1.0, color: 'var(--olive)', shape: 'circle', factor: 2.2 },
        ].map((obj, i) => (
          <motion.div
            key={i}
            animate={{
              x: mouse.x * obj.factor,
              y: mouse.y * obj.factor,
            }}
            transition={{ type: 'spring', damping: 18 + i * 4, stiffness: 220 - i * 30, mass: obj.mass }}
            style={{
              width: obj.size,
              height: obj.size,
              background: obj.color,
              borderRadius: obj.shape === 'circle' ? '50%' : '2px',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </ExperimentCard>
  );
}

/* ===========================
   EXPERIMENT 3: COLOUR STUDY
   =========================== */

function ColourStudyExperiment() {
  const [active, setActive] = useState(0);

  const palettes = [
    {
      name: 'PAPER',
      swatches: ['#f5f0e8', '#ede7d9', '#ddd6c7', '#b8a898', '#8a8278'],
    },
    {
      name: 'DEPTH',
      swatches: ['#1c1c1c', '#2a2a2a', '#3d3d3d', '#8a8278', '#b8a898'],
    },
    {
      name: 'ACCENT',
      swatches: ['#7a2d3a', '#5a5e45', '#4a5d6e', '#b8a898', '#ede7d9'],
    },
  ];

  return (
    <ExperimentCard tag="COLOUR" title="Colour studies — switch palette" bg="#141414">
      <div style={{ width: '100%' }}>
        {/* Palette selector */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', justifyContent: 'center' }}>
          {palettes.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              data-cursor="hover"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '7px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '5px 10px',
                background: active === i ? 'rgba(245,240,232,0.9)' : 'transparent',
                color: active === i ? '#1c1c1c' : 'rgba(245,240,232,0.4)',
                border: '1px solid rgba(245,240,232,0.12)',
                cursor: 'none',
                transition: 'background 0.25s, color 0.25s',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Swatches */}
        <div style={{ display: 'flex', height: '56px', gap: '2px' }}>
          {palettes[active].swatches.map((color, i) => (
            <motion.div
              key={`${active}-${i}`}
              style={{ flex: 1, background: color }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: i * 0.04, duration: 0.3, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Palette name */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '8px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
          textAlign: 'right',
          marginTop: '10px',
        }}>
          {palettes[active].name} PALETTE
        </p>
      </div>
    </ExperimentCard>
  );
}

/* ===========================
   EXPERIMENT 4: TYPE SCALE
   =========================== */

function TypeScaleExperiment() {
  const [scale, setScale] = useState(1.0);

  const steps = [
    { label: 'DISPLAY', base: 2.8 },
    { label: 'HEADLINE', base: 1.8 },
    { label: 'SUBHEAD', base: 1.2 },
    { label: 'BODY', base: 0.85 },
  ];

  return (
    <ExperimentCard tag="TYPOGRAPHY" title="Type scale — move cursor vertically" bg="#111111">
      <div
        style={{ width: '100%', cursor: 'none' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const y = 1 - (e.clientY - rect.top) / rect.height;
          setScale(0.65 + y * 0.75);
        }}
        onMouseLeave={() => setScale(1.0)}
        data-cursor="drag"
      >
        {steps.map(({ label, base }, i) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '6px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              paddingBottom: '5px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '7px',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.2)',
              minWidth: '56px',
              paddingTop: '4px',
            }}>
              {label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: `${base * scale * 18}px`,
                color: `rgba(245,240,232,${0.9 - i * 0.12})`,
                lineHeight: 1.1,
                transition: 'font-size 0.05s linear',
                fontWeight: 400,
              }}
            >
              Yuvraj
            </span>
          </div>
        ))}
      </div>
    </ExperimentCard>
  );
}
