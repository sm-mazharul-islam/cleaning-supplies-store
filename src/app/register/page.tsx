"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Front-end Validation
    if (password !== retypePassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = { userName, email, pictureUrl, password };
    setIsLoading(true);

    try {
      // NOTE: Point this to your actual Backend URL
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration successful! Redirecting...");

      // Clear Form
      setUserName("");
      setEmail("");
      setPictureUrl("");
      setPassword("");
      setRetypePassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-2xl rounded-[2rem] p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <FaUserPlus size={30} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Create Account</h2>
          <p className="text-slate-500 text-sm mt-2">
            Join our community today
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="johndoe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="hello@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Picture URL
            </label>
            <input
              type="url"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://image.com/avatar.png"
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
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-slate-400 hover:text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Retype Password
            </label>
            <input
              type={showRetypePassword ? "text" : "password"}
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-slate-400 hover:text-blue-600"
              onClick={() => setShowRetypePassword(!showRetypePassword)}
            >
              {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black mt-8 hover:bg-blue-600 transition-all active:scale-95 disabled:bg-slate-300 shadow-xl shadow-slate-200"
        >
          {isLoading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
