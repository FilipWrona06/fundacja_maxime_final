"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { type ReactNode } from "react";

// Usunięto import 'smoothSpring', ponieważ był używany tylko przez przycisk.
import { gentleSpring } from "@/lib/animations";

// Warianty animacji pozostają bez zmian.
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

/**
 * Lekki Komponent Kliencki dla sekcji "O nas".
 * 
 * Odpowiedzialności:
 * 1. Otrzymanie statycznego, prerenderowanego JSX z Komponentu Serwerowego.
 * 2. Owinięcie otrzymanych elementów w komponenty `framer-motion` w celu animacji.
 */
export const AboutSectionClient = ({
  staticContent,
  staticImage,
  staticStatsBubble,
}: {
  staticContent: ReactNode;
  staticImage: ReactNode;
  staticStatsBubble: ReactNode;
}) => {
  // Usunięto całą logikę związaną ze `scrollToHistory` i `useCallback`.

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative min-h-screen py-32"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            
            {/* Lewa kolumna: otoczka animacji dla samej treści */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainerVariant}
            >
              {staticContent}

              {/* --- POCZĄTEK ZMIANY --- */}
              {/* Usunięto cały element <m.button> */}
              {/* --- KONIEC ZMIANY --- */}
              
            </m.div>

            {/* Prawa kolumna: otoczka animacji dla obrazka i "dymka" */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariant}
              className="relative"
            >
              <m.div
                whileHover={{ scale: 1.02 }}
                transition={gentleSpring}
              >
                {staticImage}
              </m.div>
              
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {staticStatsBubble}
              </m.div>
            </m.div>

          </div>
        </div>
      </section>
    </LazyMotion>
  );
};