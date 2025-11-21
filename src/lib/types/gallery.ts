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

// --- NOWOŚĆ: Typ dla Partnera/Sponsora ---
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
  
  description?: string; 
  videoUrl?: string;    
  
  // --- ZMIANA ---
  // Zamiast 'partners: string', mamy teraz tablicę obiektów
  sponsors?: Partner[]; 
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