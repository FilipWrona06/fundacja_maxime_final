// Plik: src/components/home/ImpactSection.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
// Dodajemy import typu dla ikon
import type { IconType } from "react-icons";
import { FiArrowRight, FiCalendar, FiCamera, FiFileText } from "react-icons/fi";

import {
  premiumEase,
  staggerConfig,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";
import type {
  EventType,
  Gallery,
  NewsArticleType,
  SanityImage,
} from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Warianty animacji
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

// --- POPRAWIONA DEFINICJA TYPU KARTY ---
interface ImpactCardItem {
  title: string;
  subtitle: string;
  description: string;
  image: SanityImage;
  link: string;
  icon: IconType; // Zmiana z React.ElementType na IconType
  color?: string;
}

interface ImpactDynamicData {
  headingPrefix?: string;
  headingHighlighted: string;
  subheading: string;
  upcomingEvent: EventType | null;
  latestNews: NewsArticleType | null;
  latestGallery: Gallery | null;
}

export const ImpactSectionClient = ({
  impactData,
  children,
}: {
  impactData: ImpactDynamicData;
  children: React.ReactNode;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Przygotowanie surowej tablicy z danymi (może zawierać null)
  const rawCards = [
    // Karta 1: Najbliższe Wydarzenie
    impactData.upcomingEvent
      ? {
          title: "Najbliższe Wydarzenie",
          subtitle: impactData.upcomingEvent.title,
          description: `${impactData.upcomingEvent.dateDisplay} • ${impactData.upcomingEvent.location}`,
          image: impactData.upcomingEvent.image,
          link: `/wydarzenia/${impactData.upcomingEvent.slug.current}`,
          icon: FiCalendar,
        }
      : null,

    // Karta 2: Najnowszy News
    impactData.latestNews
      ? {
          title: "Najnowszy Artykuł",
          subtitle: impactData.latestNews.title,
          description: `${impactData.latestNews.excerpt.slice(0, 80)}...`,
          image: impactData.latestNews.image,
          link: `/aktualnosci/${impactData.latestNews.slug.current}`,
          icon: FiFileText,
        }
      : null,

    // Karta 3: Najnowsza Galeria
    impactData.latestGallery
      ? {
          title: "Ostatnie Wydarzenie",
          subtitle: impactData.latestGallery.title,
          description: `${new Date(impactData.latestGallery.date).toLocaleDateString("pl-PL")} • ${impactData.latestGallery.location}`,
          image: impactData.latestGallery.images?.[0] as SanityImage,
          link: `/galeria#${impactData.latestGallery.slug.current}`,
          icon: FiCamera,
        }
      : null,
  ];

  // Filtrowanie nulli i przypisanie poprawnego typu
  const cards: ImpactCardItem[] = rawCards.filter(
    (card): card is ImpactCardItem => Boolean(card),
  );

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth =
      container.children[0]?.clientWidth || container.clientWidth * 0.75;
    const newIndex = Math.round(scrollLeft / cardWidth);
    const clampedIndex = Math.min(Math.max(newIndex, 0), cards.length - 1);
    setActiveIndex(clampedIndex);
  };

  // Jeśli nie ma żadnych kart, nie renderujemy sekcji (opcjonalne zabezpieczenie)
  if (cards.length === 0) return null;

  return (
    <LazyMotion features={domAnimation}>
      {/* Nagłówek */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig.once}
        variants={staggerContainerVariant}
        className="mb-10 text-center sm:mb-16 md:mb-20 lg:mb-24"
      >
        <m.div variants={headingVariant}>{children}</m.div>
      </m.div>

      {/* Widok Mobilny */}
      <div className="lg:hidden">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerVariant}
          className="relative -mx-6 px-6"
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {cards.map((card, index) => (
              <m.article
                key={card.title}
                variants={mobileCardVariant}
                className="group relative flex shrink-0 snap-center flex-col overflow-hidden rounded-2xl shadow-xl"
                style={{
                  width: index === 0 ? "85vw" : "75vw",
                  maxWidth: "400px",
                }}
              >
                <Link href={card.link} className="block h-full">
                  <div className="relative aspect-4/5 w-full overflow-hidden">
                    <Image
                      src={urlFor(card.image)
                        .width(500)
                        .height(625)
                        .quality(90)
                        .url()}
                      alt={card.subtitle}
                      fill
                      sizes="(max-width: 640px) 85vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={urlFor(card.image)
                        .width(20)
                        .height(25)
                        .blur(10)
                        .url()}
                    />
                    <div
                      className={`absolute inset-0 bg-linear-to-t ${card.color || ""} to-raisinBlack/95`}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <card.icon className="text-arylideYellow" size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider text-arylideYellow/80">
                        {card.title}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl line-clamp-2">
                      {card.subtitle}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/90 line-clamp-2 mb-3">
                      {card.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-arylideYellow group-hover:gap-3 transition-all duration-300">
                      Zobacz więcej <FiArrowRight />
                    </div>
                  </div>
                </Link>
              </m.article>
            ))}
          </div>

          {/* Wskaźniki */}
          <div className="mt-4 flex justify-center gap-1.5">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-arylideYellow"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </m.div>
      </div>

      {/* Widok Desktop */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariant}
        className="hidden lg:grid grid-cols-3 gap-8"
      >
        {cards.map((card, index) => (
          <ImpactCardComponent key={card.title} card={card} index={index} />
        ))}
      </m.div>
    </LazyMotion>
  );
};

// Komponent karty Desktop
const ImpactCardComponent = ({
  card,
}: {
  card: ImpactCardItem;
  index: number;
}) => {
  return (
    <m.article
      variants={fadeInUpVariant}
      whileHover={{ y: -8, transition: ultraSmoothSpring }}
      className="group relative flex flex-col overflow-hidden rounded-3xl shadow-xl"
    >
      <Link href={card.link} className="block h-full">
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src={urlFor(card.image).width(600).height(750).quality(90).url()}
            alt={card.subtitle}
            fill
            sizes="33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL={urlFor(card.image).width(20).height(25).blur(10).url()}
          />
          <div
            className={`absolute inset-0 bg-linear-to-t ${card.color || ""} to-raisinBlack/90`}
          />
          <div className="absolute inset-0 bg-arylideYellow/0 transition-colors duration-300 group-hover:bg-arylideYellow/10" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mb-4 flex items-center gap-3">
            <card.icon className="text-arylideYellow" size={24} />
            <span className="text-xs font-bold uppercase tracking-wider text-arylideYellow/80">
              {card.title}
            </span>
          </div>
          <div className="mb-4 h-1 w-12 bg-arylideYellow/50 transition-all duration-300 group-hover:w-20 group-hover:bg-arylideYellow" />
          <h3 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-arylideYellow md:text-3xl line-clamp-2">
            {card.subtitle}
          </h3>
          <p className="text-base leading-relaxed text-white/90 md:leading-relaxed line-clamp-2 mb-4">
            {card.description}
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-arylideYellow group-hover:gap-3 transition-all duration-300">
            Zobacz więcej <FiArrowRight />
          </div>
        </div>
      </Link>
    </m.article>
  );
};
