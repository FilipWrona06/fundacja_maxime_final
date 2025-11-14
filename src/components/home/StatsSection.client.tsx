// src/components/home/StatsSection.client.tsx
"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { FiAward, FiMusic, FiUsers } from "react-icons/fi";

import { smoothSpring } from "@/lib/animations";
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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainerVariant: Variants = {
  // Dodano stan 'hidden', aby uniknąć "mignięcia" przed animacją
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
        // ZMIANA (RWD): Zmniejszono ujemny margines na małych ekranach,
        // aby uniknąć nadmiernego nachodzenia na sekcję Hero.
        className="relative z-20 -mt-16 md:-mt-20"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          Nasze osiągnięcia w liczbach
        </h2>
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariant}
            // ZMIANA (RWD): Zmniejszono padding na małych ekranach
            // oraz przeorganizowano klasy dla lepszej czytelności.
            className="grid grid-cols-1 gap-6 rounded-3xl p-6 shadow-2xl glass-effect md:grid-cols-3 md:p-8"
          >
            {statsData.map((stat: Stat) => {
              const Icon = ICONS_MAP[stat.label] || FiAward;
              return (
                <m.article
                  key={stat.label}
                  variants={fadeInUpVariant}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={smoothSpring}
                  // ZMIANA (Stylistyka): Uporządkowano klasy i dodano
                  // style focus-visible dla lepszej dostępności.
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-arylideYellow/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow"
                >
                  <div className="mb-4 rounded-full border border-arylideYellow/20 bg-arylideYellow/10 p-4">
                    <Icon
                      size={32}
                      className="text-arylideYellow"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mb-2 text-5xl font-bold text-arylideYellow">
                    {stat.value}
                  </p>
                  <p className="font-semibold text-white/60">{stat.label}</p>
                </m.article>
              );
            })}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};