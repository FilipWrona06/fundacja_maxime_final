"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import { glowIntensities, premiumEase, smoothEase } from "@/lib/animations";

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
            "drop-shadow(0 0 20px rgba(233,215,88,0.4))",
            "drop-shadow(0 0 16px rgba(233,215,88,0.3))",
          ],
          scale: [1, 1.02, 1.01],
        }}
        transition={{
          filter: {
            duration: 1.2,
            ease: smoothEase,
          },
          scale: {
            duration: 0.6,
            ease: premiumEase,
          },
        }}
        style={{
          textShadow: glowIntensities.subtle,
        }}
      >
        Fundacja Maxime
      </m.span>
    </Link>
  );
});

Logo.displayName = "Logo";

export default Logo;