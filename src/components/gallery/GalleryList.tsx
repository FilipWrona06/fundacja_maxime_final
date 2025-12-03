import type { ProcessedGalleryData } from "@/actions/galleryActions";
import { GalleryLoadMore } from "./GalleryLoadMore";
import { GallerySection } from "./GallerySection"; // <-- POPRAWIONY IMPORT

interface GalleryListProps {
  initialGalleries: ProcessedGalleryData[];
  initialTotalCount: number;
}

export default function GalleryList({
  initialGalleries,
  initialTotalCount,
}: GalleryListProps) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 
        Renderujemy początkowe galerie używając komponentu UI.
      */}
      {initialGalleries.map((gallery, index) => (
        <GallerySection key={gallery._id} gallery={gallery} index={index} />
      ))}

      {/* 
        Komponent kliencki do ładowania reszty.
      */}
      <GalleryLoadMore
        initialOffset={initialGalleries.length}
        totalCount={initialTotalCount}
      />
    </div>
  );
}
