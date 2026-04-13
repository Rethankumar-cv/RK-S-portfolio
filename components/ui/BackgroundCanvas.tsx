"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile, useIsTablet } from "@/lib/hooks";

export default function BackgroundCanvas() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // hard cut listener overhead on mobiles entirely to rescue UI thread
    if (window.matchMedia("(pointer: coarse), (max-width: 640px)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Soft Parallax constraints - locked out aggressively on mobiles to prevent paint thrashing
  const moveX = (!isMobile && windowSize.width > 0) ? (mousePosition.x - windowSize.width / 2) / 30 : 0;
  const moveY = (!isMobile && windowSize.height > 0) ? (mousePosition.y - windowSize.height / 2) / 30 : 0;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030303] pointer-events-none">
      
      {/* 1. Center Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] h-[90vw] md:h-[70vw] max-w-[900px] max-h-[900px] bg-indigo-600/10 md:bg-indigo-600/15 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

      {/* 2. Parallax Motion Container (Shapes array based on device) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ x: moveX, y: moveY }}
        transition={{ type: "spring", damping: 40, stiffness: 40, mass: 1 }}
      >
        {/* Shape 1: Cyan & Indigo (Present on all devices, but statically clamped on mobile) */}
        {!isMobile ? (
          <motion.div
             className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-cyan-500/20 to-indigo-500/30 rounded-[40%] mix-blend-screen blur-[60px]"
             animate={{
               x: [0, 80, 0, -80, 0],
               y: [0, -60, 80, -60, 0],
               rotate: [0, 180, 360],
               scale: [1, 1.1, 1, 0.9, 1],
             }}
             transition={{ duration: isTablet ? 40 : 25, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <div className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] bg-gradient-to-tr from-cyan-500/10 to-indigo-500/20 rounded-[40%] mix-blend-screen blur-[80px]" />
        )}

        {/* Shape 2: Violet & Fuchsia (Excluded on Mobile entirely to save battery) */}
        {!isMobile && (
          <motion.div
             className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-tr from-violet-600/20 to-fuchsia-500/20 rounded-[45%] mix-blend-screen blur-[60px]"
             animate={{
               x: [0, -60, 0, 60, 0],
               y: [0, 80, -60, 80, 0],
               rotate: [360, 180, 0],
               scale: [1, 0.85, 1.15, 0.85, 1],
             }}
             transition={{ duration: isTablet ? 50 : 30, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Shape 3: Deep Blue (Desktop strictly) */}
        {!isMobile && !isTablet && (
          <motion.div
             className="absolute bottom-[10%] left-[30%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-gradient-to-tr from-blue-600/15 to-indigo-700/25 rounded-[35%] mix-blend-screen blur-[80px]"
             animate={{
               x: [0, 100, -100, 50, 0],
               y: [0, 50, -50, 50, 0],
               rotate: [0, 120, 240, 360],
               scale: [0.9, 1.1, 0.9, 1.1, 0.9],
             }}
             transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* 3. Liquid Glassmorphism Layer */}
      <div className="absolute inset-0 z-1 backdrop-blur-[60px] md:backdrop-blur-[80px] bg-[#030303]/30 pointer-events-none"></div>

      {/* 4. Subtle Noise/Grain Overlay */}
      <div 
        className="absolute inset-0 z-2 opacity-[0.035] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
}
