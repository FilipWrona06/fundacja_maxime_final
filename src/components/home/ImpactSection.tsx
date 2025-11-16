import { getImpactSectionData } from "@/sanity/lib/get-data";
import { ImpactSectionClient } from "./ImpactSection.client";

export async function ImpactSection() {
  const impactData = await getImpactSectionData();

  if (!impactData) {
    return null;
  }

  return (
    <ImpactSectionClient impactData={impactData}>
      <div className="space-y-4 sm:space-y-6">
        {/* Main heading */}
        <h2
          id="impact-heading"
          className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          
          <span className="block font-youngest text-arylideYellow drop-shadow-lg">
            {impactData.heading}
          </span>
        </h2>

        {/* Subheading */}
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
          {impactData.subheading}
        </p>
      </div>
    </ImpactSectionClient>
  );
}
