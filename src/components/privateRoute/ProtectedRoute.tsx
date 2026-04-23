"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "user")[]; // Optional: restrict to specific roles
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // 1. If not logged in, go to login
      if (!user) {
        router.push("/login");
      }
      // 2. If role is not allowed, go to unauthorized
      else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [user, isLoading, router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  // Only show the content if authorized
  return user ? <>{children}</> : null;
}
