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
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
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
    posterUrl: string; // Dodaj to
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
      alt: string 
    }[];
  };
  timelineSection: {
    heading: string;
    subheading: string;
    timelineEvents: {
      year: string;
      fullYear: string;
      title: string;
      text: string;
      image: SanityImage;
      alt: string;
    }[];
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