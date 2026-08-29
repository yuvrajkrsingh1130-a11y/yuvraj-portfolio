import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/projects';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About Yuvraj"
      style={{
        background: 'var(--ivory)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top rule */}
      <motion.div
        style={{
          height: '1px',
          background: 'var(--ivory-deeper)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />

      {/* Main content */}
      <div style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
      }}>
        {/* Section label */}
        <motion.div
          style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: '1px', width: '32px', background: 'var(--charcoal)' }} />
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--warm-gray)',
            }}>
              CHAPTER 02 — ABOUT
            </p>
          </div>
        </motion.div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(48px, 8vw, 100px)',
          alignItems: 'start',
        }}>
          {/* Left — Statement + Bio */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: 'var(--charcoal)',
                marginBottom: '40px',
              }}
            >
              DESIGNER.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--warm-gray)' }}>VISUAL</em><br />
              THINKER.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--warm-gray)' }}>BUILDER.</em>
            </h2>

            <div style={{ maxWidth: '400px' }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'var(--charcoal)',
                marginBottom: '20px',
              }}>
                Yuvraj is a graphic and UI/UX designer who blends visual design, interaction, and modern web technologies to create digital experiences that feel deliberate, expressive, and easy to use.
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'var(--warm-gray)',
              }}>
                The work spans brand identity, digital interfaces, and experimental creative projects — all connected by the same commitment to craft.
              </p>
            </div>
          </motion.div>

          {/* Right — Skills */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.9 }}
          >
            {skills.map((group, gi) => (
              <div key={group.category} style={{ marginBottom: '48px' }}>
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
                  {group.category}
                </p>

                {group.items.map((item, i) => (
                  <motion.div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--ivory-deeper)',
                    }}
                    initial={{ opacity: 0, x: 14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + gi * 0.15 + i * 0.07, duration: 0.5 }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      letterSpacing: '0.1em',
                      color: 'var(--warm-gray-light)',
                      width: '22px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 300,
                      color: 'var(--charcoal)',
                    }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Large decorative background letter */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-4%',
            bottom: '-10%',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(180px, 28vw, 380px)',
            fontWeight: 400,
            color: 'var(--ivory-dark)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          02
        </div>
      </div>

      {/* Philosophy statement — own panel */}
      <PhilosophyBlock inView={inView} />
    </section>
  );
}

function PhilosophyBlock({ inView }: { inView: boolean }) {
  return (
    <motion.div
      style={{
        padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        background: 'var(--charcoal)',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.8, duration: 1.0 }}
    >
      {/* Large background quote mark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '5%',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(200px, 30vw, 420px)',
          color: 'rgba(255,255,255,0.025)',
          lineHeight: 1,
          fontWeight: 400,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        "
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
        <motion.p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(184,168,152,0.45)',
            marginBottom: '40px',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          DESIGN PHILOSOPHY
        </motion.p>

        <motion.h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(38px, 6vw, 84px)',
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: '-0.01em',
            color: 'rgba(245,240,232,0.88)',
            marginBottom: '40px',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.9 }}
        >
          GOOD DESIGN<br />
          SHOULD NOT<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(184,168,152,0.6)' }}>NEED TO SHOUT.</em>
        </motion.h3>

        <motion.p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'rgba(245,240,232,0.4)',
            maxWidth: '500px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          The best design doesn't announce itself — it earns attention through clarity, personality, and a precise understanding of what it's trying to do. Function and feeling are not opposites. They're the same thing.
        </motion.p>
      </div>
    </motion.div>
  );
}
