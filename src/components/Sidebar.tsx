"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  X,
} from "lucide-react";

type Chat = {
  _id: string;
  title?: string;
};

export default function Sidebar({
  chats,
  chatId,
  setChatId,
  setChats,
}: any) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const createChat = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await res.json();

      setChats((prev: Chat[]) => [data, ...prev]);
      setChatId(data._id);

      localStorage.setItem("chatId", data._id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChat = async (
    e: React.MouseEvent,
    chatToDelete: Chat
  ) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this chat?"
    );

    if (!confirmed) return;

    try {
      await fetch(`/api/chat/${chatToDelete._id}`, {
        method: "DELETE",
      });

      setChats((prev: Chat[]) =>
        prev.filter((chat) => chat._id !== chatToDelete._id)
      );

      if (chatId === chatToDelete._id) {
        setChatId("");
        localStorage.removeItem("chatId");
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("chatId");

    router.push("/login");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 300 }}
      transition={{ duration: 0.2 }}
      className="h-full bg-zinc-950 border-r border-zinc-800 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-white">
            Unicron
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-zinc-400 hover:text-white transition"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={createChat}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white py-3 transition"
        >
          <Plus size={18} />
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto px-2">
        {chats?.length === 0 && !collapsed && (
          <p className="text-center text-zinc-500 text-sm mt-4">
            No chats yet
          </p>
        )}

        {chats?.map((chat: Chat) => (
          <div
            key={chat._id}
            className={`group flex items-center rounded-xl mb-2 transition ${
              chatId === chat._id
                ? "bg-zinc-800"
                : "hover:bg-zinc-900"
            }`}
          >
            <button
              onClick={() => {
                setChatId(chat._id);
                localStorage.setItem("chatId", chat._id);
              }}
              className="flex-1 text-left px-3 py-3 text-white overflow-hidden"
            >
              {!collapsed && (
                <span className="truncate block">
                  {chat.title || "New Chat"}
                </span>
              )}
            </button>

            {!collapsed && (
              <button
                onClick={(e) => deleteChat(e, chat)}
                className="opacity-0 group-hover:opacity-100 mr-2 p-1 rounded text-zinc-500 hover:text-red-500 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
            {mounted && user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          {!collapsed && mounted && (
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-sm text-white truncate">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-zinc-500 truncate">
                {user?.email || ""}
              </p>
            </div>
          )}

          <button
            onClick={logout}
            className="text-zinc-400 hover:text-red-400 transition"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}