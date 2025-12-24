"use client";

import { usePathname } from "next/navigation";
import { memo } from "react";

// Używamy Twoich wrapperów zamiast ręcznego m.div
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { NavLink } from "@/lib/types/index";
import { AnimatedNavLink } from "../ui/AnimatedNavLink";

interface FooterNavProps {
  links: readonly NavLink[];
}

export const FooterNav = memo(({ links }: FooterNavProps) => {
  const pathname = usePathname();

  return (
    // StaggerContainer zarządza opóźnieniami dzieci
    <StaggerContainer className="mt-6 space-y-2" staggerDelay={0.1}>
      {links.map((link) => (
        // MotionWrapper zarządza animacją wejścia (Slide Right)
        <MotionWrapper key={link.href} variant="slideRight">
          <AnimatedNavLink
            href={link.href}
            name={link.name}
            isActive={pathname === link.href}
            className="text-sm"
          />
        </MotionWrapper>
      ))}
    </StaggerContainer>
  );
});

FooterNav.displayName = "FooterNav";
