"use client";

import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

const SKILL_GROUPS = [
  {
    title: "Design & UX",
    color: "from-fuchsia-500/50 to-pink-500/50",
    accent: "#e879f9",
    skills: [
      { name: "Figma", key: true },
      { name: "Framer", key: true },
      { name: "Prototyping" },
      { name: "Design Systems", key: true },
      { name: "UI Animation" },
      { name: "Wireframing" },
    ],
  },
  {
    title: "Front-End",
    color: "from-cyan-500/50 to-indigo-500/50",
    accent: "#22d3ee",
    skills: [
      { name: "React", key: true },
      { name: "Next.js", key: true },
      { name: "TypeScript", key: true },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "HTML / CSS" },
    ],
  },
  {
    title: "Tools",
    color: "from-emerald-500/50 to-teal-500/50",
    accent: "#10b981",
    skills: [
      { name: "Git", key: true },
      { name: "Vercel" },
      { name: "GSAP" },
      { name: "Storybook" },
      { name: "Webpack" },
      { name: "Docker" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function MagneticBadge({
  skill,
  color,
  isMobile,
}: {
  skill: { name: string; key?: boolean };
  color: string;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 14, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 140, damping: 14, mass: 0.1 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.25);
    y.set((e.clientY - top - height / 2) * 0.25);
  };

  const onMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={!isMobile ? { x: springX, y: springY } : undefined}
      whileHover={!isMobile ? { scale: 1.08 } : undefined}
      whileTap={{ scale: 0.94 }}
      className="relative group"
    >
      <div
        className={cn(
          "relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-default border transition-all duration-300 flex items-center gap-2 overflow-hidden",
          skill.key
            ? "bg-white/[0.07] border-white/[0.14]"
            : "bg-white/[0.03] border-white/[0.07]"
        )}
      >
        {/* Hover glow */}
        {!isMobile && (
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full mix-blend-screen blur-sm",
              `bg-gradient-to-r ${color}`
            )}
          />
        )}

        {/* Key skill indicator dot */}
        {skill.key && (
          <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
        )}

        <span className="relative z-10 text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-indigo-400 uppercase mb-3">
            Capabilities
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white tracking-tight leading-tight">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">
              Arsenal
            </span>
          </h2>
          <p className="text-[14px] text-neutral-500 font-light mt-3">
            Core skills I use on every project.{" "}
            <span className="text-neutral-600">· = primary</span>
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-10 sm:gap-12">
        {SKILL_GROUPS.map((group) => (
          <motion.div
            key={group.title}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col items-center gap-5"
          >
            {/* Group label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="h-px w-8 bg-white/10" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500">
                {group.title}
              </span>
              <div className="h-px w-8 bg-white/10" />
            </motion.div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-2xl">
              {group.skills.map((skill, skillIdx) => (
                <motion.div key={skill.name} variants={itemVariants}>
                  <motion.div
                    animate={!isMobile ? { y: [0, -5, 0] } : { y: 0 }}
                    transition={
                      !isMobile
                        ? {
                            duration: 4 + (skillIdx % 3) * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (skillIdx % 4) * 0.3,
                          }
                        : undefined
                    }
                  >
                    <MagneticBadge skill={skill} color={group.color} isMobile={isMobile} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
