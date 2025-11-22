import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { FiArrowLeft } from "react-icons/fi";
import { EventContent } from "@/components/events/slug/EventContent"; // Server
// Import Wysp
import { EventHeroAnimation } from "@/components/events/slug/EventHero";
import { EventSidebar } from "@/components/events/slug/EventSidebar"; // Client
import { RelatedEvents } from "@/components/events/slug/RelatedEvents"; // Server
import { MotionWrapper } from "@/components/ui/MotionWrapper"; // Utility wrapper
import type { EventType } from "@/lib/types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { eventsQuery } from "../page";

const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]`;
const eventSlugsQuery = groq`*[_type == "event" && defined(slug.current)][].slug.current`;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage(props: Props) {
  const params = await props.params;

  if (!params?.slug) notFound();

  const event = await client.fetch<EventType>(eventBySlugQuery, {
    slug: params.slug,
  });

  if (!event) notFound();

  // Logika "Inne wydarzenia" na serwerze
  const now = new Date();
  const allEvents = await client.fetch<EventType[]>(eventsQuery);

  const getFullDate = (e: EventType) => new Date(`${e.date}T${e.time}:00`);

  const otherUpcomingEvents = allEvents
    .filter((e) => getFullDate(e) >= now && e._id !== event._id)
    .sort((a, b) => getFullDate(a).getTime() - getFullDate(b).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-20 bg-raisinBlack text-white">
      {/* 1. HERO IMAGE + TITLE (SEO Friendly) */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <Image
            src={urlFor(event.image).url()}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/70 to-transparent" />
        </div>

        {/* Wrapper kliencki animuje tylko wejście tekstu, ale tekst jest w HTML */}
        <EventHeroAnimation>
          <h1 className="mb-3 text-5xl font-bold md:text-6xl lg:text-7xl drop-shadow-lg">
            {event.title}
          </h1>
          <p className="max-w-3xl text-xl text-white/90 md:text-2xl drop-shadow-md">
            {event.subtitle}
          </p>
        </EventHeroAnimation>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <div className="container relative z-20 mx-auto mt-[-50px] px-4 sm:px-6">
        {/* Back Button */}
        <MotionWrapper className="mb-8 inline-block">
          <Link
            href="/wydarzenia"
            className="group inline-flex items-center gap-2 font-semibold text-white/70 transition-all duration-300 hover:gap-3 hover:text-white"
          >
            <FiArrowLeft className="text-arylideYellow transition-transform duration-300 group-hover:-translate-x-1" />
            Wróć do kalendarza
          </Link>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* LEWA KOLUMNA: OPIS (Server Component) */}
          <div className="lg:col-span-2">
            <EventContent event={event} />
          </div>

          {/* PRAWA KOLUMNA: SIDEBAR (Client Component) */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <EventSidebar event={event} />
          </div>
        </div>
      </div>

      {/* 3. RELATED EVENTS (Server Component) */}
      {otherUpcomingEvents.length > 0 && (
        <section className="mt-24">
          <RelatedEvents events={otherUpcomingEvents} />
        </section>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(eventSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}
