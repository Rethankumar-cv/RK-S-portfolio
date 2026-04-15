"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/ui/glass/GlassCard";
import GlassPill from "@/components/ui/glass/GlassPill";

// ─── Count-up hook logic ───────────────────────────────────────────────────────
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 12, suffix: "+", label: "Projects completed", color: "border-l-indigo-500", tint: "indigo" as const },
  { value: 2, suffix: "", label: "Hackathons won", color: "border-l-fuchsia-500", tint: "violet" as const },
  { value: 1, suffix: "", label: "Engineering internship", color: "border-l-cyan-500", tint: "cyan" as const },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <div className="text-center mb-16 px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
            <p className="text-xs font-bold tracking-[0.3em] text-indigo-400 uppercase mb-4">Philosophy</p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">at the edge.</span>
            </h2>
         </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 w-full max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* ── Left: Large Glass Card ── */}
        <motion.div variants={itemVariants}>
          <GlassCard variant="medium" className="p-8 sm:p-12 relative min-h-[400px] flex flex-col justify-center">
            {/* Specular highlights for top edge handled by Card primitive */}
            
            <div className="relative z-10 space-y-8">
               <div className="flex items-center gap-6">
                  {/* Floating Profile Icon Panel */}
                  <div className="w-20 h-20 rounded-2xl glass-frosted border border-white/20 flex items-center justify-center relative overflow-hidden group shrink-0">
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 opacity-40" />
                     <span className="text-2xl font-black text-white relative z-10">RK</span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Rethan Kumar</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Available for hire</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-6 text-lg leading-relaxed text-neutral-400 font-light max-w-2xl">
                  <p>
                    I am a <span className="text-white font-medium">UI/UX Designer & Front-End Engineer</span> specialized in building high-fidelity interfaces. I treat motion as a first-class citizen and accessibility as a non-negotiable standard.
                  </p>
                  <p>
                    My workflow focuses on <span className="italic">Spatial Software</span> — interfaces that feel tactile, responsive, and truly liquid. I don&apos;t just code; I orchestrate digital experiences.
                  </p>
               </div>

               <div className="pt-4">
                  <GlassPill variant="ultra" tint="indigo" interactive className="cursor-pointer">
                     Read full bio
                  </GlassPill>
               </div>
            </div>

            {/* Subtle background decoration inside card */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
          </GlassCard>
        </motion.div>

        {/* ── Right: Stat Blocks Column ── */}
        <div className="flex flex-col gap-6 h-full justify-between">
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlassCard 
                variant="medium" 
                className={cn("p-8 h-full flex flex-col justify-center border-l-4", stat.color)}
                interactive
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
                     <CountUp end={stat.value} />{stat.suffix}
                  </p>
                </div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] leading-tight">
                  {stat.label}
                </p>
                
                {/* Micro-sparkle decoration */}
                <div className="absolute top-4 right-4 opacity-10">
                   <div className={cn("w-1 h-1 rounded-full", stat.tint === "indigo" ? "bg-indigo-400" : "bg-cyan-400")} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
