"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { useState } from "react";
import { FiAward, FiMusic, FiUsers } from "react-icons/fi";
import {
  glowIntensities,
  hoverScales,
  premiumEase,
  smoothSpring,
  staggerConfig,
  viewportConfig,
} from "@/lib/animations";
import type { HomePageData, Stat } from "@/lib/types";

const ICONS_MAP: { [key: string]: React.ElementType } = {
  Koncertów: FiMusic,
  Widzów: FiUsers,
  Nagród: FiAward,
};

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

const iconVariant: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

const numberVariant: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: premiumEase,
    },
  },
};

export const StatsSectionClient = ({
  statsData,
}: {
  statsData: HomePageData["statsSection"];
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="stats-section"
        className="relative z-20 -mt-12 md:-mt-20 lg:-mt-24"
        aria-labelledby="stats-heading"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: premiumEase }}
      >
        <h2 id="stats-heading" className="sr-only">
          Nasze osiągnięcia w liczbach
        </h2>
        <div className="container mx-auto px-5 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig.once}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 gap-3 shadow-2xl glass-effect sm:gap-6 rounded-3xl p-6 md:grid-cols-3 md:gap-8 md:p-8 lg:p-10"
          >
            {statsData.map((stat: Stat, index: number) => {
              const Icon = ICONS_MAP[stat.label] || FiAward;
              return (
                <StatCard key={stat.label} stat={stat} index={index} Icon={Icon} />
              );
            })}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

// Separate StatCard component with hover state
const StatCard = ({
  stat,
  index,
  Icon,
}: {
  stat: Stat;
  index: number;
  Icon: React.ElementType;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <m.article
      variants={fadeInUpVariant}
      whileHover={{
        scale: hoverScales.normal,
        y: -8,
        transition: smoothSpring,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack sm:p-8"
      style={{
        boxShadow: isHovered ? glowIntensities.subtle : "0 0 0 rgba(233,215,88,0)",
      }}
    >
      {/* Gradient glow background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-arylideYellow/0 via-arylideYellow/0 to-arylideYellow/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

      {/* Icon container */}
      <m.div
        variants={iconVariant}
        className="mb-3 flex items-center justify-center rounded-full border-2 border-arylideYellow/20 bg-arylideYellow/10 p-3 transition-all duration-500 group-hover:border-arylideYellow/40 group-hover:bg-arylideYellow/20 sm:mb-6 sm:p-5"
        style={{
          boxShadow: isHovered ? glowIntensities.normal : "0 0 0 rgba(233,215,88,0)",
        }}
      >
        <Icon
          size={32}
          className="text-arylideYellow transition-transform duration-500 group-hover:scale-110 h-6 w-6 sm:h-10 sm:w-10"
          aria-hidden="true"
        />
      </m.div>

      {/* Number */}
      <m.p
        variants={numberVariant}
        className="mb-2 bg-linear-to-br from-arylideYellow via-arylideYellow to-arylideYellow/80 bg-clip-text text-4xl font-bold text-transparent drop-shadow-lg transition-all duration-500 group-hover:scale-105 sm:mb-3 sm:text-6xl lg:text-7xl"
      >
        {stat.value}
      </m.p>

      {/* Label */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * staggerConfig.normal }}
        className="text-sm font-medium uppercase tracking-wider text-white/60 transition-colors duration-500 group-hover:text-white/80 sm:text-base"
      >
        {stat.label}
      </m.p>

      {/* Corner accents */}
      <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/30" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/30" />
    </m.article>
  );
};