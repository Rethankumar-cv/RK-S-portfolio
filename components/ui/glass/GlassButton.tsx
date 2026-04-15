"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "ultra" | "medium" | "frosted";
  tint?: "none" | "indigo" | "cyan" | "violet" | "amber";
}

export default function GlassButton({
  children,
  className,
  variant = "medium",
  tint = "none",
  ...props
}: GlassButtonProps) {
  const variantClass = {
    ultra: "glass-ultra",
    medium: "glass-medium",
    frosted: "glass-frosted",
  }[variant];

  const tintClasses = {
    none: "",
    indigo: "bg-indigo-500/15 text-indigo-100 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]",
    cyan: "bg-cyan-500/15 text-cyan-100 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    violet: "bg-violet-500/15 text-violet-100 border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]",
    amber: "bg-amber-500/15 text-amber-100 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
  }[tint];

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 font-semibold text-sm tracking-wide",
        variantClass,
        tintClasses,
        className
      )}
      {...props}
    >
      {/* Target for specular sweep pseudos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
           initial={{ x: "-150%" }}
           whileHover={{ x: "150%" }}
           transition={{ duration: 0.6, ease: "easeInOut" }}
           className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
        />
      </div>

      {/* Rim lighting effect */}
      <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-white/30 transition-colors" />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
