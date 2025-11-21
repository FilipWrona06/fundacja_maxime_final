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
 */
export const getGalleriesList = cache(
  async (): Promise<GaleriaPageData["galleries"] | null> => {
    const data = await client.fetch<{
      galleries: GaleriaPageData["galleries"];
    }>(
      groq`*[_type == "galeriaPage"][0]{
        galleries[]{
          // Mapujemy _key na _id (wymagane przez React)
          "_id": _key,
          
          title,
          slug,
          date,
          location,
          
          // Nowe pola (Storytelling, Wideo, Partnerzy)
          description,
          videoUrl,
          partners,

          // Zdjęcia (bez rozwijania referencji ->, aby urlFor działał poprawnie)
          images[]{
            _key,
            alt,
            caption,
            asset,
            hotspot,
            crop
          }
        }
      }`,
      {},
      { next: { tags: ["gallery-page", "gallery"] } },
    );

    return data?.galleries ?? null;
  },
);