"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { memo } from "react";

interface LogoProps {
  className?: string;
}

export const Logo = memo(({ className = "" }: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="Fundacja Maxime - strona główna"
      className={`relative font-youngest text-arylideYellow transition-all duration-500 ease-out ${className}`}
    >
      <m.span
        className="relative inline-block"
        whileHover={{
          filter: [
            "drop-shadow(0 0 0px rgba(233,215,88,0))",
            "drop-shadow(0 0 16px rgba(233,215,88,0.5))",
            "drop-shadow(0 0 20px rgba(233,215,88,0.4))",
          ],
          scale: [1, 1.015, 1.01],
        }}
        transition={{ 
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          scale: { 
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1]
          }
        }}
      >
        Fundacja Maxime
      </m.span>
    </Link>
  );
});

Logo.displayName = "Logo";

export default Logo;