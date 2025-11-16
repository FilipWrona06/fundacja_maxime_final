"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Link from "next/link";
import { FiCamera, FiHeart } from "react-icons/fi";

const MotionLink = m(Link);

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const buttonVariant: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: { scale: 0.95 },
};

const shimmerVariant: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 3,
      ease: "easeInOut",
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
        className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
        aria-labelledby="cta-heading"
      >
        {/* Background decorative elements */}
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
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
                ease: "easeInOut",
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
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(236, 179, 101, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 179, 101, 0.3) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Content */}
            <m.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainerVariant}
            >
              <m.div variants={fadeInUpVariant}>{children}</m.div>

              {/* Buttons */}
              <m.div
                variants={fadeInUpVariant}
                className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 md:gap-6"
              >
                {/* Primary Button - Patronite */}
                <MotionLink
                  href={patroniteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={buttonVariant}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-arylideYellow px-6 py-3.5 text-sm font-bold text-raisinBlack shadow-lg shadow-arylideYellow/30 transition-shadow duration-500 hover:shadow-2xl hover:shadow-arylideYellow/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
                >
                  {/* Shimmer effect */}
                  <m.span
                    variants={shimmerVariant}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                  />

                  <m.span
                    className="relative z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <FiHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </m.span>

                  <span className="relative z-10">Wesprzyj nas</span>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-arylideYellow opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                </MotionLink>

                {/* Secondary Button - Gallery */}
                <MotionLink
                  href={galleryUrl}
                  variants={buttonVariant}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-arylideYellow/40 bg-transparent px-6 py-3.5 text-sm font-bold text-arylideYellow backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow hover:bg-arylideYellow/10 hover:shadow-lg hover:shadow-arylideYellow/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
                >
                  <FiCamera className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 sm:h-5 sm:w-5" />
                  <span className="whitespace-nowrap">
                    Zobacz naszą galerię
                  </span>

                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 rounded-full bg-linear-to-r from-arylideYellow/0 via-arylideYellow/10 to-arylideYellow/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </MotionLink>
              </m.div>
            </m.div>

            {/* Decorative corner accents */}
            <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-arylideYellow/20 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-arylideYellow/20 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};
