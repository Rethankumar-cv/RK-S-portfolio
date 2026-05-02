"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Trophy, BadgeCheck, Users, MapPin, Target, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseCategory = "Competitions" | "Certifications" | "Community" | "Leadership";
type FilterCategory = "All" | "Wins" | BaseCategory;

interface ImpactCard {
  id: string;
  category: BaseCategory;
  isWin?: boolean;
  title: string;
  organizer: string;
  date: string;
  roleOrOutcome?: string;
  note: string;
  actionText?: string;
  highlight?: boolean;
}

const IMPACT_DATA: ImpactCard[] = [
  {
    id: "qt3",
    category: "Competitions",
    isWin: true,
    title: "IEEE QT3 18.0",
    organizer: "IEEE",
    date: "2024",
    roleOrOutcome: "1st Place Winner",
    note: "Secured first place in idea pitching against top-tier teams by presenting a fully architected, scalable tech solution.",
    actionText: "View project",
    highlight: true,
  },
  {
    id: "web-master",
    category: "Leadership",
    title: "Web Master",
    organizer: "IEEE KPRIET SB",
    date: "2024 - Present",
    roleOrOutcome: "Lead Role",
    note: "Architecting and managing the digital infrastructure, leading web initiatives, and guiding junior developers.",
    actionText: "View profile",
    highlight: true,
  },
  {
    id: "infosys",
    category: "Certifications",
    title: "Infosys Springboard",
    organizer: "Infosys",
    date: "2023",
    roleOrOutcome: "Verified Credential",
    note: "Completed an intensive software engineering track, mastering full-stack architectures and agile methodologies.",
  },
  {
    id: "bytztrom",
    category: "Competitions",
    title: "Bytztrom’25 Hackathon",
    organizer: "Bytztrom",
    date: "2025",
    roleOrOutcome: "Participant",
    note: "Developed and deployed a rapid prototype under extreme time constraints in a highly competitive environment.",
  },
  {
    id: "browserstack",
    category: "Community",
    title: "BrowserStack Meetup",
    organizer: "BrowserStack",
    date: "Coimbatore",
    roleOrOutcome: "Attendee",
    note: "Engaged in deep-dive discussions with QA automation experts and frontend performance engineers.",
  },
  {
    id: "digital-lead",
    category: "Leadership",
    title: "Digital Lead",
    organizer: "SSIT KPRIET",
    date: "2023 - 2024",
    roleOrOutcome: "Leadership",
    note: "Spearheaded digital content strategies, driving engagement and managing technical community outreach.",
  },
  {
    id: "hackxelerate",
    category: "Competitions",
    title: "HackXelerate’25",
    organizer: "HackXelerate",
    date: "2025",
    roleOrOutcome: "Participant",
    note: "Showcased advanced integration skills and real-time problem solving in a high-intensity coding marathon.",
  },
  {
    id: "global-certs",
    category: "Certifications",
    title: "Global Certifications",
    organizer: "Multiple Platforms",
    date: "2023 - 2024",
    roleOrOutcome: "Certified",
    note: "Accumulated specialized global certifications validating both fundamental and advanced technical competencies.",
  },
  {
    id: "yukta",
    category: "Competitions",
    title: "YUKTA’24 Paper Presentation",
    organizer: "YUKTA",
    date: "2024",
    roleOrOutcome: "Presenter",
    note: "Authored and presented technical research on modern web patterns to a panel of industry experts and academia.",
  },
  {
    id: "sweet-talkerz",
    category: "Leadership",
    title: "Sweet Talkerz",
    organizer: "Community Org",
    date: "2023",
    roleOrOutcome: "Coordinator",
    note: "Orchestrated large-scale event operations, streamlining communication between diverse technical teams.",
  },
  {
    id: "ieee-meetups",
    category: "Community",
    title: "Tech Community Meetups",
    organizer: "IEEE & Local Groups",
    date: "2023 - 2024",
    roleOrOutcome: "Participant",
    note: "Active participant in regional tech discourse, continuously expanding industry knowledge and network.",
  }
];

const FILTERS: FilterCategory[] = ["All", "Wins", "Leadership", "Competitions", "Certifications", "Community"];

const getCategoryIcon = (category: BaseCategory | "Wins") => {
  switch (category) {
    case "Wins": return <Trophy className="w-3.5 h-3.5" />;
    case "Competitions": return <Target className="w-3.5 h-3.5" />;
    case "Certifications": return <BadgeCheck className="w-3.5 h-3.5" />;
    case "Community": return <MapPin className="w-3.5 h-3.5" />;
    case "Leadership": return <Users className="w-3.5 h-3.5" />;
    default: return <Sparkles className="w-3.5 h-3.5" />;
  }
};

