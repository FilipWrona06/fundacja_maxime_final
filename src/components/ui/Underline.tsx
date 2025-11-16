"use client";

import { m } from "framer-motion";
import { memo } from "react";

export const Underline = memo(
  ({ isActive, isHovered }: { isActive?: boolean; isHovered?: boolean }) => (
    <m.span
      className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-arylideYellow to-transparent"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: isActive || isHovered ? 1 : 0,
        opacity: isActive || isHovered ? 1 : 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        opacity: { duration: 0.4 }
      }}
      style={{
        boxShadow: (isActive || isHovered) 
          ? "0 0 8px rgba(233,215,88,0.4), 0 0 12px rgba(233,215,88,0.2)"
          : "none",
      }}
    />
  ),
);

Underline.displayName = "Underline";

export default Underline;