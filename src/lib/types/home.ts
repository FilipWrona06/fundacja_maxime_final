import type { SeoData } from "./common";
import type { PortableTextContent, SanityImage } from "./sanity";

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
    // usunięto: impactCards - będą generowane dynamicznie
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
