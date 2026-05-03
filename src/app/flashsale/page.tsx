import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import FlashSaleCard from "@/components/ui/FlashSaleCard";
import { TProduct } from "@/types";
import React from "react";

export const metadata = {
  title: "Flash Sale | Nexus.io",
};

const FlashSale = async () => {
  // ডাটা ফেচিং - ISR (Incremental Static Regeneration) ব্যবহার করা হয়েছে
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/flash-sale`,
    {
      next: { revalidate: 60 },
    },
  );

  const responseData = await res.json();
  const flashSaleProducts = responseData.data || [];

  return (
    <div className="flex flex-col min-h-screen  transition-colors duration-500">
      <NavbarTwo />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          {/* Header Section */}
          <div className="mb-10 md:mb-12 px-4 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Flash <span className="text-blue-600">Sale</span>
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
              Grab your premium car rental deals at a discounted price.
            </p>
          </div>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {flashSaleProducts.length > 0 &&
              flashSaleProducts.map((item: TProduct) => (
                <FlashSaleCard key={item._id} item={item} />
              ))}
          </div>

          {/* Empty State */}
          {flashSaleProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-inner">
                <span className="text-4xl opacity-50 grayscale">🚗</span>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.3em]">
                  No flash sale available
                </p>
                <p className="text-sm text-slate-300 dark:text-slate-800 font-bold mt-1">
                  Stay tuned for upcoming luxury deals!
                </p>
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default FlashSale;
