"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { premiumEase } from "@/lib/animations";
import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Lokalna funkcja pomocnicza
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const NewsFilterGridClient = ({
  allNews,
  newestId,
  featuredId,
}: {
  allNews: NewsArticleType[];
  newestId?: string;
  featuredId?: string;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section>
        <div className="container mx-auto px-6">
          
          {/* Grid bez przycisków filtrowania */}
          {allNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allNews.map((item, index) => (
                <m.article
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10 hover:shadow-xl hover:shadow-black/20"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={urlFor(item.image).width(600).url()}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-transparent to-transparent" />
                    
                    {/* Mini Badges - tylko Najnowszy/Wyróżniony */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      {item._id === newestId && (
                        <span className="rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-arylideYellow backdrop-blur-md">
                          Najnowszy
                        </span>
                      )}
                      {item._id === featuredId && item._id !== newestId && (
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
                        {/* Użycie lokalnej funkcji formatowania */}
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-arylideYellow">
                      {item.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-white/70">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/aktualnosci/${item.slug.current}`}
                      className="group/btn mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold text-arylideYellow transition-all duration-300 hover:gap-3"
                    >
                      Czytaj więcej
                      <FiArrowRight />
                    </Link>
                  </div>
                </m.article>
              ))}
            </div>
          ) : (
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg text-white/60 py-20"
            >
              Brak aktualności.
            </m.p>
          )}
        </div>
      </section>
    </LazyMotion>
  );
};