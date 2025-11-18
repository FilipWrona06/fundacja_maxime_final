"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Image from "next/image";

import {
  premiumEase,
  staggerConfig,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";
import type { HomePageData, ImpactCard } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Warianty animacji pozostają bez zmian.
const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.normal,
      delayChildren: 0.1,
    },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
};

// --- KLUCZOWA ZMIANA W TYPACH ---
// Gwarantujemy TypeScriptowi, że dane zawsze będą dostępne w tym komponencie.
export const ImpactSectionClient = ({
  impactData,
  children,
}: {
  impactData: NonNullable<HomePageData["impactSection"]>;
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="impact-section" // Dodane ID
        className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
        aria-labelledby="impact-heading"
      >
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig.once}
            variants={staggerContainerVariant}
            className="mb-12 text-center sm:mb-16 md:mb-20 lg:mb-24"
          >
            <m.div variants={headingVariant}>{children}</m.div>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {/* Teraz ten mapping jest w 100% bezpieczny */}
            {impactData.impactCards.map((card, index) => (
              <ImpactCardComponent key={card.title} card={card} index={index} />
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

const ImpactCardComponent = ({
  card,
  index,
}: {
  card: ImpactCard;
  index: number;
}) => {
  return (
    <m.article
      variants={fadeInUpVariant}
      whileHover={{
        y: -8,
        transition: ultraSmoothSpring,
      }}
      className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 sm:rounded-3xl ${
        index === 2 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="relative aspect-3/4 overflow-hidden">
        <div className="h-full w-full">
          {card.image && (
            <Image
              src={urlFor(card.image).width(600).height(800).quality(90).url()}
              // ZMIANA: Zaktualizowano nazwę pola
              alt={card.altText}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              placeholder="blur"
              blurDataURL={urlFor(card.image)
                .width(20)
                .height(27)
                .blur(10)
                .url()}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/90 via-raisinBlack/50 to-transparent" />
        <div className="absolute inset-0 bg-arylideYellow/0 transition-colors duration-300 group-hover:bg-arylideYellow/10" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
        <div className="mb-3 h-1 w-12 bg-arylideYellow/50 transition-all duration-300 group-hover:w-20 group-hover:bg-arylideYellow sm:mb-4" />
        <h3 className="mb-1 text-lg font-bold text-white transition-colors duration-300 group-hover:text-arylideYellow sm:mb-3 sm:text-2xl md:text-3xl">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/90 sm:text-base md:leading-relaxed">
          {/* ZMIANA: Zaktualizowano nazwę pola */}
          {card.description}
        </p>
      </div>
    </m.article>
  );
};