// ===================================================================
// Plik: src/components/gallery/GalleryGridSection.client.tsx
// PEŁNY KOD Z NAPRZEMIENNY LAYOUTEM

"use client";

// Import komponentu do renderowania tekstu z Sanity
import { PortableText } from "@portabletext/react";
import {
  domAnimation,
  LazyMotion,
  m,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { FiCalendar, FiMapPin, FiPlayCircle } from "react-icons/fi";
import {
  premiumEase,
  ultraSmoothSpring,
  viewportConfig,
} from "@/lib/animations";
import type { Partner, PortableTextContent } from "@/lib/types/index";

const DynamicLightbox = dynamic(() =>
  import("./Lightbox").then((mod) => mod.Lightbox),
);

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  blurDataURL: string;
}

interface GalleryGridData {
  title: string;
  description?: PortableTextContent;
  videoUrl?: string;
  sponsors?: Partner[];
  date: string;
  location: string;
  images: ImageData[];
}

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const imageRevealVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
};

export const GalleryGridSectionClient = ({
  galleryData,
  index,
}: {
  galleryData: GalleryGridData;
  index: number;
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ZMIANA: Sprawdzamy czy galeria jest parzysta (0, 2, 4...) czy nieparzysta (1, 3, 5...)
  const isEven = index % 2 === 0;
  
  const blurY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blurOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
  );

  const formattedDate = new Date(galleryData.date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ ...viewportConfig.once, margin: "-50px" }}
        variants={staggerContainerVariant}
        aria-labelledby={`gallery-${index}`}
        className="relative py-12 sm:py-20"
      >
        {/* ZMIANA: Decorative blur naprzemiennie lewo-prawo */}
        <m.div
          style={{ y: blurY, opacity: blurOpacity }}
          className={`pointer-events-none absolute ${
            isEven ? "right-0" : "left-0"
          } top-1/3 h-80 w-80 rounded-full bg-arylideYellow/6 blur-3xl`}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          {/* --- HEADER - ZMIANA: Naprzemiennie lewa/prawa kolumna --- */}
          <m.div
            variants={fadeInUpVariant}
            className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-end"
          >
            {/* ZMIANA: Kolumna z tytułem - dodano conditional ordering */}
            <div className={`lg:col-span-5 xl:col-span-4 space-y-6 ${
              !isEven ? 'lg:order-2' : ''
            }`}>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-arylideYellow">
                <span className="flex items-center gap-2 rounded-full bg-arylideYellow/10 px-3 py-1 border border-arylideYellow/20">
                  <FiCalendar />
                  <time dateTime={galleryData.date}>{formattedDate}</time>
                </span>
                <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-white/80 border border-white/10">
                  <FiMapPin />
                  <span>{galleryData.location}</span>
                </span>
              </div>

              <h2
                id={`gallery-${index}`}
                className="font-youngest text-4xl leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {galleryData.title}
              </h2>

              {galleryData.videoUrl && (
                <div className="pt-2">
                  <a
                    href={galleryData.videoUrl}
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
              )}
            </div>

            {/* ZMIANA: Kolumna z opisem - border i order zmieniają się naprzemiennie */}
            <div className={`lg:col-span-7 xl:col-span-8 flex flex-col gap-6 pb-2 ${
              isEven 
                ? 'lg:pl-8 lg:border-l' 
                : 'lg:pr-8 lg:border-r lg:order-1'
            } lg:border-white/10`}>
              {/* Opis z Portable Text */}
              {galleryData.description && (
                <div className="text-lg leading-relaxed text-white/70 md:text-xl max-w-3xl [&>p]:mb-4 last:[&>p]:mb-0">
                  <PortableText value={galleryData.description} />
                </div>
              )}

              {/* Sekcja Partnerów */}
              {galleryData.sponsors && galleryData.sponsors.length > 0 && (
                <div className="mt-2 border-t border-white/10 pt-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
                    Partnerzy wydarzenia
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    {galleryData.sponsors.map((sponsor) => (
                      <div
                        key={sponsor.name}
                        className="group relative"
                        title={sponsor.name}
                      >
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
              )}
            </div>
          </m.div>

          {/* --- GALERIA (Desktop Grid - Bento 1+4) - ZMIANA: Naprzemiennie --- */}
          <m.div
            variants={staggerContainerVariant}
            className={`hidden lg:grid grid-cols-4 gap-4 auto-rows-[240px] ${
              !isEven ? 'direction-rtl' : ''
            }`}
            style={!isEven ? { direction: 'rtl' } : undefined}
          >
            {galleryData.images.map((image, imageIndex) => {
              // Logika: Co 5 zdjęcie jest duże (0, 5, 10...)
              const isBig = imageIndex % 5 === 0;
              const gridClass = isBig
                ? "col-span-2 row-span-2"
                : "col-span-1 row-span-1";

              return (
                <m.button
                  key={`${image.src}-${imageIndex}`}
                  type="button"
                  variants={imageRevealVariant}
                  whileHover={{ y: -4 }}
                  transition={ultraSmoothSpring}
                  onClick={() => setLightboxIndex(imageIndex)}
                  className={`group relative overflow-hidden rounded-xl bg-raisinBlack/50 shadow-xl ${gridClass}`}
                  style={!isEven ? { direction: 'ltr' } : undefined}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={isBig ? "50vw" : "25vw"}
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full bg-black/60 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0 text-left">
                        <p className="text-sm text-white">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </m.button>
              );
            })}
          </m.div>

          {/* --- GALERIA (Mobile - Scroll poziomy) --- */}
          <div className="lg:hidden">
            <m.div
              ref={scrollContainerRef}
              variants={staggerContainerVariant}
              className="relative -mx-4 px-4 sm:-mx-6 sm:px-6"
            >
              <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
                {galleryData.images.map((image, imageIndex) => (
                  <m.button
                    key={image.src}
                    type="button"
                    variants={imageRevealVariant}
                    onClick={() => setLightboxIndex(imageIndex)}
                    className="group relative shrink-0 snap-center"
                    style={{
                      width: imageIndex === 0 ? "85vw" : "70vw",
                      maxWidth: "400px",
                      aspectRatio: "4/5",
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg bg-raisinBlack">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 85vw, 50vw"
                        placeholder="blur"
                        blurDataURL={image.blurDataURL}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                      {image.caption && (
                        <div className="absolute bottom-3 left-3 right-3 text-left">
                          <p className="text-xs font-medium text-white/90 line-clamp-2">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  </m.button>
                ))}
              </div>
            </m.div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <DynamicLightbox
            images={galleryData.images}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </m.section>
    </LazyMotion>
  );
};