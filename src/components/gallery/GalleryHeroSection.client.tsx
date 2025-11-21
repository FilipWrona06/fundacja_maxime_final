"use client";

// Import komponentu do renderowania tekstu z edytora Sanity
import { PortableText } from "@portabletext/react";
import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { premiumEase } from "@/lib/animations";
import type { GaleriaPageData } from "@/lib/types/index";

interface Props {
  // TypeScript automatycznie pobierze poprawny typ 'description: PortableTextContent'
  heroData: GaleriaPageData["heroSection"];
}

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function GalleryHeroSectionClient({ heroData }: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariant}
        className="relative overflow-hidden py-16 sm:py-20"
      >
        {/* Background blurs */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: premiumEase }}
          className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-arylideYellow/8 blur-3xl"
        />
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: premiumEase }}
          className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-oxfordBlue/12 blur-3xl"
        />

        <div className="relative z-10 text-center">
          {/* Badge */}
          <m.div
            variants={fadeInUpVariant}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-linear-to-r from-transparent to-arylideYellow" />
            <span className="inline-flex items-center gap-2 rounded-full border border-arylideYellow/30 bg-arylideYellow/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-arylideYellow backdrop-blur-sm sm:px-6 sm:text-sm">
              {heroData.badge}
            </span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-arylideYellow" />
          </m.div>

          {/* Main Heading */}
          <m.h1 variants={fadeInUpVariant} className="mb-6 space-y-1">
            <span className="block mb-8 font-youngest text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tight text-arylideYellow drop-shadow-2xl">
              {heroData.headingLine1}
            </span>
            <span className="block font-youngest text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl">
              {heroData.headingLine2}
            </span>
          </m.h1>

          {/* Description - PortableText */}
          <m.div
            variants={fadeInUpVariant}
            // Dodano style dla akapitów [&>p]:mb-4, aby tekst z edytora wyglądał dobrze
            className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:max-w-3xl md:text-xl [&>p]:mb-4 last:[&>p]:mb-0"
          >
            {heroData.description && (
              <PortableText value={heroData.description} />
            )}
          </m.div>

          {/* Decorative line */}
          <m.div
            variants={fadeInUpVariant}
            className="mx-auto mt-8 flex items-center justify-center gap-3"
          >
            <m.span
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.8, delay: 0.8, ease: premiumEase }}
              className="h-px bg-linear-to-r from-transparent to-arylideYellow"
            />
            <span className="h-1.5 w-1.5 rounded-full bg-arylideYellow shadow-lg shadow-arylideYellow/50" />
            <m.span
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.8, delay: 0.8, ease: premiumEase }}
              className="h-px bg-linear-to-l from-transparent to-arylideYellow"
            />
          </m.div>
        </div>
      </m.header>
    </LazyMotion>
  );
}
