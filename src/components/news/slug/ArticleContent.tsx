import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { NewsArticleType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Konfiguracja PortableText (zdefiniowana na serwerze)
const newsPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 overflow-hidden rounded-2xl relative aspect-video">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Zdjęcie w artykule"}
            fill
            className="object-cover"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center text-sm text-white/90">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    horizontalRule: () => <hr className="my-8 border-white/20" />,
    spacer: () => <div className="h-8" aria-hidden="true" />,
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-6 text-3xl font-bold text-arylideYellow font-youngest">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 text-2xl font-bold text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-3 text-xl font-bold text-white/90">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-arylideYellow pl-4 italic text-white/80 my-6 py-2 bg-white/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-lg leading-relaxed text-white/80">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-arylideYellow underline hover:text-white transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
  },
};

export const ArticleContent = ({ article }: { article: NewsArticleType }) => {
  return (
    <div className="container relative z-20 mx-auto mt-[-50px] px-6">
      {/* Przycisk powrotu - Animowany Wrapper */}
      <MotionWrapper variant="fadeUp" delay={0.5} className="mb-8">
        <Link
          href="/aktualnosci"
          className="group inline-flex items-center gap-3 rounded-xl border border-white/5 bg-raisinBlack/50 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all duration-300 hover:border-arylideYellow/30 hover:bg-raisinBlack/80 hover:text-white"
        >
          <FiArrowLeft className="text-arylideYellow transition-transform duration-300 group-hover:-translate-x-1" />
          Wróć do listy
        </Link>
      </MotionWrapper>

      {/* Kontener treści - Animowany Wrapper */}
      <MotionWrapper
        variant="fadeUp"
        delay={0.6}
        className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl lg:p-12"
      >
        <div className="prose prose-invert prose-lg max-w-none">
          {article.excerpt && (
            <p className="lead mb-8 border-l-4 border-arylideYellow pl-6 text-xl italic text-white/90">
              {article.excerpt}
            </p>
          )}

          {/* Renderowanie PortableText NA SERWERZE */}
          <PortableText
            value={article.content}
            components={newsPortableTextComponents}
          />
        </div>
      </MotionWrapper>
    </div>
  );
};
