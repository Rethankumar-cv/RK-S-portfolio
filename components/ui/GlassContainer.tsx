"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";
import { ReactNode } from "react";

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "max-w-4xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl" | "none";
  hoverEffect?: boolean;
}

export default function GlassContainer({
  children,
  className,
  maxWidth = "max-w-5xl",
  hoverEffect = false,
}: GlassContainerProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      whileHover={hoverEffect && !isMobile ? { y: -4 } : undefined}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "relative mx-auto w-full overflow-hidden",
        maxWidth !== "none" && maxWidth,
        "rounded-[24px]",
        "bg-black/[0.04] backdrop-blur-xl",
        "border border-white/[0.08]",
        "shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]",
        "transition-all duration-500",
        isMobile && "bg-white/[0.05] backdrop-blur-xl px-4",
        hoverEffect && "hover:border-white/[0.15] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* Dark Tint Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-black/10 rounded-inherit"
        aria-hidden="true"
      />
      {/* Noise texture for subtle grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-screen" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }} />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
