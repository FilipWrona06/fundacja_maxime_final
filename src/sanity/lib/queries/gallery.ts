import { groq } from "next-sanity";
import { cache } from "react";
import type { GaleriaPageData } from "@/lib/types";
import { client } from "../client";

/**
 * Pobiera wszystkie dane potrzebne do renderowania strony galerii.
 * Funkcja jest opakowana w React.cache, aby zapewnić, że zapytanie
 * zostanie wykonane tylko raz podczas cyklu renderowania.
 */
export const getGalleryPageData = cache(
  async (): Promise<GaleriaPageData | null> => {
    try {
      const data = await client.fetch<GaleriaPageData>(
        groq`*[_type == "galeriaPage"][0]{
          seo,
          heroSection,
          galleries[]{
            title,
            date,
            location,
            slug,
            images[]{
              alt,
              caption,
              asset-> // KLUCZOWA ZMIANA: Rozwija referencję do pliku (assetu)
            }
          }
        }`,
        {},
        {
          // Używamy tych samych opcji co w oryginalnym pliku dla spójności
          cache: "force-cache",
          next: {
            tags: ["gallery-page", "gallery"], // Dodajemy tagi do rewalidacji
          },
        },
      );

      return data;
    } catch (error) {
      // Logujemy błąd na serwerze, ale nie przerywamy budowania strony
      console.error("Błąd podczas pobierania danych dla strony galerii:", error);
      return null;
    }
  },
);