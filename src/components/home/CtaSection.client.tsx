// src/components/home/CtaSection.client.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// Definicja animacji bez zmian
const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Prywatny komponent kliencki - otoczka na interaktywność i animacje.
export const CTASectionClient = ({
  children, // Krok 1: Akceptujemy `children` z serwera.
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="relative py-32" aria-labelledby="cta-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-12 text-center backdrop-blur-sm md:p-20"
        >
          {/* Animowane tła - zostają po stronie klienta */}
          <motion.div
            className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative">
            {/* Krok 2: Wstrzykujemy gotowy, statyczny HTML z serwera. */}
            {children}

            {/* Interaktywne przyciski z animacjami - zostają po stronie klienta. */}
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/wydarzenia"
                  className="group inline-flex items-center gap-3 rounded-full bg-arylideYellow px-10 py-5 text-lg font-bold text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-all duration-500 hover:shadow-arylideYellow/50"
                >
                  Dołącz do nas
                  <FiArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-2"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-3 rounded-full border-2 border-arylideYellow/50 bg-transparent px-10 py-5 text-lg font-bold text-arylideYellow transition-all duration-500 hover:border-arylideYellow hover:bg-arylideYellow/10"
                >
                  Skontaktuj się z nami
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};