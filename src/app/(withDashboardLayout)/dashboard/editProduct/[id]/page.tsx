"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    // ১. ডাটা ফেচ করার সময় রেসপন্স ফরম্যাট চেক করা
    fetch(`${baseUrl}/products/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          setFormData(result.data);
        } else {
          setFormData(result);
        }
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating product...");

    try {
      const { _id, ...updatePayload } = formData;

      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatePayload,
          salePrice: Number(formData.salePrice),
          originalPrice: Number(formData.originalPrice),
        }),
      });

      const result = await res.json();

      if (result.success || res.ok) {
        toast.update(loadingToast, {
          render: "Updated Successfully! ✨",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => router.push("/dashboard"), 2000);
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
      <div className="p-20 text-center font-bold">
        Loading Product Details...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100">
      <ToastContainer />
      <h2 className="text-3xl font-black mb-8 text-slate-900 uppercase tracking-tight">
        Edit Product
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Sale Price ($)
            </label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice || 0}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Original Price ($)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice || 0}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-slate-900 text-white p-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
          >
            Update Now
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
