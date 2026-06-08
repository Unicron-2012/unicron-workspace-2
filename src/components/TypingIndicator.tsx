"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="glass inline-flex items-center gap-2 rounded-2xl px-4 py-3">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.7,
            delay: dot * 0.15,
          }}
          className="h-2 w-2 rounded-full bg-cyan-400"
        />
      ))}
    </div>
  );
}