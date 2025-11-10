"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCalendar, FiTag } from "react-icons/fi";
import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

const categories = ["Wszystkie", "Ogłoszenia", "Relacje", "Wydarzenia"];

export default function AktualnosciClientPage({
  allNews,
}: {
  allNews: NewsArticleType[];
}) {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  const newestArticle = allNews.length > 0 ? allNews[0] : null;
  const featuredArticle = allNews.find((item) => item.featured) || null;

  const highlightedNews: NewsArticleType[] = [];
  if (newestArticle) {
    highlightedNews.push(newestArticle);
  }
  if (featuredArticle && featuredArticle._id !== newestArticle?._id) {
    highlightedNews.push(featuredArticle);
  }

  const filteredNews = allNews.filter(
    (item) =>
      activeCategory === "Wszystkie" || item.category === activeCategory,
  );

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="mb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow"
            >
              Bądź na bieżąco
            </motion.span>
            <h1 className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
              <span className="font-youngest text-arylideYellow">
                Aktualności
              </span>
              <br />
              Fundacji
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/60">
              Najnowsze wiadomości, wydarzenia i relacje z naszych koncertów
            </p>
          </motion.div>
        </div>
      </section>

      {highlightedNews.length > 0 && (
        <section className="mb-32">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 text-3xl font-bold md:text-4xl"
            >
              Na Czasie
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {highlightedNews.map((item, index) => (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30"
                >
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />
                    <span className="absolute left-6 top-6 rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-4 py-2 text-xs font-semibold text-arylideYellow backdrop-blur-md">
                      {item._id === newestArticle?._id
                        ? "Najnowszy"
                        : "Wyróżniony"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-2">
                        <FiCalendar size={14} />
                        {item.dateDisplay}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiTag size={14} />
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mb-3 text-3xl font-bold transition-colors duration-300 group-hover:text-arylideYellow">
                      {item.title}
                    </h3>
                    <p className="mb-6 line-clamp-2 text-white/70">
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
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-6 py-3 font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "border-arylideYellow bg-arylideYellow text-raisinBlack"
                    : "border-white/20 bg-white/5 text-white hover:border-arylideYellow/50 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item, index) => (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-arylideYellow/30 hover:bg-white/10"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-transparent to-transparent" />
                    {item._id === newestArticle?._id && (
                      <span className="absolute right-4 top-4 rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-3 py-1 text-xs font-semibold text-arylideYellow backdrop-blur-md">
                        Najnowszy
                      </span>
                    )}
                    {item._id === featuredArticle?._id &&
                      item._id !== newestArticle?._id && (
                        <span className="absolute right-4 top-4 rounded-full border border-arylideYellow/40 bg-arylideYellow/20 px-3 py-1 text-xs font-semibold text-arylideYellow backdrop-blur-md">
                          Wyróżniony
                        </span>
                      )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={12} />
                        {item.dateDisplay}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiTag size={12} />
                        {item.category}
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
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg text-white/60"
            >
              Brak aktualności w tej kategorii.
            </motion.p>
          )}
        </div>
      </section>

      <section className="mt-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-12 text-center backdrop-blur-sm md:p-20"
          >
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl" />
            <div className="relative">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                Nie przegap żadnej <br />{" "}
                <span className="font-youngest text-arylideYellow">
                  Wiadomości
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
                Zapisz się do naszego newslettera i otrzymuj najnowsze
                informacje o koncertach, wydarzeniach i aktualności prosto na
                swoją skrzynkę.
              </p>
              <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Twój adres e-mail"
                  required
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/50 focus:border-arylideYellow focus:outline-none"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-arylideYellow px-8 py-4 font-bold text-raisinBlack transition-all duration-300 hover:scale-105"
                >
                  Zapisz się{" "}
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
