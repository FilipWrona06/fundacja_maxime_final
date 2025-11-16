"use client";

import { m, type Transition } from "framer-motion";
import type { Ref } from "react";
import { memo } from "react";

const menuButtonVariants = {
  top: {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  },
  middle: {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0.3 },
  },
  bottom: {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  },
};

// Definiujemy typ dla `ease`, aby TypeScript go poprawnie rozpoznał.
// Jest to tablica czterech liczb (tuple) reprezentująca krzywą Beziera.
const smoothTransition: Transition = {
  duration: 0.4,
  ease: [0.34, 1.56, 0.64, 1],
};

interface AnimatedMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  buttonRef: Ref<HTMLButtonElement>;
}

export const AnimatedMenuButton = memo(
  ({ isOpen, onClick, buttonRef }: AnimatedMenuButtonProps) => (
    <m.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className="z-50 p-3 relative rounded-xl transition-all duration-300 ease-out"
      aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Tło podświetlenia przy hover */}
      <m.div
        className="absolute inset-0 rounded-xl"
        initial={{ backgroundColor: "rgba(233, 215, 88, 0)" }}
        whileHover={{ backgroundColor: "rgba(233, 215, 88, 0.12)" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <m.div
        className="flex flex-col justify-around w-6 h-6 relative z-10"
        animate={isOpen ? "open" : "closed"}
        initial={false}
        transition={smoothTransition}
      >
        <m.span
          className="block h-0.5 w-full bg-white origin-center will-change-transform rounded-full"
          variants={menuButtonVariants.top}
          transition={smoothTransition}
          style={{
            boxShadow: isOpen ? "0 0 8px rgba(255,255,255,0.3)" : "none",
          }}
        />
        <m.span
          className="block h-0.5 w-full bg-white will-change-transform rounded-full"
          variants={menuButtonVariants.middle}
          transition={{ ...smoothTransition, duration: 0.3 }}
        />
        <m.span
          className="block h-0.5 w-full bg-white origin-center will-change-transform rounded-full"
          variants={menuButtonVariants.bottom}
          transition={smoothTransition}
          style={{
            boxShadow: isOpen ? "0 0 8px rgba(255,255,255,0.3)" : "none",
          }}
        />
      </m.div>
    </m.button>
  ),
);

AnimatedMenuButton.displayName = "AnimatedMenuButton";