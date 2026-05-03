"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  FaShoppingCart,
  FaWallet,
  FaCommentDots,
  FaClock,
  FaBoxOpen,
  FaHistory,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

interface UserToken {
  email: string;
  userName: string;
}

export default function UserStats() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // ১. লগইন করা ইউজারের ইমেইল টোকেন থেকে বের করা
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: UserToken = jwtDecode(token);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Token decoding failed", error);
      }
    }
  }, []);

  // ২. ডাইনামিক ইমেইল দিয়ে ডাটা ফেচ করা
  useEffect(() => {
    if (!userEmail) return;

    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/user-stats/${userEmail}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const result = await res.json();
        if (result.success) {
          setData(result);
        }
      } catch (error) {
        toast.error("Error fetching your statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  const chartData = [
    { name: "Total Orders", value: data?.stats?.totalOrders || 0 },
    { name: "Pending", value: data?.stats?.pendingOrders || 0 },
    { name: "Activity (Comments)", value: data?.stats?.totalComments || 0 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 text-base-content transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* --- হেডার সেকশন --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase text-base-content">
            Personal <span className="text-primary">Insights</span>
          </h1>
          <p className="text-sm opacity-70">
            Tracking performance for {userEmail}
          </p>
        </div>
        {data?.activity?.lastActivity && (
          <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full border border-base-300 shadow-sm">
            <FaClock className="text-primary" />
            <span className="text-xs font-bold opacity-70">
              Active Since:{" "}
              {new Date(data?.activity?.lastActivity).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* --- মেট্রিক্স কার্ডস (Mobile Optimized) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Expenditure",
            val: `$${data?.stats?.totalSpent || 0}`,
            icon: <FaWallet />,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: "Orders Placed",
            val: data?.stats?.totalOrders || 0,
            icon: <FaShoppingCart />,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Pending Orders",
            val: data?.stats?.pendingOrders || 0,
            icon: <FaBoxOpen />,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
          },
          {
            label: "Total Comments",
            val: data?.stats?.totalComments || 0,
            icon: <FaCommentDots />,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-xl border border-base-300 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="card-body p-6 flex-row items-center gap-4">
              <div
                className={`p-4 rounded-2xl ${item.bg} ${item.color} text-2xl shadow-inner`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-50 tracking-[0.2em]">
                  {item.label}
                </p>
                <h3 className="text-2xl font-black text-base-content">
                  {item.val}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- পাই চার্ট ভিজ্যুয়ালাইজেশন --- */}
        <div className="lg:col-span-5 card bg-base-100 shadow-xl border border-base-300 p-8">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-base-content">
            <span className="w-1.5 h-6 bg-primary rounded-full block"></span>
            Engagement Breakdown
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={10}
                  dataKey="value"
                >
                  {chartData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--b1))",
                    borderRadius: "16px",
                    border: "1px solid hsl(var(--b3))",
                    color: "hsl(var(--bc))",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- রিসেন্ট অর্ডার হিস্ট্রি --- */}
        <div className="lg:col-span-7 card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-200/30">
            <h3 className="text-sm font-black text-base-content uppercase tracking-widest flex items-center gap-2">
              <FaHistory className="text-primary" /> Recent History
            </h3>
            <span className="badge badge-primary badge-outline text-[10px] font-bold uppercase">
              Last 3 Orders
            </span>
          </div>
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="table w-full hidden sm:table">
              <thead className="bg-base-200/50 text-base-content opacity-70">
                <tr className="uppercase text-[10px] font-black tracking-widest">
                  <th className="py-4">Order ID</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th className="text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-base-content">
                {data?.recentOrders?.map((order: any) => (
                  <tr
                    key={order._id}
                    className="hover:bg-base-200/50 transition-colors border-base-200"
                  >
                    <td className="font-mono text-xs opacity-60">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="font-black text-primary">
                      ${order.totalAmount}
                    </td>
                    <td>
                      <div
                        className={`badge badge-sm font-bold uppercase py-3 ${
                          order.status === "pending"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td className="text-right text-[10px] opacity-60">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View for Orders */}
            <div className="block sm:hidden p-4 space-y-4">
              {data?.recentOrders?.map((order: any) => (
                <div
                  key={order._id}
                  className="bg-base-200/50 p-4 rounded-xl space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="font-mono text-xs opacity-60">
                      #{order._id.slice(-8)}
                    </span>
                    <span className="font-black text-primary">
                      ${order.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      className={`badge badge-xs font-bold uppercase ${
                        order.status === "pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {order.status}
                    </div>
                    <span className="text-[10px] opacity-60">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {data?.recentOrders?.length === 0 && (
              <div className="text-center py-20">
                <FaBoxOpen className="mx-auto text-5xl opacity-10 mb-4" />
                <p className="opacity-40 font-bold uppercase text-xs tracking-widest">
                  No Recent Activity Recorded
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
