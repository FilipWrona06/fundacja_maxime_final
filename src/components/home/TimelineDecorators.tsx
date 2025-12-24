"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { premiumEase } from "@/lib/animations";

export const TimelineLineAnimator = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: premiumEase }}
        className="absolute left-4 top-0 hidden h-full w-0.5 origin-top md:left-8 md:block lg:left-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(233,215,88,0.6), rgba(233,215,88,0.3), rgba(233,215,88,0.1), transparent)",
        }}
      />
    </LazyMotion>
  );
};
