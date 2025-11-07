'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import type { HomePageData } from '@/lib/types';

export const HeroSection = ({ heroData }: { heroData: HomePageData['heroSection'] }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const heroY = useTransform(smoothProgress, [0, 1], [0, 300]);

  const scrollToContent = useCallback(() => {
    // Upewnij się, że element docelowy istnieje w Twoim kodzie HTML, np. w kolejnej sekcji
    document.querySelector('#stats-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      
      {/* Wideo w tle z danymi z Sanity */}
      <motion.video
        style={{ scale: heroScale }}
        poster={heroData.posterUrl}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src={heroData.videoWebmUrl} type="video/webm" />
        <source src={heroData.videoMp4Url} type="video/mp4" />
      </motion.video>

      {/* Przyciemniająca nakładka */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-raisinBlack/50 via-raisinBlack/70 to-raisinBlack" />

      {/* Główna treść sekcji */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="container relative z-10 mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-arylideYellow/40 bg-arylideYellow/10 px-6 py-2.5 text-sm font-medium tracking-wide text-arylideYellow backdrop-blur-md shadow-lg shadow-arylideYellow/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-arylideYellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-arylideYellow"></span>
            </span>
            <time dateTime="2022">{heroData.badgeText}</time>
          </span>
        </motion.div>
        
        <h1 id="hero-heading" className="mb-12">
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="block mb-6 font-youngest text-arylideYellow text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] tracking-tight"
          >
            {heroData.headingPart1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-white font-youngest text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] tracking-tight"
          >
            {heroData.headingPart2}
          </motion.span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl"
        >
          {heroData.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/wydarzenia" className="group relative inline-flex items-center gap-3 rounded-full bg-arylideYellow px-10 py-5 text-base font-bold text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-all duration-300 hover:shadow-arylideYellow/50">
              <span className="relative">Nadchodzące koncerty</span>
              <FiArrowRight className="relative transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/kontakt" className="group inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/5 px-10 py-5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-arylideYellow/60 hover:bg-white/10">
              Skontaktuj się z nami
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Przycisk przewijania w dół */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }} 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="absolute bottom-12 cursor-pointer" 
        aria-label="Przewiń w dół do treści"
      >
        <FiArrowDown size={36} className="text-arylideYellow/80" aria-hidden="true" />
      </motion.button>
    </section>
  );
};