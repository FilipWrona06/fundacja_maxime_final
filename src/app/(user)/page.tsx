// Plik: src/app/page.tsx

import type { Metadata } from "next";
import { Suspense } from "react";

// --- IMPORTY SEKCJI (SERVER COMPONENTS) ---
// Importujemy główne pliki .tsx, które teraz pobierają dane
// i renderują odpowiednie "Wyspy Klienckie" (Client Components)
import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TimelineSection } from "@/components/home/TimelineSection";

// --- NARZĘDZIA ---
import { urlFor } from "@/sanity/lib/image";
import { getHomePageSeoData } from "@/sanity/lib/queries/home";

// --- GENEROWANIE METADANYCH (SEO) ---
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getHomePageSeoData();

  // Fallback, jeśli dane nie są uzupełnione w CMS
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
              alt: seoData.ogImage.alt || seoData.metaTitle,
            },
          ]
        : [],
    },
  };
}

// --- SKELETONY (DLA SUSPENSE) ---
// Wyświetlają się, zanim dane z Sanity dotrą do komponentu

const HeroSkeleton = () => (
  <div
    className="h-screen w-full animate-pulse bg-raisinBlack"
    aria-hidden="true"
  />
);

const SectionSkeleton = () => (
  <div className="container mx-auto my-20 px-6">
    <div
      className="h-[500px] w-full animate-pulse rounded-3xl bg-white/5 border border-white/5"
      aria-hidden="true"
    />
  </div>
);

// --- GŁÓWNY KOMPONENT STRONY ---
export default function HomePage() {
  return (
    <main className="selection:bg-arylideYellow selection:text-raisinBlack">
      {/* 
        HeroSection jest teraz Server Componentem.
        Pobiera dane i przekazuje je do HeroParallax (Client).
      */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* 
        ImpactSection (Nasz Wpływ).
        Pobiera dynamiczne dane (najnowszy news, event) na serwerze.
      */}
      <Suspense fallback={<SectionSkeleton />}>
        <ImpactSection />
      </Suspense>

      {/* 
        AboutSection (O Fundacji).
        Renderuje HTML na serwerze, ożywia go MotionWrapperem.
      */}
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>

      {/* 
        TimelineSection (Historia).
        Renderuje listę wydarzeń na serwerze.
      */}
      <Suspense fallback={<SectionSkeleton />}>
        <TimelineSection />
      </Suspense>

      {/* 
        CTASection (Wezwanie do działania).
      */}
      <Suspense fallback={<SectionSkeleton />}>
        <CTASection />
      </Suspense>
    </main>
  );
}
