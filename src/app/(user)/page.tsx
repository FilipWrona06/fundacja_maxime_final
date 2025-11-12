// src/app/(user)/page.tsx

import { groq } from "next-sanity";
import { Suspense } from "react";

import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import type { HomePageData } from "@/lib/types";
import { client } from "@/sanity/lib/client";

const SectionSkeleton = () => (
  <div
    className="container mx-auto my-16 h-96 animate-pulse rounded-2xl bg-white/5"
    aria-hidden="true"
  />
);

export default async function HomePage() {
  // --- POCZĄTEK POPRAWKI ---
  // Przywracamy pełne zapytanie dla HeroSection, które zamienia referencje do plików na adresy URL.
  const data = await client.fetch<{ heroSection: HomePageData["heroSection"] }>(
    groq`*[_type == "homePage"][0]{
      heroSection {
        ...,
        "videoWebmUrl": videoWebm.asset->url,
        "videoMp4Url": videoMp4.asset->url,
        "posterUrl": poster.asset->url
      }
    }`,
    {},
    { next: { tags: ["homePage"] } },
  );
  // --- KONIEC POPRAWKI ---

  // Jeśli nie ma danych dla Hero, możemy wyświetlić fallback lub nic nie robić,
  // bo Suspense obsłuży resztę strony.
  if (!data?.heroSection) {
    // Można tu dodać jakiś fallback dla Hero, jeśli jest taka potrzeba
    return <main>{/* reszta sekcji w Suspense i tak się załaduje */}</main>;
  }

  return (
    <>
      <HeroSection heroData={data.heroSection} />

      <main>
        <Suspense fallback={<SectionSkeleton />}>
          <StatsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ImpactSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TimelineSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
    </>
  );
}