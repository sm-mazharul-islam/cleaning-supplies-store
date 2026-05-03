"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/Firebase";
import NavbarTwo from "@/components/shared/NavbarTwo";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- টোকেন সেভ করার সঠিক মেথড ---
  const handleAuthSuccess = (token: string) => {
    if (!token) {
      toast.error("Authentication failed: No token received.");
      return;
    }

    // ১. সরাসরি লোকাল স্টোরেজে সেভ করা (এটি সবচেয়ে নিরাপদ)
    localStorage.setItem("accessToken", token);

    // ২. কনটেক্সট আপডেট করা (যা রিডাইরেকশন হ্যান্ডেল করবে)
    login(token);

    toast.success("✨ Gorgeous! Welcome back.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ব্যাকএন্ড যদি ডাটা result.data.accessToken এ পাঠায় তবে সেটি নিশ্চিত করুন
      const token = data.data?.accessToken || data.token || data.accessToken;

      if (token) {
        handleAuthSuccess(token);
      } else {
        throw new Error("Token not found in response.");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/sync`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: result.user.uid,
            email: result.user.email,
            userName: result.user.displayName,
            pictureUrl: result.user.photoURL,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error("Google Sync Failed");

      // গুগল সিঙ্কিংয়ের ক্ষেত্রেও টোকেন প্রপার্টি চেক করুন
      const token = data.data?.accessToken || data.token || data.accessToken;

      if (token) {
        handleAuthSuccess(token);
      } else {
        throw new Error("Google Token not found.");
      }
    } catch (err: any) {
      toast.error(err.message || "Google Login Failed! Try again.");
    }
  };

  return (
    <>
      <NavbarTwo />
      <div className="min-h-screen flex items-center justify-center p-4 transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border dark:border-slate-800">
          <h2 className="text-3xl font-black text-center dark:text-white uppercase mb-8 tracking-tighter">
            Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-5 text-slate-400 hover:text-blue-500 transition-colors"
              >
                {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <button
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-blue-600 text-white p-4 rounded-2xl font-black mt-4 uppercase tracking-widest shadow-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Login Now"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">
              New here?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-4 my-6 opacity-20">
            <hr className="flex-grow border-slate-500" />
            <span className="text-xs font-bold dark:text-white">OR</span>
            <hr className="flex-grow border-slate-500" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 p-4 border dark:border-slate-700 rounded-2xl dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold uppercase text-[10px] tracking-widest"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
