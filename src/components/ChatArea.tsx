"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { Sparkles, Send } from "lucide-react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

import { mockMessages } from "@/data/messages";
import { suggestedPrompts } from "@/data/prompts";

export default function ChatArea() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="relative flex h-full flex-col">
      <div className="custom-scroll flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-10">
          {/* Hero */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
              <Sparkles size={16} />
              <span className="text-sm">
                Enterprise Intelligence Platform
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold md:text-6xl">
              What would you like to create?
            </h1>

            <p className="mt-4 text-slate-400">
              Build, analyze, research, and collaborate with AI.
            </p>
          </motion.div>

          {/* Suggested Prompts */}

          <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {suggestedPrompts.map((prompt) => (
              <motion.button
                whileHover={{
                  y: -5,
                }}
                key={prompt.title}
                className="glass glass-hover rounded-2xl p-5 text-left"
              >
                <h3 className="font-semibold">
                  {prompt.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {prompt.description}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Messages */}

          <div className="space-y-5">
            {mockMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}

            <TypingIndicator />
          </div>
        </div>
      </div>

      {/* Input */}

      <div className="border-t border-white/10 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="glass flex items-center gap-3 rounded-2xl p-3">
            <textarea
              rows={1}
              value={prompt}
              onChange={(e) =>
                setPrompt(e.target.value)
              }
              placeholder="Ask Unicron anything..."
              className="max-h-40 flex-1 resize-none bg-transparent outline-none"
            />

            <button className="rounded-xl bg-cyan-500 px-4 py-3 text-black transition hover:scale-105">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
