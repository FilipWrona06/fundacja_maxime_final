import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { RelatedNewsClient } from "./RelatedNews.client";

// Helper daty (Server-side)
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const RelatedNews = ({ news }: { news: NewsArticleType[] }) => {
  // Jeśli brak newsów, nie renderujemy nic (oszczędzamy zasoby klienta)
  if (!news || news.length === 0) return null;

  // Przetwarzanie danych na serwerze
  const preparedItems = news.map((item) => ({
    _id: item._id,
    title: item.title,
    slug: item.slug.current,
    // Generowanie URL zdjęcia (600px szerokości wystarczy na kafelki):
    imageUrl: urlFor(item.image).width(600).url(),
    // Formatowanie daty:
    formattedDate: formatDate(item.date),
  }));

  return <RelatedNewsClient items={preparedItems} />;
};