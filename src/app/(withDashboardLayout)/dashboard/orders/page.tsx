"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTrashAlt,
  FaDownload,
  FaInfoCircle,
  FaClock,
  FaTimes,
  FaCommentDots,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadOrderSummary } from "@/utils/generatePDF";
import OrderTimer from "@/components/dashboard/ordertimer/OrderTimer";

/**
 * User Dashboard - Order History with Admin Response Modal
 */
export default function DashboardOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded?.email) {
          setUserEmail(decoded.email);
        }
      } catch (err) {
        console.error("Token decoding failed", err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMyOrders = async () => {
    if (!userEmail) return;
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/orders/user/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();
      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      toast.error("Failed to sync your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [userEmail]);

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/orders/${orderId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();

      if (result.success) {
        toast.success("Order cancelled successfully.");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      } else {
        toast.error(result.message || "Cancellation failed.");
      }
    } catch (error) {
      toast.error("Error connecting to the server.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primaryBlue"></span>
        <p className="ml-4 text-[10px] font-black uppercase tracking-widest opacity-40">
          Loading Records...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans min-h-screen bg-base-100 text-base-content">
      <ToastContainer />

      {/* Page Header with Fixed Space */}
      <div className="mb-16 border-b border-base-300 pb-10">
        <h1 className="text-5xl md:text-6xl font-black text-base-content tracking-tighter uppercase leading-none">
          Order <span className="text-primaryBlue">History</span>
        </h1>
        <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em] mt-6">
          Manage your cleaning supply requests • Secure User Gateway
        </p>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-32 bg-base-200/50 rounded-[3rem] border border-dashed border-base-300">
          <FaBoxOpen className="text-7xl mx-auto mb-6 opacity-10 text-primaryBlue" />
          <h2 className="text-2xl font-black opacity-30 uppercase tracking-tighter">
            No Records Found
          </h2>
        </div>
      ) : (
        <div className="grid gap-10">
          {orders.map((order: any) => {
            const orderDate = new Date(order.createdAt).getTime();
            const now = new Date().getTime();
            const isWithinGracePeriod = now - orderDate < 24 * 60 * 60 * 1000;

            return (
              <div
                key={order._id}
                className="group relative bg-base-100 border border-base-300 rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl hover:border-primaryBlue/30 transition-all duration-500 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative w-44 h-44 rounded-[2.5rem] overflow-hidden bg-base-200 border border-base-300 shrink-0 shadow-inner">
                  <Image
                    src={order.items[0]?.image || "/placeholder.png"}
                    alt="Product"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Details Section */}
                <div className="flex-grow text-center md:text-left space-y-5 w-full">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span
                      className={`text-[10px] font-black uppercase flex items-center gap-1 px-4 py-1.5 rounded-full border ${
                        order.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }`}
                    >
                      {order.status === "approved" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaClock />
                      )}{" "}
                      {order.status}
                    </span>

                    {isWithinGracePeriod && (
                      <OrderTimer
                        createdAt={order.createdAt}
                        onExpire={fetchMyOrders}
                      />
                    )}
                  </div>

                  <div>
                    <h4 className=" font-black text-base-content uppercase tracking-tighter leading-tight truncate max-w-lg">
                      {order.items[0]?.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                    <p className="text-[10px] font-black text-primaryBlue uppercase tracking-[0.2em]">
                      {order.items[0]?.brand || "Original Quality"}
                    </p>

                    {/* --- Response Button: শুধুমাত্র adminMessage থাকলে দেখাবে --- */}
                    {order.adminMessage && (
                      <button
                        onClick={() => setActiveMessage(order.adminMessage)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase bg-primaryBlue text-white px-4 py-2 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all shadow-lg animate-pulse"
                      >
                        <FaCommentDots /> Admin Response
                      </button>
                    )}
                  </div>
                </div>

                {/* Financials & Actions */}
                <div className="flex flex-col items-center md:items-end gap-6 shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-base-300 pt-8 md:pt-0 md:pl-12">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-2">
                      Order Value
                    </p>
                    <p className="text-5xl font-black text-primaryBlue tracking-tighter">
                      ${order.totalAmount}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => downloadOrderSummary(order)}
                      className="btn btn-ghost bg-base-200 hover:bg-primaryBlue hover:text-white rounded-[1.2rem] gap-2 text-[10px] font-black uppercase transition-all h-14 px-8"
                    >
                      <FaDownload /> Summary
                    </button>

                    {isWithinGracePeriod ? (
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="btn btn-square bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-[1.2rem] transition-all h-14 w-14 shadow-sm"
                      >
                        <FaTrashAlt />
                      </button>
                    ) : (
                      <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-8 h-14 flex items-center rounded-[1.2rem] uppercase tracking-widest border border-emerald-500/20">
                        Verified
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- Admin Message Modal --- */}
      {activeMessage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-base-100 w-full max-w-lg rounded-[3rem] shadow-2xl border border-base-300 overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-primaryBlue p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <FaInfoCircle className="text-2xl" />
                <h2 className="text-xl font-black uppercase tracking-tighter">
                  Admin Transmission
                </h2>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-all"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-12 text-center">
              <p className="text-[10px] font-black text-primaryBlue uppercase tracking-[0.4em] mb-6">
                Official Feedback
              </p>
              <div className="bg-base-200/50 p-8 rounded-[2rem] border border-base-300">
                <p className="text-lg font-bold italic text-base-content leading-relaxed">
                  {activeMessage}
                </p>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="btn btn-primaryBlue w-full mt-10 h-16 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl hover:shadow-primaryBlue/30 transition-all"
              >
                Close Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
