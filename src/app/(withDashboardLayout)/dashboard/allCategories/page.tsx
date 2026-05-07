"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrashAlt, FaPlus, FaLayerGroup } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryItem {
  _id: string;
  id: string;
  title: string;
  desc: string;
  image: string;
}

export default function AllCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch All Categories from Backend ---
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/all`,
      );
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      toast.error("Network error! Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Delete Category Action ---
  const handleDelete = async (dbId: string, customId: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Module #${customId}? This action cannot be undone.`,
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/delete/${dbId}`,
          {
            method: "DELETE",
          },
        );
        const result = await response.json();

        if (result.success) {
          toast.success(`Module #${customId} successfully decommissioned!`);
          // UI থেকে ফিল্টার করে রিমুভ করা (Optimistic Update)
          setCategories((prev) => prev.filter((cat) => cat._id !== dbId));
        } else {
          toast.error(result.message || "Failed to delete.");
        }
      } catch (error) {
        toast.error("Database sync error during deletion!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            Syncing Inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-12 transition-colors duration-500">
      <ToastContainer theme="dark" position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="badge badge-primary font-black tracking-[0.3em] py-3 mb-4 rounded-md uppercase text-[10px] border-none shadow-lg shadow-blue-600/20">
              System Admin
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter leading-none uppercase">
              Module <span className="text-blue-600">Library</span>
            </h1>
          </motion.div>

          <Link href="/dashboard/addCategories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary rounded-2xl px-10 h-16 font-black uppercase tracking-widest border-none shadow-xl shadow-blue-600/20"
            >
              <FaPlus /> Add New Category
            </motion.button>
          </Link>
        </header>

        {/* --- Mobile: Vertical Card Stack --- */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          <AnimatePresence>
            {categories.map((cat) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-base-200 rounded-[2.5rem] p-6 border border-base-content/5 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-inner bg-base-300">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-600/10 px-2 py-1 rounded">
                      ID: {cat.id}
                    </span>
                    <h3 className="text-xl font-black text-base-content mt-1 leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm opacity-50 font-medium leading-relaxed mb-8 line-clamp-2">
                  {cat.desc}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/dashboard/editCategories/${cat._id}`}>
                    <button className="btn btn-md w-full rounded-xl bg-base-100 border-none hover:bg-blue-600 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all">
                      <FaEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(cat._id, cat.id)}
                    className="btn btn-md rounded-xl bg-red-600/10 text-red-600 border-none hover:bg-red-600 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- Desktop: Bento Table Layout --- */}
        <div className="hidden md:block overflow-hidden rounded-[3rem] border border-base-content/10 bg-base-100 shadow-sm">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr className="text-base-content/50 uppercase text-[10px] font-black tracking-widest border-none">
                <th className="py-8 pl-12 text-blue-600">Module Blueprint</th>
                <th>Serial Code</th>
                <th>Status</th>
                <th className="pr-12 text-right">Core Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-content/5">
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="hover:bg-blue-600/[0.02] transition-colors group"
                >
                  <td className="py-8 pl-12">
                    <div className="flex items-center gap-6">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-base-content/5">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div>
                        <div className="font-black text-base-content text-xl tracking-tighter uppercase">
                          {cat.title}
                        </div>
                        <div className="text-[9px] text-blue-600 font-black uppercase tracking-widest opacity-60">
                          High-Performance Supply
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-black text-2xl text-base-content opacity-20 group-hover:opacity-100 transition-opacity italic">
                      #{cat.id}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">
                        Active
                      </span>
                    </div>
                  </td>
                  <td className="pr-12 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <Link href={`/dashboard/editCategories/${cat._id}`}>
                        <button className="btn btn-square rounded-2xl bg-base-200 border-none hover:bg-blue-600 hover:text-white transition-all shadow-md">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(cat._id, cat.id)}
                        className="btn btn-square rounded-2xl bg-base-200 border-none hover:bg-red-600 hover:text-white transition-all shadow-md"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Configuration */}
        {categories.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-base-200/20 rounded-[4rem] border-2 border-dashed border-base-content/5 mt-10"
          >
            <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaLayerGroup size={32} className="opacity-20" />
            </div>
            <h3 className="text-xl font-black text-base-content/30 uppercase tracking-[0.2em]">
              Inventory Vacuum Detected
            </h3>
            <p className="text-[10px] font-bold text-blue-600 uppercase mt-2 tracking-widest">
              No Category modules found in database
            </p>
          </motion.div>
        )}

        {/* Safety Branding Footer */}
        <footer className="mt-20 pt-10 border-t border-base-content/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">
            Automated Supply Management Engine v2.0
          </p>
        </footer>
      </div>
    </div>
  );
}
