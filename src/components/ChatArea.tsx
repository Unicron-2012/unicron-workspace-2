

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
  const [isTyping, setIsTyping] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (chatId) {
      loadMessages(chatId);
    }
  }, [chatId]);

  const loadChats = async () => {
    const res = await fetch("/api/chats");
    const data = await res.json();
    setChats(data);
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

  const currentPrompt = prompt;

  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: currentPrompt,
    timestamp: new Date().toLocaleTimeString(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setPrompt("");
  setIsTyping(true);

  try {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        role: "user",
        content: currentPrompt,
        isFirstMessage: messages.length === 0,
      }),
    });

    const data = await res.json();

    const assistantMessage: Message = {
      id: Date.now().toString() + "-ai",
      role: "assistant",
      content: data.content,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [
      ...prev,
      assistantMessage,
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    setIsTyping(false);
  }
};
  return (
    <div className="flex h-full flex-col bg-[#0b0f19]">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[70vh]"
            >
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                <Sparkles size={16} />
                Unicron AI
              </div>

              <h1 className="text-5xl font-bold mt-8 text-center">
                How can I help you today?
              </h1>

              <p className="text-zinc-400 mt-4 text-center max-w-xl">
                Ask questions, generate content, brainstorm ideas,
                or build something amazing.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8 pb-8">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  message={m}
                />
              ))}

              {isTyping && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-[#0d1117] p-5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-3 flex items-end gap-3">
            <textarea
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Message Unicron..."
              className="flex-1 resize-none bg-transparent outline-none text-white placeholder:text-zinc-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={!prompt.trim()}
              className="h-10 w-10 rounded-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>

          <p className="text-xs text-zinc-500 text-center mt-2">
            Unicron can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
