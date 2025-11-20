// Plik: src/app/page.tsx (wersja ostateczna)

import type { Metadata } from "next";
import { Suspense } from "react";

import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { urlFor } from "@/sanity/lib/image";
import { getHomePageSeoData } from "@/sanity/lib/queries/home";

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
      images: seoData.ogImage?.asset
        ? [
            {
              url: urlFor(seoData.ogImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              // ZMIANA: Używamy dedykowanego pola 'alt' z Sanity, z fallbackiem do metaTitle.
              alt: seoData.ogImage.alt || seoData.metaTitle,
            },
          ]
        : [],
    },
  };
}

const SectionSkeleton = () => (
  <div
    className="container mx-auto my-16 h-96 animate-pulse rounded-2xl bg-white/5"
    aria-hidden="true"
  />
);

export default function HomePage() {
  return (
    <>
      {/* HeroSection również powinna być w Suspense, aby nie blokować renderowania reszty strony */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection />
      </Suspense>

      <main>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TimelineSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ImpactSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
    </>
  );
}
