// Plik: src/components/events/WydarzeniaHeroSection.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { FiCalendar, FiMusic } from "react-icons/fi";
// Upewnij się, że masz ten plik. Jeśli nie, usuń import i użyj wariantu zapasowego poniżej.
import { premiumEase } from "@/lib/animations";

interface WydarzeniaHeroProps {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  badgeText: string;
}

// --- WARIANTY ANIMACJI ---
const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      // Fallback: [0.25, 1, 0.5, 1] to standardowy "easeOutQuart/Quint"
      ease: premiumEase || [0.25, 1, 0.5, 1],
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
        className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32"
      >
        {/* --- TŁO DEKORACYJNE --- */}
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-arylideYellow/10 blur-[120px]"
          />
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-oxfordBlue/20 blur-[150px]"
          />
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </div>

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
            <span className="block font-youngest text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl">
              {titleLine1}
            </span>
            <span className="block font-youngest text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-arylideYellow drop-shadow-2xl">
              {titleLine2}
            </span>

            <m.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute -right-8 -top-12 -z-10 hidden text-white/5 lg:block mix-blend-overlay pointer-events-none"
            >
              <FiMusic size={250} />
            </m.div>
          </m.h1>

          {/* --- OPIS --- */}
          <m.p
            variants={fadeInUpVariant}
            // DODANO: whitespace-pre-wrap, aby entery z CMS były widoczne
            className="mx-auto max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {subtitle}
          </m.p>

          {/* --- SCROLL INDICATOR --- */}
          <m.div
            variants={fadeInUpVariant}
            className="mt-20 flex justify-center sm:mt-24"
          >
            <div className="flex flex-col items-center gap-3 opacity-50 transition-opacity hover:opacity-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Scrolluj w dół
              </span>
              <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white/20 p-2 backdrop-blur-sm">
                <m.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-2 w-1 rounded-full bg-arylideYellow"
                />
              </div>
            </div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};