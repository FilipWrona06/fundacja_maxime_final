"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  premiumEase,
  smoothEase,
  ultraSmoothSpring,
  staggerConfig,
  viewportConfig,
  hoverScales,
} from "@/lib/animations";

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
      ease: premiumEase,
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
      ease: premiumEase,
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
      ease: premiumEase,
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
        {/* Decorative background */}
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Content Column */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig.once}
              variants={staggerContainerVariant}
              className="order-2 lg:order-1"
            >
              <m.div variants={textElementVariant}>{staticContent}</m.div>
            </m.div>

            {/* Image Column */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig.once}
              variants={imageRevealVariant}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Image wrapper */}
                <m.div
                  whileHover={{
                    scale: hoverScales.subtle,
                    rotateY: 2,
                    transition: ultraSmoothSpring,
                  }}
                  className="group relative"
                  style={{ perspective: 1000 }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(circle, rgba(233,215,88,0.2) 0%, transparent 70%)",
                    }}
                  />

                  {/* Image container */}
                  <div className="relative">
                    {staticImage}

                    {/* Corner decorations */}
                    <div className="absolute left-0 top-0 h-16 w-16 border-l-4 border-t-4 border-arylideYellow/30 transition-all duration-500 group-hover:border-arylideYellow/60 sm:h-20 sm:w-20" />
                    <div className="absolute bottom-0 right-0 h-16 w-16 border-b-4 border-r-4 border-arylideYellow/30 transition-all duration-500 group-hover:border-arylideYellow/60 sm:h-20 sm:w-20" />
                  </div>
                </m.div>

                {/* Stats Bubble */}
                <m.div
                  variants={statsBubbleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    scale: hoverScales.prominent,
                    y: -12,
                    rotate: [0, -2, 2, 0],
                    transition: {
                      ...ultraSmoothSpring,
                      rotate: {
                        duration: 0.5,
                        ease: smoothEase,
                      },
                    },
                  }}
                  className="group/bubble relative"
                >
                  {/* Animated glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover/bubble:opacity-100"
                    style={{
                      background: "linear-gradient(to bottom right, rgba(233,215,88,0.4), rgba(233,215,88,0.2), transparent)",
                    }}
                  />

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