import type { Metadata } from "next";
import { groq } from "next-sanity";
import { EventsCalendarClient } from "@/components/events/EventsCalendar";
import { FeaturedEvent } from "@/components/events/FeaturedEvents";
// Komponenty (Wyspy)
import { WydarzeniaHeroSection } from "@/components/events/WydarzeniaHeroSection";
import type { EventType } from "@/lib/types";
import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Repertuar Wydarzeń | Fundacja Maxime",
  description: "Sprawdź nasz kalendarz nadchodzących koncertów...",
};

export const eventsQuery = groq`*[_type == "event"] | order(date asc)`;

export default async function WydarzeniaPage() {
  // 1. Pobieranie danych
  const allEvents = await client.fetch<EventType[]>(eventsQuery, {});

  // 2. Logika biznesowa na serwerze (zamiast u klienta)
  const now = new Date();
  const getFullDate = (e: EventType) => new Date(`${e.date}T${e.time}:00`);

  const upcomingEvents = allEvents
    .filter((e) => getFullDate(e) >= now)
    .sort((a, b) => getFullDate(a).getTime() - getFullDate(b).getTime());

  // Najbliższe wydarzenie do sekcji wyróżnionej
  const featuredEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  return (
    <main className="min-h-screen bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* SEKJA 1: Hero (Napisy) - Server Component */}
      <WydarzeniaHeroSection />

      <div className="relative z-10 -mt-10 sm:-mt-20 space-y-16 sm:space-y-24 pb-20">
        {/* SEKCJA 2: Najbliższe wydarzenie - Server Component (HTML gotowy od razu) */}
        {featuredEvent && <FeaturedEvent event={featuredEvent} />}

        {/* SEKCJA 3: Kalendarz - Client Island (Interaktywność) */}
        {/* Przekazujemy gotowe, posortowane dane */}
        <EventsCalendarClient
          allEvents={allEvents}
          upcomingEvents={upcomingEvents}
        />
      </div>
    </main>
  );
}
