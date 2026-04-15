"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextArea?: boolean;
  error?: string;
}

export default function GlassInput({
  label,
  className,
  isTextArea = false,
  error,
  ...props
}: GlassInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const value = props.value as string;
  const isFloating = isFocused || (value && value.length > 0);

  const Component = isTextArea ? "textarea" : "input";

  return (
    <div className="relative w-full group">
      <motion.div
        animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative glass-ultra rounded-[12px] border transition-all duration-300",
          isFocused ? "border-indigo-500/60 shadow-[0_0_0_3px_rgba(99,102,241,0.2)]" : "border-white/10 group-hover:border-white/20",
          error && "border-rose-500/50"
        )}
      >
        <Component
          {...(props as any)}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "block w-full px-4 pt-6 pb-2 bg-transparent border-none text-sm text-white focus:ring-0 focus:outline-none placeholder-transparent",
            isTextArea && "resize-none min-h-[100px]",
            className
          )}
        />
        
        {/* Floating Label */}
        <label
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none uppercase text-[10px] font-bold tracking-widest",
            isFloating 
              ? "top-2 text-indigo-400 opacity-100" 
              : "top-5 text-neutral-500 opacity-60"
          )}
        >
          {label}
        </label>
      </motion.div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1 -bottom-5 text-[10px] text-rose-500 font-bold uppercase tracking-wider"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
