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

export const FeaturedNewsClient = ({
  highlightedNews,
  newestId,
}: {
  highlightedNews: NewsArticleType[];
  newestId: string;
}) => {
  if (highlightedNews.length === 0) return null;

  return (
    <LazyMotion features={domAnimation}>
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <m.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-12 text-3xl font-bold md:text-4xl"
          >
            Na Czasie
          </m.h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {highlightedNews.map((item, index) => (
              <m.article
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: premiumEase,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30"
              >
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={urlFor(item.image).width(800).url()}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute left-6 top-6 rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-4 py-2 text-xs font-semibold text-arylideYellow backdrop-blur-md shadow-lg">
                    {item._id === newestId ? "Najnowszy" : "Wyróżniony"}
                  </span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-2">
                      <FiCalendar size={14} className="text-arylideYellow" />
                      {/* Użycie lokalnej funkcji formatowania */}
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="mb-3 text-3xl font-bold transition-colors duration-300 group-hover:text-arylideYellow">
                    {item.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 text-white/70 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/aktualnosci/${item.slug.current}`}
                    className="group/btn inline-flex items-center gap-2 font-semibold text-arylideYellow transition-all duration-300 hover:gap-3"
                  >
                    Czytaj więcej
                    <FiArrowRight />
                  </Link>
                </div>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};