import type { Gallery } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { GalleryGridSectionClient } from "./GalleryGridSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla pojedynczej galerii.
 * Przetwarza obrazy i przekazuje dane do komponentu klienckiego.
 */
export async function GalleryGridSection({
  gallery,
  index,
}: {
  gallery: Gallery;
  index: number;
}) {
  if (!gallery) {
    return null;
  }

  // Przygotowanie danych obrazów
  const images = gallery.images.map((img) => ({
    src: urlFor(img).width(1200).height(1200).quality(85).url(),
    alt: img.alt,
    caption: img.caption,
    blurDataURL: urlFor(img).width(20).height(20).blur(10).url(),
  }));

  const galleryData = {
    title: gallery.title,
    date: gallery.date,
    location: gallery.location,
    images,
  };

  return <GalleryGridSectionClient galleryData={galleryData} index={index} />;
}
