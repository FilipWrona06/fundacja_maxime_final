"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Link from "next/link";
import { FiCamera, FiHeart } from "react-icons/fi";
import {
  premiumEase,
  ultraSmoothSpring,
  staggerConfig,
  viewportConfig,
} from "@/lib/animations";

const MotionLink = m.create(Link);

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={ultraSmoothSpring}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-arylideYellow px-6 py-3 text-sm font-bold text-raisinBlack shadow-lg transition-all duration-300 hover:shadow-arylideYellow/30 sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
                >
                  <FiHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Wesprzyj nas</span>
                </MotionLink>

                {/* Secondary Button */}
                <MotionLink
                  href={galleryUrl}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={ultraSmoothSpring}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-arylideYellow/40 bg-transparent px-6 py-3 text-sm font-bold text-arylideYellow backdrop-blur-sm transition-all duration-300 hover:border-arylideYellow hover:bg-arylideYellow/10 sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
                >
                  <FiCamera className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="whitespace-nowrap">Zobacz naszą galerię</span>
                </MotionLink>
              </m.div>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};