"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
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
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 } 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

export default function Experience() {
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
            <p className="text-xs font-bold tracking-[0.3em] text-indigo-400 uppercase mb-4">Milestones</p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-tight">
              Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Trajectory.</span>
            </h2>
         </motion.div>
      </div>

      <motion.div 
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* ── Internship Card (Full width on small, half on large) ── */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
           <GlassCard variant="medium" className="p-8 sm:p-12 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                 <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                       <GlassPill variant="ultra" tint="indigo">Professional</GlassPill>
                       <span className="text-xs font-bold text-neutral-600 tracking-widest uppercase">2025 – Present</span>
                    </div>
                    
                    <div>
                       <h3 className="text-3xl font-black text-white tracking-tight mb-2">Front-End Engineering Intern</h3>
                       <p className="text-indigo-400 font-bold uppercase tracking-wider text-xs">@ Acme Vanguard Tech</p>
                    </div>

                    <p className="text-lg text-neutral-400 font-light leading-relaxed max-w-2xl">
                       Engineering core dashboard features and shipping modular component systems. 
                       Optimizing for high-performance state synchronization and tactile interactions.
                    </p>

                    <div className="flex flex-wrap gap-8 pt-4">
                       <div>
                          <p className="text-2xl font-black text-white tracking-tighter"><CountUp end={60} />%</p>
                          <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-[0.2em] mt-1">CLS improvement</p>
                       </div>
                       <div>
                          <p className="text-2xl font-black text-white tracking-tighter"><CountUp end={3} /></p>
                          <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-[0.2em] mt-1">Internal adoption</p>
                       </div>
                    </div>
                 </div>

                 <div className="hidden md:flex w-32 h-32 rounded-3xl glass-ultra border border-white/10 items-center justify-center shrink-0">
                    <svg className="w-12 h-12 text-indigo-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                 </div>
              </div>

              {/* Background animate mesh */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none group-hover:from-indigo-500/10 transition-all duration-700" />
           </GlassCard>
        </motion.div>

        {/* ── Hackathon Badges (Trophies) ── */}
        <motion.div variants={itemVariants}>
           <GlassCard 
             variant="medium" 
             className="p-8 h-full bg-amber-400/[0.03] border-amber-400/10 group hover:border-amber-400/30 transition-all"
             interactive
           >
              <div className="flex flex-col gap-6 h-full">
                 <div className="flex items-center justify-between">
                    <GlassPill variant="frosted" tint="amber">1st Place</GlassPill>
                    <span className="text-3xl drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">🏆</span>
                 </div>
                 
                 <div>
                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-amber-200 transition-colors">Web3 Global Build</h4>
                    <p className="text-[10px] text-neutral-600 uppercase font-black tracking-[0.2em] mb-4">Dec 2024 · 400+ Teams</p>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                       Architected a decentralized liquidity engine with liquid-glass order books. Highest interface score awarded by the judges.
                    </p>
                 </div>
              </div>
           </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
           <GlassCard 
             variant="medium" 
             className="p-8 h-full bg-neutral-400/[0.03] border-neutral-400/10 group hover:border-neutral-400/30 transition-all"
             interactive
           >
              <div className="flex flex-col gap-6 h-full">
                 <div className="flex items-center justify-between">
                    <GlassPill variant="frosted" className="bg-white/5 border-white/10 text-neutral-400">Finalist</GlassPill>
                    <span className="text-3xl opacity-40 group-hover:opacity-80 transition-opacity">🥈</span>
                 </div>
                 
                 <div>
                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-neutral-200 transition-colors">AI Design Jam</h4>
                    <p className="text-[10px] text-neutral-600 uppercase font-black tracking-[0.2em] mb-4">Sep 2024 · Vercel Hosted</p>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                       Built an LLM-driven spatial wireframing tool. Pioneered a prompt-to-glass interface concept that later influenced our core dashboard.
                    </p>
                 </div>
              </div>
           </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
