// ===== FooterNav.tsx =====
"use client";

import { m } from "framer-motion";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { softSpring, staggerConfig } from "@/lib/animations";
import type { NavLink } from "@/lib/types";
import { AnimatedNavLink } from "../ui/AnimatedNavLink";

interface FooterNavProps {
  links: readonly NavLink[];
}

export const FooterNav = memo(({ links }: FooterNavProps) => {
  const pathname = usePathname();

  return (
    <ul className="mt-6 space-y-2">
      {links.map((link, index) => (
        <m.div
          key={link.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.4 + index * staggerConfig.normal, 
            ...softSpring 
          }}
        >
          <AnimatedNavLink
            href={link.href}
            name={link.name}
            isActive={pathname === link.href}
            className="text-sm"
          />
        </m.div>
      ))}
    </ul>
  );
});

FooterNav.displayName = "FooterNav";