import { getCTASectionData } from "@/sanity/lib/get-data";
import { CTASectionClient } from "./CtaSection.client";

export async function CTASection() {
  const ctaData = await getCTASectionData();

  if (!ctaData) {
    return null;
  }

  return (
    <CTASectionClient>
      {/* ZMIANA (RWD): Zmniejszono czcionki na małych ekranach */}
      <h2
        id="cta-heading"
        className="mb-6 font-youngest text-5xl leading-tight text-arylideYellow sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {ctaData.heading}
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
        {ctaData.text}
      </p>
    </CTASectionClient>
  );
}