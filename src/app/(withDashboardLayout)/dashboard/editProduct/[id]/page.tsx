"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { FaCloudUploadAlt, FaTrashAlt, FaImage } from "react-icons/fa";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    // ১. প্রোডাক্টের সব ডাটা এবং ইমেজ অ্যারে লোড করা
    fetch(`${baseUrl}/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((result) => {
        const data = result.data || result;

        // নিশ্চিত করা হচ্ছে যে ইমেজ সবসময় একটি অ্যারে হিসেবে থাকবে
        if (data.image) {
          data.image = Array.isArray(data.image) ? data.image : [data.image];
        } else {
          data.image = [];
        }

        setFormData(data);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        toast.error("Failed to load product data");
      });
  }, [id, baseUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // ২. ক্লাউডিনারিতে নতুন ইমেজ আপলোড এবং লিস্টে যোগ করা
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading to Cloudinary...");

    try {
      const file = files[0];
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data },
      );

      const resData = await res.json();
      if (resData.secure_url) {
        setFormData((prev: any) => ({
          ...prev,
          image: [...prev.image, resData.secure_url], // নতুন ইমেজ লিস্টের শেষে যোগ হবে
        }));
        toast.update(toastId, {
          render: "New image added! 📸",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Upload failed!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // ৩. লিস্ট থেকে নির্দিষ্ট ইমেজ রিমুভ করা
  const removeImage = (indexToRemove: number) => {
    const updatedImages = formData.image.filter(
      (_: any, index: number) => index !== indexToRemove,
    );
    setFormData((prev: any) => ({ ...prev, image: updatedImages }));
    toast.info("Image removed from selection");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image || formData.image.length === 0) {
      return toast.error("Please keep at least one image!");
    }

    const loadingToast = toast.loading("Syncing changes with server...");

    try {
      const { _id, ...updatePayload } = formData;

      const res = await fetch(`${baseUrl}/api/v1/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatePayload,
          salePrice: Number(formData.salePrice),
          originalPrice: Number(formData.originalPrice),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.update(loadingToast, {
          render: "Product Updated Successfully! ✨",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => router.push("/dashboard/allSupply"), 2000);
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (error: any) {
      toast.update(loadingToast, {
        render: error.message || "Error updating!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  if (!formData)
    return (
      <div className="p-20 text-center font-bold text-blue-600 animate-pulse">
        Loading Gorgeous Details...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto my-10 p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border dark:border-slate-800">
      <ToastContainer position="top-center" />

      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
          <FaImage size={24} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          Edit Product
        </h2>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
            Product Identity
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 dark:text-white border-none outline-none focus:ring-4 ring-blue-600/10 transition-all font-bold"
          />
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
              Sale Price ($)
            </label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice || 0}
              onChange={handleChange}
              className="w-full p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 dark:text-white border-none outline-none focus:ring-4 ring-blue-600/10 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
              Original Price ($)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice || 0}
              onChange={handleChange}
              className="w-full p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 dark:text-white border-none outline-none focus:ring-4 ring-blue-600/10 font-bold"
            />
          </div>
        </div>

        {/* --- Image Management (All Images) --- */}
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
            Product Gallery ({formData.image.length})
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* সব ইমেজ প্রিভিউ */}
            {formData.image.map((url: string, index: number) => (
              <div
                key={index}
                className="relative group aspect-square rounded-[2rem] overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-sm"
              >
                <Image
                  src={url}
                  alt="product"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transform hover:scale-110 transition-all shadow-xl"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* ইমেজ আপলোড বাটন */}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-400 transition-all group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
              />
              <FaCloudUploadAlt
                size={32}
                className="text-slate-300 group-hover:text-blue-500 mb-2 transition-colors"
              />
              <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-blue-600">
                {isUploading ? "Uploading..." : "Add New"}
              </span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
            Product Story
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={5}
            className="w-full p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 dark:text-white border-none outline-none focus:ring-4 ring-blue-600/10 font-medium"
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={isUploading}
            className="flex-[2] bg-slate-900 dark:bg-blue-600 text-white p-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
          >
            Save All Changes
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 p-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
