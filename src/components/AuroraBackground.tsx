
"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -80, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-[-15%] top-[-15%] h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 120, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-violet-600/20 blur-[160px]"
      />

      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 100, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-sky-400/15 blur-[140px]"
      />
    </div>
  );
}