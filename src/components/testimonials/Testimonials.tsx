"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Image from "next/image";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Owner",
      image: "https://i.pravatar.cc/150?u=sarah",
      review:
        "The cleaning service was absolutely flawless. They arrived on time and left my house sparkling. I've never seen my windows so clear!",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Office Manager",
      image: "https://i.pravatar.cc/150?u=marcus",
      review:
        "Professional, efficient, and thorough. Our office environment has improved significantly since we started using their commercial services.",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Interior Designer",
      image: "https://i.pravatar.cc/150?u=elena",
      review:
        "As a designer, I'm very picky about details. This team exceeded my expectations. Their attention to detail is truly remarkable.",
      rating: 4,
    },
    {
      id: 4,
      name: "David Smith",
      role: "Real Estate Agent",
      image: "https://i.pravatar.cc/150?u=david",
      review:
        "I recommend them to all my clients. They make houses look brand new, which definitely helps in closing deals faster!",
      rating: 5,
    },
  ];

  return (
    <section className="py-24  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            What Our <span className="text-blue-600">Clients</span> Say
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Swiper
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="pb-16 !px-4"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 group">
                  {/* Quote Icon */}
                  <div className="text-blue-100 group-hover:text-blue-500 transition-colors duration-500 mb-6">
                    <FaQuoteLeft size={40} />
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 leading-relaxed italic mb-8 flex-grow">
                    {item.review}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < item.rating
                            ? "text-yellow-400"
                            : "text-slate-200"
                        }
                        size={14}
                      />
                    ))}
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-2xl ring-2 ring-blue-500/10 ring-offset-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          height={40}
                          width={35}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 leading-none mb-1">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Swiper Styles for Gorgeous Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px !important;
          border-radius: 5px !important;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
