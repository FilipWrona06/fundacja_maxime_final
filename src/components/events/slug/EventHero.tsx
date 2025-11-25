// Plik: src/components/events/slug/EventHero.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { FiMusic } from "react-icons/fi";
import { 
  premiumEase, 
  elegantEase,
  durations, 
  blurValues,
  staggerConfig 
} from "@/lib/animations";

interface EventHeroAnimationProps {
  children: React.ReactNode;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.slow,
      delayChildren: 0.15,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: blurValues.strong,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: blurValues.none,
    transition: {
      duration: durations.verySlow,
      ease: premiumEase,
    },
  },
};

const progressBarVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: durations.ultra,
      delay: 0.8,
      ease: elegantEase,
    },
  },
};

export const EventHeroAnimation = ({ children }: EventHeroAnimationProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative z-10 h-full w-full">
        {/* Kontener layoutu: Flexbox ustawia treści na dole */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto flex h-full flex-col items-start justify-end px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8"
        >
          {/* Wrapper dla tekstów (H1 i P przekazanych jako children) */}
          <m.div variants={textVariants} className="relative max-w-5xl">
            {/* Floating decorative icon z smooth animation */}
            <m.div
              initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.1, 0.1], 
                rotate: 0, 
                scale: 1,
                y: [0, -15, 0]
              }}
              transition={{ 
                opacity: { duration: durations.ultra, delay: 0.5, ease: elegantEase },
                rotate: { duration: durations.ultra, delay: 0.5, ease: elegantEase },
                scale: { duration: durations.ultra, delay: 0.5, ease: elegantEase },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }
              }}
              className="pointer-events-none absolute -left-20 -top-24 -z-10 hidden text-arylideYellow/8 mix-blend-overlay md:block"
            >
              <FiMusic size={200} />
            </m.div>

            {/* Glow effect za tekstem */}
            <div className="pointer-events-none absolute -left-10 top-0 -z-10 h-full w-[120%] bg-linear-to-r from-arylideYellow/3 via-transparent to-transparent blur-3xl" />

            {/* Tutaj wstrzykujemy H1 i P z serwera */}
            {children}
          </m.div>

          {/* Premium progress bar z gradient */}
          <m.div
            variants={progressBarVariants}
            className="relative mt-10 h-1 w-32 overflow-hidden rounded-full"
            style={{ originX: 0 }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-arylideYellow via-arylideYellow to-arylideYellow/60" />
            <m.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5,
              }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
            />
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  );
};