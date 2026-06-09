"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export default function ChatArea({
  chatId,
  setChats,
}: any) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chats once
  useEffect(() => {
    loadChats();
  }, []);

  // Load messages when chat changes
  useEffect(() => {
    if (chatId && typeof chatId === "string") {
      loadMessages(chatId);
    }
  }, [chatId]);

  const loadChats = async () => {
    try {
      const res = await fetch("/api/chats");
      if (!res.ok) return;

      const data = await res.json();
      setChats(data);
    } catch (err) {
      console.error("Failed to load chats:", err);
    }
  };

  const loadMessages = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`);
      if (!res.ok) return;

      const data = await res.json();

      const formatted = data.map((msg: any) => ({
        id: msg._id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.createdAt).toLocaleTimeString(),
      }));

      setMessages(formatted);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!prompt || !chatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          role: "user",
          content: prompt,
        }),
      });

      setPrompt("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <div className="custom-scroll flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

          {/* Messages */}
          <div className="space-y-5">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Unicron anything..."
              className="flex-1 resize-none bg-transparent outline-none"
            />

            <button
              onClick={sendMessage}
              className="rounded-xl bg-cyan-500 px-4 py-3 text-black"
            >
              <Send size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
