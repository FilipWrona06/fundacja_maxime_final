// Plik: src/components/home/ImpactCarousel.client.tsx
"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { useRef, useState } from "react";
import { ImpactCard, type ImpactCardItem } from "./ImpactCard";

export const ImpactCarouselClient = ({
  cards,
}: {
  cards: ImpactCardItem[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    // Przybliżona szerokość karty + gap
    const cardWidth =
      container.children[0]?.clientWidth || container.clientWidth * 0.75;
    const newIndex = Math.round(scrollLeft / cardWidth);
    const clampedIndex = Math.min(Math.max(newIndex, 0), cards.length - 1);
    setActiveIndex(clampedIndex);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="lg:hidden">
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative -mx-6 px-6"
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {cards.map((card, index) => (
              <div
                key={card.title}
                className="group relative shrink-0 snap-center flex flex-col"
                style={{
                  width: index === 0 ? "85vw" : "75vw",
                  maxWidth: "400px",
                }}
              >
                <ImpactCard card={card} />
              </div>
            ))}
          </div>

          {/* Wskaźniki */}
          <div className="mt-4 flex justify-center gap-1.5">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-arylideYellow"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
};
