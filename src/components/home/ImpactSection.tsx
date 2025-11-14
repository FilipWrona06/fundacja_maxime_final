import { getImpactSectionData } from "@/sanity/lib/get-data";
import { ImpactSectionClient } from "./ImpactSection.client";

export async function ImpactSection() {
  const impactData = await getImpactSectionData();

  if (!impactData) {
    return null;
  }

  return (
    <ImpactSectionClient impactData={impactData}>
      <h2
        id="impact-heading"
        className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
      >
        Nasz{" "}
        <span className="font-youngest text-arylideYellow">
          {impactData.heading}
        </span>
      </h2>
      {/* ZMIANA (RWD): Tekst jest mniejszy na mobile, większy na desktopie */}
      <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
        {impactData.subheading}
      </p>
    </ImpactSectionClient>
  );
}