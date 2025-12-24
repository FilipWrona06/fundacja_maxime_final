// lib/animations.ts - Ultra smooth animation system v2.0

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

// Butter smooth spring - najdelikatniejszy dla premium effects
export const butterSmoothSpring = {
  type: "spring",
  stiffness: 60,
  damping: 28,
  mass: 1.2,
  restDelta: 0.001,
} as const;

// ===== EASING CURVES =====
// Premium easing - główna krzywa dla ekskluzywnych animacji
export const premiumEase = [0.45, 0, 0.55, 1] as const;

// Smooth easing - dla naturalnych przejść
export const smoothEase = [0.4, 0, 0.2, 1] as const;

// Elegant easing - dla fade effects
export const elegantEase = [0.25, 0.1, 0.25, 1] as const;

// Bounce easing - subtelny bounce dla interaktywnych elementów
export const bounceEase = [0.68, -0.55, 0.265, 1.55] as const;

// ===== DURATIONS =====
export const durations = {
  instant: 0.2,
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  verySlow: 1.0,
  ultra: 1.5,
} as const;

// ===== SCALE VALUES =====
export const hoverScales = {
  subtle: 1.01,
  normal: 1.03,
  medium: 1.05,
  large: 1.08,
} as const;

export const tapScales = {
  gentle: 0.98,
  normal: 0.96,
  strong: 0.94,
} as const;

// ===== STAGGER CONFIGS =====
export const staggerConfig = {
  instant: 0.02,
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  verySlow: 0.2,
} as const;

// ===== VIEWPORT CONFIGS =====
export const viewportConfig = {
  once: { once: true, amount: 0.2, margin: "0px 0px -50px 0px" },
  repeat: { once: false, amount: 0.3, margin: "0px 0px -50px 0px" },
  immediate: { once: true, amount: 0.1, margin: "0px 0px -100px 0px" },
  delayed: { once: true, amount: 0.4, margin: "0px 0px 0px 0px" },
} as const;

// ===== BLUR VALUES =====
export const blurValues = {
  none: "blur(0px)",
  subtle: "blur(2px)",
  normal: "blur(4px)",
  strong: "blur(8px)",
} as const;

// ===== TRANSITION PRESETS =====
export const transitionPresets = {
  // Ultra smooth fade in
  fadeIn: {
    duration: durations.slow,
    ease: premiumEase,
  },

  // Quick responsive
  quickResponse: {
    duration: durations.fast,
    ease: smoothEase,
  },

  // Premium slow motion
  slowMotion: {
    duration: durations.ultra,
    ease: elegantEase,
  },

  // Smooth scale
  smoothScale: {
    duration: durations.normal,
    ease: premiumEase,
  },
} as const;

// ===== COMMON VARIANTS =====
export const fadeInUpVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: blurValues.normal,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: blurValues.none,
    transition: transitionPresets.fadeIn,
  },
} as const;

export const fadeInVariant = {
  hidden: {
    opacity: 0,
    filter: blurValues.subtle,
  },
  visible: {
    opacity: 1,
    filter: blurValues.none,
    transition: transitionPresets.fadeIn,
  },
} as const;

export const scaleInVariant = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: blurValues.normal,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: blurValues.none,
    transition: transitionPresets.smoothScale,
  },
} as const;

// ===== STAGGER CONTAINER =====
export const staggerContainer = (delayChildren = 0.1, stagger = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren: stagger,
    },
  },
});

// ===== HELPER FUNCTIONS =====
export const createFadeVariant = (
  duration = durations.normal,
  ease = premiumEase,
  blur = true,
) => ({
  hidden: {
    opacity: 0,
    ...(blur && { filter: blurValues.normal }),
  },
  visible: {
    opacity: 1,
    ...(blur && { filter: blurValues.none }),
    transition: { duration, ease },
  },
});

export const createSlideVariant = (
  direction: "up" | "down" | "left" | "right" = "up",
  distance = 30,
  duration = durations.slow,
) => {
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const value =
    direction === "up" || direction === "left" ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
      filter: blurValues.normal,
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      filter: blurValues.none,
      transition: { duration, ease: premiumEase },
    },
  };
};
