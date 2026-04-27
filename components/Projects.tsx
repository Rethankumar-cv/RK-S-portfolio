"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";
import GlassContainer from "@/components/ui/GlassContainer";

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    title: "GarmentsInsights AI",
    problem: "Manual defect detection in garment manufacturing is slow and error-prone.",
    solution: "Developed an AI-powered visual inspection pipeline deployed on the cloud.",
    impact: "Increased detection accuracy and reduced inspection time by 40%.",
    tech: ["Python", "TensorFlow", "AWS"],
    color: "from-blue-600/25 to-indigo-600/25",
    glow: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-400",
    border: "hover:border-indigo-500/40",
    github: "https://github.com/Rethankumar-cv/GarmentAI.git",
    live: "https://garment-ai.vercel.app/",
  },
  {
    title: "EV Cyberattack Detection",
    problem: "Electric vehicle networks are increasingly vulnerable to sophisticated cyber threats.",
    solution: "Engineered a machine learning-based anomaly detection system for EV CAN bus data.",
    impact: "Successfully identified novel attack vectors with high precision.",
    tech: ["Machine Learning", "Python", "Data Processing"],
    color: "from-emerald-600/25 to-teal-600/25",
    glow: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    border: "hover:border-emerald-500/40",
    github: "https://github.com/Rethankumar-cv/EVCyberattack-Detection.git",
    live: "https://ev-cyberattack-detection.vercel.app/",
  },
  {
    title: "FRAUDDETECT",
    problem: "Financial institutions struggle with real-time detection of complex fraudulent transactions.",
    solution: "Built a robust classification model integrated into a high-throughput data pipeline.",
    impact: "Enhanced fraud detection rates while minimizing false positives.",
    tech: ["Scikit-learn", "Pandas", "Cloud Backend"],
    color: "from-fuchsia-600/25 to-purple-600/25",
    glow: "from-fuchsia-500/20 to-purple-500/20",
    accent: "text-fuchsia-400",
    border: "hover:border-fuchsia-500/40",
    github: "https://github.com/Rethankumar-cv/Predictive_transaction_intelligence_using_for_BFSI.git",
    live: "https://fraudflow-762b.vercel.app/landing",
  },
  {
    title: "RoadGuard",
    problem: "Manual road surface defect tracking is slow, leading to delayed maintenance and safety risks.",
    solution: "Built a computer vision system that automatically detects and maps road anomalies in real-time.",
    impact: "Improved road maintenance efficiency and enhanced driver safety.",
    tech: ["Python", "OpenCV", "Machine Learning"],
    color: "from-orange-600/25 to-red-600/25",
    glow: "from-orange-500/20 to-red-500/20",
    accent: "text-orange-400",
    border: "hover:border-orange-500/40",
    github: "https://github.com/Rethankumar-cv/Roadguard.git",
    live: "https://roadguard-rose.vercel.app/",
  },
  {
    title: "HustleHub",
    problem: "Freelancers face friction in finding gigs, managing tasks, and communicating with clients.",
    solution: "Created an all-in-one platform integrating job discovery, real-time chat, and project tracking.",
    impact: "Streamlined freelance workflows and improved client-freelancer collaboration.",
    tech: ["Next.js", "React", "Supabase"],
    color: "from-amber-600/25 to-yellow-600/25",
    glow: "from-amber-500/20 to-yellow-500/20",
    accent: "text-amber-400",
    border: "hover:border-amber-500/40",
    github: "https://github.com/Rethankumar-cv/HustleHub.git",
    live: "https://hustle-hub-eight.vercel.app/",
  },
];

const MORE_PROJECTS: {
    title: string;
    description: string;
    tech: string[];
    accent: string;
    border: string;
}[] = [];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } },
};

