"use client";

import { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionValue,
  useMotionTemplate
} from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {
    id: "infosys",
    company: "Infosys Springboard",
    role: "Artificial Intelligence Intern",
    location: "Remote",
    duration: "Aug 2025 – Oct 2025",
    bullets: [
      "Assisted in developing automated testing strategies for AI systems to ensure quality assurance.",
      "Analyzed large datasets from multiple sources, identifying correlations and utilizing NLP for sentiment analysis."
    ],
    theme: {
      glowBg: "bg-indigo-500/30",
      borderHover: "hover:border-indigo-500/50",
      badgeBg: "bg-indigo-500/15",
      badgeText: "text-indigo-300",
      dotBg: "bg-indigo-400",
      cursorColor: "rgba(99, 102, 241, 0.15)"
    }
  },
  {
    id: "reccsar",
    company: "Reccsar",
    role: "Full Stack Developer Intern",
    location: "Remote",
    duration: "June 2025 – July 2025",
    bullets: [
      "Collaborated with developers to design, develop, test, and deploy full-stack applications.",
      "Utilized Git for version control and participated in daily standups to align on progress and blockers."
    ],
    theme: {
      glowBg: "bg-fuchsia-500/30",
      borderHover: "hover:border-fuchsia-500/50",
      badgeBg: "bg-fuchsia-500/15",
      badgeText: "text-fuchsia-300",
      dotBg: "bg-fuchsia-400",
      cursorColor: "rgba(217, 70, 239, 0.15)"
    }
  },
  {
    id: "xylonic",
    company: "XYLONIC Technology",
    role: "Application Developer",
    location: "On-site",
    duration: "Jan 2025 – Jan 2025",
    bullets: [
      "Wrote SQL statements for querying databases and extracting critical data for analysis.",
      "Identified code bottlenecks and optimized performance to improve the overall customer experience."
    ],
    theme: {
      glowBg: "bg-emerald-500/30",
      borderHover: "hover:border-emerald-500/50",
      badgeBg: "bg-emerald-500/15",
      badgeText: "text-emerald-300",
      dotBg: "bg-emerald-400",
      cursorColor: "rgba(16, 185, 129, 0.15)"
    }
  }
];

function ExperienceCard({ exp, index, isMobile }: { exp: any; index: number; isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations mapped to this specific card's position in viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  // Scale and opacity dynamics: 1.05 when perfectly centered
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.95, 1, 1.05, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.3, 1, 1, 1, 0.3]);
  const activeGlowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0, 0.3, 1, 0.3, 0]);
  
  // Timeline node interactions
  const nodeScale = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.8, 1, 1.8, 1, 0.8]);
  const nodeGlow = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0, 0.5, 1, 0.5, 0]);

  // Parallax for inner background element
  const yParallax = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // 3D Tilt & Cursor Glow Interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]), { stiffness: 400, damping: 40 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    cursorX.set(-1000);
    cursorY.set(-1000);
  }

  const cursorBg = useMotionTemplate`radial-gradient(500px circle at ${cursorX}px ${cursorY}px, var(--cursor-color), transparent 80%)`;

  const isEven = index % 2 === 0;
  
  // Desktop layout: left/right alternating, restricted to max-w for better density. Mobile: margin-left.
  const cardAlignClass = isMobile 
    ? "ml-12 w-[calc(100%-3rem)] max-w-[500px]" 
    : isEven 
      ? "md:w-1/2 md:mr-auto md:pr-10 xl:pr-16 flex justify-end" 
      : "md:w-1/2 md:ml-auto md:pl-10 xl:pl-16 flex justify-start";

  // Using negative margins on desktop to slightly overlap vertically and compress flow
  return (
    <div className={cn("relative w-full flex items-center justify-center group/card", isMobile ? "mb-16" : "mb-0 md:-mb-24 last:mb-0")} ref={cardRef}>
      
      {/* Timeline Node */}
      <div className={cn("absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center", 
        isMobile ? "left-[15px] -ml-[6px]" : "md:left-1/2 md:-ml-[6px]"
      )}>
        <motion.div 
          style={{ scale: nodeScale }}
          className={cn("w-3 h-3 rounded-full relative z-10 transition-colors duration-300", exp.theme.dotBg)}
        />
        <motion.div 
          style={{ opacity: nodeGlow, scale: nodeScale }}
          className={cn("absolute inset-0 w-8 h-8 -left-2.5 -top-2.5 rounded-full blur-md", exp.theme.glowBg)}
        />
      </div>

      <div className={cn("w-full flex", isMobile ? "justify-end" : "")}>
        <motion.div 
          className={cn("relative z-10", cardAlignClass)}
          style={{ 
            opacity, 
            scale, 
            rotateX: isMobile ? 0 : rotateX, 
            rotateY: isMobile ? 0 : rotateY,
            transformPerspective: 1200
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className={cn(
              "relative overflow-hidden rounded-[32px] border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-2xl p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl md:max-w-[500px] w-full",
              exp.theme.borderHover
            )}
            style={{ "--cursor-color": exp.theme.cursorColor } as React.CSSProperties}
          >
            {/* Hover Cursor Glow */}
            {!isMobile && (
              <motion.div 
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-0 group-hover/card:opacity-100 mix-blend-screen"
                style={{ background: cursorBg }}
              />
            )}

            {/* Dynamic Active Parallax Glow */}
            <motion.div 
              style={{ y: yParallax, opacity: activeGlowOpacity }}
              className={cn("absolute -top-32 -right-32 w-72 h-72 blur-[90px] rounded-full pointer-events-none transition-opacity duration-500", exp.theme.glowBg)}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={cn("px-3.5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md border border-white/10", exp.theme.badgeBg, exp.theme.badgeText)}>
                  {exp.duration}
                </span>
                <span className="px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded-full bg-white/[0.03] border border-white/10 text-neutral-300">
                  {exp.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                {exp.role}
              </h3>
              <p className="text-white/50 text-sm sm:text-base font-medium mb-7">
                @ {exp.company}
              </p>

              <ul className="space-y-4.5">
                {exp.bullets.map((bullet: string, idx: number) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 group/bullet"
                  >
                    <div className={cn("mt-2 w-1.5 h-1.5 shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover/bullet:scale-150", exp.theme.dotBg)} />
                    <p className="text-neutral-400 text-[15px] leading-relaxed transition-colors duration-300 group-hover/bullet:text-neutral-200">
                      {bullet}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Experience() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 sm:py-24 w-full px-4 overflow-hidden relative" ref={containerRef}>
      <div className="max-w-6xl mx-auto w-full relative">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase mb-4">
              Milestones
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
              Experience &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/40">
                Achievements
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full pb-10">
          {/* Static Background Line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/[0.05] left-[15px] md:left-1/2 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Glowing Progress Line */}
          <motion.div 
            className="absolute top-0 w-[2px] bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-emerald-500 left-[15px] md:left-1/2 md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="relative z-10 pt-4 flex flex-col">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
