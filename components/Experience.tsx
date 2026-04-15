"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

// ─── Count-up component ───────────────────────────────────────────────────────
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 1000;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.65, 0.3, 0.9] } },
};

const certContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const certItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const METRICS = [
  { end: 60, suffix: "%", label: "CLS improvement" },
  { end: 3, suffix: "", label: "Teams using library" },
];

const CERTS = [
  { name: "AWS Developer", org: "Amazon Web Services", color: "text-emerald-400" },
  { name: "Meta Front-End Pro", org: "Coursera / Meta", color: "text-cyan-400" },
  { name: "Google UX Design", org: "Coursera / Google", color: "text-yellow-400/80" },
];

export default function Experience() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-2 sm:px-0">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-indigo-400 uppercase mb-3">
            Milestones
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white tracking-tight leading-tight">
            Experience &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">
              Achievements
            </span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "-40px" : "-80px" }}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
      >
        {/* ── Internship (full width) ── */}
        <motion.div
          variants={itemVariants}
          whileHover={!isMobile ? { y: -3 } : undefined}
          whileTap={isMobile ? { scale: 0.985 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="md:col-span-2 group relative"
        >
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          )}
          <div
            className={cn(
              "glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.07] group-hover:border-indigo-500/30 transition-colors duration-300 relative overflow-hidden",
              isMobile && "active:border-indigo-500/30"
            )}
          >
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-indigo-500/8 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-2.5 py-1 bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Internship
                  </span>
                  <span className="text-neutral-500 text-xs font-medium">2025 – Present</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                  Front-End Engineering Intern
                </h3>
                <p className="text-indigo-300/70 text-sm font-medium mb-3">
                  @ Acme Vanguard Tech
                </p>
                <p className="text-neutral-500 text-[13px] sm:text-sm leading-relaxed max-w-xl">
                  Migrated legacy dashboard states into a unified React architecture. Improved Core Web Vitals CLS score and shipped a modular component library adopted by 3 internal teams.
                </p>

                {/* Outcome metrics — count up when in view */}
                <div className="flex flex-wrap gap-6 mt-4">
                  {METRICS.map(({ end, suffix, label }) => (
                    <div key={label}>
                      <p className="text-base font-black text-white">
                        <CountUp end={end} suffix={suffix} />
                      </p>
                      <p className="text-[10px] text-neutral-600 uppercase tracking-wider">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden sm:flex w-16 h-16 shrink-0 rounded-2xl bg-white/[0.04] border border-white/[0.08] items-center justify-center">
                <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Hackathons ── */}
        <motion.div
          variants={itemVariants}
          whileHover={!isMobile ? { y: -3 } : undefined}
          whileTap={isMobile ? { scale: 0.985 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="group relative h-full"
        >
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 to-pink-500/15 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          )}
          <div
            className={cn(
              "glass h-full p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/[0.07] group-hover:border-fuchsia-500/25 transition-colors duration-300 flex flex-col",
              isMobile && "active:border-fuchsia-500/25"
            )}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span className="px-2.5 py-1 bg-fuchsia-500/15 border border-fuchsia-500/25 text-fuchsia-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Hackathons
              </span>
            </div>

            <div className="space-y-5 flex-1">
              <div className="relative pl-5 pb-5 border-l border-white/[0.07]">
                <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.7)]" />
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">1st Place — Web3 Global Build</h4>
                  <span className="text-base">🏆</span>
                </div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-wider font-semibold mb-2">Dec 2024 · 400+ teams</p>
                <p className="text-neutral-500 text-[13px] leading-relaxed">
                  Built a decentralized exchange with glassmorphic order books and sub-100ms wallet sync.
                </p>
              </div>

              <div className="relative pl-5 border-l border-white/[0.07]">
                <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-neutral-700 group-hover:bg-fuchsia-400/50 transition-colors duration-300" />
                <h4 className="text-sm font-bold text-white mb-1">Finalist — AI Design Jam</h4>
                <p className="text-[10px] text-neutral-600 uppercase tracking-wider font-semibold mb-2">Sep 2024</p>
                <p className="text-neutral-500 text-[13px] leading-relaxed">
                  Prototyped a generative AI layout tool. Highest usability score among all finalists.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Certifications ── */}
        <motion.div
          variants={itemVariants}
          whileHover={!isMobile ? { y: -3 } : undefined}
          whileTap={isMobile ? { scale: 0.985 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="group relative h-full"
        >
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          )}
          <div
            className={cn(
              "glass h-full p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/[0.07] group-hover:border-emerald-500/25 transition-colors duration-300 flex flex-col",
              isMobile && "active:border-emerald-500/25"
            )}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Certifications
              </span>
            </div>

            {/* Staggered cert rows */}
            <motion.div
              className="flex flex-col gap-3 flex-1 justify-center"
              variants={certContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
            >
              {CERTS.map(({ name, org, color }) => (
                <motion.div
                  key={name}
                  variants={certItemVariants}
                  className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <svg className={cn("w-4 h-4", color)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white leading-snug">{name}</p>
                    <p className="text-[11px] text-neutral-600 mt-0.5">{org}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
