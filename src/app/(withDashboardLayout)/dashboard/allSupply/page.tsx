import Container from "@/components/shared/Container";
import { TProduct } from "@/types";
import React from "react";
import {
  FaEdit,
  FaPlus,
  FaBoxOpen,
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import Link from "next/link";
import DeleteButton from "@/components/productDeleteButton/DeleteButton";
import Image from "next/image";
import Pagination from "@/components/shared/Pagination";
import ApproveOrderButton from "@/components/shared/ApproveOrderButton";
// নতুন ইমপোর্ট (অর্ডার অ্যাপ্রুভ করার বাটন ক্লায়েন্ট কম্পোনেন্ট হিসেবে লাগবে)

export const revalidate = 0;

const AllSupply = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const limit = 10;

  let allSupply: TProduct[] = [];
  let allOrders: any[] = []; // অর্ডার রাখার জন্য
  let totalProducts = 0;

  try {
    // ১. প্রোডাক্ট ফেচিং
    const productRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?page=${currentPage}&limit=${limit}`,
      { cache: "no-store" },
    );
    const productResult = await productRes.json();
    if (productResult.success) {
      allSupply = productResult.data || [];
      totalProducts = productResult.total || 0;
    }

    // ২. অর্ডার ফেচিং (অ্যাপ্রুভ করার জন্য)
    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/orders`,
      { cache: "no-store" },
    );
    const orderResult = await orderRes.json();
    if (orderResult.success) {
      allOrders = orderResult.data || [];
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }

  const totalPages = Math.ceil(totalProducts / limit);
  const fallbackImage = "https://via.placeholder.com/150?text=Besa+Luxury";

  return (
    <Container>
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Inventory Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Inventory Management
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
              Page{" "}
              <span className="text-blue-600 font-bold">{currentPage}</span> of{" "}
              {totalPages} — Total {totalProducts} Items
            </p>
          </div>
          <Link href="/dashboard/addProduct">
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 dark:bg-blue-600 px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:opacity-90 active:scale-95 transition-all">
              <FaPlus size={14} /> Add New Product
            </button>
          </Link>
        </div>

        {/* Product Table */}
        <div className="hidden md:block overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 mb-16">
          <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Details
                </th>
                <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Brand
                </th>
                <th className="px-6 py-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Retail
                </th>
                <th className="px-6 py-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Sale Price
                </th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {allSupply.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border dark:border-slate-700 shadow-sm">
                        <Image
                          src={
                            Array.isArray(item.image)
                              ? item.image[0]
                              : item.image || fallbackImage
                          }
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                        {item.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">
                      {item.brand || "Besa Luxury"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-sm text-slate-400 dark:text-slate-500 line-through">
                    ${item.originalPrice}
                  </td>
                  <td className="px-6 py-5 text-center font-black text-blue-600 dark:text-blue-400">
                    ${item.salePrice}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/dashboard/editProduct/${item._id}`}
                        className="text-slate-400 hover:text-blue-600 transition-all p-2 rounded-lg"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <DeleteButton id={item._id} title={item.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Order Management Section (অ্যাডমিন অ্যাপ্রুভ করবে এখানে) --- */}
        <div className="mt-20">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6 flex items-center gap-3">
            <FaCheckCircle className="text-blue-600" /> Pending Order Requests
          </h2>
          <div className="overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-slate-400">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase text-slate-400">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-center text-[10px] font-black uppercase text-slate-400">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center text-[10px] font-black uppercase text-slate-400">
                    Status
                  </th>
                  <th className="px-8 py-4 text-right text-[10px] font-black uppercase text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {allOrders.length > 0 ? (
                  allOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <td className="px-8 py-4 text-xs font-mono font-bold text-blue-600">
                        {order._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                        {order.userEmail}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-black text-slate-900 dark:text-white">
                        ${order.totalAmount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === "approved" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        {order.status !== "approved" && (
                          <ApproveOrderButton orderId={order._id} />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-center text-xs font-black uppercase opacity-20"
                    >
                      No Orders to Manage
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </Container>
  );
};

export default AllSupply;
