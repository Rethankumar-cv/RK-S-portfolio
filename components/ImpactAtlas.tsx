"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, Variants, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Trophy, BadgeCheck, Users, MapPin, ArrowRight, ArrowLeft, X, Zap, Rocket, Target, TrendingUp, Sparkles, Navigation, Globe, Shield, Code, Cpu, Quote, Activity, Fingerprint, ExternalLink, Layers } from "lucide-react";

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { cn } from "@/lib/utils";

type Category = "Competitions" | "Community" | "Leadership" | "Certifications";

interface CardData {
  id: string; title: string; organizer: string; date: string;
  result: string; note: string; isWin?: boolean; featured?: boolean;
  duration?: string; actionText?: string;
}

interface CompetitionData {
  id: string; title: string; organizer: string; date: string;
  result: string; note: string; isWin?: boolean; featured?: boolean;
  images: string[]; modalSummary: string; storyKeywords: string[];
  highlights: { text: string; icon: any }[]; links: { label: string; url: string }[];
}

interface CommunityData {
  id: string; title: string; organizer: string; date: string;
  takeaway: string; tags: string[]; images: string[];
  modalSummary: string; storyKeywords: string[];
  speakers: string[]; links: { label: string; url: string }[];
}

interface CertificationData {
  id: string; title: string; provider: string; date: string;
  domain: string; insight: string; tags: string[]; images: string[];
  modalSummary: string; storyKeywords: string[];
  accent: "blue" | "orange" | "emerald" | "green" | "teal" | "amber";
  links: { label: string; url: string }[];
}

const DATA: Record<"Leadership", CardData[]> = {
  Leadership: [
    { id: "web-master", title: "Web Master", organizer: "IEEE KPRIET SB", date: "2024", duration: "2024 – Present", result: "Lead Role", note: "Architecting digital infrastructure, leading web initiatives, and mentoring junior developers.", featured: true, actionText: "View Profile" },
    { id: "digital-lead", title: "Digital Lead", organizer: "SSIT KPRIET", date: "2023", duration: "2023 – 2024", result: "Leadership", note: "Spearheaded digital content strategies, driving engagement and community outreach." },
    { id: "sweet-talkerz", title: "Sweet Talkerz", organizer: "Community Org", date: "2023", result: "Coordinator", note: "Orchestrated large-scale events and streamlined cross-team communication." },
  ],
};

const CERTIFICATION_DATA: CertificationData[] = [
  {
    id: "oracle", title: "Oracle Cloud Infrastructure", provider: "Oracle", date: "2025", domain: "Cloud Infrastructure",
    insight: "Validated scalable cloud infrastructure concepts.",
    tags: ["OCI", "Cloud Architecture", "IaaS"],
    images: ["/ORACLE.jpg"],
    modalSummary: "Achieved Oracle Cloud Infrastructure certification, validating competency in designing and deploying scalable, highly available, and secure cloud solutions using Oracle's ecosystem. This credential reinforces a strong foundation in modern cloud infrastructure patterns.",
    storyKeywords: ["Oracle Cloud Infrastructure", "scalable", "secure cloud solutions"],
    accent: "orange",
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_oracle-cloudcertification-aiinnovation-activity-7323688594735271937-8X_m" }]
  },
  {
    id: "ibm", title: "IBM AI Fundamentals", provider: "IBM", date: "2025", domain: "Artificial Intelligence",
    insight: "Strengthened core AI engineering principles.",
    tags: ["AI Engineering", "IBM Watson", "ML"],
    images: ["/IBM.jpg"],
    modalSummary: "Completed IBM's rigorous AI certification, covering foundational machine learning concepts, neural networks, and practical AI model deployment strategies. The curriculum bridged theoretical AI understanding with real-world engineering applications.",
    storyKeywords: ["IBM's rigorous AI certification", "machine learning concepts", "real-world engineering"],
    accent: "blue",
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_kpriet-ibm-ai-activity-7324066399776034818-Ep5u" }]
  },
  {
    id: "infosys-genai", title: "Infosys Generative AI", provider: "Infosys", date: "2025", domain: "Generative AI",
    insight: "Expanded practical generative AI understanding.",
    tags: ["GenAI", "LLMs", "Prompt Engineering"],
    images: ["/INFOSYS GEN AI PRINCIPLES.jpg"],
    modalSummary: "Earned Infosys Springboard's Generative AI certification, deepening expertise in large language model architectures, responsible AI principles, and practical GenAI application design. This reflects a forward-looking engagement with the most transformative technology of our era.",
    storyKeywords: ["large language model architectures", "responsible AI principles", "GenAI application design"],
    accent: "teal",
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_generativeai-aiinnovation-infosysspringboard-activity-7338482659888721920-NnIv" }]
  },
  {
    id: "mongodb", title: "MongoDB Associate Developer", provider: "MongoDB", date: "2024", domain: "Database Engineering",
    insight: "Strengthened NoSQL backend architecture knowledge.",
    tags: ["MongoDB", "NoSQL", "Backend"],
    images: ["/mongodb.jpg"],
    modalSummary: "Certified as a MongoDB Associate Developer, demonstrating proficiency in schema design, aggregation pipelines, indexing strategies, and building production-grade NoSQL database systems. This validates a strong backend data engineering foundation.",
    storyKeywords: ["MongoDB Associate Developer", "aggregation pipelines", "NoSQL database systems"],
    accent: "green",
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_mongodb-mongodbcertified-associatedeveloper-activity-7409797752982933504-zYBM" }]
  },
  {
    id: "salesforce", title: "Agentforce Specialist", provider: "Salesforce", date: "2024", domain: "AI Agents",
    insight: "Validated agentic AI deployment capabilities.",
    tags: ["Agentforce", "Salesforce AI", "Agents"],
    images: ["/salesforce.jpg"],
    modalSummary: "Earned the Salesforce Agentforce Specialist certification, demonstrating deep capability in designing, deploying, and managing intelligent AI agents within the Salesforce ecosystem. This reflects a strategic understanding of enterprise-grade agentic systems.",
    storyKeywords: ["Salesforce Agentforce", "intelligent AI agents", "enterprise-grade agentic systems"],
    accent: "blue",
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_salesforcecertified-agentforcespecialist-activity-7410171627684081666-sAHQ" }]
  },
  {
    id: "aws-cp", title: "AWS Cloud Practitioner", provider: "Amazon Web Services", date: "2025", domain: "Cloud Computing",
    insight: "Certified understanding of AWS cloud fundamentals.",
    tags: ["AWS", "Cloud Practitioner", "Serverless"],
    images: ["/AWS.jpg"],
    modalSummary: "Achieved the AWS Certified Cloud Practitioner credential, validating comprehensive knowledge of AWS core services, cloud economics, security best practices, and the shared responsibility model. This is the foundational credential for AWS cloud expertise.",
    storyKeywords: ["AWS Certified Cloud Practitioner", "core services", "cloud economics"],
    accent: "amber",
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_aws-certified-cloud-practitioner-was-issued-activity-7446396908237025280-4FC5" }]
  },
];

