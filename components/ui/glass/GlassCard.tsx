import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "ultra" | "medium" | "frosted";
  interactive?: boolean;
}

export default function GlassCard({
  children,
  className,
  variant = "medium",
  interactive = false,
  ...props
}: GlassCardProps) {
  const variantClass = {
    ultra: "glass-ultra",
    medium: "glass-medium",
    frosted: "glass-frosted",
  }[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300",
        variantClass,
        interactive && "hover:bg-white/[0.09] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] refraction-hover",
        className
      )}
      {...props}
    >
      {/* Specular Inner Glow Fix */}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
