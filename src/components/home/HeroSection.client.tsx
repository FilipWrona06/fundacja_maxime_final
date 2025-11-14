"use client";

import type { HomePageData } from "@/lib/types";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

// Komponent przycisku pozostaje bez zmian.
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
    "bg-arylideYellow text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-all duration-300 hover:shadow-arylideYellow/50";
  const secondaryClasses =
    "border-2 border-white/30 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-arylideYellow/60 hover:bg-white/10";

  return (
    <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack md:px-10 md:py-5 ${
          variant === "primary" ? primaryClasses : secondaryClasses
        }`}
      >
        {children}
      </Link>
    </m.div>
  );
};

// --- Główny komponent kliencki ---

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

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const videoScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 300]);

  const scrollToContent = useCallback(() => {
    document.querySelector("#stats-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay } }),
  };

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
  });

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={heroRef}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20"
        aria-labelledby="hero-heading"
      >
        <m.video style={{ scale: videoScale }} poster={heroData.posterUrl} autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 -z-20 h-full w-full object-cover">
          <source src={heroData.videoWebmUrl} type="video/webm" />
          <source src={heroData.videoMp4Url} type="video/mp4" />
        </m.video>

        <div className="absolute inset-0 -z-10 bg-linear-to-b from-raisinBlack/50 via-raisinBlack/70 to-raisinBlack" />

        <m.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="container relative z-10 mx-auto px-6 text-center lg:pt-24"
        >
          <h1 id="hero-heading" className="mb-6 md:mb-10">
            <m.span
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="mb-4 block font-youngest text-[clamp(3.25rem,12vw,10rem)] leading-[0.9] tracking-tight text-arylideYellow md:mb-6"
            >
              {heroData.headingPart1}
            </m.span>
            <m.span
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="block pb-4 font-youngest text-[clamp(3.25rem,12vw,10rem)] leading-[0.9] tracking-tight text-white"
            >
              {heroData.headingPart2}
            </m.span>
          </h1>

          <m.p
            {...fadeIn(0.8)}
            // OSTATECZNA POPRAWKA: Używamy stałej, dużej wartości line-height (32px),
            // aby fizycznie uniemożliwić nachodzenie na siebie tekstu.
            className="mx-auto mb-8 max-w-2xl text-base text-white/80 md:mb-10 md:text-xl leading-8"
          >
            {heroData.description}
          </m.p>

          <m.div {...fadeIn(1)} className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-5">
            <HeroButton href="/wydarzenia" variant="primary">
              <span>Nadchodzące koncerty</span>
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
            </HeroButton>
            <HeroButton href="/kontakt" variant="secondary">
              Skontaktuj się z nami
            </HeroButton>
          </m.div>
        </m.div>

        <m.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute bottom-6 md:bottom-12 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow"
          aria-label="Przewiń w dół do treści"
        >
          <FiArrowDown size={36} className="text-arylideYellow/80" aria-hidden="true" />
        </m.button>
      </section>
    </LazyMotion>
  );
};