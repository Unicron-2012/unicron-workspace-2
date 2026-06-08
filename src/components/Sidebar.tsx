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

const navItems = [
  {
    label: "Chats",
    icon: MessageSquare,
  },
  {
    label: "Projects",
    icon: FolderKanban,
  },
  {
    label: "Agents",
    icon: Bot,
  },
  {
    label: "Files",
    icon: Files,
  },
  {
    label: "Analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

const conversations = [
  "Marketing Strategy",
  "AI Product Design",
  "Sales Forecast",
  "Research Notes",
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{
        width: collapsed ? 80 : 280,
      }}
      className="glass hidden border-r border-white/10 md:flex flex-col"
    >
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

      <div className="px-3">
        <button className="glass-hover flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 p-3">
          <Plus size={18} />
          {!collapsed && "New Chat"}
        </button>
      </div>

      <nav className="mt-6 flex-1 px-3">
        {navItems.map((item) => (
          <motion.button
            whileHover={{ x: 4 }}
            key={item.label}
            className="glass-hover mb-2 flex w-full items-center gap-3 rounded-xl p-3"
          >
            <item.icon size={18} />

            {!collapsed && (
              <span className="text-sm">{item.label}</span>
            )}
          </motion.button>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-4">
          <p className="mb-3 text-xs uppercase text-slate-500">
            Recent
          </p>

          <div className="space-y-2">
            {conversations.map((chat) => (
              <div
                key={chat}
                className="truncate rounded-lg p-2 text-sm text-slate-400 hover:bg-white/5"
              >
                {chat}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.aside>
  );
}