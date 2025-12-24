"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function useCountdown(targetDate: Date): TimeLeft {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true,
      };
    }

    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();

    let months = (targetYear - nowYear) * 12 + (targetMonth - nowMonth);
    
    if (now.getDate() > targetDate.getDate()) {
      months--;
    }

    const futureDate = new Date(now);
    futureDate.setMonth(futureDate.getMonth() + months);
    
    const remainingDifference = targetDate.getTime() - futureDate.getTime();
    
    const days = Math.floor(remainingDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingDifference % (1000 * 60)) / 1000);

    return {
      months: Math.max(0, months),
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
