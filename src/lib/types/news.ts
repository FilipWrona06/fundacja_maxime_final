// Plik: src/lib/types/news.ts

import type { SeoData } from "./common";
import type { PortableTextContent, SanityImage, SanitySlug } from "./sanity";

export interface NewsArticleType {
  _id: string;
  slug: SanitySlug;
  title: string;
  excerpt: string;
  content: PortableTextContent;
  image: SanityImage;
  date: string; // Format YYYY-MM-DD
  featured: boolean;
  seo?: SeoData;
  // USUNIĘTO: author, category, dateDisplay
}

export interface NewsPageSettings {
  seo?: SeoData;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  // DODANO: Sekcję newslettera
  newsletter?: {
    heading: string;
    text: string;
    buttonLabel: string;
  };
}
