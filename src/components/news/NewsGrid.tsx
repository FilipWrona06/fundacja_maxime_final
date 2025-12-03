// Plik: src/components/news/NewsGrid.tsx

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiGrid } from "react-icons/fi";

// Importujemy "Wyspy Klienckie" do animacji
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Helper daty (działa na serwerze)
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
  const items = allNews.map((item) => ({
    _id: item._id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug.current,
    imageUrl: urlFor(item.image).width(600).url(),
    formattedDate: formatDate(item.date),
    isNewest: item._id === newestId,
    isFeatured: item._id === featuredId && item._id !== newestId,
  }));

  return (
    <section>
      <div className="container mx-auto px-6">
        {/* --- SEKCJA NAGŁÓWKA --- */}
        {/* Animujemy wejście całego nagłówka */}
        <MotionWrapper
          variant="fadeUp"
          duration={0.6}
          className="mb-12 flex flex-col items-center justify-center text-center"
        >
          {/* Ozdobny separator */}
          <div className="mb-6 flex items-center justify-center gap-4 opacity-50">
            <span className="h-px w-16 bg-linear-to-r from-transparent to-arylideYellow"></span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-arylideYellow/30 bg-arylideYellow/10 text-arylideYellow">
              <FiGrid size={14} />
            </div>
            <span className="h-px w-16 bg-linear-to-l from-transparent to-arylideYellow"></span>
          </div>

          {/* Tytuł Sekcji */}
          <h2 className="text-3xl font-bold md:text-4xl text-white">
            Wszystkie{" "}
            <span className="font-youngest text-arylideYellow text-4xl md:text-5xl ml-2">
              Wpisy
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-white/60 text-sm md:text-base">
            Przeglądaj archiwum naszych wydarzeń, relacji i ogłoszeń.
          </p>
        </MotionWrapper>

        {/* --- GRID ARTYKUŁÓW --- */}
        {items.length > 0 ? (
          // StaggerContainer zarządza kaskadowym pojawianiem się dzieci
          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item) => (
              // Każdy artykuł jest owinięty w MotionWrapper dla animacji 'scale'
              <MotionWrapper key={item._id} variant="scale" duration={0.5}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-transparent to-transparent" />

                    {/* Mini Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      {item.isNewest && (
                        <span className="rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-arylideYellow backdrop-blur-md">
                          Najnowszy
                        </span>
                      )}
                      {item.isFeatured && (
                        <span className="rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-arylideYellow backdrop-blur-md">
                          Wyróżniony
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={12} className="text-arylideYellow" />
                        {item.formattedDate}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-arylideYellow">
                      {item.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-white/70">
                      {item.excerpt}
                    </p>
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
        ) : (
          <MotionWrapper
            variant="fade"
            className="text-center text-lg text-white/60 py-20"
          >
            Brak aktualności.
          </MotionWrapper>
        )}
      </div>
    </section>
  );
};
