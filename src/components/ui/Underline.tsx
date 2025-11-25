"use client";

import { m } from "framer-motion";
import { memo } from "react";
import { premiumEase, durations } from "@/lib/animations";

interface UnderlineProps {
  isActive?: boolean;
  isHovered?: boolean;
  variant?: "default" | "prominent" | "subtle" | "gradient" | "glow";
}

export const Underline = memo(
  ({ isActive, isHovered, variant = "default" }: UnderlineProps) => {
    const isVisible = isActive || isHovered;

    // Różne warianty wysokości
    const heightVariants = {
      default: "h-0.5",
      prominent: "h-0.5",
      subtle: "h-px",
      gradient: "h-0.5",
      glow: "h-0.5",
    };

    // Różne warianty stylów
    const variantStyles = {
      default: "bg-gradient-to-r from-transparent via-arylideYellow to-transparent",
      prominent: "bg-gradient-to-r from-transparent via-arylideYellow to-transparent",
      subtle: "bg-arylideYellow/60",
      gradient: "bg-gradient-to-r from-arylideYellow/60 via-arylideYellow to-arylideYellow/60",
      glow: "bg-gradient-to-r from-transparent via-arylideYellow to-transparent shadow-lg shadow-arylideYellow/30",
    };

    return (
      <m.span
        className={`absolute -bottom-0.5 left-0 ${heightVariants[variant]} w-full rounded-full ${variantStyles[variant]}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: durations.normal,
          ease: premiumEase,
        }}
        style={{
          transformOrigin: "center",
        }}
      />
    );
  },
);

Underline.displayName = "Underline";

export default Underline;