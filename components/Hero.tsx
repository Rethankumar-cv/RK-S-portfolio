"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

export default function Hero() {
  const isMobile = useIsMobile();

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center w-full min-h-[85vh] px-4">
      {/* Floating Animation Wrapper (Disabled on mobile to stop infinite repaints) */}
      <motion.div 
        animate={!isMobile ? { y: [0, -10, 0] } : { y: 0 }} 
        transition={!isMobile ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="flex flex-col items-center justify-center w-full relative z-10"
      >
        <motion.div
           initial="hidden"
           animate="visible"
           transition={{ staggerChildren: isMobile ? 0.1 : 0.2 }}
           className="flex flex-col items-center text-center space-y-6 sm:space-y-8 w-full max-w-5xl"
        >
          {/* Status Badge */}
          <motion.div variants={fadeUpVariants} className="flex items-center justify-center gap-3 glass px-4 sm:px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] shadow-[0_0_15px_rgba(255,255,255,0.02)]">
            <span className="relative flex h-2.5 w-2.5">
              {!isMobile && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>}
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-wider text-neutral-300 uppercase">
              Available for Opportunities
            </span>
          </motion.div>
          
          {/* Main Typography using structural clamp() scaling */}
          <motion.div variants={fadeUpVariants} className="space-y-2 sm:space-y-4 w-full">
            <h1 className="text-[clamp(2.5rem,8vw,8rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/10 pb-2 sm:pb-4">
              RETHAN KUMAR
            </h1>
            <p className="text-[clamp(1.5rem,4vw,3.5rem)] leading-tight font-medium text-neutral-300 tracking-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Digital</span> Experiences.
            </p>
          </motion.div>

          {/* Subtext */}
          <motion.div variants={fadeUpVariants} className="max-w-2xl px-2 mt-4 sm:mt-2">
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-neutral-400/80 leading-relaxed font-light">
              A visionary front-end engineer building premium, futuristic web applications. 
              Fusing modern design systems with liquid motion to engineer the next generation of the web.
            </p>
          </motion.div>

          {/* Call to Actions (100% width stacking natively on mobiles) */}
          <motion.div variants={fadeUpVariants} className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-none">
            
            {/* View Work CTA (Primary Liquid Glass) */}
            <motion.button 
              whileHover={!isMobile ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.95 }}
              className="relative group flex items-center justify-center px-8 py-4 w-full sm:w-auto overflow-hidden active:scale-95 transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition duration-500"></div>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-full border border-white/20 group-hover:border-white/50 transition-all duration-300"></div>
              
              <span className="relative text-white font-medium tracking-wide z-10 flex items-center gap-2">
                View Work 
                <svg className={cn("w-5 h-5 transition-transform duration-300", !isMobile && "group-hover:translate-x-1 group-hover:-translate-y-1")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </motion.button>

            {/* Download Resume CTA (Secondary Dark Glass) */}
            <motion.button 
              whileHover={!isMobile ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.95 }}
              className="relative group flex items-center justify-center px-8 py-4 w-full sm:w-auto active:scale-95 transition-transform"
            >
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10 group-hover:bg-white/[0.08] transition-all duration-300"></div>
              <span className="relative text-neutral-300 group-hover:text-white transition-colors duration-300 font-medium tracking-wide z-10 flex items-center gap-2">
                Download Resume
                <svg className="w-5 h-5 opacity-70 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
