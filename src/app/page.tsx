import AuroraBackground from "@/components/AuroraBackground";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ChatArea from "@/components/ChatArea";
import WorkspacePanel from "@/components/WorkspacePanel";
import DashboardCards from "@/components/DashboardCards";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#050816] text-white">
      <AuroraBackground />

      <div className="relative z-10 flex h-screen">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <ChatArea />
            </div>

            <WorkspacePanel />
          </div>
        </div>

        <DashboardCards />
      </div>
    </main>
  );
}