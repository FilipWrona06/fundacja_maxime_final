import type { Metadata } from "next";
import { EventsCalendarClient } from "@/components/events/EventsCalendar";
import { FeaturedEvent } from "@/components/events/FeaturedEvents";
import { WydarzeniaHeroSectionClient as WydarzeniaHeroSection } from "@/components/events/WydarzeniaHeroSection.client";
import type { EventType } from "@/lib/types/index";
import {
  getAllEvents,
  getEventsPageSettings,
} from "@/sanity/lib/queries/events";

// 1. Dynamiczne generowanie metadanych SEO
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getEventsPageSettings();

  return {
    title: settings?.seo?.metaTitle || "Repertuar Wydarzeń | Fundacja Maxime",
    description:
      settings?.seo?.metaDescription ||
      "Sprawdź nasz kalendarz nadchodzących koncertów i wydarzeń kulturalnych.",
  };
}

export default async function WydarzeniaPage() {
  // 2. Pobieranie danych równolegle (Settings + Events)
  const [settings, allEvents] = await Promise.all([
    getEventsPageSettings(),
    getAllEvents(),
  ]);

  // 3. Normalizacja danych Hero (CMS vs Fallback)
  // Mapujemy nazwy z CMS (headingLine1) na nazwy propsów komponentu (titleLine1)
  const badgeText =
    settings?.heroSection?.badgeText || "Sezon 2024 / 2025";
    
  const titleLine1 =
    settings?.heroSection?.headingLine1 || "Poczuj Rytm";
    
  const titleLine2 =
    settings?.heroSection?.headingLine2 || "Naszej Sceny";
    
  const subtitle =
    settings?.heroSection?.description ||
    "Odkryj nadchodzące koncerty, festiwale i wydarzenia specjalne. Bądź częścią niezapomnianych muzycznych wrażeń w sercu miasta.";

  // 4. Logika biznesowa (Sortowanie i filtrowanie)
  const now = new Date();
  const getFullDate = (e: EventType) => new Date(`${e.date}T${e.time}:00`);

  const upcomingEvents = allEvents
    .filter((e) => getFullDate(e) >= now)
    .sort((a, b) => getFullDate(a).getTime() - getFullDate(b).getTime());

  const featuredEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  return (
    <main className="min-h-screen bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* SEKCJA 1: Hero */}
      <WydarzeniaHeroSection
        badgeText={badgeText}
        titleLine1={titleLine1}
        titleLine2={titleLine2}
        subtitle={subtitle}
      />

      <div className="relative z-10 -mt-10 sm:-mt-20 space-y-16 sm:space-y-24 pb-20">
        {/* SEKCJA 2: Najbliższe wydarzenie */}
        {featuredEvent && <FeaturedEvent event={featuredEvent} />}

        {/* SEKCJA 3: Kalendarz */}
        <EventsCalendarClient
          allEvents={allEvents}
          upcomingEvents={upcomingEvents}
        />
      </div>
    </main>
  );
}