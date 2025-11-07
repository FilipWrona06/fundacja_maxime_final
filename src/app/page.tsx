import dynamic from 'next/dynamic';
import { groq } from 'next-sanity';

import { HeroSection } from '@/components/home/HeroSection';
import type { HomePageData } from '@/lib/types';
import { client } from '@/sanity/lib/client';


// Usunięto stąd definicje interfejsów SanityImage i HomePageData,
// ponieważ znajdują się teraz w `@/lib/types.ts`.


// Dynamiczne importowanie komponentów ("Lazy Loading")
const StatsSection = dynamic(() => import('@/components/home/StatsSection').then(mod => mod.StatsSection));
const AboutSection = dynamic(() => import('@/components/home/AboutSection').then(mod => mod.AboutSection));
const ImpactSection = dynamic(() => import('@/components/home/ImpactSection').then(mod => mod.ImpactSection));
const TimelineSection = dynamic(() => import('@/components/home/TimelineSection').then(mod => mod.TimelineSection));
const CTASection = dynamic(() => import('@/components/home/CtaSection').then(mod => mod.CTASection));


// Główny komponent serwerowy strony
export default async function HomePage() {
  const query = groq`*[_type == "homePage"][0]{
    heroSection,
    statsSection,
    aboutSection,
    impactSection,
    timelineSection,
    ctaSection
  }`;

  // Strategia cache'owania danych (ISR)
  const data: HomePageData = await client.fetch(query, {}, {
    next: { revalidate: 3600 } 
  });

  if (!data) {
    return <div>Nie znaleziono danych dla strony głównej. Sprawdź, czy dokument został opublikowany w Sanity Studio.</div>;
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