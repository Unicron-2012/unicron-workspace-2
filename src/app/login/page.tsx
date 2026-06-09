"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim()) return;

    const user = {
      id: Date.now().toString(),
      name,
    };

    localStorage.setItem("user", JSON.stringify(user));

    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#050816] text-white">
      <div className="glass p-8 rounded-2xl w-[300px] space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          className="w-full p-2 rounded bg-black/40"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 text-black py-2 rounded"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
