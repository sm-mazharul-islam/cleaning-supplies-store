"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FaCloudUploadAlt,
  FaLink,
  FaTag,
  FaDollarSign,
  FaStar,
  FaImage,
  FaAlignLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductPage = () => {
  // ১. সব ফিল্ডে Optional Channing হ্যান্ডেল করার জন্য স্টেট সেটআপ
  const [formData, setFormData] = useState<any>({
    image: "",
    title: "",
    description: "",
    brand: "",
    rating: 4.5,
    originalPrice: 0,
    salePrice: 0,
    longDescription: "",
  });

  const [uploadType, setUploadType] = useState<"link" | "file">("link");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // ২. ডেস্কটপ থেকে ফাইল ড্রপ এবং সিলেকশন হ্যান্ডলিং
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optional chaining ব্যবহার করে ডাটা ভ্যালিডেশন
    if (!formData?.image || !formData?.title || !formData?.salePrice) {
      return toast.error("Essential fields are missing! 🚫");
    }

    const toastId = toast.loading("Deploying new supply to database...");

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/api/v1/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData?.rating),
          originalPrice: Number(formData?.originalPrice),
          salePrice: Number(formData?.salePrice),
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.update(toastId, {
          render: "Success! Product is now live. ✨",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setFormData({
          image: "",
          title: "",
          description: "",
          brand: "",
          rating: 4.5,
          originalPrice: 0,
          salePrice: 0,
          longDescription: "",
        });
      }
    } catch (error: any) {
      toast.update(toastId, {
        render: "Deployment failed. Check connection.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 pt-10">
      <ToastContainer position="top-right" theme="colored" />

      <div className="max-w-7xl mx-auto px-0 md:px-4">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
            New <span className="text-blue-600">Inventory</span> Item
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-2 tracking-wide">
            Add a premium cleaning supply to the Besa Luxury collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: FORM (Glassmorphism Bento Design) */}
          <div className="lg:col-span-7 bg-white/90 dark:bg-slate-800/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-slate-200/50 dark:border-slate-700 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Input Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Choose Asset Source
                </label>
                <div className="flex gap-4 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl w-fit border dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setUploadType("link")}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${uploadType === "link" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-xl" : "text-slate-400"}`}
                  >
                    Image Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadType("file")}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${uploadType === "file" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-xl" : "text-slate-400"}`}
                  >
                    Desktop Upload
                  </button>
                </div>

                {uploadType === "link" ? (
                  <div className="relative group transition-all animate-in fade-in slide-in-from-top-2">
                    <span className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <FaLink />
                    </span>
                    <input
                      type="text"
                      name="image"
                      value={formData?.image}
                      placeholder="Paste your high-res image URL..."
                      className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none dark:text-white transition-all font-medium"
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[1.5rem] cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all animate-in fade-in slide-in-from-top-2 group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaCloudUploadAlt
                        size={44}
                        className="text-blue-500 mb-3 group-hover:scale-110 transition-transform"
                      />
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Drop Image or Click to Browse
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>

              {/* Title & Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Product Title
                  </label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <FaTag />
                    </span>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="Luxury Mist"
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 dark:text-white outline-none transition-all"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Brand Identity
                  </label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Besa Luxury"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 dark:text-white outline-none transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Pricing & Ratings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Retail Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-5 flex items-center text-slate-400">
                      <FaDollarSign />
                    </span>
                    <input
                      type="number"
                      name="originalPrice"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent dark:text-white outline-none transition-all"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">
                    Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-5 flex items-center text-blue-500 font-bold">
                      <FaDollarSign />
                    </span>
                    <input
                      type="number"
                      name="salePrice"
                      required
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 font-black outline-none transition-all"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Initial Rating
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-5 flex items-center text-orange-400">
                      <FaStar />
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      name="rating"
                      defaultValue={4.5}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent dark:text-white outline-none transition-all"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Short Summary
                </label>
                <div className="relative group">
                  <span className="absolute top-4 left-5 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <FaAlignLeft />
                  </span>
                  <input
                    type="text"
                    name="description"
                    placeholder="A brief hook for the product..."
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 dark:text-white outline-none transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Technical Story (Long Description)
                </label>
                <textarea
                  name="longDescription"
                  rows={4}
                  className="w-full px-6 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 dark:text-white outline-none transition-all resize-none font-medium"
                  placeholder="Describe the cleaning power, safety, and performance..."
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 dark:bg-blue-600 text-white rounded-[1.5rem] h-16 font-black uppercase tracking-[0.3em] transition-all active:scale-[0.98] shadow-2xl hover:shadow-blue-500/20"
              >
                Publish New Listing
              </button>
            </form>
          </div>

          {/* RIGHT: LIVE DESIGN PREVIEW */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-10">
              <div className="flex items-center gap-3 mb-6 ml-4">
                <FaCheckCircle className="text-green-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Real-time Designer View
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-700 transition-all duration-700 hover:scale-[1.02]">
                <div className="relative h-80 bg-slate-100 dark:bg-slate-900">
                  {formData?.image ? (
                    <Image
                      src={formData?.image}
                      alt="preview"
                      fill
                      className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full flex-col text-slate-300 dark:text-slate-700 gap-4">
                      <FaImage size={64} className="opacity-20" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Asset Loading...
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl px-5 py-2 rounded-2xl text-[10px] font-black text-blue-600 dark:text-blue-400 shadow-xl border border-white/20">
                    {formData?.brand || "LUXURY BRAND"}
                  </div>
                </div>

                <div className="p-12">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none truncate max-w-[70%]">
                      {formData?.title || "Elite Listing"}
                    </h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full text-orange-500 font-black text-xs">
                      <FaStar size={10} /> {formData?.rating || 4.5}
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-10 leading-relaxed line-clamp-3">
                    {formData?.description ||
                      "Your product's short story will emerge here as you type. Ensure it captures the elegance of your inventory."}
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t dark:border-slate-700">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-1 line-through">
                        ${formData?.originalPrice || "0.00"}
                      </span>
                      <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                        ${formData?.salePrice || "0.00"}
                      </span>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                      <FaTag size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
