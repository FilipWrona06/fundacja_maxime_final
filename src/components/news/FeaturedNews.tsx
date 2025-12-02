import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { FeaturedNewsClient } from "./FeaturedNews.client";

// Helper daty (działa bezpiecznie na serwerze)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const FeaturedNews = ({
  highlightedNews,
  newestId,
}: {
  highlightedNews: NewsArticleType[];
  newestId: string;
}) => {
  if (highlightedNews.length === 0) return null;

  const isSingleMode = highlightedNews.length === 1;

  // PRZYGOTOWANIE DANYCH NA SERWERZE
  // Dzięki temu klient nie pobiera biblioteki Sanity image buildera ani logiki daty
  const preparedItems = highlightedNews.map((item) => ({
    _id: item._id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug.current,
    formattedDate: formatDate(item.date),
    isNewest: item._id === newestId,
    // Generujemy finalny URL tutaj:
    imageUrl: urlFor(item.image)
      .width(isSingleMode ? 1200 : 800)
      .url(),
  }));

  return (
    <section className="mb-32">
      <div className="container mx-auto px-6">
        <FeaturedNewsClient items={preparedItems} isSingleMode={isSingleMode} />
      </div>
    </section>
  );
};
