import { getTimelineSectionData } from "@/sanity/lib/queries/home";
import { TimelineSectionClient } from "./TimelineSection.client";

export async function TimelineSection() {
  const timelineData = await getTimelineSectionData();

  // Ta logika jest poprawna i pozostaje bez zmian.
  if (!timelineData) {
    return null;
  }

  return (
    <TimelineSectionClient timelineData={timelineData}>
      {/* ZMIANA: Zaktualizowano JSX, aby pasował do nowej struktury danych nagłówka */}
      <div className="space-y-4 sm:space-y-6">
        <h2
          id="timeline-heading"
          className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {/* Warunkowo renderujemy standardową część nagłówka */}
          {timelineData.headingPrefix && `${timelineData.headingPrefix} `}

          {/* Renderujemy wymaganą, wyróżnioną część nagłówka */}
          <span className="font-youngest text-arylideYellow drop-shadow-lg">
            {timelineData.headingHighlighted}
          </span>
        </h2>

        <p className="mx-auto max-w-2xl font-medium text-base leading-relaxed text-white/90 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
          {timelineData.subheading}
        </p>
      </div>
    </TimelineSectionClient>
  );
}