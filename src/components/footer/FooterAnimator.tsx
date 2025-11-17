"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import type { ReactNode } from "react";
import { gentleSpring, viewportConfig } from "@/lib/animations";

interface FooterAnimatorProps {
  children: ReactNode;
}

export const FooterAnimator = ({ children }: FooterAnimatorProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.footer
        className="relative overflow-hidden glass-effect"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={viewportConfig.once}
        transition={{ ...gentleSpring, delay: 0.2 }}
      >
        {children}
      </m.footer>
    </LazyMotion>
  );
};