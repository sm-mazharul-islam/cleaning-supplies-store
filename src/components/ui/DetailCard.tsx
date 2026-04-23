"use client";

import { TProduct } from "@/types";
import Image from "next/image";
import {
  FaShoppingCart,
  FaStar,
  FaShieldAlt,
  FaTruck,
  FaAward,
} from "react-icons/fa";
import CommunityDiscussion from "./communityDiscussion/CommunityDiscussion";

const DetailCard = ({ item }: { item: TProduct }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-slate-900">
      {/* Product Display Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100 mb-16">
        {/* Left: Image Gallery Style */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border group">
            <Image
              src={item.image}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              alt={item.title}
              priority
            />
            {/* Brand Watermark/Badge */}
            <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/50 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                {item.brand}
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl text-center">
              <FaShieldAlt className="mx-auto mb-2 text-blue-500" />
              <p className="text-[9px] font-black uppercase">Certified</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-center">
              <FaTruck className="mx-auto mb-2 text-emerald-500" />
              <p className="text-[9px] font-black uppercase">Fast Ship</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-center">
              <FaAward className="mx-auto mb-2 text-amber-500" />
              <p className="text-[9px] font-black uppercase">Original</p>
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge badge-primary font-black uppercase tracking-widest py-3 px-4 text-[10px]">
              {item.brand} Official
            </div>
            {/* Rating Display */}
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <FaStar className="text-amber-500 text-xs" />
              <span className="text-xs font-black text-amber-700">
                {item.rating}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 leading-tight">
            {item.title}
          </h1>

          <p className="text-slate-500 font-medium text-lg mb-8 italic">
            {item.description}
          </p>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-5xl font-black text-blue-600">
              ${item.salePrice}
            </span>
            {item.originalPrice && (
              <del className="text-xl font-bold text-slate-300">
                ${item.originalPrice}
              </del>
            )}
            <span className="text-xs font-black bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg uppercase tracking-widest ml-2">
              Save{" "}
              {Math.round(
                ((item.originalPrice - item.salePrice) / item.originalPrice) *
                  100,
              )}
              %
            </span>
          </div>

          {/* Long Description Area */}
          <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              Product Overview
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {item.longDescription}
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3 active:scale-95">
              <FaShoppingCart /> Add to Cart
            </button>
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Stock status:{" "}
              <span className="text-emerald-500">In Stock & Ready to ship</span>
            </p>
          </div>
        </div>
      </div>

      {/* Community Section Component */}
      <CommunityDiscussion productId={item._id} />
    </div>
  );
};

export default DetailCard;
