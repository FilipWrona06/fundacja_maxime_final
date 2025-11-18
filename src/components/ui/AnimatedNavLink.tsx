"use client";

import { m, type Variants } from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import { premiumEase, tapScales, ultraSmoothSpring } from "@/lib/animations";
import { Underline } from "./Underline";

// Wersja mobilna - bez zmian
const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: premiumEase,
    },
  },
};

// Krok 1: Definiujemy warianty dla samego podkreślenia
const underlineVariants: Variants = {
  // Stan domyślny (nieaktywny, bez hover)
  initial: {
    scaleX: 0,
    opacity: 0,
  },
  // Stan po najechaniu myszą
  hovered: {
    scaleX: 1,
    opacity: 1,
  },
  // Stan, gdy link jest aktywny
  active: {
    scaleX: 1,
    opacity: 1,
  },
};

interface AnimatedNavLinkProps {
  href: string;
  name: string;
  isActive: boolean;
  isMobile?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AnimatedNavLink = memo(
  ({
    href,
    name,
    isActive,
    isMobile = false,
    className = "",
    onClick,
  }: AnimatedNavLinkProps) => {
    if (isMobile) {
      return (
        <m.li variants={mobileLinkVariants}>
          <Link
            href={href}
            className={`relative block text-xl sm:text-2xl font-semibold transition-all duration-300 ease-out ${className}`}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
          >
            <m.span
              className="inline-block"
              whileHover={{ x: 6 }}
              whileTap={{ scale: tapScales.normal }}
              transition={ultraSmoothSpring}
            >
              {name}
            </m.span>
            <Underline isActive={isActive} variant="prominent" />
          </Link>
        </m.li>
      );
    }

    // Wersja desktopowa z poprawioną logiką
    return (
      <li>
        {/* Krok 2: Używamy nadrzędnego m.div do sterowania stanem */}
        <m.div
          // Kluczowa zmiana: 'animate' jest teraz dynamicznie ustawiany.
          // Gdy isActive się zmieni, Framer Motion animuje do nowego wariantu.
          animate={isActive ? "active" : "initial"}
          whileHover="hovered"
        >
          <Link
            href={href}
            className={`group block py-1 relative transition-colors duration-300 ease-out ${
              isActive
                ? "font-semibold text-white"
                : "font-normal text-white/85 hover:text-white"
            } ${className}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="inline-block relative">
              {name}
              <m.span
                className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-arylideYellow to-transparent"
                style={{ transformOrigin: "center" }}
                // Krok 3: Przekazujemy zdefiniowane warianty do potomka
                variants={underlineVariants}
                transition={{
                  duration: 0.5,
                  ease: premiumEase,
                }}
              />
            </span>
          </Link>
        </m.div>
      </li>
    );
  }
);

AnimatedNavLink.displayName = "AnimatedNavLink";

export default AnimatedNavLink;