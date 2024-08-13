import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import FlashSaleCard from "@/components/ui/FlashSaleCard";
import { Product } from "@/types";

import React from "react";

export const metadata = {
  title: "Flash Sale",
};

const FlashSale = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/flash-sale"
  );
  const { data: flashSaleCleaningSupplies } = await res.json();
  // console.log(flashSaleCleaningSupplies);
  // console.log(flashSaleCleaningSupplies);

  return (
    <Container>
      <NavbarTwo />
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[150px] lg:mr-[150px] mx-auto">
        {flashSaleCleaningSupplies.map((item: Product) => (
          <FlashSaleCard key={item._id} item={item}></FlashSaleCard>
        ))}
      </div>
      <Footer />
    </Container>
  );
};

export default FlashSale;
