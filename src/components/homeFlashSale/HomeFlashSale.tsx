import Link from "next/link";
import FlashSaleCard from "../ui/FlashSaleCard";
import { TProduct } from "@/types";
import { FaArrowRight, FaBolt } from "react-icons/fa";
import FlashSaleTimer from "./FlashSaleTimer";

const HomeFlashSale = async () => {
  let flashSaleSupplies: TProduct[] = [];
  let errorOccurred = false;

  try {
    // ব্যাকএন্ড এপিআই কল করা
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/flash-sale`,
      {
        next: { revalidate: 3600 }, // ১ ঘণ্টার জন্য ডাটা ক্যাশ হবে
      },
    );

    // রেসপন্স চেক করা (Unexpected token '<' এরর হ্যান্ডলিং)
    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status}`);
      errorOccurred = true;
    } else {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const responseData = await res.json();

        // ব্যাকএন্ড থেকে { success: true, data: [...] } ফরমেটে ডাটা আসবে
        flashSaleSupplies = responseData.data || [];
      } else {
        console.error("Backend sent HTML instead of JSON. Check your routes!");
        errorOccurred = true;
      }
    }
  } catch (error) {
    console.error("Network or server is down:", error);
    errorOccurred = true;
  }

  return (
    <section className=" bg-base-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-[0.2em] text-xs">
              <FaBolt className="animate-pulse" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
              Flash <span className="text-blue-600">Sale</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
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
          {flashSaleSupplies.length > 0 ? (
            flashSaleSupplies
              .slice(0, 4) // শুধু প্রথম ৪টি প্রোডাক্ট রেন্ডার হবে
              .map((item: TProduct) => (
                <FlashSaleCard key={item._id} item={item} />
              ))
          ) : (
            <div className="col-span-full py-20 bg-base-200 rounded-[2.5rem] border-2 border-dashed border-base-content/10 flex flex-col justify-center items-center">
              <p className="text-base-content opacity-50 font-bold italic text-center">
                {errorOccurred
                  ? "Oops! Could not connect to the server. Please ensure the backend is running."
                  : "No flash sale products available right now."}
              </p>
              {errorOccurred && (
                <p className="mt-2 text-xs text-blue-500 font-mono">
                  Check: {process.env.NEXT_PUBLIC_API_URL}
                  /api/v1/products/flash-sale
                </p>
              )}
            </div>
          )}
        </div>

        {/* Mobile View All Button */}
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
