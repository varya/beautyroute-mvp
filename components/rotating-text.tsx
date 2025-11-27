"use client";

import { useState, useEffect } from "react";

const phrases = [
  "within your Budget",
  "on your Schedule",
  "ready for your Big Day",
];

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <span
        className={`inline-block transition-all duration-300 ${
          isAnimating
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        {phrases[currentIndex]}
      </span>
    </span>
  );
}

