import { TProduct } from "@/types";
import Container from "@/components/shared/Container";
import { FaTruck, FaShieldAlt, FaAward, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import FlashSaleCard from "@/components/ui/FlashSaleCard";
import FlashSaleDetailCard from "@/components/ui/DetailItem/FlashSaleDetailCard";

interface Props {
  params: {
    id: string;
  };
}

const DetailFlashSale = async ({ params }: Props) => {
  const { id } = params;

  // ব্যাকএন্ড থেকে ডাটা ফেচ করা
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/flash-sale/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="text-6xl text-slate-200 font-black">404</div>
        <h1 className="text-xl font-bold text-slate-500">
          Oops! Product not found.
        </h1>
        <Link
          href="/flashsale"
          className="text-blue-600 font-bold hover:underline"
        >
          Back to Flash Sale
        </Link>
      </div>
    );
  }

  const responseData = await res.json();
  const product: TProduct = responseData.data;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <Container>
        <nav className="py-8 px-4 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <FaChevronRight size={10} />
          <Link
            href="/flashsale"
            className="hover:text-blue-600 transition-colors"
          >
            Flash Sale
          </Link>
          <FaChevronRight size={10} />
          <span className="font-semibold text-slate-900 truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <FlashSaleDetailCard item={product} />
        </div>

        {/* Trust Bar সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4">
          <div className="flex items-center gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FaTruck />
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-tight">
                Fast Delivery
              </h4>
              <p className="text-sm text-slate-500">Ships within 24 hours</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group border-b-4 border-b-green-500/0 hover:border-b-green-500">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-tight">
                Secure Payment
              </h4>
              <p className="text-sm text-slate-500">100% Secure Checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
              <FaAward />
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-tight">
                Premium Quality
              </h4>
              <p className="text-sm text-slate-500">Verified by Nexus.io</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailFlashSale;
