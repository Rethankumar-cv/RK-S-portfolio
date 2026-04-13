"use client";

import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

const SKILL_GROUPS = [
  {
    title: "Design & UX",
    color: "from-fuchsia-500/60 to-pink-500/60",
    skills: ["Figma", "Framer", "Prototyping", "UI Animation", "Design Systems", "Wireframing"]
  },
  {
    title: "Front-End",
    color: "from-cyan-500/60 to-indigo-500/60",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL", "Vue"]
  },
  {
    title: "Tools & Ecosystem",
    color: "from-emerald-500/60 to-teal-500/60",
    skills: ["Git", "Webpack", "Vercel", "GSAP", "Three.js", "Storybook", "Docker"]
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function MagneticBadge({ children, color, isMobile }: { children: React.ReactNode, color: string, isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Physics hooks for the magnetic spring effect calculating offset from center
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (scaled down by 0.3 to restrict extreme pulling)
    x.set((clientX - centerX) * 0.3); 
    y.set((clientY - centerY) * 0.3);
  }

  function onMouseLeave() {
    if (isMobile) return;
    // Snap back instantly
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={!isMobile ? { x: springX, y: springY } : undefined}
      whileHover={!isMobile ? { scale: 1.1 } : undefined}
      whileTap={{ scale: 0.95 }}
      className="relative group px-5 sm:px-6 py-2.5 sm:py-3 rounded-full cursor-default bg-white/[0.03] active:bg-white/[0.08] backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center transition-colors duration-300 overflow-hidden"
    >
       {/* Background subtle glow matching the color on hover */}
       {!isMobile && (
         <div className={cn(
           "absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-full z-0 mix-blend-screen blur-md",
           `bg-gradient-to-r ${color}`
         )} />
       )}
       
       {/* Touch interaction fallback styling directly */}
       {isMobile && <div className="absolute inset-0 opacity-0 active:opacity-100 transition duration-300 bg-white/5" />}
       
       <span className="relative z-10 font-bold tracking-wider text-neutral-400 group-hover:text-white transition-colors duration-300 drop-shadow-sm uppercase text-[11px] sm:text-xs md:text-sm">
         {children}
       </span>
    </motion.div>
  );
}

export default function Skills() {
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
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3">Capabilities</h2>
          <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Arsenal</span>
          </h3>
        </motion.div>
      </div>

      <div className="flex flex-col gap-12 sm:gap-16 relative z-10">
        {SKILL_GROUPS.map((group, groupIdx) => (
          <motion.div 
             key={group.title}
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
             className="flex flex-col items-center gap-6 sm:gap-8"
          >
             <motion.h4 variants={itemVariants} className="text-base sm:text-lg opacity-80 font-medium text-white tracking-widest border-b border-white/10 pb-2 sm:pb-3 uppercase">
               {group.title}
             </motion.h4>
             
             <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl px-2 sm:px-4">
               {group.skills.map((skill, skillIdx) => {
                 // Creating a slightly random eternal floating animation delay map based on index
                 const floatDelay = (skillIdx % 5) * 0.2;
                 
                 return (
                   <motion.div 
                     key={skill} 
                     variants={itemVariants}
                     className="relative"
                   >
                     {/* Floating div strictly bound disabled if physical touch mapped ensuring raw FPS preservation */}
                     <motion.div
                       animate={!isMobile ? { y: [0, -8, 0] } : { y: 0 }}
                       transition={!isMobile ? { 
                         duration: 4, 
                         repeat: Infinity, 
                         ease: "easeInOut",
                         delay: floatDelay 
                       } : undefined}
                     >
                       <MagneticBadge color={group.color} isMobile={isMobile}>{skill}</MagneticBadge>
                     </motion.div>
                   </motion.div>
                 );
               })}
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
