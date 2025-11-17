"use client";

import { domAnimation, LazyMotion, m, type Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { premiumEase, staggerConfig, viewportConfig } from "@/lib/animations";
import { Lightbox } from "./Lightbox";

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  blurDataURL: string;
}

interface GalleryGridData {
  title: string;
  date: string;
  location: string;
  images: ImageData[];
}

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
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

  const formattedDate = new Date(galleryData.date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LazyMotion features={domAnimation}>
      <section aria-labelledby={`gallery-${index}`}>
        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig.once}
          variants={headerVariant}
          transition={{ delay: index * 0.1 }}
          className="mb-8"
        >
          <h2
            id={`gallery-${index}`}
            className="mb-3 text-4xl font-bold md:text-5xl"
          >
            {galleryData.title}
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full bg-arylideYellow"
                aria-hidden="true"
              />
              <time dateTime={galleryData.date}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full bg-arylideYellow"
                aria-hidden="true"
              />
              {galleryData.location}
            </span>
          </div>
        </m.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {galleryData.images.map((image, imageIndex) => {
            const isHero = imageIndex === 0 && galleryData.images.length > 2;

            return (
              <m.button
                // --- POPRAWKA ---
                // Używamy unikalnego URL obrazu (image.src) jako klucza,
                // zamiast niestabilnego indeksu tablicy.
                key={image.src}
                type="button"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariant}
                transition={{ delay: imageIndex * staggerConfig.fast }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLightboxIndex(imageIndex)}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arylideYellow focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack ${
                  isHero
                    ? "md:col-span-2 md:row-span-2 aspect-16/10"
                    : "aspect-square"
                }`}
                aria-label={`Otwórz zdjęcie: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    isHero
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={imageIndex < 3 ? "eager" : "lazy"}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/80 via-raisinBlack/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">
                    {image.caption || "Zobacz pełny rozmiar"}
                  </p>
                </div>
              </m.button>
            );
          })}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryData.images}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </section>
    </LazyMotion>
  );
};
