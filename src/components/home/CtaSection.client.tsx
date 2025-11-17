"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiCamera, FiHeart } from "react-icons/fi";
import {
  premiumEase,
  smoothEase,
  ultraSmoothSpring,
  staggerConfig,
  viewportConfig,
  hoverScales,
  tapScales,
  glowIntensities,
  shineTransition,
} from "@/lib/animations";

const MotionLink = m.create(Link);

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.normal,
      delayChildren: 0.2,
    },
  },
};

export const CTASectionClient = ({
  children,
  patroniteUrl,
  galleryUrl,
}: {
  children: React.ReactNode;
  patroniteUrl: string;
  galleryUrl: string;
}) => {
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative overflow-hidden py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40"
        aria-labelledby="cta-heading"
      >
        {/* Decorative background */}
        <div className="absolute left-1/4 top-25 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig.once}
            variants={fadeInUpVariant}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-8 text-center shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-12 md:p-16 lg:p-20 xl:p-24"
          >
            {/* Animated background blobs */}
            <m.div
              className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl sm:h-80 sm:w-80"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: smoothEase,
              }}
            />
            <m.div
              className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl sm:h-80 sm:w-80"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
                x: [0, -20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: smoothEase,
                delay: 1,
              }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: "linear-gradient(rgba(233,215,88,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(233,215,88,0.3) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Content */}
            <m.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig.once}
              variants={staggerContainerVariant}
            >
              <m.div variants={fadeInUpVariant}>{children}</m.div>

              {/* Buttons */}
              <m.div
                variants={fadeInUpVariant}
                className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 md:gap-6"
              >
                {/* Primary Button */}
                <MotionLink
                  href={patroniteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: hoverScales.normal }}
                  whileTap={{ scale: tapScales.normal }}
                  transition={ultraSmoothSpring}
                  onMouseEnter={() => setIsPrimaryHovered(true)}
                  onMouseLeave={() => setIsPrimaryHovered(false)}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-arylideYellow px-6 py-3 text-sm font-bold text-raisinBlack shadow-lg transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
                  style={{
                    boxShadow: isPrimaryHovered
                      ? glowIntensities.prominent
                      : glowIntensities.normal,
                  }}
                >
                  {/* Shine effect */}
                  <m.span
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-150%", skewX: -15 }}
                    animate={isPrimaryHovered ? { x: "250%" } : { x: "-150%" }}
                    transition={shineTransition}
                  />

                  {/* Heart icon */}
                  <m.span
                    className="relative z-10"
                    animate={{
                      scale: isPrimaryHovered ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isPrimaryHovered ? Number.POSITIVE_INFINITY : 0,
                      ease: smoothEase,
                    }}
                  >
                    <FiHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </m.span>

                  <span className="relative z-10">Wesprzyj nas</span>
                </MotionLink>

                {/* Secondary Button */}
                <MotionLink
                  href={galleryUrl}
                  whileHover={{ scale: hoverScales.normal }}
                  whileTap={{ scale: tapScales.normal }}
                  transition={ultraSmoothSpring}
                  onMouseEnter={() => setIsSecondaryHovered(true)}
                  onMouseLeave={() => setIsSecondaryHovered(false)}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-arylideYellow/40 bg-transparent px-6 py-3 text-sm font-bold text-arylideYellow backdrop-blur-sm transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
                  style={{
                    borderColor: isSecondaryHovered
                      ? "rgba(233,215,88,1)"
                      : "rgba(233,215,88,0.4)",
                    backgroundColor: isSecondaryHovered
                      ? "rgba(233,215,88,0.1)"
                      : "transparent",
                    boxShadow: isSecondaryHovered
                      ? glowIntensities.normal
                      : "none",
                  }}
                >
                  {/* Camera icon */}
                  <m.span
                    animate={{
                      scale: isSecondaryHovered ? 1.1 : 1,
                      rotate: isSecondaryHovered ? 12 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <FiCamera className="h-4 w-4 sm:h-5 sm:w-5" />
                  </m.span>

                  <span className="whitespace-nowrap">Zobacz naszą galerię</span>

                  {/* Background gradient */}
                  <m.div
                    className="absolute inset-0 rounded-full bg-linear-to-r from-arylideYellow/0 via-arylideYellow/10 to-arylideYellow/0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSecondaryHovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </MotionLink>
              </m.div>
            </m.div>

            {/* Corner accents */}
            <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-arylideYellow/20 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-arylideYellow/20 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};