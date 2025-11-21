// Plik: src/app/wydarzenia/page.tsx

import type { Metadata } from "next";
import { groq } from "next-sanity";

import WydarzeniaClientPage from "@/components/events/WydarzeniaClientPage";
import { WydarzeniaHeroSection } from "@/components/events/WydarzeniaHeroSection"; // Upewnij się, że ścieżka jest poprawna
import type { EventType } from "@/lib/types";
import { client } from "@/sanity/lib/client";

// --- METADATA (SEO) ---
export const metadata: Metadata = {
  title: "Repertuar Wydarzeń | Fundacja Maxime",
  description:
    "Sprawdź nasz kalendarz nadchodzących koncertów, festiwali i wydarzeń artystycznych. Dołącz do nas i poczuj rytm kultury.",
};

// --- QUERY (POBIERANIE DANYCH) ---
// Pobieramy wszystkie wydarzenia, sortując od najstarszego do najnowszego (lub odwrotnie w zależności od potrzeb)
// Warto dodać projekcję pól, jeśli chcesz zoptymalizować pobieranie, ale '*' też zadziała.
export const eventsQuery = groq`*[_type == "event"] | order(date asc)`;

export default async function WydarzeniaPage() {
  // Pobieranie danych z opcją rewalidacji co 60 sekund (ISR)
  // Dzięki temu dodanie wydarzenia w Sanity odświeży stronę po minucie.
  const allEvents = await client.fetch<EventType[]>(
    eventsQuery,
    {},
  );

  return (
    <main className="min-h-screen bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* 1. HERO SECTION: Tytuł podstrony i wprowadzenie */}
      {/* To jest ten nowy komponent, który stworzyliśmy wcześniej */}
      <WydarzeniaHeroSection />

      {/* 2. CLIENT PAGE: Interaktywny kalendarz i lista */}
      {/* Używamy ujemnego marginesu (-mt), aby sekcja z kalendarzem wizualnie "nachodziła" na Hero,
          co tworzy nowoczesny efekt warstwowości (pod warunkiem, że Hero ma odpowiedni padding-bottom).
          Jeśli Hero jest wysoki, to płynnie przejdzie w treść. */}
      <div className="relative z-10 -mt-10 sm:-mt-20">
        <WydarzeniaClientPage allEvents={allEvents} />
      </div>
    </main>
  );
}