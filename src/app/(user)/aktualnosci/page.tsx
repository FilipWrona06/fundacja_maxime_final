// Plik: src/app/(user)/aktualnosci/page.tsx

import type { Metadata } from "next";

// Komponenty wewnętrzne
import { FeaturedNewsClient } from "@/components/news/FeaturedNews";
import { NewsFilterGridClient } from "@/components/news/NewsGrid";
import { NewsHeroClient } from "@/components/news/NewsHero";
import { NewsNewsletterClient } from "@/components/news/NewsNewsletter";

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
  const newsletterData = {
    heading: settings?.newsletter?.heading || "Nie przegap żadnej Wiadomości",
    text:
      settings?.newsletter?.text ||
      "Zapisz się do naszego newslettera i otrzymuj najnowsze informacje...",
    buttonLabel: settings?.newsletter?.buttonLabel || "Zapisz się",
  };

  const newestArticle = allNews.length > 0 ? allNews[0] : null;
  const featuredArticle = allNews.find((item) => item.featured) || null;

  const highlightedNews: NewsArticleType[] = [];
  if (newestArticle) highlightedNews.push(newestArticle);
  if (featuredArticle && featuredArticle._id !== newestArticle?._id) {
    highlightedNews.push(featuredArticle);
  }

  return (
    <div className="min-h-screen overflow-x-hidden pb-20 pt-32">
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

      <NewsNewsletterClient
        heading={newsletterData.heading}
        text={newsletterData.text}
        buttonLabel={newsletterData.buttonLabel}
      />
    </div>
  );
}
