// Plik: src/app/(user)/wydarzenia/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import { EventContent } from "@/components/events/slug/EventContent";
import { EventHeroAnimation } from "@/components/events/slug/EventHero";
import { EventSidebar } from "@/components/events/slug/EventSidebar";
import { RelatedEvents } from "@/components/events/slug/RelatedEvents";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

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

// Generowanie statycznych ścieżek (SSG)
export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamiczne SEO
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

// Główny komponent strony
export default async function EventDetailPage(props: Props) {
  const params = await props.params;
  const event = await getEventBySlug(params.slug);

  if (!event) notFound();

  const allEvents = await getAllEvents();
  const now = new Date();
  const getFullDate = (e: EventType) => new Date(`${e.date}T${e.time}:00`);

  const otherUpcomingEvents = allEvents
    .filter((e) => getFullDate(e) >= now && e._id !== event._id)
    .sort((a, b) => getFullDate(a).getTime() - getFullDate(b).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-raisinBlack pb-24 text-white">
      {/* HERO IMAGE + TITLE - bardziej elegancki */}
      <section className="relative h-[65vh] min-h-[500px] w-full">
        <div className="absolute inset-0">
          <Image
            src={urlFor(event.image).url()}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay - bardziej subtelny i smooth */}
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/80 to-raisinBlack/30" />
          <div className="absolute inset-0 bg-linear-to-b from-raisinBlack/50 via-transparent to-transparent" />
        </div>

        <EventHeroAnimation>
          <h1 className="mb-4 text-5xl font-bold leading-[1.05] drop-shadow-2xl md:text-6xl lg:text-7xl">
            {event.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/80 drop-shadow-lg md:text-xl">
            {event.subtitle}
          </p>
        </EventHeroAnimation>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="container relative z-20 mx-auto mt-[-60px] px-4 sm:px-6">
        {/* Przycisk powrotu - bardziej elegancki */}
        <MotionWrapper className="mb-10 inline-block">
          <Link
            href="/wydarzenia"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white/5 px-4 py-2.5 font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-lg"
          >
            <FiArrowLeft
              className="text-arylideYellow transition-transform duration-300 group-hover:-translate-x-1"
              size={18}
            />
            Wróć do kalendarza
          </Link>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
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

      {/* RELATED EVENTS */}
      {otherUpcomingEvents.length > 0 && (
        <section className="mt-28">
          <RelatedEvents events={otherUpcomingEvents} />
        </section>
      )}
    </div>
  );
}
