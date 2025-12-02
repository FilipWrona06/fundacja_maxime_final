"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { premiumEase } from "@/lib/animations";

// Typ danych przygotowanych przez serwer
export type RelatedNewsItemProps = {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string; // Gotowy URL
  formattedDate: string; // Gotowy tekst daty
};

export const RelatedNewsClient = ({
  items,
}: {
  items: RelatedNewsItemProps[];
}) => {
  // Sprawdzenie długości można zrobić też tutaj, ale lepiej w rodzicu (Server),
  // żeby w ogóle nie ładować tego komponentu, jeśli jest pusty.

  return (
    <LazyMotion features={domAnimation}>
      <section className="mt-24 mb-20">
        <div className="container mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold md:text-5xl">
              Warte{" "}
              <span className="font-youngest text-arylideYellow">
                przeczytania
              </span>
            </h2>
          </m.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <m.article
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: premiumEase,
                }}
                whileHover={{ y: -8 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10 shadow-lg hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-transparent to-transparent" />
                </div>

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
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};
