"use client";

/**
 * BackgroundCanvas
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen fixed background powered by the React Bits ColorBends WebGL shader.
 * Adapts intelligently across Mobile / Tablet / Desktop device tiers.
 *
 * Layering:
 *   position: fixed | inset: 0 | z-index: -1
 *   pointer-events: none  →  never intercepts page interactions
 */

import { useMemo } from "react";
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

const MOBILE = {
  ...DESKTOP,
  mouseInfluence: 0,    // disabled — no cursor on touch devices
  parallax:       0,    // disabled — prevents motion sickness / GPU waste
  speed:          0.2,
  intensity:      0.8,
  scale:          1.2,
  autoRotate:     0.06,
  warpStrength:   0.5,  // lighter warp pass
  noise:          0.05,
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function BackgroundCanvas() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const config = useMemo(() => {
    if (isMobile) return MOBILE;
    if (isTablet) return TABLET;
    return DESKTOP;
  }, [isMobile, isTablet]);

  return (
    <div
      className="pointer-events-none overflow-hidden"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      {/* ── WebGL Shader Layer ──────────────────────────────────────────── */}
      <ColorBends {...config} className="absolute inset-0 w-full h-full" />

      {/*
       * ── Readability Overlay ─────────────────────────────────────────────
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
