"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { memo, useState } from "react";
import { Underline } from "../ui/Underline";
import { softSpring } from "@/lib/animations"; // ZMIANA: Import

export const CreditLink = memo(
  ({ href, children }: { href: string; children: ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative font-semibold transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className="inline-block"
          animate={isHovered ? { y: -2 } : { y: 0 }}
          transition={softSpring}
        >
          {children}
        </motion.span>
        <Underline isHovered={isHovered} />
      </Link>
    );
  },
);

CreditLink.displayName = "CreditLink";
