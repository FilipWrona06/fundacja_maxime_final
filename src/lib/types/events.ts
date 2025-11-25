import type { SeoData } from "./common";
import type { PortableTextContent, SanityImage, SanitySlug } from "./sanity";

// 1. ZAKTUALIZOWANY Typ Pojedynczego Wydarzenia
export interface EventType {
  _id: string;
  slug: SanitySlug;
  title: string;
  subtitle?: string; // ? oznacza pole opcjonalne

  date: string; // format YYYY-MM-DD (do sortowania)
  dateDisplay: string; // np. "12 Grudnia 2025"
  time: string;

  location: string;
  address?: string;

  artist?: string;
  artistRole?: string;

  // ZMIANA: String zamieniony na PortableTextBlock[] dla RichText
  description: PortableTextContent;

  image: SanityImage;

  price: string;

  // NOWE POLE: Link do zewnętrznej bileterii
  ticketLink?: string;

  // NOWE POLE: SEO dedykowane dla wydarzenia
  seo?: SeoData;
}

// 2. NOWY Typ dla Singletonu (Ustawienia Strony Wydarzeń)
export interface EventsPageData {
  seo?: SeoData;
  heroSection: {
    badgeText: string;
    headingLine1: string;
    headingLine2: string;
    description: string; // W Hero zostawiamy zwykły text (string), bo tam nie formatujemy tekstu
  };
}
