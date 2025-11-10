/**
 * @file Strona główna listy wydarzeń.
 * Działa jako Komponent Serwerowy (RSC) - pobiera dane z Sanity
 * i przekazuje je do komponentu klienckiego do renderowania interfejsu.
 */
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import WydarzeniaClientPage from "./WydarzeniaClientPage";
import type { EventType } from "@/lib/types";

// Zapytanie GROQ do pobrania wszystkich dokumentów typu 'event'
export const eventsQuery = groq`*[_type == "event"] | order(date asc)`;

export default async function WydarzeniaPage() {
  const allEvents = await client.fetch<EventType[]>(eventsQuery);

  return <WydarzeniaClientPage allEvents={allEvents} />;
}
