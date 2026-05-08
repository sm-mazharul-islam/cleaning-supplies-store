"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import logo from "././../../assets/images/logo (1).png";
import ThemeToggle from "../themeToggle/ThemeToggle";

interface UserPayload {
  userName?: string;
  email?: string;
  pictureUrl?: string;
}

const NavbarTwo = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);

  // ইউজার ডাটা চেক করার ফাংশন
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
    // লগইন/রেজিস্টার ফর্মের সাথে সিঙ্ক রাখার জন্য ইভেন্ট লিসেনার
    window.addEventListener("authChange", checkUser);
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("authChange", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, [checkUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Items", href: "/items" },
    { name: "Flash Sale", href: "/flashsale" },
  ];

  // ড্যাশবোর্ড লিঙ্ক লজিক
  if (user) navLinks.push({ name: "Dashboard", href: "/dashboard" });

  return (
    <nav className="sticky top-0 z-[100] w-full transition-all duration-300">
      <div className="bg-base-100/80 backdrop-blur-xl border-b border-base-content/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity active:scale-95"
              >
                <Image
                  src={logo}
                  width={80}
                  height={80}
                  alt="Logo"
                  className="w-auto h-12 lg:h-14 object-contain brightness-110"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {user ? (
                <div className="flex items-center gap-4">
                  {/* User Profile Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="flex items-center gap-3 p-1 pr-3 rounded-2xl hover:bg-base-300 transition-all cursor-pointer border border-base-content/5"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-blue-600/20">
                        <Image
                          src={
                            user.pictureUrl ||
                            `https://ui-avatars.com/api/?name=${user.userName}&background=2563eb&color=ffffff`
                          }
                          alt="User"
                          width={0}
                          height={0}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-base-content">
                        {user.userName}
                      </span>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-base-100 rounded-3xl w-56 border border-base-content/10"
                    >
                      <li className="px-4 py-2 border-b border-base-content/5 mb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          Signed in as
                        </p>
                        <p className="text-xs font-black truncate">
                          {user.email}
                        </p>
                      </li>
                      <li>
                        <Link
                          href="/dashboard"
                          className="p-3 text-sm font-bold hover:bg-base-200 rounded-xl block"
                        >
                          My Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          className="p-3 text-sm font-bold hover:bg-base-200 rounded-xl block"
                        >
                          Profile Settings
                        </Link>
                      </li>
                      <div className="divider my-1 opacity-5"></div>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left p-3 text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl block uppercase tracking-widest"
                        >
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
                    className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-base-content/60 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 rounded-xl bg-blue-600 text-white active:scale-90 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pt-2 pb-8 space-y-1 bg-base-100 border-t border-base-content/5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-4 text-sm font-bold text-base-content hover:bg-base-200 rounded-2xl transition-all uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                className="block px-4 py-4 text-sm font-bold text-blue-600 uppercase tracking-widest"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTwo;
