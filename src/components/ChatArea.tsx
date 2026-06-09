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
  setChatId,
  chats,
  setChats,
}: any) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (chatId) loadMessages(chatId);
  }, [chatId]);

  const loadChats = async () => {
    const res = await fetch("/api/chats");
    const data = await res.json();
    setChats(data);
  };

  const createChat = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
      }),
    });

    const data = await res.json();

    setChatId(data._id);
    localStorage.setItem("chatId", data._id);

    loadChats();
  };

  const loadMessages = async (id: string) => {
    const res = await fetch(`/api/messages/${id}`);
    const data = await res.json();

    setMessages(
      data.map((msg: any) => ({
        id: msg._id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.createdAt).toLocaleTimeString(),
      }))
    );
  };

  const sendMessage = async () => {
    if (!prompt.trim() || !chatId) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      chatId,
      role: "user",
      content: prompt,
      isFirstMessage: messages.length === 0,
}),
    });

    setPrompt("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">

        <motion.div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full">
            <Sparkles size={16} />
            AI Chat Platform
          </div>

          <h1 className="text-4xl font-bold mt-6">
            What would you like to build?
          </h1>
        </motion.div>

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        <TypingIndicator />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            placeholder="Ask something..."
          />

          <button
            onClick={sendMessage}
            className="bg-cyan-500 px-4 py-2 rounded"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}