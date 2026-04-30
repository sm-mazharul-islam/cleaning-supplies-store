"use client";

import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const ProductCard = ({ item }: { item: TProduct }) => {
  const { image, title, description, salePrice, originalPrice, _id } = item;
  const [imgSrc, setImgSrc] = useState(image);

  // Calculate discount percentage dynamically
  const discount = originalPrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-base-100 rounded-[2rem] p-3 border border-base-content/5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-2 overflow-hidden flex flex-col h-full transition-colors">
      {/* Image Container with Zoom Effect */}
      <div className="relative overflow-hidden rounded-[1.8rem] h-[280px] bg-base-200">
        <Image
          src={imgSrc}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={500}
          height={500}
          alt={title}
          // Handle DNS/CDN errors gracefully
          onError={() =>
            setImgSrc("https://via.placeholder.com/500?text=Image+Not+Found")
          }
          priority={false}
        />

        {/* Discount Badge - Visible only if there is a discount */}
        {discount > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-slate-900 text-white dark:bg-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
              -{discount}%
            </span>
          </div>
        )}

        {/* Quick Add Overlay Icon */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-12 h-12 bg-white dark:bg-blue-600 rounded-full flex items-center justify-center text-slate-900 dark:text-white scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl cursor-pointer">
            <FaPlus />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 px-2 pb-2 flex-grow flex flex-col">
        {/* Title: Adaptive text color */}
        <h1 className="text-lg font-black text-base-content leading-tight mb-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h1>

        {/* Description: Semantic opacity for better theme contrast */}
        <p className="text-xs text-base-content opacity-60 font-medium line-clamp-1 mb-3 transition-opacity group-hover:opacity-90">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-blue-600">
              ${salePrice}
            </span>
            {originalPrice && originalPrice > salePrice && (
              <del className="text-xs text-base-content opacity-40 font-bold">
                ${originalPrice}
              </del>
            )}
          </div>

          {/* Action Area: Animated "See More" */}
          <div className="relative overflow-hidden h-10 flex items-center">
            <Link
              href={`/items/${_id}`}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content opacity-40 hover:opacity-100 hover:text-blue-600 transition-all transform translate-y-10 group-hover:translate-y-0 duration-500"
            >
              See More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Border Accent: Brand color tracking */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};

export default ProductCard;
