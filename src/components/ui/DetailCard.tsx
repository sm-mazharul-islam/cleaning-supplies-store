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

      if (!token || token === "undefined" || token === "null") {
        toast.error("Please login first to place an order!", {
          position: "top-center",
        });
        return;
      }

      let userEmail = "";
      try {
        const decoded: any = jwtDecode(token);
        userEmail = decoded?.email;
      } catch (decodeErr) {
        toast.error("Session expired or invalid. Please login again.");
        localStorage.removeItem("accessToken");
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
            Authorization: `Bearer ${token}`,
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
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 font-sans transition-colors duration-500 ">
      <ToastContainer />

      {/* Main Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 lg:p-14 shadow-2xl border border-base-300 mb-12 md:mb-20 transition-all duration-500  backdrop-blur-md">
        {/* Left Section: Visual Assets */}
        <div className="space-y-6 md:space-y-8">
          {/* Main Image with Hover Effect */}
          <div className="relative aspect-square w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-base-300 group ">
            <Image
              src={item.image || "/placeholder-image.png"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              alt={item.title || "Product Image"}
              priority
            />
            {/* Glassmorphism Brand Badge */}
            <div className="absolute top-4 md:top-8 left-4 md:left-8  backdrop-blur-xl px-4 md:px-6 py-2 md:py-3 rounded-2xl  shadow-xl">
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-primary">
                {item.brand}
              </p>
            </div>
          </div>

          {/* Features Grid - Responsive 3 Columns */}
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {[
              { icon: FaShieldAlt, label: "Certified", color: "text-primary" },
              { icon: FaTruck, label: "Fast Ship", color: "text-success" },
              { icon: FaAward, label: "Original", color: "text-warning" },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-3 md:p-6 rounded-2xl md:rounded-3xl text-center border border-base-300 bg-base-200/30 dark:bg-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <feature.icon
                  className={`mx-auto mb-2 md:mb-3 text-lg md:text-2xl ${feature.color}`}
                />
                <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60 tracking-widest leading-none">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Content & Actions */}
        <div className="flex flex-col justify-center mt-6 lg:mt-0">
          {/* Badge & Rating Row */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-primary text-primary-content font-black uppercase tracking-widest py-2 px-5 rounded-full text-[9px] md:text-[10px] shadow-lg shadow-primary/20">
              {item.brand} Official
            </div>
            <div className="flex items-center gap-1.5 bg-warning/10 px-4 py-1.5 rounded-full border border-warning/20">
              <FaStar className="text-warning text-xs md:text-sm" />
              <span className="text-[10px] md:text-xs font-black text-warning">
                {item.rating || "4.8"}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tighter text-base-content leading-[1.1] uppercase transition-colors duration-300">
            {item.title}
          </h1>

          <p className="text-base-content/60 font-medium text-base md:text-xl mb-8 md:mb-10 italic leading-relaxed max-w-xl">
            {item.description}
          </p>

          {/* Pricing Architecture */}
          <div className="flex flex-wrap items-baseline gap-4 md:gap-6 mb-10 md:mb-12">
            <span className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
              ${item.salePrice}
            </span>
            {item.originalPrice && (
              <del className="text-lg md:text-2xl font-bold opacity-20">
                ${item.originalPrice}
              </del>
            )}
            {item.originalPrice && (
              <span className="text-[10px] md:text-xs font-black bg-success/10 text-success px-4 py-1.5 rounded-xl uppercase tracking-widest animate-pulse">
                Save{" "}
                {Math.round(
                  ((item.originalPrice - item.salePrice) / item.originalPrice) *
                    100,
                )}
                %
              </span>
            )}
          </div>

          {/* Overview Card */}
          <div className="bg-base-200/50 dark:bg-white/5 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-base-300 mb-10 md:mb-12 group hover:border-primary/20 transition-all">
            <h3 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] opacity-40 mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary/40"></span> Product
              Overview
            </h3>
            <p className="text-base-content/80 leading-relaxed font-medium text-sm md:text-base">
              {item.longDescription ||
                "This premium product is engineered for high-performance cleaning, ensuring maximum efficiency. Ideal for both commercial and luxury residential environments, delivering results that exceed industry standards."}
            </p>
          </div>

          {/* Call to Action Row */}
          <div className="space-y-5">
            <button
              onClick={handleAddToOrder}
              className="btn btn-primary w-full h-16 md:h-20 rounded-[1.2rem] md:rounded-[2rem] font-black text-[10px] md:text-xs tracking-[0.2em] uppercase shadow-2xl shadow-primary/30 active:scale-95 transition-all hover:translate-y-[-2px] flex items-center justify-center gap-4"
            >
              <FaShoppingCart className="text-lg md:text-xl" /> Buy Now / Add to
              Order
            </button>

            <div className="flex items-center justify-center gap-4 py-2 border-t border-base-300/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>
                <p className="text-[9px] md:text-[11px] font-black opacity-40 uppercase tracking-[0.2em]">
                  Status: <span className="text-success ml-1">In Stock</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Section Component - Fully Responsive Bento */}
      <div className="rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 lg:p-20 border border-base-300 transition-all duration-500  shadow-2xl">
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
            Voice of users
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-base-content leading-none">
            Community <span className="text-primary italic">Discussion</span>
          </h2>
          <div className="h-1.5 w-20 bg-primary mt-6 rounded-full mx-auto md:mx-0"></div>
        </div>
        <CommunityDiscussion productId={item._id} />
      </div>
    </div>
  );
};

export default DetailCard;
