"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("alex@learnflow.io");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-16 sm:hidden pointer-events-none">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-lg">
          🎓
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">LearnFlow</h1>
        <p className="text-white/70 text-sm mt-1">Level up your skills, your way.</p>
      </div>

      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pt-8 pb-10 sm:pb-8">
        <div className="hidden sm:flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-md mb-3">
            🎓
          </div>
          <h1 className="text-2xl font-bold text-gray-800">LearnFlow</h1>
          <p className="text-gray-400 text-sm mt-0.5">Level up your skills, your way.</p>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome back</h2>
        <p className="text-gray-400 text-sm mb-6">Sign in to continue your learning journey.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                placeholder="password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1.5">
              <button type="button" className="text-xs text-violet-500 font-medium hover:text-violet-700 transition-colors">
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-md shadow-violet-200 hover:shadow-violet-300 active:scale-[0.98] transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Don&apos;t have an account?{" "}
          <span className="text-violet-500 font-semibold cursor-pointer hover:text-violet-700">
            Sign up free
          </span>
        </p>
      </div>
    </div>
  );
}