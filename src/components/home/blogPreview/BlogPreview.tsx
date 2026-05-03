"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "The Science of Deep Sanitization",
    excerpt:
      "Explore advanced techniques to maintain a germ-free environment with high-efficiency supplies.",
    image: "/images/b1.jpg",
    date: "May 10, 2026",
    category: "Cleaning Tips",
  },
  {
    id: 2,
    title: "Eco-Friendly Supplies for Modern Living",
    excerpt:
      "Transitioning to sustainable cleaning agents can significantly reduce your environmental footprint.",
    image: "/images/b2.jpg",
    date: "May 15, 2026",
    category: "Sustainability",
  },
  {
    id: 3,
    title: "Maintaining Industrial Equipment",
    excerpt:
      "Strategic maintenance schedules ensure the longevity and peak performance of your cleaning apparatus.",
    image: "/images/b3.jpg",
    date: "May 20, 2026",
    category: "Industrial",
  },
];

const BlogPreview = () => {
  return (
    <section className="relative bg-main transition-colors duration-500 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full opacity-50"></div>

      {/* 
          নিচের ডিভ-টি (container) পুরো সেকশনের উইডথ কন্ট্রোল করে। 
          আপনি চাইলে 'max-w-7xl' কে 'max-w-6xl' বা 'max-w-5xl' করে উইডথ কমাতে পারেন।
      */}
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] bg-brand-primary/10 px-4 py-1.5 rounded-full">
              Latest Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-main-content tracking-tighter mt-6 leading-tight">
              Cleaning Expertise <br /> &{" "}
              <span className="bg-gradient-to-r from-brand-primary to-blue-400 bg-clip-text text-transparent">
                Industry News
              </span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-brand-primary/20 pb-1 hover:border-brand-primary transition-all"
          >
            Explore All Posts{" "}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>

        {/* 
            Blog Cards Grid: 
            এখানে 'gap-8' কে বাড়িয়ে বা কমিয়ে কার্ডগুলোর মাঝখানের দূরত্ব ঠিক করতে পারেন।
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              // Dark Mode: No Border, Light Mode: Very Faint Border
              className="group bg-base-200/40 dark:bg-white/[0.02] border border-base-content/5 dark:border-0 rounded-[2.5rem] overflow-hidden backdrop-blur-xl hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-brand-primary text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-xl shadow-lg">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-base-content/40 text-[10px] font-black uppercase tracking-widest">
                  <FaCalendarAlt className="text-brand-primary" />
                  {blog.date}
                </div>

                <h3 className="text-xl font-black text-base-content leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-base-content/50 leading-relaxed line-clamp-2 font-medium">
                  {blog.excerpt}
                </p>

                <div className="pt-6 mt-2 border-t border-base-content/5 flex justify-between items-center group/btn">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-base-content/40 group-hover:text-brand-primary transition-colors">
                    Read Full Article
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-base-300 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all shadow-inner">
                    <FaArrowRight className="text-[10px] group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
