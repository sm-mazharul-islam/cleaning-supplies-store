"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// ১. ইউজার রোল এবং ইন্টারফেস নির্ধারণ
export type UserRole = "admin" | "user";

interface User {
  userName: string;
  role: UserRole;
  pictureUrl?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ২. টোকেন ডিকোড এবং ইউজার স্টেট সেট করার লজিক
  const decodeTokenAndSetUser = useCallback((token: string) => {
    try {
      const decoded = jwtDecode<User & { exp: number }>(token);

      // টোকেন এক্সপায়ার্ড কি না চেক করা
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setUser(null);
        return false;
      }

      setUser(decoded);
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      return false;
    }
  }, []);

  // ৩. মাউন্ট হওয়ার সময় টোকেন চেক করা
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      decodeTokenAndSetUser(token);
    }
    // সামান্য ডিলে দেওয়া হয়েছে যাতে স্টেট প্রোপারলি সিঙ্ক হয়
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [decodeTokenAndSetUser]);

  // ৪. আপডেট করা লগইন ফাংশন (যা সাথে সাথে স্টেট আপডেট করবে)
  const login = useCallback(
    async (token: string) => {
      setIsLoading(true);
      localStorage.setItem("token", token);

      const success = decodeTokenAndSetUser(token);

      if (success) {
        // স্টেট আপডেট হওয়া নিশ্চিত করে রিডাইরেক্ট করা
        setIsLoading(false);
        router.push("/dashboard");

        // নেক্সট জেএস-এর ক্যাশ ক্লিয়ার করার জন্য
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        setIsLoading(false);
        localStorage.removeItem("token");
      }
    },
    [decodeTokenAndSetUser, router],
  );

  // ৫. লগআউট ফাংশন
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoading(false);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ৬. কাস্টম হুক
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
