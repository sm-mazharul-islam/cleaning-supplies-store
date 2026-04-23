"use client"; // Required for hooks like usePathname and useRouter

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // Import your Auth Hook
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";

interface DashboardProps {
  children: ReactNode;
}

const DashboardSideBar: React.FC<DashboardProps> = ({ children }) => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname(); // Get current URL to highlight active nav link
  const router = useRouter(); // For navigation after logout

  // Fix for Hydration: ensures client-side logic only runs after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  /**
   * LOGOUT HANDLER
   * Uses centralized logout from AuthContext
   */
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const navItems = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Profile", href: "/dashboard/profile", icon: FaUser },
    { name: "Add Product", href: "/dashboard/addProduct", icon: FaBoxOpen },
    {
      name: "Manage Products",
      href: "/dashboard/allSupply",
      icon: FaBoxOpen,
    },
    { name: "Analytics", href: "/dashboard/analytics", icon: FaChartLine },
    { name: "Settings", href: "/dashboard/settings", icon: FaCog },
  ];

  if (!isMounted) return null;

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* MOBILE OVERLAY: Dims the background when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR ASIDE */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* LOGO SECTION */}
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <span className="text-xl font-black">C</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Supplies.io</h2>
            </div>
            {/* Close button for mobile */}
            <button
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
              onClick={toggleSidebar}
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* DYNAMIC NAVIGATION LINKS */}
          <nav className="flex-1 px-4 space-y-2">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Dashboard Menu
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`text-lg ${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT ACTION */}
          <div className="p-6 mt-auto border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 py-3 px-4 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95"
            >
              <FaSignOutAlt />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={toggleSidebar}
          >
            <FaBars size={22} />
          </button>

          {/* USER PROFILE INFO */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:block text-right">
              {/* IMPLEMENTED DYNAMIC NAME */}
              <p className="text-sm font-bold text-slate-900 leading-none">
                {user?.userName || "User"}
              </p>
              {/* IMPLEMENTED DYNAMIC ROLE */}
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-tighter mt-1">
                {user?.role || "Member"} Account
              </p>
            </div>
            {/* IMPLEMENTED DYNAMIC IMAGE */}
            <div className="relative w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <Image
                src={
                  user?.pictureUrl ||
                  `https://ui-avatars.com/api/?name=${user?.userName || "User"}&background=0D8ABC&color=fff&bold=true`
                }
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </header>

        {/* DYNAMIC CHILD PAGES */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSideBar;
