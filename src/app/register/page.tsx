"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== retypePassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      userName,
      email,
      pictureUrl,
      password,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration not working");
    }
  };

  if (!isMounted) {
    return null; // Avoid rendering on the server side
  }

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Picture URL</label>
          <input
            type="url"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Retype Password</label>
          <input
            type={showRetypePassword ? "text" : "password"}
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowRetypePassword(!showRetypePassword)}
          >
            {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
