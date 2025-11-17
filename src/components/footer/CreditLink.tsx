"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { memo, useState } from "react";
import { Underline } from "@/components/ui/Underline";
import { ultraSmoothSpring } from "@/lib/animations";

export const CreditLink = memo(
  ({ href, children }: { href: string; children: ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative font-semibold inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <m.span
          className="inline-block"
          animate={isHovered ? { y: -2 } : { y: 0 }}
          transition={ultraSmoothSpring}
        >
          {children}
        </m.span>
        <Underline isHovered={isHovered} variant="subtle" />
      </Link>
    );
  },
);

CreditLink.displayName = "CreditLink";
