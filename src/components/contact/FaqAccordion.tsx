"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { useState } from "react";
import type { FaqItem } from "@/lib/types";

export const FaqAccordionClient = ({
  items,
}: {
  items: readonly FaqItem[];
}) => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl space-y-4"
      >
        {items.map((item, index) => (
          <m.div
            key={item.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() =>
                setActiveQuestion(activeQuestion === index ? null : index)
              }
              className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-white/5"
            >
              <span className="pr-8 text-lg font-semibold">
                {item.question}
              </span>
              <m.div
                animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 text-arylideYellow"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <title>Rozwiń / Zwiń</title>
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </m.div>
            </button>

            <m.div
              initial={false}
              animate={{
                height: activeQuestion === index ? "auto" : 0,
                opacity: activeQuestion === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 leading-relaxed text-white/70">
                {item.answer}
              </p>
            </m.div>
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
};
