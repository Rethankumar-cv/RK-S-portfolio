"use client";

/**
 * BackgroundCanvas
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen fixed background.
 * Desktop: React Bits ColorBends WebGL shader.
 * Mobile / WebGL Fallback: Layered premium CSS gradients.
 *
 * Layering:
 *   position: fixed | inset: 0 | z-index: -1
 *   pointer-events: none  →  never intercepts page interactions
 */

import { useMemo, useEffect, useState } from "react";
import { useIsMobile, useIsTablet } from "@/lib/hooks";
import ColorBends from "@/components/ui/ColorBends";

// ─── Palette ──────────────────────────────────────────────────────────────────
const PALETTE = ["#ff5c7a", "#8a5cff", "#00ffd1"];

// ─── Device configs ──────────────────────────────────────────────────────────

const DESKTOP = {
  colors:         PALETTE,
  rotation:       -7,
  speed:          0.46,
  scale:          1.8,
  frequency:      1,
  warpStrength:   1,
  mouseInfluence: 1.05,
  noise:          0.15,
  parallax:       0.5,
  iterations:     1,
  intensity:      1.1,
  bandWidth:      7,
  transparent:    true,
  autoRotate:     0,
} as const;

const TABLET = {
  ...DESKTOP,
  mouseInfluence: 0.3,
  speed:          0.28,
  scale:          1.4,
  intensity:      0.9,
  parallax:       0.15,
  autoRotate:     0.08,
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function BackgroundCanvas() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check WebGL availability on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const config = useMemo(() => {
    if (isTablet) return TABLET;
    return DESKTOP;
  }, [isTablet]);

  const shouldFallback = isMobile || !hasWebGL;

  return (
    <div
      className="pointer-events-none overflow-hidden"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        minHeight: "100vh",
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      {shouldFallback ? (
        /* ── Premium CSS Fallback ────────────────────────────────────────── */
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6)),
              radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent 60%),
              radial-gradient(circle at 80% 70%, rgba(168,85,247,0.25), transparent 60%),
              radial-gradient(circle at 50% 50%, rgba(34,211,238,0.15), transparent 70%),
              linear-gradient(135deg, #030303, #050505, #030303)
            `
          }}
        >
          {/* Depth effect blur layer */}
          <div className="absolute inset-0 backdrop-blur-[40px]" />
        </div>
      ) : (
        /* ── WebGL Shader Layer ──────────────────────────────────────────── */
        <ColorBends 
          {...config} 
          className="absolute inset-0 w-full h-full" 
        />
      )}

      {/*
       * ── Readability Overlay (Always present) ────────────────────────────
       * Radial vignette darkens corners; linear wash ensures minimum
       * contrast floor for text and UI elements above the shader.
       */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3,3,3,0.60) 100%)",
            "linear-gradient(180deg, rgba(3,3,3,0.20) 0%, rgba(3,3,3,0.08) 50%, rgba(3,3,3,0.25) 100%)",
          ].join(", "),
        }}
      />

      {/*
       * ── Film Grain ──────────────────────────────────────────────────────
       * SVG fractal noise data-URI — adds premium micro-texture.
       * Opacity intentionally low; felt, not seen.
       */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
