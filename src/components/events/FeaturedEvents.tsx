// Plik: src/components/events/FeaturedEvent.tsx

import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMusic,
  FiTag,
} from "react-icons/fi";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import type { EventType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

export const FeaturedEvent = ({ event }: { event: EventType }) => {
  if (!event) return null;

  return (
    <section className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="group relative h-[500px] w-full overflow-hidden rounded-3xl border border-white/8 shadow-premium md:h-[600px] xl:h-[650px]">
        {/* TŁO Z OBRAZEM */}
        <div className="absolute inset-0">
          <Image
            src={urlFor(event.image).width(1920).quality(90).url()}
            alt={event.title}
            fill
            priority
            className="object-cover transition-all duration-1500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL={urlFor(event.image)
              .width(20)
              .quality(20)
              .blur(10)
              .url()}
          />

          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/80 to-raisinBlack/20" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-raisinBlack/60" />

          {/* Subtelny glow effect */}
          <div className="absolute inset-0 bg-linear-to-br from-arylideYellow/3 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>

        {/* TREŚĆ */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 sm:p-10 md:p-16">
          {/* Badge z premium glow */}
          <MotionWrapper delay={0.1}>
            <span className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-arylideYellow/20 bg-linear-to-r from-arylideYellow/10 to-arylideYellow/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-arylideYellow backdrop-blur-xl before:absolute before:inset-0 before:rounded-full before:bg-arylideYellow/0 before:transition-all before:duration-500 hover:before:bg-arylideYellow/5 sm:text-sm shadow-lg shadow-arylideYellow/10">
              <FiMusic size={14} />
              Najbliższe wydarzenie
            </span>
          </MotionWrapper>

          {/* Tytuł z smooth hover */}
          <MotionWrapper delay={0.2}>
            <Link href={`/wydarzenia/${event.slug.current}`}>
              <h2 className="mb-4 max-w-4xl font-youngest text-4xl leading-none text-white transition-all duration-500 hover:text-arylideYellow hover:drop-shadow-2xl sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl drop-shadow-xl">
                {event.title}
              </h2>
            </Link>
          </MotionWrapper>

          {/* Szczegóły i Przycisk */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Info Cards */}
            <MotionWrapper
              delay={0.3}
              className="flex flex-wrap gap-y-3 gap-x-6 text-white/80"
            >
              <div className="group/info flex items-center gap-2 transition-colors duration-500 hover:text-arylideYellow">
                <FiCalendar className="text-arylideYellow transition-transform duration-500 group-hover/info:scale-110" />
                <span className="font-medium">
                  {event.dateDisplay || event.date}
                </span>
              </div>
              <div className="group/info flex items-center gap-2 transition-colors duration-500 hover:text-arylideYellow">
                <FiClock className="text-arylideYellow transition-transform duration-500 group-hover/info:scale-110" />
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="group/info flex items-center gap-2 transition-colors duration-500 hover:text-arylideYellow">
                <FiMapPin className="text-arylideYellow transition-transform duration-500 group-hover/info:scale-110" />
                <span className="font-medium">{event.location}</span>
              </div>

              {/* Cena */}
              {event.price && (
                <div className="group/info flex items-center gap-2 transition-colors duration-500 hover:text-arylideYellow">
                  <FiTag className="text-arylideYellow transition-transform duration-500 group-hover/info:scale-110" />
                  <span className="font-semibold">{event.price}</span>
                </div>
              )}
            </MotionWrapper>

            {/* Premium CTA Button */}
            <MotionWrapper delay={0.4}>
              <Link
                href={`/wydarzenia/${event.slug.current}`}
                className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-linear-to-r from-arylideYellow to-arylideYellow/90 px-8 py-4 text-base font-bold text-raisinBlack shadow-lg shadow-arylideYellow/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-arylideYellow/30 active:scale-100"
              >
                {/* Hover overlay effect */}
                <span className="absolute inset-0 bg-linear-to-r from-white to-white/90 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />

                <span className="relative z-10 transition-transform duration-500">
                  Sprawdź szczegóły
                </span>
                <FiArrowRight className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1" />
              </Link>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};
