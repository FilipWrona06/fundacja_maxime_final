import { getCTASectionData } from "@/sanity/lib/get-data";
import { CTASectionClient } from "./CtaSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla sekcji Call-to-Action.
 * 
 * Odpowiedzialności:
 * 1. Pobieranie danych z Sanity za pomocą z-cache-owanej funkcji.
 * 2. Renderowanie statycznej treści (nagłówek, tekst) do czystego HTML.
 * 3. Przekazanie statycznej treści do Komponentu Klienckiego,
 *    który zajmie się resztą (layout, animacje, przyciski).
 */
export async function CTASection() {
  // Krok 1: Używamy naszej scentralizowanej i z-cache-owanej funkcji.
  const ctaData = await getCTASectionData();

  // Jeśli nie ma danych, nic nie renderujemy.
  if (!ctaData) {
    return null;
  }

  // Krok 2: Zwracamy komponent kliencki, a w środku (jako children) renderujemy statyczną treść.
  return (
    <CTASectionClient>
      {/* Poniższy kod jest renderowany na serwerze. */}
      {/* JS do renderowania h2 i p nie trafia do przeglądarki. */}
      
      <h2
        id="cta-heading"
        className="mb-6 font-youngest text-6xl leading-tight text-arylideYellow md:text-7xl lg:text-8xl"
      >
        {ctaData.heading}
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/70 md:text-2xl">
        {ctaData.text}
      </p>
    </CTASectionClient>
  );
}