"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { premiumEase } from "@/lib/animations";

// Typ dla przetworzonych danych, które przyjdą z serwera
export type FeaturedNewsItemProps = {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  formattedDate: string; // Gotowa data
  imageUrl: string;      // Gotowy URL zdjęcia
  isNewest: boolean;
};

interface FeaturedNewsClientProps {
  items: FeaturedNewsItemProps[];
  isSingleMode: boolean;
}

export const FeaturedNewsClient = ({ items, isSingleMode }: FeaturedNewsClientProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: premiumEase }}
        className="mb-12 text-3xl font-bold md:text-4xl"
      >
        Na Czasie
      </m.h2>

      <div
        className={`grid grid-cols-1 gap-8 ${
          isSingleMode ? "lg:grid-cols-1" : "lg:grid-cols-2"
        }`}
      >
        {items.map((item, index) => (
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
          </m.article>
        ))}
      </div>
    </LazyMotion>
  );
};