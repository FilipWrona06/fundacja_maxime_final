import { getImpactSectionData } from "@/sanity/lib/queries/home";
import { ImpactSectionClient } from "./ImpactSection.client";

export async function ImpactSection() {
  const impactData = await getImpactSectionData();

  // Ta logika jest idealna i pozostaje bez zmian.
  if (!impactData) {
    return null;
  }

  // Komponent kliencki jest wywoływany poprawnie.
  return (
    <ImpactSectionClient impactData={impactData}>
      {/* --- ZMIANA: Aktualizujemy JSX, aby pasował do nowej struktury danych --- */}
      <div className="space-y-4 sm:space-y-6">
        <h2
          id="impact-heading"
          className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {/* 1. Warunkowo renderujemy standardową część nagłówka (jeśli istnieje) */}
          {impactData.headingPrefix && `${impactData.headingPrefix} `}

          {/* 2. Renderujemy wymaganą, wyróżnioną część nagłówka */}
          <span className="font-youngest text-arylideYellow drop-shadow-lg">
            {impactData.headingHighlighted}
          </span>
        </h2>

        {/* Subheading pozostaje bez zmian */}
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
          {impactData.subheading}
        </p>
      </div>
    </ImpactSectionClient>
  );
}
