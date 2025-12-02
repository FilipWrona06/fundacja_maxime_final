"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { ultraSmoothSpring } from "@/lib/animations";

export const CreditLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // "initial" i "whileHover" w Framer Motion zastępują useState
      className="relative font-semibold inline-block"
    >
      {/* Kontener motion musi obejmować całość, żeby whileHover działało na linku */}
      <m.div 
        initial="rest" 
        whileHover="hover" 
        animate="rest"
        className="relative"
      >
        <m.span
          className="inline-block"
          variants={{
            rest: { y: 0 },
            hover: { y: -2 }
          }}
          transition={ultraSmoothSpring}
        >
          {children}
        </m.span>

        {/* Podkreślenie również sterowane wariantami */}
        <m.span 
           className="absolute left-0 bottom-0 block h-px w-full bg-current"
           variants={{
             rest: { scaleX: 0, opacity: 0 },
             hover: { scaleX: 1, opacity: 1 }
           }}
           transition={ultraSmoothSpring}
        />
      </m.div>
    </Link>
  );
};