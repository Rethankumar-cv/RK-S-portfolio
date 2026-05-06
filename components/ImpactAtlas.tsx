"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { ArrowUpRight, Trophy, BadgeCheck, Users, MapPin, Activity, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";
import GlassContainer from "@/components/ui/GlassContainer";

type Category = "Competitions" | "Leadership" | "Certifications" | "Community";

interface CardData {
  id: string; title: string; organizer: string; date: string;
  result: string; note: string; isWin?: boolean; featured?: boolean;
  duration?: string; actionText?: string;
  techStack?: string[];
  expandedOverview?: string;
  colSpan?: string;
}

const DATA: Record<Category, CardData[]> = {
  Competitions: [
    { id: "qt3", title: "IEEE QT3 18.0", organizer: "IEEE", date: "2024", result: "1st Place", note: "Won idea pitching against top-tier teams with a fully architected, scalable tech solution.", isWin: true, featured: true, actionText: "View Project", techStack: ["Next.js", "Tailwind", "Framer", "WebSockets"], expandedOverview: "Led a cross-functional team to victory by developing a real-time analytics engine under 24 hours. The architecture successfully handled live data ingestion and visualization.", colSpan: "md:col-span-8" },
    { id: "bytztrom", title: "Bytztrom'25", organizer: "Hackathon", date: "2025", result: "Participant", note: "Rapid prototype built under extreme time constraints in a highly competitive environment.", techStack: ["React", "Node.js", "MongoDB"], expandedOverview: "Competed in a 48-hour intensive coding marathon, conceptualizing and building a functional prototype from scratch focusing on user experience and rapid feature delivery.", colSpan: "md:col-span-4" },
    { id: "hackxelerate", title: "HackXelerate'25", organizer: "Hackathon", date: "2025", result: "Participant", note: "Real-time problem solving and advanced integration in a high-intensity coding marathon.", techStack: ["Python", "FastAPI", "React"], expandedOverview: "Integrated multiple third-party APIs to build a cohesive problem-solving tool under severe time constraints, emphasizing code quality and algorithm efficiency.", colSpan: "md:col-span-5" },
    { id: "yukta", title: "YUKTA'24", organizer: "Paper Presentation", date: "2024", result: "Presenter", note: "Technical research on modern web patterns presented to industry experts and academia.", techStack: ["Markdown", "LaTeX", "Web Standards"], expandedOverview: "Authored and presented a comprehensive technical paper on modern web architecture patterns, receiving positive feedback from academic panels for clarity and depth.", colSpan: "md:col-span-7" },
  ],
  Leadership: [
    { id: "web-master", title: "Web Master", organizer: "IEEE KPRIET SB", date: "2024", duration: "2024 – Present", result: "Lead Role", note: "Architecting digital infrastructure, leading web initiatives, and mentoring junior developers.", featured: true, actionText: "View Profile", colSpan: "md:col-span-7" },
    { id: "digital-lead", title: "Digital Lead", organizer: "SSIT KPRIET", date: "2023", duration: "2023 – 2024", result: "Leadership", note: "Spearheaded digital content strategies, driving engagement and community outreach.", colSpan: "md:col-span-5" },
    { id: "sweet-talkerz", title: "Sweet Talkerz", organizer: "Community Org", date: "2023", result: "Coordinator", note: "Orchestrated large-scale events and streamlined cross-team communication.", colSpan: "md:col-span-12" },
  ],
  Certifications: [
    { id: "infosys", title: "Infosys Springboard", organizer: "Infosys", date: "2023", result: "Verified", note: "Intensive full-stack engineering track covering agile methodologies and modern architectures.", techStack: ["Java", "Spring Boot", "React"], expandedOverview: "Completed a rigorous enterprise-grade training program, building full-stack applications simulating real-world business requirements and scaling challenges.", featured: true, colSpan: "md:col-span-8" },
    { id: "global-certs", title: "Global Certifications", organizer: "Multiple Platforms", date: "2023–2024", result: "Certified", note: "Specialized credentials validating fundamental and advanced technical competencies.", techStack: ["AWS", "Linux", "Networking"], expandedOverview: "Acquired a series of foundational certifications in cloud computing, networking, and system administration to broaden technical versatility.", colSpan: "md:col-span-4" },
  ],
  Community: [
    { id: "browserstack", title: "BrowserStack Meetup", organizer: "BrowserStack · Coimbatore", date: "2024", result: "Attendee", note: "Deep-dive discussions with QA automation experts and frontend performance engineers.", techStack: ["Cypress", "Selenium", "Web Vitals"], expandedOverview: "Engaged with industry leaders on automated testing strategies and frontend optimization techniques, incorporating key learnings into personal projects.", featured: true, colSpan: "md:col-span-7" },
    { id: "ieee-meetups", title: "Tech Community Meetups", organizer: "IEEE & Local Groups", date: "2023–2024", result: "Participant", note: "Active in regional tech discourse, expanding industry knowledge and network.", techStack: ["Open Source", "DevRel"], expandedOverview: "Regularly participated in hackathons, workshops, and panel discussions, fostering relationships within the regional developer ecosystem.", colSpan: "md:col-span-5" },
  ],
};

