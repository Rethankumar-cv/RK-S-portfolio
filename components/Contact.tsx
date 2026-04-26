"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import GlassContainer from "@/components/ui/GlassContainer";

type FormState = "idle" | "sending" | "sent";

const INPUT_CLS =
  "w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all duration-200";

export default function Contact() {
  const isMobile = useIsMobile();
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState !== "idle") return;
    setFormState("sending");
    setTimeout(() => {
      setFormState("sent");
      setTimeout(() => setFormState("idle"), 2500);
    }, 1200);
  };

  return (
    <div className="w-full relative flex justify-center px-4">
      {/* Ambient glow — desktop only */}
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 bg-indigo-500/8 blur-[100px] rounded-full pointer-events-none -z-10" />
      )}

    <section className="py-20 flex justify-center w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 16 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="w-full max-w-4xl"
      >
        <GlassContainer maxWidth="max-w-4xl" className="py-12 sm:py-16 px-6 sm:px-12 flex flex-col items-center text-center overflow-hidden">
          {/* Main card content */}
          <div className="w-full relative overflow-hidden flex flex-col items-center">
          {/* Top glint */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-indigo-400 uppercase mb-4">
            What&apos;s Next?
          </p>

          <h2 className="text-[clamp(2rem,5.5vw,3.5rem)] font-black text-white tracking-tight mb-4 leading-tight max-w-2xl text-glow">
            Ready to build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/60">
              something real?
            </span>
          </h2>

          <p className="text-[14px] sm:text-[15px] text-white/60 max-w-md mx-auto font-light leading-relaxed mb-8 sm:mb-10 text-glow">
            Let’s build something impactful. Reach out for collaborations or opportunities.
          </p>

          {/* Primary CTA — email */}
          <motion.a
            href="mailto:rethankumarcv@gmail.com"
            whileHover={!isMobile ? { scale: 1.03 } : undefined}
            whileTap={{ scale: 0.96 }}
            className="relative group flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full font-bold text-white text-sm sm:text-base tracking-wide overflow-hidden mb-5 min-h-[54px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-fuchsia-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Shimmer sweep on hover */}
            {!isMobile && (
              <motion.div
                className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                initial={{ x: "-110%" }}
                whileHover={{ x: "110%" }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
            <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="relative z-10">Send me an email</span>
          </motion.a>

          {/* Social links */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            {[
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/rethan-kumar-cv",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                label: "GitHub",
                href: "https://github.com/Rethankumar-cv",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={!isMobile ? { scale: 1.04, y: -1 } : undefined}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] active:bg-white/[0.09] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-200 text-white/60 hover:text-white/80 text-[13px] font-semibold min-h-[44px] sm:min-h-[46px] text-glow"
              >
                {icon}
                {label}
              </motion.a>
            ))}
          </div>

          {/* De-emphasized contact form */}
          <div className="w-full border-t border-white/[0.05] pt-7 sm:pt-8">
            <p className="text-[11px] text-white/20 font-medium tracking-wider uppercase mb-5">
              Or send a quick message
            </p>
            <form
              suppressHydrationWarning
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Name"
                  className={INPUT_CLS}
                  disabled={formState !== "idle"}
                />
                <input
                  suppressHydrationWarning
                  type="email"
                  placeholder="Email"
                  className={INPUT_CLS}
                  disabled={formState !== "idle"}
                />
              </div>
              <textarea
                suppressHydrationWarning
                placeholder="Message"
                rows={3}
                className={INPUT_CLS + " resize-none"}
                disabled={formState !== "idle"}
              />
              <motion.button
                suppressHydrationWarning
                type="submit"
                disabled={formState !== "idle"}
                whileTap={formState === "idle" ? { scale: 0.98 } : undefined}
                animate={formState === "sent" ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={
                  "w-full py-3 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-200 " +
                  (formState === "sent"
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                    : formState === "sending"
                    ? "bg-white/[0.03] border-white/[0.06] text-white/20 cursor-not-allowed"
                    : "bg-white/[0.05] hover:bg-white/[0.09] border-white/[0.08] text-white/40 hover:text-white/70")
                }
              >
                {formState === "idle" && "Send Message"}
                {formState === "sending" && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                )}
                {formState === "sent" && "✓ Sent!"}
              </motion.button>
            </form>
          </div>
          </div>
        </GlassContainer>

        <p className="text-center text-[11px] text-neutral-700 font-medium mt-6 tracking-wide">
          © 2026 Rethan Kumar · Built with Next.js & Framer Motion
        </p>
        </motion.div>
      </section>
    </div>
  );
}
