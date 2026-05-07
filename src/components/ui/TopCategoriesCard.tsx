"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

// Interface for Backend Data
interface CategoryItem {
  _id?: string; // MongoDB default ID
  id: string; // Your custom ID (01, 02, etc.)
  title: string;
  desc: string;
  image: string;
}

const TopCategoriesCard = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/all`,
        );
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <section className="bg-base-100 transition-colors duration-300 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="badge badge-primary font-black tracking-[0.3em] py-3 mb-4 rounded-md uppercase text-[10px] border-none shadow-lg shadow-blue-600/20">
              Top Categories
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter leading-none">
              High Performance <br />
              <span className="text-blue-600">Cleaning Supplies</span>
            </h2>
          </div>

          <button className="btn btn-ghost group flex items-center gap-4 hover:bg-transparent text-base-content">
            <span className="font-black text-sm tracking-widest uppercase">
              View Full Series
            </span>
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-blue-600/20 font-bold">
              <FaArrowRight />
            </div>
          </button>
        </div>

        {/* Grid Section - Dynamic Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.length > 0 ? (
            categories.map((cat: CategoryItem) => (
              <div
                key={cat._id || cat.id}
                className="group relative flex flex-col sm:flex-row items-center gap-6 bg-base-100 p-6 rounded-[2.5rem] border border-base-content/10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-2xl bg-base-200 shadow-inner">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600/5 text-blue-600 font-bold">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-2 left-2 w-8 h-8 bg-base-100/60 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-black text-base-content border border-white/20">
                    {cat.id}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-0.5 w-6 bg-blue-600"></div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      Premium Quality
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-base-content mb-3 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-base-content opacity-60 font-medium leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-base-content opacity-40">
                      Inventory Status:{" "}
                    </span>
                    <span className="text-[10px] font-black uppercase text-emerald-500">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Decorative background ID */}
                <div className="absolute -bottom-10 -right-5 text-[120px] font-black text-base-content opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none italic">
                  {cat.id}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 opacity-50 font-bold uppercase tracking-widest text-xs">
              No Categories Found in Database
            </div>
          )}
        </div>

        {/* Safety Footer */}
        <div className="mt-16 flex items-center justify-center gap-3 py-4 ">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <p className="text-[11px] font-bold text-base-content opacity-40 uppercase tracking-[0.2em] text-center">
            Always wear protective gear while handling industrial chemicals
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopCategoriesCard;
