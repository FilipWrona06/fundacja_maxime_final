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
 * Pobiera listę galerii (zdjęcia, opisy, wideo).
 * Teraz pobiera OSOBNE dokumenty typu 'gallery'.
 */
export const getGalleriesList = cache(
  async (): Promise<GaleriaPageData["galleries"] | null> => {
    const data = await client.fetch<GaleriaPageData["galleries"]>(
      // ZMIANA: Pobieramy dokumenty typu "gallery" i sortujemy po dacie malejąco
      groq`*[_type == "gallery"] | order(date desc) {
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
          // Wyciągamy URL do logo, aby frontend mógł go wyświetlić
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
      {},
      // Tagujemy "gallery", aby webhook mógł odświeżyć listę po dodaniu nowego koncertu
      { next: { tags: ["gallery"] } },
    );

    return data || [];
  },
);