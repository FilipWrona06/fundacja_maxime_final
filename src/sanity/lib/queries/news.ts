// Plik: src/sanity/lib/queries/news.ts

import { groq } from "next-sanity";
import { cache } from "react";
import type { NewsArticleType, NewsPageSettings } from "@/lib/types";
import { client } from "../client";

/**
 * Pobiera ustawienia strony aktualności (Hero, Newsletter, SEO).
 */
export const getNewsPageSettings = cache(
  async (): Promise<NewsPageSettings | null> => {
    const data = await client.fetch<NewsPageSettings>(
      groq`*[_type == "newsPage"][0]{
      seo,
      heroHeading,
      heroSubheading,
      heroDescription,
      newsletter // <--- Pobieramy dane newslettera
    }`,
      {},
      { next: { tags: ["newsPage"] } },
    );
    return data ?? null;
  },
);

/**
 * Pobiera wszystkie artykuły posortowane od najnowszego.
 * USUNIĘTO: author, category, dateDisplay
 */
export const getAllNews = cache(async (): Promise<NewsArticleType[]> => {
  const data = await client.fetch<NewsArticleType[]>(
    groq`*[_type == "newsArticle"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      image,
      excerpt,
      featured
    }`,
    {},
    { next: { tags: ["newsArticle"] } },
  );
  return data || [];
});

/**
 * Pobiera pojedynczy artykuł po slugu.
 * Rozwija content (PortableText).
 */
export const getNewsBySlug = cache(
  async (slug: string): Promise<NewsArticleType | null> => {
    const data = await client.fetch<NewsArticleType>(
      groq`*[_type == "newsArticle" && slug.current == $slug][0] {
      ...,
      content[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      },
      seo
    }`,
      { slug },
      { next: { tags: ["newsArticle"] } },
    );
    return data ?? null;
  },
);

/**
 * Pobiera slug'i do generowania statycznego.
 */
export const getNewsSlugs = cache(async (): Promise<string[]> => {
  const data = await client.fetch<string[]>(
    groq`*[_type == "newsArticle" && defined(slug.current)][].slug.current`,
    {},
    { next: { tags: ["newsArticle"] } },
  );
  return data || [];
});
