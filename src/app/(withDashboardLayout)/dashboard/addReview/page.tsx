"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddReview = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("🔒 Please login to add a review", {
        theme: "colored",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment,
            rating: Number(rating),
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("✨ Gorgeous! Your review has been added.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        setComment("");
        setRating(5);
      } else {
        toast.warn(data.message || "Failed to add review");
      }
    } catch (error) {
      toast.error("🚀 Server error! Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      {/* ToastContainer এক জায়গায় থাকলেই হয়, সাধারণত App.tsx এ রাখা ভালো */}
      <ToastContainer />

      <div className="w-full max-w-lg bg-[#0f172a]/80 backdrop-blur-xl border border-slate-700 p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        <h2 className="text-4xl font-extrabold text-white mb-2 text-center tracking-tight">
          Client <span className="text-blue-500">Feedback</span>
        </h2>
        <p className="text-slate-400 text-center mb-8 font-medium">
          How was your experience with Besa Luxury?
        </p>

        <form onSubmit={handleAddReview} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-3 ml-1">
              Select Rating
            </label>
            <div className="flex gap-2">
              {[5, 4, 3, 2, 1].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`flex-1 py-3 rounded-xl border transition-all duration-300 font-bold ${
                    rating === num
                      ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {num} ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-3 ml-1">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about the car and our service..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-800/50 text-white border border-slate-700 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-blue-500/20 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "SENDING DATA..." : "SUBMIT GORGEOUS REVIEW"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
