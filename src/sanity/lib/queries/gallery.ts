import { groq } from "next-sanity";
import { cache } from "react";
import type { GaleriaPageData } from "@/lib/types/index";
import { client } from "../client";

/**
 * Zbiór funkcji do pobierania danych wyłącznie dla strony galerii.
 */

/**
 * Pobiera dane SEO dla strony galerii.
 */
export const getGallerySeoData = cache(
  async (): Promise<GaleriaPageData["seo"] | null> => {
    const data = await client.fetch<{ seo: GaleriaPageData["seo"] }>(
      groq`*[_type == "galeriaPage"][0]{ seo }`,
      {},
      { next: { tags: ["gallery-page"] } },
    );
    return data?.seo ?? null;
  },
);

/**
 * Pobiera dane dla sekcji Hero (nagłówek strony galerii).
 */
export const getGalleryHeroData = cache(
  async (): Promise<GaleriaPageData["heroSection"] | null> => {
    const data = await client.fetch<{
      heroSection: GaleriaPageData["heroSection"];
    }>(
      groq`*[_type == "galeriaPage"][0]{ heroSection }`,
      {},
      { next: { tags: ["gallery-page"] } },
    );
    return data?.heroSection ?? null;
  },
);

/**
 * NOWOŚĆ: Pobiera zakres galerii (paginacja).
 * Zastępuje starą funkcję getGalleriesList.
 *
 * @param start Indeks początkowy (np. 0)
 * @param end Indeks końcowy (np. 3)
 */
export const getGalleriesRange = async (start: number, end: number) => {
  try {
    const data = await client.fetch<GaleriaPageData["galleries"]>(
      // Używamy operatora slice [$start...$end] do pobrania wycinka
      groq`*[_type == "gallery"] | order(date desc)[$start...$end] {
        _id,
        title,
        slug,
        date,
        location,
        description,
        videoUrl,
        
        // Pobieramy sponsorów (wpisanych ręcznie w galerii)
        sponsors[]{
          name,
          website,
          "logoUrl": logo.asset->url
        },

        // Zdjęcia (bez rozwijania referencji ->, aby urlFor działał poprawnie)
        images[]{
          _key,
          alt,
          caption,
          asset,
          hotspot,
          crop
        }
      }`,
      { start, end }, // Przekazujemy zmienne do zapytania GROQ
      { next: { tags: ["gallery"] } }, // Tagowanie dla rewalidacji
    );

    return data || [];
  } catch (error) {
    console.error("Błąd pobierania galerii:", error);
    return [];
  }
};

export const getTotalGalleriesCount = async (): Promise<number> => {
  try {
    const count = await client.fetch<number>(
      groq`count(*[_type == "gallery"])`,
      {},
      { next: { tags: ["gallery"] } },
    );
    return count;
  } catch (error) {
    console.error("Błąd pobierania liczby galerii:", error);
    return 0;
  }
};
