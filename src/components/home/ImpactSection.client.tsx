// Plik: src/components/home/ImpactSection.client.tsx (wersja zrefaktoryzowana)

"use client";

import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Image from "next/image";

import {
  premiumEase,
  staggerConfig,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";
import type {
  HomePageData,
  ImpactCard,
  PortableTextContent,
} from "@/lib/types/index";
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

// Konfiguracja Portable Text do obsługi linków w opisach kart
const impactPortableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-arylideYellow underline transition-colors hover:text-arylideYellow/80"
        >
          {children}
        </a>
      );
    },
  },
};

export const ImpactSectionClient = ({
  impactData,
  children,
}: {
  impactData: NonNullable<HomePageData["impactSection"]>;
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      {/* Używamy React.Fragment (<>), ponieważ komponent renderuje dwa równorzędne bloki */}
      {/* Blok 1: Animowany nagłówek */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig.once}
        variants={staggerContainerVariant}
        className="mb-12 text-center sm:mb-16 md:mb-20 lg:mb-24"
      >
        <m.div variants={headingVariant}>{children}</m.div>
      </m.div>

      {/* Blok 2: Animowana siatka z kartami */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainerVariant}
        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
      >
        {impactData.impactCards.map((card, index) => (
          <ImpactCardComponent key={card.title} card={card} index={index} />
        ))}
      </m.div>
    </LazyMotion>
  );
};

// Komponent podrzędny dla karty pozostaje bez żadnych zmian
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
      className={`group relative flex flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-300 sm:rounded-3xl ${
        index === 2 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <div className="h-full w-full">
          {card.image && (
            <Image
              src={urlFor(card.image).width(600).height(750).quality(90).url()}
              alt={card.altText}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              placeholder="blur"
              blurDataURL={urlFor(card.image)
                .width(20)
                .height(25)
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
        <div className="text-sm leading-relaxed text-white/90 sm:text-base md:leading-relaxed">
          <PortableText
            value={card.description as PortableTextContent} // Użyj asercji typu, jeśli jest potrzebna
            components={impactPortableTextComponents}
          />
        </div>
      </div>
    </m.article>
  );
};
