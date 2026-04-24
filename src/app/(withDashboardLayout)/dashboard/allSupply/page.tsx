import Container from "@/components/shared/Container";
import { TProduct } from "@/types";
import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import Link from "next/link";
import DeleteButton from "@/components/productDeleteButton/DeleteButton";

const AllSupply = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });
  const { data: allSupply } = await res.json();

  return (
    <Container>
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Inventory Management
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Manage your premium cleaning supplies, stock, and pricing.
            </p>
          </div>
          <Link href="/dashboard/add-product">
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-xl hover:bg-blue-600 transition-all">
              <FaPlus size={14} /> Add New Product
            </button>
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 rounded-[2rem] bg-white">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Product Details
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Brand
                </th>
                <th className="px-6 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Retail
                </th>
                <th className="px-6 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Sale Price
                </th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {allSupply?.map((item: TProduct) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-50">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        {item.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase text-slate-600">
                      {item.brand}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center text-sm text-slate-400 line-through">
                    ${item.originalPrice}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="text-sm font-black text-blue-600">
                      ${item.salePrice}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/editProduct/${item._id}`}
                        className="text-slate-400 hover:text-blue-600 transition-all p-2 hover:bg-blue-50 rounded-lg"
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

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {allSupply?.map((item: TProduct) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100"
            >
              <div className="flex gap-4 mb-4">
                <img
                  src={item.image}
                  className="w-16 h-16 rounded-2xl object-cover border"
                  alt=""
                />
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-black uppercase text-blue-600 mt-1">
                    {item.brand}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-y border-slate-50 mb-4">
                <div className="text-xs text-slate-400 line-through">
                  ${item.originalPrice}
                </div>
                <div className="text-xl font-black text-slate-900">
                  ${item.salePrice}
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/dashboard/editProduct/${item._id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest"
                >
                  <FaEdit className="text-blue-500" /> Edit
                </Link>
                <div className="flex-1">
                  <DeleteButton id={item._id} title={item.title} />
                  {/* Note: DeleteButton will need minor style adjustments for mobile view if you want it full width */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllSupply;
