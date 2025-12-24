// Plik: src/components/news/FeaturedNews.tsx

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

// Importujemy "Wyspy Klienckie" do animacji
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

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
  const items = highlightedNews.map((item) => ({
    _id: item._id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug.current,
    formattedDate: formatDate(item.date),
    isNewest: item._id === newestId,
    imageUrl: urlFor(item.image)
      .width(isSingleMode ? 1200 : 800)
      .url(),
  }));

  return (
    <section className="mb-32">
      <div className="container mx-auto px-6">
        {/* Nagłówek sekcji - animacja wejścia */}
        <MotionWrapper
          variant="slideLeft"
          duration={0.6}
          className="mb-12 text-3xl font-bold md:text-4xl"
        >
          <h2>Na Czasie</h2>
        </MotionWrapper>

        {/* Grid artykułów z kaskadowym wejściem */}
        <StaggerContainer
          staggerDelay={0.1}
          className={`grid grid-cols-1 gap-8 ${
            isSingleMode ? "lg:grid-cols-1" : "lg:grid-cols-2"
          }`}
        >
          {items.map((item, index) => (
            <MotionWrapper
              key={item._id}
              variant="fadeUp"
              duration={0.6}
              className="h-full"
            >
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:-translate-y-2">
                <div
                  className={`relative overflow-hidden ${
                    isSingleMode ? "h-96 md:h-[500px]" : "h-96"
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />

                  <span className="absolute left-6 top-6 rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-4 py-2 text-xs font-semibold text-arylideYellow backdrop-blur-md shadow-lg">
                    {item.isNewest ? "Najnowszy" : "Wyróżniony"}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-2">
                      <FiCalendar size={14} className="text-arylideYellow" />
                      {item.formattedDate}
                    </span>
                  </div>

                  <h3
                    className={`mb-3 font-bold transition-colors duration-300 group-hover:text-arylideYellow ${
                      isSingleMode ? "text-3xl md:text-5xl" : "text-3xl"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mb-6 text-white/70 leading-relaxed ${
                      isSingleMode ? "text-lg max-w-3xl" : "line-clamp-2"
                    }`}
                  >
                    {item.excerpt}
                  </p>

                  <Link
                    href={`/aktualnosci/${item.slug}`}
                    className="group/btn inline-flex items-center gap-2 font-semibold text-arylideYellow transition-all duration-300 hover:gap-3"
                  >
                    Czytaj więcej
                    <FiArrowRight />
                  </Link>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
