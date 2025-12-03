import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { FiCalendar, FiMapPin, FiPlayCircle } from "react-icons/fi";

// Importujemy typ danych zwróconych przez Server Action
import type { ProcessedGalleryData } from "@/actions/galleryActions";

// Importy komponentów UI
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { GalleryBackgroundBlur } from "./GalleryDecorators";
import { GalleryImageGrid } from "./GalleryImageGrid";

// --- HELPER DLA PARTNERÓW ---
const renderSponsors = (
  sponsors: NonNullable<ProcessedGalleryData["sponsors"]>,
) => (
  <div className="mt-2 border-t border-white/10 pt-4">
    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
      Partnerzy wydarzenia
    </p>
    <div className="flex flex-wrap items-center gap-6">
      {sponsors.map((sponsor) => (
        <div key={sponsor.name} className="group relative" title={sponsor.name}>
          {sponsor.logoUrl ? (
            <div className="relative h-10 w-auto min-w-20 max-w-[120px] opacity-60 transition-all duration-300 group-hover:opacity-100 grayscale group-hover:grayscale-0">
              <Image
                src={sponsor.logoUrl}
                alt={sponsor.name}
                height={40}
                width={120}
                className="h-full w-auto object-contain"
              />
            </div>
          ) : (
            <span className="text-sm font-medium text-white/60 transition-colors group-hover:text-arylideYellow">
              {sponsor.name}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

// --- GŁÓWNY KOMPONENT UI ---
export function GallerySection({
  gallery,
  index,
}: {
  gallery: ProcessedGalleryData;
  index: number;
}) {
  if (!gallery) return null;

  // Przygotowanie danych
  const isEven = index % 2 === 0;
  const formattedDate = new Date(gallery.date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      aria-labelledby={`gallery-${index}`}
      className="relative py-12 sm:py-20"
    >
      {/* 1. Tło reagujące na scroll (Mikro-klient) */}
      <GalleryBackgroundBlur isEven={isEven} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* 2. Header (Tekst, Tytuł, Opis) */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-end">
          {/* KOLUMNA TYTUŁOWA */}
          <div
            className={`lg:col-span-5 xl:col-span-4 space-y-6 ${
              !isEven ? "lg:order-2" : ""
            }`}
          >
            <MotionWrapper variant="fadeUp">
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-arylideYellow">
                <span className="flex items-center gap-2 rounded-full bg-arylideYellow/10 px-3 py-1 border border-arylideYellow/20">
                  <FiCalendar />
                  <time dateTime={gallery.date}>{formattedDate}</time>
                </span>
                <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-white/80 border border-white/10">
                  <FiMapPin />
                  <span>{gallery.location}</span>
                </span>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.1}>
              <h2
                id={`gallery-${index}`}
                className="font-youngest text-4xl leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {gallery.title}
              </h2>
            </MotionWrapper>

            {gallery.videoUrl && (
              <MotionWrapper variant="fadeUp" delay={0.2}>
                <div className="pt-2">
                  <a
                    href={gallery.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-white transition-colors hover:text-arylideYellow"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-arylideYellow text-raisinBlack transition-transform duration-300 group-hover:scale-110">
                      <FiPlayCircle size={24} className="ml-1" />
                    </span>
                    <span className="text-lg font-bold tracking-wide underline decoration-arylideYellow/30 underline-offset-4 transition-all group-hover:decoration-arylideYellow">
                      Zobacz nagranie
                    </span>
                  </a>
                </div>
              </MotionWrapper>
            )}
          </div>

          {/* KOLUMNA OPISOWA */}
          <div
            className={`lg:col-span-7 xl:col-span-8 flex flex-col gap-6 pb-2 ${
              isEven ? "lg:pl-8 lg:border-l" : "lg:pr-8 lg:border-r lg:order-1"
            } lg:border-white/10`}
          >
            {gallery.description && (
              <MotionWrapper variant="fadeUp" delay={0.2}>
                <div className="text-lg leading-relaxed text-white/70 md:text-xl max-w-3xl [&>p]:mb-4 last:[&>p]:mb-0">
                  <PortableText value={gallery.description} />
                </div>
              </MotionWrapper>
            )}

            {gallery.sponsors && gallery.sponsors.length > 0 && (
              <MotionWrapper variant="fadeUp" delay={0.3}>
                {renderSponsors(gallery.sponsors)}
              </MotionWrapper>
            )}
          </div>
        </div>

        {/* 3. Siatka zdjęć (Klient - bo interaktywna) */}
        <GalleryImageGrid images={gallery.images} isEven={isEven} />
      </div>
    </section>
  );
}
