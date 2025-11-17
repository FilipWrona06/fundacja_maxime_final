// lib/animations.ts - Ultra smooth animation system
// ===== CORE SPRINGS =====
// Ultra smooth spring - główny dla większości interakcji
export const ultraSmoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 22,
  mass: 1,
  restDelta: 0.001,
} as const;

// Gentle spring - dla subtelnych animacji wejścia
export const gentleSpring = {
  type: "spring",
  stiffness: 80,
  damping: 24,
  mass: 1.1,
  restDelta: 0.001,
} as const;

// Smooth spring - balans między responsywnością a płynnością
export const smoothSpring = {
  type: "spring",
  stiffness: 140,
  damping: 26,
  mass: 1,
  restDelta: 0.001,
} as const;

// ===== EASING CURVES =====
// Premium easing - główna krzywa dla ekskluzywnych animacji (bardziej smooth)
export const premiumEase = [0.25, 0.1, 0.25, 1] as const;

// Smooth easing - dla naturalnych przejść (jeszcze płynniej)
export const smoothEase = [0.4, 0, 0.2, 1] as const;

// ===== UNIFIED VALUES =====
export const hoverScales = {
  subtle: 1.01,
  normal: 1.03,
} as const;

export const tapScales = {
  gentle: 0.98,
  normal: 0.96,
} as const;

// ===== STAGGER CONFIGS =====
export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// ===== VIEWPORT CONFIGS =====
export const viewportConfig = {
  once: { once: true, amount: 0.2 },
  repeat: { once: false, amount: 0.3 },
} as const;
