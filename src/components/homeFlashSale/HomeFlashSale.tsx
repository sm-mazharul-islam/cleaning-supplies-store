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
    /* bg-base-100 adapts to the global light/dark theme toggle */
    <section className="py-24 bg-base-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-[0.2em] text-xs">
              <FaBolt className="animate-pulse" />
              Limited Time Offer
            </div>
            {/* text-base-content switches between slate-900 (light) and white (dark) */}
            <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
              Flash <span className="text-blue-600">Sale</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Timer UI: Integrated with semantic colors inside its own component */}
            <div className="hidden lg:flex items-center gap-3 text-base-content opacity-50 font-medium">
              <FlashSaleTimer />
            </div>

            <Link href="/flashsale">
              <button className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 active:scale-95">
                View All
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleSupplies && flashSaleSupplies.length > 0 ? (
            flashSaleSupplies
              .slice(0, 4)
              .map((item: TProduct) => (
                <FlashSaleCard key={item._id} item={item} />
              ))
          ) : (
            <div className="col-span-full py-20 bg-base-200 rounded-[2.5rem] border-2 border-dashed border-base-content/10 flex justify-center items-center">
              <p className="text-base-content opacity-50 font-bold italic">
                No flash sale products available at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Mobile View All Button (Visible only on small screens) */}
        <div className="mt-10 md:hidden">
          <Link href="/flashsale">
            <button className="w-full border-2 border-base-content/10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest text-base-content hover:bg-base-200 transition-all">
              Browse All Sale Items
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFlashSale;
