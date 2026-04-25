import Link from "next/link";
import FlashSaleCard from "../ui/FlashSaleCard";
import { TProduct } from "@/types";
import { FaArrowRight, FaBolt } from "react-icons/fa";
import FlashSaleTimer from "./FlashSaleTimer";

const HomeFlashSale = async () => {
  // Fetching data from your backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flash-sale`, {
    next: { revalidate: 3600 }, // Cache for 1 hour for performance
  });
  const { data: flashSaleSupplies } = await res.json();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm">
              <FaBolt className="animate-pulse" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Flash Sale
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Optional Countdown UI */}
            <div className="hidden lg:flex items-center gap-3 text-slate-400 font-medium">
              <FlashSaleTimer />
            </div>

            <Link href="/flashsale">
              <button className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30">
                View All
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
          {flashSaleSupplies && flashSaleSupplies.length > 0 ? (
            flashSaleSupplies
              .slice(0, 4)
              .map((item: TProduct) => (
                <FlashSaleCard key={item._id} item={item} />
              ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">
              No flash sale products available at the moment.
            </p>
          )}
        </div>

        {/* Mobile View All Button (Visible only on small screens) */}
        <div className="mt-8 md:hidden">
          <Link href="/flash-sale">
            <button className="w-full border-2 border-slate-200 py-4 rounded-2xl font-bold text-slate-700">
              Browse All Sale Items
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFlashSale;
