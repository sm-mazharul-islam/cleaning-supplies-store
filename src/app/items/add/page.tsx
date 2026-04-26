"use client";

import Container from "@/components/shared/Container";
import Image from "next/image";
import React, { useState } from "react";
import { FaCloudUploadAlt, FaTag, FaDollarSign, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    brand: "",
    rating: 4.5,
    originalPrice: 0,
    salePrice: 0,
    longDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image || !formData.title || !formData.salePrice) {
      return toast.error(
        "Please fill in the required fields (Image, Title, Price)",
      );
    }

    const toastId = toast.loading("Publishing product to inventory...");

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
          originalPrice: Number(formData.originalPrice),
          salePrice: Number(formData.salePrice),
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.update(toastId, {
          render: "Product Published Successfully! 🎉",
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
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || "Failed to add product");
      }
    } catch (error: any) {
      toast.update(toastId, {
        render: error.message || "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Container>
      <div className="min-h-screen pb-20">
        <ToastContainer position="top-right" theme="colored" />

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Add New Supply
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Create a premium listing for your inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: THE FORM */}
          <div className="lg:col-span-7 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Image URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                    <FaCloudUploadAlt />
                  </span>
                  <input
                    type="text"
                    name="image"
                    required
                    placeholder="https://image-link.com"
                    className="input input-bordered w-full pl-12 rounded-2xl bg-slate-50 border-slate-200 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-slate-700">
                    Product Title
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <FaTag />
                    </span>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="ClearMist Air Freshener"
                      className="input input-bordered w-full pl-12 rounded-2xl bg-slate-50 border-slate-200"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-slate-700">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="ClearMist"
                    className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Short Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Keep your home smelling fresh."
                  className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-slate-700">
                    Original Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <FaDollarSign />
                    </span>
                    <input
                      type="number"
                      name="originalPrice"
                      placeholder="6.99"
                      className="input input-bordered w-full pl-10 rounded-2xl bg-slate-50 border-slate-200"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-slate-700">
                    Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <FaDollarSign />
                    </span>
                    <input
                      type="number"
                      name="salePrice"
                      required
                      placeholder="5.49"
                      className="input input-bordered w-full pl-10 rounded-2xl bg-slate-50 border-slate-200"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-slate-700">
                    Initial Rating
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <FaStar />
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      name="rating"
                      defaultValue={4.5}
                      className="input input-bordered w-full pl-10 rounded-2xl bg-slate-50 border-slate-200"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Long Description
                </label>
                <textarea
                  name="longDescription"
                  rows={4}
                  className="textarea textarea-bordered w-full rounded-2xl bg-slate-50 border-slate-200"
                  placeholder="Describe the cleaning power..."
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-block bg-slate-900 text-white rounded-2xl hover:bg-blue-600 border-none h-14 font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-200"
              >
                Publish Product
              </button>
            </form>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">
                Live Preview
              </p>
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="preview"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      height={40}
                      width={35}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 flex-col gap-2">
                      <FaCloudUploadAlt size={40} />
                      <span className="text-xs font-bold">
                        Image Preview Will Appear Here
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-blue-600 shadow-sm">
                    {formData.brand || "Brand"}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">
                      {formData.title || "Product Title"}
                    </h3>
                    <div className="flex items-center gap-1 text-orange-400 font-bold">
                      <FaStar size={14} /> {formData.rating}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2">
                    {formData.description ||
                      "Short description will appear here..."}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 line-through">
                        ${formData.originalPrice}
                      </span>
                      <span className="text-3xl font-black text-slate-900">
                        ${formData.salePrice}
                      </span>
                    </div>
                    <button className="btn bg-blue-600 hover:bg-slate-900 text-white border-none rounded-xl px-8 font-black uppercase text-xs tracking-tighter">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Add;
