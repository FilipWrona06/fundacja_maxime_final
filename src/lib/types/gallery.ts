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
  title: string;
  date: string;
  location: string;
  slug: { current: string };
  images: GalleryImage[];
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