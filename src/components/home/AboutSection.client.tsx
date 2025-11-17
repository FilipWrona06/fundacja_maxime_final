"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  premiumEase,
  ultraSmoothSpring,
  staggerConfig,
  viewportConfig,
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
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const textElementVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

export const AboutSectionClient = ({
  staticContent,
  staticImage,
  miniStats,
}: {
  staticContent: ReactNode;
  staticImage: ReactNode;
  miniStats: ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 xl:pt-24 xl:pb-40"
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
                    y: -8,
                    transition: ultraSmoothSpring,
                  }}
                  className="group relative"
                >
                  <div className="relative">{staticImage}</div>
                </m.div>

                {/* Mini Stats Card */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: premiumEase }}
                  whileHover={{
                    y: -8,
                    transition: ultraSmoothSpring,
                  }}
                  className="absolute -bottom-6 -left-4 right-4 sm:-bottom-8 sm:left-4 sm:right-8 md:-bottom-10 md:-left-8 md:right-12 lg:-left-12 lg:right-16"
                >
                  {miniStats}
                </m.div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};