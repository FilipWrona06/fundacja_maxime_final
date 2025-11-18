import { groq } from "next-sanity";
import { cache } from "react";
import type { HomePageData } from "@/lib/types";
import { client } from "../client";

/**
 * Zbiór funkcji do pobierania danych wyłącznie dla strony głównej.
 * Każda funkcja jest opakowana w React.cache, aby zdeduplikować zapytania
 * w trakcie jednego cyklu renderowania.
 */

/**
 * Pobiera tylko i wyłącznie dane SEO dla strony głównej.
 * Zoptymalizowane do użycia w `generateMetadata`.
 */
export const getHomePageSeoData = cache(
  async (): Promise<HomePageData["seo"] | null> => {
    const data = await client.fetch<{ seo: HomePageData["seo"] }>(
      groq`*[_type == "homePage"][0]{ seo }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.seo ?? null;
  },
);

/**
 * Pobiera dane dla sekcji Hero.
 */
export const getHeroSectionData = cache(
  async (): Promise<HomePageData["heroSection"] | null> => {
    const data = await client.fetch<{
      heroSection: HomePageData["heroSection"];
    }>(
      groq`*[_type == "homePage"][0]{
        heroSection {
          ...,
          "videoWebmUrl": videoWebm.asset->url,
          "videoMp4Url": videoMp4.asset->url,
          "posterUrl": poster.asset->url
        }
      }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.heroSection ?? null;
  },
);

/**
 * Pobiera dane dla sekcji "O Fundacji", włączając w to zagnieżdżone statystyki.
 */
export const getAboutSectionData = cache(
  async (): Promise<HomePageData["aboutSection"] | null> => {
    const data = await client.fetch<{
      aboutSection: HomePageData["aboutSection"];
    }>(
      // Zaktualizowane zapytanie: pobieramy cały obiekt aboutSection,
      // a w nim rozwijamy tablicę 'stats'.
      groq`*[_type == "homePage"][0]{
        aboutSection {
          ...,
          stats[] {
            value,
            label
          }
        }
      }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.aboutSection ?? null;
  },
);

/**
 * Pobiera dane dla sekcji "Nasz Wpływ".
 */
export const getImpactSectionData = cache(
  async (): Promise<HomePageData["impactSection"] | null> => {
    const data = await client.fetch<{
      impactSection: HomePageData["impactSection"];
    }>(
      groq`*[_type == "homePage"][0]{ impactSection }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.impactSection ?? null;
  },
);

/**
 * Pobiera dane dla sekcji "Nasza Historia" (oś czasu).
 */
export const getTimelineSectionData = cache(
  async (): Promise<HomePageData["timelineSection"] | null> => {
    const data = await client.fetch<{
      timelineSection: HomePageData["timelineSection"];
    }>(
      groq`*[_type == "homePage"][0]{ timelineSection }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.timelineSection ?? null;
  },
);

/**
 * Pobiera dane dla sekcji Wezwania do Działania (CTA).
 */
export const getCTASectionData = cache(
  async (): Promise<HomePageData["ctaSection"] | null> => {
    const data = await client.fetch<{ ctaSection: HomePageData["ctaSection"] }>(
      groq`*[_type == "homePage"][0]{ ctaSection }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.ctaSection ?? null;
  },
);