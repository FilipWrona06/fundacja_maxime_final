import type { SanityImage, SanitySlug } from "./sanity";

export interface NewsArticleType {
  _id: string;
  slug: SanitySlug;
  title: string;
  excerpt: string;
  content: string;
  image: SanityImage;
  date: string;
  dateDisplay: string;
  category: string;
  author: string;
  featured: boolean;
}
