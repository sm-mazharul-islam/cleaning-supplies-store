"use client";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

export default function ApproveOrderButton({ orderId }: { orderId: string }) {
  const handleApprove = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "approved" }),
      },
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message || "Order Approved!");
      window.location.reload(); // ডাটা আপডেট দেখানোর জন্য
    }
  };

  return (
    <button
      onClick={handleApprove}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-700 transition-all"
    >
      <FaCheck /> Approve Now
    </button>
  );
}
