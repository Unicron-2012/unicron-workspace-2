"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";

export default function Home() {
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#050816] text-white">
      <Sidebar
        chats={chats}
        setChats={setChats}
        chatId={chatId}
        setChatId={setChatId}
      />

      <div className="flex-1">
        <ChatArea
          chatId={chatId}
          setChatId={setChatId}
          chats={chats}
          setChats={setChats}
        />
      </div>
    </div>
  );
}