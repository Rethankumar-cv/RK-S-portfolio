"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Trophy, BadgeCheck, Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Competitions" | "Leadership" | "Certifications" | "Community";

interface CardData {
  id: string; title: string; organizer: string; date: string;
  result: string; note: string; isWin?: boolean; featured?: boolean;
  duration?: string; actionText?: string;
}

const DATA: Record<Category, CardData[]> = {
  Competitions: [
    { id: "qt3", title: "IEEE QT3 18.0", organizer: "IEEE", date: "2024", result: "1st Place", note: "Won idea pitching against top-tier teams with a fully architected, scalable tech solution.", isWin: true, featured: true, actionText: "View Project" },
    { id: "bytztrom", title: "Bytztrom'25 Hackathon", organizer: "Bytztrom", date: "2025", result: "Participant", note: "Rapid prototype built under extreme time constraints in a highly competitive environment." },
    { id: "hackxelerate", title: "HackXelerate'25", organizer: "HackXelerate", date: "2025", result: "Participant", note: "Real-time problem solving and advanced integration in a high-intensity coding marathon." },
    { id: "yukta", title: "YUKTA'24", organizer: "Paper Presentation", date: "2024", result: "Presenter", note: "Technical research on modern web patterns presented to industry experts and academia." },
  ],
  Leadership: [
    { id: "web-master", title: "Web Master", organizer: "IEEE KPRIET SB", date: "2024", duration: "2024 – Present", result: "Lead Role", note: "Architecting digital infrastructure, leading web initiatives, and mentoring junior developers.", featured: true, actionText: "View Profile" },
    { id: "digital-lead", title: "Digital Lead", organizer: "SSIT KPRIET", date: "2023", duration: "2023 – 2024", result: "Leadership", note: "Spearheaded digital content strategies, driving engagement and community outreach." },
    { id: "sweet-talkerz", title: "Sweet Talkerz", organizer: "Community Org", date: "2023", result: "Coordinator", note: "Orchestrated large-scale events and streamlined cross-team communication." },
  ],
  Certifications: [
    { id: "infosys", title: "Infosys Springboard", organizer: "Infosys", date: "2023", result: "Verified", note: "Intensive full-stack engineering track covering agile methodologies and modern architectures." },
    { id: "global-certs", title: "Global Certifications", organizer: "Multiple Platforms", date: "2023–2024", result: "Certified", note: "Specialized credentials validating fundamental and advanced technical competencies." },
  ],
  Community: [
    { id: "browserstack", title: "BrowserStack Meetup", organizer: "BrowserStack · Coimbatore", date: "2024", result: "Attendee", note: "Deep-dive discussions with QA automation experts and frontend performance engineers." },
    { id: "ieee-meetups", title: "Tech Community Meetups", organizer: "IEEE & Local Groups", date: "2023–2024", result: "Participant", note: "Active in regional tech discourse, expanding industry knowledge and network." },
  ],
};

