"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { FaReply, FaLock, FaTimes, FaPaperPlane } from "react-icons/fa";

const CommunityDiscussion = ({ productId }: { productId: string }) => {
  const currentPath = usePathname();
  const [user, setUser] = useState<{
    userName: string;
    pictureUrl: string;
  } | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Auth Check
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({ userName: decoded.userName, pictureUrl: decoded.pictureUrl });
      } catch (e) {
        setUser(null);
      }
    }

    // 2. Fetch Comments
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/comments/${productId}`,
        );
        const result = await res.json();
        if (result.success) setComments(result.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [productId]);

  const handlePostComment = async () => {
    if (!commentText.trim() || !user) return;
    const payload = {
      username: user.userName,
      pictureUrl: user.pictureUrl,
      comment: commentText,
      productId: productId,
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

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse">
        Loading discussion...
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-black mb-10 tracking-tight">
        Community Discussions
      </h2>

      {/* Input Box */}
      {user ? (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-500">
              <img
                src={
                  user.pictureUrl ||
                  `https://ui-avatars.com/api/?name=${user.userName}`
                }
                alt="user"
              />
            </div>
            <p className="font-black text-slate-900 text-sm uppercase tracking-wider">
              Posting as {user.userName}
            </p>
          </div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-6 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 outline-none bg-slate-50/50 min-h-[120px] transition-all"
            placeholder="Share your experience..."
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
          <Link
            href={`/login?redirect=${currentPath}`}
            className="inline-block bg-white text-slate-900 px-10 py-4 rounded-xl font-black text-[10px] uppercase shadow-xl hover:bg-blue-500 hover:text-white transition-all"
          >
            Sign In to Comment
          </Link>
        </div>
      )}

      {/* List */}
      <div className="space-y-10">
        {comments.map((c) => (
          <div key={c._id} className="animate-in fade-in duration-500">
            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border relative flex-shrink-0">
                <img
                  src={
                    c.pictureUrl ||
                    `https://ui-avatars.com/api/?name=${c.userName}`
                  }
                  alt="avatar"
                />
              </div>
              <div className="flex-1">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-black text-[10px] uppercase text-slate-900">
                      {c.userName}
                    </h4>
                    <span className="text-[9px] text-slate-300 font-bold">
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
                      className="mt-4 text-[10px] font-black text-blue-600 uppercase flex items-center gap-2"
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

                {/* Reply Form */}
                {replyingTo === c._id && (
                  <div className="mt-4 ml-6 bg-blue-50/30 p-5 rounded-[1.5rem] border-2 border-dashed border-blue-100">
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

                {/* Replies List */}
                {c.replies?.map((r: any, idx: number) => (
                  <div key={idx} className="mt-4 ml-10 flex gap-4">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border flex-shrink-0">
                      <img
                        src={
                          r.pictureUrl ||
                          `https://ui-avatars.com/api/?name=${r.userName}`
                        }
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
  );
};

export default CommunityDiscussion;
