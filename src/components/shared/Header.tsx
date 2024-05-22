"use client";
/* eslint-disable react/jsx-key */
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
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
        " a statement or account giving the characteristics of someone or something ",
      star: 4,
    },
    {
      id: 2,
      name: "Office Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-3.jpg",
      description:
        " a statement or account giving the characteristics of someone or something ",
      star: 4,
    },
    {
      id: 3,
      name: "windows Cleaning",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-2.jpg",
      description:
        " a statement or account giving the characteristics of someone or something ",

      star: 4,
    },
    {
      id: 6,
      name: "Plumbing Service",
      image:
        "https://themes.envytheme.com/rivsy/wp-content/uploads/2022/03/banner-4.jpg",
      description:
        " a statement or account giving the characteristics of someone or something ",
      star: 4,
    },
  ];

  return (
    <div className={styles.banner_container}>
      <Navbar />
      {/* <h1>This is Header</h1> */}
      <h1 className="text-center text-4xl font-bold text-white lg:mt-[60px]">
        {/* Dive into the joy of a spotless space and let our cleaning supplies be
        your trusted companion on the journey to a brighter, more vibrant life. */}
        Elevate your cleaning routine today!
      </h1>
      <p className="text-center text-xl mt-4 text-gray-200  lg:w-[40%] mx-auto">
        Remember, behind every clean space is your dedication and effort,
        turning mundane chores into acts of pride and accomplishment!
      </p>
      <Swiper
        loop={true}
        pagination={{ clickable: false }}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        // onSwiper={setSwiperRef}
        centeredSlides={false}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper max-w-[1100px] max-h-[400px] mx-auto mt-10 lg:mt-20 "
      >
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto ">
          {clientReview.map((item: THeader) => (
            <SwiperSlide className="swiper-slide1">
              <HeaderCard key={item.id} item={item}></HeaderCard>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Header;
