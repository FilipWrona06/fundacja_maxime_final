"use client";

import { m, type Transition } from "framer-motion";
import type { Ref } from "react";
import { memo } from "react";
import { premiumEase, tapScales, glowIntensities } from "@/lib/animations";

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

const menuTransition: Transition = {
  duration: 0.4,
  ease: premiumEase,
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
      whileTap={{ scale: tapScales.normal }}
      transition={{ duration: 0.2, ease: premiumEase }}
    >
      {/* Unified hover glow */}
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
        transition={menuTransition}
      >
        <m.span
          className="block h-0.5 w-full bg-white origin-center will-change-transform rounded-full"
          variants={menuButtonVariants.top}
          transition={menuTransition}
          style={{
            boxShadow: isOpen ? glowIntensities.subtle : "none",
          }}
        />
        <m.span
          className="block h-0.5 w-full bg-white will-change-transform rounded-full"
          variants={menuButtonVariants.middle}
          transition={{ ...menuTransition, duration: 0.3 }}
        />
        <m.span
          className="block h-0.5 w-full bg-white origin-center will-change-transform rounded-full"
          variants={menuButtonVariants.bottom}
          transition={menuTransition}
          style={{
            boxShadow: isOpen ? glowIntensities.subtle : "none",
          }}
        />
      </m.div>
    </m.button>
  )
);

AnimatedMenuButton.displayName = "AnimatedMenuButton";