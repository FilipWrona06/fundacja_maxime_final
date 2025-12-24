// Plik: src/app/(user)/wydarzenia/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { EventContent } from "@/components/events/slug/EventContent";
// Importujemy zoptymalizowane komponenty
import { EventHero } from "@/components/events/slug/EventHero"; // Server Component
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

// 1. Generowanie statycznych ścieżek (SSG)
export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. Dynamiczne SEO
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
  const event = await getEventBySlug(params.slug);

  if (!event) notFound();

  // Pobieranie powiązanych wydarzeń
  const allEvents = await getAllEvents();
  const now = new Date();
  const getFullDate = (e: EventType) => new Date(`${e.date}T${e.time}:00`);

  const otherUpcomingEvents = allEvents
    .filter((e) => getFullDate(e) >= now && e._id !== event._id)
    .sort((a, b) => getFullDate(a).getTime() - getFullDate(b).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-raisinBlack pb-24 text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] min-h-[550px] w-full overflow-hidden">
        {/* 1. Tło (Renderowane tutaj, bo zależy od danych CMS) */}
        <div className="absolute inset-0">
          <Image
            src={urlFor(event.image).width(1920).quality(90).url()}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-[2s] ease-out"
            priority
            placeholder="blur"
            blurDataURL={urlFor(event.image)
              .width(20)
              .quality(20)
              .blur(10)
              .url()}
          />

          {/* Warstwy gradientów */}
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/85 to-raisinBlack/30" />
          <div className="absolute inset-0 bg-linear-to-b from-raisinBlack/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-raisinBlack/70" />

          {/* Tekstura Noise */}
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
        </div>

        {/* 2. Komponent Hero (Zarządza animacją tekstu i dekoracjami) */}
        <EventHero>
          <h1 className="mb-5 font-youngest text-5xl font-bold leading-[1.05] drop-shadow-2xl transition-all duration-500 hover:drop-shadow-[0_0_30px_rgba(239,213,111,0.3)] md:text-6xl lg:text-7xl xl:text-8xl">
            {event.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/85 drop-shadow-lg transition-colors duration-300 hover:text-white/95 md:text-xl">
            {event.subtitle}
          </p>
        </EventHero>
      </section>

      {/* --- TREŚĆ GŁÓWNA --- */}
      <div className="container relative z-20 mx-auto -mt-20 px-4 sm:px-6">
        {/* Przycisk powrotu (MotionWrapper dodaje animację wejścia) */}
        <MotionWrapper delay={0.1} className="mb-12 inline-block">
          <Link
            href="/wydarzenia"
            className="group inline-flex items-center gap-3 rounded-2xl border border-white/6 bg-linear-to-r from-white/8 to-white/4 px-5 py-3 font-semibold text-white/80 backdrop-blur-xl shadow-lg transition-all duration-500 hover:border-arylideYellow/20 hover:from-white/12 hover:to-white/8 hover:text-white hover:shadow-xl hover:shadow-arylideYellow/5"
          >
            <FiArrowLeft
              className="text-arylideYellow transition-transform duration-500 group-hover:-translate-x-1"
              size={18}
            />
            Wróć do kalendarza
          </Link>
        </MotionWrapper>

        {/* Grid treści */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16 xl:gap-20">
          {/* LEWA KOLUMNA: Opis */}
          <div className="lg:col-span-2">
            <EventContent event={event} />
          </div>

          {/* PRAWA KOLUMNA: Sidebar (Sticky) */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <EventSidebar event={event} />
          </div>
        </div>
      </div>

      {/* --- POWIĄZANE WYDARZENIA --- */}
      {otherUpcomingEvents.length > 0 && (
        <section className="mt-32">
          <RelatedEvents events={otherUpcomingEvents} />
        </section>
      )}
    </div>
  );
}
