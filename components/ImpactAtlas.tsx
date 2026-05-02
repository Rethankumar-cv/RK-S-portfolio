"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import GlassContainer from "@/components/ui/GlassContainer";
import { ExternalLink, Trophy, BadgeCheck, Users, MapPin, Target } from "lucide-react";

type Category = "All" | "Competitions" | "Certifications" | "Meetups" | "Leadership";

interface ImpactCard {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  organizer: string;
  date: string;
  outcome?: string;
  note: string;
  actionText: string;
  actionUrl?: string;
  highlight?: boolean;
}

const IMPACT_DATA: ImpactCard[] = [
  {
    id: "qt3",
    category: "Competitions",
    title: "IEEE QT3 18.0",
    organizer: "IEEE",
    date: "2024",
    outcome: "1st Place",
    note: "Won 1st place in idea pitching against top teams with an innovative solution.",
    actionText: "View win",
    highlight: true,
  },
  {
    id: "infosys",
    category: "Certifications",
    title: "Infosys Springboard",
    organizer: "Infosys",
    date: "2023",
    outcome: "Verified",
    note: "Completed rigorous software engineering and full-stack development tracks.",
    actionText: "View credential",
  },
  {
    id: "bytztrom",
    category: "Competitions",
    title: "Bytztrom’25 Hackathon",
    organizer: "Bytztrom",
    date: "2025",
    outcome: "Participant",
    note: "Built an innovative solution in a fast-paced, competitive environment.",
    actionText: "See project",
  },
  {
    id: "web-master",
    category: "Leadership",
    title: "Web Master",
    organizer: "IEEE KPRIET SB",
    date: "2024 - Present",
    outcome: "Lead Role",
    note: "Managing digital presence, technical infrastructure, and leading web initiatives.",
    actionText: "View profile",
  },
  {
    id: "browserstack",
    category: "Meetups",
    title: "BrowserStack Meetup",
    organizer: "BrowserStack",
    date: "Coimbatore",
    outcome: "Attendee",
    note: "Engaged with QA and Dev experts on cutting-edge testing automation.",
    actionText: "See event",
  },
  {
    id: "hackxelerate",
    category: "Competitions",
    title: "HackXelerate’25",
    organizer: "HackXelerate",
    date: "2025",
    outcome: "Participant",
    note: "Showcased advanced development skills in a high-intensity hackathon.",
    actionText: "Read more",
  },
  {
    id: "digital-lead",
    category: "Leadership",
    title: "Digital Lead",
    organizer: "SSIT KPRIET",
    date: "2023 - 2024",
    outcome: "Leadership",
    note: "Led digital initiatives, structured content strategies, and managed campaigns.",
    actionText: "View impact",
  },
  {
    id: "global-certs",
    category: "Certifications",
    title: "Global Certifications",
    organizer: "Various Platforms",
    date: "2023 - 2024",
    outcome: "Certified",
    note: "Multiple global certifications validating technical and architectural expertise.",
    actionText: "View credentials",
  },
  {
    id: "yukta",
    category: "Competitions",
    title: "YUKTA’24 Paper Presentation",
    organizer: "YUKTA",
    date: "2024",
    outcome: "Presenter",
    note: "Presented technical research and insights to industry experts and academia.",
    actionText: "Read paper",
  },
  {
    id: "sweet-talkerz",
    category: "Leadership",
    title: "Sweet Talkerz",
    organizer: "Community",
    date: "2023",
    outcome: "Organizer",
    note: "Coordinated communication and event operations for large-scale events.",
    actionText: "Read more",
  },
  {
    id: "ieee-meetups",
    category: "Meetups",
    title: "Tech Community Meetups",
    organizer: "IEEE / Local Groups",
    date: "2023 - 2024",
    outcome: "Participant",
    note: "Active participant in local and regional tech discussions and networking.",
    actionText: "Read post",
  }
];

