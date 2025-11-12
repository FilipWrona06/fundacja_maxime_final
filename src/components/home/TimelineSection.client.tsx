// src/components/home/TimelineSection.client.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import { gentleSpring, smoothSpring } from "@/lib/animations";
// POPRAWKA: Importujemy typ dla pojedynczego wydarzenia z osi czasu (załóżmy, że nazywa się TimelineEvent)
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
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const TimelineSectionClient = ({
  timelineData,
  children,
}: {
  // POPRAWKA: Używamy poprawnej właściwości 'timelineSection' z typu HomePageData
  timelineData: HomePageData["timelineSection"];
  children: React.ReactNode;
}) => {
  return (
    <section
      id="historia-section"
      className="relative py-32 overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-oxfordBlue/10 to-transparent" />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariant}
          className="mb-20 text-center"
        >
          {children}
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-linear-to-b from-arylideYellow/50 via-arylideYellow/20 to-transparent md:block" />
          <div className="space-y-16">
            {/* POPRAWKA: Dodajemy jawny typ 'TimelineEvent' dla 'item', aby rozwiązać błąd 'implicitly has an 'any' type'. */}
            {timelineData.timelineEvents.map((item: TimelineEvent) => (
              <motion.article
                key={item.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainerVariant}
                className="relative grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:gap-12"
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    variants={fadeInUpVariant}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={smoothSpring}
                    className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-arylideYellow bg-raisinBlack md:flex"
                  >
                    <span className="font-youngest text-2xl text-arylideYellow">
                      {item.year}
                    </span>
                  </motion.div>
                </div>
                <div>
                  <time
                    dateTime={item.fullYear}
                    className="mb-2 inline-block font-youngest text-3xl text-arylideYellow md:hidden"
                  >
                    {item.fullYear}
                  </time>
                  <motion.h3
                    variants={fadeInUpVariant}
                    className="mb-4 text-3xl font-bold"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    variants={fadeInUpVariant}
                    className="mb-6 text-lg leading-relaxed text-white/70"
                  >
                    {item.text}
                  </motion.p>
                  <motion.div
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
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};