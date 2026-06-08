"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Eye,
  Code2,
  BarChart3,
  History,
  PanelRightClose,
} from "lucide-react";

import ArtifactPreview from "./ArtifactPreview";
import ArtifactCode from "./ArtifactCode";
import ArtifactAnalytics from "./ArtifactAnalytics";
import ArtifactHistory from "./ArtifactHistory";

type TabType =
  | "preview"
  | "code"
  | "analytics"
  | "history";

export default function WorkspacePanel() {
  const [activeTab, setActiveTab] =
    useState<TabType>("preview");

  const [width, setWidth] = useState(420);

  const tabs = [
    {
      id: "preview",
      label: "Preview",
      icon: Eye,
    },
    {
      id: "code",
      label: "Code",
      icon: Code2,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      id: "history",
      label: "History",
      icon: History,
    },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "preview":
        return <ArtifactPreview />;

      case "code":
        return <ArtifactCode />;

      case "analytics":
        return <ArtifactAnalytics />;

      case "history":
        return <ArtifactHistory />;

      default:
        return null;
    }
  };

  return (
    <motion.aside
      animate={{ width }}
      className="glass hidden border-l border-white/10 xl:flex flex-col"
      style={{ width }}
    >
      {/* Resize Handle */}

      <div
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = width;

          const onMove = (event: MouseEvent) => {
            setWidth(
              Math.max(
                350,
                startWidth -
                  (event.clientX - startX)
              )
            );
          };

          const onUp = () => {
            window.removeEventListener(
              "mousemove",
              onMove
            );

            window.removeEventListener(
              "mouseup",
              onUp
            );
          };

          window.addEventListener(
            "mousemove",
            onMove
          );

          window.addEventListener(
            "mouseup",
            onUp
          );
        }}
        className="absolute left-0 top-0 h-full w-1 cursor-col-resize"
      />

      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h2 className="font-semibold">
          Workspace
        </h2>

        <button>
          <PanelRightClose size={18} />
        </button>
      </div>

      {/* Tabs */}

      <div className="flex gap-2 p-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id as TabType)
            }
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
              activeTab === tab.id
                ? "bg-cyan-500/20 text-cyan-300"
                : "hover:bg-white/5"
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="custom-scroll flex-1 overflow-y-auto p-4">
        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          {renderTab()}
        </motion.div>
      </div>
    </motion.aside>
  );
}