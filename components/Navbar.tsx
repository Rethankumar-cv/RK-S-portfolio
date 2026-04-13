"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((link) => link.name.toLowerCase());
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            current = section;
          }
        }
      }

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false); // Make sure it closes out if opened globally
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] flex justify-center mt-4 sm:mt-6 px-4 pointer-events-none"
      >
        <div 
          className={cn(
            "pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 shadow-xl",
            scrolled 
              ? "bg-[#030303]/70 backdrop-blur-xl border border-white/10 w-full max-w-3xl" 
              : "bg-white/[0.04] backdrop-blur-md border border-white/[0.08] w-full max-w-4xl"
          )}
        >
          {/* Logo */}
          <a 
            href="#" 
            className="text-lg sm:text-xl font-bold tracking-tighter text-white transition-all hover:opacity-80 relative z-50 p-2 -ml-2"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            RK<span className="text-indigo-400">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "relative px-5 py-2 text-sm font-medium transition-colors rounded-full",
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/10 border border-white/5 rounded-full"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Native Mobile Hamburger Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-neutral-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
              <span className={cn("w-full h-[2px] bg-current transform transition-all duration-300 origin-left", menuOpen ? "rotate-45 translate-x-1" : "")} />
              <span className={cn("w-full h-[2px] bg-current transition-all duration-300", menuOpen ? "translate-x-full opacity-0" : "")} />
              <span className={cn("w-full h-[2px] bg-current transform transition-all duration-300 origin-left", menuOpen ? "-rotate-45 translate-x-1" : "")} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Massive Slide-in Mobile App Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-[100dvh] w-4/5 max-w-sm bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-[58] md:hidden flex flex-col justify-center px-8"
            >
              <nav className="flex flex-col gap-6 w-full relative z-10 mt-12">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-2xl font-semibold tracking-wide text-neutral-300 active:text-white transition-colors py-4 border-b border-white/[0.05]"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              
              {/* Bottom Decoration inside drawer */}
              <div className="absolute bottom-12 left-8 right-8 text-xs text-neutral-500 font-medium tracking-widest uppercase">
                rk • portfolio
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
