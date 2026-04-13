"use client";

import { motion, Variants } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

const STATS = [
  { value: "3+", label: "Projects shipped" },
  { value: "2", label: "Hackathons" },
  { value: "1", label: "Internship" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } },
};

export default function About() {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* ── Left: Text ── */}
      <div className="space-y-7">
        <motion.div variants={itemVariants}>
          <p className="text-xs font-bold tracking-[0.18em] text-indigo-400 uppercase mb-3">
            About Me
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white tracking-tight leading-tight">
            Engineering at the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
              edge of design.
            </span>
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 text-[15px] sm:text-base">
          <p className="text-neutral-400 font-light leading-relaxed">
            I'm a{" "}
            <strong className="text-white/90 font-medium">
              UI/UX Designer & Front-End Developer
            </strong>{" "}
            who bridges the gap between design and engineering. I don't hand off
            mockups — I build them.
          </p>
          <p className="text-neutral-500 font-light leading-relaxed">
            My focus is on interfaces that are fast, accessible, and intentional
            — where every interaction has a reason for existing.
          </p>
        </motion.div>

        {/* Credibility callout */}
        <motion.div
          variants={itemVariants}
          className="space-y-2.5"
        >
          {[
            {
              icon: "🏆",
              text: "1st Place — Web3 Global Hackathon (400+ teams)",
              color: "text-yellow-400/80",
            },
            {
              icon: "💼",
              text: "Front-End Engineering Intern @ Acme Vanguard Tech",
              color: "text-indigo-400/80",
            },
          ].map(({ icon, text, color }) => (
            <div
              key={text}
              className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07]"
            >
              <span className="text-base mt-0.5">{icon}</span>
              <span className={`text-[13px] sm:text-sm font-medium leading-snug ${color}`}>
                {text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-6 pt-1"
        >
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</p>
                <p className="text-[11px] text-neutral-500 font-medium mt-0.5 uppercase tracking-wider">{label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="h-8 w-px bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right: Visual card ── */}
      <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-end">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/15 blur-[80px] rounded-full pointer-events-none" />

        {/* Floating card — gated on desktop only */}
        <motion.div
          animate={!isMobile ? { y: [0, -12, 0] } : { y: 0 }}
          transition={
            !isMobile
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          className="relative z-10 w-full max-w-sm"
        >
          {/* Main card */}
          <div className="relative glass-strong p-1.5 rounded-3xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
            <div className="aspect-[4/5] rounded-2xl bg-black/50 relative overflow-hidden flex flex-col items-center justify-center border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/25 via-transparent to-transparent" />

              {/* Rotating orb */}
              {!isMobile && (
                <motion.div
                  className="absolute w-44 h-44 bg-fuchsia-500/15 mix-blend-screen blur-[40px] rounded-full"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 120, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              )}
              {isMobile && (
                <div className="absolute w-44 h-44 bg-fuchsia-500/10 mix-blend-screen blur-[40px] rounded-full" />
              )}

              {/* Monogram */}
              <div className="w-24 h-24 border border-white/15 rounded-full flex items-center justify-center bg-white/[0.03] backdrop-blur-md relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.04)]">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30">
                  RK
                </span>
              </div>

              {/* Fake UI lines */}
              <div className="absolute bottom-8 left-8 right-8 z-10 space-y-2.5 opacity-50">
                <div className="h-1.5 w-1/3 bg-white/40 rounded-full" />
                <div className="h-1.5 w-full bg-white/10 rounded-full" />
                <div className="h-1.5 w-4/5 bg-white/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Status chip */}
          <motion.div
            className="absolute -bottom-5 -left-4 sm:-left-8 glass px-5 py-3 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl"
            animate={!isMobile ? { y: [0, 8, 0] } : { y: 0 }}
            transition={
              !isMobile
                ? { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
                : undefined
            }
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-white/80 tracking-[0.12em] uppercase">
                Available
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