const CFG: Record<Category, {
  icon: React.ReactNode; accent: string; glow: string;
  pillActive: string; cardGlow: string; bgGrad: string;
}> = {
  Competitions: { icon: <Trophy className="w-4 h-4" />, accent: "text-yellow-400", glow: "rgba(234,179,8,0.18)", pillActive: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300", cardGlow: "from-yellow-500/8 to-transparent", bgGrad: "from-yellow-500/5 via-transparent to-transparent" },
  Leadership:   { icon: <Users className="w-4 h-4" />,  accent: "text-emerald-400", glow: "rgba(16,185,129,0.18)", pillActive: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300", cardGlow: "from-emerald-500/8 to-transparent", bgGrad: "from-emerald-500/5 via-transparent to-transparent" },
  Certifications: { icon: <BadgeCheck className="w-4 h-4" />, accent: "text-blue-400", glow: "rgba(99,102,241,0.18)", pillActive: "border-blue-500/40 bg-blue-500/10 text-blue-300", cardGlow: "from-blue-500/8 to-transparent", bgGrad: "from-blue-500/5 via-transparent to-transparent" },
  Community:    { icon: <MapPin className="w-4 h-4" />,  accent: "text-purple-400", glow: "rgba(168,85,247,0.18)", pillActive: "border-purple-500/40 bg-purple-500/10 text-purple-300", cardGlow: "from-purple-500/8 to-transparent", bgGrad: "from-purple-500/5 via-transparent to-transparent" },
};

// Per-category animation variants
const VARIANTS: Record<Category, { container: Variants; item: Variants }> = {
  Competitions: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.04 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, scale: 0.4, y: 24 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 440, damping: 22 } }, exit: { opacity: 0, scale: 0.85, transition: { duration: 0.16 } } },
  },
  Leadership: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.04 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, y: 64 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 28 } }, exit: { opacity: 0, y: -16, transition: { duration: 0.2 } } },
  },
  Certifications: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.04 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }, exit: { opacity: 0, y: -12, transition: { duration: 0.18 } } },
  },
  Community: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.04 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, y: 28, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }, exit: { opacity: 0, filter: "blur(6px)", transition: { duration: 0.22 } } },
  },
};

// Magnetic pill button
function MagneticPill({ label, category, isActive, onClick }: { label: Category; category: Category; isActive: boolean; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const cfg = CFG[category];

  return (
    <motion.button
      ref={ref} style={{ x: sx, y: sy }}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.28);
        y.set((e.clientY - r.top - r.height / 2) * 0.28);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
      className={cn(
        "relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 select-none",
        isActive ? cfg.pillActive : "bg-white/[0.02] border-white/[0.08] text-white/40 hover:text-white/65 hover:bg-white/[0.05]"
      )}
    >
      {isActive && (
        <motion.div layoutId="cat-pill" className="absolute inset-0 rounded-full -z-10 blur-lg opacity-60" style={{ background: cfg.glow }} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
      )}
      <span className={cn("transition-colors", isActive ? cfg.accent : "opacity-60")}>{cfg.icon}</span>
      {label}
    </motion.button>
  );
}

