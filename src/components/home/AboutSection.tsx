import { getAboutSectionData } from "@/sanity/lib/get-data";
import { AboutSectionClient } from "./AboutSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla sekcji "O nas".
 * 
 * Odpowiedzialności:
 * 1. Pobieranie danych z Sanity za pomocą z-cache-owanej funkcji.
 * 2. Renderowanie statycznej treści (nagłówki, paragrafy) do czystego HTML.
 * 3. Przekazanie danych i statycznej treści do Komponentu Klienckiego,
 *    który zajmie się animacjami i interaktywnością.
 */
export async function AboutSection() {
  // Krok 1: Używamy naszej scentralizowanej i z-cache-owanej funkcji.
  const aboutData = await getAboutSectionData();

  // Jeśli nie ma danych, nic nie renderujemy, aby uniknąć błędów.
  if (!aboutData) {
    return null;
  }

  // Krok 2: Zwracamy komponent kliencki jako "otoczkę",
  // a w środku (jako children) renderujemy całą statyczną treść.
  return (
    <AboutSectionClient aboutData={aboutData}>
      {/* Poniższy kod jest renderowany na serwerze do czystego HTML. */}
      {/* Do przeglądarki nie jest wysyłany żaden JS odpowiedzialny za renderowanie tych tagów. */}
      
      <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow">
        {aboutData.smallHeading}
      </span>
      <h2
        id="about-heading"
        className="mb-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
      >
        <span className="block">{aboutData.headingPart1}</span>
        <span className="block font-youngest text-arylideYellow">
          {aboutData.headingPart2}
        </span>
        <span className="block">{aboutData.headingPart3}</span>
      </h2>
      <div className="space-y-6 text-lg leading-relaxed text-white/70">
        <p>{aboutData.paragraph1}</p>
        <p>{aboutData.paragraph2}</p>
      </div>
    </AboutSectionClient>
  );
}