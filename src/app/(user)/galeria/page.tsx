import type { Metadata } from "next";
import { Suspense } from "react";

import { GalleryGridSection } from "@/components/gallery/GalleryGridSection";
import { GalleryHeroSection } from "@/components/gallery/GalleryHeroSection";
import { urlFor } from "@/sanity/lib/image";
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

// POPRAWKA: Dopasowanie szkieletu do układu Bento Grid (auto-rows-240px)
// Dzięki temu nie będzie "skoku" graficznego po załadowaniu zdjęć.
const SectionSkeleton = () => (
  <div className="animate-pulse space-y-12 py-12 sm:py-20" aria-hidden="true">
    {/* Header Skeleton */}
    <div className="grid gap-8 lg:grid-cols-12">
       <div className="lg:col-span-4 space-y-4">
         <div className="h-6 w-32 rounded-full bg-white/5" />
         <div className="h-16 w-3/4 rounded-2xl bg-white/5" />
       </div>
       <div className="lg:col-span-8 space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
         <div className="h-4 w-full rounded bg-white/5" />
         <div className="h-4 w-5/6 rounded bg-white/5" />
       </div>
    </div>

    {/* Grid Skeleton (Matching Bento Layout) */}
    <div className="hidden lg:grid grid-cols-4 gap-4 auto-rows-[240px]">
      {/* Duży klocek (Hero) */}
      <div className="col-span-2 row-span-2 rounded-xl bg-white/5" />
      {/* 4 małe klocki */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="col-span-1 row-span-1 rounded-xl bg-white/5" />
      ))}
    </div>
    
    {/* Mobile Skeleton */}
    <div className="lg:hidden flex gap-4 overflow-hidden">
      <div className="h-[400px] w-[85vw] shrink-0 rounded-2xl bg-white/5" />
      <div className="h-[400px] w-[70vw] shrink-0 rounded-2xl bg-white/5" />
    </div>
  </div>
);

export default async function GaleriaPage() {
  // Pobieramy dane równolegle
  const [heroData, galleries] = await Promise.all([
    getGalleryHeroData(),
    getGalleriesList(),
  ]);

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
          <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl" />}>
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