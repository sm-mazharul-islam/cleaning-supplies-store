"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChartLine,
  FaBoxOpen,
  FaUsers,
  FaPlusSquare,
  FaQuoteLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";

const DashboardSideBar: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("✨ Logged out successfully");
    router.push("/login");
  };

  // ==========================================
  // NAVIGATION ITEMS (Exactly as you provided)
  // ==========================================

  const commonItems = [{ name: "Home", href: "/", icon: FaHome }];

  const adminItems = [
    { name: "Overview", href: "/dashboard/adminStats", icon: FaChartLine },
    { name: "Manage Users", href: "/dashboard/manageUsers", icon: FaUsers },
    { name: "Manage Items", href: "/dashboard/allSupply", icon: FaBoxOpen },
    { name: "All Orders", href: "/dashboard/allOrders", icon: FaBoxOpen },
    { name: "Add Product", href: "/dashboard/addProduct", icon: FaPlusSquare },
    { name: "Categories", href: "/dashboard/users", icon: FaUsers },
    { name: "Settings", href: "/dashboard/users", icon: FaUsers },
  ];

  const userItems = [
    { name: "Overview", href: "/dashboard/userStats", icon: FaUser },
    { name: "Profile", href: "/dashboard/profile", icon: FaUser },
    { name: "My Items", href: "/dashboard/orders", icon: FaBoxOpen },
    { name: "Add Review", href: "/dashboard/addReview", icon: FaQuoteLeft },
    { name: "Settings", href: "/dashboard/setting", icon: FaCog },
  ];

  // ==========================================
  // DYNAMIC ROLE LOGIC (Using role: "admin")
  // ==========================================
  const currentNavItems =
    user?.role === "admin"
      ? [...commonItems, ...adminItems]
      : [...commonItems, ...userItems];

  if (!isMounted) return null;

  return (
    <div className="flex h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 overflow-hidden">
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR ASIDE */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 dark:border-slate-800 transform transition-all duration-300 lg:translate-x-0 lg:static ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* BRANDING */}
          <div className="p-8 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 font-black text-slate-900 dark:text-white uppercase tracking-tighter"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                L
              </div>
              Cleaning Supplies
            </Link>
          </div>

          {/* DYNAMIC ROLE-BASED NAVIGATION */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
            <p className="px-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              {user?.role === "admin" ? "Admin Controls" : "User Menu"}
            </p>
            {currentNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 py-3.5 px-4 rounded-2xl transition-all duration-300 group ${isActive ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600"}`}
                >
                  <item.icon
                    className={`${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`}
                  />
                  <span className="font-bold text-sm tracking-tight">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT BUTTON */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 py-3 px-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-black text-[10px] uppercase tracking-widest"
            >
              <FaSignOutAlt /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="sticky top-0 z-30 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between transition-colors duration-500">
          <button
            className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={20} />
          </button>

          <div className="flex items-center gap-6 ml-auto">
            <ThemeToggle />

            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-none">
                  {user?.userName || "Guest"}
                </p>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">
                  {user?.role === "admin" ? "Admin" : "User"} Access
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md ring-2 ring-blue-600/10">
                <Image
                  src={
                    user?.pictureUrl ||
                    `https://ui-avatars.com/api/?name=${user?.userName || "User"}&background=2563eb&color=fff`
                  }
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10  transition-colors duration-500">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSideBar;
