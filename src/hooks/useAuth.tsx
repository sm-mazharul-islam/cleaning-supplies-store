"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  userName: string;
  email: string;
  pictureUrl: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // টোকেন এক্সপায়ার হয়েছে কিনা চেক করুন
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser({
            userName: decoded.userName,
            email: decoded.email,
            pictureUrl: decoded.pictureUrl,
          });
        }
      } catch (error) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  return { user, loading };
};
