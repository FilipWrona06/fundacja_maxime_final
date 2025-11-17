// lib/animations.ts - Zunifikowany system animacji

import type { Transition } from "framer-motion";

// ===== CORE SPRINGS =====
// Ultra smooth spring - główny dla większości interakcji
export const ultraSmoothSpring = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
} as const;

// Gentle spring - dla subtelnych animacji wejścia
export const gentleSpring = {
  type: "spring",
  stiffness: 100,
  damping: 25,
  mass: 0.9,
} as const;

// Soft spring - dla delikatnych transakcji
export const softSpring = {
  type: "spring",
  stiffness: 150,
  damping: 22,
  mass: 0.7,
} as const;

// Smooth spring - balans między responsywnością a płynnością
export const smoothSpring = {
  type: "spring",
  stiffness: 180,
  damping: 28,
  mass: 0.9,
} as const;

// ===== EASING CURVES =====
// Premium easing - główna krzywa dla ekskluzywnych animacji
export const premiumEase = [0.34, 1.56, 0.64, 1] as const;

// Smooth easing - dla naturalnych przejść
export const smoothEase = [0.25, 0.1, 0.25, 1] as const;

// Bounce easing - dla playful elementów
export const bounceEase = [0.68, -0.55, 0.265, 1.55] as const;

// ===== UNIFIED TRANSITIONS =====
// Hover transition - spójne dla wszystkich hover efektów
export const hoverTransition: Transition = {
  duration: 0.6,
  ease: premiumEase,
};

// Icon pop - dla animowanych ikon
export const iconPopTransition: Transition = {
  duration: 0.8,
  ease: premiumEase,
};

// Shine effect - dla efektów świetlnych
export const shineTransition: Transition = {
  duration: 1.2,
  ease: smoothEase,
};

// Text lift - dla unoszącego się tekstu
export const textLiftTransition: Transition = {
  duration: 0.4,
  ease: premiumEase,
};

// Glow transition - dla efektów poświaty
export const glowTransition: Transition = {
  duration: 1.0,
  ease: smoothEase,
};

// Scale transition - dla efektów skalowania
export const scaleTransition: Transition = {
  duration: 0.6,
  ease: premiumEase,
};

// ===== UNIFIED VALUES =====
// Hover scales
export const hoverScales = {
  subtle: 1.02,
  normal: 1.05,
  prominent: 1.08,
} as const;

// Tap scales
export const tapScales = {
  gentle: 0.98,
  normal: 0.95,
  strong: 0.92,
} as const;

// Text lift distances
export const liftDistances = {
  subtle: -1,
  normal: -2,
  prominent: -4,
} as const;

// Glow intensities (rgba values for arylideYellow)
export const glowIntensities = {
  subtle: "0 0 12px rgba(233,215,88,0.2), 0 0 24px rgba(233,215,88,0.1)",
  normal: "0 0 16px rgba(233,215,88,0.3), 0 0 32px rgba(233,215,88,0.15)",
  prominent: "0 0 24px rgba(233,215,88,0.4), 0 0 48px rgba(233,215,88,0.2)",
} as const;

// ===== STAGGER CONFIGS =====
export const staggerConfig = {
  fast: 0.04,
  normal: 0.08,
  slow: 0.12,
} as const;

// ===== VIEWPORT CONFIGS =====
export const viewportConfig = {
  once: { once: true, amount: 0.2 },
  repeat: { once: false, amount: 0.3 },
} as const;

