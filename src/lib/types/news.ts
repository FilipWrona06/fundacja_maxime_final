import type { SeoData } from "./common";
import type { PortableTextContent, SanityImage, SanitySlug } from "./sanity";

export interface NewsArticleType {
  _id: string;
  slug: SanitySlug;
  title: string;
  excerpt: string;
  content: PortableTextContent;
  image: SanityImage;
  date: string; // To jest surowy string "YYYY-MM-DD"
  // USUNIĘTO: dateDisplay, category
  author: string;
  featured: boolean;
  seo?: SeoData;
}

export interface NewsPageSettings {
  seo?: SeoData;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
}
