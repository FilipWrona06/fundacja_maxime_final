"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import Image from "next/image";

import { gentleSpring, smoothSpring } from "@/lib/animations";
import type { HomePageData, TimelineEvent } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainerVariant: Variants = {
  // ZMIANA: Dodano dla płynniejszego wejścia
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const TimelineSectionClient = ({
  timelineData,
  children,
}: {
  timelineData: HomePageData["timelineSection"];
  children: React.ReactNode;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="historia-section"
        // ZMIANA (RWD): Zmniejszono padding na małych ekranach
        className="relative overflow-hidden py-24 md:py-32"
        aria-labelledby="timeline-heading"
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-oxfordBlue/10 to-transparent" />
        <div className="container relative mx-auto px-6">
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

          <div className="relative mx-auto max-w-5xl">
            {/* ZMIANA (RWD): Dopasowano pozycję linii na małych ekranach */}
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-linear-to-b from-arylideYellow/50 via-arylideYellow/20 to-transparent md:left-8 md:block" />
            {/* ZMIANA (RWD): Zmniejszono odstępy na małych ekranach */}
            <div className="space-y-12 md:space-y-16">
              {timelineData.timelineEvents.map((item: TimelineEvent) => (
                <m.article
                  key={item.year}
                  initial="hidden"
                  whileInView="visible"
                  // ZMIANA: Zmniejszono `amount` dla szybszego startu animacji
                  viewport={{ once: true, amount: 0.2 }}
                  variants={staggerContainerVariant}
                  className="relative grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-12"
                >
                  {/* Kolumna z rokiem (tylko desktop) */}
                  <div className="hidden items-start pt-1 md:flex">
                    <m.div
                      variants={fadeInUpVariant}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={smoothSpring}
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-arylideYellow bg-raisinBlack"
                    >
                      <span className="font-youngest text-2xl text-arylideYellow">
                        {item.year}
                      </span>
                    </m.div>
                  </div>

                  {/* Kolumna z treścią */}
                  <div>
                    <time
                      dateTime={item.fullYear}
                      className="mb-2 inline-block font-youngest text-3xl text-arylideYellow md:hidden"
                    >
                      {item.fullYear}
                    </time>
                    <m.h3
                      variants={fadeInUpVariant}
                      className="mb-4 text-3xl font-bold"
                    >
                      {item.title}
                    </m.h3>
                    <m.p
                      variants={fadeInUpVariant}
                      // ZMIANA (RWD): Zmniejszono tekst na małych ekranach
                      className="mb-6 text-base leading-relaxed text-white/70 md:text-lg"
                    >
                      {item.text}
                    </m.p>
                    <m.div
                      variants={fadeInUpVariant}
                      whileHover={{ scale: 1.02 }}
                      transition={gentleSpring}
                      className="overflow-hidden rounded-2xl"
                    >
                      {item.image && (
                        <Image
                          src={urlFor(item.image).width(800).height(450).url()}
                          alt={item.alt}
                          width={800}
                          height={450}
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="h-auto w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </m.div>
                  </div>
                </m.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};