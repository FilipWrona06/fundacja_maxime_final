// lib/animations.ts - Zunifikowany system animacji
// ===== CORE SPRINGS =====
export const ultraSmoothSpring = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
} as const;

export const gentleSpring = {
  type: "spring",
  stiffness: 100,
  damping: 25,
  mass: 0.9,
} as const;

export const smoothSpring = {
  type: "spring",
  stiffness: 180,
  damping: 28,
  mass: 0.9,
} as const;

// ===== EASING CURVES =====
export const premiumEase = [0.34, 1.56, 0.64, 1] as const;
export const smoothEase = [0.25, 0.1, 0.25, 1] as const;

// ===== UNIFIED VALUES =====
export const hoverScales = {
  subtle: 1.02,
  normal: 1.05,
} as const;

export const tapScales = {
  gentle: 0.98,
  normal: 0.95,
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