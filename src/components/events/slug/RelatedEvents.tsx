// Plik: src/components/events/slug/RelatedEvents.tsx

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

export const RelatedEvents = ({ events }: { events: EventType[] }) => {
  return (
    <section className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
      {/* NAGŁÓWEK SEKCJI */}
      <MotionWrapper className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Inne{" "}
          <span className="font-youngest text-arylideYellow">Wydarzenia</span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-arylideYellow/30" />
      </MotionWrapper>

      {/* GRID KAFLI */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <RelatedEventCard key={event._id} event={event} index={index} />
        ))}
      </div>
    </section>
  );
};

// --- KOMPONENT KARTY ---
function RelatedEventCard({
  event,
  index,
}: {
  event: EventType;
  index: number;
}) {
  return (
    <MotionWrapper
      delay={index * 0.15}
      className="h-full"
    >
      <Link
        href={`/wydarzenia/${event.slug.current}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-arylideYellow/30 hover:shadow-2xl hover:shadow-arylideYellow/10"
      >
        {/* 1. OBRAZEK */}
        <div className="relative aspect-video w-full overflow-hidden sm:aspect-4/3">
          <Image
            src={urlFor(event.image).width(600).height(450).url()}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-transparent to-transparent opacity-60" />

          {/* Badge z datą na obrazku */}
          <div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-raisinBlack/80 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md">
            {/* ZMIANA: Używamy dateDisplay (ładniejszy format) z fallbackiem do date */}
            {event.dateDisplay || event.date}
          </div>
        </div>

        {/* 2. TREŚĆ */}
        <div className="flex flex-1 flex-col p-6">
          {/* Tytuł */}
          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-arylideYellow">
            {event.title}
          </h3>

          {/* Podtytuł / Info */}
          <p className="mb-6 line-clamp-2 text-sm text-white/60">
            {event.subtitle ||
              "Sprawdź szczegóły tego wyjątkowego wydarzenia muzycznego."}
          </p>

          {/* Footer Karty */}
          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
            {/* Cena */}
            <div className="flex items-center gap-2 text-sm font-bold text-arylideYellow">
              <FiTag className="shrink-0" />
              <span>{event.price}</span>
            </div>

            {/* Link "Zobacz więcej" */}
            <div className="flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3 group-hover:text-arylideYellow">
              <span>Szczegóły</span>
              <FiArrowRight />
            </div>
          </div>
        </div>
      </Link>
    </MotionWrapper>
  );
}