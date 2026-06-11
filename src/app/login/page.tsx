"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md p-8 border border-gray-800 rounded-2xl bg-zinc-950 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 mt-2">
            Sign in to continue to your workspace
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-cyan-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-cyan-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold p-3 rounded-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <div className="my-6 border-t border-zinc-800"></div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">
            Don't have an account?
          </p>

          <button
            onClick={() => router.push("/register")}
            className="w-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition p-3 rounded-lg font-medium"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}