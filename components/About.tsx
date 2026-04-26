"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import GlassContainer from "@/components/ui/GlassContainer";
import { useRef, useState, useEffect } from "react";

// ─── Count-up stat ─────────────────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  const num = parseInt(value, 10);
  const suffix = value.replace(String(num), "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 900;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, num]);

  return (
    <div ref={ref}>
      <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
        {count}{suffix}
      </p>
      <p className="text-[11px] text-neutral-500 font-medium mt-0.5 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "3", label: "Featured Projects" },
  { value: "3", label: "Experience Entries" },
];

const CREDENTIALS = [
  {
    icon: "☁️",
    text: "Cloud Infrastructure Specialist",
    color: "text-blue-400/80",
  },
  {
    icon: "⚡",
    text: "Front-End Developer @ XYLONIC",
    color: "text-cyan-400/80",
  },
];

// ─── Variants ──────────────────────────────────────────────────────────────────
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
    <section className="py-20 flex justify-center w-full px-4">
      <GlassContainer maxWidth="max-w-6xl" className="p-8 sm:p-12 lg:p-16">
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
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white tracking-tight leading-tight text-glow">
            Building systems that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/60">
              scale and perform.
            </span>
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 text-[15px] sm:text-base">
          <p className="text-white/80 font-light leading-relaxed text-glow">
            I'm a <strong className="text-white font-medium">Cloud and Front-End Developer</strong> who builds practical, production-oriented digital experiences. Rather than just focusing on how things look, I care deeply about how they run.
          </p>
          <p className="text-white/60 font-light leading-relaxed text-glow">
            My focus is on clean architecture, performance optimization, accessibility, and high reliability. Whether I'm deploying cloud infrastructure or building responsive UI components, my goal is to deliver software that works flawlessly under pressure.
          </p>
        </motion.div>

        {/* Credibility chips — hover gives subtle lift */}
        <motion.div variants={itemVariants} className="space-y-2.5">
          {CREDENTIALS.map(({ icon, text, color }) => (
            <motion.div
              key={text}
              whileHover={!isMobile ? { x: 3, borderColor: "rgba(255,255,255,0.12)" } : undefined}
              whileTap={isMobile ? { scale: 0.98 } : undefined}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] transition-colors duration-200 cursor-default"
            >
              <span className="text-base mt-0.5">{icon}</span>
              <span className={`text-[13px] sm:text-sm font-semibold leading-snug ${color} text-glow`}>
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row — count-up on scroll enter */}
        <motion.div variants={itemVariants} className="flex items-center gap-6 pt-1">
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-6">
              <StatItem value={value} label={label} />
              {i < STATS.length - 1 && (
                <div className="h-8 w-px bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right: Visual card ── */}
      <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-end">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/15 blur-[80px] rounded-full pointer-events-none" />

        <motion.div
          animate={!isMobile ? { y: [0, -12, 0] } : { y: 0 }}
          transition={
            !isMobile ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined
          }
          className="relative z-10 w-full max-w-sm"
        >
          <div className="relative glass-strong p-1.5 rounded-3xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
            <div className="aspect-[4/5] rounded-2xl bg-black/50 relative overflow-hidden flex flex-col items-center justify-center border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/25 via-transparent to-transparent" />

              {!isMobile ? (
                <motion.div
                  className="absolute w-44 h-44 bg-fuchsia-500/15 mix-blend-screen blur-[40px] rounded-full"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 120, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <div className="absolute w-44 h-44 bg-fuchsia-500/10 mix-blend-screen blur-[40px] rounded-full" />
              )}

              <div className="w-24 h-24 border border-white/15 rounded-full flex items-center justify-center bg-white/[0.03] backdrop-blur-md relative z-10">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30">
                  RK
                </span>
              </div>

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
              !isMobile ? { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 } : undefined
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
      </GlassContainer>
    </section>
  );
}
