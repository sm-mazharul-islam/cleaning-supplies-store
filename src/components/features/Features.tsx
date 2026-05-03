"use client";

import React from "react";
import { FaLeaf, FaMagic, FaShieldVirus, FaTruckLoading } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Eco-Friendly",
      desc: "100% biodegradable ingredients that are safe for your family and the planet.",
      icon: <FaLeaf className="text-emerald-500" />,
      // Replaced hardcoded opacity with theme-aware border colors
      color: "hover:border-emerald-500/40",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Pro-Grade Shine",
      desc: "Commercial strength formulas that leave a streak-free, diamond brilliance.",
      icon: <FaMagic className="text-blue-500" />,
      color: "hover:border-blue-500/40",
      bg: "bg-blue-500/10",
    },
    {
      title: "99.9% Protection",
      desc: "Hospital-grade disinfection that kills bacteria and viruses on contact.",
      icon: <FaShieldVirus className="text-indigo-500" />,
      color: "hover:border-indigo-500/40",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Bulk Savings",
      desc: "Efficient refill systems designed for professional cleaners and large homes.",
      icon: <FaTruckLoading className="text-amber-500" />,
      color: "hover:border-amber-500/40",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    /* bg-base-100 shifts between white and your dark slate theme */
    <section className=" bg-base-100 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            Why Choose Us
          </span>
          {/* text-base-content automatically flips light/dark colors */}
          <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6 tracking-tight">
            The Gold Standard of <br />
            <span className="text-blue-600">Modern Cleaning</span>
          </h2>
          <p className="text-base-content opacity-70 max-w-2xl mx-auto text-lg font-medium">
            We combine cutting-edge chemistry with sustainable practices to give
            you a space that isn&apos;t just clean—it&lsquo;s revitalized.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              /* 
                bg-base-200 provides a slight contrast against the section bg.
                border-base-content/5 ensures the border is visible in both modes.
              */
              className={`group relative p-8 rounded-[2.5rem] border border-base-content/10 bg-base-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] ${f.color}`}
            >
              {/* Icon Container with subtle transparent background */}
              <div
                className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center text-2xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                {f.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-black text-base-content mb-4 tracking-tight">
                {f.title}
              </h3>
              <p className="text-base-content opacity-60 leading-relaxed font-medium text-sm">
                {f.desc}
              </p>

              {/* Bottom "Learn More" Hint */}
              <div className="mt-8 flex items-center text-xs font-black uppercase tracking-widest text-base-content opacity-40 group-hover:opacity-100 group-hover:text-blue-600 transition-all cursor-pointer">
                Learn More
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Section */}
        {/* bg-base-200 for a subtle "island" look in dark mode */}
        <div className="mt-20 p-10 rounded-[3rem] bg-base-200 flex flex-col md:flex-row items-center justify-between gap-8  border border-base-content/5">
          <div>
            <h4 className="text-2xl font-black mb-2 tracking-tight text-base-content">
              Ready for a deeper clean?
            </h4>
            <p className="text-base-content opacity-50 font-medium">
              Join 50,000+ happy customers who trust our supplies.
            </p>
          </div>
          <button className="btn btn-primary rounded-2xl px-8 h-14 font-black tracking-widest uppercase text-xs shadow-xl shadow-blue-600/20">
            Shop the Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
