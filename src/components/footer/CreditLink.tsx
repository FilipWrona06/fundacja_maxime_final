"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { memo, useState } from "react";
import { textLiftTransition, liftDistances } from "@/lib/animations";
import { Underline } from "@/components/ui/Underline";

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
          animate={isHovered ? { y: liftDistances.normal } : { y: 0 }}
          transition={textLiftTransition}
        >
          {children}
        </m.span>
        <Underline isHovered={isHovered} variant="subtle" />
      </Link>
    );
  }
);

CreditLink.displayName = "CreditLink";