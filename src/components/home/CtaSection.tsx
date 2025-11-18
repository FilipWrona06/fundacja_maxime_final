import { getCTASectionData } from "@/sanity/lib/queries/home";
import { CTASectionClient } from "./CtaSection.client";

// Definicja typów dla przycisków dla lepszej czytelności i bezpieczeństwa
interface ButtonProps {
  label: string;
  link: string;
}

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
    // Komponent kliencki nie musi już znać konkretnych URL-i jak "patroniteUrl".
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

        {/* Subheading - dane z Sanity */}
        {ctaData.text && (
          <p className="mx-auto mb-3 max-w-2xl text-[0.95rem] leading-relaxed text-white/80 sm:mb-5 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
            {ctaData.text}
          </p>
        )}
      </div>
    </CTASectionClient>
  );
}