const CFG: Record<Category, {
  icon: React.ReactNode; accent: string; bgAccent: string; glowSwatch: string; borderActive: string; shadow: string; ambientLight: string;
}> = {
  Competitions: { icon: <Trophy className="w-3.5 h-3.5" />, accent: "text-amber-200", bgAccent: "bg-amber-400", glowSwatch: "from-amber-500/5 to-orange-500/0", borderActive: "hover:border-amber-500/20", shadow: "rgba(245,158,11,0.06)", ambientLight: "bg-amber-500/10" },
  Leadership:   { icon: <Users className="w-3.5 h-3.5" />,  accent: "text-emerald-200", bgAccent: "bg-emerald-400", glowSwatch: "from-emerald-500/5 to-teal-500/0", borderActive: "hover:border-emerald-500/20", shadow: "rgba(16,185,129,0.06)", ambientLight: "bg-emerald-500/10" },
  Certifications: { icon: <BadgeCheck className="w-3.5 h-3.5" />, accent: "text-blue-200", bgAccent: "bg-blue-400", glowSwatch: "from-blue-500/5 to-indigo-500/0", borderActive: "hover:border-blue-500/20", shadow: "rgba(59,130,246,0.06)", ambientLight: "bg-blue-500/10" },
  Community:    { icon: <MapPin className="w-3.5 h-3.5" />,  accent: "text-purple-200", bgAccent: "bg-purple-400", glowSwatch: "from-purple-500/5 to-fuchsia-500/0", borderActive: "hover:border-purple-500/20", shadow: "rgba(168,85,247,0.06)", ambientLight: "bg-purple-500/10" },
};

function MagneticPill({ label, category, isActive, onClick, isMobile }: { label: Category; category: Category; isActive: boolean; onClick: () => void; isMobile: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const cfg = CFG[category];

  return (
    <motion.button
      ref={ref} style={!isMobile ? { x: sx, y: sy } : undefined}
      onClick={onClick}
      onMouseMove={(e) => {
        if (isMobile) return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.15);
        y.set((e.clientY - r.top - r.height / 2) * 0.15);
      }}
      onMouseLeave={() => { if (!isMobile) { x.set(0); y.set(0); } }}
      className={cn(
        "group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-medium transition-all duration-700 select-none tracking-wide",
        isActive 
          ? `bg-white/[0.06] border border-white/[0.1] text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] backdrop-blur-md` 
          : "bg-transparent border border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02] hover:border-white/[0.05]"
      )}
    >
      <span className={cn("transition-colors duration-500", isActive ? cfg.accent : "opacity-40 group-hover:opacity-80")}>{cfg.icon}</span>
      {label}
    </motion.button>
  );
}

