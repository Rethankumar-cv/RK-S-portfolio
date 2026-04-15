"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";
import GlassCard from "@/components/ui/glass/GlassCard";
import GlassPill from "@/components/ui/glass/GlassPill";

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    title: "Aether AI Platform",
    problem: "ML dashboards overwhelm users with raw, unstructured data.",
    solution: "Built real-time neural network visualizations with adaptive logic.",
    impact: "40% faster decision cycles in internal user testing.",
    tech: ["Next.js", "WebGL", "TypeScript"],
    meshGradient: "from-indigo-500/30 via-teal-500/20 to-transparent",
    href: "https://github.com/Rethankumar-cv",
    github: "https://github.com/Rethankumar-cv",
  },
  {
    title: "Nimbus Cloud Console",
    problem: "Multi-cloud cost analysis required switching between 4 tools.",
    solution: "Unified infrastructure monitoring dashboard with live diff views.",
    impact: "Reduced context-switching time by 60% for DevOps teams.",
    tech: ["React", "Go", "Framer Motion"],
    meshGradient: "from-blue-500/30 via-cyan-500/20 to-transparent",
    href: "https://github.com/Rethankumar-cv",
    github: "https://github.com/Rethankumar-cv",
  },
  {
    title: "Luma DeFi Exchange",
    problem: "DEX interfaces had steep learning curves and lagged on mobile.",
    solution: "Glassmorphic order book UI with sub-100ms re-renders.",
    impact: "1st place — Web3 Global Hackathon, beating 400+ teams.",
    tech: ["Web3.js", "Solidity", "TypeScript"],
    meshGradient: "from-violet-500/30 via-amber-500/20 to-transparent",
    href: "https://github.com/Rethankumar-cv",
    github: "https://github.com/Rethankumar-cv",
  },
];

const MORE_PROJECTS = [
  {
    title: "Nova Design System",
    description: "Open-source component library — brutalist meets micro-interactions.",
    tech: ["Vue", "CSS Modules", "Storybook"],
    href: "#",
  },
  {
    title: "Vanguard OS",
    description: "Web-based OS UI experiment with complex state and floating windows.",
    tech: ["React", "Zustand", "Framer Motion"],
    href: "#",
  },
  {
    title: "Hyperion Analytics",
    description: "Enterprise dashboard converting chaotic datasets into visual maps.",
    tech: ["Next.js", "D3.js", "Tailwind"],
    href: "#",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Featured Project Card ────────────────────────────────────────────────────

function ProjectCard({ project, isMobile }: { project: typeof FEATURED_PROJECTS[0]; isMobile: boolean }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <GlassCard 
        variant="medium" 
        className="h-full flex flex-col group p-0 border-white/5 bg-white/[0.03]" 
        interactive
      >
        {/* Header Zone: Frosted Mesh Gradient (200px) */}
        <div className="h-[200px] w-full relative overflow-hidden flex items-end p-8 border-b border-white/5">
           <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110", project.meshGradient)} />
           <div className="absolute inset-0 glass-frosted opacity-40" />
           
           <div className="relative z-10 w-full flex justify-between items-end">
              <div>
                <GlassPill variant="ultra" className="mb-3 border-white/10 opacity-60">Featured</GlassPill>
                <h3 className="text-2xl font-black text-white tracking-tighter leading-none">
                  {project.title.split(' ')[0]}<br/>
                  <span className="text-white/40">{project.title.split(' ').slice(1).join(' ')}</span>
                </h3>
              </div>
              
              <div className="flex gap-2">
                 <a href={project.github} target="_blank" className="p-2 rounded-xl glass-ultra border border-white/10 hover:border-white/30 transition-all">
                    <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                 </a>
              </div>
           </div>
        </div>

        {/* Card Body: PSI */}
        <div className="p-8 flex flex-col gap-6 flex-1">
           <div className="space-y-4">
              <div className="flex gap-4">
                 <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest w-12 shrink-0 mt-1">Goal</span>
                 <p className="text-sm text-neutral-400 font-light leading-snug">{project.problem}</p>
              </div>
              <div className="flex gap-4">
                 <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-12 shrink-0 mt-1">Design</span>
                 <p className="text-sm text-neutral-300 font-light leading-snug">{project.solution}</p>
              </div>
              <div className="flex gap-4">
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest w-12 shrink-0 mt-1">Metric</span>
                 <p className="text-sm text-white font-medium leading-snug">{project.impact}</p>
              </div>
           </div>

           {/* Tech Stack Chips */}
           <div className="mt-auto pt-4 flex flex-wrap gap-2">
              {project.tech.map(t => (
                <GlassPill key={t} variant="frosted" className="bg-white/5 border-white/5 lowercase !text-[10px]">{t}</GlassPill>
              ))}
           </div>
        </div>

        {/* Hover Slide-up CTA */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-500 translate-y-full group-hover:translate-y-0 p-8 pt-10 bg-gradient-to-t from-[#0a0a0f] to-transparent z-20">
           <a 
             href={project.href} 
             target="_blank" 
             className="w-full py-4 rounded-2xl glass-ultra border border-indigo-500/30 text-white font-bold flex items-center justify-center gap-2 pointer-events-auto hover:bg-indigo-500/10 transition-colors"
           >
              Launch Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" /></svg>
           </a>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full">
      <div className="text-center mb-16 px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
            <p className="text-xs font-bold tracking-[0.3em] text-indigo-400 uppercase mb-4">Portfolio</p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-tight">
              Liquid <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Interactions.</span>
            </h2>
         </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} isMobile={isMobile} />
        ))}
      </motion.div>

      {/* "More Work" Toggle */}
      <div className="mt-16 text-center">
         <button
            onClick={() => setShowMore(!showMore)}
            className="group flex flex-col items-center gap-3 mx-auto"
         >
            <div className="flex items-center gap-4">
               <div className="h-px w-10 sm:w-20 bg-white/10" />
               <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-500 group-hover:text-white transition-colors">
                  {showMore ? "Hide archive" : "Explore archive"}
               </span>
               <div className="h-px w-10 sm:w-20 bg-white/10" />
            </div>
            
            <motion.div
               animate={{ y: showMore ? 0 : [0, 5, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-neutral-600 group-hover:text-indigo-400 transition-colors"
            >
               <svg className={cn("w-5 h-5 transition-transform duration-500", showMore && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
            </motion.div>
         </button>

         <AnimatePresence>
           {showMore && (
             <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: "auto" }}
               exit={{ opacity: 0, height: 0 }}
               className="overflow-hidden bg-[#0a0a0f]"
             >
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 pb-2 px-4 max-w-7xl mx-auto">
                 {MORE_PROJECTS.map((project, idx) => (
                   <motion.div
                     key={project.title}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: idx * 0.1 }}
                   >
                     <GlassCard variant="medium" className="p-6 text-left border-white/5 active:scale-95 transition-transform" interactive>
                        <h4 className="text-white font-bold tracking-tight mb-2">{project.title}</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                           {project.tech.map(t => <span key={t} className="text-[9px] uppercase font-bold tracking-widest text-neutral-600">{t}</span>)}
                        </div>
                     </GlassCard>
                   </motion.div>
                 ))}
               </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}
