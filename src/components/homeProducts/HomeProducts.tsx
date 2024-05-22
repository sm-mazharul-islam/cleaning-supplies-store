import Container from "@/components/shared/Container";
import NavbarTwo from "@/components/shared/NavbarTwo";
import { Product } from "@/types";
import Link from "next/link";
import React from "react";
import FlashSaleCard from "../ui/FlashSaleCard";
import ProductCard from "../ui/ProductsCard";

const HomeProducts = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/flash-sale"
  );
  const { data: homeProducts } = await res.json();

  return (
    <div>
      {/* <div className="lg:px-[150px]">
        <h1 className="text-4xl"></h1>
      </div> */}
      <div className="flex justify-between mt-[100px]">
        <div>
          <h1 className="lg:ml-[170px] text-4xl font-bold ml-[10px]  ">
            Most Popular Products
          </h1>
          <p className="lg:ml-[170px]  lg:w-[50%] ml-[10px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit animi
            sit similique dicta reiciendis deleniti. Molestias recusandae
            consequuntur porro non.
          </p>
        </div>
        <Link href="/products" className="flex justify-between">
          <button className="btn  btn-neutral lg:mr-[170px] rounded-full text-white mr-[10px] ">
            View All
            <svg
              className="w-[30px]"
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
      <div>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[100px] lg:mr-[150px]  mx-auto">
          {homeProducts.slice(0, 8).map((item: Product) => (
            <ProductCard key={item.id} item={item}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
