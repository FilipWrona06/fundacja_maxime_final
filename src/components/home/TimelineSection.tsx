// Plik: src/components/home/TimelineSection.tsx (wersja zrefaktoryzowana)

import { getTimelineSectionData } from "@/sanity/lib/queries/home";
import { TimelineSectionClient } from "./TimelineSection.client";

export async function TimelineSection() {
  // 1. Pobieranie danych na serwerze
  const timelineData = await getTimelineSectionData();

  // 2. Zabezpieczenie na wypadek braku danych
  if (!timelineData) {
    return null;
  }

  // 3. Przygotowanie statycznego JSX dla nagłówka i podtytułu
  const headingContent = (
    <div className="space-y-4 sm:space-y-6">
      <h2
        id="timeline-heading"
        className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        {timelineData.headingPrefix && `${timelineData.headingPrefix} `}
        <span className="font-youngest text-arylideYellow drop-shadow-lg">
          {timelineData.headingHighlighted}
        </span>
      </h2>
      <p className="mx-auto max-w-2xl font-medium text-base leading-relaxed text-white/90 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
        {timelineData.subheading}
      </p>
    </div>
  );

  // 4. Renderowanie statycznej otoczki i przekazanie danych do komponentu klienckiego
  return (
    <section
      id="timeline-section"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
      aria-labelledby="timeline-heading"
    >
      {/* Dekoracyjne tła renderowane na serwerze */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* Komponent kliencki renderuje już tylko animowaną treść */}
        <TimelineSectionClient timelineData={timelineData}>
          {headingContent}
        </TimelineSectionClient>
      </div>
    </section>
  );
}
