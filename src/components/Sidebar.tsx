"use client";

import { useState } from "react";
import {
  MessageSquare,
  FolderKanban,
  Bot,
  Files,
  BarChart3,
  Settings,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { motion } from "framer-motion";

type Chat = {
  _id: string;
  title?: string;
};

interface SidebarProps {
  chats: Chat[];
  chatId: string;
  setChatId: (id: string) => void;
}

export default function Sidebar({
  chats,
  chatId,
  setChatId,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      className="glass hidden border-r border-white/10 md:flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Unicron
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-white/10"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-3">
        <button
          onClick={async () => {
            const res = await fetch("/api/chat", {
              method: "POST",
            });

            const data = await res.json();

            // Only switch chat (NO setChats here)
            setChatId(data._id);
          }}
          className="glass-hover flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 p-3"
        >
          <Plus size={18} />
          {!collapsed && "New Chat"}
        </button>
      </div>

      {/* Chat List */}
      <nav className="mt-6 flex-1 px-3 space-y-2">
        {chats.map((chat) => (
          <button
            key={chat._id}
            onClick={() => setChatId(chat._id)}
            className={`w-full text-left truncate rounded-lg p-2 text-sm transition hover:bg-white/5 ${
              chatId === chat._id
                ? "bg-white/10 text-white"
                : "text-slate-400"
            }`}
          >
            {chat.title || "New Chat"}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      {!collapsed && (
        <div className="p-4">
          <p className="mb-3 text-xs uppercase text-slate-500">
            Navigation
          </p>

          <div className="space-y-2">
            {[
              "Marketing Strategy",
              "AI Product Design",
              "Sales Forecast",
            ].map((item) => (
              <div
                key={item}
                className="truncate rounded-lg p-2 text-sm text-slate-400 hover:bg-white/5"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.aside>
  );
}
