"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * withAuth HOC
 * @param WrappedComponent - The page component you want to protect
 * @param allowedRoles - Optional array of roles (e.g., ["admin"])
 */
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: ("admin" | "user")[],
) => {
  return function ProtectedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // If auth is done loading and there's no user, go to login
      if (!isLoading) {
        if (!user) {
          router.push("/login");
        }
        // If roles are specified and user doesn't match, go to unauthorized
        else if (allowedRoles && !allowedRoles.includes(user.role)) {
          router.push("/unauthorized");
        }
      }
    }, [user, isLoading, router]);

    // Show a gorgeous loading spinner while checking auth
    if (isLoading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Verifying Access...
          </p>
        </div>
      );
    }

    // If not authorized, don't render anything (prevents UI flicker)
    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
      return null;
    }

    // All checks passed! Render the original page
    return <WrappedComponent {...props} />;
  };
};