// PSI row stagger — runs once per card when card enters view
const psiContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const psiItemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({
  project,
  isMobile,
}: {
  project: (typeof FEATURED_PROJECTS)[0];
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 32 });
  const springY = useSpring(y, { stiffness: 350, damping: 32 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-3deg", "3deg"]);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 50%)`;

  const onMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    if (isMobile) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  };

  const onMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <motion.div variants={itemVariants} style={{ perspective: 1200 }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={!isMobile ? { scale: 1.05, y: -8 } : undefined}
        whileTap={isMobile ? { scale: 0.985 } : undefined}
        style={!isMobile ? { rotateX, rotateY } : undefined}
        className={cn(
          "relative w-full h-full bg-white/[0.02] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/[0.05] overflow-hidden flex flex-col gap-4 transition-all duration-300 group",
          project.border,
          !isMobile && "hover:shadow-[0_15px_40px_rgba(255,255,255,0.08)]",
          isMobile && "active:border-white/10"
        )}
      >
        {/* Spotlight */}
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl z-0"
            style={{ background: spotlight }}
          />
        )}

        {/* Gradient bg swatch */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30 transition-opacity duration-500 group-hover:opacity-80",
            project.color
          )}
        />

        <div className="relative z-10 flex flex-col gap-4 flex-1 h-full">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold tracking-[0.18em] text-white/30 uppercase mb-1 block">Featured</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>
            <div className="flex gap-2 pt-1">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] active:bg-white/[0.12] transition-all duration-300"
                aria-label="View Source Code on GitHub"
              >
                <svg className="w-4 h-4 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] active:bg-white/[0.12] transition-all duration-300"
                aria-label="View Live Project"
              >
                <svg className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* PSI format — staggered reveal */}
          <motion.div
            className="space-y-1.5 flex-1"
            variants={psiContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
          >
            {[
              { label: "Problem", text: project.problem },
              { label: "Solution", text: project.solution },
              { label: "Impact", text: project.impact },
            ].map(({ label, text }) => (
              <motion.div key={label} variants={psiItemVariants} className="flex gap-2.5">
                <span className={cn("text-[10px] font-bold tracking-wider uppercase mt-[3px] w-14 shrink-0", project.accent)}>
                  {label}
                </span>
                <p className="text-[13px] sm:text-sm text-white/60 leading-snug">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase text-white/50 bg-white/[0.04] border border-white/[0.08] rounded-full hover:bg-white/[0.09] hover:border-white/[0.16] hover:text-white/80 transition-all duration-150 cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Compact Card ─────────────────────────────────────────────────────────────

function CompactCard({
  project,
  isMobile,
}: {
  project: (typeof MORE_PROJECTS)[0];
  isMobile: boolean;
}) {
  return (
    <motion.div variants={itemVariants} className="w-full h-full">
      <motion.div
        whileHover={!isMobile ? { y: -3 } : undefined}
        whileTap={isMobile ? { scale: 0.97 } : undefined}
        className={cn(
          "relative bg-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/[0.04] transition-all duration-300 flex flex-col gap-3 group h-full",
          project.border
        )}
      >
        <h4 className={cn("text-base font-bold text-white tracking-tight group-hover:text-opacity-90", project.accent)}>
          {project.title}
        </h4>
        <p className="text-white/60 text-[13px] sm:text-sm leading-relaxed mb-6 line-clamp-2 sm:line-clamp-3 group-hover:text-white/80 transition-colors text-glow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Projects() {
  const isMobile = useIsMobile();
  const [showMore, setShowMore] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftStart.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      if (amount < 0 && scrollRef.current.scrollLeft <= 0) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
      }
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const container = scrollRef.current;
    const card = e.currentTarget;
    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    const cardCenterRelativeToContainer = (cardRect.left - containerRect.left) + cardRect.width / 2;
    const containerCenter = containerRect.width / 2;
    const offset = cardCenterRelativeToContainer - containerCenter;

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isHovered) return;

    let animationFrameId: number;
    let accumulate = 0;
    const scrollSpeed = 0.6; // Smooth, slow speed

    const scroll = () => {
      accumulate += scrollSpeed;
      if (accumulate >= 1) {
        el.scrollLeft += Math.floor(accumulate);
        accumulate -= Math.floor(accumulate);
      }
      
      // Wrap seamlessly by subtracting half width
      const halfWidth = el.scrollWidth / 2;
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Focus mode dimming logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scale-100", "z-10");
            entry.target.classList.remove("scale-[0.95]", "z-0", "opacity-40", "opacity-100");
          } else {
            entry.target.classList.add("scale-[0.95]", "z-0");
            entry.target.classList.remove("scale-100", "z-10");
          }
        });
      },
      {
        root: el,
        rootMargin: "0px -40% 0px -40%",
        threshold: 0,
      }
    );

    // Slight delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const cards = el.querySelectorAll(".project-card-wrapper");
      cards.forEach((card) => observer.observe(card));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-center w-full px-4 relative z-[2]">
      <GlassContainer maxWidth="max-w-[1400px]" className="p-5 sm:p-8 lg:px-12 lg:py-10 flex flex-col">
        <div className="w-full">
      {/* Section header */}
      <div className="text-center mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-indigo-400 uppercase mb-3">
            Selected Work
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold text-white tracking-tight leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            Featured {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.4)]">
              Projects
            </span>
          </h2>
          <p className="text-[14px] sm:text-[15px] text-neutral-500 font-light mt-2 max-w-md mx-auto text-center">
            Three projects that best represent how I work and what I care about.
          </p>
        </motion.div>
      </div>

      {/* Featured Scroll Area Wrapper */}
      <div className="relative w-full group/slider">
        {/* Navigation Arrows (Absolute Center Vertical) */}
        <button 
          onClick={() => scrollByAmount(-360)}
          className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 group hidden sm:flex opacity-0 group-hover/slider:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          aria-label="Scroll Left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-white transition-colors">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button 
          onClick={() => scrollByAmount(360)}
          className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 group hidden sm:flex opacity-0 group-hover/slider:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          aria-label="Scroll Right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-white transition-colors">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Masked Scroll Track */}
        <div 
          className="relative w-full -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        >
        <motion.div
          ref={scrollRef}
          className="flex overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pb-6 pt-4 cursor-grab active:cursor-grabbing select-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-40px" : "-80px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={(e) => {
            setIsHovered(false);
            handleMouseUpOrLeave();
          }}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
        >
          {/* Render twice for seamless looping */}
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6">
              {FEATURED_PROJECTS.map((project) => (
                <div 
                  key={`${project.title}-${loopIndex}`} 
                  className="project-card-wrapper scale-[0.95] z-0 transition-all duration-500 w-[85vw] sm:w-[320px] md:w-[340px] lg:w-[360px] shrink-0 h-full flex items-stretch origin-center"
                  onMouseEnter={handleCardHover}
                >
                  <FeaturedCard project={project} isMobile={isMobile} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        </div>
      </div>

      {/* "More Work" section */}
      {MORE_PROJECTS.length > 0 && (
      <div className="mt-10 sm:mt-12">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <button
            onClick={() => setShowMore((v) => !v)}
            className="flex items-center gap-2 text-[12px] font-semibold tracking-wider text-neutral-500 hover:text-neutral-300 active:text-neutral-300 transition-colors uppercase"
          >
            {showMore ? "Show Less" : "More Work"}
            <motion.svg
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="overflow-hidden"
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {MORE_PROJECTS.map((project) => (
                  <CompactCard key={project.title} project={project} isMobile={isMobile} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}
        </div>
      </GlassContainer>
    </div>
  );
}
