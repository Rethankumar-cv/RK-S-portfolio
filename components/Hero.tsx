"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import GlassPill from "@/components/ui/glass/GlassPill";
import GlassButton from "@/components/ui/glass/GlassButton";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.5 
      } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-32 sm:py-0 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center w-full max-w-6xl relative z-20"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <GlassPill 
            variant="ultra"
            className="flex items-center gap-3 px-6 py-2 border border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-white/60 tracking-[0.2em]">Open to opportunities</span>
          </GlassPill>
        </motion.div>

        {/* Main Heading with Shimmer */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] font-black tracking-tighter select-none">
            <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-white/80 to-white animate-shimmer">
              RETHAN
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-indigo-300 to-white animate-shimmer [animation-delay:0.5s]">
              KUMAR
            </span>
          </h1>
        </motion.div>

        {/* Subtitle Pill with Prismatic Border */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-[2px] opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative glass-medium px-8 py-3 rounded-full flex items-center gap-4 border-l-[3px] border-l-indigo-500">
               <p className="text-[clamp(1rem,2vw,1.5rem)] font-medium tracking-tight text-neutral-300">
                  UI/UX Designer <span className="text-white/20 mx-2">·</span> Front-End Engineer
               </p>
            </div>
          </div>
        </motion.div>

        {/* Max-width subtext */}
        <motion.div variants={itemVariants} className="max-w-2xl mb-12">
          <p className="text-lg text-neutral-500 font-light leading-relaxed">
            I craft high-fidelity, high-performance digital experiences that feel like the future. 
            Blending technical rigor with liquid aesthetics.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
        >
          <GlassButton 
            variant="frosted" 
            tint="indigo" 
            className="w-full sm:w-auto"
            onClick={() => handleScrollTo("projects")}
          >
            Explore Projects
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7M3 12h18" />
            </svg>
          </GlassButton>
          
          <GlassButton 
            variant="ultra" 
            className="w-full sm:w-auto border-white/10"
            onClick={() => handleScrollTo("contact")}
          >
            Start a Conversation
          </GlassButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with glass backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 cursor-pointer group"
        onClick={() => handleScrollTo("about")}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-600 group-hover:text-indigo-400 transition-colors">Scroll</span>
        <div className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30 transition-all">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
