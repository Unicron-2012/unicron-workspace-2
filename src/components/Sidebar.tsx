"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

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
  const [collapsed, setCollapsed] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const createChat = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
      }),
    });

    const data = await res.json();

    setChats((prev: Chat[]) => [data, ...prev]);
    setChatId(data._id);

    localStorage.setItem("chatId", data._id);
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-full border-r flex flex-col"
    >
      <div className="p-3 flex justify-between">
        <h2 className="font-bold">{!collapsed && "Unicron"}</h2>

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? ">" : "<"}
        </button>
      </div>

      <div className="p-3">
        <button
          onClick={createChat}
          className="w-full flex items-center gap-2 p-2 border rounded"
        >
          <Plus size={16} />
          {!collapsed && "New Chat"}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2 space-y-2">
        {chats.map((chat: Chat) => (
          <div
            key={chat._id}
            onClick={() => {
              setChatId(chat._id);
              localStorage.setItem("chatId", chat._id);
            }}
            className={`p-2 rounded cursor-pointer ${
              chatId === chat._id ? "bg-gray-700" : ""
            }`}
          >
            {chat.title || "New Chat"}
          </div>
        ))}
      </div>
    </motion.aside>
  );
}