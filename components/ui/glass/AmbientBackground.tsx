"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0a0f] pointer-events-none">
      {/* Indigo Top-Left */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#6366f1] blur-[120px] mix-blend-screen opacity-15"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Violet Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#8b5cf6] blur-[100px] mix-blend-screen opacity-10"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Cyan Bottom-Right */}
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#06b6d4] blur-[120px] mix-blend-screen opacity-[0.08]"
        animate={{
          x: [0, -50, 20, 0],
          y: [0, -20, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
