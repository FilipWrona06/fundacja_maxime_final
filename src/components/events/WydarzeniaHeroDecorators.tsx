"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { FiMusic } from "react-icons/fi";
import { durations, elegantEase } from "@/lib/animations";

export const HeroBackgroundAnimator = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: durations.ultra, ease: elegantEase }}
          className="absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-arylideYellow/8 blur-[140px]"
        />
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: durations.ultra,
            delay: 0.3,
            ease: elegantEase,
          }}
          className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-oxfordBlue/15 blur-[160px]"
        />
        {/* Animated radial glow */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-radial-gradient from-arylideYellow/5 via-transparent to-transparent"
        />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
      </div>
    </LazyMotion>
  );
};

export const FloatingMusicIcon = () => (
  <LazyMotion features={domAnimation}>
    <m.div
      initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
      animate={{ opacity: 1, rotate: 0, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: durations.ultra, delay: 0.6, ease: elegantEase },
        rotate: { duration: durations.ultra, delay: 0.6, ease: elegantEase },
        scale: { duration: durations.ultra, delay: 0.6, ease: elegantEase },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 },
      }}
      className="absolute -right-8 -top-12 -z-10 hidden text-white/4 lg:block mix-blend-overlay pointer-events-none"
    >
      <FiMusic size={250} />
    </m.div>
  </LazyMotion>
);

export const ScrollIndicator = () => (
  <LazyMotion features={domAnimation}>
    <div className="group flex flex-col items-center gap-3 opacity-40 transition-opacity duration-500 hover:opacity-100">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white transition-colors duration-500 group-hover:text-arylideYellow">
        Scrolluj w dół
      </span>
      <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white/20 p-2 backdrop-blur-sm transition-all duration-500 group-hover:border-arylideYellow/30 group-hover:bg-arylideYellow/5">
        <m.div
          animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: elegantEase }}
          className="h-2 w-1 rounded-full bg-linear-to-b from-arylideYellow to-arylideYellow/50 shadow-lg shadow-arylideYellow/30"
        />
      </div>
    </div>
  </LazyMotion>
);
