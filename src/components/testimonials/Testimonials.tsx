"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Image from "next/image";

interface TReview {
  _id: string;
  userName: string;
  userImage: string;
  comment: string;
  rating: number;
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonials`;
        console.log("Fetching from:", url); // ডিবাগিং এর জন্য

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`); // এখানে আপনার 404 এরর ধরা পড়বে
        }

        const responseData = await res.json();
        setReviews(responseData.data || []);
      } catch (error) {
        console.error("❌ Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  if (loading) {
    return (
      <div className="py-24 text-center">
        <span className="loading loading-dots loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <section className=" bg-base-100 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-start mb-16">
          <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            What Our <span className="text-blue-600">Clients</span> Say
          </h2>
          <div className="w-20  h-1.5 bg-blue-600  mt-6 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {reviews.length > 0 ? (
            <Swiper
              // স্লাইড সংখ্যা অনুযায়ী লুপ কন্ট্রোল (Swiper Loop Warning Fix)
              loop={reviews.length >= 3}
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
                <SwiperSlide key={item._id} className="h-auto">
                  <div className="bg-base-100 border border-base-content/10 p-8 rounded-[2.5rem] shadow-xl shadow-base-content/5 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:bg-base-200 group">
                    <div className="text-blue-500/20 group-hover:text-blue-500 transition-colors duration-500 mb-6">
                      <FaQuoteLeft size={40} />
                    </div>

                    <p className="text-base-content/70 leading-relaxed italic mb-8 flex-grow">
                      {item.comment}
                    </p>

                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < item.rating
                              ? "text-yellow-400"
                              : "text-base-content/10"
                          }
                          size={14}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-base-content/5">
                      <div className="avatar">
                        <div className="relative w-14 h-14 rounded-2xl ring-2 ring-blue-500/20 ring-offset-2 ring-offset-base-100 overflow-hidden">
                          <Image
                            src={
                              item.userImage ||
                              "https://i.ibb.co/5GzXkwq/user.png"
                            }
                            alt={item.userName}
                            fill // fill এর সাথে sizes দেয়া বাধ্যতামূলক (Next.js Image Error Fix)
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-black text-base-content leading-none mb-1">
                          {item.userName}
                        </h4>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                          Verified Client
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-20 bg-base-200 rounded-[2.5rem] border-2 border-dashed border-base-content/10">
              <p className="text-base-content opacity-50 font-bold italic">
                No reviews available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Global CSS for Custom Swiper Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: var(--bc, #94a3b8);
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px !important;
          border-radius: 5px !important;
          opacity: 1 !important;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
