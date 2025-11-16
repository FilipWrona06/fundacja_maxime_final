import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Statycznie importujemy tylko HeroSection, ponieważ jest widoczna od razu.
import { HeroSection } from "@/components/home/HeroSection";
import { getHomePageSeoData } from "@/sanity/lib/get-data";
import { urlFor } from "@/sanity/lib/image";

/*
 * Funkcja 'generateMetadata' pozostaje bez zmian.
 * Jest już zoptymalizowana i wykonuje się po stronie serwera.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getHomePageSeoData();

  if (!seoData) {
    return {
      title: "Fundacja Maxime | Z Pasji do Muzyki",
      description:
        "Odkryj historię naszej fundacji, sprawdź nadchodzące koncerty i dołącz do naszej muzycznej społeczności.",
    };
  }

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: !seoData.noIndex,
      follow: !seoData.noFollow,
    },
    alternates: {
      canonical: seoData.canonicalUrl || "/",
    },
    openGraph: {
      title: seoData.ogTitle || seoData.metaTitle,
      description: seoData.ogDescription || seoData.metaDescription,
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

// Komponent szkieletu (skeleton) pozostaje bez zmian i będzie używany dla wszystkich dynamicznych sekcji.
const SectionSkeleton = () => (
  <div
    className="container mx-auto my-16 h-96 animate-pulse rounded-2xl bg-white/5"
    aria-hidden="true"
  />
);

// 1. Dynamicznie importujemy WSZYSTKIE sekcje, które pojawiają się po przewinięciu.
const DynamicStatsSection = dynamic(
  () => import("@/components/home/StatsSection").then((mod) => mod.StatsSection),
  { loading: () => <SectionSkeleton /> },
);

const DynamicAboutSection = dynamic(
  () => import("@/components/home/AboutSection").then((mod) => mod.AboutSection),
  { loading: () => <SectionSkeleton /> },
);

const DynamicImpactSection = dynamic(
  () =>
    import("@/components/home/ImpactSection").then((mod) => mod.ImpactSection),
  { loading: () => <SectionSkeleton /> },
);

const DynamicTimelineSection = dynamic(
  () =>
    import("@/components/home/TimelineSection").then(
      (mod) => mod.TimelineSection,
    ),
  { loading: () => <SectionSkeleton /> },
);

const DynamicCTASection = dynamic(
  () => import("@/components/home/CtaSection").then((mod) => mod.CTASection),
  { loading: () => <SectionSkeleton /> },
);

export default function HomePage() {
  return (
    <>
      {/* HeroSection jest ładowana natychmiast, zapewniając szybkie pierwsze wrażenie. */}
      <HeroSection />

      <main>
        {/* 2. Wszystkie poniższe komponenty zostaną załadowane dopiero, gdy użytkownik
            przewinie stronę w ich pobliże. */}
        <DynamicStatsSection />
        <DynamicAboutSection />
        <DynamicImpactSection />
        <DynamicTimelineSection />
        <DynamicCTASection />
      </main>
    </>
  );
}