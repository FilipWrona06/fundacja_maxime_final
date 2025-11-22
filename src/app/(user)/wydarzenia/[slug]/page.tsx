// Plik: src/app/(user)/wydarzenia/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

// Komponenty
import { EventContent } from "@/components/events/slug/EventContent";
import { EventHeroAnimation } from "@/components/events/slug/EventHero";
import { EventSidebar } from "@/components/events/slug/EventSidebar";
import { RelatedEvents } from "@/components/events/slug/RelatedEvents";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

// Sanity & Typy
import type { EventType } from "@/lib/types/index";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllEvents,
  getEventBySlug,
  getEventSlugs,
} from "@/sanity/lib/queries/events";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Generowanie statycznych ścieżek (SSG) dla szybkiego ładowania
export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. Dynamiczne SEO dla konkretnego wydarzenia
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return {};
  }

  return {
    title: event.seo?.metaTitle || `${event.title} | Fundacja Maxime`,
    description:
      event.seo?.metaDescription ||
      event.subtitle ||
      "Sprawdź szczegóły tego wydarzenia.",
    openGraph: {
      images: event.seo?.ogImage
        ? [urlFor(event.seo.ogImage).width(1200).height(630).url()]
        : [urlFor(event.image).width(1200).height(630).url()],
    },
  };
}

// 3. Główny komponent strony
export default async function EventDetailPage(props: Props) {
  const params = await props.params;

  // Pobieramy dane konkretnego wydarzenia
  const event = await getEventBySlug(params.slug);

  if (!event) notFound();

  // Pobieramy wszystkie wydarzenia, aby wyfiltrować "Inne wydarzenia"
  // (Pobieranie getAllEvents jest cache'owane, więc jest szybkie)
  const allEvents = await getAllEvents();
  const now = new Date();
  const getFullDate = (e: EventType) => new Date(`${e.date}T${e.time}:00`);

  // Filtrujemy: Tylko przyszłe I nie to samo co obecnie wyświetlane
  const otherUpcomingEvents = allEvents
    .filter((e) => getFullDate(e) >= now && e._id !== event._id)
    .sort((a, b) => getFullDate(a).getTime() - getFullDate(b).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-20 bg-raisinBlack text-white">
      {/* 1. HERO IMAGE + TITLE */}
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
        {/* Przycisk powrotu */}
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
          {/* LEWA KOLUMNA: TREŚĆ */}
          <div className="lg:col-span-2">
            <EventContent event={event} />
          </div>

          {/* PRAWA KOLUMNA: SIDEBAR */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <EventSidebar event={event} />
          </div>
        </div>
      </div>

      {/* 3. RELATED EVENTS (Wyświetlamy tylko jeśli są jakieś inne wydarzenia) */}
      {otherUpcomingEvents.length > 0 && (
        <section className="mt-24">
          <RelatedEvents events={otherUpcomingEvents} />
        </section>
      )}
    </div>
  );
}