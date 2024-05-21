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
      name: "Ava",
      image:
        "https://media.istockphoto.com/id/1135381120/photo/portrait-of-a-young-woman-outdoors-smiling.jpg?s=612x612&w=0&k=20&c=T5dukPD1r-o0BFqeqlIap7xzw07icucetwKaEC2Ms5M=",
      description:
        " a statement or account giving the characteristics of someone or something ",
      star: 4,
    },
    {
      id: 2,
      name: "Mila",
      image:
        "https://media.istockphoto.com/id/1961059691/photo/testimonial-portrait-of-a-mature-mexican-woman.webp?b=1&s=170667a&w=0&k=20&c=zvJlGaVQoQL7FZ1UhXRIsOuil6gyB6bUVorAjHpHj6E=",
      description:
        " a statement or account giving the characteristics of someone or something ",
      star: 4,
    },
    {
      id: 3,
      name: "Ava",
      image:
        "https://media.istockphoto.com/id/1135381120/photo/portrait-of-a-young-woman-outdoors-smiling.jpg?s=612x612&w=0&k=20&c=T5dukPD1r-o0BFqeqlIap7xzw07icucetwKaEC2Ms5M=",
      description:
        " a statement or account giving the characteristics of someone or something ",

      star: 4,
    },
    {
      id: 6,
      name: "Mila",
      image:
        "https://media.istockphoto.com/id/1961059691/photo/testimonial-portrait-of-a-mature-mexican-woman.webp?b=1&s=170667a&w=0&k=20&c=zvJlGaVQoQL7FZ1UhXRIsOuil6gyB6bUVorAjHpHj6E=",
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
        Crafting Comfort, Redefining Spaces. <br /> Your Home, Your Signature
        Style!
      </h1>
      <p className="text-center text-xl mt-4 text-gray-200  lg:w-[40%] mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam tenetur
        exercitationem adipisci ipsam ipsum neque deleniti enim voluptas
        voluptate officia assumenda, eius ab, ullam labore? Perferendis at
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
