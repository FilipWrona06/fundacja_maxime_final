// Plik: src/components/contact/FaqAccordion.tsx

"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { useState } from "react";
import { loadMoreFaqs } from "@/actions/faqActions"; // Import akcji
import type { FaqItem } from "@/lib/types";

export const FaqAccordionClient = ({
  initialItems,
  initialTotalCount,
}: {
  initialItems: readonly FaqItem[];
  initialTotalCount: number;
}) => {
  // Stan pytań (początkowe + doładowane)
  const [items, setItems] = useState<FaqItem[]>([...initialItems]);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  // Stan UI
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const allLoaded = items.length >= totalCount;

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      // Pobieramy kolejne, pomijając te, które już mamy (offset = items.length)
      const response = await loadMoreFaqs(items.length);
      setItems((prev) => [...prev, ...response.data]);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error("Błąd ładowania FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            key={`${item.question}-${index}`} // Unikalny klucz
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }} // Szybki stagger
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() =>
                setActiveQuestion(activeQuestion === index ? null : index)
              }
              className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-white/5"
            >
              <span className="pr-8 text-lg font-semibold text-white/90">
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
                  <title>Rozwiń odpowiedź</title>
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 leading-relaxed text-white/70">
                {item.answer}
              </p>
            </m.div>
          </m.div>
        ))}

        {/* PRZYCISK LOAD MORE */}
        {!allLoaded && (
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="group relative overflow-hidden rounded-full border border-arylideYellow/30 bg-arylideYellow/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-arylideYellow transition-all hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {isLoading ? "Ładowanie..." : "Załaduj więcej pytań"}
              </span>
              <div className="absolute inset-0 -z-10 bg-arylideYellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>
        )}
      </m.div>
    </LazyMotion>
  );
};
