"use client";

import { motion, Variants } from "framer-motion";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left Column: Text Content */}
      <div className="space-y-8">
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3">About Me</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Engineering <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">at the edge of design.</span>
          </h3>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6 text-lg">
          <p className="text-neutral-400 font-light leading-relaxed">
            I am a hybrid <strong className="text-white/90 font-medium tracking-wide">UI/UX Designer & Front-End Developer</strong>. 
            I bridge the gap between creative vision and technical reality, building interfaces that feel as good as they look.
          </p>
          <p className="text-neutral-400/80 font-light leading-relaxed">
            What sets me apart is my obsession with motion and state design. I believe an interface is only truly finished 
            when the micro-interactions feel organic—treating digital elements like physical material.
          </p>
        </motion.div>
      </div>

      {/* Right Column: Visual / Glass Panel */}
      <motion.div 
        variants={itemVariants}
        className="relative flex justify-center lg:justify-end"
      >
        {/* Soft backdrop glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full z-0 pointer-events-none" />

        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="relative glass p-1.5 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            {/* Abstract shape illustration in glass card */}
            <div className="aspect-[4/5] rounded-2xl bg-black/40 relative overflow-hidden flex flex-col items-center justify-center border border-white/5 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 via-transparent to-transparent z-0" />
              
              {/* Floating geometric elements within the card */}
              <motion.div 
                className="absolute w-40 h-40 bg-fuchsia-500/20 mix-blend-screen blur-[30px] rounded-full"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="w-28 h-28 border border-white/20 rounded-full flex items-center justify-center bg-white/[0.02] backdrop-blur-md relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">RK</span>
              </div>
              
              {/* Fake UI placeholders tracking the bottom */}
              <div className="absolute bottom-8 left-8 right-8 z-10 space-y-3 opacity-60">
                <div className="h-2 w-1/3 bg-white/30 rounded-full" />
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-4/5 bg-white/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Little floating element overlay */}
          <motion.div 
            className="absolute -bottom-6 -left-6 lg:-left-10 glass px-6 py-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-white/90 tracking-widest uppercase">System Active</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
