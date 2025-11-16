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
    "bg-arylideYellow text-raisinBlack shadow-lg shadow-arylideYellow/20 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-arylideYellow/40 hover:brightness-110";
  const secondaryClasses =
    "border-2 border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-500 ease-out hover:border-arylideYellow/50 hover:bg-white/10 hover:backdrop-blur-md hover:shadow-lg hover:shadow-white/10";

  return (
    <m.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href={href}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 ${
          variant === "primary" ? primaryClasses : secondaryClasses
        }`}
      >
        {/* Dodatkowy efekt shimmer dla primary button */}
        {variant === "primary" && (
          <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />
        )}
        {children}
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

  // Bardziej płynne sprężyny
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 25, 
    restDelta: 0.001 
  });
  
  // Subtelniejsze transformacje
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.3, 0.5], [1, 0.5, 0]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const contentScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);

  const scrollToContent = useCallback(() => {
    document.querySelector("#stats-section")?.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  }, []);

  const headingVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as const
      } 
    },
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={heroRef}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20"
        aria-labelledby="hero-heading"
      >
        {/* Video z ulepszonymi transformacjami */}
        <m.video 
          style={{ 
            scale: videoScale,
            opacity: videoOpacity,
            transform: 'translateZ(0)', // Force GPU acceleration
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

        {/* Ulepszony gradient overlay z większą głębią */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-raisinBlack/40 via-raisinBlack/70 to-raisinBlack backdrop-blur-[1px]" />

        {/* Content z wieloma transformacjami dla ultra smooth effect */}
        <m.div
          style={{ 
            opacity: contentOpacity, 
            y: contentY,
            scale: contentScale
          }}
          className="container relative z-10 mx-auto px-6 text-center lg:pt-24"
        >
          <h1 id="hero-heading" className="mb-6 md:mb-10">
            <m.span
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1] as const
              }}
              className="mb-4 block font-youngest text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight text-arylideYellow drop-shadow-2xl md:mb-6"
            >
              {heroData.headingPart1}
            </m.span>
            <m.span
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              custom={0.6}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1] as const
              }}
              className="block pb-4 font-youngest text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl"
            >
              {heroData.headingPart2}
            </m.span>
          </h1>

          <m.p
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1] as const
            }}
            className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white drop-shadow-lg md:mb-10 md:text-xl md:leading-relaxed lg:leading-loose"
          >
            {heroData.description}
          </m.p>

          <m.div 
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: [0.22, 1, 0.36, 1] as const
            }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-5"
          >
            <HeroButton href="/wydarzenia" variant="primary">
              <span>Nadchodzące koncerty</span>
              <FiArrowRight 
                className="transition-transform duration-500 ease-out group-hover:translate-x-2" 
                aria-hidden="true" 
              />
            </HeroButton>
            <HeroButton href="/kontakt" variant="secondary">
              Skontaktuj się z nami
            </HeroButton>
          </m.div>
        </m.div>

        {/* Scroll indicator z lepszą animacją */}
        <m.button
          onClick={scrollToContent}
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [0, 10, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
          className="absolute bottom-4.5 lg:bottom-8 rounded-full p-2 transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow md:bottom-12"
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