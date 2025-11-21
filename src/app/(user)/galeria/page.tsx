import type { Metadata } from "next";
import { Suspense } from "react";

import { GalleryGridSection } from "@/components/gallery/GalleryGridSection";
import { GalleryHeroSection } from "@/components/gallery/GalleryHeroSection";
import { urlFor } from "@/sanity/lib/image";
// IMPORTUJEMY NOWE FUNKCJE
import { 
  getGallerySeoData, 
  getGalleryHeroData, 
  getGalleriesList 
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

const SectionSkeleton = () => (
  <div className="animate-pulse space-y-8" aria-hidden="true">
    <div className="space-y-4">
      <div className="h-16 w-2/3 rounded-2xl bg-white/5" />
      <div className="h-4 w-48 rounded-full bg-white/5" />
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="col-span-2 row-span-2 aspect-square rounded-2xl bg-white/5" />
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-square rounded-2xl bg-white/5" />
      ))}
    </div>
  </div>
);

export default async function GaleriaPage() {
  // Pobieramy dane równolegle (szybciej niż po kolei)
  const [heroData, galleries] = await Promise.all([
    getGalleryHeroData(),
    getGalleriesList(),
  ]);

  // Filtrujemy galerie (zabezpieczenie przed nullami)
  const validGalleries = galleries?.filter((g) => g?._id) || [];

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
          <Suspense fallback={<div className="h-64 animate-pulse" />}>
            <GalleryHeroSection heroData={heroData} />
          </Suspense>
        ) : (
          <div className="py-10 text-center text-white/50">Brak sekcji Hero</div>
        )}

        {/* Lista Galerii */}
        <div className="space-y-16 sm:space-y-24">
          {validGalleries.length > 0 ? (
            validGalleries.map((gallery, index) => (
              <Suspense key={gallery._id} fallback={<SectionSkeleton />}>
                <GalleryGridSection gallery={gallery} index={index} />
              </Suspense>
            ))
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