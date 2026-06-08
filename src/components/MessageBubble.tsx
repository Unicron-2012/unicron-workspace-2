"use client";

import { motion } from "framer-motion";
import { Message } from "@/data/messages";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-cyan-500/15 border border-cyan-500/20"
            : "glass"
        }`}
      >
        <p className="leading-relaxed text-sm md:text-base">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}