const CATEGORIES: Category[] = ["All", "Competitions", "Certifications", "Meetups", "Leadership"];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Competitions": return <Trophy className="w-4 h-4" />;
    case "Certifications": return <BadgeCheck className="w-4 h-4" />;
    case "Meetups": return <MapPin className="w-4 h-4" />;
    case "Leadership": return <Users className="w-4 h-4" />;
    default: return <Target className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Competitions": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    case "Certifications": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    case "Meetups": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    case "Leadership": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    default: return "text-white/60 bg-white/5 border-white/10";
  }
};

export default function ImpactAtlas() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const isMobile = useIsMobile();

  const filteredData = IMPACT_DATA.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section className="py-20 flex justify-center w-full px-4 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full z-10">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3 text-center">
              Proof of Impact
            </h2>
            <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-loose text-center text-glow">
              Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Atlas</span>
            </h3>
            <p className="mt-2 text-[15px] sm:text-base text-white/60 max-w-2xl mx-auto font-light leading-relaxed px-4 text-center">
              Wins, credentials, and community moments. A timeline of momentum, showing real-world proof of growth.
            </p>
          </motion.div>
        </div>

        {/* Layout: Summary Panel + Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Sticky Summary Panel */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 shrink-0 space-y-6">
            <GlassContainer maxWidth="none" className="p-6 md:p-8 rounded-3xl relative overflow-hidden group border border-white/[0.08] bg-black/[0.2] backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 z-0" />
              
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-400" />
                  Impact Summary
                </h4>
                
                <div className="space-y-4">
                  {[
                    { label: "Wins & Podiums", value: "3+", icon: Trophy, color: "text-yellow-400" },
                    { label: "Certifications", value: "5+", icon: BadgeCheck, color: "text-blue-400" },
                    { label: "Competitions", value: "10+", icon: Target, color: "text-rose-400" },
                    { label: "Meetups & Events", value: "8+", icon: MapPin, color: "text-purple-400" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 sm:p-2.5 rounded-xl bg-white/[0.05] ${stat.color}`}>
                          <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-sm sm:text-base text-white/70 font-medium">{stat.label}</span>
                      </div>
                      <span className="text-xl sm:text-2xl font-bold text-white">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassContainer>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-2/3 flex flex-col space-y-8">
            
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-indigo-500/20 text-indigo-200 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                      : "bg-white/[0.02] text-white/50 border-white/[0.05] hover:bg-white/[0.08] hover:text-white/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cards Stack */}
            <div className="flex flex-col gap-5 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredData.map((item, index) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div 
                      className={`group relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
                        item.highlight 
                          ? "bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 shadow-[0_8px_32px_rgba(99,102,241,0.15)]"
                          : "bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                      }`}
                    >
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none flex items-center justify-center">
                        <div className="w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_50%)]" />
                      </div>

                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        
                        {/* Main Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
                              {getCategoryIcon(item.category)}
                              {item.category}
                            </span>
                            <span className="text-xs sm:text-sm text-white/40 font-mono tracking-wider">
                              {item.date}
                            </span>
                          </div>

                          <div>
                            <h4 className={`font-bold tracking-tight mb-1.5 ${item.highlight ? 'text-2xl sm:text-3xl text-white' : 'text-xl sm:text-2xl text-white/90'}`}>
                              {item.title}
                            </h4>
                            <p className="text-sm sm:text-base font-medium text-indigo-300/80">
                              {item.organizer}
                            </p>
                          </div>

                          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
                            {item.note}
                          </p>
                        </div>

                        {/* Right/Bottom Action Area */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0 gap-4 mt-2 sm:mt-0">
                          {item.outcome && (
                            <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm font-semibold text-white/80 shadow-sm backdrop-blur-sm">
                              {item.outcome}
                            </div>
                          )}
                          
                          <button className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/50 hover:text-white transition-colors group/btn">
                            {item.actionText}
                            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredData.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="py-12 text-center text-white/40 text-sm"
                >
                  No items found in this category.
                </motion.div>
              )}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-8 flex justify-center lg:justify-start"
            >
              <a 
                href="#contact" 
                className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all text-sm font-medium text-white/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                Let&apos;s build together
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
