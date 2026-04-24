"use client";

import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

// এখানে { id: string; title: string; } ডিফাইন করে দিন
const DeleteButton = ({ id, title }: { id: string; title: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    // এখন কনফার্মেশন মেসেজে title টি ব্যবহার করা যাবে
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
          method: "DELETE",
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Product removed successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Network error!");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-slate-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 rounded-lg"
    >
      <FaTrashAlt size={16} />
    </button>
  );
};

export default DeleteButton;
