"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaHandshake, FaShoppingCart } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="relative py-24 bg-main transition-colors duration-500 overflow-hidden">
      {/* Background Mesh Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 blur-[120px] rounded-full -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-accent/20 blur-[100px] rounded-full translate-y-1/2 opacity-30"></div>

      <div className="container mx-auto px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "backOut" }}
          /* 
             max-w-5xl ব্যবহার করে উইডথ কমানো হয়েছে 
          */
          className="relative z-10 max-w-5xl w-full bg-base-200/40 dark:bg-white/[0.03] border border-base-content/5 dark:border-0 rounded-[3.5rem] p-8 md:p-16 lg:p-20 text-center backdrop-blur-3xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)]"
        >
          {/* Floating Icon Badge */}
          <div className="flex justify-center mb-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center border-0 shadow-inner"
            >
              <FaHandshake className="text-brand-primary text-3xl md:text-4xl" />
            </motion.div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-6xl font-black text-base-content tracking-tighter leading-[1.1] mb-6 md:mb-8">
            Ready to{" "}
            <span className="bg-gradient-to-r from-brand-primary to-blue-400 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            <br />
            Your Workspace?
          </h2>

          <p className="text-base-content/60 text-sm md:text-lg max-w-2xl mx-auto mb-10 md:mb-14 font-medium leading-relaxed">
            Join thousands of professional cleaning services and industrial
            partners who trust our premium-grade supplies for consistent
            excellence and sustainable sanitization.
          </p>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-brand-primary font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] uppercase text-[10px] md:text-xs tracking-[0.25em] flex items-center justify-center gap-4 group transition-all"
            >
              Start Shopping{" "}
              <FaShoppingCart className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-base-300 dark:bg-white/5 text-base-content font-black rounded-2xl border-0 backdrop-blur-xl hover:bg-base-content/5 transition-all uppercase text-[10px] md:text-xs tracking-[0.25em] flex items-center justify-center gap-4 group"
            >
              Become a Partner
              <FaArrowRight className="group-hover:translate-x-2 transition-transform text-brand-primary" />
            </motion.button>
          </div>

          {/* Luxury Status Badges */}
          <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-base-content/5 flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-base-content/40">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              Fast Shipping Worldwide
            </div>
            <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-base-content/40">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              Bulk Discounts Available
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