const COMPETITION_DATA: CompetitionData[] = [
  { 
    id: "qt3", title: "IEEE QT3 18.0", organizer: "IEEE", date: "2024", result: "1st Place", 
    note: "Won 1st place in idea pitching with a scalable solution and StartupTN-backed momentum.", isWin: true, featured: true,
    images: ["/ieee qt3.jpg", "/ieee at3 2.jpg"],
    modalSummary: "Secured first place in the IEEE QT3 idea pitching competition. We developed a scalable solution driven by strong team effort, gaining valuable incubation and StartupTN support along the mentorship and product-building path.",
    storyKeywords: ["first place", "scalable solution", "StartupTN support"],
    highlights: [
      { text: "First-Place Pitching", icon: Trophy }, { text: "Team Execution", icon: Users },
      { text: "Scalable Innovation", icon: Target }, { text: "StartupTN Supported", icon: Rocket },
      { text: "Product Pathway", icon: TrendingUp }
    ],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_ieeeqt3-ieee-qtt18-activity-7403636962051694593-bQF1" }]
  },
  { 
    id: "hackxelerate", title: "HackXelerate'25", organizer: "HackXelerate", date: "2025", result: "Participant", 
    note: "Led a 24-hour hackathon journey with 950+ participants and SDG-driven innovation.",
    images: ["/HackXelerate'25.jpg"],
    modalSummary: "Immersed in a 24-hour hackathon energy alongside 950+ participants. This event required long planning and coordination to execute SDG-aligned innovation, showcasing strong leadership and technical execution under pressure.",
    storyKeywords: ["24-hour hackathon", "950+ participants", "SDG-aligned innovation", "technical execution"],
    highlights: [
      { text: "24-Hour Hackathon", icon: Sparkles }, { text: "950+ Participants", icon: Users },
      { text: "SDG Innovation", icon: Globe }, { text: "Leadership & Execution", icon: Shield }
    ],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_hackxelerate25-innovation-hackathon-activity-7321968559910223872-uHLG" }]
  },
  { 
    id: "bytztrom", title: "Bytstorm'25", organizer: "WhiteStorm", date: "2025", result: "Runner-Up", 
    note: "Secured runner-up in a fast-paced hackathon through teamwork and technical execution.",
    images: ["/bytstorm 1.jpg", "/bytstrom 2.jpg"],
    modalSummary: "Achieved a runner-up finish by solving real-world challenges in a fast-paced environment. This experience highlighted teamwork under pressure, technical problem-solving, and a strong collaboration story.",
    storyKeywords: ["runner-up finish", "real-world challenges", "technical problem-solving"],
    highlights: [
      { text: "Runner-Up Finish", icon: Trophy }, { text: "Real-World Challenges", icon: Zap },
      { text: "Pressure Teamwork", icon: Users }, { text: "Technical Execution", icon: Code }
    ],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_hackathon-techinnovation-teamwork-activity-7301499274909954048-wgf8" }]
  },
  { 
    id: "yukta", title: "YUKTA'24", organizer: "Paper Presentation", date: "2024", result: "1st Place", 
    note: "Earned 1st place in paper presentation at a national-level symposium.",
    images: ["/yukta 1.jpg", "/yukta 2.jpg"],
    modalSummary: "Earned first place in a paper presentation at a national-level symposium. The event validated strong research and presentation skills, academic communication, and deep technical credibility among experts.",
    storyKeywords: ["first place", "national-level symposium", "technical credibility"],
    highlights: [
      { text: "1st Place Presentation", icon: Trophy }, { text: "National Symposium", icon: MapPin },
      { text: "Research Skills", icon: Target }, { text: "Academic Defense", icon: Cpu }
    ],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_psgitech-firstplace-innovation-activity-7175444549962530817--p6t" }]
  },
];

const COMMUNITY_DATA: CommunityData[] = [
  { 
    id: "cncf", title: "CNCF Coimbatore Meetup", organizer: "Cloud Native Computing Foundation", date: "2024",
    takeaway: "Build systems for chaos.", tags: ["Kubernetes", "OpenCost", "DevOps"],
    images: ["/CNCF Coimbatore Meetup 1.jpg", "/CNCF Coimbatore Meetup 2.jpg"],
    modalSummary: "An intensive deep dive into cloud-native architectures and container orchestration within the local ecosystem. The core discourse focused on building resilient infrastructure and the necessity of engineering systems that thrive in chaotic environments.",
    storyKeywords: ["cloud-native architectures", "resilient infrastructure", "chaotic environments"],
    speakers: ["Ecosystem Leaders", "DevOps Engineers"],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_kongunaatukubestronaut-cncf-coimbatore-activity-7408831844378587136-Qw1k" }]
  },
  { 
    id: "aws", title: "AWS User Group", organizer: "AWS Coimbatore", date: "2024",
    takeaway: "Scalability is a mindset.", tags: ["AWS", "DevOps", "Serverless"],
    images: ["/AWS USER 1.jpg", "/AWS USER 2.jpg", "/AWS USER 3.jpg"],
    modalSummary: "Explored the rapidly evolving landscape of serverless computing and scalable cloud architectures. The key engineering theme was designing systems that scale elastically without the traditional administrative overhead.",
    storyKeywords: ["serverless computing", "scale elastically", "administrative overhead"],
    speakers: ["AWS Solutions Architects"],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_aws-awsusergroup-coimbatore-activity-7434456462950715392-XBTD" }]
  },
  { 
    id: "devfest", title: "Google DevFest 2025", organizer: "GDG", date: "2025",
    takeaway: "AI amplifies creativity.", tags: ["Gemini", "Agentic AI", "GraphRAG"],
    images: ["/Google DevFest 2025 1.jpg", "/Google DevFest 2025 2.jpg", "/Google DevFest 2025 3.jpg"],
    modalSummary: "A massive gathering of engineering talent focusing on the convergence of AI and product development. Participated in deep-dive sessions regarding the integration of robust LLMs directly into full-stack applications.",
    storyKeywords: ["convergence of AI", "integration of robust LLMs", "full-stack applications"],
    speakers: ["Google Developer Experts"],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_googledevfest2025-googledevfest-google-activity-7392935519678148608-2SFN" }]
  },
  { 
    id: "java-ai", title: "Java AI Day", organizer: "Java User Group", date: "2025",
    takeaway: "Legacy meets intelligence.", tags: ["Spring AI", "MLOps", "Java"],
    images: ["/Java AI Day 1.jpg", "/Java AI Day 2.jpg", "/Java AI Day 3.jpg"],
    modalSummary: "Bridging the gap between reliable enterprise Java infrastructure and modern AI frameworks. We explored how monolithic legacy systems can adopt intelligent agents and workflows without breaking strict stability requirements.",
    storyKeywords: ["enterprise Java infrastructure", "intelligent agents", "strict stability requirements"],
    speakers: ["Enterprise Architects", "AI Researchers"],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_java-javadevelopers-javacommunity-activity-7436295677900390400-QvnL" }]
  },
  { 
    id: "vibecoding", title: "Responsible Vibe Coding", organizer: "Thoughtworks", date: "2025",
    takeaway: "Fast execution creates momentum.", tags: ["Agentic AI", "Rapid Prototyping"],
    images: ["/Responsible Vibe Coding 1.jpg", "/Responsible Vibe Coding 2.jpg"],
    modalSummary: "A high-energy, hacker-style meetup focused on flow states, responsible AI use, and rapid execution. We discussed the cultural shift towards 'vibe coding'—building fast, iterating instantly, and embracing technical momentum safely.",
    storyKeywords: ["flow states", "rapid execution", "iterating instantly"],
    speakers: ["Indie Hackers", "Product Builders"],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_geeknightcoimbatore-responsibleai-thoughtworks-activity-7375034224963366912-8Jwo" }]
  },
  { 
    id: "browserstack", title: "BrowserStack Meetup", organizer: "BrowserStack", date: "2024",
    takeaway: "QA is product thinking.", tags: ["QA Automation", "DevOps"],
    images: ["/browserStack Meetup 1.jpg", "/browserStack Meetup 2.jpg"],
    modalSummary: "Deep-dive discussions with QA automation experts and frontend performance engineers. We covered sophisticated testing paradigms at scale and how engineering culture fundamentally shifts when testing is integrated deeply into the product lifecycle.",
    storyKeywords: ["QA automation", "testing paradigms at scale", "integrated deeply"],
    speakers: ["QA Architects", "Performance Engineers"],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_browserstack-qameetup-genai-activity-7377698910800314368-MYth" }]
  },
  { 
    id: "aimvp", title: "AI MVP in 4 Hours", organizer: "Builder Workshop", date: "2024",
    takeaway: "Prototype at the speed of thought.", tags: ["Agentic AI", "GraphRAG"],
    images: ["/AI MVP in 4 Hours 1.jpg", "/AI MVP in 4 Hours 2.jpg"],
    modalSummary: "An intensive engineering workshop entirely focused on shipping an AI-driven MVP under extreme time constraints. We utilized modern scaffolding and LLM frameworks to go from a raw idea to a functional prototype in record time.",
    storyKeywords: ["AI-driven MVP", "extreme time constraints", "functional prototype"],
    speakers: ["Startup Founders", "Lead Engineers"],
    links: [{ label: "View LinkedIn Post", url: "https://www.linkedin.com/posts/rethan-kumar-cv_googledevfest-gdgcoimbatore-ai-activity-7382753733576896512-d_oa" }]
  },
];

