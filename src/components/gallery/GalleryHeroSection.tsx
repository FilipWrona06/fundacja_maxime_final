// Plik: src/components/gallery/GalleryHeroSection.tsx

import { PortableText } from "@portabletext/react";
// Importujemy Twoje "Wyspy Klienckie" do animacji
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { GaleriaPageData } from "@/lib/types/index";

export function GalleryHeroSection({
  heroData,
}: {
  heroData: GaleriaPageData["heroSection"];
}) {
  if (!heroData) {
    return null;
  }

  return (
    <header className="relative overflow-hidden py-16 sm:py-20">
      {/* 
        TŁO DEKORACYJNE 
        Używamy MotionWrapper, aby animować wejście (skalowanie) tych elementów.
      */}
      <MotionWrapper
        variant="scale"
        duration={1.5}
        className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-arylideYellow/8 blur-3xl"
      >
        {/* Pusty div wewnątrz, bo MotionWrapper renderuje wrapper */}
        <div className="h-full w-full" />
      </MotionWrapper>

      <MotionWrapper
        variant="scale"
        duration={1.5}
        delay={0.3}
        className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-oxfordBlue/12 blur-3xl"
      >
        <div className="h-full w-full" />
      </MotionWrapper>

      {/* 
        TREŚĆ GŁÓWNA 
        Używamy StaggerContainer, aby elementy wewnątrz pojawiały się po kolei.
        Wszystkie teksty (H1, p, span) są renderowane na serwerze (SSR).
      */}
      <div className="relative z-10 text-center">
        <StaggerContainer staggerDelay={0.15} delayChildren={0.2}>
          {/* Badge */}
          <MotionWrapper
            variant="fadeUp"
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-linear-to-r from-transparent to-arylideYellow" />
            <span className="inline-flex items-center gap-2 rounded-full border border-arylideYellow/30 bg-arylideYellow/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-arylideYellow backdrop-blur-sm sm:px-6 sm:text-sm">
              {heroData.badge}
            </span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-arylideYellow" />
          </MotionWrapper>

          {/* Nagłówek H1 */}
          <MotionWrapper variant="fadeUp" className="mb-6 space-y-1">
            <h1 className="block">
              <span className="block mb-8 font-youngest text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tight text-arylideYellow drop-shadow-2xl">
                {heroData.headingLine1}
              </span>
              <span className="block font-youngest text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl">
                {heroData.headingLine2}
              </span>
            </h1>
          </MotionWrapper>

          {/* Opis (PortableText) */}
          <MotionWrapper
            variant="fadeUp"
            className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:max-w-3xl md:text-xl [&>p]:mb-4 last:[&>p]:mb-0"
          >
            {heroData.description && (
              <PortableText value={heroData.description} />
            )}
          </MotionWrapper>

          {/* Linia dekoracyjna */}
          <MotionWrapper
            variant="scale"
            delay={0.6}
            className="mx-auto mt-8 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-linear-to-r from-transparent to-arylideYellow" />
            <span className="h-1.5 w-1.5 rounded-full bg-arylideYellow shadow-lg shadow-arylideYellow/50" />
            <span className="h-px w-12 bg-linear-to-l from-transparent to-arylideYellow" />
          </MotionWrapper>
        </StaggerContainer>
      </div>
    </header>
  );
}
