"use client";

import {
  Bell,
  Search,
  Moon,
  Menu,
} from "lucide-react";

import { Avatar, AvatarFallback } from "src/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="glass flex h-16 items-center justify-between border-b border-white/10 px-6">
      <div className="flex items-center gap-4">
        <button className="md:hidden">
          <Menu />
        </button>

        <h1 className="text-lg font-semibold">
          Unicron Workspace
        </h1>
      </div>

      <div className="hidden md:flex items-center">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={16}
          />

          <input
            placeholder="Search..."
            className="glass h-10 w-[320px] rounded-xl pl-10 pr-4 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 hover:bg-white/10">
          <Moon size={18} />
        </button>

        <button className="rounded-lg p-2 hover:bg-white/10">
          <Bell size={18} />
        </button>

        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}