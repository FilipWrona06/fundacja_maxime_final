// src/components/home/StatsSection.client.tsx
"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { FiAward, FiMusic, FiUsers } from "react-icons/fi";
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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
      ease: [0.34, 1.56, 0.64, 1] as const, // Back easing
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
      <section
        id="stats-section"
        className="relative z-20 -mt-12 md:-mt-20 lg:-mt-24"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          Nasze osiągnięcia w liczbach
        </h2>
        <div className="container mx-auto px-5 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 gap-3 shadow-2xl glass-effect sm:gap-6 rounded-3xl p-6 md:grid-cols-3 md:gap-8 md:p-8 lg:p-10"
          >
            {statsData.map((stat: Stat, index: number) => {
              const Icon = ICONS_MAP[stat.label] || FiAward;
              return (
                <m.article
                  key={stat.label}
                  variants={fadeInUpVariant}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    },
                  }}
                  className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/40 hover:bg-white/10 hover:shadow-xl hover:shadow-arylideYellow/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack sm:p-8"
                >
                  {/* Gradient glow effect on hover */}
                  <div className="absolute inset-0 -z-10 bg-linear-to-br from-arylideYellow/0 via-arylideYellow/0 to-arylideYellow/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

                  {/* Animated border shine */}
                  <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-arylideYellow/20 to-transparent blur-sm" />
                  </div>

                  <m.div
                    variants={iconVariant}
                    className="mb-3 flex items-center justify-center rounded-full border-2 border-arylideYellow/20 bg-arylideYellow/10 p-3 transition-all duration-500 group-hover:border-arylideYellow/40 group-hover:bg-arylideYellow/20 group-hover:shadow-lg group-hover:shadow-arylideYellow/30 sm:mb-6 sm:p-5"
                  >
                    <Icon
                      size={32}
                      className="text-arylideYellow transition-transform duration-500 group-hover:scale-110 h-6 w-6 sm:h-10 sm:w-10"
                      aria-hidden="true"
                    />
                  </m.div>

                  <m.p
                    variants={numberVariant}
                    className="mb-2 bg-linear-to-br from-arylideYellow via-arylideYellow to-arylideYellow/80 bg-clip-text text-4xl font-bold text-transparent drop-shadow-lg transition-all duration-500 group-hover:scale-105 sm:mb-3 sm:text-6xl lg:text-7xl"
                  >
                    {stat.value}
                  </m.p>

                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.12 }}
                    className="text-sm font-medium uppercase tracking-wider text-white/60 transition-colors duration-500 group-hover:text-white/80 sm:text-base"
                  >
                    {stat.label}
                  </m.p>

                  {/* Decorative corner accents */}
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/30" />
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/30" />
                </m.article>
              );
            })}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};
