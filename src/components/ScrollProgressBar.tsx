import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top Hairline Track */}
      <div className="h-[3px] w-full bg-[#103FEF]/15 relative">
        <motion.div
          className="h-full bg-[#103FEF] origin-left shadow-[0_0_8px_rgba(16,63,239,0.6)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Micro Coordinate Tag when scrolling */}
      {percent > 2 && (
        <div className="absolute right-4 top-2 hidden sm:flex items-center gap-1.5 border border-[#103FEF]/40 bg-[#F4F0E8]/95 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#103FEF] shadow-sm backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#103FEF] animate-pulse" />
          <span>SCROLL: {percent}%</span>
        </div>
      )}
    </div>
  );
};
