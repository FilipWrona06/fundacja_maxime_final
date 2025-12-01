"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
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

export const ArticleHeroClient = ({ article }: { article: NewsArticleType }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: premiumEase }}
        className="relative h-[60vh] min-h-[400px] w-full"
      >
        <div className="absolute inset-0">
          <Image
            src={urlFor(article.image).width(1920).quality(90).url()}
            alt={article.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={urlFor(article.image).width(20).blur(10).url()}
          />
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/70 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-raisinBlack/40" />
        </div>

        <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-end px-6 pb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-white/90"
          >
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-md border border-white/10">
              <FiCalendar size={16} className="text-arylideYellow" />
              {/* Użycie lokalnej funkcji formatowania */}
              {formatDate(article.date)}
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
            className="max-w-4xl text-5xl font-bold leading-[1.1] md:text-6xl lg:text-7xl drop-shadow-2xl"
          >
            {article.title}
          </m.h1>
        </div>
      </m.section>
    </LazyMotion>
  );
};