const CFG: Record<Category, { icon: React.ReactNode; accent: string; glow: string; hex: string; }> = {
  Competitions: { icon: <Trophy className="w-4 h-4" />, accent: "text-amber-400", hex: "#fbbf24", glow: "rgba(251,191,36,0.2)" },
  Community:    { icon: <Activity className="w-4 h-4" />,  accent: "text-purple-400", hex: "#c084fc", glow: "rgba(192,132,252,0.15)" },
  Leadership:   { icon: <Users className="w-4 h-4" />,  accent: "text-cyan-400", hex: "#22d3ee", glow: "rgba(34,211,238,0.2)" },
  Certifications: { icon: <BadgeCheck className="w-4 h-4" />, accent: "text-blue-400", hex: "#60a5fa", glow: "rgba(96,165,250,0.2)" },
};

const VARIANTS: Record<Category, { container: Variants; item: Variants }> = {
  Competitions: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } } },
  },
  Community: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } } },
  },
  Leadership: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } } },
  },
  Certifications: {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }, exit: { opacity: 0, transition: { duration: 0.2 } } },
    item: { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } } },
  },
};

function MagneticPill({ label, category, isActive, onClick }: { label: Category; category: Category; isActive: boolean; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  const cfg = CFG[category];

  const labels = { Competitions: "Competitions", Community: "Ecosystem Signals", Leadership: "Leadership", Certifications: "Certifications" };

  return (
    <motion.button
      ref={ref} style={{ x: sx, y: sy }}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.2);
        y.set((e.clientY - r.top - r.height / 2) * 0.2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-500 overflow-hidden group",
        isActive 
          ? "border-white/20 bg-white/10 text-white shadow-[0_10px_40px_-10px_rgba(255,255,255,0.15)]" 
          : "border-white/5 bg-white/[0.02] text-white/50 hover:text-white/90 hover:bg-white/[0.04] hover:border-white/15"
      )}
    >
      <motion.div variants={{ hover: { x: "200%" } }} initial={{ x: "-100%" }} transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute inset-0 w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
      
      {isActive && (
        <motion.div layoutId="active-pill-bg" className="absolute inset-0 -z-10" style={{ background: `linear-gradient(135deg, ${cfg.hex}22, transparent)` }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
      )}
      <motion.span animate={isActive ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}} transition={{ duration: 0.5 }}
        className={cn("transition-colors z-10", isActive ? cfg.accent : "opacity-60 group-hover:opacity-100 group-hover:scale-110 duration-300")}>
        {cfg.icon}
      </motion.span>
      <span className="z-10 tracking-wide">{labels[label]}</span>
    </motion.button>
  );
}

// ============== COMMUNITY ECOSYSTEM COMPONENTS ==============

