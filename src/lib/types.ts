/**
 * @file Centralne definicje typów TypeScript dla projektu.
 * Używane do zapewnienia spójności i bezpieczeństwa typów danych,
 * zwłaszcza tych pochodzących z CMS Sanity.
 */

// --- PODSTAWOWE TYPY SANITY ---

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// --- GŁÓWNE REUŻYWALNE TYPY ---

/**
 * Definiuje podstawowy, bezpieczny typ dla bloków z edytora Portable Text.
 * Zastępuje użycie `any[]`, eliminując błędy lintera. Każdy obiekt
 * w tablicy musi mieć co najmniej właściwość `_type`.
 */
export type PortableTextBlock = {
  _type: string;
  [key: string]: unknown;
};

export type PortableTextContent = PortableTextBlock[];

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

// --- TYPY DLA SEKCJI STRONY GŁÓWNEJ ---

export interface TimelineEvent {
  year: number;
  title: string;
  description: PortableTextContent;
  image: SanityImage;
  altText: string;
}

export interface ImpactCard {
  title: string;
  description: PortableTextContent;
  image: SanityImage;
  altText: string;
}

export interface Stat {
  value: string;
  label: string;
}

/**
 * Definiuje pełną strukturę danych dla strony głównej.
 */
export interface HomePageData {
  seo: SeoData;

  heroSection?: {
    badgeText: string;
    headingPart1: string;
    headingPart2: string;
    description: PortableTextContent;
    videoWebmUrl: string;
    videoMp4Url: string;
    posterUrl: string;
    primaryButton: {
      label: string;
      link: string;
    };
    secondaryButton?: {
      label: string;
      link: string;
    };
  };

  aboutSection?: {
    smallHeading: string;
    headingPart1: string;
    headingPart2: string;
    headingPart3: string;
    paragraph1: PortableTextContent;
    paragraph2: PortableTextContent;
    image: SanityImage;
    imageAlt: string;
    stats: Stat[];
  };

  impactSection?: {
    headingPrefix?: string;
    headingHighlighted: string;
    subheading: string;
    impactCards: ImpactCard[];
  };

  timelineSection?: {
    headingPrefix?: string;
    headingHighlighted: string;
    subheading: string;
    timelineEvents: TimelineEvent[];
  };

  ctaSection?: {
    heading: string;
    text?: PortableTextContent;
    primaryButton: {
      label: string;
      link: string;
    };
    secondaryButton?: {
      label: string;
      link: string;
    };
  };
}

// --- POZOSTAŁE TYPY (bez zmian) ---

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

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

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

export interface EventType {
  _id: string;
  slug: SanitySlug;
  title: string;
  subtitle: string;
  date: string;
  dateDisplay: string;
  time: string;
  location: string;
  address: string;
  artist: string;
  artistRole: string;
  description: string;
  image: SanityImage;
  price: string;
}

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
