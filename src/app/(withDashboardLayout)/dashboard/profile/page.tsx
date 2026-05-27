"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserTag,
  FaHistory,
  FaCheckDouble,
  FaFingerprint,
  FaEdit,
  FaGlobe,
  FaLock,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Profile Detail Component
 * Fields: Role, UserName, Gmail, Creation Date/Time, Last Login, ID Last 4, and Dummy Stats.
 */
export default function ProfileDetail() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();
      if (result.success) {
        setUser(result.data);
      }
    } catch (error) {
      toast.error("Failed to sync identity records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );

  const formatFullDateTime = (date: string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${d.toLocaleDateString("en-GB")} | ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 font-sans text-base-content selection:bg-blue-100">
      <ToastContainer />

      {/* Header Section */}
      <div className="mb-16 border-b border-base-300 pb-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          User <span className="text-blue-600">Intelligence</span>
        </h1>
        <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] mt-6">
          Cleaning Supplies Store • Encrypted Profile Records
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Visual Identity */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-base-100 shadow-2xl bg-base-200">
                <Image
                  src={user?.pictureUrl || "/placeholder-avatar.png"}
                  alt="Profile Avatar"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                  priority
                />
              </div>
            </div>

            <div className="mt-10 text-center">
              <h2 className="text-4xl font-black uppercase tracking-tight leading-none mb-3">
                {user?.userName}
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/20">
                <FaUserTag size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {user?.role || "Verified Member"}
                </span>
              </div>
            </div>
          </div>

          {/* Dummy Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-200 p-6 rounded-[2rem] text-center border border-base-300">
              <p className="text-[9px] font-black opacity-40 uppercase mb-1">
                Orders
              </p>
              <p className="text-2xl font-black text-blue-600">12</p>
            </div>
            <div className="bg-base-200 p-6 rounded-[2rem] text-center border border-base-300">
              <p className="text-[9px] font-black opacity-40 uppercase mb-1">
                Rank
              </p>
              <p className="text-2xl font-black text-blue-600">Gold</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Data Grid */}
        <div className="lg:col-span-8">
          <div className="bg-base-200/40 border border-base-300 rounded-[3.5rem] p-8 md:p-14 shadow-inner relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-y-12 gap-x-10 relative z-10">
              {/* Field: User Name */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaUserCircle />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    System Identity
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <p className="text-2xl font-black uppercase tracking-tight">
                    {user?.userName}
                  </p>
                </div>
              </div>

              {/* Field: Gmail */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaEnvelope />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Secure Gmail
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <p className="text-base font-bold lowercase opacity-80">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Field: Account Creation Date & Time */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaCalendarAlt />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Registration Timestamp
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <p className="text-sm font-black uppercase tracking-tighter">
                    {formatFullDateTime(user?.createdAt)}
                  </p>
                </div>
              </div>

              {/* Field: Access Key (ID Last 4) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaFingerprint />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Access Key (End Sig)
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <p className="text-2xl font-black tracking-[0.3em] text-blue-600">
                    ****{user?._id?.slice(-4)}
                  </p>
                </div>
              </div>

              {/* Field: Last Login Date & Time */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaHistory />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Last Login Pulse
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <p className="text-sm font-black uppercase tracking-tighter">
                    {formatFullDateTime(
                      user?.lastLogin || new Date().toISOString(),
                    )}
                  </p>
                </div>
              </div>

              {/* Field: Identity Status (Dummy) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaCheckDouble />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Identity Status
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
                    <FaLock size={10} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Encrypted & Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Dummy: Region Tracking */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaGlobe />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Primary Region
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <p className="text-sm font-bold uppercase">
                    Dhaka, Bangladesh (UTC+6)
                  </p>
                </div>
              </div>

              {/* Field: Security UID */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaShieldAlt />
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    System Security Key
                  </label>
                </div>
                <div className="min-h-[3rem] flex items-center">
                  <p className="text-[10px] font-mono font-bold opacity-30 break-all leading-tight">
                    {user?.uid || "FIREBASE_UNSET_ENCRYPTION_KEY"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="mt-16 pt-10 border-t border-base-300 flex flex-wrap gap-4 justify-end relative z-10">
              <button className="flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-3xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/30">
                <FaEdit /> Modify Profile
              </button>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-[15rem] font-black italic pointer-events-none uppercase">
              PS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
