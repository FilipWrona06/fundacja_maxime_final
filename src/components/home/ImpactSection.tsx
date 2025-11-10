"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import { smoothSpring } from "@/lib/animations";
import type { HomePageData } from "@/lib/types";
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

export const ImpactSection = ({
  impactData,
}: {
  impactData: HomePageData["impactSection"];
}) => {
  return (
    <section className="py-32" aria-labelledby="impact-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariant}
          className="mb-20 text-center"
        >
          <motion.h2
            id="impact-heading"
            variants={fadeInUpVariant}
            className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
          >
            Nasz{" "}
            <span className="font-youngest text-arylideYellow">
              {impactData.heading}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUpVariant}
            className="mx-auto max-w-2xl text-xl text-white/60"
          >
            {impactData.subheading}
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerVariant}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {impactData.impactCards.map((card, index) => (
            <motion.article
              key={card.title}
              variants={fadeInUpVariant}
              whileHover={{ y: -10 }}
              transition={smoothSpring}
              className={`group relative overflow-hidden rounded-3xl ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="relative aspect-3/4">
                {card.image && (
                  <Image
                    src={urlFor(card.image).width(400).height(533).url()}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/40 to-transparent" />
                <motion.div className="absolute inset-0 bg-arylideYellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="mb-2 text-2xl font-bold group-hover:text-arylideYellow transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-white/70 group-hover:text-white transition-colors duration-300">
                  {card.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
