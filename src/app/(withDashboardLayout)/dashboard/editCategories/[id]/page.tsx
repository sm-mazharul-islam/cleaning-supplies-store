"use client";
import React, { useEffect, useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function EditCategory() {
  const { id } = useParams(); // URL থেকে ক্যাটাগরি ID (Database _id) নেবে
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
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

  // --- ১. নির্দিষ্ট ক্যাটাগরির ডাটা লোড করা ---
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/all`,
        );
        const result = await response.json();
        if (result.success) {
          const categoryToEdit = result.data.find((cat: any) => cat._id === id);
          if (categoryToEdit) {
            setFormData(categoryToEdit);
          } else {
            toast.error("Category not found!");
          }
        }
      } catch (error) {
        toast.error("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // --- ২. Cloudinary আপলোড লজিক (ইমেজ চেঞ্জ করার জন্য) ---
  const handleImageUpload = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset!);

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
        toast.success("New Image Asset Synced!");
      }
    } catch (err) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const renderIcon = (name: string) => {
    const IconComponent = (FaIcons as any)[name];
    return IconComponent ? (
      <IconComponent size={28} />
    ) : (
      <FaIcons.FaBox size={28} />
    );
  };

  // --- ৩. ডাটা আপডেট করা (Patch/Put) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/edit/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();
      if (result.success) {
        toast.success("Module Configuration Updated!");
        setTimeout(() => router.push("/dashboard/allCategories"), 1500);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      toast.error("Database connection error!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6 transition-colors duration-300">
      <ToastContainer theme="dark" position="top-right" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="badge badge-primary font-black tracking-[0.3em] py-3 mb-4 rounded-md uppercase text-[10px] border-none shadow-lg shadow-blue-600/20">
            Editor Mode
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
            Modify <span className="text-blue-600">Category Module</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Editor Form */}
          <div className="w-full lg:w-2/3 bg-base-100 p-8 md:p-12 rounded-[2.5rem] border border-base-content/10 shadow-sm transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Serial ID (Reference)
                  </label>
                  <input
                    name="id"
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
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
                    className="input input-bordered rounded-2xl bg-base-200 border-none font-bold focus:ring-2 ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Image Editor Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Update Visual Asset
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-40 border-2 border-dashed border-base-content/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-600/5 transition-all ${uploading && "opacity-50 pointer-events-none"}`}
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
                    ) : (
                      <>
                        <FaIcons.FaCloudUploadAlt
                          size={32}
                          className="text-blue-600 mb-2"
                        />
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
                          Replace Image
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Direct Link (Bypass Upload)
                  </label>
                  <textarea
                    name="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="textarea bg-base-200 border-none rounded-3xl font-bold text-xs h-40 resize-none p-6 focus:ring-2 ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Active Icon
                  </label>
                  <select
                    name="iconName"
                    value={formData.iconName}
                    onChange={(e) =>
                      setFormData({ ...formData, iconName: e.target.value })
                    }
                    className="select select-bordered rounded-2xl bg-base-200 border-none font-bold focus:ring-2 ring-blue-600"
                  >
                    <option value="FaSoap">FaSoap</option>
                    <option value="FaTools">FaTools</option>
                    <option value="FaHome">FaHome</option>
                    <option value="FaShieldVirus">FaShieldVirus</option>
                    <option value="FaSprayCan">FaSprayCan</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                    Stock Unit Count
                  </label>
                  <input
                    type="number"
                    name="count"
                    value={formData.count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        count: Number(e.target.value),
                      })
                    }
                    className="input input-bordered rounded-2xl bg-base-200 border-none font-bold focus:ring-2 ring-blue-600"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">
                  Marketing Narrative (Desc)
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  rows={4}
                  className="textarea textarea-bordered rounded-2xl bg-base-200 border-none font-bold leading-relaxed focus:ring-2 ring-blue-600"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn btn-ghost flex-1 h-16 rounded-2xl font-black uppercase tracking-widest opacity-40 hover:opacity-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating || uploading}
                  className="btn btn-primary flex-[2] h-16 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-blue-600/20 border-none"
                >
                  {updating ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Save Configurations"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Live Sync Preview */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40 text-center lg:text-left">
              Live Re-Rendering
            </h3>
            <div className="group relative flex flex-col items-center gap-6 bg-base-100 p-8 rounded-[2rem] border-2 border-blue-600 shadow-2xl overflow-hidden transition-all duration-500">
              <div className="relative w-full h-56 overflow-hidden rounded-2xl bg-base-200">
                {formData.image && (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                )}
                <div className="absolute top-2 left-2 w-8 h-8 bg-base-100/60 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-black text-base-content border border-white/20">
                  {formData.id || "00"}
                </div>
              </div>
              <div className="w-full text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-0.5 w-6 bg-blue-600"></div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Modified Module
                  </span>
                </div>
                <h3 className="text-3xl font-black text-base-content mb-3">
                  {formData.title || "Module Title"}
                </h3>
                <p className="text-sm text-base-content opacity-60 font-medium leading-relaxed">
                  {formData.desc || "Visual preview of your supply module."}
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
