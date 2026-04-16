"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true structurally, updated via useEffect to prevent hydration skew

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.5 });

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
      if (
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
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
      {/* Central Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference select-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
           scale: isHovered ? 0 : 1,
           opacity: isHidden ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Trailing Ring Node */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] mix-blend-difference select-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        initial={{ backgroundColor: "rgba(255, 255, 255, 0)", border: "1px solid rgba(255,255,255,0.4)" }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          border: isHovered ? "1px solid rgba(255,255,255,0)" : "1px solid rgba(255,255,255,0.6)",
          opacity: isHidden ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
