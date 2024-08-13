import Container from "@/components/shared/Container";
import NavbarTwo from "@/components/shared/NavbarTwo";
import { Product, TProduct } from "@/types";
import Link from "next/link";
import React from "react";
import FlashSaleCard from "../ui/FlashSaleCard";
import ProductCard from "../ui/ProductsCard";

const HomeProducts = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/products"
  );
  const { data: homeProducts } = await res.json();

  return (
    <div>
      {/* <div className="lg:px-[150px]">
        <h1 className="text-4xl"></h1>
      </div> */}
      <div className="lg:flex lg:justify-between mt-[100px]">
        <div className="m-4 lg:m-0">
          <h1 className="lg:ml-[130px] text-4xl font-bold ml-[10px]  ">
            Most Popular Products
          </h1>
          <p className="lg:ml-[130px]  lg:w-[50%] ml-[10px] lg:text-justify">
            Protect your home from harmful germs and bacteria with GermGuard
            Disinfectant Spray. This powerful disinfectant kills 99.9% of
            viruses and bacteria on contact, ensuring a hygienic environment.
          </p>
        </div>
        <Link
          href="/products"
          className="lg:flex lg:justify-between m-6 lg:m-0"
        >
          <button className="btn  btn-neutral lg:mr-[230px] rounded-full text-white pr-[10px] ">
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
          {homeProducts.slice(0, 8).map((item: TProduct) => (
            <ProductCard key={item._id} item={item}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
