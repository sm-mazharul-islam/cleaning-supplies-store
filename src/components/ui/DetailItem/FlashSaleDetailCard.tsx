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
  FaCheckCircle,
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
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 p-6 lg:p-12">
        {/* Left: Product Image Section */}
        <div className="relative group">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-inner">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
              priority
            />

            {/* Flash Sale Badge */}
            <div className="absolute top-6 left-6 bg-red-600 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-2xl animate-pulse z-10">
              <FaBolt className="text-yellow-300" />
              <span className="font-black text-xs tracking-widest uppercase">
                Flash Sale
              </span>
            </div>

            {/* Glassmorphism Discount Badge */}
            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md text-red-600 px-4 py-2 rounded-2xl font-black shadow-lg border border-red-50/50">
              {discount}% OFF
            </div>
          </div>
        </div>

        {/* Right: Product Details Section */}
        <div className="flex flex-col py-6 lg:py-2">
          {/* Brand Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {logo && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-100 p-1.5 bg-white shadow-sm">
                  <Image
                    src={logo}
                    alt="brand logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">
                  {brand}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                  Official Store
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-red-500 hover:bg-red-50 transition-all duration-300 shadow-sm">
                <FaRegHeart />
              </button>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 shadow-sm">
                <FaShareAlt />
              </button>
            </div>
          </div>

          {/* Title & Ratings */}
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-4 tracking-tight">
            {title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-xl gap-1.5 border border-orange-100">
              <FaStar className="text-orange-500" />
              <span className="font-black text-orange-700">
                {ratings || "4.8"}
              </span>
            </div>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-slate-400 font-bold text-sm tracking-tight italic">
              Verified Quality
            </span>
          </div>

          {/* Premium Pricing Box */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white mb-8 shadow-2xl shadow-slate-200 relative overflow-hidden group/price">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm font-bold line-through mb-1 opacity-70">
                  Was ${originalPrice}
                </span>
                <span className="text-5xl font-black tracking-tighter text-blue-400">
                  ${salePrice}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
                  Total Savings
                </p>
                <p className="text-2xl font-black text-green-400">
                  ${(originalPrice - salePrice).toFixed(2)}
                </p>
              </div>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover/price:bg-blue-500/20 transition-colors" />
          </div>

          {/* Short Description */}
          <p className="text-slate-500 text-lg leading-relaxed mb-10 border-l-4 border-blue-500/20 pl-6 italic">
            {description}
          </p>

          {/* Interaction: Quantity & Cart */}
          <div className="mt-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 w-full sm:w-auto border border-slate-200 shadow-inner">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90"
                >
                  -
                </button>
                <span className="w-14 text-center font-black text-xl text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex-1 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-blue-200 group">
                <FaShoppingCart className="group-hover:translate-x-1 transition-transform" />
                ADD TO CART — ${(salePrice * quantity).toFixed(2)}
              </button>
            </div>

            {/* Feature Bar */}
            <div className="flex items-center justify-around py-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <FaTruck className="text-blue-500" /> Free Shipping
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
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
