import type { Metadata } from "next";
import { Suspense } from "react";
// IMPORTUJEMY NOWE ELEMENTY: Akcję serwerową i komponent listy
import { loadMoreGalleries } from "@/actions/galleryActions";
import { GalleryHeroSection } from "@/components/gallery/GalleryHeroSection";
import GalleryList from "@/components/gallery/GalleryList";
import { urlFor } from "@/sanity/lib/image";
import {
  getGalleryHeroData,
  getGallerySeoData,
} from "@/sanity/lib/queries/gallery";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getGallerySeoData();

  if (!seo) {
    return {
      title: "Galeria Wydarzeń | Fundacja Maxime",
      description: "Odkryj magiczne momenty z naszych koncertów",
    };
  }

  return {
    title: seo.metaTitle || "Galeria Wydarzeń | Fundacja Maxime",
    description:
      seo.metaDescription || "Odkryj magiczne momenty z naszych koncertów",
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    alternates: {
      canonical: seo.canonicalUrl || "/galeria",
    },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.ogImage
        ? [
            {
              url: urlFor(seo.ogImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: seo.metaTitle,
            },
          ]
        : [],
    },
  };
}

export default async function GaleriaPage() {
  // 1. Pobieramy dane Hero (Nagłówek)
  const heroData = await getGalleryHeroData();

  // 2. Pobieramy PIERWSZĄ paczkę galerii (offset 0) oraz CAŁKOWITĄ LICZBĘ.
  // Zmieniono to na destrukturyzację obiektu, bo akcja zwraca teraz { data, totalCount }
  const { data: initialGalleries, totalCount } = await loadMoreGalleries(0);

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-20">
      {/* Tło */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-40">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-arylideYellow/10 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-oxfordBlue/15 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Hero Section */}
        {heroData ? (
          <Suspense
            fallback={
              <div className="h-64 animate-pulse bg-white/5 rounded-xl" />
            }
          >
            <GalleryHeroSection heroData={heroData} />
          </Suspense>
        ) : (
          <div className="py-10 text-center text-white/50">
            Brak sekcji Hero
          </div>
        )}

        {/* 3. Wyświetlamy komponent listy, który zarządza przyciskiem "Więcej" */}
        <div className="mt-16 sm:mt-24">
          {initialGalleries.length > 0 ? (
            <GalleryList
              initialGalleries={initialGalleries}
              initialTotalCount={totalCount} // <--- Przekazujemy licznik do komponentu
            />
          ) : (
            <div className="text-center text-white/40 py-20">
              Nie znaleziono żadnych galerii.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
