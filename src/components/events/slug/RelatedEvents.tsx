// Plik: src/components/events/slug/RelatedEvents.tsx

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiTag } from "react-icons/fi";
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

export const RelatedEvents = ({ events }: { events: EventType[] }) => {
  return (
    <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
      {/* NAGŁÓWEK SEKCJI */}nm
      <MotionWrapper className="mb-16 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-arylideYellow/60" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-arylideYellow/70">
            Odkryj więcej
          </span>
          <span className="h-px w-12 bg-linear-to-l from-transparent to-arylideYellow/60" />
        </div>

        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Inne{" "}
          <span className="font-youngest text-arylideYellow">Wydarzenia</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
          Sprawdź nadchodzące koncerty i wydarzenia muzyczne
        </p>
      </MotionWrapper>
      {/* GRID KAFLI Z STAGGER ANIMATION */}
      <StaggerContainer
        staggerDelay={0.12}
        delayChildren={0.2}
        className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {events.map((event) => (
          <RelatedEventCard key={event._id} event={event} />
        ))}
      </StaggerContainer>
    </section>
  );
};

// --- PREMIUM EVENT CARD ---
function RelatedEventCard({ event }: { event: EventType }) {
  return (
    <MotionWrapper variant="scale" className="h-full">
      <Link
        href={`/wydarzenia/${event.slug.current}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-white/8 to-white/2 shadow-premium backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-arylideYellow/20 hover:shadow-2xl hover:shadow-arylideYellow/10"
      >
        {/* Decorative top accent */}
        <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-arylideYellow/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* 1. OBRAZEK Z PREMIUM OVERLAY */}
        <div className="relative aspect-video w-full overflow-hidden sm:aspect-4/3">
          <Image
            src={urlFor(event.image).width(600).height(450).url()}
            alt={event.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-br from-arylideYellow/3 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Premium date badge */}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/8 bg-raisinBlack/90 px-3 py-2 text-sm font-bold text-white backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:border-arylideYellow/30 group-hover:bg-raisinBlack/95">
            <FiCalendar className="text-arylideYellow" size={14} />
            <span>{event.dateDisplay || event.date}</span>
          </div>
        </div>

        {/* 2. CONTENT AREA */}
        <div className="relative flex flex-1 flex-col p-6">
          {/* Subtle glow effect */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-arylideYellow/2 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Tytuł */}
          <h3 className="relative z-10 mb-3 line-clamp-2 text-xl font-bold leading-tight text-white transition-colors duration-500 group-hover:text-arylideYellow">
            {event.title}
          </h3>

          {/* Podtytuł */}
          <p className="relative z-10 mb-6 line-clamp-2 text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/70">
            {event.subtitle ||
              "Sprawdź szczegóły tego wyjątkowego wydarzenia muzycznego."}
          </p>

          {/* Footer Karty */}
          <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/6 pt-4">
            {/* Cena z premium styling */}
            <div className="flex items-center gap-2.5 rounded-lg bg-linear-to-r from-arylideYellow/10 to-arylideYellow/5 px-3 py-1.5 text-sm font-bold text-arylideYellow transition-all duration-500 group-hover:from-arylideYellow/15 group-hover:to-arylideYellow/8">
              <FiTag className="shrink-0" size={14} />
              <span>{event.price}</span>
            </div>

            {/* Link "Zobacz więcej" z smooth animation */}
            <div className="flex items-center gap-2 text-sm font-semibold text-white/70 transition-all duration-500 group-hover:gap-3 group-hover:text-arylideYellow">
              <span>Szczegóły</span>
              <FiArrowRight className="transition-transform duration-500 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
      </Link>
    </MotionWrapper>
  );
}
