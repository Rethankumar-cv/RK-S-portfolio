"use client";

import { useEffect, useState, useMemo } from "react";
import ColorBends from "@/components/ui/ColorBends";
import AmbientBackground from "@/components/ui/glass/AmbientBackground";
import { useIsMobile } from "@/lib/hooks";

// ─── Constants & Configs ──────────────────────────────────────────────────────
const PALETTE = ["#6366f1", "#8b5cf6", "#06b6d4"];

const BASE_CONFIG = {
  colors:         PALETTE,
  rotation:       -7,
  speed:          0.05, // Slower float
  scale:          1.5,
  frequency:      1,
  warpStrength:   1,
  noise:          0.10,
  intensity:      1.0,
  bandWidth:      5,
  transparent:    true,
  autoRotate:     0,
} as const;

const DESKTOP_CONFIG = {
  ...BASE_CONFIG,
  mouseInfluence: 1.05,
  parallax:       0.5,
  iterations:     2,
};

const MOBILE_CONFIG = {
  ...BASE_CONFIG,
  mouseInfluence: 0,
  parallax:       0,
  iterations:     1, // Reduced logic on mobile
};

export default function BackgroundCanvas() {
  const [renderState, setRenderState] = useState<"loading" | "colorbends" | "fallback">("loading");
  const isMobile = useIsMobile();

  const config = useMemo(() => {
    return isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  }, [isMobile]);

  useEffect(() => {
    // Strict WebGL Availability Check
    let webglAvailable = false;
    try {
      const canvas = document.createElement("canvas");
      webglAvailable = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      webglAvailable = false;
    }

    if (webglAvailable) {
      setRenderState("colorbends");
    } else {
      setRenderState("fallback");
    }
  }, []);

  return (
    <div
      id="background-system-root"
      className="pointer-events-none overflow-hidden bg-[#0a0a0f]"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      {/* ── Content Layer ── */}
      {renderState === "loading" ? (
        <AmbientBackground />
      ) : renderState === "colorbends" ? (
        <div className="absolute inset-0 opacity-[0.20] mix-blend-screen">
          <ColorBends {...config} className="absolute inset-0 w-full h-full" />
        </div>
      ) : (
        <AmbientBackground />
      )}

      {/* ── Global Overlays ── */}
      {/* Film Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
