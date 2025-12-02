"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { premiumEase } from "@/lib/animations";

export interface NewsHeroClientProps {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
}

export const NewsHeroClient = ({
  badge,
  titleLine1,
  titleLine2,
  description,
}: NewsHeroClientProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="mb-20">
        <div className="container mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="text-center"
          >
            <m.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
              className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow"
            >
              {badge}
            </m.span>
            <h1 className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
              <span className="font-youngest text-arylideYellow">
                {titleLine1}
              </span>
              <br />
              {titleLine2}
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/60">
              {description}
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};