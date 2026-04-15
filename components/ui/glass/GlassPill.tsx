"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GlassPillProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "ultra" | "medium" | "frosted";
  tint?: "none" | "indigo" | "cyan" | "violet" | "amber" | "emerald";
  interactive?: boolean;
}

export default function GlassPill({
  children,
  className,
  variant = "medium",
  tint = "none",
  interactive = false,
  ...props
}: GlassPillProps) {
  const variantClass = {
    ultra: "glass-ultra",
    medium: "glass-medium",
    frosted: "glass-frosted",
  }[variant];

  const tintClasses = {
    none: "",
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  }[tint];

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300",
        variantClass,
        tintClasses,
        interactive && "hover:bg-white/15 cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
