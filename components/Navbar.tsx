"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import GlassPill from "@/components/ui/glass/GlassPill";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Process", href: "#process" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Dynamic glass values based on scroll
  const blurValue = useTransform(scrollY, [0, 100], [20, 40]);
  const opacityValue = useTransform(scrollY, [0, 100], [0.03, 0.05]);
  const saturateValue = useTransform(scrollY, [0, 100], [150, 180]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            current = id;
          }
        }
      }

      if (current !== activeSection) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] flex justify-center mt-6 px-4 pointer-events-none"
      >
        <motion.div
          style={{
            backdropFilter: useTransform(blurValue, (v) => `blur(${v}px) saturate(${saturateValue}%)`),
            backgroundColor: useTransform(opacityValue, (v) => `rgba(255, 255, 255, ${v})`),
          }}
          className="pointer-events-auto flex items-center justify-between px-6 py-2 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-[600px] relative"
        >
          {/* Top specular edge */}
          <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Logo / Home */}
          <a
            href="#"
            className="text-lg font-black tracking-tighter text-white hover:opacity-75 transition-opacity z-50 px-2"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            RK<span className="text-indigo-400">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.slice(0, 5).map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "relative px-4 py-1.5 text-[12px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full group",
                    isActive ? "text-white" : "text-neutral-500 hover:text-neutral-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* "Open to opportunities" badge (Desktop) or contact link */}
          <div className="hidden md:flex items-center ml-2">
             <GlassPill 
               interactive 
               tint="emerald" 
               className="cursor-pointer"
               onClick={(e: any) => handleLinkClick(e as any, "#contact")}
             >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Now Available
             </GlassPill>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 p-2 -mr-1 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn("w-full h-[1.5px] bg-current transform transition-all duration-300 origin-left", menuOpen ? "rotate-45 translate-y-[-0.5px]" : "")} />
              <span className={cn("w-full h-[1.5px] bg-current transition-all duration-200", menuOpen ? "opacity-0 translate-x-2" : "")} />
              <span className={cn("w-full h-[1.5px] bg-current transform transition-all duration-300 origin-left", menuOpen ? "-rotate-45 translate-y-[0.5px]" : "")} />
            </div>
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile drawer (Redesigned with glass-ultra) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[55] md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-[100dvh] w-[80vw] glass-ultra border-l border-white/10 z-[58] md:hidden flex flex-col pt-32 pb-10 px-8"
            >
              <nav className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={cn(
                        "flex items-center justify-between py-4 px-5 rounded-2xl text-lg font-bold tracking-tight transition-all",
                        isActive
                          ? "text-white bg-white/10 border border-white/10"
                          : "text-neutral-400 active:bg-white/5 active:text-white"
                      )}
                    >
                      {link.name}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="border-t border-white/5 pt-8 mt-4">
                <p className="text-[10px] text-neutral-600 font-bold tracking-[0.2em] uppercase mb-1">
                  Connect
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-white/40 hover:text-white transition-colors uppercase text-[11px] font-bold tracking-wider">GitHub</a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors uppercase text-[11px] font-bold tracking-wider">LinkedIn</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
