"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { FiAward, FiMusic, FiUsers } from "react-icons/fi";
import {
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: premiumEase }}
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
            {statsData.map((stat: Stat) => {
              const Icon = ICONS_MAP[stat.label] || FiAward;
              return <StatCard key={stat.label} stat={stat} Icon={Icon} />;
            })}
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

const StatCard = ({
  stat,
  Icon,
}: {
  stat: Stat;
  Icon: React.ElementType;
}) => {
  return (
    <m.article
      variants={fadeInUpVariant}
      whileHover={{
        y: -6,
        transition: smoothSpring,
      }}
      className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-colors duration-300 hover:border-arylideYellow/30 hover:bg-white/8 sm:p-8"
    >
      {/* Icon */}
      <div className="mb-3 flex items-center justify-center rounded-full border border-arylideYellow/20 bg-arylideYellow/10 p-3 transition-all duration-300 group-hover:border-arylideYellow/40 sm:mb-6 sm:p-5">
        <Icon
          size={32}
          className="text-arylideYellow h-6 w-6 sm:h-10 sm:w-10"
          aria-hidden="true"
        />
      </div>

      {/* Number */}
      <p className="mb-2 bg-linear-to-br from-arylideYellow to-arylideYellow/80 bg-clip-text text-4xl font-bold text-transparent sm:mb-3 sm:text-6xl lg:text-7xl">
        {stat.value}
      </p>

      {/* Label */}
      <p className="text-sm font-medium uppercase tracking-wider text-white/60 transition-colors duration-300 group-hover:text-white/80 sm:text-base">
        {stat.label}
      </p>
    </m.article>
  );
};