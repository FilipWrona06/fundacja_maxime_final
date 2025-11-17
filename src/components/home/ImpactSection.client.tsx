"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  glowIntensities,
  premiumEase,
  smoothEase,
  staggerConfig,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";
import type { HomePageData, ImpactCard } from "@/lib/types";
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

export const ImpactSectionClient = ({
  impactData,
  children,
}: {
  impactData: HomePageData["impactSection"];
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
        aria-labelledby="impact-heading"
      >
        {/* Decorative background */}
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

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

          {/* Cards Grid */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {impactData.impactCards.map((card: ImpactCard, index: number) => (
              <ImpactCardComponent key={card.title} card={card} index={index} />
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

// Separate ImpactCard component with hover state
const ImpactCardComponent = ({
  card,
  index,
}: {
  card: ImpactCard;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <m.article
      variants={fadeInUpVariant}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 sm:rounded-3xl ${
        index === 2 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
      style={{
        boxShadow: isHovered
          ? glowIntensities.normal
          : "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden">
        {/* Image */}
        <m.div
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{
            duration: 0.6,
            ease: premiumEase,
          }}
          className="h-full w-full"
        >
          {card.image && (
            <Image
              src={urlFor(card.image).width(600).height(800).quality(90).url()}
              alt={card.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL={urlFor(card.image).width(20).height(27).blur(10).url()}
            />
          )}
        </m.div>

        {/* Static gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/90 via-raisinBlack/50 to-transparent" />

        {/* Hover color overlay */}
        <m.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 bg-linear-to-br from-arylideYellow/20 via-arylideYellow/10 to-transparent"
        />

        {/* Shine effect */}
        <m.div
          animate={{
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? [0, 0.5, 0] : 0,
          }}
          transition={{
            duration: 0.8,
            ease: smoothEase,
          }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Border glow */}
        <div className="absolute inset-0 border-2 border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/30" />
      </div>

      {/* Content */}
      <m.div
        animate={{
          y: isHovered ? -12 : 0,
        }}
        transition={ultraSmoothSpring}
        className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8"
      >
        {/* Decorative line */}
        <div className="mb-3 h-1 w-12 bg-arylideYellow/0 transition-all duration-500 group-hover:w-20 group-hover:bg-arylideYellow sm:mb-4" />

        <h3 className="mb-1 text-lg font-bold text-white transition-all duration-500 group-hover:text-arylideYellow sm:mb-3 sm:text-2xl md:text-3xl">
          {card.title}
        </h3>

        <p className="text-sm leading-relaxed text-white/90 transition-all duration-500 sm:text-base md:leading-relaxed">
          {card.desc}
        </p>
      </m.div>

      {/* Corner accents */}
      <div className="absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/40 sm:h-16 sm:w-16" />
      <div className="absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/40 sm:h-16 sm:w-16" />
    </m.article>
  );
};