// Plik: src/components/home/CtaSection.tsx (zaktualizowana wersja)

import type { PortableTextComponents } from "@portabletext/react";
// --- IMPORTY ---
// Dodajemy importy dla PortableText, wzorując się na AboutSection
import { PortableText } from "@portabletext/react";
import { getCTASectionData } from "@/sanity/lib/queries/home";
import { CTASectionClient } from "./CtaSection.client";

// Definicja typów dla przycisków dla lepszej czytelności i bezpieczeństwa
interface ButtonProps {
  label: string;
  link: string;
}

// --- KONFIGURACJA PORTABLE TEXT DLA TEJ SEKCJI ---
// Prosta konfiguracja do obsługi linków w tekście.
const ctaPortableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-arylideYellow underline transition-colors hover:text-arylideYellow/80"
        >
          {children}
        </a>
      );
    },
  },
};

export async function CTASection() {
  const ctaData = await getCTASectionData();

  // Ulepszone sprawdzanie: upewniamy się, że kluczowe dane istnieją,
  // aby uniknąć błędów w trakcie renderowania.
  if (!ctaData || !ctaData.heading || !ctaData.primaryButton) {
    return null;
  }

  // Wyodrębniamy dane przycisków dla czystości kodu.
  const primaryButton: ButtonProps = ctaData.primaryButton;
  const secondaryButton: ButtonProps | undefined = ctaData.secondaryButton;

  return (
    // Przekazujemy pełne obiekty przycisków oraz treść jako `children`.
    <CTASectionClient
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    >
      <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
        {/* Main heading - dane z Sanity */}
        <h2
          id="cta-heading"
          className="font-youngest text-[2rem] leading-tight text-arylideYellow drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {ctaData.heading}
        </h2>

        {/* Subheading - ZAKTUALIZOWANE RENDEROWANIE ZA POMOCĄ PORTABLE TEXT */}
        {ctaData.text && (
          <div className="prose prose-invert mx-auto max-w-2xl text-[0.95rem] leading-relaxed text-white/80 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
            <PortableText
              value={ctaData.text}
              components={ctaPortableTextComponents}
            />
          </div>
        )}
      </div>
    </CTASectionClient>
  );
}
