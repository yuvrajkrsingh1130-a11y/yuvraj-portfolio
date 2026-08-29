import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionDividerProps {
  light?: boolean;
}

export default function SectionDivider({ light = false }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        padding: '0 clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          height: '1px',
          background: light ? 'rgba(245,240,232,0.1)' : 'var(--ivory-deeper)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />
    </div>
  );
}
