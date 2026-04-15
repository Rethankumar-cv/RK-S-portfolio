"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";
import GlassPill from "@/components/ui/glass/GlassPill";
import GlassCard from "@/components/ui/glass/GlassCard";

const SKILL_GROUPS = [
  {
    category: "Design",
    tint: "indigo" as const,
    skills: ["Figma", "Framer", "Prototyping", "Design Systems", "UI Animation", "Wireframing"],
  },
  {
    category: "Front-End",
    tint: "cyan" as const,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    category: "Engineering",
    tint: "violet" as const,
    skills: ["Node.js", "GraphQL", "PostgreSQL", "Prisma", "Go", "Docker", "Git"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
};

export default function Skills() {
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
            <p className="text-xs font-bold tracking-[0.3em] text-indigo-400 uppercase mb-4">Capabilities</p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-tight">
              Modular <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Expertise.</span>
            </h2>
         </motion.div>
      </div>

      <motion.div 
        className="max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="space-y-6">
               <motion.h4 
                 variants={itemVariants}
                 className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-500 pl-4 border-l border-white/10"
               >
                 {group.category}
               </motion.h4>
               
               <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                    >
                       <GlassPill 
                         variant="frosted" 
                         className="px-5 py-2.5 bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all lowercase"
                         interactive
                       >
                          <div className={cn("w-1.5 h-1.5 rounded-full mr-3 shadow-[0_0_8px_currentColor]", 
                            group.tint === "indigo" ? "text-indigo-400 bg-indigo-400" : 
                            group.tint === "cyan" ? "text-cyan-400 bg-cyan-400" : 
                            "text-violet-400 bg-violet-400"
                          )} />
                          {skill}
                       </GlassPill>
                    </motion.div>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Floating Tooltip / Note */}
        <motion.div 
          variants={itemVariants}
          className="mt-20 flex justify-center"
        >
           <GlassCard variant="ultra" className="px-8 py-4 rounded-2xl border-white/10 flex items-center gap-4">
              <span className="text-xl">✨</span>
              <p className="text-[13px] text-neutral-400 font-light">
                Constantly evolving. Currently exploring <span className="text-white font-medium">Native Spatial Design</span> patterns.
              </p>
           </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
