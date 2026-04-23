"use client";

import React from "react";
import { FaLeaf, FaMagic, FaShieldVirus, FaTruckLoading } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Eco-Friendly",
      desc: "100% biodegradable ingredients that are safe for your family and the planet.",
      icon: <FaLeaf className="text-emerald-500" />,
      color: "hover:border-emerald-500/50",
      bg: "bg-emerald-50",
    },
    {
      title: "Pro-Grade Shine",
      desc: "Commercial strength formulas that leave a streak-free, diamond brilliance.",
      icon: <FaMagic className="text-blue-500" />,
      color: "hover:border-blue-500/50",
      bg: "bg-blue-50",
    },
    {
      title: "99.9% Protection",
      desc: "Hospital-grade disinfection that kills bacteria and viruses on contact.",
      icon: <FaShieldVirus className="text-indigo-500" />,
      color: "hover:border-indigo-500/50",
      bg: "bg-indigo-50",
    },
    {
      title: "Bulk Savings",
      desc: "Efficient refill systems designed for professional cleaners and large homes.",
      icon: <FaTruckLoading className="text-amber-500" />,
      color: "hover:border-amber-500/50",
      bg: "bg-amber-50",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            The Gold Standard of <br />
            <span className="text-blue-600">Modern Cleaning</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            We combine cutting-edge chemistry with sustainable practices to give
            you a space that isn&apos;t just clean it&lsquo;s revitalized.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-[2.5rem] border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${f.color}`}
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center text-2xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                {f.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
                {f.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm">
                {f.desc}
              </p>

              {/* Decorative Subtle Background Element */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              {/* Bottom "Learn More" Hint */}
              <div className="mt-8 flex items-center text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer">
                Learn More
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Section */}
        <div className="mt-20 p-10 rounded-[3rem] bg-slate-50 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-100">
          <div>
            <h4 className="text-2xl font-black mb-2 tracking-tight text-black">
              Ready for a deeper clean?
            </h4>
            <p className="text-slate-400 font-medium">
              Join 50,000+ happy customers who trust our supplies.
            </p>
          </div>
          <button className="btn btn-primary rounded-2xl px-8 h-14 font-black tracking-widest uppercase text-xs border-none bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20">
            Shop the Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
