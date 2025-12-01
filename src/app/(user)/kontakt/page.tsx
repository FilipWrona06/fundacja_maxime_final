import type { Metadata } from "next";

// Importy danych i zapytań
import { getContactPageData } from "@/sanity/lib/queries/contact";
// Fallback data (na wypadek pustego CMS)
import { 
  contactData as fallbackContact, 
  faqItems as fallbackFaq, 
  socialLinks as fallbackSocials 
} from "@/data/siteData";

// Typy
import type { SocialLink } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

// Importy "Wysp" (Komponentów Klienckich)
import { ContactCtaClient } from "@/components/contact/ContactCta";
import { ContactFormClient } from "@/components/contact/ContactForm";
import { ContactHeaderClient } from "@/components/contact/ContactHeader";
import { ContactInfoCardsClient } from "@/components/contact/ContactInfoCards";
import { FaqAccordionClient } from "@/components/contact/FaqAccordion";
import { SocialsAndMapClient } from "@/components/contact/SocialsAndMap";

// Helper do mapowania kolorów dla Social Media z CMS
// Sanity przechowuje tylko nazwę ikony, kolory Tailwind nadajemy tutaj
const mapSocialColors = (socialsFromSanity: any[]): SocialLink[] => {
  const colorMap: Record<string, { background: string; hover: string }> = {
    facebook: { background: "bg-[#1877F2]", hover: "hover:bg-[#1877F2]" },
    instagram: {
      background: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]",
      hover: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045]",
    },
    youtube: { background: "bg-[#FF0000]", hover: "hover:bg-[#FF0000]" },
    patronite: { background: "bg-[#F96854]", hover: "hover:bg-[#F96854]" },
  };

  return socialsFromSanity.map((s) => ({
    ...s,
    colorClasses: colorMap[s.icon] || { background: "bg-white/10", hover: "hover:bg-white/20" },
  }));
};

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

export default async function KontaktPage() {
  // 1. Pobieramy dane z Sanity
  const sanityData = await getContactPageData();

  // 2. Przygotowujemy dane (CMS lub Fallback)
  const hero = sanityData?.hero || {
    badge: "Jesteśmy do Twojej dyspozycji",
    headingLine1: "Skontaktuj się",
    headingLine2: "z nami",
    description: "Masz pytania? Chcesz współpracować? Napisz do nas - odpowiemy najszybciej jak to możliwe",
  };

  const contactInfo = sanityData?.contactInfo || fallbackContact;
  const faq = sanityData?.faq || fallbackFaq;
  
  // Mapujemy sociale z Sanity
  const socialLinks = sanityData?.socialLinks 
    ? mapSocialColors(sanityData.socialLinks) 
    : fallbackSocials;

  return (
    <div className="min-h-screen pt-32 pb-20 overflow-x-hidden">
      {/* WYSPA 1: Nagłówek */}
      <ContactHeaderClient 
        badge={hero.badge}
        headingLine1={hero.headingLine1}
        headingLine2={hero.headingLine2}
        description={hero.description}
      />

      {/* WYSPA 2: Karty informacyjne */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <ContactInfoCardsClient contactData={contactInfo} />
        </div>
      </section>

      {/* SEKCJA GŁÓWNA */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            
            {/* WYSPA 3: Formularz */}
            <div>
              <h2 className="mb-8 text-4xl font-bold md:text-5xl">
                Napisz do
                <br />
                <span className="font-youngest text-arylideYellow">Nas</span>
              </h2>
              <ContactFormClient />
            </div>

            {/* WYSPA 4: Social Media + Mapa */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-2xl font-bold">
                  Znajdź nas w mediach społecznościowych
                </h3>
                <SocialsAndMapClient socialLinks={socialLinks} />
              </div>

              {/* Mapa Google - renderowana statycznie (bez JS klienta) */}
              {contactInfo.googleMapsLink && (
                <div className="h-96 overflow-hidden rounded-2xl border border-white/10 relative z-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.868728518987!2d19.29290131572236!3d50.21332997944357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716da4614457787%3A0x67c25c3855a7322!2sMireckiego%2070%2C%2041-310%20D%C4%85browa%20G%C3%B3rnicza!5e0!3m2!1spl!2spl!4v1672522556272!5m2!1spl!2spl"
                    className="h-full w-full grayscale hover:grayscale-0 transition-all duration-700"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa lokalizacji Fundacji Maxime"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WYSPA 5: FAQ */}
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
          <FaqAccordionClient items={faq} />
        </div>
      </section>

      {/* WYSPA 6: Dolne CTA */}
      <ContactCtaClient email={contactInfo.email} />
    </div>
  );
}