"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaUserAlt,
  FaFingerprint,
  FaBoxOpen,
  FaCalendarAlt,
  FaArrowRight,
  FaHistory,
  FaEye,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // --- ১. সব অর্ডার ফেচ করা ---
  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Unauthorized: Please login as admin.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (result.success) {
        const orderData = Array.isArray(result.data)
          ? result.data
          : result.data?.orders || [];
        setOrders(orderData);
      } else {
        toast.error(result.message || "Failed to fetch master data.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Database connection failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // --- ২. অ্যাডমিন কর্তৃক অর্ডার অ্যাপ্রুভ করা (অটো-মেসেজ সহ) ---
  const handleApproveOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
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
      const result = await response.json();

      if (result.success) {
        // ব্যাকএন্ড থেকে আসা কাস্টম মেসেজটি দেখানো
        toast.success(result.message, {
          position: "top-center",
          autoClose: 6000,
        });

        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "approved" } : o,
          ),
        );
        setSelectedOrder(null);
      } else {
        toast.error(result.message || "Approval failed.");
      }
    } catch (error) {
      toast.error("Authorization request failed.");
    }
  };

  // --- ৩. অ্যাডমিন কর্তৃক যেকোনো অর্ডার ডিলিট করা ---
  const handleDeleteOrder = async (orderId: string) => {
    if (
      !window.confirm("Are you sure you want to delete this order permanently?")
    )
      return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/orders/admin/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();

      if (result.success) {
        toast.error("Order Deleted Successfully!");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        setSelectedOrder(null);
      } else {
        toast.error(result.message || "Deletion failed.");
      }
    } catch (error) {
      toast.error("Error deleting order.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-xs font-black uppercase tracking-widest mt-4 text-base-content opacity-50">
          Syncing Master Database...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 font-sans bg-base-100 text-base-content transition-colors duration-300">
      <ToastContainer />

      {/* Page Header */}
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-base-300 pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-base-content">
            Master <span className="text-primary">Orders</span>
          </h1>
          <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.4em] mt-4">
            Cleaning Supplies Empire • Admin Gateway
          </p>
        </div>
        <div className="flex items-center gap-3 bg-base-200 px-6 py-3 rounded-2xl border border-base-300 shadow-sm">
          <FaHistory className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-base-content opacity-80">
            Live Feed: {orders.length} Orders
          </span>
        </div>
      </div>

      {/* Orders List Container */}
      {orders.length === 0 ? (
        <div className="text-center py-40 bg-base-200/50 rounded-[3rem] border border-dashed border-base-300">
          <FaBoxOpen className="text-8xl mx-auto mb-6 opacity-20 text-primary" />
          <h2 className="text-2xl font-black opacity-40 uppercase tracking-tighter text-base-content">
            No Requests Found
          </h2>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="group bg-base-200 border border-base-300 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-base-300 bg-base-300 shrink-0">
                  <Image
                    src={
                      order.items?.[0]?.image ||
                      order.items?.[0]?.img ||
                      "/placeholder-image.png"
                    }
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-black uppercase tracking-tight text-base-content truncate max-w-[200px] md:max-w-[300px]">
                    {order.items?.[0]?.title || "Unknown Product"}
                  </h3>
                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-wider text-base-content">
                    {order.userEmail}
                  </p>
                  <p className="text-[9px] font-black text-primary/70 uppercase">
                    ID: {order._id.slice(-8)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right mr-2">
                  <p className="text-2xl font-black text-primary tracking-tighter">
                    ${order.totalAmount}
                  </p>
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                      order.status === "approved"
                        ? "bg-success/20 text-success"
                        : "bg-warning/20 text-warning"
                    }`}
                  >
                    {order.status || "pending"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-circle btn-md bg-base-300 border-none text-base-content hover:bg-primary hover:text-white transition-all shadow-md"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="btn btn-circle btn-md bg-red-100 border-none text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-md"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative bg-base-100 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-base-300 overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-primary p-6 md:p-8 flex justify-between items-center text-white">
              <div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                  Order Intelligence
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                  REF: {selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-all text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Visual */}
                <div className="space-y-4">
                  <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden border border-base-300 bg-base-200">
                    <Image
                      src={
                        selectedOrder.items?.[0]?.image ||
                        selectedOrder.items?.[0]?.img ||
                        "/placeholder-image.png"
                      }
                      alt="Product"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-base-200 p-5 rounded-2xl border border-base-300">
                    <p className="text-[9px] font-black opacity-50 uppercase mb-2 tracking-[0.2em]">
                      Item Details
                    </p>
                    <h4 className="font-black text-base-content uppercase text-sm leading-tight">
                      {selectedOrder.items?.[0]?.title || "N/A"}
                    </h4>
                    <p className="text-[10px] font-bold text-primary mt-1">
                      Brand: {selectedOrder.items?.[0]?.brand || "Original"}
                    </p>
                  </div>
                </div>

                {/* Logistics Details */}
                <div className="space-y-4">
                  <div className="bg-base-200 p-4 rounded-2xl border border-base-300 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FaUserAlt className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black opacity-50 uppercase">
                        Customer
                      </p>
                      <p className="text-xs font-bold truncate">
                        {selectedOrder.userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="bg-base-200 p-4 rounded-2xl border border-base-300 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black opacity-50 uppercase">
                        Timestamp
                      </p>
                      <p className="text-xs font-bold">
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}{" "}
                        at{" "}
                        {new Date(selectedOrder.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-base-300/50 p-6 rounded-3xl mt-6">
                    <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.3em] mb-2">
                      Checkout Value
                    </p>
                    <p className="text-5xl font-black text-primary tracking-tighter">
                      ${selectedOrder.totalAmount}
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 bg-warning/10 text-warning rounded-lg text-[10px] font-black uppercase tracking-widest">
                      Status: {selectedOrder.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-8">
                {selectedOrder.status !== "approved" && (
                  <button
                    onClick={() => handleApproveOrder(selectedOrder._id)}
                    className="btn btn-primary w-full h-16 rounded-2xl font-black uppercase tracking-widest text-white shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all gap-3"
                  >
                    Authorize Release <FaArrowRight />
                  </button>
                )}

                <button
                  onClick={() => handleDeleteOrder(selectedOrder._id)}
                  className="btn btn-ghost w-full h-14 rounded-2xl font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                >
                  <FaTrashAlt /> Delete This Order Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
