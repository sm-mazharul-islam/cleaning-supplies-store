"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaUserShield,
  FaSignOutAlt,
  FaGem,
  FaDatabase,
  FaUsersCog,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const profileEndpoint = `${baseUrl}/api/v1/user/profile`;

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(profileEndpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        if (result.success) {
          setUser(result.data);
          toast.success(`Welcome back, ${result.data.name}!`, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          localStorage.removeItem("token");
          toast.error(result.message || "Session expired. Please login.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logging out...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-500 font-black tracking-widest uppercase text-[10px]">
            Verifying Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-center transition-colors duration-500">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full"
        >
          <h2 className="text-3xl font-black text-red-600 dark:text-red-500 mb-4 tracking-tighter">
            Unauthorized Access
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
            Please login to view your personal dashboard.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all"
          >
            Login Now
          </button>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user.role?.toLowerCase() === "admin";

  return (
    <div className="min-h-screen  p-4 md:p-10 transition-colors duration-500">
      <ToastContainer
        theme={
          typeof window !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "dark"
            : "light"
        }
      />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <FaGem className="text-blue-600 text-xl" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">
                Authenticated Session
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              {isAdmin ? "Admin Room," : "Greetings,"} <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                {user.name}
              </span>
            </h1>
          </motion.div>

          {/* User Badge Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-5 p-4 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl backdrop-blur-xl"
          >
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl text-white shadow-inner ${
                isAdmin
                  ? "bg-gradient-to-tr from-blue-600 to-indigo-700"
                  : "bg-gradient-to-tr from-emerald-500 to-teal-600"
              }`}
            >
              {isAdmin ? <FaUserShield /> : <FaUserCircle />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter">
                {user.role}
              </p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {user.email}
              </p>
            </div>
          </motion.div>
        </header>

        {/* Dynamic Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title={isAdmin ? "System Stock" : "Order Tracker"}
            desc={
              isAdmin
                ? "Manage supply inventory and cleaning agents."
                : "View your cleaning supply purchase history."
            }
            Icon={isAdmin ? FaDatabase : FaChartLine}
            color="blue"
          />
          <Card
            title={isAdmin ? "Admin Controls" : "My Settings"}
            desc={
              isAdmin
                ? "Modify roles and manage system users."
                : "Update your profile and security settings."
            }
            Icon={isAdmin ? FaUsersCog : FaCog}
            color="purple"
          />

          {/* Logout Action */}
          <motion.div
            onClick={handleLogout}
            whileHover={{ y: -10 }}
            className="cursor-pointer group p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-900 shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600 text-2xl mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <FaSignOutAlt />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-red-500 mb-4 tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Sign Out
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
              Safely terminate your session for {user.name}.
            </p>
          </motion.div>
        </div>

        <footer className="mt-20 text-center py-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">
            &copy; 2026 Cleaning Supplies Hub &bull; Powered by MERN Stack
          </p>
        </footer>
      </div>
    </div>
  );
}

// Reusable Dynamic Card
function Card({ title, desc, Icon, color }: any) {
  // ডাইনামিক কালার ম্যাপিং
  const colorClasses: any = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 group-hover:bg-blue-600",
    purple:
      "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400 group-hover:bg-purple-600",
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-transparent"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-8 transition-all duration-500 shadow-inner ${colorClasses[color]} group-hover:text-white`}
      >
        <Icon />
      </div>
      <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
