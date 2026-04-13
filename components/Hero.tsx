"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

export default function Hero() {
  const isMobile = useIsMobile();

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 16 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: isMobile ? 0.08 : 0.15 } },
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center w-full min-h-[88vh] px-4">
      {/* Subtle radial glow behind text — desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-indigo-500/8 blur-[120px] rounded-full" />
        </div>
      )}

      {/* Floating wrapper — desktop only */}
      <motion.div
        animate={!isMobile ? { y: [0, -8, 0] } : { y: 0 }}
        transition={
          !isMobile
            ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        className="flex flex-col items-center justify-center w-full relative z-10"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center w-full max-w-5xl gap-5 sm:gap-6"
        >
          {/* Availability badge */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              {!isMobile && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] text-neutral-400 uppercase">
              Open to opportunities
            </span>
          </motion.div>

          {/* Name + Role */}
          <motion.div variants={fadeUpVariants} className="space-y-2 sm:space-y-3 w-full">
            <h1 className="text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.92] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/20">
              RETHAN KUMAR
            </h1>
            <p className="text-[clamp(1.1rem,3vw,2.2rem)] leading-tight font-medium tracking-tight">
              <span className="text-neutral-300">UI/UX Designer</span>
              <span className="text-white/20 mx-3">·</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Front-End Engineer
              </span>
            </p>
          </motion.div>

          {/* Subtext — specific, no buzzwords */}
          <motion.div variants={fadeUpVariants} className="max-w-xl px-2">
            <p className="text-[clamp(0.95rem,1.8vw,1.15rem)] text-neutral-500 leading-relaxed font-light">
              I design and build fast, polished interfaces — from pixel-perfect
              UI systems to production-ready React apps.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none pt-2"
          >
            {/* Primary */}
            <motion.button
              whileHover={!isMobile ? { scale: 1.04 } : undefined}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleScrollTo("projects")}
              className="relative group flex items-center justify-center gap-2 px-7 py-3.5 w-full sm:w-auto rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              <span className="relative z-10 text-white font-semibold text-sm tracking-wide">
                View My Work
              </span>
              <svg
                className={cn(
                  "relative z-10 w-4 h-4 text-white transition-transform duration-300",
                  !isMobile && "group-hover:translate-x-0.5"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7-7 7M3 12h18"
                />
              </svg>
            </motion.button>

            {/* Secondary */}
            <motion.button
              whileHover={!isMobile ? { scale: 1.04 } : undefined}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleScrollTo("contact")}
              className="relative group flex items-center justify-center gap-2 px-7 py-3.5 w-full sm:w-auto rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <span className="text-neutral-300 group-hover:text-white transition-colors duration-300 font-medium text-sm tracking-wide">
                Get In Touch
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — desktop only, fades in after delay */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
