"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import logo from "././../../assets/images/logo (1).png";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";

interface UserPayload {
  userName?: string;
  email?: string;
  pictureUrl?: string;
}

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ইউজার ডাটা চেক করার মেমোয়াইজড ফাংশন
  const checkUser = useCallback(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const decoded: UserPayload = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkUser();

    // কাস্টম ইভেন্ট এবং স্টোরেজ ইভেন্ট লিসেনার
    window.addEventListener("authChange", checkUser);
    window.addEventListener("storage", checkUser);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("authChange", checkUser);
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [checkUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("authChange")); // নেভিগেশন আপডেট করা
    router.push("/login");
  };

  const navItems = ["Home", "Items", "Category", "FlashSale", "About"];
  if (user) navItems.push("Dashboard");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "bg-base-100/95 backdrop-blur-md shadow-md h-20" : "bg-transparent h-24"}`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* LOGO & MOBILE TOGGLE */}
        <div className="flex items-center gap-4 flex-1">
          <div className="lg:hidden dropdown">
            <div
              tabIndex={0}
              role="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`btn btn-ghost btn-circle ${isScrolled ? "text-base-content" : "text-white"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h8m-8 6h16"
                  }
                />
              </svg>
            </div>
            {isMobileMenuOpen && (
              <ul className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-base-100 rounded-card w-64 text-base-content font-bold gap-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/">
            <Image
              src={logo}
              width={isScrolled ? 45 : 55}
              height={isScrolled ? 45 : 55}
              alt="logo"
              priority
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center justify-center flex-[2]">
          <ul
            className={`flex gap-8 text-[12px] font-black uppercase tracking-widest ${isScrolled ? "text-base-content" : "text-white"}`}
          >
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-primary transition-all"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* THEME & AUTH */}
        <div className="flex items-center justify-end gap-6 flex-1">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p
                  className={`text-[12px] font-black truncate max-w-[100px] ${isScrolled ? "text-base-content" : "text-white"}`}
                >
                  {user.userName}
                </p>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div
                    className={`rounded-xl ring-2 ring-offset-2 ${isScrolled ? "w-10 h-10 ring-primary/20" : "w-11 h-11 ring-white/30"}`}
                  >
                    <Image
                      src={
                        user.pictureUrl ||
                        `https://ui-avatars.com/api/?name=${user.userName}&background=2563eb&color=ffffff`
                      }
                      height={44}
                      width={44}
                      alt="avatar"
                    />
                  </div>
                </div>
                <ul className="mt-5 p-3 shadow-2xl menu dropdown-content bg-base-100 rounded-card w-56 text-base-content font-bold">
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/items/manage">Manage Products</Link>
                  </li>
                  <div className="divider my-1 opacity-10"></div>
                  <li>
                    <button onClick={handleLogout} className="text-error">
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={`text-[11px] font-black uppercase ${isScrolled ? "text-base-content" : "text-white"}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`px-6 py-3 rounded-btn text-[10px] font-black uppercase }`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
