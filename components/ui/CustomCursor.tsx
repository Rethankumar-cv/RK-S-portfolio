"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // 0.1s spring delay roughly equates to these stiffness/damping values
  const springX = useSpring(cursorX, { stiffness: 300, damping: 24, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    } else {
      setIsTouchDevice(false);
    }

    const moveCursor = (e: MouseEvent) => {
      setIsHidden(false);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeaveViewport = () => setIsHidden(true);
    const handleMouseEnterViewport = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeaveViewport);
    document.body.addEventListener("mouseenter", handleMouseEnterViewport);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Focus on interactive elements (links, buttons, inputs)
      if (
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.tagName.toLowerCase() === "input" || 
        target.tagName.toLowerCase() === "textarea" || 
        target.closest("a") || 
        target.closest("button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeaveViewport);
      document.body.removeEventListener("mouseenter", handleMouseEnterViewport);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Central Glass Dot (12px) */}
      <motion.div
        className="fixed top-0 left-0 w-[12px] h-[12px] rounded-full pointer-events-none z-[9999] select-none shadow-sm backdrop-blur-md border border-white/20 bg-white/20"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
           opacity: isHidden ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Trailing Glass Ring Node (40px -> 60px on hover) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] select-none backdrop-blur-[2px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        initial={{ 
          width: 40, 
          height: 40,
          backgroundColor: "rgba(255, 255, 255, 0)", 
          border: "1px solid rgba(255,255,255,0.2)" 
        }}
        animate={{
          width: isHovered ? 60 : 40,
          height: isHovered ? 60 : 40,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0)",
          border: isHovered ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.3)",
          opacity: isHidden ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </>
  );
}
