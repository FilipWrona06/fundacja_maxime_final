"use client";

import { motion } from "framer-motion";
import type { GaleriaPageData } from "@/lib/types";

// 1. Zmieniamy nazwę propsa z 'hero' na 'heroData'
interface Props {
  heroData: GaleriaPageData["heroSection"];
}

// 2. W parametrach komponentu również używamy 'heroData'
export default function GalleryHeroSectionClient({ heroData }: Props) {
  return (
    <header className="mb-20 text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow"
      >
        {/* 3. Używamy 'heroData' w całym JSX */}
        {heroData.badge}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl"
      >
        <span className="font-youngest text-arylideYellow block">
          {heroData.headingLine1}
        </span>
        <span className="block">{heroData.headingLine2}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto max-w-2xl text-xl text-white/60"
      >
        {heroData.description}
      </motion.p>
    </header>
  );
}