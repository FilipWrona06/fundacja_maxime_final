// Plik: src/app/(user)/aktualnosci/page.tsx

import type { Metadata } from "next";

// Komponenty wewnętrzne
import { FeaturedNews } from "@/components/news/FeaturedNews";
import { NewsFilterGrid } from "@/components/news/NewsGrid";
import { NewsHero } from "@/components/news/NewsHero";

// Typy i zapytania
import type { NewsArticleType } from "@/lib/types";
import { getAllNews, getNewsPageSettings } from "@/sanity/lib/queries/news";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getNewsPageSettings();
  return {
    title: settings?.seo?.metaTitle || "Aktualności | Fundacja Maxime",
    description:
      settings?.seo?.metaDescription ||
      "Najnowsze wiadomości ze świata fundacji.",
  };
}

export default async function AktualnosciPage() {
  // Pobieramy równolegle ustawienia strony i artykuły
  const [settings, allNews] = await Promise.all([
    getNewsPageSettings(),
    getAllNews(),
  ]);

  // Fallbacki dla Hero
  const heroData = {
    badge: "Bądź na bieżąco",
    line1: settings?.heroHeading || "Aktualności",
    line2: settings?.heroSubheading || "Fundacji",
    desc:
      settings?.heroDescription ||
      "Najnowsze wiadomości, wydarzenia i relacje z naszych koncertów",
  };

  // Fallbacki dla Newslettera

  const newestArticle = allNews.length > 0 ? allNews[0] : null;
  const featuredArticle = allNews.find((item) => item.featured) || null;

  const highlightedNews: NewsArticleType[] = [];
  if (newestArticle) highlightedNews.push(newestArticle);
  if (featuredArticle && featuredArticle._id !== newestArticle?._id) {
    highlightedNews.push(featuredArticle);
  }

  return (
    <div className="min-h-screen overflow-x-hidden pb-20 pt-32">
      <NewsHero
        badge={heroData.badge}
        titleLine1={heroData.line1}
        titleLine2={heroData.line2}
        description={heroData.desc}
      />

      <FeaturedNews
        highlightedNews={highlightedNews}
        newestId={newestArticle?._id || ""}
      />

      <NewsFilterGrid
        allNews={allNews}
        newestId={newestArticle?._id}
        featuredId={featuredArticle?._id}
      />
    </div>
  );
}
