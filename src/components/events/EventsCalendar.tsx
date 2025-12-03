import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types";
// Importujemy część interaktywną
import { EventsCalendarInteractive } from "./EventsCalendarInteractive";

interface EventsCalendarProps {
  allEvents: EventType[];
}

export const EventsCalendarClient = ({ allEvents }: EventsCalendarProps) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* 
        NAGŁÓWEK (Renderowany na serwerze, ożywiony wrapperem).
        Przeniesiony z komponentu klienckiego dla lepszego LCP i SEO.
      */}
      <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <StaggerContainer staggerDelay={0.1}>
          <MotionWrapper variant="fadeUp" className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-linear-to-r from-arylideYellow/60 to-transparent" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-arylideYellow/70">
                Kalendarz
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Repertuar{" "}
              <span className="font-youngest text-arylideYellow">Wydarzeń</span>
            </h2>
          </MotionWrapper>

          <MotionWrapper variant="fadeUp" delay={0.2}>
            <p className="max-w-md text-base leading-relaxed text-white/60 md:text-right">
              Wybierz datę, aby zobaczyć szczegóły, lub przeglądaj listę
              nadchodzących koncertów obok.
            </p>
          </MotionWrapper>
        </StaggerContainer>
      </div>

      {/* 
        GRID KALENDARZA (Client Component).
        To jest "Wyspa Interaktywności".
      */}
      <EventsCalendarInteractive allEvents={allEvents} />
    </section>
  );
};
