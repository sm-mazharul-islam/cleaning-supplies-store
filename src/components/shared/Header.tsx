// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import {
//   Autoplay,
//   Pagination,
//   Navigation,
//   EffectCoverflow,
// } from "swiper/modules";
// import HeaderCard from "../ui/HeaderCard";
// import styles from "./Header.module.css";
// import Navbar from "./Navbar";
// import { THeader } from "@/types";
// import { motion } from "framer-motion";

// const Header = () => {
//   const clientReview = [
//     {
//       id: 1,
//       name: "House Cleaning",
//       image:
//         "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-1.jpg",
//       description: "Expert residential care.",
//       star: 5,
//     },
//     {
//       id: 2,
//       name: "Office Cleaning",
//       image:
//         "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-3.jpg",
//       description: "Productive workspace.",
//       star: 5,
//     },
//     {
//       id: 3,
//       name: "Windows Cleaning",
//       image:
//         "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-2.jpg",
//       description: "Crystal clear views.",
//       star: 5,
//     },
//     {
//       id: 6,
//       name: "Plumbing Service",
//       image:
//         "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-4.jpg",
//       description: "Reliable solutions.",
//       star: 5,
//     },
//   ];

//   return (
//     <div className="relative h-[65vh] lg:h-[70vh] w-full overflow-hidden bg-main transition-colors duration-500">
//       {/* 1. Interactive Animated Background Orbs */}
//       <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-brand-primary/10 blur-[100px] animate-pulse"></div>
//       <div
//         className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-brand-accent/10 blur-[100px] animate-pulse"
//         style={{ animationDelay: "2s" }}
//       ></div>

//       {/* Background with Professional Dark Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
//         style={{
//           backgroundImage: `url('https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-1.jpg')`,
//         }}
//       >
//         <div className="absolute inset-0 bg-main/70 backdrop-blur-[2px]"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-main via-transparent to-main/30"></div>
//       </div>

//       <div className="relative z-10 flex flex-col h-full">
//         <Navbar />

//         <div className="flex-grow flex flex-col justify-center items-center">
//           {/* 2. Clear Heading & Visual Hierarchy */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center px-6 mb-6 md:mb-10"
//           >
//             <span className="inline-block px-4 py-1 mb-3 text-[10px] font-black tracking-widest text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 rounded-full">
//               ✨ Premium Excellence
//             </span>
//             <h1 className="text-4xl md:text-6xl font-black text-main-content tracking-tighter leading-[1.1] drop-shadow-2xl">
//               Elevate Your{" "}
//               <span className="text-brand-primary">Environment</span>
//             </h1>
//             <p className="mt-3 text-sm md:text-lg text-main-muted max-w-xl mx-auto font-medium">
//               Professional cleaning services tailored for your modern lifestyle.
//             </p>

//             {/* 3. Strong Call-To-Action (CTA) */}
//             <div className="mt-8 flex justify-center gap-4">
//               <button className="px-8 py-3.5 bg-brand-primary text-white font-black rounded-btn hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20 uppercase text-[11px] tracking-widest">
//                 Explore Services
//               </button>
//               <button className="px-8 py-3.5 bg-main-border/30 text-main-content font-bold rounded-btn border border-main-border backdrop-blur-md hover:bg-main-border/50 transition-all uppercase text-[11px] tracking-widest">
//                 Watch Demo
//               </button>
//             </div>
//           </motion.div>

//           {/* 4. Symmetrical & Gorgeous Carousel */}
//           <div className="w-full relative px-0">
//             <Swiper
//               effect={"coverflow"}
//               grabCursor={true}
//               centeredSlides={true}
//               loop={true}
//               slidesPerView={1.5} // স্ক্রিনের দুই পাশে স্লাইড ফিক্সড রাখার জন্য
//               breakpoints={{
//                 640: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//                 1440: { slidesPerView: 4 },
//               }}
//               coverflowEffect={{
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 150,
//                 modifier: 2,
//                 slideShadows: false,
//               }}
//               autoplay={{ delay: 3500, disableOnInteraction: false }}
//               speed={1200}
//               modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
//               className="!overflow-visible"
//             >
//               {clientReview.map((item: THeader) => (
//                 <SwiperSlide
//                   key={item.id}
//                   className="transition-all duration-700"
//                 >
//                   {({ isActive }) => (
//                     <div
//                       className={`transform transition-all duration-700 py-10 ${
//                         isActive
//                           ? "scale-110 opacity-100 z-50"
//                           : "scale-90 opacity-40 blur-[2px] grayscale"
//                       }`}
//                     >
//                       <div className="relative px-4">
//                         {isActive && (
//                           <div className="absolute inset-0 bg-brand-primary/25 rounded-card blur-[40px] -z-10 animate-pulse"></div>
//                         )}
//                         <HeaderCard item={item} />
//                       </div>
//                     </div>
//                   )}
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>

//       {/* Decorative Bottom Fade */}
//       <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-main to-transparent z-20 pointer-events-none"></div>
//     </div>
//   );
// };

