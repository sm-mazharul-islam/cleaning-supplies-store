"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaShieldAlt } from "react-icons/fa";

const Newsletter = () => {
  return (
    <section className="relative py-24 bg-main transition-colors duration-500 overflow-hidden">
      {/* Decorative Circles for visual depth */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-white/5 border border-main-border rounded-[2.5rem] p-8 md:p-16 backdrop-blur-md shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                  Weekly Updates
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-main-content tracking-tighter leading-tight">
                Get Exclusive <span className="text-brand-primary">Deals</span>{" "}
                <br />
                Direct to Your Inbox
              </h2>

              <p className="text-main-muted text-sm md:text-base font-medium max-w-md">
                Subscribe to receive professional sanitization guides,
                sustainable cleaning tips, and special bulk-purchase discounts.
              </p>

              <div className="flex items-center gap-3 text-[10px] font-bold text-main-muted uppercase tracking-tighter">
                <FaShieldAlt className="text-brand-primary text-sm" />
                We value your privacy. No spam, ever.
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="relative">
              <form className="flex flex-col gap-4">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your professional email"
                    className="w-full px-6 py-5 bg-main-border/20 border border-main-border rounded-btn text-main-content placeholder:text-main-muted focus:outline-none focus:border-brand-primary/50 transition-all text-sm font-medium"
                    required
                  />
                  <div className="absolute inset-0 rounded-btn bg-brand-primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-brand-primary text-white font-black rounded-btn shadow-xl shadow-brand-primary/20 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 group"
                >
                  Join the Community
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-xs" />
                </motion.button>
              </form>

              <p className="mt-4 text-center lg:text-left text-[10px] text-main-muted font-medium italic">
                *By subscribing, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
