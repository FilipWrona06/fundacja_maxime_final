// Plik: src/components/home/ImpactSection.tsx (wersja zrefaktoryzowana)

import { getImpactSectionData } from "@/sanity/lib/queries/home";
import { ImpactSectionClient } from "./ImpactSection.client";

export async function ImpactSection() {
  // 1. Pobieranie danych na serwerze
  const impactData = await getImpactSectionData();

  // 2. Zabezpieczenie na wypadek braku danych
  if (!impactData) {
    return null;
  }

  // 3. Przygotowanie statycznego JSX dla nagłówka i podtytułu
  const headingContent = (
    <div className="space-y-4 sm:space-y-6">
      <h2
        id="impact-heading"
        className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        {impactData.headingPrefix && `${impactData.headingPrefix} `}
        <span className="font-youngest text-arylideYellow drop-shadow-lg">
          {impactData.headingHighlighted}
        </span>
      </h2>
      <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
        {impactData.subheading}
      </p>
    </div>
  );

  // 4. Renderowanie statycznej otoczki i przekazanie danych do komponentu klienckiego
  return (
    <section
      id="impact-section"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
      aria-labelledby="impact-heading"
    >
      {/* Dekoracyjne tła renderowane na serwerze */}
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* Komponent kliencki renderuje już tylko animowaną treść */}
        <ImpactSectionClient impactData={impactData}>
          {headingContent}
        </ImpactSectionClient>
      </div>
    </section>
  );
}
