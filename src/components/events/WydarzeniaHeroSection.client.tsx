// Plik: src/components/wydarzenia/WydarzeniaHeroSection.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { FiCalendar, FiMusic } from "react-icons/fi";
import { premiumEase } from "@/lib/animations";

interface WydarzeniaHeroProps {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  badgeText: string;
}

// Warianty animacji spójne z resztą projektu
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
      delayChildren: 0.1,
    },
  },
};

export const WydarzeniaHeroSectionClient = ({
  titleLine1,
  titleLine2,
  subtitle,
  badgeText,
}: WydarzeniaHeroProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariant}
        className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
      >
        {/* --- TŁO DEKORACYJNE --- */}
        {/* Górna plama (zółta) */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: premiumEase }}
          className="pointer-events-none absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-arylideYellow/10 blur-[100px]"
        />
        {/* Dolna plama (ciemniejsza) */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: premiumEase }}
          className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-oxfordBlue/20 blur-[120px]"
        />
        
        {/* Tekstura ziarna (opcjonalnie, jeśli używasz w projekcie) */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />

        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
          {/* --- BADGE --- */}
          <m.div
            variants={fadeInUpVariant}
            className="mb-8 flex justify-center"
          >
            <div className="group flex items-center gap-3 rounded-full border border-arylideYellow/20 bg-arylideYellow/5 px-5 py-2 backdrop-blur-md transition-colors hover:border-arylideYellow/40 hover:bg-arylideYellow/10">
              <span className="flex items-center justify-center text-arylideYellow">
                <FiCalendar className="mr-2 h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  {badgeText}
                </span>
              </span>
            </div>
          </m.div>

          {/* --- NAGŁÓWEK H1 --- */}
          <m.h1 variants={fadeInUpVariant} className="relative mb-8">
            <span className="block font-youngest text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl">
              {titleLine1}
            </span>
            <span className="block font-youngest text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] tracking-tight text-arylideYellow drop-shadow-2xl">
              {titleLine2}
            </span>
            
            {/* Dekoracyjna ikona w tle tekstu */}
            <m.div 
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: premiumEase }}
              className="absolute -right-4 -top-8 -z-10 hidden text-white/5 lg:block"
            >
              <FiMusic size={200} />
            </m.div>
          </m.h1>

          {/* --- OPIS --- */}
          <m.p
            variants={fadeInUpVariant}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {subtitle}
          </m.p>

          {/* --- SCROLL INDICATOR --- */}
          <m.div
            variants={fadeInUpVariant}
            className="mt-16 flex justify-center"
          >
            <m.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-12 w-7 justify-center rounded-full border-2 border-white/20 p-2 backdrop-blur-sm"
            >
              <div className="h-2 w-1 rounded-full bg-arylideYellow" />
            </m.div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};