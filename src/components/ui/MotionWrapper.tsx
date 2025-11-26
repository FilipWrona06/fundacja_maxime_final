// Plik: src/components/ui/MotionWrapper.client.tsx

"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import {
  blurValues,
  durations,
  premiumEase,
  viewportConfig,
} from "@/lib/animations";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Czy animacja ma się wykonać tylko raz? (Domyślnie: true)
   */
  once?: boolean;
  /**
   * Ile % elementu musi być widoczne, aby odpalić animację (0-1)
   */
  amount?: number;
  /**
   * Typ animacji wejścia
   */
  variant?: "fadeUp" | "fade" | "scale" | "slideLeft" | "slideRight";
  /**
   * Długość animacji (można nadpisać defaultową)
   */
  duration?: number;
}

// Różne warianty animacji
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: blurValues.normal,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: blurValues.none,
  },
};

const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: blurValues.subtle,
  },
  visible: {
    opacity: 1,
    filter: blurValues.none,
  },
};

const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: blurValues.normal,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: blurValues.none,
  },
};

const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
    filter: blurValues.normal,
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: blurValues.none,
  },
};

const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    filter: blurValues.normal,
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: blurValues.none,
  },
};

const variantMap = {
  fadeUp: fadeUpVariants,
  fade: fadeVariants,
  scale: scaleVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
};

export const MotionWrapper = ({
  children,
  className = "",
  delay = 0,
  once = true,
  amount = 0.2,
  variant = "fadeUp",
  duration,
}: MotionWrapperProps) => {
  const selectedVariants = variantMap[variant];
  const animationDuration = duration || durations.slow;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once,
          amount,
          margin: viewportConfig.once.margin,
        }}
        variants={selectedVariants}
        transition={{
          delay,
          duration: animationDuration,
          ease: premiumEase,
        }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

// Export dodatkowy helper dla stagger container
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig.once}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren,
            },
          },
        }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
