"use client";

import { motion, Variants } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } }
};

export default function Experience() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="text-center mb-12 sm:mb-20 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3">Milestones</h2>
          <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-loose">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Achievements</span>
          </h3>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
      >
        {/* Full Width Featured: Internship */}
        <motion.div 
           variants={itemVariants} 
           whileHover={!isMobile ? { y: -4 } : undefined} 
           whileTap={isMobile ? { scale: 0.98 } : undefined}
           transition={{ type: "spring", stiffness: 300 }} 
           className="md:col-span-2 relative group w-full"
        >
           {!isMobile && <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl blur-xl -z-10" />}
           
           <div className={cn(
             "glass p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-indigo-500/40 shadow-xl transition-all w-full relative overflow-hidden flex flex-col md:flex-row gap-6 sm:gap-8 justify-between items-start md:items-center",
             isMobile && "active:border-indigo-500/40 active:bg-white/[0.05]"
           )}>
             
             {/* Decorative Background Blob */}
             <div className="absolute -top-32 -right-32 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700" />
             
             <div className="relative z-10 flex-grow">
               <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
                 <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-inner">
                   Internship
                 </span>
                 <span className="text-neutral-400 text-xs sm:text-sm font-medium tracking-wide">2025 – Present</span>
               </div>
               
               <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 tracking-tight group-hover:text-indigo-50 transition-colors">Front-End Engineering Intern</h4>
               <p className="text-base sm:text-lg text-indigo-200/80 font-medium mb-3 sm:mb-4">@ Acme Vanguard Tech</p>
               
               <p className="text-neutral-400 font-light leading-relaxed max-w-2xl text-[13px] sm:text-base">
                 Spearheaded the migration of legacy dashboard states into a unified React structural architecture. 
                 Optimized global layout shift metrics dramatically and pioneered a modular component library used by 3 separate internal divisions.
               </p>
             </div>
             
             {/* Floating Icon Node */}
             <div className="relative z-10 shrink-0 hidden sm:flex">
               <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-[#030303] border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-300">
                  <svg className="w-6 sm:w-8 h-6 sm:h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </div>
             </div>
           </div>
        </motion.div>

        {/* Hackathons Card */}
        <motion.div 
          variants={itemVariants} 
          whileHover={!isMobile ? { y: -4 } : undefined} 
          whileTap={isMobile ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 300 }} 
          className="relative group w-full h-full"
        >
           {!isMobile && <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl blur-xl -z-10" />}
           
           <div className={cn(
             "glass h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-fuchsia-500/30 transition-all w-full flex flex-col relative overflow-hidden shadow-lg",
             isMobile && "active:border-fuchsia-500/30 active:bg-white/[0.05]"
           )}>
             
             <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
                <span className="px-3 py-1 bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-inner">
                  Hackathons
                </span>
             </div>

             <div className="space-y-6 relative z-10">
               {/* 1st Place */}
               <div className="relative border-l border-white/10 pl-5 pb-2 sm:pb-4">
                 <div className="absolute -left-[5px] top-[6px] w-[9px] h-[9px] rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.8)]" />
                 <h5 className="text-base sm:text-lg font-bold text-white mb-1 tracking-wide">1st Place – Web3 Global Build</h5>
                 <p className="text-neutral-500 text-[10px] sm:text-xs font-semibold tracking-wider mb-2 uppercase">Dec 2024</p>
                 <p className="text-neutral-400 font-light text-[13px] sm:text-sm leading-relaxed">
                   Engineered a decentralized exchange interface with sub-millisecond wallet sync updates. Beating over 400 competing international teams.
                 </p>
               </div>
               
               {/* Finalist */}
               <div className="relative border-l border-white/10 pl-5">
                 <div className="absolute -left-[5px] top-[6px] w-[9px] h-[9px] rounded-full bg-neutral-600 group-hover:bg-fuchsia-400/50 transition-colors" />
                 <h5 className="text-base sm:text-lg font-bold text-white mb-1 tracking-wide">Finalist – AI Design Jam</h5>
                 <p className="text-neutral-500 text-[10px] sm:text-xs font-semibold tracking-wider mb-2 uppercase">Sep 2024</p>
                 <p className="text-neutral-400 font-light text-[13px] sm:text-sm leading-relaxed">
                   Prototyped a generative AI layout tool. Recognized uniquely for achieving the highest interface usability scores.
                 </p>
               </div>
             </div>
             
           </div>
        </motion.div>

        {/* Certifications Card */}
        <motion.div 
          variants={itemVariants} 
          whileHover={!isMobile ? { y: -4 } : undefined} 
          whileTap={isMobile ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 300 }} 
          className="relative group w-full h-full"
        >
           {!isMobile && <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl blur-xl -z-10" />}
           
           <div className={cn(
             "glass h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-emerald-500/30 transition-all w-full flex flex-col relative overflow-hidden shadow-lg",
             isMobile && "active:border-emerald-500/30 active:bg-white/[0.05]"
           )}>
             
             <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-inner">
                  Certifications
                </span>
             </div>

             <div className="space-y-3 sm:space-y-4 relative z-10 flex flex-col flex-grow justify-center">
               
               {/* AWS Cert */}
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 sm:group-hover:bg-white/[0.04] transition-colors">
                 <div className="w-10 sm:w-12 h-10 sm:h-12 shrink-0 rounded-full bg-[#030303] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
                   <svg className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <div>
                   <h5 className="text-[15px] sm:text-lg font-bold text-white tracking-wide">AWS Developer</h5>
                   <p className="text-neutral-400 text-[11px] sm:text-sm font-medium mt-0.5 sm:mt-1">Amazon Web Services</p>
                 </div>
               </div>

               {/* Meta Cert */}
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 sm:group-hover:bg-white/[0.04] transition-colors">
                 <div className="w-10 sm:w-12 h-10 sm:h-12 shrink-0 rounded-full bg-[#030303] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
                   <svg className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                 </div>
                 <div>
                   <h5 className="text-[15px] sm:text-lg font-bold text-white tracking-wide">Meta Front-End Pro</h5>
                   <p className="text-neutral-400 text-[11px] sm:text-sm font-medium mt-0.5 sm:mt-1">Coursera / Meta</p>
                 </div>
               </div>
               
             </div>
             
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
