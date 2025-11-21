// Plik: src/components/home/ImpactSection.client.tsx

"use client";

import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react"; // DODANO: useRef i useState

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

// ... (Warianty animacji bez zmian) ...
const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerConfig.normal, delayChildren: 0.1 },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
};

const mobileCardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

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
  // NOWE: Stan dla aktywnego indeksu i ref do kontenera
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // NOWE: Funkcja obsługująca scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    // Pobieramy szerokość pierwszej karty (lub przybliżoną szerokość widoku)
    // Dzielenie scrolla przez szerokość karty daje nam przybliżony indeks
    const cardWidth =
      container.children[0]?.clientWidth || container.clientWidth * 0.75;

    // Obliczamy indeks (Math.round zaokrągla do najbliższej liczby całkowitej)
    const newIndex = Math.round(scrollLeft / cardWidth);

    // Zabezpieczenie, aby indeks nie wyszedł poza zakres tablicy
    const clampedIndex = Math.min(
      Math.max(newIndex, 0),
      impactData.impactCards.length - 1,
    );

    setActiveIndex(clampedIndex);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig.once}
        variants={staggerContainerVariant}
        className="mb-10 text-center sm:mb-16 md:mb-20 lg:mb-24"
      >
        <m.div variants={headingVariant}>{children}</m.div>
      </m.div>

      {/* --- WIDOK MOBILNY / TABLET (< lg) --- */}
      <div className="lg:hidden">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerVariant}
          className="relative -mx-6 px-6"
        >
          <div
            ref={scrollContainerRef} // NOWE: Przypisanie Ref
            onScroll={handleScroll} // NOWE: Nasłuchiwanie scrolla
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {impactData.impactCards.map((card, index) => (
              <m.article
                key={card.title}
                variants={mobileCardVariant}
                className="group relative flex shrink-0 snap-center flex-col overflow-hidden rounded-2xl shadow-xl"
                style={{
                  width: index === 0 ? "85vw" : "75vw",
                  maxWidth: "400px",
                }}
              >
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  {card.image && (
                    <Image
                      src={urlFor(card.image)
                        .width(500)
                        .height(625)
                        .quality(90)
                        .url()}
                      alt={card.altText}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 400px"
                      className="object-cover transition-transform duration-700"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={urlFor(card.image)
                        .width(20)
                        .height(25)
                        .blur(10)
                        .url()}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/95 via-raisinBlack/60 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="mb-3 h-1 w-12 bg-arylideYellow/50" />
                  <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">
                    {card.title}
                  </h3>
                  <div className="text-sm leading-relaxed text-white/90 line-clamp-4">
                    <PortableText
                      value={card.description as PortableTextContent}
                      components={impactPortableTextComponents}
                    />
                  </div>
                </div>
              </m.article>
            ))}
          </div>

          {/* Wskaźniki Scrolla - POPRAWIONE LOGIKA */}
          <div className="mt-4 flex justify-center gap-1.5">
            {impactData.impactCards.map((card, i) => (
              <div
                key={card.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  // NOWE: Porównujemy z activeIndex zamiast sztywnego 0
                  i === activeIndex
                    ? "w-8 bg-arylideYellow"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </m.div>
      </div>

      {/* --- WIDOK DESKTOP (>= lg) --- */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainerVariant}
        className="hidden lg:grid grid-cols-3 gap-8"
      >
        {impactData.impactCards.map((card, index) => (
          <ImpactCardComponent key={card.title} card={card} index={index} />
        ))}
      </m.div>
    </LazyMotion>
  );
};

// Komponent karty dla widoku Desktop (bez zmian)
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
      className={`group relative flex flex-col overflow-hidden rounded-3xl shadow-xl transition-all duration-300 ${
        index === 2 ? "col-span-1" : ""
      }`}
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <div className="h-full w-full">
          {card.image && (
            <Image
              src={urlFor(card.image).width(600).height(750).quality(90).url()}
              alt={card.altText}
              fill
              sizes="33vw"
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

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="mb-4 h-1 w-12 bg-arylideYellow/50 transition-all duration-300 group-hover:w-20 group-hover:bg-arylideYellow" />
        <h3 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-arylideYellow md:text-3xl">
          {card.title}
        </h3>
        <div className="text-base leading-relaxed text-white/90 md:leading-relaxed">
          <PortableText
            value={card.description as PortableTextContent}
            components={impactPortableTextComponents}
          />
        </div>
      </div>
    </m.article>
  );
};
