"use client";

import React, { useState, FormEvent } from "react";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import your Auth Hook
import { jwtDecode } from "jwt-decode"; // Import decoder

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { setUser } = useAuth(); // Access setUser to update global state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. API Call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 2. Store Token in LocalStorage
      localStorage.setItem("token", data.token);

      // 3. Decode Token & Update Context State (Crucial for ProtectedRoute)
      const decoded: any = jwtDecode(data.token);
      setUser(decoded);

      toast.success("Login successful! Redirecting...");

      // 4. Redirect to Dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-2xl rounded-[2.5rem] p-10 border border-slate-100"
      >
        {/* LOGO & TITLE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <FaSignInAlt size={28} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Please enter your details to access your dashboard
          </p>
        </div>

        {/* INPUT FIELDS */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-11 text-slate-400 hover:text-blue-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black mt-10 hover:bg-blue-600 transition-all active:scale-95 disabled:bg-slate-300 shadow-xl shadow-slate-200 uppercase tracking-widest text-sm"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-xs"></span>
              Verifying...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* FOOTER */}
        <p className="text-center mt-6 text-slate-500 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
