"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "swiper/css/effect-coverflow"; // নতুন ইফেক্ট
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import HeaderCard from "../ui/HeaderCard";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import { THeader } from "@/types";
import { motion } from "framer-motion"; // অ্যানিমেশনের জন্য

const Header = () => {
  const clientReview = [
    {
      id: 1,
      name: "House Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-1.jpg",
      description:
        "Experience a spotless home with our expert residential cleaning services.",
      star: 5,
    },
    {
      id: 2,
      name: "Office Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-3.jpg",
      description:
        "Boost productivity with a clean, organized, and fresh workplace environment.",
      star: 5,
    },
    {
      id: 3,
      name: "Windows Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-2.jpg",
      description:
        "Crystal clear views with our professional streak-free window cleaning.",
      star: 5,
    },
    {
      id: 6,
      name: "Plumbing Service",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-4.jpg",
      description:
        "Reliable plumbing solutions to keep your home running smoothly.",
      star: 5,
    },
  ];

  return (
    <div
      className={`${styles.banner_container} relative min-h-screen overflow-hidden bg-[#020617]`}
    >
      {/* Animated Background Orbs for Luxury Feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-transparent z-0"></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section with Framer Motion */}
        <div className="text-center px-4 mt-20 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full backdrop-blur-md">
              ✨ Premium Cleaning Services
            </span>
            <h1 className="text-5xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] max-w-5xl mx-auto drop-shadow-2xl">
              Elevate Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 ">
                Environment
              </span>{" "}
              Today
            </h1>
            {/* <p className="mt-8 text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              Where science meets serenity. Experience the ultimate{" "}
              <br className="hidden md:block" />
              standard in professional cleanliness and home care.
            </p> */}

            <div className="mt-5 flex flex-wrap justify-center gap-6">
              <button className="group relative px-5 py-4 bg-blue-600 text-white font-black rounded-full overflow-hidden transition-all shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95">
                <span className="relative z-10 uppercase tracking-widest text-sm">
                  Explore Services
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full backdrop-blur-xl border border-white/10 transition-all hover:border-white/30 uppercase tracking-widest text-sm">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Gorgeous Swiper Section with Coverflow Effect */}
        <div className="mt-5 lg:mt-5 pb-24">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1200}
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            className="max-w-[1400px] !px-10"
          >
            {clientReview.map((item: THeader) => (
              <SwiperSlide
                key={item.id}
                className="!w-[300px] md:!w-[450px] transition-all duration-700"
              >
                {({ isActive }) => (
                  <div
                    className={`transform transition-all duration-700 ${isActive ? "scale-110 opacity-100" : "scale-90 opacity-40 blur-[2px]"}`}
                  >
                    <div className="relative group">
                      {/* Glow Effect behind active card */}
                      {isActive && (
                        <div className="absolute inset-0 bg-blue-500/20 rounded-[2.5rem] blur-2xl -z-10 animate-pulse"></div>
                      )}
                      <HeaderCard item={item} />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020617] to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default Header;
