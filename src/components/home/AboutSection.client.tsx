// src/components/home/AboutSection.client.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import { FiArrowRight } from "react-icons/fi";

import { gentleSpring, smoothSpring } from "@/lib/animations";
import type { HomePageData } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Definicje animacji pozostają bez zmian
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

// To jest "prywatny" komponent kliencki - lekka otoczka na interaktywność.
export const AboutSectionClient = ({
  aboutData,
  children, // Krok 1: Akceptujemy `children` z serwera.
}: {
  aboutData: HomePageData["aboutSection"];
  children: React.ReactNode;
}) => {
  // Logika interaktywna (hooki, event handlery) pozostaje tutaj.
  const scrollToHistory = useCallback(() => {
    document
      .getElementById("historia-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      className="relative min-h-screen py-32"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Lewa kolumna z animacjami */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariant}
          >
            {/* Krok 2: Wstrzykujemy tu gotowy, statyczny HTML z serwera. */}
            {children}

            {/* Przycisk zostaje, bo ma `onClick` i animacje. */}
            <motion.button
              variants={fadeInUpVariant}
              whileHover={{ x: 10 }}
              transition={smoothSpring}
              type="button"
              onClick={scrollToHistory}
              className="group mt-10 inline-flex items-center gap-3 text-lg font-semibold text-arylideYellow transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-arylideYellow/50 rounded-lg px-2 py-1"
            >
              Poznaj naszą historię
              <FiArrowRight
                className="transition-transform duration-300 group-hover:translate-x-2"
                aria-hidden="true"
              />
            </motion.button>
          </motion.div>

          {/* Prawa kolumna z obrazkiem i animacjami - pozostaje bez zmian, bo jest w całości interaktywna. */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariant}
            className="relative"
          >
            <motion.div
              className="relative aspect-4/5 overflow-hidden rounded-3xl"
              whileHover={{ scale: 1.02 }}
              transition={gentleSpring}
            >
              {aboutData.image && (
                <Image
                  src={urlFor(aboutData.image).width(600).height(750).url()}
                  alt={aboutData.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="absolute -bottom-8 -left-5 rounded-2xl border border-white/10 glass-effect p-8 md:-left-16 shadow-2xl"
            >
              <p className="mb-2 font-youngest text-6xl text-arylideYellow">
                50+
              </p>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Zorganizowanych Koncertów
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};