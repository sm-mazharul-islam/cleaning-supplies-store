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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const DetailCard = ({ item }: { item: TProduct }) => {
  const handleAddToOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // আরও শক্তিশালী চেক (Handles empty, undefined, or null strings)
      if (!token || token === "undefined" || token === "null") {
        toast.error("Please login first to place an order!", {
          position: "top-center",
        });
        return;
      }

      let userEmail = "";
      try {
        const decoded: any = jwtDecode(token);
        userEmail = decoded?.email; // নিশ্চিত করুন আপনার টোকেনে 'email' কি (key) টাই আছে
      } catch (decodeErr) {
        toast.error("Session expired or invalid. Please login again.");
        localStorage.removeItem("accessToken"); // ইনভ্যালিড টোকেন মুছে ফেলুন
        return;
      }

      if (!userEmail) {
        toast.error("User email not found in token. Please login again.");
        return;
      }

      const orderPayload = {
        userEmail: userEmail,
        items: [
          {
            productId: item._id,
            title: item.title,
            price: item.salePrice,
            image: item.image,
            brand: item.brand,
          },
        ],
        totalAmount: item.salePrice,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Bearer এর স্পেলিং এবং স্পেস চেক করুন
          },
          body: JSON.stringify(orderPayload),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success(`${item.title} added to your orders!`, {
          position: "bottom-right",
        });
      } else {
        throw new Error(result.message || "Failed to place order");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add order");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans transition-colors duration-500">
      <ToastContainer />

      {/* Main Container with Bento Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 rounded-card p-6 md:p-12 shadow-sm border border-base-300 mb-16 transition-all duration-500 bg-base-100">
        {/* Left Section: Visual Assets */}
        <div className="space-y-6">
          {/* High-Performance Image Container */}
          <div className="relative aspect-square rounded-card overflow-hidden border border-base-300 group bg-base-200">
            <Image
              src={item.image || "/placeholder-image.png"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              alt={item.title || "Product Image"}
              priority
            />
            {/* Glassmorphism Badge */}
            <div className="absolute top-6 left-6 bg-base-100/40 backdrop-blur-md px-4 py-2 rounded-xl border border-base-300 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                {item.brand}
              </p>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl text-center border border-base-300 bg-base-100/50 backdrop-blur-sm">
              <FaShieldAlt className="mx-auto mb-2 text-primary text-xl" />
              <p className="text-[9px] font-black uppercase opacity-70 tracking-widest">
                Certified
              </p>
            </div>
            <div className="p-4 rounded-2xl text-center border border-base-300 bg-base-100/50 backdrop-blur-sm">
              <FaTruck className="mx-auto mb-2 text-success text-xl" />
              <p className="text-[9px] font-black uppercase opacity-70 tracking-widest">
                Fast Ship
              </p>
            </div>
            <div className="p-4 rounded-2xl text-center border border-base-300 bg-base-100/50 backdrop-blur-sm">
              <FaAward className="mx-auto mb-2 text-warning text-xl" />
              <p className="text-[9px] font-black uppercase opacity-70 tracking-widest">
                Original
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Content & Actions */}
        <div className="flex flex-col justify-center">
          {/* Header Metadata */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary text-primary-content font-black uppercase tracking-widest py-1.5 px-4 rounded-full text-[10px] shadow-lg shadow-primary/20">
              {item.brand} Official
            </div>
            {/* Rating Component */}
            <div className="flex items-center gap-1 bg-warning/10 px-3 py-1 rounded-full border border-warning/20">
              <FaStar className="text-warning text-xs" />
              <span className="text-xs font-black text-warning">
                {item.rating || "4.5"}
              </span>
            </div>
          </div>

          {/* Typography: Leading Tight & Uppercase */}
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-base-content leading-tight uppercase transition-colors duration-300">
            {item.title}
          </h1>

          <p className="text-base-content/60 font-medium text-lg mb-8 italic leading-relaxed max-w-md">
            {item.description}
          </p>

          {/* Pricing Architecture */}
          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-5xl font-black text-primary tracking-tighter">
              ${item.salePrice}
            </span>
            {item.originalPrice && (
              <del className="text-xl font-bold opacity-30">
                ${item.originalPrice}
              </del>
            )}
            {item.originalPrice && (
              <span className="ml-2 text-xs font-black bg-success/10 text-success px-3 py-1 rounded-lg uppercase tracking-widest">
                Save{" "}
                {Math.round(
                  ((item.originalPrice - item.salePrice) / item.originalPrice) *
                    100,
                )}
                %
              </span>
            )}
          </div>

          {/* Product Overview Bento Card */}
          <div className="bg-base-200/50 p-8 rounded-card border border-base-300 mb-10 transition-all">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">
              Product Overview
            </h3>
            <p className="text-base-content/80 leading-relaxed font-medium">
              {item.longDescription ||
                "This premium product is designed for high-performance cleaning, ensuring durability and efficiency in every use. Perfect for both professional and residential environments."}
            </p>
          </div>

          {/* Primary Action */}
          <div className="space-y-4">
            <button
              onClick={handleAddToOrder}
              className="btn btn-primary w-full h-16 rounded-btn font-black text-xs tracking-widest uppercase shadow-xl shadow-primary/20 active:scale-95 transition-all hover:shadow-2xl flex items-center justify-center gap-3"
            >
              <FaShoppingCart className="text-lg" /> Add to My Order
            </button>

            <div className="flex items-center justify-center gap-4 py-2">
              <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">
                Stock status:{" "}
                <span className="text-success ml-1">In Stock</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Section Component */}
      <div className="rounded-card p-8 md:p-12 border border-base-300 transition-all duration-500 bg-base-100 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-base-content">
            Community <span className="text-primary">Discussion</span>
          </h2>
        </div>
        <CommunityDiscussion productId={item._id} />
      </div>
    </div>
  );
};

export default DetailCard;
