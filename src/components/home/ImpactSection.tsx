import { getImpactSectionData } from "@/sanity/lib/get-data";
import { ImpactSectionClient } from "./ImpactSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla sekcji "Impact".
 * 
 * Odpowiedzialności:
 * 1. Pobieranie danych z Sanity za pomocą z-cache-owanej funkcji.
 * 2. Renderowanie statycznej części nagłówkowej do czystego HTML.
 * 3. Przekazanie pełnych danych sekcji oraz statycznego nagłówka (jako `children`) 
 *    do Komponentu Klienckiego, który zajmie się resztą.
 */
export async function ImpactSection() {
  // Krok 1: Używamy naszej scentralizowanej i z-cache-owanej funkcji.
  const impactData = await getImpactSectionData();

  // Jeśli nie ma danych, nic nie renderujemy.
  if (!impactData) {
    return null;
  }

  // Krok 2: Zwracamy komponent kliencki, przekazując mu zarówno dane,
  // jak i wyrenderowaną na serwerze, statyczną część JSX jako `children`.
  return (
    <ImpactSectionClient impactData={impactData}>
      {/* Poniższy kod jest renderowany na serwerze do czystego HTML. */}
      
      <h2
        id="impact-heading"
        className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
      >
        Nasz{" "}
        <span className="font-youngest text-arylideYellow">
          {impactData.heading}
        </span>
      </h2>
      <p className="mx-auto max-w-2xl text-xl text-white/60">
        {impactData.subheading}
      </p>
    </ImpactSectionClient>
  );
}