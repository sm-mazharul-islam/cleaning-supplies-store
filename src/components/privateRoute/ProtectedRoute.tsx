"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "user")[];
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // লোডিং শেষ হওয়ার পরই কেবল রিডাইরেক্ট লজিক কাজ করবে
    if (isMounted && !isLoading) {
      if (!user) {
        // লগইন করার পর যেন আগের পেজেই ফিরে আসতে পারে
        router.push(`/login?redirect=${pathname}`);
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [user, isLoading, router, allowedRoles, pathname, isMounted]);

  // মাউন্ট হওয়া এবং লোডিং শেষ হওয়ার আগে স্পিনার দেখাবে
  if (!isMounted || isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-base-100 gap-4">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 animate-pulse">
          Verifying Access...
        </p>
      </div>
    );
  }

  // ইউজার অথরাইজড হলেই কেবল চিলড্রেন দেখাবে
  const isAuthorized =
    user && (!allowedRoles || allowedRoles.includes(user.role));

  return isAuthorized ? <>{children}</> : null;
}
