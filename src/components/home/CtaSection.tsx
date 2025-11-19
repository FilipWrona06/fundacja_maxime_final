// Plik: src/components/home/CtaSection.tsx (wersja zrefaktoryzowana)

import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { PortableTextContent } from "@/lib/types"; // Upewnij się, że ten import jest poprawny w Twoim projekcie
import { getCTASectionData } from "@/sanity/lib/queries/home";
import { CTASectionClient } from "./CtaSection.client";

// Definicja typów dla przycisków
interface ButtonProps {
  label: string;
  link: string;
}

// Konfiguracja Portable Text do obsługi linków
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
  // 1. Pobieranie danych z Sanity
  const ctaData = await getCTASectionData();

  // 2. Zabezpieczenie przed brakiem kluczowych danych
  if (!ctaData || !ctaData.heading || !ctaData.primaryButton) {
    return null;
  }

  // 3. Przygotowanie propsów dla komponentu klienckiego
  const primaryButton: ButtonProps = ctaData.primaryButton;
  const secondaryButton: ButtonProps | undefined = ctaData.secondaryButton;

  // 4. Przygotowanie statycznej treści (nagłówek i tekst) jako JSX
  const content = (
    <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
      <h2
        id="cta-heading"
        className="font-youngest text-[2rem] leading-tight text-arylideYellow drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        {ctaData.heading}
      </h2>
      {ctaData.text && (
        <div className="prose prose-invert mx-auto max-w-2xl text-[0.95rem] leading-relaxed text-white/80 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
          <PortableText
            value={ctaData.text as PortableTextContent} // Użyj asercji typu, jeśli jest potrzebna
            components={ctaPortableTextComponents}
          />
        </div>
      )}
    </div>
  );

  // 5. Renderowanie statycznej otoczki i przekazanie danych do komponentu klienckiego
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40"
      aria-labelledby="cta-heading"
    >
      {/* Dekoracyjne tło renderowane na serwerze */}
      <div className="absolute left-1/4 top-25 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* Komponent kliencki renderuje już tylko animowaną kartę */}
        <CTASectionClient
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
        >
          {content}
        </CTASectionClient>
      </div>
    </section>
  );
}
