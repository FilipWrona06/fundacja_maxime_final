// src/lib/types.ts

/**
 * @file Centralne definicje typów TypeScript dla projektu.
 * Używane do zapewnienia spójności i bezpieczeństwa typów danych,
 * zwłaszcza tych pochodzących z CMS Sanity.
 */

/**
 * Reprezentuje podstawową strukturę obiektu obrazka zwracanego przez Sanity CMS.
 * Używany w helperze `urlFor` do generowania URL-i obrazów.
 */
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

// --- NOWOŚĆ: Wyodrębniony i wyeksportowany typ dla pojedynczego wydarzenia ---
/**
 * Reprezentuje pojedynczy element na osi czasu na stronie głównej.
 */
export interface TimelineEvent {
  year: string;
  fullYear: string;
  title: string;
  text: string;
  image: SanityImage;
  alt: string;
}

/**
 * Definiuje pełną strukturę danych dla strony głównej,
 * pobieraną z dokumentu 'homePage' w Sanity.
 */
export interface HomePageData {
  heroSection: {
    badgeText: string;
    headingPart1: string;
    headingPart2: string;
    description: string;
    videoWebmUrl: string;
    videoMp4Url: string;
    posterUrl: string;
  };
  statsSection: { value: string; label: string }[];
  aboutSection: {
    smallHeading: string;
    headingPart1: string;
    headingPart2: string;
    headingPart3: string;
    paragraph1: string;
    paragraph2: string;
    image: SanityImage;
    imageAlt: string;
  };
  impactSection: {
    heading: string;
    subheading: string;
    impactCards: {
      title: string;
      desc: string;
      image: SanityImage;
      alt: string;
    }[];
  };
  // --- ZMIANA: Używamy teraz nowo zdefiniowanego, reużywalnego typu ---
  timelineSection: {
    heading: string;
    subheading: string;
    timelineEvents: TimelineEvent[]; // <-- Używamy TimelineEvent[]
  };
  ctaSection: {
    heading: string;
    text: string;
  };
}

// --- TYPY DANYCH STATYCZNYCH STRONY ---
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
  seo: {
    title: string;
    description: string;
    ogImage?: SanityImage;
  };
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