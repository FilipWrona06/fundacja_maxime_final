// Plik: src/components/events/FeaturedEvent.tsx

import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMusic,
  FiTag, // <--- 1. DODANO IMPORT IKONY
} from "react-icons/fi";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

export const FeaturedEvent = ({ event }: { event: EventType }) => {
  if (!event) return null;

  return (
    <section className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="group relative h-[500px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:h-[600px] xl:h-[650px]">
        {/* 1. TŁO */}
        <div className="absolute inset-0">
          <Image
            src={urlFor(event.image).width(1920).quality(90).url()}
            alt={event.title}
            fill
            priority
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL={urlFor(event.image)
              .width(20)
              .quality(20)
              .blur(10)
              .url()}
          />
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />
        </div>

        {/* 2. TREŚĆ */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 sm:p-10 md:p-16">
          {/* Badge */}
          <MotionWrapper delay={0.1}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-arylideYellow/30 bg-arylideYellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-arylideYellow backdrop-blur-md sm:text-sm">
              <FiMusic size={14} />
              Najbliższe wydarzenie
            </span>
          </MotionWrapper>

          {/* Tytuł */}
          <MotionWrapper delay={0.2}>
            <Link href={`/wydarzenia/${event.slug.current}`}>
              <h2 className="mb-4 max-w-4xl font-youngest text-4xl leading-none text-white transition-colors hover:text-arylideYellow sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl drop-shadow-xl">
                {event.title}
              </h2>
            </Link>
          </MotionWrapper>

          {/* Szczegóły i Przycisk */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Info (Data/Miejsce/Cena) */}
            <MotionWrapper
              delay={0.3}
              className="flex flex-wrap gap-y-3 gap-x-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <FiCalendar className="text-arylideYellow" />
                <span className="font-medium">
                  {event.dateDisplay || event.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-arylideYellow" />
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-arylideYellow" />
                <span className="font-medium">{event.location}</span>
              </div>

              {/* --- 2. DODANO WYŚWIETLANIE CENY --- */}
              {event.price && (
                <div className="flex items-center gap-2">
                  <FiTag className="text-arylideYellow" />
                  <span className="font-medium">{event.price}</span>
                </div>
              )}
            </MotionWrapper>

            {/* Przycisk CTA */}
            <MotionWrapper delay={0.4}>
              <Link
                href={`/wydarzenia/${event.slug.current}`}
                className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-arylideYellow px-8 py-4 text-base font-bold text-raisinBlack shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-arylideYellow/40"
              >
                <span className="relative z-10">Sprawdź szczegóły</span>
                <FiArrowRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};