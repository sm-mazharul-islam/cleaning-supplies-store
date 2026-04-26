"use client";
import React from "react";
import Link from "next/link";
import {
  FaSprayCan,
  FaSoap,
  FaTools,
  FaHandsWash,
  FaHome,
  FaShieldVirus,
  FaChevronRight,
} from "react-icons/fa";
import Navbar from "@/components/shared/Navbar";
import NavbarTwo from "@/components/shared/NavbarTwo";
import Footer from "@/components/shared/Footer";

const categories = [
  {
    id: "industrial",
    name: "Industrial Cleaners",
    description:
      "Heavy-duty solutions for warehouses and large scale factories.",
    icon: <FaTools size={32} />,
    gradient: "from-blue-600/10 to-transparent",
    hoverBorder: "hover:border-blue-600/50",
    count: 120,
  },
  {
    id: "household",
    name: "Household Supplies",
    description: "Everything you need to keep your home sparkling and fresh.",
    icon: <FaHome size={32} />,
    gradient: "from-blue-600/10 to-transparent",
    hoverBorder: "hover:border-blue-600/50",
    count: 85,
  },
  {
    id: "disinfectants",
    name: "Disinfectants",
    description: "Medical-grade sprays to kill 99.9% of germs and bacteria.",
    icon: <FaShieldVirus size={32} />,
    gradient: "from-blue-700/10 to-transparent",
    hoverBorder: "hover:border-blue-700/50",
    count: 45,
  },
  {
    id: "personal",
    name: "Personal Hygiene",
    description: "Premium hand washes, sanitizers, and luxury soaps.",
    icon: <FaHandsWash size={32} />,
    gradient: "from-blue-500/10 to-transparent",
    hoverBorder: "hover:border-blue-500/50",
    count: 60,
  },
  {
    id: "kitchen",
    name: "Kitchen Care",
    description: "Safe and effective degreasers for a professional kitchen.",
    icon: <FaSoap size={32} />,
    gradient: "from-blue-600/10 to-transparent",
    hoverBorder: "hover:border-blue-600/50",
    count: 30,
  },
  {
    id: "glass",
    name: "Glass & Surface",
    description: "Streak-free shine for all your mirrors and glass surfaces.",
    icon: <FaSprayCan size={32} />,
    gradient: "from-blue-600/10 to-transparent",
    hoverBorder: "hover:border-blue-600/50",
    count: 25,
  },
];

export default function Category() {
  return (
    <>
      <NavbarTwo />
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Premium <span className="text-blue-600">Categories</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Discover professional-grade cleaning solutions curated for your
              specific environment and needs.
            </p>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-8 rounded-full"></div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`group relative p-8 rounded-[2rem] bg-white border-2 border-transparent shadow-sm ${cat.hoverBorder} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </div>
                    <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {cat.count} Products
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h2>

                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {cat.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <Link
                    href={`/items?category=${cat.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-extrabold uppercase text-[11px] tracking-widest group-hover:gap-4 transition-all"
                  >
                    View Collection <FaChevronRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Support Banner */}
          <div className="mt-24 p-10 md:p-16 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold mb-3 tracking-tight">
                  Looking for Bulk Orders?
                </h3>
                <p className="text-slate-400 max-w-md">
                  Our sales experts are ready to provide custom quotes for
                  industrial and commercial needs.
                </p>
              </div>
              <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white px-10 rounded-2xl h-14 font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95">
                Contact Sales Team
              </button>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
