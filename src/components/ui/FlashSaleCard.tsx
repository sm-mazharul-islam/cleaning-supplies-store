import { TProduct } from "@/types"; // Consistency with previous types
import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

const FlashSaleCard = ({ item }: { item: TProduct }) => {
  const { _id, image, title, salePrice, originalPrice } = item;

  // Calculate discount percentage dynamically
  const discount = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100,
  );

  return (
    <div className="group relative bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 m-4">
      <Link href={`/flashsale/${_id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Dynamic Discount Badge */}
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{discount}% OFF
          </div>

          {/* Quick View Overlay (Shows on Hover) */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </span>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="mt-4 px-2 pb-2">
        <h3
          className="text-lg font-bold text-slate-800 truncate mb-1"
          title={title}
        >
          {title}
        </h3>

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 line-through font-medium">
              ${originalPrice}
            </span>
            <span className="text-xl font-black text-blue-600">
              ${salePrice}
            </span>
          </div>

          {/* Add to Cart Icon Button */}
          <button
            className="text-slate-300 hover:text-blue-600 transition-colors duration-200 p-1"
            title="Add to Cart"
          >
            <FaPlusCircle size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleCard;
