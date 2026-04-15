"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import GlassCard from "@/components/ui/glass/GlassCard";
import GlassInput from "@/components/ui/glass/GlassInput";
import GlassButton from "@/components/ui/glass/GlassButton";
import GlassPill from "@/components/ui/glass/GlassPill";

export default function Contact() {
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(false);

    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);
    // Simulate send
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">
        
        {/* ── Left Panel (55%) ── */}
        <div className="space-y-10 pt-4">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="space-y-6"
           >
              <GlassPill variant="ultra" tint="indigo" className="px-6 py-2 border-white/10">
                 Available now
              </GlassPill>
              
              <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white tracking-tighter leading-[0.9] pr-8">
                 Let&apos;s build<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">something real.</span>
              </h2>
              
              <p className="text-xl text-neutral-500 font-light leading-relaxed max-w-md">
                 Currently seeking full-time opportunities at design-led engineering teams. Open for freelance collaborations.
              </p>
           </motion.div>

           <div className="space-y-4">
              <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest pl-1">Preferred Channels</p>
              <div className="flex flex-wrap gap-3">
                 <GlassButton 
                   variant="ultra" 
                   className="border-white/10"
                   onClick={() => window.location.href = "mailto:rethankumar.cv@gmail.com"}
                 >
                    <svg className="w-4 h-4 mr-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2} /></svg>
                    Email me
                 </GlassButton>
                 
                 <GlassButton 
                   variant="ultra" 
                   className="border-white/10"
                   onClick={() => window.open("https://linkedin.com", "_blank")}
                 >
                    LinkedIn
                 </GlassButton>
                 <GlassButton 
                   variant="ultra" 
                   className="border-white/10"
                   onClick={() => window.open("https://github.com/Rethankumar-cv", "_blank")}
                 >
                    GitHub
                 </GlassButton>
              </div>
           </div>
        </div>

        {/* ── Right Panel (45%) ── */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
           <GlassCard variant="medium" className="p-8 sm:p-12 border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                 <GlassInput 
                    label="How shall I call you?" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    error={formError && !formData.name ? "Your name is missing" : undefined}
                 />
                 <GlassInput 
                    label="Work Email" 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    error={formError && !formData.email ? "Invalid email address" : undefined}
                 />
                 <GlassInput 
                    label="The Project / Brief" 
                    isTextArea
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    error={formError && !formData.message ? "Tell me a bit more first" : undefined}
                 />
                 
                 <div className="pt-4">
                    <GlassButton 
                      type="submit"
                      variant="frosted" 
                      tint="indigo" 
                      className="w-full h-14"
                      disabled={isSubmitting || isSuccess}
                    >
                       <AnimatePresence mode="wait">
                          {isSuccess ? (
                            <motion.span 
                              key="success"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 text-emerald-400"
                            >
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                               Message Delivered
                            </motion.span>
                          ) : isSubmitting ? (
                            <motion.span key="loading" className="flex items-center gap-3">
                               <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                               Transmitting...
                            </motion.span>
                          ) : (
                            <motion.span key="idle">Dispatch Inquiry</motion.span>
                          )}
                       </AnimatePresence>
                    </GlassButton>
                 </div>
              </form>
           </GlassCard>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-40 border-t border-white/5 py-12 px-8 flex justify-center">
         <GlassCard variant="ultra" className="w-full max-w-7xl px-8 py-6 rounded-3xl border-white/5 shadow-none backdrop-blur-[60px] flex flex-col sm:flex-row items-center justify-between gap-6 overflow-visible">
            <p className="text-[11px] font-bold text-neutral-600 uppercase tracking-[0.3em]">
               © 2026 · Rethan Kumar · Engineered for the web
            </p>
            
            <div className="flex gap-8">
               <a href="#" className="text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">Vercel</a>
               <a href="#" className="text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">GitHub</a>
               <a href="#" className="text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">Resume</a>
            </div>
         </GlassCard>
      </footer>
    </div>
  );
}
