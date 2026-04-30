"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/Firebase";
import NavbarTwo from "@/components/shared/NavbarTwo";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSuccess = (token: string) => {
    localStorage.setItem("token", token);
    // নেভিগেশন বার রি-রেন্ডার ট্রিগার করা
    window.dispatchEvent(new Event("authChange"));
    toast.success("Welcome back!");
    setTimeout(() => router.push("/"), 1000);
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
      if (!res.ok) throw new Error(data.message);
      handleAuthSuccess(data.token);
    } catch (err: any) {
      toast.error(err.message);
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
      handleAuthSuccess(data.token);
    } catch (err) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <>
      <NavbarTwo />
      <div className="min-h-screen  flex items-center justify-center p-4 transition-colors">
        <ToastContainer position="top-center" theme="colored" />
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border dark:border-slate-800">
          <h2 className="text-3xl font-black text-center dark:text-white uppercase mb-8">
            Login
          </h2>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 p-4 border dark:border-slate-700 rounded-2xl dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-6 font-bold uppercase text-[10px] tracking-widest"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-5 text-slate-400"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-blue-600 text-white p-4 rounded-2xl font-black mt-4 uppercase tracking-widest shadow-xl transition-all"
            >
              {isLoading ? "Wait..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
