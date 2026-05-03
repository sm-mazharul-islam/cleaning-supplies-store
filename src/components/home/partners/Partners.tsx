"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  FaBuilding,
  FaIndustry,
  FaHandshake,
  FaGlobe,
  FaAward,
  FaUniversalAccess,
} from "react-icons/fa";

// পার্টনার ডাটাবেজ
const partners = [
  { id: 1, icon: <FaBuilding />, name: "Unilever" },
  { id: 2, icon: <FaIndustry />, name: "P&G" },
  { id: 3, icon: <FaHandshake />, name: "Henkel" },
  { id: 4, icon: <FaUniversalAccess />, name: "J&J" },
  { id: 5, icon: <FaGlobe />, name: "Clorox" },
  { id: 6, icon: <FaAward />, name: "Reckitt" },
];

const Partners = () => {
  // Infinite marquee animation variants with Type Safety
  const marqueeVariants: Variants = {
    animate: {
      x: [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop", // 'as const' প্রয়োজন নেই যদি Variants টাইপ ইমপোর্ট করা থাকে
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-12 bg-main border-y border-main-border transition-colors duration-500 overflow-hidden">
      {/* সেকশন টাইটেল */}
      <div className="container mx-auto px-6 mb-8 text-center lg:text-left">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-main-muted">
          Trusted by Industry Leaders &{" "}
          <span className="text-brand-primary">Global Brands</span>
        </p>
      </div>

      <div className="relative flex items-center">
        {/* দুই পাশে শ্যাডো ইফেক্ট যাতে লোগো গুলো স্মুথলি ভ্যানিশ হয় */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-main to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-main to-transparent z-10"></div>

        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
          variants={marqueeVariants}
          animate="animate"
        >
          {/* লুপ যাতে গ্যাপ না পড়ে তাই দুইবার রেন্ডার করা হয়েছে */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-main-muted hover:text-brand-primary transition-colors duration-300 group cursor-default"
            >
              {/* আইকন */}
              <div className="text-4xl md:text-5xl opacity-40 group-hover:opacity-100 transition-opacity">
                {partner.icon}
              </div>
              {/* ব্র্যান্ড নেম */}
              <span className="text-sm md:text-lg font-black tracking-tighter opacity-30 group-hover:opacity-100 transition-opacity uppercase italic">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
