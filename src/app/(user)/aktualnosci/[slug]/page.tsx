// Plik: src/app/(user)/aktualnosci/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
// Importy nowych komponentów klienckich
import { ArticleContent } from "@/components/news/slug/ArticleContent";
import { ArticleHero } from "@/components/news/slug/ArticleHero";
import { RelatedNews } from "@/components/news/slug/RelatedNews";
// Importy typów i narzędzi Sanity
import { urlFor } from "@/sanity/lib/image";
import {
  getAllNews,
  getNewsBySlug,
  getNewsSlugs,
} from "@/sanity/lib/queries/news";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Generowanie statycznych ścieżek (SSG)
export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. Dynamiczne SEO
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const article = await getNewsBySlug(params.slug);

  if (!article) {
    return {};
  }

  return {
    title: article.seo?.metaTitle || `${article.title} | Fundacja Maxime`,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.seo?.ogTitle || article.title,
      description: article.seo?.ogDescription || article.excerpt,
      images: article.image
        ? [
            {
              url: urlFor(article.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
    robots: {
      index: !article.seo?.noIndex,
      follow: !article.seo?.noFollow,
    },
  };
}

// 3. Główny komponent strony
export default async function NewsDetailPage(props: Props) {
  const params = await props.params;
  const { slug } = params;

  // Pobieramy artykuł używając nowej, scentralizowanej funkcji
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  // Pobieramy wszystkie newsy, aby wybrać "Warte przeczytania" (Related News)
  // Wykluczamy aktualnie czytany artykuł i bierzemy 3 najnowsze pozostałe
  const allNews = await getAllNews();
  const relatedNews = allNews
    .filter((item) => item._id !== article._id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-raisinBlack pb-20 overflow-x-hidden">
      {/* Sekcja Hero - Zdjęcie tła i tytuł */}
      <ArticleHero article={article} />

      {/* Sekcja Treści - PortableText i nawigacja */}
      <ArticleContent article={article} />

      {/* Sekcja Powiązanych - Karuzela/Grid z innymi artykułami */}
      <RelatedNews news={relatedNews} />
    </main>
  );
}
