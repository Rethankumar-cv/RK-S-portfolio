"use client";

import { motion, Variants } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import GlassContainer from "@/components/ui/GlassContainer";

const PROCESS_STEPS = [
  {
    title: "Research & Strategy",
    description: "Deep dive into user architecture, product goals, and competitive landscapes to establish a rock-solid foundation.",
    icon: (
       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    ),
    color: "from-indigo-500/20 to-purple-500/20",
    glow: "bg-indigo-500/60"
  },
  {
    title: "Ideation",
    description: "Brainstorming and sketching conceptual systems. Finding the exact intersection of striking visual mechanics and seamless utility.",
    icon: (
       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
    color: "from-purple-500/20 to-fuchsia-500/20",
    glow: "bg-purple-500/60"
  },
  {
    title: "Design",
    description: "Crafting high-fidelity prototypes and rigorous design grids centered completely around premium liquid typography and motion contexts.",
    icon: (
       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
    ),
    color: "from-fuchsia-500/20 to-pink-500/20",
    glow: "bg-fuchsia-500/60"
  },
  {
    title: "Development",
    description: "Translating static pixels into highly performant, accessible, and scalable React architectures leveraging the latest server capabilities.",
    icon: (
       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
    color: "from-pink-500/20 to-rose-500/20",
    glow: "bg-rose-500/60"
  },
  {
    title: "Optimization",
    description: "Refining core state logic natively, auditing accessibility levels, and syncing framer kinematics to hit sub-millisecond layout stability.",
    icon: (
       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    color: "from-rose-500/20 to-orange-500/20",
    glow: "bg-orange-500/60"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.25 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } }
};

export default function Process() {
  const isMobile = useIsMobile();

  return (
    <section className="py-20 flex justify-center w-full px-4">
      <GlassContainer maxWidth="max-w-6xl" className="p-8 sm:p-12 lg:p-16">
        <div className="w-full">
      <div className="text-center mb-16 sm:mb-24 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3 text-center">Workflow</h2>
          <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-loose text-center text-glow">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/60">Process</span>
          </h3>
          <p className="mt-1 sm:mt-2 text-[15px] sm:text-base text-white/60 max-w-2xl mx-auto font-light leading-relaxed px-4 text-center text-glow">
            I don&apos;t just write code; I engineer solutions. Here is exactly how I frame isolated problems and synthesize massive structures.
          </p>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        className="relative max-w-4xl mx-auto px-4"
      >
        {/* Line Track — draws itself on scroll */}
        <motion.div
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-white/10 md:-translate-x-1/2 z-0"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.1 }}
        />

        {PROCESS_STEPS.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div 
              key={step.title}
              variants={itemVariants}
              className="relative z-10 flex flex-col md:flex-row items-start md:items-center w-full mb-10 sm:mb-16 last:mb-0"
            >
              {/* Content Node Block */}
              <div className={`w-full md:w-1/2 flex justify-start ${isEven ? "md:justify-end md:pr-12" : "md:order-last md:pl-12"} pl-14 sm:pl-16 md:pl-0`}>
                <div className="bg-white/[0.02] p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.05] relative group md:hover:border-white/10 md:hover:bg-white/[0.04] transition-all w-full max-w-md shadow-lg">
                   {/* Local Glow Backing behind Step */}
                   {!isMobile && (
                     <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl blur-xl -z-10 mix-blend-screen`} />
                   )}
                   
                   {/* Background Typography Number Overlay */}
                   <span className="text-[80px] sm:text-[120px] font-black text-white/[0.02] absolute -top-4 sm:-top-8 -right-2 sm:-right-4 pointer-events-none select-none overflow-hidden lead-none">
                     {idx + 1}
                   </span>
                   
                   <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide mb-2 sm:mb-3 flex items-center gap-2 relative z-10 md:group-hover:text-white transition-colors text-glow">
                     {step.title}
                   </h4>
                   <p className="text-white/60 font-light leading-relaxed text-[13px] sm:text-sm relative z-10 text-glow">
                     {step.description}
                   </p>
                </div>
              </div>

              {/* Glowing Icon Point over the timeline track */}
              <div className="absolute left-6 md:left-1/2 top-6 sm:top-8 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass border border-white/20 flex items-center justify-center bg-[#050505] shadow-[0_0_15px_rgba(0,0,0,0.8)] relative group overflow-hidden">
                    {/* Inner glowing core color matching step */}
                    <div className={`absolute inset-0 ${step.glow} opacity-30 md:opacity-20 md:group-hover:opacity-60 blur-[3px] md:blur-md transition-opacity duration-300`} />
                    <div className="relative z-10 text-white/90 md:text-white/80 md:group-hover:text-white transition-colors duration-300 scale-75 sm:scale-100">
                      {step.icon}
                    </div>
                 </div>
              </div>

            </motion.div>
          );
        })}
      </motion.div>
        </div>
      </GlassContainer>
    </section>
  );
}
