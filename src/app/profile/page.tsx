"use client";

import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  const updateUser = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated!");
  };

  if (!user) return null;

  return (
    <div className="flex h-screen items-center justify-center text-white">
      <div className="w-[350px] space-y-4 rounded-xl border border-white/10 p-6">
        <h1 className="text-xl font-bold">Profile</h1>

        <input
          className="w-full rounded bg-white/10 p-2"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          className="w-full rounded bg-white/10 p-2"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />

        <button
          onClick={updateUser}
          className="w-full rounded bg-cyan-500 p-2 text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}