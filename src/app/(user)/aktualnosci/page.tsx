// Plik: src/app/(user)/aktualnosci/page.tsx

import type { Metadata } from "next";
import { FeaturedNewsClient } from "@/components/news/FeaturedNews";
import { NewsFilterGridClient } from "@/components/news/NewsGrid";
import { NewsHeroClient } from "@/components/news/NewsHero";
import { NewsNewsletterClient } from "@/components/news/NewsNewsletter";
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

  // Fallbacki dla danych tekstowych, jeśli jeszcze nie ma ich w CMS
  const heroData = {
    badge: "Bądź na bieżąco",
    line1: settings?.heroHeading || "Aktualności",
    line2: settings?.heroSubheading || "Fundacji",
    desc:
      settings?.heroDescription ||
      "Najnowsze wiadomości, wydarzenia i relacje z naszych koncertów",
  };

  const newestArticle = allNews.length > 0 ? allNews[0] : null;
  const featuredArticle = allNews.find((item) => item.featured) || null;

  const highlightedNews = [];
  if (newestArticle) highlightedNews.push(newestArticle);
  if (featuredArticle && featuredArticle._id !== newestArticle?._id) {
    highlightedNews.push(featuredArticle);
  }

  return (
    <div className="min-h-screen pt-32 pb-20 overflow-x-hidden">
      {/* Przekazujemy dane z CMS do Hero */}
      <NewsHeroClient
        badge={heroData.badge}
        titleLine1={heroData.line1}
        titleLine2={heroData.line2}
        description={heroData.desc}
      />

      <FeaturedNewsClient
        highlightedNews={highlightedNews}
        newestId={newestArticle?._id || ""}
      />

      <NewsFilterGridClient
        allNews={allNews}
        newestId={newestArticle?._id}
        featuredId={featuredArticle?._id}
      />

      <NewsNewsletterClient />
    </div>
  );
}
