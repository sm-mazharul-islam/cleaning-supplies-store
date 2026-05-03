import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle, FaArrowRight } from "react-icons/fa";

const FlashSaleCard = ({ item }: { item: TProduct }) => {
  const { _id, image, title, salePrice, originalPrice } = item;

  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 m-2">
      {/* Clickable Image Section */}
      <Link href={`/flashsale/${_id}`}>
        <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-[4/5] bg-slate-100 dark:bg-slate-800">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-500 text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-lg uppercase italic z-10">
            -{discount}% OFF
          </div>

          <div className="absolute inset-0 bg-slate-900/30 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
            <span className="bg-white dark:bg-blue-600 text-slate-900 dark:text-white px-4 py-2 md:px-6 md:py-2.5 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-2xl translate-y-6 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
              View Details <FaArrowRight className="text-[10px]" />
            </span>
          </div>
        </div>
      </Link>

      {/* Product Content Section */}
      <div className="mt-4 md:mt-5 px-2 md:px-3 pb-2 md:pb-3">
        <p className="text-[8px] md:text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-1 opacity-80">
          Limited Edition
        </p>

        <h3
          className="text-base md:text-lg font-extrabold text-slate-800 dark:text-slate-100 truncate mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          title={title}
        >
          {title}
        </h3>

        <div className="flex items-center justify-between mt-3 md:mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 line-through font-bold">
              ${originalPrice}
            </span>
            <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              ${salePrice}
            </span>
          </div>

          <button
            className="bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-inner border border-transparent"
            title="Add to Cart"
          >
            <FaPlusCircle size={20} className="md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleCard;
