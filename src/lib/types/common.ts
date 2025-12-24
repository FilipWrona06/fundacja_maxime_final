import type { SanityImage } from "./sanity";

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage & {
    alt: string;
  };
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
}

export interface NavLink {
  readonly name: string;
  readonly href: string;
}

export interface ContactData {
  readonly address: string;
  readonly email: string;
  readonly phone: string;
  readonly googleMapsLink: string;
}

export interface SocialLink {
  readonly name: string;
  readonly href: string;
  readonly icon: string;
  readonly colorClasses: {
    readonly background: string;
    readonly hover: string;
  };
}
