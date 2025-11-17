import type { GaleriaPageData } from "@/lib/types";
import GalleryHeroSectionClient from "./GalleryHeroSection.client";

/**
 * Asynchroniczny Komponent Serwerowy (RSC) dla hero section galerii.
 * Przekazuje dane do komponentu klienckiego.
 */
export async function GalleryHeroSection({
  heroData,
}: {
  heroData: GaleriaPageData["heroSection"];
}) {
  if (!heroData) {
    return null;
  }

  return <GalleryHeroSectionClient heroData={heroData} />;
}