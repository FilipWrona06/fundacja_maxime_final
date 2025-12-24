"use client";

import {
  domAnimation,
  LazyMotion,
  m,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface HeroParallaxProps {
  videoSlot: ReactNode;
  contentSlot: ReactNode;
  arrowSlot: ReactNode;
  posterUrl?: string; // Przekazujemy poster, by uniknąć mrugania
}

export const HeroParallax = ({
  videoSlot,
  contentSlot,
  arrowSlot,
}: HeroParallaxProps) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Logika paralaksy
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.5],
    [1, 0.5, 0],
  );
  const contentY = useTransform(smoothProgress, [0, 1], [0, 150]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={containerRef}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20"
        aria-labelledby="hero-heading"
      >
        {/* WARSTWA WIDEO (Paralaksa) */}
        <m.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 -z-20 h-full w-full"
        >
          {videoSlot}
        </m.div>

        {/* Overlay statyczny (CSS) */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-raisinBlack/40 via-raisinBlack/70 to-raisinBlack backdrop-blur-[1px]" />

        {/* WARSTWA TREŚCI (Paralaksa + Fade Out) */}
        <m.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="container relative z-10 mx-auto px-6 text-center lg:pt-24"
        >
          {contentSlot}
        </m.div>

        {/* STRZAŁKA */}
        {arrowSlot}
      </section>
    </LazyMotion>
  );
};
