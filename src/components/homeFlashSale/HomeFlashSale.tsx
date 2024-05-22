import Link from "next/link";
import FlashSaleCard from "../ui/FlashSaleCard";
import { Product } from "@/types";

const HomeFlashSale = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/flash-sale"
  );
  const { data: flashSaleSupplies } = await res.json();
  // console.log(flashSaleSupplies);

  return (
    <div className="mt-[60px]">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold ml-[10px] lg:ml-[170px]">
          Flash Sale
        </h1>
        <Link href="/flashsale">
          <button className="btn btn-neutral lg:mr-[170px] rounded-full text-white mr-[10px] ">
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
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[150px] lg:mr-[150px] mx-auto ">
        {flashSaleSupplies.slice(0, 4).map((item: Product) => (
          <FlashSaleCard key={item._id} item={item}></FlashSaleCard>
        ))}
      </div>
    </div>
  );
};

export default HomeFlashSale;
