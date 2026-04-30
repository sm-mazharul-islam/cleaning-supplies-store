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
  // ডাটা ফেচিং
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flash-sale`, {
    next: { revalidate: 60 }, // পারফরম্যান্সের জন্য ১ মিনিট ক্যাশ
  });

  const { data: flashSaleCleaningSupplies } = await res.json();

  return (
    // bg-slate-50 (Light) এবং dark:bg-slate-950 (Dark) থিম সাপোর্ট
    <div className="flex flex-col min-h-screen  transition-colors duration-500">
      <NavbarTwo />

      <main className="flex-grow py-16">
        <Container>
          <div className="mb-12 px-4 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Flash <span className="text-blue-600">Sale</span>
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
              Grab your premium cleaning supplies at a discounted price.
            </p>
          </div>

          {/* গ্রিড লেআউট: রেসপনসিভ মার্জিন এবং গ্যাপ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
            {flashSaleCleaningSupplies?.map((item: TProduct) => (
              <FlashSaleCard key={item._id} item={item} />
            ))}
          </div>

          {/* এম্পটি স্টেট (ডাটা না থাকলে): থিম ফ্রেন্ডলি ডিজাইন */}
          {(!flashSaleCleaningSupplies ||
            flashSaleCleaningSupplies.length === 0) && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-20 h-20 mb-4 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                <span className="text-3xl opacity-50">📦</span>
              </div>
              <p className="text-xl font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                No flash sale available
              </p>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default FlashSale;
