import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
// Importy "Wysp Klienckich"
import { MotionWrapper, StaggerContainer } from "@/components/ui/MotionWrapper";
import type { PortableTextContent, TimelineEvent } from "@/lib/types/index";
import { urlFor } from "@/sanity/lib/image";
import { getTimelineSectionData } from "@/sanity/lib/queries/home";
import { TimelineLineAnimator } from "./TimelineDecorators"; // Mikro-komponent

// --- KONFIGURACJA PORTABLE TEXT ---
const timelinePortableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-arylideYellow underline transition-colors hover:text-arylideYellow/80"
        >
          {children}
        </a>
      );
    },
  },
};

// --- HELPERY RENDEROWANIA (Czysty HTML) ---

// Kółko z rokiem
const renderYearBadge = (year: number) => (
  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-arylideYellow bg-raisinBlack shadow-lg transition-shadow duration-300 group-hover:shadow-arylideYellow/30 lg:h-20 lg:w-20">
    <span className="relative z-10 font-youngest text-2xl text-arylideYellow lg:text-3xl">
      {`'${year.toString().slice(-2)}`}
    </span>
  </div>
);

// Obrazek wydarzenia
const renderEventImage = (item: TimelineEvent) => (
  <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-xl transition-shadow duration-500 group-hover:shadow-arylideYellow/10 sm:rounded-2xl lg:rounded-3xl">
    {item.image && (
      <>
        <Image
          src={urlFor(item.image).width(1000).height(563).quality(90).url()}
          alt={item.altText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          placeholder="blur"
          blurDataURL={urlFor(item.image).width(20).height(11).blur(10).url()}
        />
        <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/40 to-transparent" />
        {/* Overlay na hover */}
        <div className="absolute inset-0 bg-arylideYellow/0 transition-colors duration-300 group-hover:bg-arylideYellow/10" />
      </>
    )}
  </div>
);

// --- KOMPONENT POJEDYNCZEGO WYDARZENIA ---
const TimelineItem = ({
  item,
  isLast,
}: {
  item: TimelineEvent;
  isLast: boolean;
}) => {
  return (
    <article className="relative grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-10 lg:gap-12">
      {/* 1. KOLUMNA ROKU (Desktop) */}
      <div className="hidden items-start pt-1 md:flex">
        {/* 'group' pozwala na hover efekt na cieniu kółka */}
        <MotionWrapper
          variant="scale"
          duration={0.5}
          enableHover={true}
          className="group"
        >
          {renderYearBadge(item.year)}
        </MotionWrapper>
      </div>

      {/* 2. KOLUMNA TREŚCI */}
      <div className="relative">
        {/* Rok (Mobile) */}
        <div className="md:hidden mb-2 sm:mb-4">
          <MotionWrapper variant="fadeUp">
            <time
              dateTime={item.year.toString()}
              className="inline-block font-youngest text-3xl text-arylideYellow sm:text-4xl"
            >
              {item.year.toString()}
            </time>
          </MotionWrapper>
        </div>

        {/* Tytuł */}
        <MotionWrapper variant="fadeUp">
          <h3 className="mb-2 text-[1.25rem] font-semibold transition-colors duration-300 hover:text-arylideYellow sm:mb-4 sm:text-3xl lg:text-4xl">
            {item.title}
          </h3>
        </MotionWrapper>

        {/* Opis */}
        <MotionWrapper variant="fadeUp">
          <div className="mb-2 sm:mb-6">
            <div className="prose prose-invert max-w-none text-[0.9rem] leading-relaxed text-white/90 sm:text-lg md:leading-relaxed lg:text-xl">
              <PortableText
                value={item.description as PortableTextContent}
                components={timelinePortableTextComponents}
              />
            </div>
          </div>
        </MotionWrapper>

        {/* Zdjęcie (z hoverem) */}
        <MotionWrapper
          variant="fadeUp"
          enableHover={true}
          className="group mb-8"
        >
          {renderEventImage(item)}
        </MotionWrapper>

        {/* Linia łącząca (CSS only) */}
        {!isLast && (
          <div className="absolute -bottom-8 left-0 hidden h-16 w-px bg-linear-to-b from-arylideYellow/20 to-transparent md:-left-10 md:block lg:-left-12" />
        )}
      </div>
    </article>
  );
};

// --- GŁÓWNY KOMPONENT ---
export async function TimelineSection() {
  const timelineData = await getTimelineSectionData();

  if (!timelineData) {
    return null;
  }

  return (
    <section
      id="timeline-section"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40"
      aria-labelledby="timeline-heading"
    >
      {/* Tła statyczne */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-arylideYellow/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* --- NAGŁÓWEK --- */}
        <div className="mb-12 text-center sm:mb-16 md:mb-20 lg:mb-24">
          <StaggerContainer staggerDelay={0.1}>
            <MotionWrapper variant="fadeUp">
              <div className="space-y-4 sm:space-y-6">
                <h2
                  id="timeline-heading"
                  className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  {timelineData.headingPrefix &&
                    `${timelineData.headingPrefix} `}
                  <span className="font-youngest text-arylideYellow drop-shadow-lg">
                    {timelineData.headingHighlighted}
                  </span>
                </h2>
                <p className="mx-auto max-w-2xl font-medium text-base leading-relaxed text-white/90 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-3xl">
                  {timelineData.subheading}
                </p>
              </div>
            </MotionWrapper>
          </StaggerContainer>
        </div>

        {/* --- OŚ CZASU --- */}
        <div className="relative mx-auto max-w-5xl">
          {/* Animowana linia pionowa (Mikro-klient) */}
          <TimelineLineAnimator />

          {/* Lista wydarzeń */}
          <div className="space-y-10 sm:space-y-12 md:space-y-16 lg:space-y-20">
            {timelineData.timelineEvents.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                isLast={index === timelineData.timelineEvents.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
