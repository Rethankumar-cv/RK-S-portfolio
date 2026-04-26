"use client";

import { motion, Variants, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import GlassContainer from "@/components/ui/GlassContainer";
import { useRef, useCallback } from "react";

export default function Hero() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* ─── Cursor glow tracking (desktop only) ─── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isMobile || shouldReduceMotion) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    },
    [isMobile, shouldReduceMotion, rawX, rawY]
  );

  /* ─── Animation Variants ─── */
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: isMobile ? 0.07 : 0.13, delayChildren: 0.1 },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.93 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.25 },
    },
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ─── Shared motion props (disabled when reduced-motion) ─── */
  const floatMotion = !isMobile && !shouldReduceMotion
    ? { animate: { y: [0, -6, 0] }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const } }
    : {};

  const imageFloatMotion = !isMobile && !shouldReduceMotion
    ? { animate: { y: [-6, 6, -6] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } }
    : {};

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="h-[100dvh] min-h-[650px] w-full flex items-center justify-center relative overflow-hidden pt-[40px] lg:pt-[50px]"
    >
      {/* ── Cursor glow (desktop) ── */}
      {!isMobile && !shouldReduceMotion && (
        <motion.div
          className="absolute pointer-events-none z-0 rounded-full"
          style={{
            width: 420,
            height: 420,
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 h-full max-w-[1350px] mx-auto">

        {/* ── Background ambient drifting glow (left side / text zone) ── */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{ x: [0, 10, -8, 0], y: [0, -8, 6, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[8%] top-1/2 -translate-y-1/2 z-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-[480px] h-[480px] bg-indigo-500/10 blur-[120px] rounded-full" />
          </motion.div>
        )}

        {/* ── Breathing ambient glow centred behind hero content ── */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            aria-hidden="true"
          >
            <div
              className="w-[700px] h-[500px] rounded-full blur-[100px]"
              style={{ background: "radial-gradient(ellipse at 65% 50%, rgba(34,211,238,0.07) 0%, rgba(99,102,241,0.08) 50%, transparent 80%)" }}
            />
          </motion.div>
        )}

        <GlassContainer className="w-full px-6 py-8 sm:px-10 sm:py-12 lg:px-10 lg:py-12 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-black/60 backdrop-blur-[24px] border border-white/[0.12] shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] overflow-hidden rounded-[2rem]">

          {/* Shine layer — faint diagonal light */}
          <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-10 mix-blend-screen" />
          </div>

          {/* ── Content float wrapper ── */}
          <motion.div
            {...floatMotion}
            className="flex flex-col-reverse lg:flex-row items-center justify-between w-full relative z-10 gap-12 lg:gap-16 pt-2 -mt-4 lg:-mt-6"
          >
            {/* ════════════════════════════════
                LEFT SIDE — Text content
            ════════════════════════════════ */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[55%] gap-3 sm:gap-4"
            >
              {/* Main Heading */}
              <motion.div variants={fadeUpVariants} className="w-full">
                <h1 className="text-[clamp(2.0rem,4.5vw,3.5rem)] leading-[1.0] font-black tracking-tight text-white text-glow">
                  Building scalable systems <br className="hidden lg:block" /> & cloud-driven applications.
                </h1>
              </motion.div>

              {/* Subtext Description */}
              <motion.div variants={fadeUpVariants} className="w-full max-w-[500px]">
                <div className="text-[clamp(1.0rem,1.4vw,1.15rem)] text-white/85 leading-[1.4] font-light text-glow space-y-2">
                  <p>Cloud & Full-Stack Developer building <br className="hidden sm:block" /> production-ready, scalable applications.</p>
                  <p>Focused on cloud architecture and <br className="hidden sm:block" /> high-performance frontend systems.</p>
                </div>
              </motion.div>

              {/* ── CTAs ── */}
              <motion.div
                variants={fadeUpVariants}
                className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full pt-2"
              >
                {/* Primary CTA */}
                <motion.button
                  whileHover={!isMobile ? { scale: 1.04, y: -2 } : undefined}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleScrollTo("projects")}
                  className="relative flex items-center justify-center px-6 py-3 rounded-full overflow-hidden min-w-[140px] bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_36px_rgba(34,211,238,0.55)] transition-all duration-300"
                >
                  {/* Inner shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 translate-x-[-100%] hover:translate-x-[100%] transition-all duration-500 ease-out" />
                  <span className="relative z-10 text-white font-bold text-sm tracking-wide">
                    View My Work
                  </span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  whileHover={!isMobile ? { scale: 1.04, y: -2 } : undefined}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleScrollTo("contact")}
                  className="relative flex items-center justify-center px-6 py-3 rounded-full bg-transparent border border-white/20 hover:border-white/50 hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-all duration-300 min-w-[140px]"
                >
                  <span className="text-white/90 transition-colors font-semibold text-sm tracking-wide">
                    Get In Touch
                  </span>
                </motion.button>

                {/* Resume link */}
                <motion.a
                  href="/resume.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={!isMobile ? { scale: 1.04, y: -2 } : undefined}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide group"
                >
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-indigo-400 group-hover:w-[60%] transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <span className="group-hover:translate-y-1 group-hover:text-cyan-300 transition-all duration-300">↓</span>
                  <span>Resume</span>
                </motion.a>
              </motion.div>

              {/* ── Stats row ── */}
              <motion.div
                variants={fadeUpVariants}
                className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full pt-4 sm:pt-6"
              >
                {[
                  { label: "3+ Projects" },
                  { label: "3 Internships" },
                  { label: "AWS Certified" },
                ].map((stat, i) => (
                  <motion.span
                    key={stat.label}
                    whileHover={!isMobile ? { scale: 1.05, color: "#ffffff" } : undefined}
                    className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider font-semibold cursor-default transition-colors duration-200"
                    style={{ display: "inline-block" }}
                  >
                    {i > 0 && (
                      <span className="inline-block w-1 h-1 rounded-full bg-white/30 mr-4 sm:mr-6 hidden sm:inline-block" />
                    )}
                    {stat.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* ════════════════════════════════
                RIGHT SIDE — Image + Identity
            ════════════════════════════════ */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="w-full lg:w-[45%] flex justify-center items-center relative -mt-3 lg:-mt-8"
            >
              {/* Layered radial glows behind image */}
              {!shouldReduceMotion ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.32, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[340px] h-[340px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none -z-10"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-[55%] w-[200px] h-[200px] bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none -z-10"
                  />
                </>
              ) : (
                <>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[340px] h-[340px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-[55%] w-[200px] h-[200px] bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none -z-10" />
                </>
              )}

              {/* Floating micro-particles (2 max, desktop only) */}
              {!isMobile && !shouldReduceMotion && (
                <>
                  <motion.div
                    animate={{ y: [-12, 12, -12], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[5%] right-[10%] w-2 h-2 rounded-full bg-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.8)] pointer-events-none"
                  />
                  <motion.div
                    animate={{ y: [10, -10, 10], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    className="absolute bottom-[18%] left-[4%] w-3 h-3 rounded-full bg-indigo-400/40 shadow-[0_0_15px_rgba(129,140,248,0.6)] blur-[1px] pointer-events-none"
                  />
                </>
              )}

              {/* Float container: image + identity block share one group */}
              <motion.div
                {...imageFloatMotion}
                className="flex flex-col items-center gap-5 group cursor-default"
              >
                {/* ── IMAGE RING ── */}
                <motion.div
                  whileHover={!isMobile ? { scale: 1.03 } : undefined}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative rounded-full overflow-hidden
                    shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(99,102,241,0.12)]
                    group-hover:shadow-[0_20px_70px_rgba(0,0,0,0.6),0_0_60px_rgba(34,211,238,0.3)]
                    w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[320px] lg:h-[320px]
                    flex items-center justify-center p-[3px]
                    bg-gradient-to-br from-indigo-500/40 to-cyan-500/40
                    group-hover:from-indigo-400/55 group-hover:to-cyan-400/55
                    backdrop-blur-md border border-[0.5px] border-white/40 group-hover:border-white/65
                    transition-all duration-500"
                >
                  <img
                    src="/profile.jpg"
                    alt="Rethan Kumar"
                    className="w-full h-full object-cover object-center rounded-full pointer-events-none relative z-10 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Inner glass reflection */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] group-hover:shadow-[inset_0_0_32px_rgba(255,255,255,0.28)] transition-all duration-500 z-20 pointer-events-none" />
                </motion.div>

                {/* ── IDENTITY TEXT ── */}
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-xl sm:text-2xl font-black text-white/90 tracking-wide drop-shadow-md group-hover:text-white transition-colors duration-300">
                    Rethan Kumar
                  </h2>
                  <p className="text-[13px] sm:text-sm font-medium text-white/60 tracking-wide mt-1.5 group-hover:text-white/90 transition-colors duration-300">
                    Cloud & Full-Stack Developer
                  </p>
                  <motion.p
                    className="text-[11px] sm:text-xs font-bold text-cyan-400/80 uppercase tracking-widest mt-1.5 group-hover:text-cyan-300 transition-colors duration-300"
                    whileHover={!isMobile ? { textShadow: "0 0 8px rgba(34,211,238,0.6)" } : undefined}
                  >
                    Building AI/ML & Data-Driven Systems
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </GlassContainer>
      </div>
    </section>
  );
}
