"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  FaDollarSign,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const AdminStats = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDynamicStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${apiUrl}/api/v1/products/admin-stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (result.success) {
          setData(result);
        } else {
          setError(result.message || "Unauthorized access");
        }
      } catch (err) {
        setError("Failed to connect to the server");
      } finally {
        setLoading(false);
      }
    };
    fetchDynamicStats();
  }, []);

  if (loading)
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm font-bold animate-pulse uppercase tracking-widest">
          Syncing Data...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error shadow-lg max-w-md mx-auto mt-10 text-white font-bold">
        {error}
      </div>
    );

  // মেট্রিক্স কার্ড ডাটা
  const metrics = [
    {
      label: "Total Revenue",
      val: `$${data?.stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <FaDollarSign />,
      color: "text-blue-500",
    },
    {
      label: "Inventory",
      val: data?.stats?.totalProducts || 0,
      icon: <FaBox />,
      color: "text-emerald-500",
    },
    {
      label: "Total Orders",
      val: data?.stats?.totalOrders || 0,
      icon: <FaShoppingCart />,
      color: "text-orange-500",
    },
    {
      label: "Total Users",
      val: data?.stats?.totalUsers || 0, // এবার এটি সঠিকভাবে দেখাবে
      icon: <FaUsers />,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="px-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
          Business <span className="text-blue-600">Analytics</span>
        </h2>
      </div>

      {/* মেট্রিক্স কার্ড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-xl transition-all hover:-translate-y-2"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 ${item.color}`}
              >
                {item.icon}
              </div>
              <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                +5.4%
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                {item.val}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* চার্ট সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">
            Order Trends
          </h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.charts?.salesOverTime}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f033"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: "#3b82f611" }}
                  contentStyle={{ borderRadius: "16px", border: "none" }}
                />
                <Bar
                  dataKey="orders"
                  fill="#3b82f6"
                  radius={[10, 10, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">
            Brand Share
          </h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.charts?.brandData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data?.charts?.brandData?.map((_e: any, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "10px", fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
