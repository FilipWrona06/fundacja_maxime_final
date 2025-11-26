"use client";

import { m, type Variants } from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import {
  durations,
  premiumEase,
  tapScales,
  ultraSmoothSpring,
} from "@/lib/animations";

// Warianty dla wersji mobilnej
const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: premiumEase,
    },
  },
};

// Warianty dla podkreślenia - desktop
const underlineVariants: Variants = {
  initial: {
    scaleX: 0,
    opacity: 0,
  },
  hovered: {
    scaleX: 1,
    opacity: 1,
  },
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
            className={`relative block text-xl sm:text-2xl font-semibold transition-all duration-500 ease-out ${className}`}
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

            {/* Mobile underline */}
            <m.span
              className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-arylideYellow to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                duration: durations.normal,
                ease: premiumEase,
              }}
              style={{ transformOrigin: "center" }}
            />
          </Link>
        </m.li>
      );
    }

    // Wersja desktopowa z ultra-smooth transitions
    return (
      <li>
        <m.div animate={isActive ? "active" : "initial"} whileHover="hovered">
          <Link
            href={href}
            className={`group block py-1 relative transition-all duration-500 ease-out ${
              isActive
                ? "font-semibold text-white"
                : "font-normal text-white/85 hover:text-white"
            } ${className}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="inline-block relative">
              {name}

              {/* Premium underline z smooth shadow */}
              <m.span
                className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-arylideYellow to-transparent shadow-lg shadow-arylideYellow/20"
                style={{ transformOrigin: "center" }}
                variants={underlineVariants}
                transition={{
                  duration: durations.normal,
                  ease: premiumEase,
                }}
              />
            </span>
          </Link>
        </m.div>
      </li>
    );
  },
);

AnimatedNavLink.displayName = "AnimatedNavLink";

export default AnimatedNavLink;
