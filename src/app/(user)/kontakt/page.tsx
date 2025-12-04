// Plik: src/app/(user)/kontakt/page.tsx

import type { Metadata } from "next";

// --- IMPORTY KOMPONENTÓW ---

// 2. Client Components (Interaktywne wyspy)
import { ContactFormClient } from "@/components/contact/ContactForm"; // Pamiętaj o zmianie nazwy pliku jeśli zmieniłeś na .client
// 1. Server Components (zoptymalizowane, usunięto "use client")
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { FaqAccordionClient } from "@/components/contact/FaqAccordion";
import { SocialsAndMap } from "@/components/contact/SocialsAndMap";

// 3. UI Helpers
import { MotionWrapper } from "@/components/ui/MotionWrapper";

// --- DANE I NARZĘDZIA ---
import {
  contactData as fallbackContact,
  faqItems as fallbackFaq,
  socialLinks as fallbackSocials,
} from "@/data/siteData";
import type { SocialLink } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import {
  getContactPageData,
  getFaqRange,
  getTotalFaqCount,
} from "@/sanity/lib/queries/contact";

// --- TYPY POMOCNICZE ---
interface SanitySocialLink {
  name: string;
  href: string;
  icon: string;
}

// --- HELPERY ---
const mapSocialColors = (
  socialsFromSanity: SanitySocialLink[],
): SocialLink[] => {
  const colorMap: Record<string, { background: string; hover: string }> = {
    facebook: { background: "bg-[#1877F2]", hover: "hover:bg-[#1877F2]" },
    instagram: {
      background: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]",
      hover:
        "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045]",
    },
    youtube: { background: "bg-[#FF0000]", hover: "hover:bg-[#FF0000]" },
    patronite: { background: "bg-[#F96854]", hover: "hover:bg-[#F96854]" },
  };

  return socialsFromSanity.map((s) => ({
    ...s,
    colorClasses: colorMap[s.icon] || {
      background: "bg-white/10",
      hover: "hover:bg-white/20",
    },
  }));
};

// --- METADATA ---
export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData();
  const seo = data?.seo;

  if (!seo) {
    return {
      title: "Kontakt | Fundacja Maxime",
      description: "Skontaktuj się z nami. Jesteśmy do Twojej dyspozycji.",
    };
  }

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.ogImage
        ? [
            {
              url: urlFor(seo.ogImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: seo.metaTitle,
            },
          ]
        : [],
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  };
}

// --- GŁÓWNY KOMPONENT STRONY (SERVER COMPONENT) ---
export default async function KontaktPage() {
  // 1. Pobieranie danych z Sanity (równolegle dla wydajności)
  const [sanityData, initialFaq, totalFaqCount] = await Promise.all([
    getContactPageData(),
    getFaqRange(0, 5), // Pobierz pierwsze 5 pytań
    getTotalFaqCount(), // Pobierz licznik całkowity
  ]);

  // 2. Przygotowanie danych (Fallbacki)
  const hero = sanityData?.hero || {
    badge: "Jesteśmy do Twojej dyspozycji",
    headingLine1: "Skontaktuj się",
    headingLine2: "z nami",
    description:
      "Masz pytania? Chcesz współpracować? Napisz do nas - odpowiemy najszybciej jak to możliwe",
  };

  const contactInfo = sanityData?.contactInfo || fallbackContact;

  // Logika FAQ
  const displayFaq = initialFaq.length > 0 ? initialFaq : fallbackFaq;
  const displayFaqCount =
    initialFaq.length > 0 ? totalFaqCount : fallbackFaq.length;

  // Logika Social Media
  const socialLinks = sanityData?.socialLinks
    ? mapSocialColors(sanityData.socialLinks)
    : fallbackSocials;

  return (
    <div className="min-h-screen pt-32 pb-20 overflow-x-hidden">
      {/* 1. NAGŁÓWEK (Server Component - animacja wewnątrzwrappera w pliku) */}
      <ContactHeader
        badge={hero.badge}
        headingLine1={hero.headingLine1}
        headingLine2={hero.headingLine2}
        description={hero.description}
      />

      {/* 2. KARTY INFORMACYJNE (Server Component) */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <ContactInfoCards contactData={contactInfo} />
        </div>
      </section>

      {/* 3. SEKCJA GŁÓWNA */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Kolumna Lewa: Formularz */}
            <div>
              <h2 className="mb-8 text-4xl font-bold md:text-5xl">
                Napisz do
                <br />
                <span className="font-youngest text-arylideYellow">Nas</span>
              </h2>

              {/* Animujemy wejście formularza tutaj, bo usunęliśmy framer-motion z samego formularza */}
              <MotionWrapper variant="slideLeft" duration={0.8}>
                <ContactFormClient />
              </MotionWrapper>
            </div>

            {/* Kolumna Prawa: Social Media + Mapa */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-2xl font-bold">
                  Znajdź nas w mediach społecznościowych
                </h3>
                {/* Server Component - animacja wejścia wewnątrz */}
                <SocialsAndMap socialLinks={socialLinks} />
              </div>

              {/* Mapa Google */}
              {contactInfo.googleMapsLink && (
                <MotionWrapper
                  delay={0.3}
                  className="h-96 overflow-hidden rounded-2xl border border-white/10 relative z-0"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.868728518987!2d19.29290131572236!3d50.21332997944357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716da4614457787%3A0x67c25c3855a7322!2sMireckiego%2070%2C%2041-310%20D%C4%85browa%20G%C3%B3rnicza!5e0!3m2!1spl!2spl!4v1672522556272!5m2!1spl!2spl"
                    className="h-full w-full grayscale hover:grayscale-0 transition-all duration-700"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa lokalizacji Fundacji Maxime"
                  />
                </MotionWrapper>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ (Client Component - z paginacją) */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Najczęściej zadawane
              <br />
              <span className="font-youngest text-arylideYellow">Pytania</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              Znajdź odpowiedzi na popularne pytania
            </p>
          </div>
          <FaqAccordionClient
            initialItems={displayFaq}
            initialTotalCount={displayFaqCount}
          />
        </div>
      </section>
    </div>
  );
}
