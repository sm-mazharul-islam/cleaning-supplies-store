"use client";

import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  FaStar,
  FaShoppingCart,
  FaReply,
  FaLock,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

const DetailCard = ({ item }: { item: TProduct }) => {
  const currentPath = usePathname();

  // --- States ---
  const [user, setUser] = useState<{
    userName: string;
    pictureUrl: string;
  } | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // ১. Auth Check & Fetch Comments
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // আপনার ব্যাকএন্ডে পাঠানো 'userName' এবং 'pictureUrl' এখানে রিসিভ হচ্ছে
        setUser({
          userName: decoded.userName,
          pictureUrl: decoded.pictureUrl,
        });
      } catch (e) {
        setUser(null);
      }
    }
    setIsAuthLoading(false);

    const fetchComments = async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/comments/${item._id}`,
      );
      const result = await res.json();
      if (result.success) setComments(result.data);
    };
    fetchComments();
  }, [item._id]);

  // ২. নতুন কমেন্ট পোস্ট
  const handlePostComment = async () => {
    if (!commentText.trim() || !user) return;

    const payload = {
      username: user.userName, // এটি ব্যাকএন্ডে userName হিসেবে সেভ হবে
      pictureUrl: user.pictureUrl,
      comment: commentText,
      productId: item._id,
    };

    const res = await fetch(`http://localhost:5000/api/v1/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      setComments([result.data, ...comments]);
      setCommentText("");
    }
  };

  // ৩. রিপ্লাই পোস্ট
  const handlePostReply = async (commentId: string) => {
    if (!replyText.trim() || !user) return;

    const res = await fetch(
      `http://localhost:5000/api/v1/comments/reply/${commentId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.userName,
          pictureUrl: user.pictureUrl,
          comment: replyText,
        }),
      },
    );

    const result = await res.json();
    if (result.success) {
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, replies: [...(c.replies || []), result.data] }
            : c,
        ),
      );
      setReplyText("");
      setReplyingTo(null);
    }
  };

  if (isAuthLoading)
    return (
      <div className="p-20 text-center font-bold">Checking session...</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-slate-900">
      {/* Product Card Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 mb-16">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 border">
          <Image
            src={item.image}
            fill
            className="object-cover"
            alt={item.title}
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-black mb-4">{item.title}</h1>
          <div className="text-5xl font-black mb-10 text-blue-600">
            ${item.salePrice}
          </div>
          <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-blue-600 transition-all uppercase text-xs tracking-widest">
            <FaShoppingCart className="inline mr-2" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Discussion Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-10 tracking-tight">
          Community Discussions
        </h2>

        {/* Comment Box for Logged In User */}
        {user ? (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-500 shadow-sm">
                <Image
                  src={
                    user.pictureUrl ||
                    `https://ui-avatars.com/api/?name=${user.userName}`
                  }
                  fill
                  alt="user"
                />
              </div>
              <p className="font-black text-slate-900 text-sm uppercase leading-none tracking-wider">
                Posting as {user.userName}
              </p>
            </div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-6 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 outline-none bg-slate-50/50 min-h-[150px] transition-all"
              placeholder="What's your experience with this supply?"
            />
            <button
              onClick={handlePostComment}
              className="mt-4 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
            >
              <FaPaperPlane /> Post Comment
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 p-12 rounded-[2.5rem] text-center text-white mb-10">
            <FaLock className="mx-auto mb-4 text-blue-500 text-2xl" />
            <p className="mb-6 uppercase text-xs font-bold tracking-widest text-slate-400">
              Join the conversation
            </p>
            <Link
              href={`/login?redirect=${currentPath}`}
              className="inline-block bg-white text-slate-900 px-10 py-4 rounded-xl font-black text-[10px] uppercase shadow-xl hover:bg-blue-500 hover:text-white transition-all"
            >
              Sign In to Comment
            </Link>
          </div>
        )}

        {/* List of Comments */}
        <div className="space-y-10">
          {comments.map((c: any) => (
            <div key={c._id} className="animate-in fade-in duration-500">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border relative flex-shrink-0">
                  <Image
                    src={
                      c.pictureUrl ||
                      `https://ui-avatars.com/api/?name=${c.userName}`
                    }
                    fill
                    alt="avatar"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-black text-[10px] uppercase text-slate-900">
                        {c.userName}
                      </h4>
                      <span className="text-[9px] text-slate-300 font-bold uppercase">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {c.comment}
                    </p>
                    {user && (
                      <button
                        onClick={() =>
                          setReplyingTo(replyingTo === c._id ? null : c._id)
                        }
                        className="mt-4 text-[10px] font-black text-blue-600 uppercase flex items-center gap-2 hover:text-blue-800"
                      >
                        {replyingTo === c._id ? (
                          <>
                            <FaTimes /> Cancel
                          </>
                        ) : (
                          <>
                            <FaReply /> Reply
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Reply Input Box */}
                  {replyingTo === c._id && (
                    <div className="mt-4 ml-6 bg-blue-50/30 p-5 rounded-[1.5rem] border-2 border-dashed border-blue-100 animate-in slide-in-from-top-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-4 rounded-xl border-none text-sm bg-white"
                        placeholder={`Reply to ${c.userName}...`}
                      />
                      <button
                        onClick={() => handlePostReply(c._id)}
                        className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase ml-auto block"
                      >
                        Post Reply
                      </button>
                    </div>
                  )}

                  {/* Render Replies */}
                  {c.replies?.map((r: any, idx: number) => (
                    <div key={idx} className="mt-4 ml-10 flex gap-4">
                      <div className="w-10 h-10 rounded-xl relative overflow-hidden border flex-shrink-0">
                        <Image
                          src={
                            r.pictureUrl ||
                            `https://ui-avatars.com/api/?name=${r.userName}`
                          }
                          fill
                          alt="reply-avatar"
                        />
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                        <h5 className="text-[10px] font-black uppercase text-slate-900 mb-1">
                          {r.userName}
                        </h5>
                        <p className="text-xs text-slate-600">{r.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DetailCard;
