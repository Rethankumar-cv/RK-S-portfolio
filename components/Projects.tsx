"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

const PROJECTS = [
  {
    title: "Aether AI Platform",
    description: "Next-gen machine learning orchestration interface with real-time neural network visualizations.",
    tech: ["Next.js", "WebGL", "TailwindCSS"],
    color: "from-blue-600/30 to-indigo-600/30",
    border: "group-hover:border-indigo-500/50"
  },
  {
    title: "Nimbus Cloud Console",
    description: "A liquid-smooth dashboard for multi-cloud infrastructure monitoring and cost analysis.",
    tech: ["React", "Framer Motion", "Go"],
    color: "from-emerald-600/30 to-teal-600/30",
    border: "group-hover:border-emerald-500/50"
  },
  {
    title: "Luma DeFi Exchange",
    description: "Decentralized trading platform featuring sub-millisecond execution and glassmorphic order books.",
    tech: ["Web3.js", "TypeScript", "Solidity"],
    color: "from-fuchsia-600/30 to-purple-600/30",
    border: "group-hover:border-fuchsia-500/50"
  },
  {
    title: "Nova Design System",
    description: "An open-source component library combining brutalism with premium micro-interactions.",
    tech: ["Vue", "CSS Modules", "Storybook"],
    color: "from-orange-600/30 to-red-600/30",
    border: "group-hover:border-orange-500/50"
  },
  {
    title: "Vanguard OS",
    description: "Web-based operating system UI experiment highlighting complex state management and floating windows.",
    tech: ["React", "Zustand", "Framer Motion"],
    color: "from-cyan-600/30 to-blue-600/30",
    border: "group-hover:border-cyan-500/50"
  },
  {
    title: "Hyperion Analytics",
    description: "Big data enterprise dashboard transforming chaotic datasets into elegant, actionable visual maps.",
    tech: ["Next.js", "D3.js", "TailwindCSS"],
    color: "from-purple-600/30 to-indigo-600/30",
    border: "group-hover:border-indigo-500/50"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

function ProjectCard({ project, isMobile }: { project: typeof PROJECTS[0], isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Spotlight tracking (Always initialize React hooks simultaneously)
  const mouseX = useMotionValue(-1000); // Default way offscreen to avoid random flash
  const mouseY = useMotionValue(-1000);

  // Tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-4deg", "4deg"]);

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      700px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.4),
      transparent 40%
    )
  `;

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile) return; // Hard-break override killing heavy computations instantly on touch surfaces

    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Set spotlight center
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    // Set tilt normalized coords (-0.5 to 0.5)
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <motion.div variants={itemVariants} style={{ perspective: 1200 }} className="relative group w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={!isMobile ? { scale: 1.02 } : undefined}
        whileTap={isMobile ? { scale: 0.98 } : undefined}
        style={!isMobile ? { rotateX, rotateY } : undefined}
        className={cn(
          "w-full h-full relative glass rounded-3xl p-6 overflow-hidden border border-white/10 shadow-xl transition-all duration-300 flex flex-col justify-between group",
          project.border,
          isMobile && "active:border-indigo-500/40 active:bg-white/[0.08]" // Native substitute tactile feedback
        )}
      >
        {/* Dynamic Spotlight Effect (Stripped on mobile) */}
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-10 mix-blend-overlay"
            style={{ background: spotlightBackground }}
          />
        )}

        {/* Static localized ambient fallback glow for mobile exclusively inside the bounding box */}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-white/[0.04] opacity-100 -z-10" />
        )}

        {/* Project Content Box */}
        <div className="relative z-30 flex flex-col flex-grow gap-6">
          {/* Mock Visual representation */}
          <div className={cn(
            "w-full h-48 sm:h-52 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5",
            `bg-gradient-to-br ${project.color}`,
          )}>
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay backdrop-blur-[2px] sm:backdrop-blur-md shadow-[inset_0_4px_30px_rgba(255,255,255,0.05)]" />
            
            <div className="absolute w-4/5 h-3/4 border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md rounded-xl flex flex-col p-4 shadow-xl sm:group-hover:-translate-y-2 sm:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition duration-500">
              <div className="w-full flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mb-3" />
              <div className="w-4/5 h-2 bg-white/5 rounded-full mb-2" />
              <div className="w-2/3 h-2 bg-white/5 rounded-full" />
            </div>
          </div>

          <div className="flex flex-col flex-grow relative">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/40 transition-all">
              {project.title}
            </h3>
            
            <p className="text-[15px] sm:text-base text-neutral-400 font-light leading-relaxed mb-6 group-hover:text-neutral-300 transition-colors">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto mb-2 relative z-20 transition-all duration-300">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 sm:py-1 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-300 bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>

            {/* Hidden links revealed fully on hover mapped exclusively. On mobile native, we un-collapse it immediately as persistent action links or fallback active tap states */}
            <div className={cn(
              "grid grid-cols-2 gap-3 sm:gap-4 mt-4 relative z-20 transition-all duration-500 ease-[cubic-bezier(0.2,0.65,0.3,0.9)]",
              !isMobile ? "overflow-hidden max-h-0 opacity-0 transform translate-y-4 group-hover:max-h-20 group-hover:opacity-100 group-hover:translate-y-0" : "max-h-20 opacity-100 translate-y-0 pt-2"
            )}>
              <a href="#" className="flex items-center justify-center py-3 sm:py-2.5 text-sm font-semibold text-white bg-indigo-500/20 hover:bg-indigo-500/40 rounded-xl border border-indigo-500/30 transition-colors">
                Preview
              </a>
              <a href="#" className="flex items-center justify-center py-3 sm:py-2.5 text-sm font-semibold text-neutral-300 bg-white/[0.03] hover:bg-white/10 active:bg-white/10 rounded-xl border border-white/10 transition-colors">
                Source
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="text-center mb-12 sm:mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3">Selected Work</h2>
          <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Projects</span>
          </h3>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
      >
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} project={project} isMobile={isMobile} />
        ))}
      </motion.div>
    </div>
  );
}
