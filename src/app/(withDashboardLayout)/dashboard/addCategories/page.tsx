"use client";
import React, { useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function AddCategories() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    desc: "",
    image: "",
    iconName: "FaSoap",
    count: 0,
  });

  // --- Cloudinary Native Upload ---
  const handleImageUpload = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary config missing in .env!");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );
      const fileData = await res.json();

      if (fileData.secure_url) {
        setFormData((prev) => ({ ...prev, image: fileData.secure_url }));
        toast.success("Image Hosted Successfully! ☁️");
      }
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const renderIcon = (name: string) => {
    const IconComponent = (FaIcons as any)[name];
    return IconComponent ? (
      <IconComponent size={28} />
    ) : (
      <FaIcons.FaBox size={28} />
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image)
      return toast.warning("Provide an image URL or upload one!");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();
      if (result.success) {
        toast.success("Category Module Deployed! 🚀");
        setFormData({
          id: "",
          title: "",
          desc: "",
          image: "",
          iconName: "FaSoap",
          count: 0,
        });
      }
    } catch (error) {
      toast.error("Sync failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6 transition-colors duration-300 font-sans">
      <ToastContainer theme="dark" position="top-right" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="badge badge-primary font-black tracking-[0.3em] py-3 mb-4 rounded-md uppercase text-[10px] border-none shadow-lg shadow-blue-600/20">
            System Infrastructure
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter leading-tight">
            Register New <br />
            <span className="text-blue-600">Category Module</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Side */}
          <div className="w-full lg:w-2/3 bg-base-100 p-8 md:p-12 rounded-[2.5rem] border border-base-content/10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Module ID
                  </label>
                  <input
                    name="id"
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                    placeholder="e.g. 05"
                    className="input input-bordered rounded-2xl bg-base-200 border-none font-bold focus:ring-2 ring-blue-600"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Public Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Surface Sanitizer"
                    className="input input-bordered rounded-2xl bg-base-200 border-none font-bold focus:ring-2 ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Multi-Option Image Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Option 1: Drop/Upload */}
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Asset Upload (Drop/Click)
                  </label>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-40 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all ${uploading ? "opacity-50 cursor-wait" : "hover:border-blue-600 hover:bg-blue-600/5 border-base-content/10"}`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && handleImageUpload(e.target.files[0])
                      }
                    />
                    {uploading ? (
                      <span className="loading loading-spinner text-blue-600"></span>
                    ) : formData.image.includes("cloudinary") ? (
                      <div className="text-center">
                        <FaIcons.FaCheckCircle
                          size={24}
                          className="text-emerald-500 mx-auto mb-2"
                        />
                        <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                          Cloud Hosted
                        </p>
                      </div>
                    ) : (
                      <>
                        <FaIcons.FaCloudUploadAlt
                          size={32}
                          className="text-blue-600 mb-2"
                        />
                        <p className="text-[9px] font-black uppercase tracking-widest text-base-content/40 text-center px-4">
                          Drag asset or click
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Option 2: Direct Link */}
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Or Direct Image URL
                  </label>
                  <div className="h-40 p-6 bg-base-200 rounded-3xl flex flex-col justify-center">
                    <textarea
                      name="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="Paste external image link here..."
                      className="textarea bg-transparent border-none focus:ring-0 font-bold text-xs resize-none h-full w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                  Marketing Copy (Description)
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  rows={3}
                  placeholder="Describe the utility..."
                  className="textarea textarea-bordered rounded-2xl bg-base-200 border-none font-bold leading-relaxed focus:ring-2 ring-blue-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || uploading}
                className="btn btn-primary w-full h-16 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-blue-600/20 border-none"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Save Category Module"
                )}
              </button>
            </form>
          </div>

          {/* Rendering Engine (Preview) */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40 text-center lg:text-left">
              Live Output Rendering
            </h3>
            <div className="group relative flex flex-col items-center gap-6 bg-base-100 p-8 rounded-[2rem] border-2 border-blue-600 shadow-2xl overflow-hidden transition-all duration-500">
              <div className="relative w-full h-56 overflow-hidden rounded-2xl bg-base-200 shadow-inner">
                {formData.image && (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                )}
                <div className="absolute top-2 left-2 w-8 h-8 bg-base-100/60 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-black text-base-content">
                  {formData.id || "00"}
                </div>
              </div>
              <div className="w-full text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-0.5 w-6 bg-blue-600"></div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Premium System
                  </span>
                </div>
                <h3 className="text-3xl font-black text-base-content mb-3 group-hover:text-blue-600 transition-colors">
                  {formData.title || "Module Title"}
                </h3>
                <p className="text-sm text-base-content opacity-60 font-medium leading-relaxed">
                  {formData.desc ||
                    "Visual preview of your supply module based on input."}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-5 text-[120px] font-black text-base-content opacity-5 pointer-events-none italic">
                {formData.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
