"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim()) return;

    const fakeUser = {
      id: Date.now().toString(),
      name,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));

    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-80 p-6 border rounded-xl space-y-4">
        <h1 className="text-xl font-bold">Fake Login</h1>

        <input
          className="w-full p-2 bg-gray-800 rounded"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 text-black p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}