export default function ImpactAtlas() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredData = IMPACT_DATA.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Wins") return item.isWin;
    return item.category === activeFilter;
  });

  return (
    <section className="py-24 sm:py-32 flex justify-center w-full px-4 sm:px-8 overflow-hidden relative">
      {/* Editorial Depth Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/5 rounded-[100%] blur-[100px] rotate-45 pointer-events-none" />
      </div>

      <div className="max-w-6xl w-full z-10 relative">
        {/* Section Header - Editorial Style */}
        <div className="mb-20 sm:mb-28 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-indigo-500/50" />
              <span className="text-xs font-medium tracking-[0.2em] text-indigo-400 uppercase">Career Signals</span>
            </div>
            <h3 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-tighter leading-[1.1] mb-6">
              Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/30 font-light">Atlas.</span>
            </h3>
            <p className="text-lg sm:text-xl text-white/50 font-light leading-relaxed max-w-xl">
              A curated snapshot of wins, continuous learning, leadership, and community participation. Proof of work, beyond the code.
            </p>
          </motion.div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-24 z-30 mb-16 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto hide-scrollbar pb-4 sm:pb-0">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl shadow-2xl">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="impact-filter"
                        className="absolute inset-0 bg-white/[0.08] border border-white/[0.1] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.03)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={cn(
                      "relative z-10 flex items-center gap-2",
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                    )}>
                      {filter === "Wins" && <Trophy className="w-3.5 h-3.5" />}
                      {filter}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline / Proof Map Hybrid Layout */}
        <div className="relative">
          {/* Vertical Spine (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent -translate-x-1/2" />

          <div className="flex flex-col space-y-12 sm:space-y-16 md:space-y-24">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => {
                const isLeft = index % 2 === 0;
                const isHighlighted = item.highlight || item.isWin;
                
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                    className="relative"
                  >
                    <div className={cn(
                      "flex flex-col md:flex-row items-center",
                      isLeft ? "md:flex-row-reverse" : ""
                    )}>
                      
                      {/* Timeline Node - Desktop Only */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-[3px] transition-all duration-500",
                          isHighlighted 
                            ? "bg-indigo-500 border-indigo-200/30 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-125" 
                            : "bg-[#0a0a0a] border-white/20"
                        )} />
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block w-1/2" />
                      
                      {/* Content Card Wrapper */}
                      <div className="w-full md:w-1/2 flex relative z-10">
                        <div className={cn(
                          "w-full flex",
                          isLeft ? "md:pr-16 lg:pr-24 justify-end" : "md:pl-16 lg:pl-24 justify-start"
                        )}>
                          
                          {/* The Card */}
                          <div className={cn(
                            "group w-full max-w-md p-7 sm:p-8 rounded-[2rem] transition-all duration-500",
                            isHighlighted
                              ? "bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/[0.15] hover:shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
                              : "bg-white/[0.01] border border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]"
                          )}>
                            
                            <div className="flex flex-col gap-6">
                              {/* Meta Header */}
                              <div className="flex items-center justify-between gap-4">
                                <div className={cn(
                                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border",
                                  isHighlighted 
                                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" 
                                    : "bg-white/[0.03] border-white/[0.05] text-white/50"
                                )}>
                                  {getCategoryIcon(item.isWin ? "Wins" : item.category)}
                                  <span>{item.category}</span>
                                </div>
                                <span className="text-xs font-mono text-white/30 tracking-widest">{item.date}</span>
                              </div>

                              {/* Titles & Desc */}
                              <div>
                                <h4 className={cn(
                                  "font-bold tracking-tight mb-2 leading-tight",
                                  isHighlighted ? "text-2xl sm:text-3xl text-white" : "text-xl sm:text-2xl text-white/80"
                                )}>
                                  {item.title}
                                </h4>
                                <div className="flex items-center gap-3 text-sm text-white/40 font-medium mb-4">
                                  <span>{item.organizer}</span>
                                  {item.roleOrOutcome && (
                                    <>
                                      <span className="w-1 h-1 rounded-full bg-white/20" />
                                      <span className={cn(
                                        "px-2 py-0.5 rounded text-[11px] uppercase tracking-wider",
                                        isHighlighted ? "bg-white/10 text-white/90" : "bg-white/5 text-white/60"
                                      )}>
                                        {item.roleOrOutcome}
                                      </span>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm sm:text-base text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                                  {item.note}
                                </p>
                              </div>

                              {/* Optional Action */}
                              {item.actionText && (
                                <div className="pt-2">
                                  <button className="flex items-center gap-2 text-xs font-semibold text-white/40 group-hover:text-white/80 transition-colors">
                                    {item.actionText}
                                    <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredData.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-20 text-center text-white/30 font-light tracking-wide"
              >
                No signals found for this category.
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
