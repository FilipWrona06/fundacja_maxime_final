// Plik: src/app/(user)/wydarzenia/page.tsx

import type { Metadata } from "next";
// Upewnij się, że importujesz właściwy plik (EventsCalendar.client)
import { EventsCalendarClient } from "@/components/events/EventsCalendar";
import { FeaturedEvent } from "@/components/events/FeaturedEvents";
import { WydarzeniaHeroSection } from "@/components/events/WydarzeniaHeroSection";
import {
  getAllEvents,
  getEventsPageSettings,
} from "@/sanity/lib/queries/events";

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
  const [settings, allEvents] = await Promise.all([
    getEventsPageSettings(),
    getAllEvents(),
  ]);

  const badgeText = settings?.heroSection?.badgeText || "Sezon 2024 / 2025";

  const titleLine1 = settings?.heroSection?.headingLine1 || "Poczuj Rytm";

  const titleLine2 = settings?.heroSection?.headingLine2 || "Naszej Sceny";

  const subtitle =
    settings?.heroSection?.description ||
    "Odkryj nadchodzące koncerty, festiwale i wydarzenia specjalne. Bądź częścią niezapomnianych muzycznych wrażeń w sercu miasta.";

  // Nadal obliczamy upcomingEvents TUTAJ, ale tylko po to, by wybrać FeaturedEvent
  const now = new Date();
  // Resetujemy czas na serwerze do północy, aby porównywanie było spójne
  now.setHours(0, 0, 0, 0);

  const upcomingEvents = allEvents
    .filter((e) => {
      const eDate = new Date(e.date);
      return eDate >= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
        {/* POPRAWKA: Usunięto prop 'upcomingEvents', ponieważ komponent sam to teraz liczy */}
        <EventsCalendarClient allEvents={allEvents} />
      </div>
    </main>
  );
}
