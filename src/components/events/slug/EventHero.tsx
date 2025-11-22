// Plik: src/components/events/slug/EventHero.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import { FiMusic } from "react-icons/fi";
// Import Twojego easingu. Jeśli nie masz, usuń import i użyj stringa "easeOut"
import { premiumEase } from "@/lib/animations";

interface EventHeroAnimationProps {
  children: React.ReactNode;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: premiumEase || "easeOut",
    },
  },
};

export const EventHeroAnimation = ({ children }: EventHeroAnimationProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative z-10 h-full w-full">
        {/* Kontener layoutu: Flexbox ustawia treści na dole (items-end / justify-end) */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto flex h-full flex-col items-start justify-end px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8"
        >
          {/* Wrapper dla tekstów (H1 i P przekazanych jako children) */}
          <m.div variants={textVariants} className="relative max-w-4xl">
            {/* Dekoracyjna ikona w tle tekstu (tylko wizualna, client-side) */}
            <m.div
              initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute -left-16 -top-20 -z-10 hidden opacity-10 md:block text-arylideYellow mix-blend-overlay"
            >
              <FiMusic size={180} />
            </m.div>

            {/* Tutaj wstrzykujemy H1 i P z serwera */}
            {children}
          </m.div>

          {/* Dekoracyjny pasek postępu / scroll indicator */}
          <m.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
            className="mt-8 h-1 w-24 bg-arylideYellow"
          />
        </m.div>
      </div>
    </LazyMotion>
  );
};
