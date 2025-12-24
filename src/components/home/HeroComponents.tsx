"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import { smoothEase, ultraSmoothSpring } from "@/lib/animations";

// --- WRAPPER PRZYCISKU (Hover + Tap) ---
export const HeroButtonWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={ultraSmoothSpring}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

// --- LOGIKA STRZAŁKI ---
export const ScrollArrow = () => {
  const [shouldHideArrow, setShouldHideArrow] = useState(false);

  useEffect(() => {
    let scrollCount = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 50) {
        scrollCount++;
        lastScrollY = currentScrollY;
        if (scrollCount >= 3) {
          setShouldHideArrow(true);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = useCallback(() => {
    // Szukamy sekcji o ID "about-heading" (użyte w AboutSection) lub fallback
    const target =
      document.getElementById("about-heading") ||
      document.querySelector("section:nth-of-type(2)");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (shouldHideArrow) return null;

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        onClick={scrollToContent}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 10, 10, 0] }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: smoothEase,
        }}
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-4.5 lg:bottom-8 rounded-full p-2 transition-transform duration-300 md:bottom-12 z-20"
        aria-label="Przewiń w dół do treści"
      >
        <FiArrowDown
          size={36}
          className="text-arylideYellow drop-shadow-lg"
          aria-hidden="true"
        />
      </m.button>
    </LazyMotion>
  );
};
