"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Active Models",
    value: "12",
  },
  {
    title: "Response Time",
    value: "0.84s",
  },
  {
    title: "Token Usage",
    value: "84K",
  },
  {
    title: "System Status",
    value: "Healthy",
  },
];

export default function DashboardCards() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 hidden xl:flex flex-col gap-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -5, 0],
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            y: {
              repeat: Infinity,
              duration: 4,
            },
          }}
          className="glass min-w-[220px] rounded-2xl p-4"
        >
          <p className="text-xs text-slate-400">
            {card.title}
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            {card.value}
          </h3>
        </motion.div>
      ))}
    </div>
  );
}