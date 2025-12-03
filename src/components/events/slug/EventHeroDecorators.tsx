"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { FiMusic } from "react-icons/fi";
import { durations, elegantEase } from "@/lib/animations";

// 1. Pływająca Nuta
export const FloatingMusicIcon = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{
          opacity: [0, 0.1, 0.1],
          rotate: 0,
          scale: 1,
          y: [0, -15, 0],
        }}
        transition={{
          opacity: { duration: durations.ultra, delay: 0.5, ease: elegantEase },
          rotate: { duration: durations.ultra, delay: 0.5, ease: elegantEase },
          scale: { duration: durations.ultra, delay: 0.5, ease: elegantEase },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
        }}
        className="pointer-events-none absolute -left-20 -top-24 -z-10 hidden text-arylideYellow/8 mix-blend-overlay md:block"
      >
        <FiMusic size={200} />
      </m.div>
    </LazyMotion>
  );
};

// 2. Pasek Postępu
export const HeroProgressBar = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          duration: durations.ultra,
          delay: 0.8,
          ease: elegantEase,
        }}
        className="relative mt-10 h-1 w-32 overflow-hidden rounded-full"
        style={{ originX: 0 }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-arylideYellow via-arylideYellow to-arylideYellow/60" />

        {/* Shimmer effect */}
        <m.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
        />
      </m.div>
    </LazyMotion>
  );
};
