"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import { premiumEase } from "@/lib/animations";

interface LogoProps {
  className?: string;
}

export const Logo = memo(({ className = "" }: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="Fundacja Maxime - strona główna"
      className={`relative font-youngest text-arylideYellow transition-all duration-300 ease-out ${className}`}
    >
      <m.span
        className="relative inline-block"
        whileHover={{
          scale: 1.02,
        }}
        transition={{
          duration: 0.4,
          ease: premiumEase,
        }}
      >
        Fundacja Maxime
      </m.span>
    </Link>
  );
});

Logo.displayName = "Logo";

export default Logo;
