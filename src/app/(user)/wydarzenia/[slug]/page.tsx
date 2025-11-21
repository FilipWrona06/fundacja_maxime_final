import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import type { EventType } from "@/lib/types";
import { client } from "@/sanity/lib/client";
import { eventsQuery } from "../page";
import EventDetailClient from "../../../../components/events/slug/EventDetailClient";

const getEventFullDate = (event: EventType) =>
  new Date(`${event.date}T${event.time}:00`);

const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]`;
const eventSlugsQuery = groq`*[_type == "event" && defined(slug.current)][].slug.current`;

// Zmieniamy typ `props`, aby odzwierciedlał, że `params` to Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage(props: Props) {
  //
  // ===== KLUCZOWA POPRAWKA JEST TUTAJ =====
  // Używamy `await`, aby "rozpakować" obietnicę i dostać się do faktycznego obiektu params.
  //
  const params = await props.params;
  const slug = params.slug;

  // Sprawdzamy, czy slug istnieje, aby uniknąć błędów
  if (!slug) {
    notFound();
  }

  const queryParams = { slug: slug };

  // Przekazujemy zapytanie ORAZ obiekt z parametrami do funkcji fetch
  const event = await client.fetch<EventType>(eventBySlugQuery, queryParams);

  if (!event) {
    notFound();
  }

  const now = new Date();
  const allEvents = await client.fetch<EventType[]>(eventsQuery);

  const otherUpcomingEvents = allEvents
    .filter((e) => getEventFullDate(e) >= now && e._id !== event._id)
    .sort(
      (a, b) => getEventFullDate(a).getTime() - getEventFullDate(b).getTime(),
    )
    .slice(0, 3);

  return (
    <EventDetailClient
      event={event}
      otherUpcomingEvents={otherUpcomingEvents}
    />
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(eventSlugsQuery);

  return slugs.map((slug) => ({
    slug,
  }));
}
