import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { GaleriaPageData } from '@/lib/types';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';

// Generowanie metadanych SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data: GaleriaPageData | null = await client.fetch(
      `*[_type == "galeriaPage"][0]{
        seo
      }`
    );

    if (!data?.seo) {
      return {
        title: 'Galeria Wydarzeń | Fundacja',
        description: 'Odkryj magiczne momenty z naszych koncertów',
      };
    }

    return {
      title: data.seo.title || 'Galeria Wydarzeń | Fundacja',
      description: data.seo.description || 'Odkryj magiczne momenty z naszych koncertów',
      openGraph: {
        title: data.seo.title,
        description: data.seo.description,
        images: data.seo.ogImage ? [{ url: urlFor(data.seo.ogImage).width(1200).height(630).url() }] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Galeria Wydarzeń | Fundacja',
      description: 'Odkryj magiczne momenty z naszych koncertów',
    };
  }
}

export default async function GaleriaPage() {
  const data: GaleriaPageData | null = await client.fetch(
    `*[_type == "galeriaPage"][0]{
      seo,
      heroSection,
      galleries[]{
        title,
        date,
        location,
        slug,
        images[]{
          asset,
          alt,
          caption
        }
      }
    }`
  );

  // Fallback gdy brak danych w Sanity
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
        {/* Hero Section - Server Component */}
        <GalleryHero hero={data.heroSection} />

        {/* Gallery Grid - Server Component z Client Islands */}
        <div className="space-y-32">
          {data.galleries?.map((gallery, index) => (
            <GalleryGrid key={gallery.slug.current} gallery={gallery} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
