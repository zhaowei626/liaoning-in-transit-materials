"use client";

import { useEffect, useState } from "react";

const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

const formatClock = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${weekdays[date.getDay()]} ${hours}:${minutes}:${seconds}`;
};

export function useClock() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    setClock(formatClock(new Date()));
    
    const timer = window.setInterval(() => {
      setClock(formatClock(new Date()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return clock;
}
