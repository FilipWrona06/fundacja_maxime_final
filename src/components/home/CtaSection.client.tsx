"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const CTASectionClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-32" aria-labelledby="cta-heading">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariant}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-12 text-center backdrop-blur-sm md:p-20"
          >
            {/* Animowane tła */}
            <m.div
              className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <m.div
              className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative">
              {/* Statyczny HTML z serwera jest renderowany tutaj */}
              {children}

              {/* Interaktywne przyciski */}
              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <m.div
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
                </m.div>
                <m.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-3 rounded-full border-2 border-arylideYellow/50 bg-transparent px-10 py-5 text-lg font-bold text-arylideYellow transition-all duration-500 hover:border-arylideYellow hover:bg-arylideYellow/10"
                  >
                    Skontaktuj się z nami
                  </Link>
                </m.div>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};