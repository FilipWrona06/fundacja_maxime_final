"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { smoothSpring } from "@/lib/animations"; // Dodano import dla spójności

// ZMIANA: Tworzymy animowany komponent Link raz, aby go reużywać.
const MotionLink = m(Link);

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ZMIANA: Warianty dla animacji strzałki, aby używać Framer Motion
const arrowVariants: Variants = {
  initial: { x: 0 },
  hover: { x: 8 },
};

export const CTASectionClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      {/* ZMIANA (RWD): Zmniejszono padding na małych ekranach */}
      <section className="relative py-24 md:py-32" aria-labelledby="cta-heading">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariant}
            // ZMIANA (RWD): Zmniejszono padding na małych ekranach
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-8 text-center backdrop-blur-sm sm:p-12 md:p-20"
          >
            {/* Animowane tła */}
            <m.div
              className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <m.div
              className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative">
              {children}

              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <MotionLink
                  href="/wydarzenia"
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  transition={smoothSpring}
                  // ZMIANA (RWD i a11y): Dostosowano padding i dodano focus-visible
                  className="inline-flex items-center gap-3 rounded-full bg-arylideYellow px-8 py-4 text-base font-bold text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-shadow duration-300 hover:shadow-arylideYellow/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow md:px-10 md:py-5 md:text-lg"
                >
                  Dołącz do nas
                  <m.span variants={arrowVariants} aria-hidden="true">
                    <FiArrowRight />
                  </m.span>
                </MotionLink>

                <MotionLink
                  href="/kontakt"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={smoothSpring}
                  className="inline-flex items-center gap-3 rounded-full border-2 border-arylideYellow/50 bg-transparent px-8 py-4 text-base font-bold text-arylideYellow transition-all duration-300 hover:border-arylideYellow hover:bg-arylideYellow/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow md:px-10 md:py-5 md:text-lg"
                >
                  Skontaktuj się z nami
                </MotionLink>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};