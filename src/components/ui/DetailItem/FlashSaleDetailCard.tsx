"use client";

import { TProduct } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaRegHeart,
  FaShareAlt,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

interface Props {
  item: TProduct;
}

const FlashSaleDetailCard: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const {
    title,
    description,
    image,
    originalPrice,
    salePrice,
    ratings,
    brand,
    logo,
  } = item;

  const discount = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100,
  );

  return (
    <div className="bg-main rounded-card shadow-sm  overflow-hidden animate-in fade-in zoom-in-95 duration-700 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-xl p-md lg:p-2xl">
        {/* Left: Product Image Section */}
        <div className="relative group">
          <div className="relative aspect-square overflow-hidden rounded-card bg-main-border/30 border border-main-border shadow-inner">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
              priority
            />

            {/* Flash Sale Badge */}
            <div className="absolute top-sm left-sm bg-red-600 text-white px-lg py-xs rounded-full flex items-center gap-2 shadow-2xl animate-pulse z-10">
              <FaBolt className="text-yellow-300" />
              <span className="font-black text-[10px] tracking-widest uppercase">
                Flash Sale
              </span>
            </div>

            {/* Glassmorphism Discount Badge */}
            <div className="absolute bottom-sm left-sm bg-main/80 backdrop-blur-md text-red-500 px-md py-xs rounded-input font-black shadow-lg border border-red-500/20">
              {discount}% OFF
            </div>
          </div>
        </div>

        {/* Right: Product Details Section */}
        <div className="flex flex-col py-md lg:py-xs">
          {/* Brand Header */}
          <div className="flex justify-between items-center mb-lg">
            <div className="flex items-center gap-sm">
              {logo && (
                <div className="relative w-12 h-12 rounded-input overflow-hidden border border-main-border p-1.5 bg-white shadow-sm">
                  <Image
                    src={logo}
                    alt="brand logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-brand-primary font-black uppercase tracking-widest text-[10px]">
                  {brand}
                </span>
                <span className="text-[10px] text-main-muted font-bold uppercase tracking-tighter">
                  Official Store
                </span>
              </div>
            </div>
            <div className="flex gap-sm">
              <button className="p-md bg-main-border/50 text-main-muted rounded-input hover:text-red-500 hover:bg-red-500/10 transition-all duration-300">
                <FaRegHeart />
              </button>
              <button className="p-md bg-main-border/50 text-main-muted rounded-input hover:text-brand-primary hover:bg-brand-primary/10 transition-all duration-300">
                <FaShareAlt />
              </button>
            </div>
          </div>

          {/* Title & Ratings */}
          <h1 className="text-3xl lg:text-5xl font-black text-main-content leading-[1.1] mb-sm tracking-tight transition-colors">
            {title}
          </h1>

          <div className="flex items-center gap-md mb-lg">
            <div className="flex items-center bg-orange-500/10 px-md py-xs rounded-input gap-1.5 border border-orange-500/20">
              <FaStar className="text-orange-500" />
              <span className="font-black text-orange-600 dark:text-orange-400">
                {ratings || "4.8"}
              </span>
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-main-border" />
            <span className="text-main-muted font-bold text-xs tracking-tight italic">
              Verified Quality
            </span>
          </div>

          {/* Premium Pricing Box */}
          <div className="bg-slate-900 dark:bg-brand-primary/10 rounded-card p-xl text-white dark:text-main-content mb-lg shadow-2xl dark:shadow-none border border-transparent dark:border-brand-primary/20 relative overflow-hidden group/price transition-colors">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-white/50 dark:text-main-muted text-xs font-bold line-through mb-1">
                  Was ${originalPrice}
                </span>
                <span className="text-5xl font-black tracking-tighter text-blue-400 dark:text-brand-primary">
                  ${salePrice}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 dark:text-main-muted mb-1">
                  Total Savings
                </p>
                <p className="text-2xl font-black text-green-400">
                  ${(originalPrice - salePrice).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          {/* Short Description */}
          <p className="text-main-muted text-base lg:text-lg leading-relaxed mb-xl border-l-4 border-brand-primary/20 pl-md italic transition-colors">
            {description}
          </p>

          {/* Interaction: Quantity & Cart */}
          <div className="mt-auto space-y-md">
            <div className="flex flex-col sm:flex-row items-center gap-md">
              {/* Quantity Selector */}
              <div className="flex items-center bg-main-border/30 rounded-btn p-1.5 w-full sm:w-auto border border-main-border transition-colors">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-main text-main-content rounded-input transition-all active:scale-90"
                >
                  -
                </button>
                <span className="w-14 text-center font-black text-xl text-main-content transition-colors">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-main text-main-content rounded-input transition-all active:scale-90"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex-1 w-full bg-brand-primary dark:bg-brand-secondary hover:opacity-90 py-5 rounded-btn font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-brand-primary/20 group">
                <FaShoppingCart className="group-hover:translate-x-1 transition-transform " />
                ADD TO CART — ${(salePrice * quantity).toFixed(2)}
              </button>
            </div>

            {/* Feature Bar */}
            <div className="flex items-center justify-around py-md border-t border-main-border transition-colors">
              <div className="flex items-center gap-2 text-[10px] font-black text-main-muted uppercase tracking-widest">
                <FaTruck className="text-brand-primary" /> Free Shipping
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-main-muted uppercase tracking-widest">
                <FaShieldAlt className="text-green-500" /> Safe Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleDetailCard;
