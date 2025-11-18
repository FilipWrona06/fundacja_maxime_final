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
  description: string;
  image: SanityImage;
  altText: string;
}

export interface ImpactCard {
  title: string;
  description: string;
  image: SanityImage;
  altText: string;
}

export interface Stat {
  value: string;
  label: string;
}

/**
 * ZAKTUALIZOWANE: Definiuje pełną strukturę danych dla strony głównej.
 */
export interface HomePageData {
  seo: SeoData;

  // ZMIANA: Usunięto isEnabled
  heroSection?: {
    badgeText: string;
    headingPart1: string;
    headingPart2: string;
    description: string;
    videoWebmUrl: string;
    videoMp4Url:string;
    posterUrl: string;
  };

  // ZMIANA: Usunięto isEnabled
  aboutSection?: {
    smallHeading: string;
    headingPart1: string;
    headingPart2: string;
    headingPart3: string;
    paragraph1: string;
    paragraph2: string;
    image: SanityImage;
    imageAlt: string;
    stats: Stat[];
  };

  // ZMIANA: Usunięto isEnabled
  impactSection?: {
    headingPrefix?: string;
    headingHighlighted: string;
    subheading: string;
    impactCards: ImpactCard[];
  };

  // ZMIANA: Usunięto isEnabled
  timelineSection?: {
    headingPrefix?: string;
    headingHighlighted: string;
    subheading: string;
    timelineEvents: TimelineEvent[];
  };

  // ZMIANA: Usunięto isEnabled
  ctaSection?: {
    heading: string;
    text?: string;
    button: {
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