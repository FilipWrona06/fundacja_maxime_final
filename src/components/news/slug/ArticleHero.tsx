import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { ArticleHeroClient } from "./ArticleHero.client";

// Helper daty (Server-side only)
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const ArticleHero = ({ article }: { article: NewsArticleType }) => {
  // Generowanie URL-i na serwerze
  const imageUrl = urlFor(article.image).width(1920).quality(90).url();

  // Generowanie URL dla placeholdera (bardzo mały obrazek, mocno rozmyty)
  const blurDataUrl = urlFor(article.image).width(20).blur(10).url();

  return (
    <ArticleHeroClient
      title={article.title}
      formattedDate={formatDate(article.date)}
      imageUrl={imageUrl}
      blurDataUrl={blurDataUrl}
    />
  );
};
