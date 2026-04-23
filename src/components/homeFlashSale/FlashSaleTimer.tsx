"use client";

import React, { useState, useEffect } from "react";

const FlashSaleTimer = () => {
  // Set the target time (e.g., 5 hours from now)
  // For a real app, you might pull this from your database/backend
  const [timeLeft, setTimeLeft] = useState({
    hours: 720,
    minutes: 12,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              clearInterval(timer); // Timer reached zero
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Helper to format numbers to 2 digits (e.g., 4 -> "04")
  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="hidden lg:flex items-center gap-3 text-slate-400 font-medium">
      <span>Ending in:</span>
      <div className="flex gap-2 text-slate-900 font-bold items-center">
        <span className="bg-slate-100 px-2 py-1 rounded w-10 text-center">
          {formatTime(timeLeft.hours)}
        </span>
        :
        <span className="bg-slate-100 px-2 py-1 rounded w-10 text-center">
          {formatTime(timeLeft.minutes)}
        </span>
        :
        <span className="bg-slate-100 px-2 py-1 rounded w-10 text-center">
          {formatTime(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
};

export default FlashSaleTimer;
