"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NavbarTwo from "@/components/shared/NavbarTwo";
import { useAuth } from "@/context/AuthContext"; // AuthContext ইমপোর্ট

const RegisterForm = () => {
  const { login } = useAuth(); // AuthContext থেকে login ফাংশন নেওয়া
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );
    const resData = await res.json();
    return resData.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setIsLoading(true);
    try {
      // ১. ক্লাউডিনারিতে ইমেজ আপলোড
      const pictureUrl = imageFile ? await uploadToCloudinary(imageFile) : "";

      // ২. ব্যাকএন্ডে রেজিস্ট্রেশন রিকোয়েস্ট
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, pictureUrl }),
        },
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Registration failed");

      // ৩. সফল হলে AuthContext এর login ফাংশন কল করা
      // এটি টোকেন সেভ করবে এবং ড্যাশবোর্ডে রিডাইরেক্ট করবে
      toast.success("✨ Gorgeous! Account Created Successfully.");
      login(result.token);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarTwo />
      <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 transition-all"
        >
          <h2 className="text-3xl font-black text-center dark:text-white uppercase mb-8 tracking-tighter">
            Register
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              required
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />

            {/* প্রোফাইল পিকচার আপলোড সেকশন */}
            <div className="relative border-2 border-dashed dark:border-slate-700 rounded-2xl p-4 flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImage}
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <FaCloudUploadAlt size={32} className="text-slate-400" />
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Upload Photo
                  </span>
                </div>
              )}
            </div>

            <input
              type="email"
              placeholder="Email Address"
              required
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-5 text-slate-400 hover:text-blue-500 transition-colors"
              >
                {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-slate-900 dark:bg-blue-600 text-white p-4 rounded-2xl font-black mt-8 uppercase tracking-widest shadow-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Sign Up Now"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
