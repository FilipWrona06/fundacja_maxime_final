// src/app/page.tsx

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import HomePageClient from '../components/home/HomePageClient'

// Definiujemy typy dla danych, które pobierzemy z Sanity.
// Zapewnia to bezpieczeństwo typów i autouzupełnianie w komponencie klienckim.
export interface HomePageData {
  heroSection: {
    badgeText: string;
    headingPart1: string;
    headingPart2: string;
    description: string;
  };
  statsSection: { value: string; label: string }[];
  aboutSection: {
    smallHeading: string;
    headingPart1: string;
    headingPart2: string;
    headingPart3: string;
    paragraph1: string;
    paragraph2: string;
    image: any; // Typ obrazu z Sanity
    imageAlt: string;
  };
  impactSection: {
    heading: string;
    subheading: string;
    impactCards: { title: string; desc: string; image: any; alt: string }[];
  };
  timelineSection: {
    heading: string;
    subheading: string;
    timelineEvents: {
      year: string;
      fullYear: string;
      title: string;
      text: string;
      image: any;
      alt: string;
    }[];
  };
  ctaSection: {
    heading: string;
    text: string;
  };
}

// Komponent serwerowy, który wykonuje się podczas budowania strony
export default async function HomePage() {
  // Zapytanie GROQ do pobrania danych z jednego dokumentu typu 'homePage'
  // Upewnij się, że masz DOKŁADNIE JEDEN opublikowany dokument tego typu w Sanity Studio
  const query = groq`*[_type == "homePage"][0]{
    heroSection,
    statsSection,
    aboutSection,
    impactSection,
    timelineSection,
    ctaSection
  }`

  const data: HomePageData = await client.fetch(query);

  // Zabezpieczenie na wypadek braku danych w CMS
  if (!data) {
    return <div>Nie znaleziono danych dla strony głównej. Sprawdź, czy dokument został opublikowany w Sanity Studio.</div>;
  }
  
  // Przekazanie pobranych danych jako 'props' do komponentu klienckiego
  return <HomePageClient data={data} />;
}