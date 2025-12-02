"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";

interface ContactHeaderProps {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export const ContactHeaderClient = ({
  badge,
  headingLine1,
  headingLine2,
  description,
}: ContactHeaderProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <m.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow"
            >
              {badge}
            </m.span>
            <h1 className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
              <span className="font-youngest text-arylideYellow">
                {headingLine1}
              </span>
              <br />
              {headingLine2}
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
