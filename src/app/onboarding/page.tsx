"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const user = {
      id: crypto.randomUUID(),
      name,
      phone,
    };

    localStorage.setItem("user", JSON.stringify(user));

    router.push("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="w-[350px] space-y-4 rounded-xl border border-white/10 p-6">
        <h1 className="text-xl font-bold">Onboarding</h1>

        <input
          className="w-full rounded bg-white/10 p-2"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded bg-white/10 p-2"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full rounded bg-cyan-500 p-2 text-black"
        >
          Continue
        </button>
      </div>
    </div>
  );
}