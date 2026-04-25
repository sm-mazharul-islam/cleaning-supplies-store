"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "././../../assets/images/logo (1).png";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface UserPayload {
  userName?: string;
  email?: string;
  pictureUrl?: string;
}

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: UserPayload = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md h-16 sm:h-20 border-b border-slate-100"
          : "bg-gradient-to-b  to-transparent h-20 sm:h-28 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* LEFT: Logo & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost btn-circle ${isScrolled ? "text-slate-800" : "text-white"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white rounded-2xl w-[80vw] max-w-[300px] border border-slate-100 text-slate-800 font-bold gap-2"
            >
              <li>
                <Link href="/" className="py-3 px-4 active:bg-blue-50">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="py-3 px-4 active:bg-blue-50">
                  Items
                </Link>
              </li>
              <li>
                <Link href="/category" className="py-3 px-4 active:bg-blue-50">
                  Category
                </Link>
              </li>
              <li>
                <Link href="/flashsale" className="py-3 px-4 active:bg-blue-50">
                  Flash Sale
                </Link>
              </li>
              <li>
                <Link href="/about" className="py-3 px-4 active:bg-blue-50">
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="py-3 px-4 text-blue-600 active:bg-blue-50"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="flex items-center shrink-0 transition-transform active:scale-95"
          >
            <Image
              src={logo}
              width={isScrolled ? 42 : 52}
              height={isScrolled ? 42 : 52}
              alt="logo"
              className="transition-all duration-500 object-contain brightness-110 sm:w-[58px] sm:h-[58px]"
              priority
            />
          </Link>
        </div>

        {/* CENTER: Navigation Links (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex items-center justify-center flex-[2]">
          <ul
            className={`flex flex-row gap-6 xl:gap-10 text-[11px] xl:text-[13px] font-black uppercase tracking-[0.15em] transition-colors duration-500 ${isScrolled ? "text-slate-700" : "text-white drop-shadow-md"}`}
          >
            {[
              "Home",
              "Items",
              "Category",
              "FlashSale",
              "About",
              "Dashboard",
            ].map((item) => (
              <li key={item}>
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "")}`
                  }
                  className="relative py-1.5 transition-all duration-300 hover:text-blue-400 group"
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${isScrolled ? "bg-blue-600" : "bg-white"}`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: User Profile / Auth */}
        <div className="flex items-center justify-end gap-2 sm:gap-5 flex-1">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p
                  className={`text-[12px] font-black leading-none transition-colors duration-500 truncate max-w-[100px] ${isScrolled ? "text-slate-900" : "text-white"}`}
                >
                  {user.userName}
                </p>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar hover:opacity-90 transition-opacity active:scale-90"
                >
                  <div
                    className={`rounded-xl sm:rounded-2xl ring-2 ring-offset-2 transition-all duration-500 ${isScrolled ? "w-8 h-8 sm:w-10 sm:h-10 ring-blue-500/20 ring-offset-white" : "w-9 h-9 sm:w-11 sm:h-11 ring-white/30 ring-offset-black/20"}`}
                  >
                    <Image
                      src={
                        user.pictureUrl ||
                        `https://ui-avatars.com/api/?name=${user.userName}&background=f8fafc&color=2563eb&bold=true`
                      }
                      height={44}
                      width={44}
                      alt="avatar"
                      className="object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-52 border border-slate-100 text-slate-800"
                >
                  <li className="lg:hidden px-4 py-2 font-black text-blue-600 border-b border-slate-50 mb-1">
                    {user.userName}
                  </li>
                  <li>
                    <Link
                      href="/items/add"
                      className="py-3 font-bold rounded-xl"
                    >
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/items/manage"
                      className="py-3 font-bold rounded-xl"
                    >
                      Manage Product
                    </Link>
                  </li>
                  <div className="divider my-1 opacity-50"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-3 text-red-500 font-black hover:bg-red-50 rounded-xl"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/login"
                className={`text-[10px] sm:text-[11px] font-black transition-colors tracking-[0.1em] uppercase ${isScrolled ? "text-slate-800 hover:text-blue-600" : "text-white hover:text-blue-200"}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`px-4 py-2 sm:px-7 sm:py-3 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black tracking-[0.1em] sm:tracking-[0.15em] transition-all shadow-xl active:scale-95 uppercase whitespace-nowrap ${
                  isScrolled
                    ? "bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200"
                    : "bg-white text-slate-900 hover:bg-blue-50 shadow-black/20"
                }`}
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
