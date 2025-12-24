// Plik: src/components/news/slug/RelatedNews.tsx

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

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

export const RelatedNews = ({ news }: { news: NewsArticleType[] }) => {
  // Jeśli brak newsów, nie renderujemy nic
  if (!news || news.length === 0) return null;

  // Przetwarzanie danych na serwerze
  const items = news.map((item) => ({
    _id: item._id,
    title: item.title,
    slug: item.slug.current,
    imageUrl: urlFor(item.image).width(600).url(),
    formattedDate: formatDate(item.date),
  }));

  return (
    <section className="mt-24 mb-20">
      <div className="container mx-auto px-6">
        {/* Nagłówek sekcji */}
        <MotionWrapper
          variant="fadeUp"
          duration={0.8}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Warte{" "}
            <span className="font-youngest text-arylideYellow">
              przeczytania
            </span>
          </h2>
        </MotionWrapper>

        {/* Grid artykułów z kaskadowym wejściem (Stagger) */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <MotionWrapper
              key={item._id}
              variant="fadeUp"
              duration={0.6}
              className="h-full"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10 hover:shadow-xl hover:-translate-y-2">
                {/* Zdjęcie */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-transparent to-transparent" />
                </div>

                {/* Treść */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} className="text-arylideYellow" />
                      {item.formattedDate}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-arylideYellow line-clamp-2">
                    {item.title}
                  </h3>

                  <Link
                    href={`/aktualnosci/${item.slug}`}
                    className="group/btn mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold text-arylideYellow transition-all duration-300 hover:gap-3"
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