// Unified card renderer
function ImpactCard({ card, category }: { card: CardData; category: Category }) {
  const cfg = CFG[category];
  const isComp = category === "Competitions";
  const isCert = category === "Certifications";
  const isLead = category === "Leadership";
  const isComm = category === "Community";

  return (
    <motion.div
      variants={VARIANTS[category].item}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.22 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-500",
        // Competitions: big featured or normal
        isComp && card.isWin && "border-yellow-500/25 bg-gradient-to-br from-yellow-500/8 to-transparent shadow-[0_0_48px_rgba(234,179,8,0.07)] p-7 sm:p-8",
        isComp && !card.isWin && "border-white/[0.07] bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.04] p-6",
        // Leadership
        isLead && "border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent hover:border-emerald-500/20 hover:shadow-[0_8px_32px_rgba(16,185,129,0.05)] p-6 sm:p-7",
        // Certifications
        isCert && "border-white/[0.07] bg-white/[0.02] hover:border-blue-500/20 hover:bg-blue-500/[0.02] p-5 sm:p-6",
        // Community
        isComm && "border-white/[0.05] bg-white/[0.01] hover:border-purple-500/15 p-6 sm:p-8",
      )}
    >
      {/* Win marker */}
      {card.isWin && (
        <div className="absolute top-5 right-5 flex items-center gap-1.5 text-yellow-400">
          <Trophy className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black tracking-[0.18em] uppercase">Win</span>
        </div>
      )}

      <div className="flex flex-col gap-4 h-full">
        {/* Header meta */}
        <div className="flex items-center gap-3">
          {isCert && <div className={cn("p-2 rounded-lg bg-blue-500/10", cfg.accent)}><BadgeCheck className="w-4 h-4" /></div>}
          {isComm && <div className={cn("p-2 rounded-full bg-purple-500/10", cfg.accent)}><MapPin className="w-3.5 h-3.5" /></div>}
          <span className="text-[10px] font-mono text-white/25 tracking-widest">{card.date}</span>
          {card.result && (
            <span className={cn("ml-auto text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border",
              isComp && card.isWin ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" :
              isLead ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400/80" :
              isCert ? "border-blue-500/20 bg-blue-500/5 text-blue-400/80" :
              "border-purple-500/15 text-purple-400/70"
            )}>{card.result}</span>
          )}
        </div>

        {/* Title + org */}
        <div>
          <h4 className={cn("font-bold tracking-tight leading-tight mb-1",
            card.featured || card.isWin ? "text-xl sm:text-2xl text-white" : "text-lg sm:text-xl text-white/88"
          )}>{card.title}</h4>
          <p className={cn("text-sm font-medium", isLead ? "text-emerald-400/70" : isComm ? "text-purple-300/60" : "text-white/38")}>
            {card.organizer}
          </p>
          {card.duration && <p className="text-[11px] font-mono text-white/22 mt-0.5">{card.duration}</p>}
        </div>

        <p className="text-sm text-white/48 leading-relaxed group-hover:text-white/65 transition-colors flex-1">{card.note}</p>

        {card.actionText && (
          <button className={cn("self-start flex items-center gap-1.5 text-xs font-semibold transition-colors",
            `${cfg.accent} opacity-50 group-hover:opacity-100`
          )}>
            {card.actionText} <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

const CATEGORIES: Category[] = ["Competitions", "Leadership", "Certifications", "Community"];

export default function ImpactAtlas() {
  const [active, setActive] = useState<Category | null>(null);

  const toggle = (cat: Category) => setActive(p => p === cat ? null : cat);

  return (
    <section className="py-28 sm:py-36 w-full overflow-hidden relative">
      {/* Animated ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ x: [0, 28, 0], y: [0, -18, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[12%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px]" />
        <motion.div animate={{ x: [0, -22, 0], y: [0, 22, 0] }} transition={{ duration: 27, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[5%] right-[8%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[130px]" />
        <AnimatePresence>
          {active && (
            <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
              className={cn("absolute inset-0 bg-gradient-to-br", CFG[active].bgGrad)} />
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">

        {/* CENTERED HERO HEADER */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-6 bg-indigo-400/40" />
              <span className="text-[11px] font-semibold tracking-[0.24em] text-indigo-400 uppercase">Career Signals</span>
              <div className="h-px w-6 bg-indigo-400/40" />
            </div>
            <h3 className="text-[clamp(3rem,7vw,5.5rem)] font-black text-white tracking-tighter leading-[1.0] mb-5">
              Impact{" "}
              <span className="font-thin text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/15">Atlas.</span>
            </h3>
            <p className="text-base sm:text-lg text-white/40 font-light max-w-sm mx-auto">
              Proof of wins, leadership, and growth beyond code.
            </p>
          </motion.div>
        </div>

        {/* CATEGORY PILLS */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map(cat => (
            <MagneticPill key={cat} label={cat} category={cat} isActive={active === cat} onClick={() => toggle(cat)} />
          ))}
        </motion.div>

        {/* INITIAL PROMPT STATE */}
        <AnimatePresence>
          {!active && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              className="text-center py-8">
              <p className="text-sm text-white/20 tracking-widest font-medium uppercase">
                Select a category to explore
              </p>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 mx-auto w-px h-8 bg-gradient-to-b from-white/15 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CARD REVEAL AREA */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active}
              variants={VARIANTS[active].container}
              initial="hidden" animate="visible" exit="exit"
              className={cn(
                "grid gap-5 sm:gap-6",
                active === "Competitions" && "grid-cols-1 sm:grid-cols-2",
                active === "Leadership"   && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                active === "Certifications" && "grid-cols-1 sm:grid-cols-2",
                active === "Community"    && "grid-cols-1 sm:grid-cols-2",
              )}
            >
              {DATA[active].map(card => (
                <ImpactCard key={card.id} card={card} category={active} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
