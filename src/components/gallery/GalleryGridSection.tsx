import type { Gallery } from "@/lib/types/index";
import { urlFor } from "@/sanity/lib/image";
import { GalleryGridSectionClient } from "./GalleryGridSection.client";

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

  const images = gallery.images.map((img) => ({
    src: urlFor(img).width(1200).height(1200).quality(85).url(),
    alt: img.alt,
    caption: img.caption,
    blurDataURL: urlFor(img).width(20).height(20).blur(10).url(),
  }));

  const galleryData = {
    title: gallery.title,
    // Zakładam, że te pola dodasz w Sanity. Jeśli ich nie ma, przekażemy undefined/null
    // description: gallery.description || "Krótki opis wydarzenia, reportaż z koncertu...",
    // videoUrl: gallery.videoUrl, 
    // partners: gallery.partners,
    
    // Na potrzeby demonstracji UI, przekażę przykładowe dane (usuń to po aktualizacji Sanity):
    description: gallery.description || "To był niezwykły wieczór pełen emocji. Artyści zaprezentowali repertuar, który poruszył serca zgromadzonej publiczności. Dziękujemy wszystkim za obecność i wsparcie.",
    videoUrl: gallery.videoUrl, // np. link do YouTube
    partners: gallery.partners, // np. "Partnerzy: Miasto Warszawa, Yamaha Music"
    
    date: gallery.date,
    location: gallery.location,
    images,
  };

  return <GalleryGridSectionClient galleryData={galleryData} index={index} />;
}