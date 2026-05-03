"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaHandshake, FaShoppingCart } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-main transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-brand-accent/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-gradient-to-br from-brand-primary/20 via-brand-primary/5 to-transparent border border-brand-primary/20 rounded-[2rem] p-8 md:p-16 text-center"
        >
          {/* Top Icon Badge */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center border border-brand-primary/30 animate-bounce">
              <FaHandshake className="text-brand-primary text-3xl" />
            </div>
          </div>

          {/* Heading with Visual Hierarchy */}
          <h2 className="text-4xl md:text-6xl font-black text-main-content tracking-tighter leading-tight mb-6">
            Ready to <span className="text-brand-primary">Transform</span>{" "}
            <br />
            Your Workspace?
          </h2>

          <p className="text-main-muted text-sm md:text-lg max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Join thousands of professional cleaning services and industrial
            partners who trust our premium-grade supplies for consistent
            excellence and sustainable sanitization.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-brand-primary text-white font-black rounded-btn shadow-2xl shadow-brand-primary/30 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 group"
            >
              Start Shopping{" "}
              <FaShoppingCart className="group-hover:rotate-12 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-white/5 text-main-content font-bold rounded-btn border border-main-border backdrop-blur-xl hover:bg-white/10 transition-all uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3"
            >
              Become a Partner <FaArrowRight />
            </motion.button>
          </div>

          {/* Trust Badge / Sub-text */}
          <div className="mt-12 pt-8 border-t border-main-border/30 flex flex-wrap justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-main-content">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Fast Shipping Worldwide
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-main-content">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Bulk Discounts Available
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
