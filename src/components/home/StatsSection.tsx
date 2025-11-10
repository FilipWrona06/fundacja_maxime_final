"use client";

import { motion, type Variants } from "framer-motion";
import { FiAward, FiMusic, FiUsers } from "react-icons/fi";

import { smoothSpring } from "@/lib/animations";
import type { HomePageData } from "@/lib/types";

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
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const StatsSection = ({
  statsData,
}: {
  statsData: HomePageData["statsSection"];
}) => {
  return (
    <section
      id="stats-section"
      className="relative -mt-20 z-20"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        Nasze osiągnięcia w liczbach
      </h2>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 glass-effect rounded-3xl p-8 shadow-2xl"
        >
          {statsData.map((stat) => {
            const Icon = ICONS_MAP[stat.label] || FiAward;
            return (
              <motion.article
                key={stat.label}
                variants={fadeInUpVariant}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={smoothSpring}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-arylideYellow/30 transition-all duration-300"
              >
                <div className="mb-4 p-4 rounded-full bg-arylideYellow/10 border border-arylideYellow/20">
                  <Icon
                    size={32}
                    className="text-arylideYellow"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-5xl font-bold text-arylideYellow mb-2">
                  {stat.value}
                </p>
                <p className="text-white/60 font-semibold">{stat.label}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
