import { groq } from "next-sanity";
import { cache } from "react";
import type { HomePageData } from "@/lib/types";
import { client } from "../client";

/**
 * Zbiór funkcji do pobierania danych wyłącznie dla strony głównej.
 */

/**
 * Pobiera dane SEO dla strony głównej.
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
        // USUNIĘTO FILTR: Sekcja będzie pobierana zawsze.
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
 * Pobiera dane dla sekcji "O Fundacji".
 */
export const getAboutSectionData = cache(
  async (): Promise<HomePageData["aboutSection"] | null> => {
    const data = await client.fetch<{
      aboutSection: HomePageData["aboutSection"];
    }>(
      groq`*[_type == "homePage"][0]{
        // USUNIĘTO FILTR: Sekcja będzie pobierana zawsze.
        aboutSection {
          ...,
          "imageUrl": image.asset->url,
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
      groq`*[_type == "homePage"][0]{
        // USUNIĘTO FILTR: Sekcja będzie pobierana zawsze.
        impactSection {
          ...,
          impactCards[] {
            ...,
            "imageUrl": image.asset->url
          }
        }
      }`,
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
      groq`*[_type == "homePage"][0]{
        // USUNIĘTO FILTR: Sekcja będzie pobierana zawsze.
        timelineSection {
          ...,
          timelineEvents[] {
            ...,
            "imageUrl": image.asset->url
          }
        }
      }`,
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
      // USUNIĘTO FILTR: Sekcja będzie pobierana zawsze.
      groq`*[_type == "homePage"][0]{ ctaSection }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.ctaSection ?? null;
  },
);
