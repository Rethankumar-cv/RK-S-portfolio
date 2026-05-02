"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

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
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-center mt-4 sm:mt-5 px-4 pointer-events-none"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-500",
            scrolled
              ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] w-full max-w-2xl"
              : "bg-white/[0.03] backdrop-blur-md border border-white/[0.06] w-full max-w-3xl"
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="text-base sm:text-lg font-black tracking-tighter text-white hover:opacity-75 transition-opacity z-50 px-1"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            RK<span className="text-indigo-400">.</span>
          </a>

          {/* Desktop nav — show only core 4 links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.slice(0, 4).map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "relative px-4 py-1.5 text-[13px] font-medium transition-all duration-200 rounded-full group",
                    isActive ? "text-white" : "text-neutral-500 hover:text-neutral-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.06] rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 text-[13px] font-medium text-neutral-300 hover:text-white"
          >
            Contact
            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 p-2 -mr-1 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={cn(
                  "w-full h-[1.5px] bg-current transform transition-all duration-300 origin-left",
                  menuOpen ? "rotate-45 translate-y-[-0.5px]" : ""
                )}
              />
              <span
                className={cn(
                  "w-full h-[1.5px] bg-current transition-all duration-200",
                  menuOpen ? "opacity-0 translate-x-2" : ""
                )}
              />
              <span
                className={cn(
                  "w-full h-[1.5px] bg-current transform transition-all duration-300 origin-left",
                  menuOpen ? "-rotate-45 translate-y-[0.5px]" : ""
                )}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[990] md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-[100dvh] w-[78vw] max-w-xs bg-[#080808]/98 backdrop-blur-2xl border-l border-white/[0.07] z-[995] md:hidden flex flex-col pt-24 pb-10 px-7"
            >
              <nav className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.05, duration: 0.35 }}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-semibold tracking-tight transition-colors",
                        isActive
                          ? "text-white bg-white/[0.06] border border-white/[0.08]"
                          : "text-neutral-400 active:text-white active:bg-white/[0.04]"
                      )}
                    >
                      {link.name}
                      {isActive && (
                        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="border-t border-white/[0.06] pt-6 mt-4">
                <p className="text-[11px] text-neutral-600 font-medium tracking-[0.15em] uppercase">
                  Rethan Kumar · Portfolio
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
