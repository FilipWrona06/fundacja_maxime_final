// Plik: src/components/news/slug/ArticleHero.tsx

import Image from "next/image";
import { FiCalendar } from "react-icons/fi";

// Importujemy Twoje wrappery do animacji
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Helper daty (Server-side)
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const ArticleHero = ({ article }: { article: NewsArticleType }) => {
  // Generowanie URL-i
  const imageUrl = urlFor(article.image).width(1920).quality(90).url();
  const blurDataUrl = urlFor(article.image).width(20).blur(10).url();
  const formattedDate = formatDate(article.date);

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full">
      {/* 
        WARSTWA TŁA (Statyczny HTML dla szybkiego LCP)
        Obrazek ładuje się natychmiast, nie czekamy na hydrację JS.
      */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority // Kluczowe dla Hero - ładuje obrazek priorytetowo
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
        <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/70 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-raisinBlack/40" />
      </div>

      {/* 
        WARSTWA TREŚCI (Animowana)
        StaggerContainer zarządza kolejnością pojawiania się badge'a i tytułu.
      */}
      <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-end px-6 pb-20">
        <StaggerContainer
          staggerDelay={0.2}
          delayChildren={0.2}
          className="w-full"
        >
          {/* Badge z datą */}
          <MotionWrapper variant="fadeUp" duration={0.8}>
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-white/90">
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-md border border-white/10">
                <FiCalendar size={16} className="text-arylideYellow" />
                {formattedDate}
              </span>
            </div>
          </MotionWrapper>

          {/* Tytuł artykułu */}
          <MotionWrapper variant="fadeUp" duration={0.8}>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] md:text-6xl lg:text-7xl drop-shadow-2xl">
              {article.title}
            </h1>
          </MotionWrapper>
        </StaggerContainer>
      </div>
    </section>
  );
};
