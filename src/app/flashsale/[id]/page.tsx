import { TProduct } from "@/types";
import Container from "@/components/shared/Container";
import {
  FaTruck,
  FaShieldAlt,
  FaAward,
  FaChevronRight,
  FaStar,
  FaBolt,
} from "react-icons/fa";
import Link from "next/link";
import FlashSaleDetailCard from "@/components/ui/DetailItem/FlashSaleDetailCard";
import NavbarTwo from "@/components/shared/NavbarTwo";
import Footer from "@/components/shared/Footer";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const DetailFlashSale = async ({ params }: Props) => {
  const { id } = await params;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/flash-sale/${id}`;

  const res = await fetch(apiUrl, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
        <NavbarTwo />
        <main className="flex-grow flex flex-col items-center justify-center space-y-6 py-20">
          <div className="relative">
            <div className="text-[12rem] md:text-[18rem] font-black text-slate-200/50 dark:text-slate-800/30 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                Lost in Space?
              </h1>
            </div>
          </div>
          <Link
            href="/flashsale"
            className="group flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105 transition-all"
          >
            Take Me Home{" "}
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const responseData = await res.json();
  const product: TProduct = responseData.data;

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 selection:bg-blue-500/30">
      <NavbarTwo />

      <main className="flex-grow pb-32 font-sans relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-400/10 blur-[100px] rounded-full animate-pulse delay-700" />
        </div>

        <Container>
          {/* Advanced Breadcrumb */}
          <nav className="relative z-10 py-10 px-4">
            <div className="inline-flex items-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 px-5 py-2.5 rounded-2xl shadow-sm transition-all hover:shadow-md">
              <Link
                href="/"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-bold transition-colors"
              >
                Home
              </Link>
              <FaChevronRight
                size={8}
                className="text-slate-300 dark:text-slate-600"
              />
              <Link
                href="/flashsale"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-bold transition-colors"
              >
                Flash Sale
              </Link>
              <FaChevronRight
                size={8}
                className="text-slate-300 dark:text-slate-600"
              />
              <span className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider truncate max-w-[120px] md:max-w-none italic">
                {product.title}
              </span>
            </div>
          </nav>

          {/* Hero Section Badge */}
          <div className="flex justify-center mb-8 animate-bounce">
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/20">
              <FaBolt /> Limited Time Offer
            </div>
          </div>

          {/* Main Product Section */}
          <div className="relative z-10 px-4 md:px-0 animate-in zoom-in-95 fade-in duration-1000 ease-out">
            <div className="relative">
              <FlashSaleDetailCard item={product} />
              {/* Decorative Corner for Premium Feel */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-blue-600 rounded-tl-3xl opacity-0 md:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Trust Bar with Hover-Glow Effects */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 px-4">
            {trustItems.map((trust, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden flex items-center gap-6 p-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-10px_rgba(37,99,235,0.15)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Animated Background Icon Overlay */}
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.03] dark:opacity-[0.05] group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                  {trust.icon}
                </div>

                <div
                  className={`w-16 h-16 shrink-0 ${trust.colorClass} rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 shadow-xl`}
                >
                  {trust.icon}
                </div>

                <div className="relative z-10">
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-lg leading-tight">
                    {trust.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                    {trust.desc}
                  </p>
                </div>

                {/* Bottom Glow Line Animation */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${trust.gradient}`}
                />
              </div>
            ))}
          </div>

          {/* Quality Rating Section */}
          <div className="mt-20 flex flex-col items-center space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-orange-400 text-xl" />
              ))}
            </div>
            <p className="text-slate-400 dark:text-slate-600 text-xs font-black uppercase tracking-widest">
              Premium Rated Experience
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

// Trust Bar Data with Enhanced Styling & Gradients
const trustItems = [
  {
    icon: <FaTruck />,
    title: "Global Priority",
    desc: "Lightning fast 24h dispatch",
    colorClass: "bg-blue-600 text-white shadow-blue-500/30",
    gradient: "from-blue-600 to-cyan-400",
  },
  {
    icon: <FaShieldAlt />,
    title: "Ironclad Security",
    desc: "Military-grade encryption",
    colorClass: "bg-emerald-600 text-white shadow-emerald-500/30",
    gradient: "from-emerald-600 to-teal-400",
  },
  {
    icon: <FaAward />,
    title: "Nexus Certified",
    desc: "Authenticity guaranteed",
    colorClass: "bg-orange-600 text-white shadow-orange-500/30",
    gradient: "from-orange-600 to-yellow-400",
  },
];

export default DetailFlashSale;
