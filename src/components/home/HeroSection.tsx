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

  // 2. Jeśli z jakiegoś powodu danych nie ma, nic nie renderujemy.
  if (!heroData) {
    return null;
  }

  // 3. Renderujemy Komponent Kliencki i przekazujemy mu pobrane dane jako props.
  return <HeroSectionClient heroData={heroData} />;
}
