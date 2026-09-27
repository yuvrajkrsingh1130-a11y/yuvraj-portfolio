import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface DraftingCursorProps {
  enabled: boolean;
}

export const DraftingCursor: React.FC<DraftingCursorProps> = ({ enabled }) => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 35 });

  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, mouseX, mouseY, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: springX,
        top: springY,
      }}
    >
      {/* Outer Reticle Ring */}
      <div className="relative h-10 w-10 flex items-center justify-center">
        {/* Hairline Crosshairs */}
        <div className="absolute w-8 h-[1px] bg-[#103FEF]/70" />
        <div className="absolute h-8 w-[1px] bg-[#103FEF]/70" />

        {/* Outer Circular Ring with dashed border */}
        <div className="h-6 w-6 rounded-full border border-dashed border-[#103FEF] animate-spin" style={{ animationDuration: "12s" }} />

        {/* Center Point */}
        <div className="h-1.5 w-1.5 rounded-full bg-[#103FEF]" />

        {/* Coordinate HUD Tag */}
        <div className="absolute left-6 top-6 whitespace-nowrap border border-[#103FEF]/50 bg-[#F4F0E8]/95 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#103FEF] shadow-sm backdrop-blur-sm">
          X:{coords.x} Y:{coords.y}
        </div>
      </div>
    </motion.div>
  );
};
