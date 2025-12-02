"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiGrid } from "react-icons/fi";
import { premiumEase } from "@/lib/animations";

// Typ danych przygotowanych przez serwer
export type PreparedNewsItem = {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;      // Gotowy URL
  formattedDate: string; // Gotowy tekst daty
  isNewest: boolean;     // Czy to najnowszy?
  isFeatured: boolean;   // Czy wyróżniony?
};

export const NewsFilterGridClient = ({
  items,
}: {
  items: PreparedNewsItem[];
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section>
        <div className="container mx-auto px-6">
          {/* --- SEKCJA NAGŁÓWKA --- */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase }}
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
          </m.div>

          {/* --- GRID ARTYKUŁÓW --- */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <m.article
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: premiumEase,
                  }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                >
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