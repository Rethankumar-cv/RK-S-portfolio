"use client";

import { useEffect, useState } from "react";
import ColorBends from "@/components/ui/ColorBends";

// ─── Constants & Configs ──────────────────────────────────────────────────────
const PALETTE = ["#ff5c7a", "#8a5cff", "#00ffd1"];

const DESKTOP_CONFIG = {
  colors: PALETTE,
  rotation: -7,
  speed: 0.46,
  scale: 1.8,
  frequency: 1,
  warpStrength: 1,
  mouseInfluence: 1.05,
  noise: 0.15,
  parallax: 0.5,
  iterations: 1,
  intensity: 0.20, // Reduced from 1.1 for better readability
  bandWidth: 7,
  transparent: true,
  autoRotate: 0,
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function FallbackBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        // Ordered from top-layer to base-layer
        background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6)), radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.25), transparent 60%), radial-gradient(circle at 50% 50%, rgba(34,211,238,0.15), transparent 70%), linear-gradient(135deg, #030303, #050505, #030303)",
      }}
    >
      {/* Depth effect blur layer */}
      <div className="absolute inset-0 backdrop-blur-[40px]" />
    </div>
  );
}

// ─── Main System ──────────────────────────────────────────────────────────────

export default function BackgroundCanvas() {
  const [renderState, setRenderState] = useState<"loading" | "colorbends" | "fallback">("loading");

  useEffect(() => {
    // 1. Robust Device Check (Coarse pointer = Mobile/Touch)
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // 2. Strict WebGL Availability Check
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

    // 3. Render Rule (Same for all devices, only skip if WebGL fundamentally fails)
    if (webglAvailable) {
      setRenderState("colorbends");
    } else {
      setRenderState("fallback");
    }
  }, []);

  return (
    <div
      id="background-system-root"
      className="pointer-events-none overflow-hidden"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100vh", // Strict guarantee for mobile sizing
        minHeight: "100vh",
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      {/* ── Global Background Layers ── */}
      {renderState === "loading" ? (
        <FallbackBackground />
      ) : renderState === "colorbends" ? (
        <ColorBends {...DESKTOP_CONFIG} className="absolute inset-0 w-full h-full" />
      ) : (
        <FallbackBackground />
      )}

      {/* Radial glow behind central content – subtle cyan/violet diffusion */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: "radial-gradient(circle at 50% 30%, rgba(0,255,255,0.12), rgba(138,92,255,0.08), transparent 70%)",
      }} />
      {/* Global Dark Overlay for depth layering */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "rgba(0, 0, 0, 0.45)",
          zIndex: -1
        }}
      />

      {/* ── Readability Overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3,3,3,0.60) 100%), linear-gradient(180deg, rgba(3,3,3,0.20) 0%, rgba(3,3,3,0.08) 50%, rgba(3,3,3,0.25) 100%)",
        }}
      />
      {/* Noise Texture */}
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
