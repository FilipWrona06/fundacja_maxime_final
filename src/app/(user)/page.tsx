import { Suspense } from "react";

import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TimelineSection } from "@/components/home/TimelineSection";

// Komponent szkieletu (skeleton) do wyświetlania podczas ładowania danych.
// Pozostaje bez zmian.
const SectionSkeleton = () => (
  <div
    className="container mx-auto my-16 h-96 animate-pulse rounded-2xl bg-white/5"
    aria-hidden="true"
  />
);

// Komponent strony jest teraz znacznie prostszy.
// Jego głównym zadaniem jest zdefiniowanie układu i granic Suspense.
export default function HomePage() {
  return (
    <>
      {/* HeroSection jest renderowana natychmiast. Strona poczeka na jej dane,
          ponieważ jest to kluczowy element widoczny "above the fold". */}
      <HeroSection />

      <main>
        {/* Każda kolejna sekcja jest owinięta w Suspense. Oznacza to, że
            będą one renderowane równolegle i strumieniowane do przeglądarki,
            gdy tylko ich dane będą gotowe, nie blokując siebie nawzajem. */}
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