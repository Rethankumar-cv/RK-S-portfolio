"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

export default function Contact() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full relative flex justify-center px-4">
      
      {/* Ambient background glow bound specifically to the contact structural frame */}
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      )}

      <motion.div 
        initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="w-full max-w-4xl glass p-6 sm:p-12 md:p-20 rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative overflow-hidden text-center flex flex-col items-center"
      >
        {/* Subtle glass reflection map on top edge */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

        <h2 className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3 sm:mb-5 relative z-10">What&apos;s Next?</h2>
        <h3 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-white tracking-tight mb-4 sm:mb-6 relative z-10 leading-tight">
          Let&apos;s build something <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">extraordinary.</span>
        </h3>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed mb-10 sm:mb-12 relative z-10">
          Whether you have a groundbreaking idea, a question about my technical architecture, or just want to connect—my inbox is always open.
        </p>

        {/* Action Button */}
        <div className="flex justify-center relative z-10 mb-12 sm:mb-16 w-full">
          <motion.a 
            whileHover={!isMobile ? { scale: 1.05 } : undefined}
            whileTap={{ scale: 0.95 }}
            href="mailto:hello@example.com"
            className="group relative px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto bg-white/[0.05] hover:bg-white/10 active:bg-white/10 border border-white/20 rounded-full font-bold text-base sm:text-lg text-white transition-all overflow-hidden flex items-center justify-center gap-3 backdrop-blur-md shadow-2xl"
          >
            {!isMobile && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />}
            <span className="relative z-10 tracking-wide">Say Hello</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 sm:group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </motion.a>
        </div>

        {/* Minimal Integrated Form (Optional Usage) */}
        <div className="w-full flex justify-center relative z-10 mb-10 sm:mb-16 px-4 sm:px-12 py-6 sm:p-8 glass bg-[#050505]/50 border border-white/5 rounded-3xl">
          <form suppressHydrationWarning className="w-full flex flex-col gap-4 sm:gap-5" onSubmit={(e) => e.preventDefault()}>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
               <input suppressHydrationWarning type="text" placeholder="Name" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all" />
               <input suppressHydrationWarning type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all" />
             </div>
             <textarea suppressHydrationWarning placeholder="Your message..." rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all resize-none" />
             <motion.button 
               suppressHydrationWarning
               whileHover={!isMobile ? { scale: 1.01 } : undefined}
               whileTap={{ scale: 0.99 }}
               className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
             >
               Send Message
             </motion.button>
          </form>
        </div>

        {/* Deep Footer / Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 pt-8 sm:pt-10 border-t border-white/10 w-full">
           <span className="text-neutral-500 text-sm font-medium">© 2026 Developed with Next.js & Framer Motion</span>
           
           <div className="flex gap-6">
             <a href="#" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold tracking-wide hover:-translate-y-0.5 transform duration-200">
               <svg className="w-5 h-5 bg-white/5 p-1 rounded-sm border border-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
               LinkedIn
             </a>
             <a href="#" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold tracking-wide hover:-translate-y-0.5 transform duration-200">
               <svg className="w-5 h-5 bg-white/5 p-1 rounded-full border border-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
               GitHub
             </a>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
