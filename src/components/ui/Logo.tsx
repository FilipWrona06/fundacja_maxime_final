"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import { durations, hoverScales, premiumEase } from "@/lib/animations";

interface LogoProps {
  className?: string;
}

export const Logo = memo(({ className = "" }: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="Fundacja Maxime - strona główna"
      className={`group relative font-youngest text-arylideYellow transition-all duration-500 ease-out ${className}`}
    >
      <m.span
        className="relative inline-block"
        whileHover={{
          scale: hoverScales.subtle,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: durations.fast,
          ease: premiumEase,
        }}
      >
        {/* Subtelny glow effect na hover */}
        <span className="relative z-10">Fundacja Maxime</span>
        <span className="absolute inset-0 blur-lg bg-arylideYellow/0 group-hover:bg-arylideYellow/20 transition-all duration-500 -z-10" />
      </m.span>
    </Link>
  );
});

Logo.displayName = "Logo";

export default Logo;
