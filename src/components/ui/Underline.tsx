"use client";

import { m } from "framer-motion";
import { memo } from "react";
import { glowIntensities, premiumEase } from "@/lib/animations";

interface UnderlineProps {
  isActive?: boolean;
  isHovered?: boolean;
  variant?: "default" | "prominent" | "subtle";
}

export const Underline = memo(
  ({ isActive, isHovered, variant = "default" }: UnderlineProps) => {
    const isVisible = isActive || isHovered;
    
    // Różne warianty intensywności świecenia
    const glowVariants = {
      default: glowIntensities.normal,
      prominent: glowIntensities.prominent,
      subtle: glowIntensities.subtle,
    };

    return (
      <m.span
        className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-arylideYellow to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: premiumEase,
          opacity: { duration: 0.4 },
        }}
        style={{
          boxShadow: isVisible ? glowVariants[variant] : "none",
          transformOrigin: "center",
        }}
      />
    );
  }
);

Underline.displayName = "Underline";

export default Underline;