// export default Header;
//!
"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "./Navbar";
import { FaCheckCircle, FaAward, FaUsers } from "react-icons/fa";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Elevate Your Environment",
      subtitle: "Premium Excellence",
      description:
        "Experience a spotless home with our expert residential cleaning services designed for modern living.",
      image: "/images/b1.jpg", // public/images/b1.jpg
      stats: { clients: "12k+", projects: "25k+", rating: "4.9" },
    },
    {
      id: 2,
      title: "Crystal Clear Spaces",
      subtitle: "Professional Care",
      description:
        "Boost productivity with a clean, organized, and fresh workplace environment that inspires growth.",
      image: "/images/b2.jpg", // public/images/b2.jpg
      stats: { clients: "18k+", projects: "30k+", rating: "5.0" },
    },
    {
      id: 3,
      title: "Pristine Window Solutions",
      subtitle: "Expert Precision",
      description:
        "Enjoy crystal clear views with our specialized cleaning techniques for every high-rise building.",
      image: "/images/b3.jpg", // public/images/b3.jpg
      stats: { clients: "15k+", projects: "20k+", rating: "4.8" },
    },
  ];

  // TypeScript error solved by explicitly defining types using 'Variants'
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Using cubic-bezier for better performance and type safety
      },
    },
  };

  return (
    <div className="relative h-[65vh] lg:h-[70vh] w-full overflow-hidden bg-main transition-colors duration-500">
      <Navbar />

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background with Cinematic Zoom Effect using public/images */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: activeIndex === index ? "scale(1.15)" : "scale(1)",
              }}
            >
              <div className="absolute inset-0 bg-main/70 backdrop-blur-[1.5px]"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-main via-main/20 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 h-full flex items-center px-6 mt-12 md:mt-0 lg:mt-0 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-12">
                {/* Left Side: Typography & CTA */}
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={slide.id}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{
                        opacity: 0,
                        x: 50,
                        transition: { duration: 0.5 },
                      }}
                    >
                      <motion.span
                        variants={itemVariants}
                        className="inline-block px-4 py-1.5 mb-5 text-[10px] font-black tracking-[0.2em] text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 rounded-full backdrop-blur-md"
                      >
                        ✨ {slide.subtitle}
                      </motion.span>
                      <motion.h1
                        variants={itemVariants}
                        className="text-3xl md:text-7xl font-black text-main-content tracking-tighter leading-[1] mb-2 md:mb-6 drop-shadow-2xl"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        variants={itemVariants}
                        className="text-sm md:text-xl text-main-muted max-w-xl mb-0 md:mb-10 font-medium leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-5"
                      >
                        <button className="px-10 py-4 bg-brand-primary text-white font-black rounded-btn hover:scale-105 transition-all shadow-2xl shadow-brand-primary/30 uppercase text-xs tracking-widest active:scale-95">
                          Get Started
                        </button>
                        <button className="px-10 py-4 bg-white/5 text-main-content font-bold rounded-btn border border-main-border backdrop-blur-xl hover:bg-white/10 transition-all uppercase text-xs tracking-widest active:scale-95">
                          Our Works
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Right Side: Interesting Interactive Elements */}
                <div className="hidden lg:flex justify-end mt-20">
                  <div className="relative w-full max-w-md">
                    {/* Floating Statistics Grid */}
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div
                          key={`stats-${slide.id}`}
                          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            delay: 0.4,
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                          }}
                          className="grid grid-cols-2 gap-4"
                        >
                          <motion.div
                            whileHover={{
                              y: -8,
                              transition: { duration: 0.3 },
                            }}
                            className="bg-white/5 backdrop-blur-2xl p-6 rounded-card border border-white/10 shadow-2xl cursor-default"
                          >
                            <FaUsers className="text-brand-primary text-3xl mb-4" />
                            <p className="text-3xl font-black text-main-content">
                              {slide.stats.clients}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-main-muted tracking-widest">
                              Global Clients
                            </p>
                          </motion.div>
                          <motion.div
                            whileHover={{
                              y: -8,
                              transition: { duration: 0.3 },
                            }}
                            className="bg-brand-primary/10 backdrop-blur-2xl p-6 rounded-card border border-brand-primary/20 shadow-2xl mt-8 cursor-default"
                          >
                            <FaAward className="text-brand-primary text-3xl mb-4" />
                            <p className="text-3xl font-black text-main-content">
                              {slide.stats.rating}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-main-muted tracking-widest">
                              User Rating
                            </p>
                          </motion.div>
                          <motion.div
                            whileHover={{
                              y: -8,
                              transition: { duration: 0.3 },
                            }}
                            className="bg-white/5 backdrop-blur-2xl p-6 rounded-card border border-white/10 shadow-2xl -mt-4 cursor-default"
                          >
                            <FaCheckCircle className="text-green-500 text-3xl mb-4" />
                            <p className="text-3xl font-black text-main-content">
                              {slide.stats.projects}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-main-muted tracking-widest">
                              Projects Completed
                            </p>
                          </motion.div>

                          {/* Interactive Premium Tag */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-accent p-6 rounded-card shadow-2xl mt-4 animate-pulse relative overflow-hidden group"
                          >
                            <span className="text-white font-black text-xl tracking-[0.3em] uppercase z-10">
                              Premium
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Animated Decorative Ring */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-primary/10 rounded-full animate-spin-slow"></div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Aesthetic Fades */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-main to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default Header;
