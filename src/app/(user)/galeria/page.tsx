import type { Metadata } from "next";
import { Suspense } from "react";

import { GalleryGridSection } from "@/components/gallery/GalleryGridSection";
import { GalleryHeroSection } from "@/components/gallery/GalleryHeroSection";
import { getGalleryPageData } from "@/sanity/lib/queries/gallery";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGalleryPageData();

  if (!data?.seo) {
    return {
      title: "Galeria Wydarzeń | Fundacja Maxime",
      description: "Odkryj magiczne momenty z naszych koncertów",
    };
  }

  return {
    title: data.seo.metaTitle || "Galeria Wydarzeń | Fundacja Maxime",
    description:
      data.seo.metaDescription || "Odkryj magiczne momenty z naszych koncertów",
    robots: {
      index: !data.seo.noIndex,
      follow: !data.seo.noFollow,
    },
    alternates: {
      canonical: data.seo.canonicalUrl || "/galeria",
    },
    openGraph: {
      title: data.seo.ogTitle || data.seo.metaTitle,
      description: data.seo.ogDescription || data.seo.metaDescription,
      images: data.seo.ogImage
        ? [
            {
              url: urlFor(data.seo.ogImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: data.seo.metaTitle,
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
  const data = await getGalleryPageData();

  if (!data) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold">Galeria Wydarzeń</h1>
          <p className="text-white/60">
            Brak danych do wyświetlenia. Skonfiguruj stronę galerii w Sanity CMS.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-20">
      {/* Subtle background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-40">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-arylideYellow/10 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-oxfordBlue/15 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Hero Section */}
        <Suspense fallback={<div className="h-64 animate-pulse" />}>
          <GalleryHeroSection heroData={data.heroSection} />
        </Suspense>

        {/* Gallery Sections */}
        <div className="space-y-16 sm:space-y-24">
          {data.galleries?.map((gallery, index) => (
            <Suspense key={gallery.slug.current} fallback={<SectionSkeleton />}>
              <GalleryGridSection gallery={gallery} index={index} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}