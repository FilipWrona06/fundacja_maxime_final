import type { Metadata } from "next";
import { Suspense } from "react";

import { GalleryGridSection } from "@/components/gallery/GalleryGridSection";
import { GalleryHeroSection } from "@/components/gallery/GalleryHeroSection";
import { getGalleryPageData } from "@/sanity/lib/get-data";
import { urlFor } from "@/sanity/lib/image";

/**
 * Generowanie metadanych SEO dla strony galerii
 */
export async function generateMetadata(): Promise<Metadata> {
  const data = await getGalleryPageData();

  if (!data?.seo) {
    return {
      title: "Galeria Wydarzeń | Fundacja Maxime",
      description: "Odkryj magiczne momenty z naszych koncertów",
    };
  }

  // Poprawiono nazwy pól na te z reużywalnego schematu SEO
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

// Skeleton dla ładowania
const SectionSkeleton = () => (
  <div
    className="container mx-auto my-16 h-96 animate-pulse rounded-2xl bg-white/5"
    aria-hidden="true"
  />
);

export default async function GaleriaPage() {
  const data = await getGalleryPageData();

  // Fallback gdy brak danych
  if (!data) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Galeria Wydarzeń</h1>
          <p className="text-white/60">
            Brak danych do wyświetlenia. Skonfiguruj stronę galerii w Sanity CMS.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <GalleryHeroSection heroData={data.heroSection} />
        </Suspense>

        {/* Gallery Grids */}
        <div className="space-y-32">
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