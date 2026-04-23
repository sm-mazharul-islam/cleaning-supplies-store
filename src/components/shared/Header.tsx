"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import HeaderCard from "../ui/HeaderCard";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import { THeader } from "@/types";

const Header = () => {
  const clientReview = [
    {
      id: 1,
      name: "House Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-1.jpg",
      description:
        "A statement or account giving the characteristics of someone or something.",
      star: 4,
    },
    {
      id: 2,
      name: "Office Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-3.jpg",
      description:
        "A statement or account giving the characteristics of someone or something.",
      star: 4,
    },
    {
      id: 3,
      name: "Windows Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-2.jpg",
      description:
        "A statement or account giving the characteristics of someone or something.",
      star: 4,
    },
    {
      id: 6,
      name: "Plumbing Service",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-4.jpg",
      description:
        "A statement or account giving the characteristics of someone or something.",
      star: 4,
    },
  ];

  return (
    <div
      className={`${styles.banner_container} relative min-h-screen overflow-hidden bg-slate-900`}
    >
      {/* Dynamic Background Overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-0"></div>

      <div className="relative z-10">
        <Navbar />

        {/* Text Content with Glassmorphism feel */}
        <div className="text-center px-4 mt-36 lg:mt-24 ">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-2xl ">
            Elevate Your <span className="text-blue-400">Cleaning Routine</span>{" "}
            Today
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Turn mundane chores into acts of pride. Behind every spotless space
            is your dedication, creating a brighter, more vibrant life.
          </p>

          <div className="mt-5 flex justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/30 active:scale-95">
              Explore Services
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md border border-white/20 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Swiper Section */}
        <div className="mt-0 lg:mt-24 pb-20">
          <Swiper
            loop={true}
            speed={1000} // Smoother transition
            grabCursor={true}
            centeredSlides={true} // Focus on the middle card
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="max-w-[1300px] !px-10"
          >
            {clientReview.map((item: THeader) => (
              <SwiperSlide
                key={item.id}
                className="transition-all duration-500 py-10"
              >
                {/* Scale effect for the active slide (usually handled via CSS .swiper-slide-active) */}
                <div className="transform transition-transform duration-500 hover:scale-[1.02]">
                  <HeaderCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Header;
