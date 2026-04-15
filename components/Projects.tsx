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
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    title: "Aether AI Platform",
    problem: "ML dashboards overwhelm users with raw, unstructured data.",
    solution: "Built real-time neural network visualizations with adaptive layout.",
    impact: "40% faster decision cycles in internal user testing.",
    tech: ["Next.js", "WebGL", "TypeScript"],
    color: "from-blue-600/25 to-indigo-600/25",
    glow: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-400",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "Nimbus Cloud Console",
    problem: "Multi-cloud cost analysis required switching between 4 tools.",
    solution: "Unified infrastructure monitoring dashboard with live diff views.",
    impact: "Reduced context-switching time by 60% for DevOps teams.",
    tech: ["React", "Framer Motion", "Go"],
    color: "from-emerald-600/25 to-teal-600/25",
    glow: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Luma DeFi Exchange",
    problem:
      "Existing DEX interfaces had steep learning curves and lagged on mobile.",
    solution:
      "Glassmorphic order book UI with simplified wallet flow and sub-100ms re-renders.",
    impact: "1st place — Web3 Global Hackathon, beating 400+ teams.",
    tech: ["Web3.js", "TypeScript", "Solidity"],
    color: "from-fuchsia-600/25 to-purple-600/25",
    glow: "from-fuchsia-500/20 to-purple-500/20",
    accent: "text-fuchsia-400",
    border: "hover:border-fuchsia-500/40",
  },
];

const MORE_PROJECTS = [
  {
    title: "Nova Design System",
    description: "Open-source component library — brutalist meets micro-interactions.",
    tech: ["Vue", "CSS Modules", "Storybook"],
    accent: "text-orange-400",
    border: "hover:border-orange-500/30",
  },
  {
    title: "Vanguard OS",
    description: "Web-based OS UI experiment with complex state and floating windows.",
    tech: ["React", "Zustand", "Framer Motion"],
    accent: "text-cyan-400",
    border: "hover:border-cyan-500/30",
  },
  {
    title: "Hyperion Analytics",
    description: "Enterprise dashboard converting chaotic datasets into visual maps.",
    tech: ["Next.js", "D3.js", "Tailwind"],
    accent: "text-purple-400",
    border: "hover:border-purple-500/30",
  },
];

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
        whileHover={!isMobile ? { scale: 1.015 } : undefined}
        whileTap={isMobile ? { scale: 0.985 } : undefined}
        style={!isMobile ? { rotateX, rotateY } : undefined}
        className={cn(
          "relative w-full h-full glass rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/[0.07] overflow-hidden flex flex-col gap-5 transition-colors duration-300 group",
          project.border,
          isMobile && "active:border-white/20"
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
            "absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-100",
            project.color
          )}
        />

        <div className="relative z-10 flex flex-col gap-5 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold tracking-[0.18em] text-white/30 uppercase mb-1 block">Featured</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>
            <div className="flex gap-2 pt-1">
              <a href="#" className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] active:bg-white/[0.12] transition-colors">
                <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="#" className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] active:bg-white/[0.12] transition-colors">
                <svg className="w-3.5 h-3.5 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* PSI format — staggered reveal */}
          <motion.div
            className="space-y-2.5 flex-1"
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
                <p className="text-[13px] sm:text-sm text-neutral-400 leading-snug">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase text-neutral-400 bg-white/[0.04] border border-white/[0.08] rounded-full hover:bg-white/[0.09] hover:border-white/[0.16] hover:text-neutral-300 transition-all duration-150 cursor-default"
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
          "relative glass rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/[0.06] transition-all duration-300 flex flex-col gap-3 group h-full",
          project.border
        )}
      >
        <h4 className={cn("text-base font-bold text-white tracking-tight group-hover:text-opacity-90", project.accent)}>
          {project.title}
        </h4>
        <p className="text-[13px] text-neutral-500 leading-snug flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-medium tracking-wide text-neutral-500 bg-white/[0.03] border border-white/[0.06] rounded-full"
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

  return (
    <div className="w-full px-2 sm:px-0">
      {/* Section header */}
      <div className="text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-indigo-400 uppercase mb-3">
            Selected Work
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white tracking-tight leading-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">
              Projects
            </span>
          </h2>
          <p className="text-[14px] sm:text-[15px] text-neutral-500 font-light mt-3 max-w-md mx-auto">
            Three projects that best represent how I work and what I care about.
          </p>
        </motion.div>
      </div>

      {/* Featured 3 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "-40px" : "-80px" }}
      >
        {FEATURED_PROJECTS.map((project) => (
          <FeaturedCard key={project.title} project={project} isMobile={isMobile} />
        ))}
      </motion.div>

      {/* "More Work" section */}
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
    </div>
  );
}
