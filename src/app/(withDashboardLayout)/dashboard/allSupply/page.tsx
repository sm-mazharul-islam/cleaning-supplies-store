import Container from "@/components/shared/Container";
import { TProduct } from "@/types";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllSupply = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    { cache: "no-store" }, // Ensure fresh data
  );
  const { data: allSupply } = await res.json();

  return (
    <Container>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="sm:flex sm:items-center mb-8">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-slate-900">Inventory</h1>
            <p className="mt-2 text-sm text-slate-600">
              A list of all cleaning supplies including brand, pricing, and
              availability.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0">
            <button className="block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
              Add Product
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden shadow-sm border border-slate-200 rounded-xl bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Product Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Brand
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  Retail Price
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sale Price
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {allSupply?.map((item: TProduct) => (
                <tr
                  key={item._id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      {item.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-500 italic line-through">
                    ${item.originalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-blue-600">
                    ${item.salePrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors p-1">
                        <FaEdit size={18} />
                      </button>
                      <button className="text-slate-400 hover:text-red-600 transition-colors p-1">
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {allSupply?.map((item: TProduct) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.brand}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">
                    ${item.salePrice}
                  </p>
                  <p className="text-[10px] text-slate-400 line-through">
                    ${item.originalPrice}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100">
                  <FaEdit className="text-blue-500" /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100">
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllSupply;
