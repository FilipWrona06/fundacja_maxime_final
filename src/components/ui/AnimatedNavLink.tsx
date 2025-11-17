"use client";

import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { ultraSmoothSpring, premiumEase, hoverScales, tapScales } from "@/lib/animations";
import { Underline } from "./Underline";

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const springX = useSpring(mouseX, ultraSmoothSpring);
    const springY = useSpring(mouseY, ultraSmoothSpring);

    const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
      },
      [isMobile, mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    }, [mouseX, mouseY]);

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
              whileHover={{ 
                x: 6, 
                scale: hoverScales.subtle,
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
      <li className="perspective-distant">
        <Link
          href={href}
          className={`group block py-1 relative transition-all duration-500 ease-out ${
            isActive
              ? "font-semibold"
              : "font-normal text-white/85 hover:text-white/95"
          } ${className}`}
          aria-current={isActive ? "page" : undefined}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <m.span
            className="inline-block relative will-change-transform"
            style={{ rotateX, rotateY }}
            animate={isHovered ? { scale: hoverScales.subtle } : { scale: 1 }}
            transition={{ duration: 0.4, ease: premiumEase }}
          >
            {name}
            <Underline isActive={isActive} isHovered={isHovered} />
          </m.span>
        </Link>
      </li>
    );
  }
);

AnimatedNavLink.displayName = "AnimatedNavLink";

export default AnimatedNavLink;