import type { SeoData } from "./common";

export interface GalleryImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
  caption?: string;
  _type: "image";
}

export interface Gallery {
  _id: string;
  title: string;
  date: string;
  location: string;
  slug: { current: string };
  images: GalleryImage[];
  
  // --- Nowe pola dodane dla rozbudowanej galerii ---
  description?: string; // Opcjonalny opis (storytelling)
  videoUrl?: string;    // Opcjonalny link do wideo
  partners?: string;    // Opcjonalni partnerzy/sponsorzy
}

export interface GaleriaPageData {
  seo: SeoData;
  heroSection: {
    badge: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
  };
  galleries: Gallery[];
}