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
    <section className="py-20 bg-main transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-black uppercase tracking-[0.2em] text-[10px] bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
              Latest Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-main-content tracking-tighter mt-4">
              Cleaning Expertise <br /> &{" "}
              <span className="text-brand-primary">Industry News</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-widest"
          >
            Explore All Posts{" "}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group bg-white/5 border border-main-border rounded-card overflow-hidden hover:border-brand-primary/50 transition-colors shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-main-muted text-xs font-semibold">
                  <FaCalendarAlt className="text-brand-primary" />
                  {blog.date}
                </div>
                <h3 className="text-xl font-black text-main-content leading-tight group-hover:text-brand-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-main-muted leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="pt-4 border-t border-main-border flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-main-content">
                    Read Full Article
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                    <FaArrowRight className="text-xs" />
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
