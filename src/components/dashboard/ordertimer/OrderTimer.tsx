"use client";

import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

interface OrderTimerProps {
  createdAt: string;
  onExpire: () => void;
}

const OrderTimer = ({ createdAt, onExpire }: OrderTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTime = () => {
      const orderTime = new Date(createdAt).getTime();
      const expirationTime = orderTime + 24 * 60 * 60 * 1000; // ২৪ ঘণ্টা যোগ
      const now = new Date().getTime();
      const difference = expirationTime - now;

      if (difference <= 0) {
        setTimeLeft("Expired");
        onExpire(); // সময় শেষ হলে প্যারেন্টকে জানাবে
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime(); // মাউন্ট হওয়ার সাথে সাথে রান হবে

    return () => clearInterval(timer);
  }, [createdAt, onExpire]);

  return (
    <div className="flex items-center gap-1.5 bg-primaryBlue/10 text-primaryBlue px-3 py-1 rounded-lg border border-primaryBlue/20 shadow-sm">
      <FaClock className="text-[10px] animate-pulse" />
      <span className="text-[10px] font-black uppercase tracking-wider">
        Cancel Ends In: {timeLeft}
      </span>
    </div>
  );
};

export default OrderTimer;
