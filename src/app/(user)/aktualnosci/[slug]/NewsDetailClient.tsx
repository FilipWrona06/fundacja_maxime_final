"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiTag,
  FiUser,
} from "react-icons/fi";
import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

export default function NewsDetailClient({
  article,
  otherNews,
}: {
  article: NewsArticleType;
  otherNews: NewsArticleType[];
}) {
  return (
    <div className="min-h-screen pb-20">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] min-h-[400px] w-full"
      >
        <div className="absolute inset-0">
          <Image
            src={urlFor(article.image).url()}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/70 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-end px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 flex items-center gap-4 text-sm text-white/80"
          >
            <span className="flex items-center gap-2">
              <FiCalendar size={16} className="text-arylideYellow" />
              {article.dateDisplay}
            </span>
            <span className="flex items-center gap-2">
              <FiTag size={16} className="text-arylideYellow" />
              {article.category}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-3 max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl"
          >
            {article.title}
          </motion.h1>
        </div>
      </motion.section>

      <div className="container relative z-20 mx-auto mt-[-50px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/aktualnosci"
            className="group inline-flex items-center gap-2 font-semibold text-white/60 transition-all duration-300 hover:gap-3 hover:text-white"
          >
            <FiArrowLeft className="text-arylideYellow transition-transform duration-300 group-hover:-translate-x-1" />
            Wróć do wszystkich aktualności
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-12"
        >
          <div className="prose prose-invert prose-p:text-white/80 max-w-none text-lg leading-relaxed text-white/80 prose-headings:text-arylideYellow prose-a:text-arylideYellow">
            <p className="mb-6 text-xl italic">{article.excerpt}</p>
            {/* Używamy `white-space: pre-wrap` aby zachować formatowanie (np. entery) z pola tekstowego w Sanity */}
            <p style={{ whiteSpace: "pre-wrap" }}>{article.content}</p>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-right">
            <span className="flex items-center justify-end gap-2 text-sm text-white/60">
              <FiUser size={14} /> Autor: {article.author}
            </span>
          </div>
        </motion.div>
      </div>

      {otherNews.length > 0 && (
        <section className="mt-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-bold md:text-5xl">
                Warte{" "}
                <span className="font-youngest text-arylideYellow">
                  przeczytania
                </span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherNews.map((item, index) => (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
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
          </div>
        </section>
      )}
    </div>
  );
}
