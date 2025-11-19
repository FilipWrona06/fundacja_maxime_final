// Plik: src/components/home/TimelineSection.client.tsx (wersja zrefaktoryzowana)

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
  PortableTextContent,
  TimelineEvent,
} from "@/lib/types";
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

const yearBadgeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: premiumEase,
    },
  },
};

const lineDrawVariant: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: premiumEase,
    },
  },
};

// Konfiguracja Portable Text do obsługi linków
const timelinePortableTextComponents: PortableTextComponents = {
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

export const TimelineSectionClient = ({
  timelineData,
  children,
}: {
  timelineData: NonNullable<HomePageData["timelineSection"]>;
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

      {/* Blok 2: Animowana oś czasu */}
      <div className="relative mx-auto max-w-5xl">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={lineDrawVariant}
          className="absolute left-4 top-0 hidden h-full w-0.5 origin-top md:left-8 md:block lg:left-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(233,215,88,0.6), rgba(233,215,88,0.3), rgba(233,215,88,0.1), transparent)",
          }}
        />
        <div className="space-y-10 sm:space-y-12 md:space-y-16 lg:space-y-20">
          {timelineData.timelineEvents.map((item, index) => (
            <TimelineEventComponent
              key={item.year}
              item={item}
              isLast={index === timelineData.timelineEvents.length - 1}
            />
          ))}
        </div>
      </div>
    </LazyMotion>
  );
};

// Komponent podrzędny dla wydarzenia na osi czasu pozostaje bez żadnych zmian
const TimelineEventComponent = ({
  item,
  isLast,
}: {
  item: TimelineEvent;
  isLast: boolean;
}) => {
  return (
    <m.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig.once}
      variants={staggerContainerVariant}
      className="relative grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-10 lg:gap-12"
    >
      <div className="hidden items-start pt-1 md:flex">
        <m.div
          variants={yearBadgeVariant}
          whileHover={{
            scale: 1.1,
            transition: ultraSmoothSpring,
          }}
          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-arylideYellow bg-raisinBlack shadow-lg transition-shadow duration-300 hover:shadow-arylideYellow/30 lg:h-20 lg:w-20"
        >
          <span className="relative z-10 font-youngest text-2xl text-arylideYellow lg:text-3xl">
            {`'${item.year.toString().slice(-2)}`}
          </span>
        </m.div>
      </div>
      <div className="group/content relative">
        <m.time
          variants={fadeInUpVariant}
          dateTime={item.year.toString()}
          className="mb-2 inline-block font-youngest text-3xl text-arylideYellow sm:mb-4 sm:text-4xl md:hidden"
        >
          {item.year.toString()}
        </m.time>
        <m.h3
          variants={fadeInUpVariant}
          className="mb-2 text-[1.25rem] font-semibold transition-colors duration-300 group-hover/content:text-arylideYellow sm:mb-4 sm:text-3xl lg:text-4xl"
        >
          {item.title}
        </m.h3>
        <m.div variants={fadeInUpVariant} className="mb-2 sm:mb-6">
          <div className="prose prose-invert max-w-none text-[0.9rem] leading-relaxed text-white/90 sm:text-lg md:leading-relaxed lg:text-xl">
            <PortableText
              value={item.description as PortableTextContent} // Użyj asercji typu, jeśli jest potrzebna
              components={timelinePortableTextComponents}
            />
          </div>
        </m.div>
        <m.div
          variants={fadeInUpVariant}
          whileHover={{ y: -6, transition: ultraSmoothSpring }}
          className="group/image relative overflow-hidden rounded-xl shadow-xl sm:rounded-2xl lg:rounded-3xl"
        >
          {item.image && (
            <div className="relative">
              <Image
                src={urlFor(item.image)
                  .width(1000)
                  .height(563)
                  .quality(90)
                  .url()}
                alt={item.altText}
                width={1000}
                height={563}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                loading="lazy"
                placeholder="blur"
                blurDataURL={urlFor(item.image)
                  .width(20)
                  .height(11)
                  .blur(10)
                  .url()}
              />
              <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/40 to-transparent" />
              <div className="absolute inset-0 bg-arylideYellow/0 transition-colors duration-300 group-hover/image:bg-arylideYellow/10" />
            </div>
          )}
        </m.div>
        {!isLast && (
          <div className="absolute -bottom-8 left-0 hidden h-16 w-px bg-linear-to-b from-arylideYellow/20 to-transparent md:-left-10 md:block lg:-left-12" />
        )}
      </div>
    </m.article>
  );
};