function ExpandedImageViewer({ images, initialIndex, onClose }: { images: string[], initialIndex: number, onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex(p => (p + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex(p => (p - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors z-50">
        <X className="w-6 h-6" />
      </button>
      
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => (p - 1 + images.length) % images.length); }} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/20 transition-all z-50 backdrop-blur-md">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => (p + 1) % images.length); }} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/20 transition-all z-50 backdrop-blur-md">
            <ArrowRight className="w-6 h-6" />
          </button>
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.img 
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 z-50">
          {images.map((_, i) => (
            <div key={i} className={cn("w-2 h-2 rounded-full transition-all duration-300", i === currentIndex ? "bg-white scale-125" : "bg-white/30")} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CommunityCapsuleImage({ images }: { images: string[] }) {
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out z-0 group-hover:scale-[1.03] opacity-80 saturate-[0.85] group-hover:opacity-100 group-hover:saturate-110" style={{ backgroundImage: `url("${images[0]}")` }} />
    );
  }
  if (images.length === 2) {
    return (
      <div className="absolute inset-0 flex z-0 opacity-80 saturate-[0.85] group-hover:opacity-100 group-hover:saturate-110 transition-all duration-700">
        <div className="flex-[3] bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-[1.03]" style={{ backgroundImage: `url("${images[0]}")` }} />
        <div className="flex-[2] bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-[1.03] border-l border-[#0a0a0a]/50" style={{ backgroundImage: `url("${images[1]}")` }} />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex z-0 opacity-80 saturate-[0.85] group-hover:opacity-100 group-hover:saturate-110 transition-all duration-700 overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]" style={{ backgroundImage: `url("${images[0]}")` }} />
        <div className="absolute right-[-15%] top-[-5%] w-[60%] h-[80%] bg-cover bg-center shadow-2xl rotate-6 transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-105 border border-white/10 rounded-xl" style={{ backgroundImage: `url("${images[1]}")` }} />
        <div className="absolute left-[-10%] bottom-[-15%] w-[50%] h-[70%] bg-cover bg-center shadow-2xl -rotate-6 transition-transform duration-700 ease-out group-hover:-rotate-12 group-hover:scale-105 border border-white/10 rounded-xl" style={{ backgroundImage: `url("${images[2]}")` }} />
    </div>
  );
}

function CommunityCapsule({ card, tier = "primary", onClick }: { card: any; tier?: "hero" | "primary" | "workshop"; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { damping: 40, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { damping: 40, stiffness: 150 });
  const spotlightX = useSpring(useMotionValue(0), { damping: 40, stiffness: 150 });
  const spotlightY = useSpring(useMotionValue(0), { damping: 40, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    mouseX.set((x / rect.width) - 0.5); mouseY.set((y / rect.height) - 0.5);
    spotlightX.set(x); spotlightY.set(y);
  };

  const spotlightRadius = tier === "hero" ? "500px" : "350px";
  const spotlightTransform = useMotionTemplate`radial-gradient(circle ${spotlightRadius} at ${spotlightX}px ${spotlightY}px, rgba(192,132,252,0.12), transparent 80%)`;

  // Tier-specific config
  const tierConfig = {
    hero:     { h: "h-[340px] sm:h-[380px]", titleSize: "text-2xl sm:text-3xl md:text-4xl", quoteSize: "text-base sm:text-lg", tagCount: 3, padding: "p-6 sm:p-8" },
    primary:  { h: "h-[220px] sm:h-[240px]", titleSize: "text-lg sm:text-xl",               quoteSize: "text-xs sm:text-sm",  tagCount: 2, padding: "p-4 sm:p-5" },
    workshop: { h: "h-[160px] sm:h-[180px]", titleSize: "text-base sm:text-lg",              quoteSize: "text-xs",             tagCount: 2, padding: "p-4 sm:p-5" },
  }[tier];

  return (
    <motion.div variants={VARIANTS.Community.item} style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }} onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} whileHover={{ y: -4 }}
        className={cn(
          "relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-white/[0.05] hover:border-purple-500/30 bg-[#030303] backdrop-blur-xl flex flex-col justify-end group transition-colors duration-500 cursor-pointer shadow-xl w-full",
          tierConfig.h
        )}
      >
        <CommunityCapsuleImage images={card.images} />

        <div className={cn("absolute inset-0 z-0 bg-gradient-to-t transition-opacity duration-500 group-hover:opacity-95",
          tier === "hero" ? "from-[#040404] via-[#040404]/80 to-[#040404]/10" : "from-[#050505] via-[#050505]/75 to-[#050505]/25"
        )} />
        <div className="absolute inset-0 z-0 opacity-[0.2] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 mix-blend-screen" style={{ background: spotlightTransform }} />

        <div style={{ transform: "translateZ(20px)" }} className={cn("relative z-10 flex flex-col gap-2", tierConfig.padding)}>

          {/* Top metadata — hero only */}
          {tier === "hero" && (
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono text-white/50 tracking-[0.2em] px-2.5 py-1 rounded-md bg-white/5 backdrop-blur-md border border-white/10">{card.date}</span>
              <div className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border border-purple-500/20 bg-purple-500/10 text-purple-300 backdrop-blur-md flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <Fingerprint className="w-3 h-3" /> Featured Signal
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h4 className={cn("font-bold text-white/90 group-hover:text-white transition-colors tracking-tight leading-tight", tierConfig.titleSize)}>{card.title}</h4>
            {tier !== "workshop" && (
              <span className="text-[10px] font-medium tracking-widest uppercase text-purple-400/70">{card.organizer}</span>
            )}
          </div>

          <div className="flex items-start gap-1.5">
            <Quote className={cn("text-purple-400/40 group-hover:text-purple-400 shrink-0 transition-colors duration-500 mt-0.5", tier === "hero" ? "w-4 h-4" : "w-3 h-3")} />
            <p className={cn("text-white/70 italic font-light group-hover:text-white/95 transition-colors duration-500", tierConfig.quoteSize)}>
              "{card.takeaway}"
            </p>
          </div>

          {tier !== "workshop" && (
            <div className="flex flex-wrap gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              {card.tags.slice(0, tierConfig.tagCount).map((t: string, i: number) => (
                <span key={i} className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-white/60">{t}</span>
              ))}
            </div>
          )}

          {tier === "workshop" && (
            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-mono text-purple-400/80 tracking-wider">{card.organizer}</span>
              <span className="text-[9px] font-mono text-white/30 tracking-wider">· {card.date}</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CommunityModal({ card, onClose }: any) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 30 });
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 30 });
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(24px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80" onClick={onClose}
    >
      <motion.div 
        ref={modalRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", damping: 35, stiffness: 200 }} onClick={e => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#060606]/95 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col h-[85vh] sm:h-[80vh] group"
      >
        <motion.div className="absolute inset-0 pointer-events-none opacity-40 z-0 mix-blend-screen" style={{ background: useMotionTemplate`radial-gradient(800px circle at ${spotlightX} ${spotlightY}, rgba(192,132,252,0.08), transparent 80%)` }} />

        {/* IMAGE AREA - TOP 45% */}
        <div className="relative h-[45%] w-full shrink-0 overflow-hidden cursor-zoom-in" onClick={() => setExpandedImageIndex(0)}>
           <ModalImage images={card.images} parallaxX={imageX} parallaxY={imageY} />
           <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/20 to-transparent z-10 pointer-events-none" />
           <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10 pointer-events-none" />
           <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none z-10" />
           
           <div className="absolute bottom-5 left-6 right-6 sm:bottom-6 sm:left-8 sm:right-8 z-20 flex flex-col gap-2 pointer-events-none">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border border-white/10 bg-white/5 text-purple-300/80 backdrop-blur-md shadow-sm">
                  {card.organizer}
                </span>
                <span className="px-3 py-1 text-[9px] font-mono tracking-[0.2em] rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md">
                  {card.date}
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl font-black text-white/95 tracking-tight leading-none relative inline-block mt-1"
              >
                {card.title}
              </motion.h2>
           </div>
        </div>

        {/* CONTENT AREA - BOTTOM 55% */}
        <div className="h-[55%] px-6 py-5 sm:px-8 sm:py-6 flex flex-col justify-between relative z-20 overflow-hidden">
           
           <div className="flex flex-col gap-3 sm:gap-4">
               {/* Emotional Takeaway */}
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.5 }} className="flex items-center gap-3">
                 <div className="p-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                   <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                 </div>
                 <h3 className="text-lg sm:text-xl font-light italic text-white/90 tracking-wide drop-shadow-[0_0_15px_rgba(192,132,252,0.2)]">
                   "{card.takeaway}"
                 </h3>
               </motion.div>

               {/* Editorial Story */}
               <motion.p initial={{ opacity: 0, y: 15, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
                 className="text-sm sm:text-[15px] text-white/80 leading-snug font-light max-w-3xl line-clamp-3 sm:line-clamp-4"
               >
                 <HighlightedText text={card.modalSummary} keywords={card.storyKeywords} color="purple" />
               </motion.p>
               
               {/* Metadata (Tags) */}
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col gap-1.5 pt-1">
                 <div className="flex flex-wrap gap-1.5 sm:gap-2">
                   {card.tags.map((t: string, i: number) => (
                     <span key={i} className="px-2.5 py-1 text-[10px] font-mono border border-white/10 rounded-md bg-white/[0.02] text-purple-300/70">{t}</span>
                   ))}
                 </div>
               </motion.div>
           </div>

           {/* ACTION BUTTON */}
           <div className="flex pt-3 sm:pt-4 border-t border-white/5 mt-auto">
             <motion.div initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.65, duration: 0.5 }}>
               <MagneticButton href={card.links[0].url} colors={{ borderHover: "hover:border-purple-500/50", text: "text-purple-400", bg: "bg-purple-500/10", borderBase: "border-purple-500/30" }} />
             </motion.div>
           </div>
        </div>
        
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/80 hover:scale-110 transition-all backdrop-blur-xl z-50 shadow-2xl">
           <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </motion.div>
    </motion.div>
    <AnimatePresence>
      {expandedImageIndex !== null && (
        <ExpandedImageViewer images={card.images} initialIndex={expandedImageIndex} onClose={() => setExpandedImageIndex(null)} />
      )}
    </AnimatePresence>
    </>
  );
}

