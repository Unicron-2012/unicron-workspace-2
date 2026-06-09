"use client";

import { useState } from "react";
import AuroraBackground from "@/components/AuroraBackground";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ChatArea from "@/components/ChatArea";
import WorkspacePanel from "@/components/WorkspacePanel";
import DashboardCards from "@/components/DashboardCards";

export default function Home() {
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<any[]>([]);

  return (
    <main className="relative h-screen overflow-hidden bg-[#050816] text-white">
      <AuroraBackground />

      <div className="relative z-10 flex h-screen">
        <Sidebar
          chats={chats}
          chatId={chatId}
          setChatId={setChatId}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          <div className="flex flex-1 overflow-hidden">
            <ChatArea
              chatId={chatId}
              setChatId={setChatId}
              chats={chats}
              setChats={setChats}
            />

            <WorkspacePanel />
          </div>
        </div>

        <DashboardCards />
      </div>
    </main>
  );
}
