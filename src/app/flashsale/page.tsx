import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import FlashSaleCard from "@/components/ui/FlashSaleCard";
import { TProduct } from "@/types"; // TProduct ইমপোর্ট করুন
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      <NavbarTwo />

      <main className="flex-grow py-12">
        <Container>
          {/* হেডার সেকশন */}
          <div className="mb-10 px-4">
            <h1 className="text-4xl font-black text-slate-900">Flash Sale</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[150px] lg:mr-[150px] mx-auto gap-6">
            {flashSaleCleaningSupplies.map((item: TProduct) => (
              <FlashSaleCard key={item._id} item={item} />
            ))}
          </div>

          {/* যদি ডাটা না থাকে */}
          {flashSaleCleaningSupplies.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              no flash sale available
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default FlashSale;
