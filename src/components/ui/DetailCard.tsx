"use client";

import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link"; // For the login redirect
import React, { useState } from "react";
import {
  FaStar,
  FaRegHeart,
  FaShoppingCart,
  FaQuestionCircle,
  FaReply,
  FaLock,
} from "react-icons/fa";

const DetailCard = ({ item }: { item: TProduct }) => {
  const {
    title,
    description,
    image,
    originalPrice,
    salePrice,
    rating,
    brand,
    longDescription,
  } = item;

  // --- Mock Auth State (Replace this with your actual Auth Hook) ---
  // const { user } = useAuth();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  const [quantity, setQuantity] = useState(1);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Sarah Jenkins",
      date: "2 days ago",
      text: "This cleaning supply worked wonders on my kitchen tiles. Does it work on hardwood as well?",
      replies: [
        {
          id: 101,
          user: "Nexus Support",
          date: "1 day ago",
          text: "Great question, Sarah! This formula is pH-balanced and safe for sealed hardwood floors.",
          isAdmin: true,
        },
      ],
    },
  ]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handlePostComment = () => {
    if (!commentText.trim() || !user) return;

    const newComment = {
      id: Date.now(),
      user: user.name,
      date: "Just now",
      text: commentText,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-slate-900">
      {/* Product Section Code Remains Same ... */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-100">
        {/* ... (Your existing Image and Info UI) ... */}
        {/* Left: Image */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[4/5] relative">
            <Image
              src={image}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              alt={title}
            />
          </div>
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{Math.round(((originalPrice - salePrice) / originalPrice) * 100)}%
            OFF
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">
              {brand}
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
              {title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(rating || 5)
                        ? "fill-current"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500 font-medium">
                ({comments.length} Discussions)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-black text-slate-900">
              ${salePrice}
            </span>
            <del className="text-xl text-slate-400">${originalPrice}</del>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 border-l-4 border-blue-500 pl-4 italic">
            {description}
          </p>

          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              SELECT QUANTITY
            </label>
            <div className="flex items-center w-fit border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50">
              <button
                onClick={handleDecrement}
                className="px-5 py-3 hover:bg-white transition-colors text-xl font-bold"
              >
                -
              </button>
              <span className="px-6 py-3 font-bold text-lg border-x-2 border-slate-200 bg-white min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-5 py-3 hover:bg-white transition-colors text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-[0.98]">
              <FaShoppingCart /> Add To Cart — $
              {(salePrice * quantity).toFixed(2)}
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50">
                <FaRegHeart /> Wishlist
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50">
                <FaQuestionCircle /> Ask Expert
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 border-b-4 border-blue-500 w-fit pb-2 mb-8">
          Description
        </h2>
        <div className="bg-slate-50 p-8 rounded-3xl text-slate-700 leading-loose shadow-inner">
          {longDescription || "No detailed description available."}
        </div>
      </div>

      {/* Dynamic Comment Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
          Community Discussions
          <span className="text-sm font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {comments.length} Comments
          </span>
        </h2>

        {/* Existing Comments Mapping ... */}
        <div className="space-y-8">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 flex-shrink-0 flex items-center justify-center font-bold text-slate-500 uppercase">
                  {comment.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-slate-900">
                        {comment.user}
                      </h4>
                      <span className="text-xs text-slate-400">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-slate-600">{comment.text}</p>
                    <button className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800">
                      <FaReply size={12} /> Reply
                    </button>
                  </div>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mt-4 ml-12 flex gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold ${reply.isAdmin ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        {reply.isAdmin ? "Admin" : reply.user.charAt(0)}
                      </div>
                      <div
                        className={`flex-1 p-5 rounded-2xl border ${reply.isAdmin ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100 shadow-sm"}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {reply.user}
                          </h4>
                          <span className="text-xs text-slate-400">
                            {reply.date}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Conditional Comment Input Area */}
          {user ? (
            <div className="mt-12 bg-blue-50 p-8 rounded-3xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <h3 className="font-bold text-slate-900">
                  Posting as {user.name}
                </h3>
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none min-h-[120px] bg-white transition-all"
                placeholder="Share your experience with this product..."
              />
              <button
                onClick={handlePostComment}
                disabled={!commentText.trim()}
                className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
              >
                Post Comment
              </button>
            </div>
          ) : (
            <div className="mt-12 bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4">
                <FaLock className="text-slate-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Join the Discussion
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                You must be logged in to post a comment or reply to this
                product's community discussion.
              </p>
              <Link
                href="/login"
                className="inline-block bg-slate-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg"
              >
                Login to Continue
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DetailCard;
