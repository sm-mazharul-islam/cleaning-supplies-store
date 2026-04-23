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
      // Small threshold for faster transition
      setIsScrolled(window.scrollY > 15);
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out backdrop-blur-md ${
        isScrolled
          ? "bg-white/90 shadow-sm h-16 border-b border-slate-100"
          : "bg-white/40 h-20 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* LEFT: Logo Section */}
        <div className="flex items-center gap-4 flex-1">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-slate-800"
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white rounded-3xl w-72 border border-slate-100 text-slate-800 font-bold"
            >
              <li>
                <Link href="/" className="py-3">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="py-3">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="py-3 text-blue-600">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={logo}
              width={isScrolled ? 48 : 56}
              height={isScrolled ? 48 : 56}
              alt="logo"
              className="transition-all duration-500 object-contain"
              priority
            />
          </Link>
        </div>

        {/* CENTER: Navigation (Balanced Visual Weight) */}
        <div className="hidden lg:flex items-center justify-center flex-grow">
          <ul className="flex flex-row gap-10 text-[13px] font-black text-slate-700 uppercase tracking-[0.18em]">
            {["Home", "Products", "Category", "Flash Sale", "Dashboard"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "")}`
                    }
                    className="relative py-1.5 transition-all duration-300 hover:text-blue-600 group"
                  >
                    {item}
                    {/* Subtle Underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* RIGHT: Auth/User (Consistent Sizing) */}
        <div className="flex items-center justify-end gap-5 flex-1">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden xl:block text-right">
                {/* <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Welcome
                </p> */}
                <p className="text-sm font-black text-slate-900 leading-none">
                  {user.userName}
                </p>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar hover:opacity-90 transition-opacity"
                >
                  <div
                    className={`rounded-2xl ring-2 ring-blue-500/10 ring-offset-2 ring-offset-white transition-all duration-500 ${isScrolled ? "w-9" : "w-10"}`}
                  >
                    <Image
                      src={
                        user.pictureUrl ||
                        `https://ui-avatars.com/api/?name=${user.userName}&background=f8fafc&color=2563eb&bold=true`
                      }
                      height={30}
                      width={30}
                      alt="avatar"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white/95 backdrop-blur-xl rounded-3xl w-60 border border-slate-100"
                >
                  <li>
                    <Link href="/profile" className="py-3 font-bold rounded-xl">
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
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
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:block text-[11px] font-black text-slate-800 hover:text-blue-600 transition-colors tracking-[0.1em] uppercase"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-[10px] font-black tracking-[0.15em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 uppercase whitespace-nowrap"
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