function ImpactCard({ card, category, onClick, isHovered, isOtherHovered, onHoverStart, onHoverEnd, isMobile }: { card: CardData; category: Category; onClick?: () => void; isHovered: boolean; isOtherHovered: boolean; onHoverStart: () => void; onHoverEnd: () => void; isMobile: boolean }) {
  const cfg = CFG[category];
  const isLead = category === "Leadership";
  
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(x, { stiffness: 100, damping: 25, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 100, damping: 25, mass: 0.1 });

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    if (isMobile) return;
    const rect = currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Elegant, highly restrained magnetic pull
    x.set((clientX - centerX) * 0.015);
    y.set((clientY - centerY) * 0.015);
    
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    mouseX.set(-1000);
    mouseY.set(-1000);
    onHoverEnd();
  }

  const rotateX = useTransform(springY, [-20, 20], [1, -1]);
  const rotateY = useTransform(springX, [-20, 20], [-1, 1]);

  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.02), transparent 60%)`;
  const borderLight = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 50%)`;

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${card.id}`}
      onClick={!isLead ? onClick : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={!isMobile ? onHoverStart : undefined}
      onMouseLeave={handleMouseLeave}
      style={{ 
        x: springX, 
        y: springY, 
        rotateX: !isMobile ? rotateX : 0, 
        rotateY: !isMobile ? rotateY : 0, 
        transformPerspective: 1000 
      }}
      animate={{
        scale: isHovered && !isMobile ? 1.01 : 1,
        y: isHovered && !isMobile ? -2 : 0,
        opacity: isOtherHovered && !isMobile ? 0.5 : 1,
        filter: isOtherHovered && !isMobile ? "blur(1px)" : "blur(0px)",
        boxShadow: isHovered && !isMobile ? `0 15px 35px ${cfg.shadow}` : `0 0 0 rgba(0,0,0,0)`,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative w-full h-full bg-white/[0.01] rounded-[16px] p-5 sm:p-6 border border-white/[0.04] overflow-hidden flex flex-col transition-colors duration-700 backdrop-blur-md",
        cfg.borderActive,
        !isLead && "cursor-pointer",
        card.colSpan
      )}
    >
      {/* Featured Card Ultra-Subtle Directed Bloom */}
      {card.featured && (
         <div className={cn("absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-[0.03] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.08]", cfg.bgAccent)} />
      )}

      {/* Spotlight and Border Edge Highlight */}
      {!isMobile && (
        <>
          <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />
          <motion.div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: borderLight, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", padding: "1px", borderRadius: "16px" }} />
        </>
      )}

      {/* Slow Moving Glass Reflection Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[16px]">
        <div className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent opacity-0 group-hover:opacity-100 -translate-x-[100%] translate-y-[100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-[1.5s] ease-out" />
      </div>

      {/* Static Gradient Swatch */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-100", cfg.glowSwatch)} />

      <div className="relative z-10 flex flex-col h-full flex-1">
         <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-medium tracking-[0.2em] text-neutral-500 uppercase">{card.date}</span>
            {card.result && (
              <span className={cn("text-[9px] font-semibold uppercase tracking-wider text-neutral-500 transition-colors duration-500",
                isHovered && cfg.accent
              )}>
                {card.result}
              </span>
            )}
         </div>

         <div className="flex-1 flex flex-col">
            <h4 className={cn("font-semibold tracking-tight text-neutral-100 mb-1 group-hover:text-white transition-colors duration-700",
              card.featured ? "text-[16px] sm:text-[18px]" : "text-[15px] sm:text-[16px]"
            )}>{card.title}</h4>
            
            <p className={cn("text-[11px] font-medium text-neutral-500 mb-3 tracking-[0.05em] transition-colors duration-700", isHovered && cfg.accent)}>
              {card.organizer}
            </p>
            
            <p className={cn("text-[12px] text-neutral-400/90 leading-[1.65] font-light group-hover:text-neutral-300 transition-colors duration-700", 
              card.featured ? "max-w-[90%]" : "max-w-full"
            )}>
              {card.note}
            </p>
         </div>

         {/* Premium subtle divider */}
         <div className="w-full h-px bg-gradient-to-r from-white/[0.04] to-transparent mt-5 mb-3" />

         {!isLead && (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-neutral-500 group-hover:text-neutral-200 transition-colors duration-500 uppercase">
              Explore Dossier <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
            </div>
         )}
      </div>
    </motion.div>
  );
}

function AnimatedWaveform({ colorClass }: { colorClass: string }) {
  return (
    <div className="flex items-end gap-[3px] h-3">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={cn("w-[2px] rounded-full opacity-40", colorClass)}
          animate={{ height: ["20%", "100%", "20%"] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ExpandedCard({ card, category, onClose }: { card: CardData; category: Category; onClose: () => void }) {
  const cfg = CFG[category];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose} 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        transition={{ duration: 0.4 }}
      />
      
      <motion.div 
        layoutId={`card-${card.id}`}
        className="relative w-full max-w-3xl bg-black/40 backdrop-blur-2xl border border-white/[0.08] rounded-[24px] shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-500 hover:text-white transition-colors z-50 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="w-full md:w-[40%] p-6 sm:p-10 border-b md:border-b-0 md:border-r border-white/[0.06] relative flex flex-col justify-between overflow-hidden bg-white/[0.01]">
           {/* Calmer ambient background inside modal */}
           <div className={`absolute -top-20 -left-20 w-60 h-60 rounded-full blur-[80px] opacity-[0.05] pointer-events-none ${cfg.bgAccent}`} />
           
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                 <div className={cn("p-2 rounded-md bg-white/[0.02] border border-white/5", cfg.accent)}>{cfg.icon}</div>
                 <span className="text-[9px] font-medium uppercase tracking-widest text-neutral-500">{card.date}</span>
              </div>
              <h3 className="text-[20px] sm:text-[24px] font-medium text-white tracking-tight mb-2 leading-tight">{card.title}</h3>
              <p className={cn("text-[12px] font-medium mb-8 opacity-80", cfg.accent)}>{card.organizer}</p>
              
              {card.actionText && (
                <button className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-neutral-500 hover:text-white transition-colors mt-auto uppercase">
                  {card.actionText} <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
           </div>
        </div>

        <div className="w-full md:w-[60%] p-6 sm:p-10 bg-black/20 flex flex-col justify-center">
           <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}>
             
             <h4 className="text-[9px] font-medium tracking-[0.2em] text-neutral-500 uppercase mb-3">Intelligence Brief</h4>
             <p className="text-[13px] font-light text-neutral-400 leading-[1.7] mb-8">
               {card.expandedOverview || card.note}
             </p>

             <h4 className="text-[9px] font-medium tracking-[0.2em] text-neutral-500 uppercase mb-3">Technologies</h4>
             <div className="flex flex-wrap gap-1.5 mb-10">
               {card.techStack?.map((tech, i) => (
                 <motion.div 
                   key={tech} 
                   initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                   className="px-2.5 py-1 rounded-[6px] bg-white/[0.02] border border-white/[0.04] text-[10px] font-medium tracking-wide text-neutral-400"
                 >
                   {tech}
                 </motion.div>
               ))}
               {!card.techStack && <span className="text-[11px] text-neutral-500 font-light">N/A</span>}
             </div>

             <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.015] border border-white/[0.02]">
                <div>
                   <div className="text-[9px] font-medium tracking-widest text-neutral-500 mb-2 uppercase">Impact Signal</div>
                   <AnimatedWaveform colorClass={cfg.bgAccent} />
                </div>
                <Activity className={cn("w-4 h-4 opacity-30", cfg.accent)} />
             </div>

           </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const CATEGORIES: Category[] = ["Competitions", "Leadership", "Certifications", "Community"];

export default function ImpactAtlas() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<Category | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<{ card: CardData, category: Category } | null>(null);

  const { scrollYProgress } = useScroll();
  const scrollGlowY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div className="flex justify-center w-full px-4 relative z-[2] py-20 sm:py-28">
      
      {/* Scroll & Hover Responsive Background Atmosphere - Inheriting Global Liquid Glass */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <AnimatePresence>
          {active && (
            <motion.div 
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ y: scrollGlowY }}
            >
              {/* Ultra refined, focused, color-travel background bloom */}
              <div className={cn("w-[40%] h-[40%] rounded-full blur-[140px] mix-blend-screen opacity-15", CFG[active].ambientLight)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wrapping the entire section in the premium GlassContainer (identical to Projects section) */}
      <GlassContainer maxWidth="max-w-[1050px]" className="p-6 sm:p-10 lg:px-12 lg:py-12 flex flex-col z-10 w-full relative border-white/[0.06]">
        <div className="text-center mb-12 sm:mb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-center gap-3 mb-5">
               <span className="text-[10px] font-medium tracking-[0.2em] text-indigo-400/80 uppercase">Intelligence Map</span>
            </div>
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-medium text-white tracking-tight leading-tight mb-4 drop-shadow-sm">
              Impact {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-90">
                Atlas
              </span>
            </h2>
            <p className="text-[13px] sm:text-[14px] text-neutral-500 font-light mt-2 max-w-sm mx-auto text-center leading-[1.7]">
              A curated timeline of professional momentum, technical milestones, and leadership initiatives.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center mb-10 w-full">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map(cat => (
              <MagneticPill key={cat} label={cat} category={cat} isActive={active === cat} onClick={() => setActive(p => p === cat ? null : cat)} isMobile={isMobile} />
            ))}
          </motion.div>
        </div>

        <div className="w-full min-h-[350px] flex justify-center">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active}
                initial="hidden" animate="visible" exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } }
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 w-full relative z-10"
              >
                {DATA[active].map(card => (
                  <motion.div 
                    key={card.id}
                    className={cn(card.colSpan)}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                      exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
                    }}
                  >
                    <ImpactCard 
                      card={card} 
                      category={active} 
                      onClick={() => setExpandedCard({ card, category: active })} 
                      isHovered={hoveredCardId === card.id}
                      isOtherHovered={hoveredCardId !== null && hoveredCardId !== card.id}
                      onHoverStart={() => setHoveredCardId(card.id)}
                      onHoverEnd={() => setHoveredCardId(null)}
                      isMobile={isMobile}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-20 text-center relative z-10 w-full"
              >
                 <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.25em]">Awaiting Selection</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassContainer>

      <AnimatePresence>
         {expandedCard && (
           <ExpandedCard 
              card={expandedCard.card} 
              category={expandedCard.category} 
              onClose={() => setExpandedCard(null)} 
           />
         )}
      </AnimatePresence>
    </div>
  );
}
