import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useMotionValue(-100);
  const ry = useMotionValue(-100);

  const dotX = useSpring(mx, { damping: 25, stiffness: 350, mass: 0.3 });
  const dotY = useSpring(my, { damping: 25, stiffness: 350, mass: 0.3 });
  const ringX = useSpring(rx, { damping: 30, stiffness: 200, mass: 0.6 });
  const ringY = useSpring(ry, { damping: 30, stiffness: 200, mass: 0.6 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const touch = window.matchMedia('(hover: none)').matches;
    setIsTouch(touch);
    if (touch) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      rx.set(e.clientX);
      ry.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const closest = el.closest('[data-cursor]');
      if (closest) {
        setLabel(closest.getAttribute('data-cursor') || '');
      } else if (el.closest('a, button, [role="button"], input, textarea, select')) {
        setLabel('hover');
      } else {
        setLabel('');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (isTouch) return null;

  const labelMap: Record<string, string> = {
    open: 'OPEN',
    view: 'VIEW',
    drag: 'DRAG',
    explore: 'EXPLORE',
    read: 'READ',
    hover: '',
  };

  const displayLabel = labelMap[label] ?? '';
  const isExpanded = !!displayLabel;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? (isExpanded ? 0 : 1) : 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <motion.div
        className={`custom-cursor-ring${isExpanded ? ' is-expanded' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      >
        {displayLabel && (
          <span className="cursor-label-text">{displayLabel}</span>
        )}
      </motion.div>
    </>
  );
}
