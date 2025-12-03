"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import {
  blurValues,
  durations,
  premiumEase,
  tapScales,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  variant?: "fadeUp" | "fade" | "scale" | "slideLeft" | "slideRight";
  duration?: number;
  /**
   * Czy włączyć efekt podniesienia przy najechaniu myszką?
   */
  enableHover?: boolean;
  /**
   * Czy włączyć efekt wciśnięcia przy kliknięciu?
   */
  enableTap?: boolean;
}

// --- WARIANTY ANIMACJI ---
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: blurValues.normal },
  visible: { opacity: 1, y: 0, filter: blurValues.none },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, filter: blurValues.subtle },
  visible: { opacity: 1, filter: blurValues.none },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: blurValues.normal },
  visible: { opacity: 1, scale: 1, filter: blurValues.none },
};

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 30, filter: blurValues.normal },
  visible: { opacity: 1, x: 0, filter: blurValues.none },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -30, filter: blurValues.normal },
  visible: { opacity: 1, x: 0, filter: blurValues.none },
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
  enableHover = false,
  enableTap = false, // Domyślnie false
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
        // Obsługa hovera
        whileHover={
          enableHover
            ? {
                y: -8,
                transition: ultraSmoothSpring,
              }
            : undefined
        }
        // Obsługa kliknięcia (Tap)
        whileTap={
          enableTap
            ? {
                scale: tapScales.normal, // lub 0.95 jeśli nie masz tapScales
              }
            : undefined
        }
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

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
