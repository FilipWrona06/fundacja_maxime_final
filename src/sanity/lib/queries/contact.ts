import { groq } from "next-sanity";
import { cache } from "react";
import type { ContactData, FaqItem, SeoData, SocialLink } from "@/lib/types";
import { client } from "../client";

// Definicja typu zwracanego z Sanity
export interface ContactPageData {
  seo: SeoData;
  hero: {
    badge: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
  };
  contactInfo: ContactData;
  socialLinks: SocialLink[]; // Użyjemy tego typu, ale musimy zmapować kolory ręcznie w komponencie lub tutaj
  faq: FaqItem[];
}

/**
 * Pobiera dane strony kontaktu.
 */
export const getContactPageData = cache(
  async (): Promise<ContactPageData | null> => {
    const data = await client.fetch<ContactPageData>(
      groq`*[_type == "contactPage"][0]{
        seo,
        hero,
        contactInfo {
          email,
          phone,
          address,
          googleMapsLink
        },
        socialLinks[]{
          name,
          href,
          icon
        },
        faq[]{
          question,
          answer
        }
      }`,
      {},
      { next: { tags: ["contactPage"] } },
    );

    return data ?? null;
  },
);
