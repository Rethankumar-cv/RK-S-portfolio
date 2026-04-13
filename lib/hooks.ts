"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if device relies primarily on coarse touch inputs or is under mobile width boundaries
 */
export function useIsMobile() {
  // Default to true for safer mobile-first hydration
  const [isMobile, setIsMobile] = useState(true); 

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse), (max-width: 640px)");
    setIsMobile(mql.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

/**
 * Hook to detect tablet specific grid layouts (640px -> 1024px)
 */
export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 641px) and (max-width: 1024px)");
    setIsTablet(mql.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isTablet;
}
