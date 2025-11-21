"use server";

import { getGalleriesRange, getTotalGalleriesCount } from "@/sanity/lib/queries/gallery"; // <--- Importujemy licznik
import { urlFor } from "@/sanity/lib/image";
import type { Partner } from "@/lib/types/index";

export interface ProcessedGalleryData {
  _id: string;
  title: string;
  description?: string;
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

// ZMIANA: Nowy typ zwracany przez akcję (dane + licznik)
export interface LoadMoreResponse {
  data: ProcessedGalleryData[];
  totalCount: number;
}

const LIMIT = 3;

export async function loadMoreGalleries(offset: number): Promise<LoadMoreResponse> {
  const start = offset;
  const end = offset + LIMIT;

  // Pobieramy dane ORAZ całkowitą liczbę równolegle
  const [rawGalleries, totalCount] = await Promise.all([
    getGalleriesRange(start, end),
    getTotalGalleriesCount()
  ]);

  const processedGalleries = rawGalleries.map((gallery) => ({
    _id: gallery._id,
    title: gallery.title,
    description: gallery.description,
    videoUrl: gallery.videoUrl,
    sponsors: gallery.sponsors,
    date: gallery.date,
    location: gallery.location,
    images: gallery.images?.map((img) => ({
      src: urlFor(img).width(1200).height(1200).quality(85).url(),
      alt: img.alt,
      caption: img.caption,
      blurDataURL: urlFor(img).width(20).height(20).blur(10).url(),
    })) || [],
  }));

  // Zwracamy obiekt zamiast samej tablicy
  return {
    data: processedGalleries,
    totalCount: totalCount
  };
}