function BentoCommunity({ data }: { data: CommunityData[] }) {
  const [selectedCard, setSelectedCard] = useState<CommunityData | null>(null);

  useEffect(() => {
    if (selectedCard) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedCard]);

  // Tier mapping by index position in COMMUNITY_DATA
  const heroCard      = data[0]; // CNCF — featured hero
  const primaryCards  = [data[1], data[2], data[3], data[4]]; // AWS, DevFest, Java, VibeCoding
  const workshopCards = [data[5], data[6]]; // BrowserStack, AI MVP

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* TIER 1: FEATURED HERO SIGNAL */}
        <CommunityCapsule
          card={heroCard}
          tier="hero"
          onClick={() => setSelectedCard(heroCard)}
        />

        {/* TIER 2: PRIMARY SIGNAL GRID — 4 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {primaryCards.map((card) => (
            <CommunityCapsule
              key={card.id}
              card={card}
              tier="primary"
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>

        {/* TIER 3: WORKSHOP SIGNALS — compact 2-col row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {workshopCards.map((card) => (
            <CommunityCapsule
              key={card.id}
              card={card}
              tier="workshop"
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <CommunityModal card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ============== COMPETITION ARCHIVE COMPONENTS ==============

function CapsuleImage({ images }: { images: string[] }) {
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out z-0 group-hover:scale-[1.05] group-hover:saturate-110 saturate-[0.8] opacity-80" style={{ backgroundImage: `url("${images[0]}")` }} />
    );
  }
  return (
    <div className="absolute inset-0 flex z-0 opacity-80 group-hover:saturate-110 saturate-[0.8] transition-all duration-700">
      <div className="flex-1 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-[1.05]" style={{ backgroundImage: `url("${images[0]}")` }} />
      <div className="flex-1 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-[1.05] border-l border-[#0a0a0a]/50" style={{ backgroundImage: `url("${images[1]}")` }} />
    </div>
  );
}

function ModalImage({ images, parallaxX, parallaxY }: { images: string[], parallaxX: any, parallaxY: any }) {
  if (images.length === 1) {
    return (
      <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute inset-[-5%] bg-cover bg-center" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[0]}")` }} />
      </motion.div>
    );
  }
  return (
    <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute inset-[-5%] flex" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
      <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url("${images[0]}")` }} />
      <div className="flex-1 bg-cover bg-center border-l border-[#0a0a0a]/80" style={{ backgroundImage: `url("${images[1]}")` }} />
    </motion.div>
  );
}

function MemoryCapsule({ card, color, className, onClick }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { damping: 30, stiffness: 200 });
  const spotlightX = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });
  const spotlightY = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    mouseX.set((x / rect.width) - 0.5); mouseY.set((y / rect.height) - 0.5);
    spotlightX.set(x); spotlightY.set(y);
  };

  const colors = {
    gold: { border: "hover:border-amber-500/40", text: "text-amber-400", bg: "bg-amber-500/10", borderBase: "border-amber-500/30", glow: "rgba(251,191,36,0.15)" },
    cyan: { border: "hover:border-cyan-500/40", text: "text-cyan-400", bg: "bg-cyan-500/10", borderBase: "border-cyan-500/30", glow: "rgba(34,211,238,0.15)" },
    blue: { border: "hover:border-blue-500/40", text: "text-blue-400", bg: "bg-blue-500/10", borderBase: "border-blue-500/30", glow: "rgba(96,165,250,0.15)" },
    purple: { border: "hover:border-purple-500/40", text: "text-purple-400", bg: "bg-purple-500/10", borderBase: "border-purple-500/30", glow: "rgba(192,132,252,0.15)" }
  }[color as 'gold' | 'cyan' | 'blue' | 'purple'];

  const spotlightTransform = useMotionTemplate`radial-gradient(circle 350px at ${spotlightX}px ${spotlightY}px, ${colors.glow}, transparent 80%)`;

  return (
    <motion.div variants={VARIANTS.Competitions.item} style={{ perspective: 1000 }} className={cn("h-full transition-all duration-500", className)}>
      <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }} onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} whileHover={{ y: -4 }}
        className={cn("relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#030303] backdrop-blur-xl h-full flex flex-col justify-end group transition-colors duration-500 cursor-pointer shadow-xl", colors.border)}
      >
        <CapsuleImage images={card.images} />
        
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/10 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 mix-blend-screen" style={{ background: spotlightTransform }} />
        
        {color === 'gold' && (
          <motion.div initial={{ x: "-100%" }} whileHover={{ x: "200%" }} transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-0" />
        )}

        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 p-5 sm:p-6 flex flex-col h-full gap-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-white/60 tracking-[0.2em] px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">{card.date}</span>
            {card.result && (
              <div className={cn("px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border backdrop-blur-md shadow-lg", colors.borderBase, colors.bg, colors.text)}>
                {card.result}
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-1.5">
            <h4 className="text-xl sm:text-2xl font-black text-white/95 group-hover:text-white transition-colors tracking-tight leading-[1.1]">{card.title}</h4>
            <span className={cn("text-[10px] font-bold tracking-widest uppercase mt-0.5", colors.text)}>{card.organizer}</span>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light line-clamp-2 mt-1.5">{card.note}</p>
            <div className="mt-2 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/80">Open Story</span>
              <ArrowRight className="w-3 h-3 text-white/80" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MagneticButton({ href, colors }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.a ref={ref} href={href} target="_blank" rel="noopener noreferrer" style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }} onMouseLeave={() => { x.set(0); y.set(0); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500 shadow-xl backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        colors.borderHover
      )}
    >
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen", colors.bg)} />
      <LinkedinIcon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 z-10 opacity-70 transition-opacity group-hover:opacity-100", colors.text)} />
      <span className={cn("text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors z-10", colors.text)}>View LinkedIn Post</span>
      <motion.div className={cn("p-1.5 rounded-full bg-white/5 transition-transform z-10")} whileHover={{ x: 3 }}>
        <ArrowRight className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5", colors.text)} />
      </motion.div>
      <div className="absolute inset-0 w-[200%] -translate-x-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
    </motion.a>
  );
}

function HighlightedText({ text, keywords, color }: { text: string; keywords: string[]; color: string }) {
  if (!keywords || keywords.length === 0) return <>{text}</>;
  const regex = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  const colors = {
    gold: "text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] font-medium",
    cyan: "text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] font-medium",
    blue: "text-blue-200 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)] font-medium",
    purple: "text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.4)] font-medium"
  }[color as 'gold' | 'cyan' | 'blue' | 'purple'];

  return (
    <>
      {parts.map((part, i) => 
        keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
          <span key={i} className={cn("transition-colors duration-300", colors)}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function MemoryModal({ card, color, onClose }: any) {
  const modalRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5); mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 70, damping: 25 });
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 70, damping: 25 });
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const colors = {
    gold: { borderHover: "hover:border-amber-500/50", text: "text-amber-400", bg: "bg-amber-500/10", borderBase: "border-amber-500/30", glow: "rgba(251,191,36,0.1)" },
    cyan: { borderHover: "hover:border-cyan-500/50", text: "text-cyan-400", bg: "bg-cyan-500/10", borderBase: "border-cyan-500/30", glow: "rgba(34,211,238,0.1)" },
    blue: { borderHover: "hover:border-blue-500/50", text: "text-blue-400", bg: "bg-blue-500/10", borderBase: "border-blue-500/30", glow: "rgba(96,165,250,0.1)" },
    purple: { borderHover: "hover:border-purple-500/50", text: "text-purple-400", bg: "bg-purple-500/10", borderBase: "border-purple-500/30", glow: "rgba(192,132,252,0.1)" }
  }[color as 'gold' | 'cyan' | 'blue' | 'purple'];

  return (
    <motion.div 
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(24px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70" onClick={onClose}
    >
      <motion.div 
        ref={modalRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }} onClick={e => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#080808]/90 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] overflow-y-auto custom-scrollbar shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh] group"
      >
        <motion.div className="absolute inset-0 pointer-events-none opacity-50 z-0 mix-blend-screen" style={{ background: useMotionTemplate`radial-gradient(800px circle at ${spotlightX} ${spotlightY}, ${colors.glow}, transparent 80%)` }} />
        <motion.div animate={{ opacity: [0, 0.4, 0], y: [-50, 150] }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-1/4 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent rotate-45 z-0 pointer-events-none" />

        <div className="relative h-56 sm:h-64 md:h-80 w-full shrink-0 overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2rem]">
           <ModalImage images={card.images} parallaxX={imageX} parallaxY={imageY} />
           <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent z-10" />
           <div className="absolute inset-0 opacity-[0.3] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10" />
           <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none z-10" />
           
           <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10 sm:right-10 z-20 flex flex-col gap-3">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <Trophy className="w-3 h-3 text-white/50" /> {card.result}
                </span>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-md">{card.organizer}</span>
                <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md">{card.date}</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-none relative inline-block mt-1">
                {card.title}
                <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none mix-blend-overlay" />
              </motion.h2>
           </div>
        </div>

        <div className="px-6 pb-6 sm:px-10 sm:pb-8 pt-6 flex flex-col gap-6 relative z-20">
           <motion.p initial={{ opacity: 0, y: 15, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }} className="text-[15px] sm:text-[17px] text-white/90 leading-relaxed font-light max-w-3xl">
             <HighlightedText text={card.modalSummary} keywords={card.storyKeywords} color={color} />
           </motion.p>
           <div className="flex flex-wrap gap-2.5 pt-1">
             {card.highlights.map((h: any, i: number) => {
               const Icon = h.icon;
               return (
                 <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.45 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }} whileHover={{ scale: 1.05, y: -2 }} key={i} 
                   className={cn("group/capsule flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border bg-white/[0.03] backdrop-blur-md cursor-default transition-all duration-300 relative overflow-hidden shadow-sm", "border-white/10 hover:border-white/20")}
                 >
                   <div className={cn("absolute inset-0 opacity-0 group-hover/capsule:opacity-100 transition-opacity duration-500 pointer-events-none", colors.bg)} />
                   <div className={cn("p-1 sm:p-1.5 rounded-full bg-white/5 group-hover/capsule:bg-white/10 transition-colors", colors.text)}><Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></div>
                   <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-white/80 group-hover/capsule:text-white relative z-10">{h.text}</span>
                 </motion.div>
               );
             })}
           </div>
           <div className="flex pt-4 sm:pt-6 border-t border-white/5">
             <motion.div initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.6, duration: 0.5 }}>
               <MagneticButton href={card.links[0].url} colors={colors} />
             </motion.div>
           </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/80 hover:scale-110 transition-all backdrop-blur-xl z-50 shadow-2xl">
           <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

function BentoCompetitions({ data }: { data: CompetitionData[] }) {
  const [selectedCard, setSelectedCard] = useState<CompetitionData | null>(null);

  useEffect(() => {
    if (selectedCard) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedCard]);

  const cardsMap = [
    { card: data[0], color: 'gold', className: 'md:col-span-2 md:row-span-2' },
    { card: data[1], color: 'cyan', className: 'md:col-span-2 md:row-span-1' },
    { card: data[2], color: 'blue', className: 'md:col-span-1 md:row-span-1' },
    { card: data[3], color: 'purple', className: 'md:col-span-1 md:row-span-1' },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[200px] lg:auto-rows-[220px] gap-4 sm:gap-5">
        {cardsMap.map((item) => (
          <MemoryCapsule key={item.card.id} card={item.card} color={item.color} className={item.className} onClick={() => setSelectedCard(item.card)} />
        ))}
      </div>
      <AnimatePresence>
         {selectedCard && <MemoryModal card={selectedCard} color={cardsMap.find(c => c.card.id === selectedCard.id)?.color} onClose={() => setSelectedCard(null)} />}
      </AnimatePresence>
    </>
  );
}

// ============== STANDARD CARDS ==============

function ImpactCard({ card, category }: { card: CardData; category: Category }) {
  const cfg = CFG[category];
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 30, stiffness: 200 });
  const spotlightX = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });
  const spotlightY = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    mouseX.set((x / rect.width) - 0.5); mouseY.set((y / rect.height) - 0.5);
    spotlightX.set(x); spotlightY.set(y);
  };

  const spotlightTransform = useMotionTemplate`radial-gradient(circle 250px at ${spotlightX}px ${spotlightY}px, ${cfg.hex}15, transparent 80%)`;

  return (
    <motion.div variants={VARIANTS[category].item} style={{ perspective: 1200 }} className="group">
      <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative overflow-hidden rounded-[1.5rem] transition-all duration-500", "border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl", "hover:border-white/20 hover:bg-white/[0.04]", "p-6 sm:p-8 h-full flex flex-col gap-6 shadow-lg")}
      >
        <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" style={{ background: spotlightTransform }} />
        <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out origin-top scale-y-0 group-hover:scale-y-100" style={{ background: `linear-gradient(to bottom, transparent, ${cfg.hex}, transparent)` }} />

        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full gap-5">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-white/30 tracking-[0.15em]">{card.date}</span>
            {card.result && (
              <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-500 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]", "border-white/10 bg-white/5 text-white")}>
                <span className="relative z-10">{card.result}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xl sm:text-2xl font-bold text-white/80 group-hover:text-white transition-colors tracking-tight leading-snug">{card.title}</h4>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-semibold tracking-wide", cfg.accent)}>{card.organizer}</span>
              {card.duration && <span className="text-[10px] font-mono text-white/20 px-2 py-0.5 rounded-md bg-white/5">{card.duration}</span>}
            </div>
          </div>
          <p className="text-sm text-white/40 leading-relaxed max-w-[90%] group-hover:text-white/70 transition-colors flex-1 font-light">{card.note}</p>
          {card.actionText && (
            <div className="pt-2">
              <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 text-white/30 group-hover:text-white">
                {card.actionText} 
                <motion.span className={cn("p-1.5 rounded-full bg-white/5", cfg.accent)} whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <ArrowRight className="w-3 h-3" />
                </motion.span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function BackgroundEffects({ active, yParallax }: { active: Category | null, yParallax: any }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div style={{ y: yParallax }} className="absolute inset-0 pointer-events-none overflow-hidden h-[150%] -top-[25%] z-0">
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <motion.div animate={{ x: [0, 60, -30, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.9, 1] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-500/5 rounded-full blur-[160px] mix-blend-screen" />
      <motion.div animate={{ x: [0, -50, 60, 0], y: [0, 70, -30, 0], scale: [1, 0.9, 1.1, 1] }} transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[140px] mix-blend-screen" />
      <motion.div className="absolute w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-[0.12] transition-colors duration-1000" animate={{ x: mousePos.x - 500, y: mousePos.y - 500 }} transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
        style={{ background: active ? `radial-gradient(circle, ${CFG[active].hex} 0%, transparent 60%)` : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
      <motion.div animate={{ opacity: [0, 0.4, 0], y: ["-20%", "120%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-1/4 w-px h-[40vh] bg-gradient-to-b from-transparent via-white/20 to-transparent rotate-[15deg]" />
      <motion.div animate={{ opacity: [0, 0.3, 0], y: ["-20%", "120%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 7 }} className="absolute top-0 right-1/3 w-px h-[50vh] bg-gradient-to-b from-transparent via-white/10 to-transparent -rotate-[15deg]" />
    </motion.div>
  );
}

const CATEGORIES: Category[] = ["Competitions", "Community", "Leadership", "Certifications"];

// ============== CERTIFICATION CAPABILITY COMPONENTS ==============

const CERT_ACCENT: Record<string, { text: string; border: string; bg: string; glow: string; hex: string }> = {
  blue:    { text: "text-blue-400",    border: "border-blue-500/30",    bg: "bg-blue-500/10",    glow: "rgba(96,165,250,0.15)",  hex: "#60a5fa" },
  orange:  { text: "text-orange-400",  border: "border-orange-500/30",  bg: "bg-orange-500/10",  glow: "rgba(251,146,60,0.15)",  hex: "#fb923c" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.15)",  hex: "#34d399" },
  green:   { text: "text-green-400",   border: "border-green-500/30",   bg: "bg-green-500/10",   glow: "rgba(74,222,128,0.15)",  hex: "#4ade80" },
  teal:    { text: "text-teal-400",    border: "border-teal-500/30",    bg: "bg-teal-500/10",    glow: "rgba(45,212,191,0.15)",  hex: "#2dd4bf" },
  amber:   { text: "text-amber-400",   border: "border-amber-500/30",   bg: "bg-amber-500/10",   glow: "rgba(251,191,36,0.15)",  hex: "#fbbf24" },
};

function CapabilityPanel({ cert, onClick }: { cert: CertificationData; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const spotlightX = useSpring(useMotionValue(0), { damping: 40, stiffness: 150 });
  const spotlightY = useSpring(useMotionValue(0), { damping: 40, stiffness: 150 });
  const acc = CERT_ACCENT[cert.accent];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const spotlightTransform = useMotionTemplate`radial-gradient(circle 300px at ${spotlightX}px ${spotlightY}px, ${acc.glow}, transparent 80%)`;
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { damping: 35, stiffness: 180 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { damping: 35, stiffness: 180 });

  return (
    <motion.div variants={VARIANTS.Certifications.item} style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        className={cn(
          "relative overflow-hidden rounded-[1.25rem] border bg-[#030303] backdrop-blur-xl cursor-pointer group transition-all duration-500 shadow-xl",
          "border-white/[0.06] hover:border-opacity-60", `hover:${acc.border}`
        )}
      >
        {/* Scanline sweep */}
        <motion.div
          initial={{ x: "-100%" }} animate={{ x: "200%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12 z-0 pointer-events-none"
        />
        {/* Spotlight */}
        <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" style={{ background: spotlightTransform }} />
        {/* Left accent bar */}
        <div className={cn("absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-y-0 group-hover:scale-y-100 origin-top", acc.bg)} />
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* Certificate image strip — if image exists */}
        {cert.images.length > 0 && (
          <div className="relative h-28 sm:h-32 w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center saturate-[0.6] group-hover:saturate-100 opacity-70 group-hover:opacity-90 transition-all duration-700 group-hover:scale-[1.04]"
              style={{ backgroundImage: `url("${cert.images[0]}")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/30 to-[#030303]" />
          </div>
        )}

        <div style={{ transform: "translateZ(24px)" }} className={cn("relative z-10 flex flex-col gap-3", cert.images.length > 0 ? "px-5 pb-5 pt-2 sm:px-6 sm:pb-6 sm:pt-3" : "p-5 sm:p-6")}>
          {/* Provider + domain */}
          <div className="flex items-center justify-between">
            <span className={cn("text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border backdrop-blur-md", acc.border, acc.bg, acc.text)}>
              {cert.provider}
            </span>
            <span className="text-[9px] font-mono text-white/30 tracking-[0.15em]">{cert.date}</span>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-0.5">
            <h4 className="text-base sm:text-lg font-bold text-white/90 group-hover:text-white tracking-tight leading-snug transition-colors">{cert.title}</h4>
            <span className="text-[10px] text-white/40 font-medium tracking-wider">{cert.domain}</span>
          </div>

          {/* Capability insight */}
          <div className={cn("flex items-start gap-2 p-3 rounded-lg border transition-colors duration-500", "border-white/5 bg-white/[0.02] group-hover:border-opacity-40", `group-hover:${acc.border}`)}>
            <Layers className={cn("w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors duration-500 text-white/30 group-hover:opacity-100", acc.text)} />
            <p className="text-[11px] sm:text-xs text-white/60 font-light leading-relaxed group-hover:text-white/90 transition-colors italic">
              {cert.insight}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {cert.tags.map((t, i) => (
              <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-white/50 tracking-wider">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CapabilityModal({ cert, onClose }: { cert: CertificationData; onClose: () => void }) {
  const [expandedImage, setExpandedImage] = useState(false);
  const acc = CERT_ACCENT[cert.accent];
  const modalRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80" onClick={onClose}
    >
      <motion.div
        ref={modalRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ type: "spring", damping: 35, stiffness: 200 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#060606]/96 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col h-[85vh] sm:h-[80vh]"
      >
        {/* Ambient spotlight */}
        <motion.div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-60" style={{ background: useMotionTemplate`radial-gradient(700px circle at ${spotlightX} ${spotlightY}, ${acc.glow}, transparent 80%)` }} />
        {/* Scanline */}
        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }} className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 z-0 pointer-events-none" />
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

        {/* IMAGE / HERO — top 42% */}
        <div className="relative h-[42%] w-full shrink-0 overflow-hidden">
          {cert.images.length > 0 ? (
            <>
              <div
                className="absolute inset-[-5%] bg-cover bg-center saturate-90 cursor-zoom-in"
                style={{ backgroundImage: `url("${cert.images[0]}")` }}
                onClick={() => setExpandedImage(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/30 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-2 right-3 z-20 text-[9px] text-white/30 font-mono tracking-widest">CLICK TO EXPAND</div>
            </>
          ) : (
            <div className={cn("absolute inset-0 flex items-center justify-center", acc.bg)}>
              <div className="flex flex-col items-center gap-3 opacity-40">
                <BadgeCheck className={cn("w-16 h-16", acc.text)} />
                <span className={cn("text-xs font-mono tracking-widest uppercase", acc.text)}>{cert.provider}</span>
              </div>
            </div>
          )}
          {/* Title overlay on image */}
          <div className="absolute bottom-5 left-6 right-6 sm:bottom-6 sm:left-8 sm:right-8 z-20 flex flex-col gap-2 pointer-events-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2">
              <span className={cn("px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border backdrop-blur-md", acc.border, acc.bg, acc.text)}>{cert.provider}</span>
              <span className="px-3 py-1 text-[9px] font-mono tracking-[0.15em] rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md">{cert.domain}</span>
              <span className="px-3 py-1 text-[9px] font-mono tracking-[0.15em] rounded-full border border-white/10 bg-white/5 text-white/40 backdrop-blur-md">{cert.date}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, filter: "blur(10px)", y: 15 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
              {cert.title}
            </motion.h2>
          </div>
        </div>

        {/* CONTENT — bottom 58% */}
        <div className="h-[58%] px-6 py-5 sm:px-8 sm:py-6 flex flex-col justify-between relative z-10 overflow-hidden">
          <div className="flex flex-col gap-4">
            {/* Capability insight */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={cn("flex items-start gap-3 p-3.5 rounded-xl border", acc.border, acc.bg)}>
              <Layers className={cn("w-4 h-4 shrink-0 mt-0.5", acc.text)} />
              <p className={cn("text-sm sm:text-base font-light italic", acc.text)}>"{cert.insight}"</p>
            </motion.div>

            {/* Summary */}
            <motion.p initial={{ opacity: 0, y: 10, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.45, duration: 0.5 }} className="text-sm sm:text-[15px] text-white/80 leading-snug font-light line-clamp-3 sm:line-clamp-4">
              <HighlightedText text={cert.modalSummary} keywords={cert.storyKeywords} color={cert.accent === "orange" ? "gold" : cert.accent === "teal" ? "cyan" : cert.accent === "green" || cert.accent === "emerald" ? "cyan" : cert.accent === "amber" ? "gold" : "blue"} />
            </motion.p>

            {/* Tags */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2">
              {cert.tags.map((t, i) => (
                <span key={i} className={cn("px-2.5 py-1 text-[10px] font-mono rounded-md border", acc.border, acc.bg, acc.text)}>{t}</span>
              ))}
            </motion.div>
          </div>

          {/* LinkedIn CTA */}
          <div className="flex pt-3 border-t border-white/5 mt-auto">
            <motion.div initial={{ opacity: 0, y: 15, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.6 }}>
              <MagneticButton href={cert.links[0].url} colors={{ borderHover: `hover:${acc.border}`, text: acc.text, bg: acc.bg, borderBase: acc.border }} />
            </motion.div>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/80 hover:scale-110 transition-all backdrop-blur-xl z-50">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>

    {/* Fullscreen image viewer */}
    <AnimatePresence>
      {expandedImage && cert.images.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/97 backdrop-blur-2xl"
          onClick={() => setExpandedImage(false)}
        >
          <motion.img src={cert.images[0]}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95 }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={() => setExpandedImage(false)} className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors z-50">
            <X className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

function CertificationGrid({ data }: { data: CertificationData[] }) {
  const [selected, setSelected] = useState<CertificationData | null>(null);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {data.map(cert => (
          <CapabilityPanel key={cert.id} cert={cert} onClick={() => setSelected(cert)} />
        ))}
      </div>
      <AnimatePresence>
        {selected && <CapabilityModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}



export default function ImpactAtlas() {
  const [active, setActive] = useState<Category | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scrollIndicatorHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yParallaxHero = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yParallaxBg = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const toggle = (cat: Category) => setActive(p => p === cat ? null : cat);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 w-full overflow-hidden relative text-white">
      <BackgroundEffects active={active} yParallax={yParallaxBg} />

      <div className="hidden xl:flex flex-col items-center absolute left-10 top-[20%] bottom-[20%] w-8 z-20 pointer-events-none">
        <div className="w-px h-full bg-white/5 relative rounded-full overflow-hidden">
          <motion.div style={{ height: scrollIndicatorHeight }} className="w-full bg-gradient-to-b from-transparent via-white/40 to-white relative">
            <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] rounded-full" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div style={{ y: yParallaxHero }} className="text-center mb-10 sm:mb-12 relative z-20">
          <motion.div initial={{ opacity: 0, y: 20, filter: "blur(12px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-white/30 origin-right" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase">Career Signals</span>
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-white/30 origin-left" />
            </div>
            
            <h3 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[0.9] mb-4 sm:mb-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              <motion.span animate={{ textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 30px rgba(255,255,255,0.15)", "0 0 0px rgba(255,255,255,0)"] }} transition={{ duration: 4, repeat: Infinity }} className="text-white relative">
                Impact
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" animate={{ x: ["-200%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              </motion.span>
              <span className="font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10">Atlas.</span>
            </h3>
            
            <motion.p initial={{ opacity: 0, y: 15, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }} className="text-sm sm:text-base text-white/40 font-light max-w-lg mx-auto leading-relaxed">
              An interactive archive of professional momentum, leadership, and technical milestones.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-14 relative z-20">
          {CATEGORIES.map(cat => (
            <MagneticPill key={cat} label={cat} category={cat} isActive={active === cat} onClick={() => toggle(cat)} />
          ))}
        </motion.div>

        <div className="relative w-full z-20">
          <AnimatePresence mode="wait">
            {!active ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, overflow: "hidden" }} transition={{ duration: 0.4 }} className="text-center py-6 sm:py-8">
                <p className="text-[10px] sm:text-xs text-white/20 tracking-[0.3em] font-semibold uppercase mb-4">Select a category to initialize</p>
                <motion.div animate={{ height: [0, 30, 0], opacity: [0, 0.5, 0], y: [0, 5, 10] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="mx-auto w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
              </motion.div>
            ) : (
              <motion.div key={active} variants={VARIANTS[active].container} initial="hidden" animate="visible" exit="exit"
                className={cn(
                  (active === "Competitions" || active === "Community" || active === "Certifications") ? "block" : "grid gap-5 sm:gap-6",
                  active === "Leadership" && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                )}
              >
                {active === "Competitions" ? (
                  <BentoCompetitions data={COMPETITION_DATA} />
                ) : active === "Community" ? (
                  <BentoCommunity data={COMMUNITY_DATA} />
                ) : active === "Certifications" ? (
                  <CertificationGrid data={CERTIFICATION_DATA} />
                ) : (
                  DATA["Leadership"].map(card => (
                    <ImpactCard key={card.id} card={card} category={active} />
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
