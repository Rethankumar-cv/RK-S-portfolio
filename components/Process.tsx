"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";
import GlassCard from "@/components/ui/glass/GlassCard";

const PROCESS_STEPS = [
  {
    title: "Strategy",
    description: "Deep dive into product goals and user architecture. Mapping the neural pathways of the experience.",
  },
  {
    title: "Ideation",
    description: "Sketching tactile motion mechanics. Finding the intersection of striking visuals and seamless utility.",
  },
  {
    title: "Design",
    description: "High-fidelity liquid grids and typographic systems. Building the visual source of truth.",
  },
  {
    title: "Engineering",
    description: "Clean, performant React architectures with a focus on animation kinematics and stability.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.3 } 
  },
};

export default function Process() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <div className="text-center mb-24 px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
            <p className="text-xs font-bold tracking-[0.3em] text-indigo-400 uppercase mb-4">Workflow</p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-tight">
              Spatial <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Evolution.</span>
            </h2>
         </motion.div>
      </div>

      <motion.div 
        className="max-w-5xl mx-auto px-4 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Timeline Line (Vertical) */}
        {!isMobile && (
           <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent" />
        )}

        <div className="space-y-20 sm:space-y-32">
          {PROCESS_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={idx} className="relative flex items-center">
                {/* Connector Node (Center circle) */}
                {!isMobile && (
                   <motion.div 
                     initial={{ scale: 0, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     viewport={{ margin: "-20%" }}
                     className="absolute left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full glass-frosted border border-white/20 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                   >
                      <span className="text-white font-black text-xl">{idx + 1}</span>
                   </motion.div>
                )}

                {/* Alternating Content Cards */}
                <div className={cn("flex w-full", isEven ? "justify-start" : "justify-end")}>
                  <motion.div
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    initial={{ opacity: 0.3, x: isEven ? -40 : 40, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ margin: "-20%" }}
                    className="w-full sm:max-w-[320px] relative z-10"
                  >
                    <GlassCard variant="medium" className="p-8 rounded-[18px] border-white/5 group hover:border-indigo-500/30 transition-all">
                       {isMobile && (
                         <div className="mb-4 inline-flex w-8 h-8 rounded-full glass-ultra border border-white/10 items-center justify-center text-[10px] font-black text-white">
                            {idx + 1}
                         </div>
                       )}
                       <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-300 transition-colors">
                         {step.title}
                       </h4>
                       <p className="text-sm text-neutral-500 font-light leading-relaxed">
                         {step.description}
                       </p>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
