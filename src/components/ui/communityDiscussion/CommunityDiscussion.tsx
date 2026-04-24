"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { FaReply, FaLock, FaTimes, FaPaperPlane } from "react-icons/fa";

const CommunityDiscussion = ({ productId }: { productId: string }) => {
  const currentPath = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({ userName: decoded.userName, pictureUrl: decoded.pictureUrl });
      } catch (e) {
        setUser(null);
      }
    }

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/${productId}`,
        );
        const result = await res.json();
        if (result.success) setComments(result.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [productId]);

  const handlePostComment = async () => {
    if (!commentText.trim() || !user) return;
    const payload = {
      userName: user.userName,
      pictureUrl: user.pictureUrl,
      comment: commentText,
      productId,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const result = await res.json();
    if (result.success) {
      setComments((prev) => [result.data, ...prev]);
      setCommentText("");
    }
  };

  const handlePostReply = async (commentId: string) => {
    if (!replyText.trim() || !user) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/reply/${commentId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.userName,
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

  // Hydration Fix: Render nothing until mounted
  if (!isMounted) return null;

  return (
    <section
      className="max-w-4xl mx-auto my-20 px-4"
      id="discussion-root"
      translate="no" // গুগল ট্রান্সলেট যেন ডম চেঞ্জ না করে
    >
      <h2 className="text-3xl font-black mb-10 text-slate-900">
        Community Discussions
      </h2>

      {/* Main Comment Input */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-12">
        {user ? (
          <>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-6 rounded-2xl border-2 border-slate-50 outline-none bg-slate-50 focus:border-blue-500"
              placeholder="Share your experience..."
            />
            <button
              onClick={handlePostComment}
              className="mt-4 bg-slate-900 text-white px-8 py-3 rounded-xl flex items-center gap-2 uppercase text-[10px] font-bold"
            >
              <FaPaperPlane /> Post Comment
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <Link
              href={`/login?redirect=${currentPath}`}
              className="text-blue-600 font-bold underline"
            >
              Sign in to join the discussion
            </Link>
          </div>
        )}
      </div>

      {/* Comments Area */}
      <div className="space-y-8">
        {comments.map((c) => (
          <div key={c._id} className="comment-card">
            <div className="flex gap-4 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <img
                src={
                  c.pictureUrl ||
                  `https://ui-avatars.com/api/?name=${c.userName}`
                }
                className="w-12 h-12 rounded-xl"
                alt="avatar"
              />
              <div className="flex-1">
                <h4 className="font-bold text-sm uppercase">{c.userName}</h4>
                <p className="text-slate-600 text-sm">{c.comment}</p>

                {user && (
                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === c._id ? null : c._id)
                    }
                    className="mt-3 text-[10px] font-bold text-blue-600 flex items-center gap-1 uppercase"
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

                {/* --- Static Wrapper to prevent insertBefore error --- */}
                <div className="reply-container-fixed mt-4">
                  {replyingTo === c._id && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-blue-200 mb-4">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 rounded-lg border-none text-sm outline-none"
                        placeholder="Write a reply..."
                        autoFocus
                      />
                      <button
                        onClick={() => handlePostReply(c._id)}
                        className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-[10px] font-bold ml-auto block"
                      >
                        Post Reply
                      </button>
                    </div>
                  )}

                  {/* Render Replies List */}
                  <div className="replies-list space-y-3">
                    {(c.replies || []).map((r: any, idx: number) => (
                      <div
                        key={`reply-${c._id}-${idx}`}
                        className="flex gap-3 bg-slate-50/50 p-3 rounded-xl ml-4"
                      >
                        <img
                          src={
                            r.pictureUrl ||
                            `https://ui-avatars.com/api/?name=${r.userName}`
                          }
                          className="w-8 h-8 rounded-lg"
                          alt="reply"
                        />
                        <div>
                          <h5 className="text-[9px] font-bold uppercase">
                            {r.userName}
                          </h5>
                          <p className="text-xs text-slate-600">{r.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityDiscussion;
