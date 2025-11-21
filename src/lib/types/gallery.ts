import type { SeoData } from "./common";
import type { PortableTextContent } from "./sanity";

// --- TYPY GALERII ---

export interface GalleryImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
  caption?: string;
  _type: "image";
}

// Typ dla Partnera/Sponsora
export interface Partner {
  name: string;
  website?: string;
  logoUrl?: string; // URL do logo wyciągnięty w zapytaniu GROQ
}

export interface Gallery {
  _id: string;
  title: string;
  date: string;
  location: string;
  slug: { current: string };
  images: GalleryImage[];

  // ZMIANA: Używamy PortableTextContent zamiast string,
  // ponieważ w Sanity pole description to teraz tablica bloków (richText)
  description?: PortableTextContent;

  videoUrl?: string;
  sponsors?: Partner[];
}

export interface GaleriaPageData {
  seo: SeoData;
  heroSection: {
    badge: string;
    headingLine1: string;
    headingLine2: string;
    // ZMIANA: Tutaj też description to teraz PortableTextContent
    description: PortableTextContent;
  };
  galleries: Gallery[];
}
