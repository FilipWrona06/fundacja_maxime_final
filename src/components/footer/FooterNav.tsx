"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { memo } from "react";

import { AnimatedNavLink } from "../ui/AnimatedNavLink";
import { softSpring } from "@/lib/animations"; // ZMIANA: Import
import type { NavLink } from "@/lib/types";

interface FooterNavProps {
  links: readonly NavLink[];
}

export const FooterNav = memo(({ links }: FooterNavProps) => {
  const pathname = usePathname();

  return (
    <ul className="mt-6 space-y-2">
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.05, ...softSpring }}
        >
          <AnimatedNavLink
            href={link.href}
            name={link.name}
            isActive={pathname === link.href}
            className="text-sm"
          />
        </motion.div>
      ))}
    </ul>
  );
});

FooterNav.displayName = "FooterNav";
