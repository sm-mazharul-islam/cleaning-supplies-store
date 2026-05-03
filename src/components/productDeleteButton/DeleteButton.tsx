"use client";

import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

interface DeleteButtonProps {
  id: string;
  title: string;
}

const DeleteButton = ({ id, title }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // এনভায়রনমেন্ট ভেরিয়েবল না পেলে লোকালহোস্ট ফলব্যাক হিসেবে থাকবে
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    const toastId = toast.loading(`Processing deletion of ${title}...`);

    try {
      // ইউআরএল ফরম্যাট: http://localhost:5000/api/v1/products/ID
      const response = await fetch(`${baseUrl}/api/v1/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.update(toastId, {
          render: "✨ Gorgeous! Product removed successfully.",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        // সার্ভার কম্পোনেন্ট রিফ্রেশ করবে যাতে লিস্ট থেকে ডাটা চলে যায়
        router.refresh();
      } else {
        throw new Error(data.message || "Something went wrong on the server.");
      }
    } catch (error: any) {
      toast.update(toastId, {
        render: `❌ Error: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`p-2 rounded-xl transition-all duration-300 ${
          isDeleting
            ? "bg-slate-100 text-slate-300 cursor-not-allowed"
            : "text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-90"
        }`}
        title="Delete Item"
      >
        <FaTrashAlt size={18} />
      </button>
    </>
  );
};

export default DeleteButton;
