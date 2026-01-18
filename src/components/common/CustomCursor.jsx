import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';

const CustomCursor = () => {
  const { cursorVariant } = useCursor();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const springBlurX = useSpring(cursorX, { damping: 35, stiffness: 200 });
  const springBlurY = useSpring(cursorY, { damping: 35, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  const mainVariants = {
    default: { scale: 1, x: -6, y: -6, backgroundColor: "#ffffff" }, // Removed mix-blend-mode
    pointer: { scale: 1.5, x: -6, y: -6, backgroundColor: "#a855f7" }
  };

  const blurVariants = {
    default: { scale: 1, x: -20, y: -20, backgroundColor: "rgba(168, 85, 247, 0.3)" },
    pointer: { scale: 0 }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: springX,
          translateY: springY,
          backgroundColor: "#ffffff"
        }}
        variants={mainVariants}
        animate={cursorVariant}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] blur-xl"
        style={{
          translateX: springBlurX,
          translateY: springBlurY,
          backgroundColor: "rgba(168, 85, 247, 0.3)"
        }}
        variants={blurVariants}
        animate={cursorVariant}
      />
    </>
  );
};

export default CustomCursor;
