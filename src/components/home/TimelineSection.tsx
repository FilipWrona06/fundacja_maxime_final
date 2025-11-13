import { getTimelineSectionData } from "@/sanity/lib/get-data";
import { TimelineSectionClient } from "./TimelineSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla sekcji "Timeline".
 * 
 * Odpowiedzialności:
 * 1. Pobieranie danych z Sanity za pomocą z-cache-owanej funkcji.
 * 2. Renderowanie statycznej części nagłówkowej do czystego HTML.
 * 3. Przekazanie pełnych danych sekcji oraz statycznego nagłówka (jako `children`) 
 *    do Komponentu Klienckiego, który zajmie się renderowaniem osi czasu.
 */
export async function TimelineSection() {
  // Krok 1: Używamy naszej scentralizowanej i z-cache-owanej funkcji.
  const timelineData = await getTimelineSectionData();

  // Jeśli nie ma danych, nic nie renderujemy.
  if (!timelineData) {
    return null;
  }

  // Krok 2: Zwracamy komponent kliencki, przekazując mu dane do mapowania
  // oraz statyczną treść jako `children`.
  return (
    <TimelineSectionClient timelineData={timelineData}>
      {/* Poniższy kod jest renderowany na serwerze do czystego HTML. */}
      
      <h2
        id="timeline-heading"
        className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
      >
        Nasza{" "}
        <span className="font-youngest text-arylideYellow">
          {timelineData.heading}
        </span>
      </h2>
      <p className="mx-auto max-w-2xl text-xl text-white/60">
        {timelineData.subheading}
      </p>
    </TimelineSectionClient>
  );
}