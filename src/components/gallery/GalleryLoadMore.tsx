"use client";

import { useState } from "react";
import {
  loadMoreGalleries,
  type ProcessedGalleryData,
} from "@/actions/galleryActions";
import { GallerySection } from "./GallerySection"; // <-- POPRAWIONY IMPORT

interface GalleryLoadMoreProps {
  initialOffset: number;
  totalCount: number;
}

export const GalleryLoadMore = ({
  initialOffset,
  totalCount,
}: GalleryLoadMoreProps) => {
  const [loadedGalleries, setLoadedGalleries] = useState<
    ProcessedGalleryData[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Obliczamy, ile mamy łącznie elementów
  const currentCount = initialOffset + loadedGalleries.length;
  const hasMore = currentCount < totalCount;

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const response = await loadMoreGalleries(currentCount);
      setLoadedGalleries((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Błąd podczas ładowania galerii:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {loadedGalleries.map((gallery, i) => (
        <GallerySection
          key={gallery._id}
          gallery={gallery}
          index={initialOffset + i}
        />
      ))}

      {hasMore && (
        <div className="flex justify-center pt-8 pb-12">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="group relative overflow-hidden rounded-full border border-arylideYellow/30 bg-arylideYellow/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-arylideYellow transition-all hover:border-arylideYellow hover:bg-arylideYellow hover:text-raisinBlack disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {isLoading ? "Ładowanie..." : "Zobacz starsze wydarzenia"}
            </span>
            <div className="absolute inset-0 -z-10 bg-arylideYellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      )}
    </>
  );
};
