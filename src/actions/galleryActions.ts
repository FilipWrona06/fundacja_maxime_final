"use server";

import type { Partner, PortableTextContent } from "@/lib/types/index";
import { urlFor } from "@/sanity/lib/image";
import {
  getGalleriesRange,
  getTotalGalleriesCount,
} from "@/sanity/lib/queries/gallery";

// Definiujemy typ danych, których oczekuje komponent kliencki (GalleryGridSectionClient)
export interface ProcessedGalleryData {
  _id: string;
  title: string;
  description?: PortableTextContent; // Typ zgodny z definicją w types/index.ts
  videoUrl?: string;
  sponsors?: Partner[];
  date: string;
  location: string;
  images: {
    src: string;
    alt: string;
    caption?: string;
    blurDataURL: string;
  }[];
}

// Typ zwracany przez akcję (dane + licznik całkowity)
export interface LoadMoreResponse {
  data: ProcessedGalleryData[];
  totalCount: number;
}

const LIMIT = 3; // Ilość galerii ładowanych na raz

export async function loadMoreGalleries(
  offset: number,
): Promise<LoadMoreResponse> {
  const start = offset;
  const end = offset + LIMIT;

  // 1. Pobieramy surowe dane z Sanity ORAZ całkowitą liczbę (równolegle)
  const [rawGalleries, totalCount] = await Promise.all([
    getGalleriesRange(start, end),
    getTotalGalleriesCount(),
  ]);

  // 2. Przetwarzamy dane (głównie generowanie linków do zdjęć przez urlFor)
  const processedGalleries: ProcessedGalleryData[] = rawGalleries.map(
    (gallery) => ({
      _id: gallery._id,
      title: gallery.title,
      description: gallery.description, // TypeScript teraz wie, że to PortableTextContent
      videoUrl: gallery.videoUrl,
      sponsors: gallery.sponsors,
      date: gallery.date,
      location: gallery.location,
      images:
        gallery.images?.map((img) => ({
          src: urlFor(img).width(1200).height(1200).quality(85).url(),
          alt: img.alt,
          caption: img.caption,
          blurDataURL: urlFor(img).width(20).height(20).blur(10).url(),
        })) || [],
    }),
  );

  return {
    data: processedGalleries,
    totalCount: totalCount,
  };
}
