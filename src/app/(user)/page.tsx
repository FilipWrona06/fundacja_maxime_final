import dynamic from "next/dynamic";
import { groq } from "next-sanity";

import { HeroSection } from "@/components/home/HeroSection";
import type { HomePageData } from "@/lib/types";
import { client } from "@/sanity/lib/client";

// Dynamiczne importowanie komponentów ("Lazy Loading")
const StatsSection = dynamic(() =>
  import("@/components/home/StatsSection").then((mod) => mod.StatsSection),
);
const AboutSection = dynamic(() =>
  import("@/components/home/AboutSection").then((mod) => mod.AboutSection),
);
const ImpactSection = dynamic(() =>
  import("@/components/home/ImpactSection").then((mod) => mod.ImpactSection),
);
const TimelineSection = dynamic(() =>
  import("@/components/home/TimelineSection").then(
    (mod) => mod.TimelineSection,
  ),
);
const CTASection = dynamic(() =>
  import("@/components/home/CtaSection").then((mod) => mod.CTASection),
);

// Główny komponent serwerowy strony
export default async function HomePage() {
  // Zaktualizowane zapytanie GROQ, aby pobrać adresy URL dla wideo i postera
  const query = groq`*[_type == "homePage"][0]{
    heroSection {
      ...,
      "videoWebmUrl": videoWebm.asset->url,
      "videoMp4Url": videoMp4.asset->url,
      "posterUrl": poster.asset->url
    },
    statsSection,
    aboutSection,
    impactSection,
    timelineSection,
    ctaSection
  }`;

  // Usunięto opcję revalidate, aby strona renderowała się dynamicznie
  const data: HomePageData = await client.fetch(query);

  if (!data) {
    return (
      <div>
        Nie znaleziono danych dla strony głównej. Sprawdź, czy dokument został
        opublikowany w Sanity Studio.
      </div>
    );
  }

  return (
    <>
      <HeroSection heroData={data.heroSection} />
      <main>
        <StatsSection statsData={data.statsSection} />
        <AboutSection aboutData={data.aboutSection} />
        <ImpactSection impactData={data.impactSection} />
        <TimelineSection timelineData={data.timelineSection} />
        <CTASection ctaData={data.ctaSection} />
      </main>
    </>
  );
}
