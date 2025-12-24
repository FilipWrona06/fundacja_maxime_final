import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
// 1. IMPORTUJEMY BIBLIOTEKĘ I WIDEO
import Video from "next-video";
// UWAGA: Ścieżka zależy od tego, gdzie jest ten plik względem folderu /videos.
// Zakładam, że HeroSection jest głęboko w components, więc wychodzimy do głównego katalogu.
// Zmień nazwę pliku na taką, jaką wrzuciłeś do folderu videos.
import backgroundVideo from "../../../videos/background-video.mp4";

import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { getHeroSectionData } from "@/sanity/lib/queries/home";
import { HeroButtonWrapper, ScrollArrow } from "./HeroComponents";
import { HeroParallax } from "./HeroParallax";

// --- KONFIGURACJA PORTABLE TEXT (Bez zmian) ---
const myPortableTextComponents: PortableTextComponents = {
  types: {
    horizontalRule: () => <hr className="my-8 border-white/20" />,
    spacer: () => <div className="h-8" aria-hidden="true" />,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-arylideYellow underline hover:no-underline"
        >
          {children}
        </a>
      );
    },
  },
};

// --- HELPER DLA PRZYCISKU (Bez zmian) ---
const renderButton = (
  href: string,
  label: string,
  variant: "primary" | "secondary" = "primary",
) => {
  const primaryClasses =
    "bg-arylideYellow text-raisinBlack shadow-lg hover:shadow-arylideYellow/30";
  const secondaryClasses =
    "border-2 border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-arylideYellow/50 hover:bg-white/10";

  return (
    <HeroButtonWrapper>
      <Link
        href={href}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold overflow-hidden transition-all duration-300 sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 ${
          variant === "primary" ? primaryClasses : secondaryClasses
        }`}
      >
        <span className="relative z-10">{label}</span>
      </Link>
    </HeroButtonWrapper>
  );
};

// --- GŁÓWNY KOMPONENT ---
export async function HeroSection() {
  const heroData = await getHeroSectionData();

  if (!heroData || !heroData.headingPart1 || !heroData.primaryButton) {
    return null;
  }

  // 2. TWORZENIE SLOTU WIDEO PRZY UŻYCIU NEXT-VIDEO
  // Zastępujemy standardowy tag <video> komponentem <Video> z next-video
  // Atrybuty są ustawione tak, aby działało to jako tło (zgodnie z filmikiem)
  const videoSlot = (
    <Video
      src={backgroundVideo} // Tutaj przekazujemy zaimportowany plik
      autoPlay
      muted
      loop
      playsInline
      controls={false} // Ukrywamy kontrolki playera
      className="h-full w-full object-cover" // Zachowujemy style wypełniające tło
    />
  );

  // --- RESZTA KODU BEZ ZMIAN ---
  const contentSlot = (
    <>
      {/* Badge */}
      {heroData.badgeText && (
        <MotionWrapper variant="fadeUp" delay={0.1} duration={0.7}>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-arylideYellow">
            {heroData.badgeText}
          </p>
        </MotionWrapper>
      )}

      {/* Nagłówek H1 */}
      <h1 id="hero-heading" className="mb-6 mt-2 sm:mt-0 md:mb-10">
        <MotionWrapper variant="fadeUp" delay={0.3} duration={0.7}>
          <span className="mb-4 block font-youngest text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight text-arylideYellow drop-shadow-2xl md:mb-6">
            {heroData.headingPart1}
          </span>
        </MotionWrapper>
        <MotionWrapper variant="fadeUp" delay={0.4} duration={0.7}>
          <span className="block pb-4 font-youngest text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl">
            {heroData.headingPart2}
          </span>
        </MotionWrapper>
      </h1>

      {/* Opis */}
      <MotionWrapper variant="fadeUp" delay={0.5} duration={0.7}>
        <div className="prose prose-invert mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white drop-shadow-lg md:mb-10 md:text-xl md:leading-relaxed lg:leading-loose">
          <PortableText
            value={heroData.description}
            components={myPortableTextComponents}
          />
        </div>
      </MotionWrapper>

      {/* Przyciski */}
      <MotionWrapper variant="fadeUp" delay={0.9} duration={0.7}>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:gap-5">
          {renderButton(
            heroData.primaryButton.link,
            heroData.primaryButton.label,
            "primary",
          )}
          {heroData.secondaryButton &&
            renderButton(
              heroData.secondaryButton.link,
              heroData.secondaryButton.label,
              "secondary",
            )}
        </div>
      </MotionWrapper>
    </>
  );

  // Przekazujemy posterUrl z Sanity jako fallback, chociaż next-video ma własny mechanizm placeholderów
  return (
    <HeroParallax
      posterUrl={heroData.posterUrl} 
      videoSlot={videoSlot}
      contentSlot={contentSlot}
      arrowSlot={<ScrollArrow />}
    />
  );
}