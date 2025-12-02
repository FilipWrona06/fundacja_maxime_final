import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { NewsFilterGridClient } from "./NewsGrid.client";

// Helper daty (Server-side)
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const NewsFilterGrid = ({
  allNews,
  newestId,
  featuredId,
}: {
  allNews: NewsArticleType[];
  newestId?: string;
  featuredId?: string;
}) => {
  // Przetwarzanie danych na serwerze
  const preparedItems = allNews.map((item) => ({
    _id: item._id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug.current,
    // Generowanie URL zdjęcia:
    imageUrl: urlFor(item.image).width(600).url(),
    // Formatowanie daty:
    formattedDate: formatDate(item.date),
    // Logika badge'y:
    isNewest: item._id === newestId,
    isFeatured: item._id === featuredId && item._id !== newestId,
  }));

  return <NewsFilterGridClient items={preparedItems} />;
};
