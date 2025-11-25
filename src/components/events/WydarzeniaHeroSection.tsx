// Plik: src/components/events/WydarzeniaHeroSection.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { FiCalendar, FiMusic } from "react-icons/fi";
import { 
  premiumEase, 
  elegantEase,
  durations,
  blurValues,
  staggerConfig
} from "@/lib/animations";

interface WydarzeniaHeroProps {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  badgeText: string;
}

// --- ULTRA-SMOOTH WARIANTY ANIMACJI ---
const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: blurValues.normal },
  visible: {
    opacity: 1,
    y: 0,
    filter: blurValues.none,
    transition: {
      duration: durations.slow,
      ease: premiumEase,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.slow,
      delayChildren: 0.15,
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
        {/* TŁO DEKORACYJNE Z MEGA SMOOTH BLUR */}
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: durations.ultra, ease: elegantEase }}
            className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-arylideYellow/8 blur-[140px]"
          />
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: durations.ultra, delay: 0.3, ease: elegantEase }}
            className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-oxfordBlue/15 blur-[160px]"
          />
          
          {/* Animated radial glow */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.03, 0.06, 0.03] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="pointer-events-none absolute inset-0 bg-radial-gradient from-arylideYellow/5 via-transparent to-transparent"
          />
          
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
          {/* PREMIUM BADGE */}
          <m.div
            variants={fadeInUpVariant}
            className="mb-8 flex justify-center"
          >
            <div className="group relative flex items-center gap-3 rounded-full border border-arylideYellow/20 bg-linear-to-r from-arylideYellow/8 to-arylideYellow/4 px-5 py-2 backdrop-blur-xl transition-all duration-500 hover:border-arylideYellow/40 hover:from-arylideYellow/12 hover:to-arylideYellow/6 hover:shadow-lg hover:shadow-arylideYellow/10">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-arylideYellow/0 via-arylideYellow/5 to-arylideYellow/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <span className="relative flex items-center justify-center text-arylideYellow">
                <FiCalendar className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  {badgeText}
                </span>
              </span>
            </div>
          </m.div>

          {/* NAGŁÓWEK H1 Z GRADIENT TEXT */}
          <m.h1 variants={fadeInUpVariant} className="relative mb-8">
            <span className="block font-youngest text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl transition-all duration-700 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              {titleLine1}
            </span>
            <span className="block font-youngest text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight bg-linear-to-r from-arylideYellow via-arylideYellow to-arylideYellow/80 bg-clip-text text-transparent drop-shadow-2xl transition-all duration-700 hover:drop-shadow-[0_0_30px_rgba(239,213,111,0.4)]">
              {titleLine2}
            </span>

            {/* Floating Music Icon */}
            <m.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                rotate: 0, 
                scale: 1,
                y: [0, -10, 0]
              }}
              transition={{ 
                opacity: { duration: durations.ultra, delay: 0.6, ease: elegantEase },
                rotate: { duration: durations.ultra, delay: 0.6, ease: elegantEase },
                scale: { duration: durations.ultra, delay: 0.6, ease: elegantEase },
                y: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }
              }}
              className="absolute -right-8 -top-12 -z-10 hidden text-white/4 lg:block mix-blend-overlay pointer-events-none"
            >
              <FiMusic size={250} />
            </m.div>
          </m.h1>

          {/* OPIS Z SUBTLE FADE */}
          <m.p
            variants={fadeInUpVariant}
            className="mx-auto max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-white/70 transition-colors duration-500 hover:text-white/85 sm:text-xl"
          >
            {subtitle}
          </m.p>

          {/* ULTRA-SMOOTH SCROLL INDICATOR */}
          <m.div
            variants={fadeInUpVariant}
            className="mt-20 flex justify-center sm:mt-24"
          >
            <div className="group flex flex-col items-center gap-3 opacity-40 transition-opacity duration-500 hover:opacity-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white transition-colors duration-500 group-hover:text-arylideYellow">
                Scrolluj w dół
              </span>
              <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white/20 p-2 backdrop-blur-sm transition-all duration-500 group-hover:border-arylideYellow/30 group-hover:bg-arylideYellow/5">
                <m.div
                  animate={{ 
                    y: [0, 12, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: elegantEase,
                  }}
                  className="h-2 w-1 rounded-full bg-linear-to-b from-arylideYellow to-arylideYellow/50 shadow-lg shadow-arylideYellow/30"
                />
              </div>
            </div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};