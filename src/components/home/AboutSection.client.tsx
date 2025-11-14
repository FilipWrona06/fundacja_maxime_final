"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { gentleSpring } from "@/lib/animations";

// --- Warianty animacji ---

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ZMIANA: Definiujemy warianty dla "dymka", aby jego animacja "whileInView"
// miała własną, specyficzną definicję przejścia (transition).
const statsBubbleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
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
        className="relative min-h-screen py-24 md:py-32"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainerVariant}
            >
              {staticContent}
            </m.div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUpVariant}
              className="relative"
            >
              <m.div whileHover={{ scale: 1.02 }} transition={gentleSpring}>
                {staticImage}
              </m.div>

              {/* --- POCZĄTEK POPRAWKI --- */}
              <m.div
                variants={statsBubbleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                // Ta animacja (gentleSpring) zostanie użyta dla `whileHover`,
                // ponieważ animacja `whileInView` ma swoją własną, zdefiniowaną w wariancie.
                transition={gentleSpring}
              >
                {staticStatsBubble}
              </m.div>
              {/* --- KONIEC POPRAWKI --- */}
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};