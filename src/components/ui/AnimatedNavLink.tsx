"use client";

import {
  m,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import { ultraSmoothSpring, premiumEase, tapScales } from "@/lib/animations";
import { Underline } from "./Underline";

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
              whileHover={{ 
                x: 6,
              }}
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

    return (
      <li>
        <m.div whileHover="hovered" initial="initial">
          <Link
            href={href}
            className={`group block py-1 relative transition-all duration-300 ease-out ${
              isActive
                ? "font-semibold"
                : "font-normal text-white/85 hover:text-white"
            } ${className}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="inline-block relative">
              {name}
              <m.span
                className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-arylideYellow to-transparent"
                initial={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                variants={{
                  initial: { scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 },
                  hovered: { scaleX: 1, opacity: 1 }
                }}
                transition={{
                  duration: 0.5,
                  ease: premiumEase,
                }}
                style={{
                  transformOrigin: "center",
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