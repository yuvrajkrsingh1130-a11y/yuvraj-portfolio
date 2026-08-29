import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

interface WorkSectionProps {
  onProjectOpen: (id: string) => void;
}

export default function WorkSection({ onProjectOpen }: WorkSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="work"
      ref={ref}
      aria-label="Selected works"
      style={{
        background: 'var(--ivory)',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <div style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(40px, 5vw, 60px)',
        borderBottom: '1px solid var(--ivory-deeper)',
      }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{ height: '1px', width: '32px', background: 'var(--charcoal)' }} />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--warm-gray)',
          }}>
            CHAPTER 01
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <motion.h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(44px, 7.5vw, 104px)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.9 }}
          >
            SELECTED<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--warm-gray)' }}>WORKS</em>
          </motion.h2>

          <motion.p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 300,
              color: 'var(--warm-gray)',
              maxWidth: '260px',
              lineHeight: 1.7,
              alignSelf: 'flex-end',
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            A curated selection of client work,<br />
            concepts, and experiments.
          </motion.p>
        </div>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onOpen={() => onProjectOpen(project.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index, onOpen }: {
  project: typeof projects[0];
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const isClickable = project.featured;

  return (
    <motion.article
      ref={ref}
      className="project-row"
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `Open case study: ${project.title}` : undefined}
      style={{
        padding: 'clamp(24px, 4vw, 48px) clamp(24px, 6vw, 80px)',
        cursor: isClickable ? 'none' : 'default',
        display: 'block',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.75, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={isClickable ? onOpen : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onOpen() : undefined}
      data-cursor={isClickable ? 'view' : 'explore'}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(32px, 3vw, 56px) 1fr auto',
        gap: 'clamp(16px, 3vw, 32px)',
        alignItems: 'center',
      }}>
        {/* Number */}
        <motion.span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: hovered ? 'var(--burgundy)' : 'var(--ivory-deeper)',
            fontWeight: 400,
            transition: 'color 0.35s',
            alignSelf: 'flex-start',
            paddingTop: '8px',
          }}
          aria-hidden="true"
        >
          {project.number}
        </motion.span>

        {/* Content */}
        <div>
          {/* Tags */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--warm-gray)',
                }}
              >
                {tag}
              </span>
            ))}
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '8px',
              letterSpacing: '0.12em',
              color: 'var(--warm-gray-light)',
            }}>
              / {project.year}
            </span>
          </div>

          {/* Title */}
          <motion.h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.8vw, 64px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: 'var(--charcoal)',
              lineHeight: 1,
              marginBottom: '14px',
            }}
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 300,
              color: 'var(--warm-gray)',
              maxWidth: '440px',
              lineHeight: 1.65,
            }}
            animate={{ opacity: hovered ? 1 : 0.65 }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Type badge */}
          {project.type !== 'client' && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '8px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: project.type === 'concept' ? 'var(--olive)' : 'var(--dusty-blue)',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
              {project.type === 'concept' ? 'CONCEPT PROJECT' : 'SELF-INITIATED'}
            </p>
          )}
        </div>

        {/* Right — project thumbnail + arrow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
        }}>
          {/* Thumbnail */}
          <motion.div
            style={{
              width: 'clamp(72px, 11vw, 148px)',
              aspectRatio: '4/3',
              overflow: 'hidden',
              flexShrink: 0,
            }}
            animate={{
              opacity: hovered ? 1 : 0.55,
              scale: hovered ? 1 : 0.97,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ProjectThumbnail id={project.id} hovered={hovered} bgColor={project.bgColor} accentColor={project.accentColor} />
          </motion.div>

          {/* Arrow — only for clickable projects */}
          {isClickable && (
            <motion.span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: hovered ? 'var(--charcoal)' : 'var(--warm-gray-light)',
                transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.25 }}
            >
              CASE STUDY →
            </motion.span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectThumbnail({ id, hovered, bgColor, accentColor }: {
  id: string;
  hovered: boolean;
  bgColor: string;
  accentColor: string;
}) {
  switch (id) {
    case 'barber-house':
      return <BarberThumb hovered={hovered} accent={accentColor} />;
    case 'casa-restaurant':
      return <CasaThumb hovered={hovered} accent={accentColor} />;
    case 'northline':
      return <NorthlineThumb hovered={hovered} accent={accentColor} />;
    case 'experiment-004':
      return <ExperimentThumb hovered={hovered} />;
    default:
      return <div style={{ width: '100%', height: '100%', background: bgColor }} />;
  }
}

function BarberThumb({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', background: accent, opacity: 0.8 }} />
      <motion.div style={{ textAlign: 'center' }} animate={{ y: hovered ? -3 : 0 }} transition={{ duration: 0.35 }}>
        <div style={{ width: '28px', height: '1px', background: accent, margin: '0 auto 6px' }} />
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: 'rgba(245,240,232,0.9)', letterSpacing: '0.12em' }}>BARBER</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '6px', letterSpacing: '0.3em', color: 'rgba(184,168,152,0.7)', textTransform: 'uppercase', marginTop: '2px' }}>HOUSE</p>
        <div style={{ width: '28px', height: '1px', background: accent, margin: '6px auto 0' }} />
      </motion.div>
    </div>
  );
}

function CasaThumb({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#2a2420', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        style={{ width: '36px', height: '36px', border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
        animate={{ rotate: hovered ? 8 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'rgba(245,240,232,0.8)', fontStyle: 'italic' }}>C</p>
      </motion.div>
    </div>
  );
}

function NorthlineThumb({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1e2429', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 12px', gap: '5px' }}>
      {[65, 80, 50].map((w, i) => (
        <motion.div
          key={i}
          style={{ height: '1px', background: accent, opacity: 0.6 }}
          animate={{ width: hovered ? `${w + 15}%` : `${w}%` }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        />
      ))}
    </div>
  );
}

function ExperimentThumb({ hovered }: { hovered: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#131313', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <motion.p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '44px',
          fontWeight: 400,
          color: 'rgba(184,168,152,0.55)',
          fontStyle: 'italic',
          lineHeight: 1,
        }}
        animate={{ rotate: hovered ? -10 : 0, scale: hovered ? 1.12 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Aa
      </motion.p>
    </div>
  );
}
