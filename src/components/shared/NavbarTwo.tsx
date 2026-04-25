"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "././../../assets/images/logo (1).png";

const NavbarTwo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Items", href: "/items" },
    { name: "Flash Sale", href: "/flashsale" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full">
      {/* Main Container */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <Image
                  src={logo}
                  width={80}
                  height={80}
                  alt="Premium Logo"
                  className="w-auto h-12 lg:h-14 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden md:block px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
                Join Community
              </button>

              <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer border border-slate-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-all"
                >
                  {isOpen ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-slate-50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-4 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <button className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTwo;
