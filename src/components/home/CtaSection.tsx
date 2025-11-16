import { getCTASectionData } from "@/sanity/lib/get-data";
import { CTASectionClient } from "./CtaSection.client";

export async function CTASection() {
  const ctaData = await getCTASectionData();

  if (!ctaData) {
    return null;
  }

  return (
    <CTASectionClient
      patroniteUrl="https://patronite.pl/fundacja-maxime"
      galleryUrl="/galeria"
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Main heading */}
        <h2
          id="cta-heading"
          className="font-youngest text-4xl leading-tight text-arylideYellow drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Pomóż nam rozwijać skrzydła młodym talentom
        </h2>

        {/* Subheading */}
        <p className="mx-auto mb-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
          Twoje wsparcie pozwala nam organizować bezpłatne koncerty i dawać szansę utalentowanym artystom. Zobacz efekty naszej pracy i dołącz do grona wspierających!
        </p>
      </div>
    </CTASectionClient>
  );
}