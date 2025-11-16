"use client";

import { m } from "framer-motion"; // Zaktualizowany import
import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
  hoverTransition,
  iconPopTransition,
  shineTransition,
  smoothSpring,
} from "@/lib/animations";

// --- Stałe specyficzne dla komponentu ---
const patroniteUrl = "https://patronite.pl/stowarzyszeniemaxime";
const patroniteButtonBaseClasses =
  "relative flex items-center gap-x-2 rounded-full font-bold text-arylideYellow overflow-hidden";

interface PatroniteLinkProps {
  isMobile?: boolean;
  onClick?: () => void;
}

export const PatroniteLink = ({
  isMobile = false,
  onClick,
}: PatroniteLinkProps) => {
  // Stan `isHovered` jest zamknięty wewnątrz tego komponentu.
  const [isHovered, setIsHovered] = useState(false);
  const mobileClasses = "border-2 px-6 py-3 text-xl shadow-lg";
  const desktopClasses = "border px-4 py-2 text-sm shadow-md";

  return (
    <m.div // Zmieniono motion.div na m.div
      whileHover={!isMobile ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      transition={smoothSpring}
    >
      <Link
        href={patroniteUrl}
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        className={`${patroniteButtonBaseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
        onClick={onClick}
        prefetch={false}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animowane tło */}
        <m.span // Zmieniono motion.span na m.span
          className="absolute inset-0 bg-linear-to-r from-arylideYellow via-arylideYellow/80 to-arylideYellow"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "0%" } : { x: "-100%" }}
          transition={hoverTransition}
        />

        {/* Tekst linku */}
        <span
          className="relative z-10 transition-colors duration-300"
          style={{ color: isHovered ? "#1a1a2e" : undefined }}
        >
          Wesprzyj nas
        </span>

        {/* Animowana ikona serca */}
        <m.span // Zmieniono motion.span na m.span
          className="relative z-10"
          animate={
            isHovered
              ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={iconPopTransition}
          style={{ color: isHovered ? "#1a1a2e" : undefined }}
        >
          <FaHeart aria-hidden="true" />
        </m.span>

        {/* Animacja połysku */}
        <m.span // Zmieniono motion.span na m.span
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%", skewX: -20 }}
          animate={isHovered ? { x: "200%" } : { x: "-100%" }}
          transition={shineTransition}
        />
      </Link>
    </m.div>
  );
};

PatroniteLink.displayName = "PatroniteLink";
