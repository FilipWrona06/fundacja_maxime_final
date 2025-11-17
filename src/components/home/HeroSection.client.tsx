"use client";

import {
  domAnimation,
  LazyMotion,
  m,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { FiArrowDown } from "react-icons/fi";
import {
  ultraSmoothSpring,
  premiumEase,
  smoothEase,
} from "@/lib/animations";
import type { HomePageData } from "@/lib/types";

const HeroButton = ({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) => {
  const primaryClasses =
    "bg-arylideYellow text-raisinBlack shadow-lg hover:shadow-arylideYellow/30";
  const secondaryClasses =
    "border-2 border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-arylideYellow/50 hover:bg-white/10";

  return (
    <m.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={ultraSmoothSpring}
    >
      <Link
        href={href}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold overflow-hidden transition-all duration-300 sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 ${
          variant === "primary" ? primaryClasses : secondaryClasses
        }`}
      >
        <span className="relative z-10">{children}</span>
      </Link>
    </m.div>
  );
};

export const HeroSectionClient = ({
  heroData,
}: {
  heroData: HomePageData["heroSection"];
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.3, 0.5], [1, 0.5, 0]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 150]);

  const scrollToContent = useCallback(() => {
    document.querySelector("#stats-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={heroRef}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20"
        aria-labelledby="hero-heading"
      >
        {/* Video background */}
        <m.video
          style={{
            scale: videoScale,
            opacity: videoOpacity,
            transform: "translateZ(0)",
          }}
          poster={heroData.posterUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 -z-20 h-full w-full object-cover will-change-transform"
        >
          <source src={heroData.videoWebmUrl} type="video/webm" />
          <source src={heroData.videoMp4Url} type="video/mp4" />
        </m.video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-raisinBlack/40 via-raisinBlack/70 to-raisinBlack backdrop-blur-[1px]" />

        {/* Content */}
        <m.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="container relative z-10 mx-auto px-6 text-center lg:pt-24"
        >
          <h1 id="hero-heading" className="mb-6 mt-2 sm:mt-0 md:mb-10">
            <m.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: premiumEase,
              }}
              className="mb-4 block font-youngest text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight text-arylideYellow drop-shadow-2xl md:mb-6"
            >
              {heroData.headingPart1}
            </m.span>
            <m.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: premiumEase,
              }}
              className="block pb-4 font-youngest text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl"
            >
              {heroData.headingPart2}
            </m.span>
          </h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.7,
              ease: premiumEase,
            }}
            className="mx-auto mb-4 sm:mb-8 max-w-2xl text-base leading-relaxed text-white drop-shadow-lg md:mb-10 md:text-xl md:leading-relaxed lg:leading-loose"
          >
            {heroData.description}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.9,
              ease: premiumEase,
            }}
            className="flex flex-col items-center justify-center gap-2 sm:gap-4 sm:flex-row md:gap-5"
          >
            <HeroButton href="/wydarzenia" variant="primary">
              <span>Nadchodzące koncerty</span>
            </HeroButton>
            <HeroButton href="/kontakt" variant="secondary">
              Skontaktuj się z nami
            </HeroButton>
          </m.div>
        </m.div>

        {/* Scroll indicator */}
        <m.button
          onClick={scrollToContent}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, 10, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: smoothEase,
          }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-4.5 lg:bottom-8 rounded-full p-2 transition-transform duration-300 md:bottom-12"
          aria-label="Przewiń w dół do treści"
        >
          <FiArrowDown
            size={36}
            className="text-arylideYellow drop-shadow-lg"
            aria-hidden="true"
          />
        </m.button>
      </section>
    </LazyMotion>
  );
};