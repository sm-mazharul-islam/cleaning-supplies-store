import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const ProductCard = ({ item }: { item: TProduct }) => {
  const { image, title, description, salePrice, originalPrice, _id } = item;

  // Calculate discount percentage dynamically if needed,
  // or keep your static -13% logic
  const discount = originalPrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 13;

  return (
    <div className="group relative bg-white rounded-[2rem] p-3 border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden flex flex-col h-full ">
      {/* Image Container with Zoom Effect */}
      <div className="relative overflow-hidden rounded-[1.8rem] h-[280px]">
        <Image
          src={image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={500}
          height={500}
          alt={title}
        />

        {/* Discount Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase">
            -{discount}%
          </span>
        </div>

        {/* Quick Add Overlay Icon */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
            <FaPlus />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 px-2 pb-2 flex-grow flex flex-col">
        <h1 className="text-lg font-black text-slate-900 leading-tight mb-1">
          {title}
        </h1>

        {/* 1-Line Description (Reveals on hover or stays subtle) */}
        <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-3 transition-colors group-hover:text-slate-800">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-blue-600">
              ${salePrice}
            </span>
            {originalPrice && (
              <del className="text-xs text-slate-400 font-bold">
                ${originalPrice}
              </del>
            )}
          </div>

          {/* Action Area: Animated "See More" */}
          <div className="relative overflow-hidden h-10 flex items-center">
            <Link
              href={`/products/${_id}`}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all transform translate-y-10 group-hover:translate-y-0 duration-500"
            >
              See More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};

export default ProductCard;
