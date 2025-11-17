"use client";

import { m } from "framer-motion";
import { memo } from "react";
import { premiumEase } from "@/lib/animations";

interface UnderlineProps {
  isActive?: boolean;
  isHovered?: boolean;
  variant?: "default" | "prominent" | "subtle";
}

export const Underline = memo(
  ({ isActive, isHovered, variant = "default" }: UnderlineProps) => {
    const isVisible = isActive || isHovered;

    // Różne warianty wysokości
    const heightVariants = {
      default: "h-0.5",
      prominent: "h-0.5",
      subtle: "h-px",
    };

    return (
      <m.span
        className={`absolute -bottom-0.5 left-0 ${heightVariants[variant]} w-full rounded-full bg-linear-to-r from-transparent via-arylideYellow to-transparent`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
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
