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
import { Underline } from "./Underline";

const ultraSmoothSpring = { 
  type: "spring", 
  stiffness: 120, 
  damping: 20,
  mass: 0.8
} as const;

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
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

    const springX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 0.5 });

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
      [isMobile, mouseX, mouseY],
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
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={ultraSmoothSpring}
            >
              {name}
            </m.span>
            <Underline isActive={isActive} />
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
            animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {name}
            <Underline isActive={isActive} isHovered={isHovered} />
          </m.span>
        </Link>
      </li>
    );
  },
);

AnimatedNavLink.displayName = "AnimatedNavLink";

export default AnimatedNavLink;