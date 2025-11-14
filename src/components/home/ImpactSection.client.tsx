"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import Image from "next/image";

import { smoothSpring } from "@/lib/animations";
import type { HomePageData, ImpactCard } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

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
  hidden: { opacity: 0 }, // Dodano dla płynniejszego wejścia
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ZMIANA: Zdefiniowano warianty dla animacji `whileHover`, aby Framer Motion kontrolował
// zarówno uniesienie karty, jak i skalowanie obrazka wewnątrz niej.
const cardHoverVariants: Variants = {
  hover: { y: -10 },
  initial: { y: 0 },
};

const imageHoverVariants: Variants = {
  hover: { scale: 1.1 },
  initial: { scale: 1 },
};

export const ImpactSectionClient = ({
  impactData,
  children,
}: {
  impactData: HomePageData["impactSection"];
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      {/* ZMIANA (RWD): Zmniejszono padding na małych ekranach */}
      <section className="py-24 md:py-32" aria-labelledby="impact-heading">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariant}
            // ZMIANA (RWD): Zmniejszono margines na małych ekranach
            className="mb-16 text-center md:mb-20"
          >
            {children}
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariant}
            // ZMIANA (RWD): Zmniejszono odstępy na małych ekranach
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {impactData.impactCards.map((card: ImpactCard, index) => (
              <m.article
                key={card.title}
                variants={fadeInUpVariant}
                // ZMIANA: Usunięto 'whileHover' i 'transition' stąd,
                // aby użyć wariantów do bardziej złożonej animacji.
                className={`group relative overflow-hidden rounded-3xl ${
                  index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative aspect-3/4">
                  {/* ZMIANA: Obrazek owinięty w m.div, aby animować go wariantami */}
                  <m.div
                    initial="initial"
                    whileHover="hover"
                    variants={imageHoverVariants}
                    transition={smoothSpring}
                  >
                    {card.image && (
                      <Image
                        src={urlFor(card.image).width(400).height(533).url()}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                        // ZMIANA: Usunięto 'group-hover:scale-110' i 'duration-700'
                        className="object-cover"
                        loading="lazy"
                      />
                    )}
                  </m.div>
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/40 to-transparent" />
                  {/* ZMIANA: Ujednolicono czas trwania dla spójności */}
                  <div className="absolute inset-0 bg-arylideYellow/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                {/* ZMIANA: Ta sekcja teraz ma swoją własną animację */}
                <m.div
                  initial="initial"
                  whileHover="hover"
                  variants={cardHoverVariants}
                  transition={smoothSpring}
                  // ZMIANA (RWD): Zmniejszono padding na małych ekranach
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                >
                  <h3 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-arylideYellow">
                    {card.title}
                  </h3>
                  <p className="text-white/70 transition-colors duration-300 group-hover:text-white">
                    {card.desc}
                  </p>
                </m.div>
              </m.article>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};