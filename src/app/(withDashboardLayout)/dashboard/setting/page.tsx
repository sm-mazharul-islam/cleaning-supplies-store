"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaTrashAlt,
  FaCloudUploadAlt,
  FaSave,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function SettingPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    pictureUrl: "",
  });

  // ১. ইউজার ডাটা ফেচ করা
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/v1/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.success) {
          setProfile({
            userName: result.data.userName || "",
            email: result.data.email || "",
            pictureUrl: result.data.pictureUrl || "",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, []);

  // ২. Cloudinary-তে ইমেজ আপলোড লজিক
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset"); // আপনার Cloudinary Preset নাম দিন

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (data.secure_url) {
        setProfile({ ...profile, pictureUrl: data.secure_url });
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ৩. ছবি রিমুভ করা (Delete current image preview)
  const removeImage = () => {
    setProfile({ ...profile, pictureUrl: "" });
    toast.info("Image removed. Save to apply changes.");
  };

  // ৪. প্রোফাইল সেভ (Name & Image URL)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/v1/user/profile/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: profile.userName,
          pictureUrl: profile.pictureUrl,
        }),
      });
      const data = await res.json();
      if (data.success) toast.success("Profile updated!");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ৫. অ্যাকাউন্ট ডিলিট করা
  const handleDeleteAccount = async () => {
    if (
      window.confirm("Whole account activity will be deleted. Are you sure?")
    ) {
      const token = localStorage.getItem("token");
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/v1/user/profile/delete`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (error) {
        toast.error("Delete request failed");
      }
    }
  };

  if (fetching)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden">
        <form onSubmit={handleUpdate} className="card-body gap-6">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center">
            Settings
          </h2>

          {/* ইমেজ সেকশন: ডিলিট এবং ক্লাউডিনারি আপলোড */}
          <div className="flex flex-col items-center gap-6">
            <div className="avatar relative">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {profile.pictureUrl ? (
                  <img src={profile.pictureUrl} alt="User Profile" />
                ) : (
                  <div className="bg-base-300 h-full w-full flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              {profile.pictureUrl && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-circle btn-xs btn-error absolute top-0 right-0 shadow-lg"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              <label
                className={`btn btn-outline btn-sm gap-2 ${uploading ? "loading" : ""}`}
              >
                <FaCloudUploadAlt />{" "}
                {uploading ? "Uploading..." : "Upload to Cloudinary"}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
              <p className="text-[10px] opacity-50 italic">
                Upload new image to replace current one
              </p>
            </div>
          </div>

          <div className="divider">Profile Info</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label-text font-semibold mb-2 flex items-center gap-2">
                <FaUser size={12} /> User Name
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary"
                value={profile.userName}
                onChange={(e) =>
                  setProfile({ ...profile, userName: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label-text font-semibold mb-2 opacity-50">
                Email (Fixed)
              </label>
              <input
                type="email"
                className="input input-bordered bg-base-200 cursor-not-allowed"
                value={profile.email}
                disabled
              />
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full text-white mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            <FaSave /> Save Changes
          </button>
        </form>
      </div>

      {/* অ্যাকাউন্ট ডিলিট সেকশন */}
      <div className="mt-12 card bg-error/5 border border-error/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-error font-bold text-xl flex items-center gap-2">
            <FaExclamationTriangle /> Whole Account Delete Activity
          </h3>
          <p className="text-sm opacity-70">
            This will wipe your rental history and all personal data from Besa
            Luxury Rental.
          </p>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="btn btn-error btn-outline"
        >
          <FaTrashAlt /> Delete My Account
        </button>
      </div>
    </div>
  );
}
