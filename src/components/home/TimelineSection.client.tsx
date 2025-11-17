"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  glowIntensities,
  hoverScales,
  premiumEase,
  staggerConfig,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";
import type { HomePageData, TimelineEvent } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
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
      delayChildren: 0.1,
    },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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

const yearBadgeVariant: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

const imageRevealVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const lineDrawVariant: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: premiumEase,
    },
  },
};

export const TimelineSectionClient = ({
  timelineData,
  children,
}: {
  timelineData: HomePageData["timelineSection"];
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="historia-section"
        className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
        aria-labelledby="timeline-heading"
      >
        {/* Decorative background */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          {/* Header */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig.once}
            variants={staggerContainerVariant}
            className="mb-12 text-center sm:mb-16 md:mb-20 lg:mb-24"
          >
            <m.div variants={headingVariant}>{children}</m.div>
          </m.div>

          {/* Timeline Container */}
          <div className="relative mx-auto max-w-5xl">
            {/* Vertical line */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={lineDrawVariant}
              className="absolute left-4 top-0 hidden h-full w-0.5 origin-top md:left-8 md:block lg:left-10"
              style={{
                background: "linear-gradient(to bottom, rgba(233,215,88,0.6), rgba(233,215,88,0.3), rgba(233,215,88,0.1), transparent)",
              }}
            />

            {/* Events */}
            <div className="space-y-10 sm:space-y-12 md:space-y-16 lg:space-y-20">
              {timelineData.timelineEvents.map((item: TimelineEvent, index: number) => (
                <TimelineEventComponent
                  key={item.year}
                  item={item}
                  isLast={index === timelineData.timelineEvents.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

// Separate TimelineEvent component with hover state
const TimelineEventComponent = ({
  item,
  isLast,
}: {
  item: TimelineEvent;
  isLast: boolean;
}) => {
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <m.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig.once}
      variants={staggerContainerVariant}
      className="relative grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-10 lg:gap-12"
    >
      {/* Year Badge (Desktop) */}
      <div className="hidden items-start pt-1 md:flex">
        <m.div
          variants={yearBadgeVariant}
          whileHover={{
            scale: 1.15,
            rotate: 360,
            transition: ultraSmoothSpring,
          }}
          onHoverStart={() => setIsBadgeHovered(true)}
          onHoverEnd={() => setIsBadgeHovered(false)}
          className="group/badge relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-arylideYellow bg-raisinBlack shadow-lg transition-shadow duration-500 lg:h-20 lg:w-20"
          style={{
            boxShadow: isBadgeHovered
              ? glowIntensities.prominent
              : glowIntensities.normal,
          }}
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-arylideYellow/20 opacity-0 transition-opacity duration-500 group-hover/badge:opacity-100 group-hover/badge:animate-ping" />

          <span className="relative z-10 font-youngest text-2xl text-arylideYellow lg:text-3xl">
            {item.year}
          </span>
        </m.div>
      </div>

      {/* Content */}
      <div className="group/content relative">
        {/* Mobile Year */}
        <m.time
          variants={fadeInUpVariant}
          dateTime={item.fullYear}
          className="mb-2 inline-block font-youngest text-arylideYellow drop-shadow-lg sm:mb-4 text-3xl sm:text-4xl md:hidden"
          style={{ textShadow: glowIntensities.subtle }}
        >
          {item.fullYear}
        </m.time>

        {/* Title */}
        <m.h3
          variants={fadeInUpVariant}
          className="mb-2 text-[1.25rem] font-semibold transition-colors duration-500 group-hover/content:text-arylideYellow sm:mb-4 sm:text-3xl lg:text-4xl"
        >
          {item.title}
        </m.h3>

        {/* Description */}
        <m.p
          variants={fadeInUpVariant}
          className="mb-2 text-[0.9rem] leading-relaxed text-white/90 transition-colors duration-500 sm:mb-6 sm:text-lg md:leading-relaxed lg:text-xl"
        >
          {item.text}
        </m.p>

        {/* Image */}
        <m.div
          variants={imageRevealVariant}
          className="group/image relative"
          style={{ perspective: 1000 }}
        >
          <m.div
            whileHover={{
              scale: hoverScales.subtle,
              rotateX: 2,
              transition: ultraSmoothSpring,
            }}
            onHoverStart={() => setIsImageHovered(true)}
            onHoverEnd={() => setIsImageHovered(false)}
            className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 sm:rounded-2xl lg:rounded-3xl"
            style={{
              boxShadow: isImageHovered
                ? glowIntensities.normal
                : "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute -inset-2 rounded-xl opacity-0 blur-2xl transition-all duration-700 group-hover/image:opacity-100"
              style={{
                background:
                  "radial-gradient(circle, rgba(233,215,88,0.2) 0%, transparent 70%)",
              }}
            />

            {/* Image */}
            {item.image && (
              <div className="relative">
                <Image
                  src={urlFor(item.image).width(1000).height(563).quality(90).url()}
                  alt={item.alt}
                  width={1000}
                  height={563}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={urlFor(item.image).width(20).height(11).blur(10).url()}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/40 to-transparent opacity-60 transition-opacity duration-700 group-hover/image:opacity-30" />

                {/* Color overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-arylideYellow/0 to-arylideYellow/0 opacity-0 transition-opacity duration-700 group-hover/image:from-arylideYellow/10 group-hover/image:to-arylideYellow/5 group-hover/image:opacity-100" />
              </div>
            )}

            {/* Corner decorations */}
            <div className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-arylideYellow/0 transition-all duration-500 group-hover/image:border-arylideYellow/50 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
            <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-arylideYellow/0 transition-all duration-500 group-hover/image:border-arylideYellow/50 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          </m.div>
        </m.div>

        {/* Connection line to badge (desktop) */}
        {!isLast && (
          <div className="absolute -bottom-8 left-0 hidden h-16 w-px bg-linear-to-b from-arylideYellow/20 to-transparent md:-left-10 md:block lg:-left-12" />
        )}
      </div>
    </m.article>
  );
};