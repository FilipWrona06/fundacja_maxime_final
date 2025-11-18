import { getHeroSectionData } from "@/sanity/lib/queries/home";
import { HeroSectionClient } from "./HeroSection.client";

/**
 * To jest asynchroniczny Komponent Serwerowy (RSC).
 * Jego jedynym zadaniem jest pobranie danych dla sekcji Hero
 * i przekazanie ich do interaktywnego Komponentu Klienckiego.
 * Taki wzorzec oddziela logikę pobierania danych od logiki UI.
 */
export async function HeroSection() {
  // 1. Pobieramy dane na serwerze, używając naszej z-cache-owanej funkcji.
  const heroData = await getHeroSectionData();

  // 2. ZMIANA: Ulepszone sprawdzanie danych.
  //    Upewniamy się, że kluczowe, wymagane dane (jak nagłówek i główny przycisk)
  //    faktycznie istnieją, zanim spróbujemy cokolwiek renderować.
  //    Zapobiega to błędom w przypadku niekompletnych danych z CMS.
  if (!heroData || !heroData.headingPart1 || !heroData.primaryButton) {
    return null;
  }

  // 3. Renderujemy Komponent Kliencki i przekazujemy mu pobrane dane jako props.
  //    Ten fragment pozostaje bez zmian, ponieważ przekazujemy cały obiekt 'heroData',
  //    a komponent kliencki zajmie się jego wykorzystaniem.
  return <HeroSectionClient heroData={heroData} />;
}