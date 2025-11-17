import type { Metadata } from "next";
import { Suspense } from "react";

import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { getHomePageSeoData } from "@/sanity/lib/get-data";
import { urlFor } from "@/sanity/lib/image";

/**
 * Ta funkcja jest wykonywana na serwerze podczas budowania strony.
 * Pobiera dane SEO z Sanity i generuje metadane dla sekcji <head> dokumentu HTML.
 * Dzięki temu Twoja strona jest w pełni zoptymalizowana dla SEO od samego początku.
 */
export async function generateMetadata(): Promise<Metadata> {
  // 1. Pobieramy dane SEO za pomocą naszej dedykowanej, z-cache-owanej funkcji.
  const seoData = await getHomePageSeoData();

  // 2. Jeśli z jakiegoś powodu danych SEO nie ma, zwracamy solidne wartości domyślne.
  if (!seoData) {
    return {
      title: "Fundacja Maxime | Z Pasji do Muzyki",
      description:
        "Odkryj historię naszej fundacji, sprawdź nadchodzące koncerty i dołącz do naszej muzycznej społeczności.",
    };
  }

  // 3. Budujemy kompletny obiekt metadanych na podstawie danych z Sanity.
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,

    // Ustawienia dla robotów wyszukiwarek
    robots: {
      index: !seoData.noIndex,
      follow: !seoData.noFollow,
    },

    // Ustawienie kanonicznego URL-a, jeśli został zdefiniowany
    alternates: {
      canonical: seoData.canonicalUrl || "/",
    },

    // Ustawienia dla udostępniania w social mediach (Open Graph)
    openGraph: {
      title: seoData.ogTitle || seoData.metaTitle,
      description: seoData.ogDescription || seoData.metaDescription,
      // Jeśli obrazek OG istnieje, budujemy jego pełny URL
      images: seoData.ogImage
        ? [
            {
              url: urlFor(seoData.ogImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: seoData.metaTitle,
            },
          ]
        : [],
    },
  };
}

// Komponent szkieletu (skeleton) do wyświetlania podczas ładowania danych.
// Pozostaje bez zmian.
const SectionSkeleton = () => (
  <div
    className="container mx-auto my-16 h-96 animate-pulse rounded-2xl bg-white/5"
    aria-hidden="true"
  />
);

// Komponent strony jest teraz kompletny. Next.js automatycznie połączy
// wygenerowane metadane z tym komponentem.
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <main>

        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ImpactSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TimelineSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
    </>
  );
}
