import { groq } from "next-sanity";
import { cache } from "react";
import type { EventsPageData, EventType } from "@/lib/types";
import { client } from "../client";

/**
 * Zbiór funkcji do pobierania danych wyłącznie dla sekcji wydarzeń.
 */

/**
 * 1. Pobiera ustawienia strony głównej wydarzeń (SEO, Nagłówek Hero).
 * Tag rewalidacji: "events-page" (dla Singletonu)
 */
export const getEventsPageSettings = cache(
  async (): Promise<EventsPageData | null> => {
    const data = await client.fetch<EventsPageData>(
      groq`*[_type == "eventsPage"][0]{
        seo,
        heroSection
      }`,
      {},
      { next: { tags: ["events-page"] } },
    );
    return data ?? null;
  },
);

/**
 * 2. Pobiera WSZYSTKIE wydarzenia, posortowane od najwcześniejszego.
 * Tag rewalidacji: "events" (dla kolekcji dokumentów)
 */
export const getAllEvents = cache(async (): Promise<EventType[]> => {
  const data = await client.fetch<EventType[]>(
    groq`*[_type == "event"] | order(date asc) {
      _id,
      title,
      slug,
      subtitle,
      date,
      dateDisplay,
      time,
      location,
      address,
      price,
      ticketLink,
      image,       // Pobieramy cały obiekt obrazka dla urlFor()
      description, // RichText (tablica bloków)
      artist,
      artistRole
    }`,
    {},
    { next: { tags: ["events"] } },
  );
  return data || [];
});

/**
 * 3. Pobiera POJEDYNCZE wydarzenie na podstawie sluga.
 * Używane na stronie dynamicznej /wydarzenia/[slug].
 */
export const getEventBySlug = cache(
  async (slug: string): Promise<EventType | null> => {
    const data = await client.fetch<EventType>(
      groq`*[_type == "event" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        subtitle,
        date,
        dateDisplay,
        time,
        location,
        address,
        price,
        ticketLink,
        image,
        description,
        artist,
        artistRole,
        seo 
      }`,
      { slug },
      { next: { tags: ["events"] } },
    );
    return data ?? null;
  },
);

/**
 * 4. Pobiera listę slugów do generowania ścieżek statycznych (generateStaticParams).
 */
export const getEventSlugs = cache(async (): Promise<string[]> => {
  const data = await client.fetch<string[]>(
    groq`*[_type == "event" && defined(slug.current)][].slug.current`,
    {},
    { next: { tags: ["events"] } },
  );
  return data || [];
});
