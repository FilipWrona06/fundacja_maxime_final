import { groq } from "next-sanity";
import { cache } from "react";

import type { HomePageData } from "@/lib/types"; // Upewnij się, że ten typ zawiera teraz pole `seo`
import { client } from "./client";
import type { GaleriaPageData } from "@/lib/types";

/**
 * Ten plik centralizuje logikę pobierania danych dla strony głównej z Sanity.
 * Każda funkcja jest opakowana w `React.cache`, aby zapobiec duplikowaniu
 * tych samych zapytań w trakcie jednego cyklu renderowania na serwerze.
 */

// --- NOWA FUNKCJA DO POBIERANIA DANYCH SEO ---
/**
 * Pobiera tylko i wyłącznie dane SEO dla strony głównej.
 * Jest to zoptymalizowane do użycia w funkcji `generateMetadata` w `page.tsx`,
 * ponieważ nie pobiera niepotrzebnie danych z innych sekcji.
 */
export const getHomePageSeoData = cache(
  async (): Promise<HomePageData["seo"] | null> => {
    const data = await client.fetch<{ seo: HomePageData["seo"] }>(
      groq`*[_type == "homePage"][0]{ seo }`, // Pobieramy tylko obiekt 'seo'
      {},
      { next: { tags: ["homePage"] } }, // Tagujemy tak samo, bo to część tej samej strony
    );
    return data?.seo ?? null;
  },
);

// --- ISTNIEJĄCE FUNKCJE (BEZ ZMIAN) ---

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

export const getStatsSectionData = cache(
  async (): Promise<HomePageData["statsSection"] | null> => {
    const data = await client.fetch<{
      statsSection: HomePageData["statsSection"];
    }>(
      groq`*[_type == "homePage"][0]{ statsSection }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.statsSection ?? null;
  },
);

export const getAboutSectionData = cache(
  async (): Promise<HomePageData["aboutSection"] | null> => {
    const data = await client.fetch<{
      aboutSection: HomePageData["aboutSection"];
    }>(
      groq`*[_type == "homePage"][0]{ aboutSection }`,
      {},
      { next: { tags: ["homePage"] } },
    );
    return data?.aboutSection ?? null;
  },
);

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

// Dodaj tę funkcję do istniejącego pliku sanity/lib/get-data.ts



/**
 * Pobiera dane dla strony galerii z cache'owaniem
 */
export async function getGalleryPageData(): Promise<GaleriaPageData | null> {
  try {
    const data = await client.fetch<GaleriaPageData>(
      `*[_type == "galeriaPage"][0]{
        seo{
          title,
          description,
          noIndex,
          noFollow,
          canonicalUrl,
          ogTitle,
          ogDescription,
          ogImage
        },
        heroSection{
          badge,
          headingLine1,
          headingLine2,
          description
        },
        galleries[]{
          title,
          date,
          location,
          slug,
          images[]{
            asset,
            alt,
            caption
          }
        }
      }`,
      {},
      {
        cache: "force-cache",
        next: {
          tags: ["gallery-page"],
          revalidate: 3600, // 1 godzina
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error fetching gallery page data:", error);
    return null;
  }
}