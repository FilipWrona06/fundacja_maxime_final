"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// --- Warianty animacji ---

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

const imageRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const statsBubbleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as const, // Back easing
    },
  },
};

const textElementVariant: Variants = {
  hidden: { opacity: 0, y: 20, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const AboutSectionClient = ({
  staticContent,
  staticImage,
  staticStatsBubble,
}: {
  staticContent: ReactNode;
  staticImage: ReactNode;
  staticStatsBubble: ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
        aria-labelledby="about-heading"
      >
        {/* Decorative background elements */}
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Content Column */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
                margin: "0px 0px -100px 0px",
              }}
              variants={staggerContainerVariant}
              className="order-2 lg:order-1"
            >
              <m.div variants={textElementVariant}>{staticContent}</m.div>
            </m.div>

            {/* Image Column */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
                margin: "0px 0px -100px 0px",
              }}
              variants={imageRevealVariant}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Image wrapper with enhanced hover */}
                <m.div
                  whileHover={{
                    scale: 1.02,
                    rotateY: 2,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  className="group relative"
                  style={{ perspective: 1000 }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-4 rounded-3xl bg-arylideYellow/0 opacity-0 blur-2xl transition-all duration-700 group-hover:bg-arylideYellow/20 group-hover:opacity-100" />

                  {/* Image container */}
                  <div className="relative">
                    {staticImage}

                    {/* Decorative corners */}
                    <div className="absolute left-0 top-0 h-16 w-16 border-l-4 border-t-4 border-arylideYellow/30 transition-all duration-500 group-hover:border-arylideYellow/60 sm:h-20 sm:w-20" />
                    <div className="absolute bottom-0 right-0 h-16 w-16 border-b-4 border-r-4 border-arylideYellow/30 transition-all duration-500 group-hover:border-arylideYellow/60 sm:h-20 sm:w-20" />
                  </div>
                </m.div>

                {/* Stats Bubble with enhanced animations */}
                <m.div
                  variants={statsBubbleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    scale: 1.08,
                    y: -12,
                    rotate: [0, -2, 2, 0],
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      rotate: {
                        duration: 0.5,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  className="group/bubble relative"
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-arylideYellow/40 via-arylideYellow/20 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover/bubble:opacity-100" />

                  {/* Bubble content */}
                  <div className="relative">{staticStatsBubble}</div>
                </m.div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};
